## Object detection

Object Detection models allow users to identify objects of certain defined classes. Object detection models receive an image as input and output the images with bounding boxes and labels on detected objects.

<Tip>

For more details about the `object-detection` task, check out its [dedicated page](https://huggingface.co/tasks/object-detection)! You will find examples and related materials.

</Tip>

### Recommended models

- [facebook/detr-resnet-50](https://huggingface.co/facebook/detr-resnet-50): Solid object detection model trained on the benchmark dataset COCO 2017.
- [microsoft/beit-base-patch16-224-pt22k-ft22k](https://huggingface.co/microsoft/beit-base-patch16-224-pt22k-ft22k): Strong object detection model trained on ImageNet-21k dataset.

This is only a subset of the supported models. Find the model that suits you best [here](https://huggingface.co/models?inference=warm&pipeline_tag=object-detection&sort=trending).

### API specification

#### Request

| Payload |  |  |
| :--- | :--- | :--- |
| **inputs*** | _string_ | The input image data as a base64-encoded string. If no `parameters` are provided, you can also provide the image data as a raw bytes payload. |
| **parameters** | _object_ | Additional inference parameters for Object Detection |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;threshold** | _number_ | The probability necessary to make a prediction. |


Some options can be configured by passing headers to the Inference API. Here are the available headers:

| Headers |   |    |
| :--- | :--- | :--- |
| **authorization** | _string_ | Authentication header in the form `'Bearer: hf_****'` when `hf_****` is a personal user access token with Inference API permission. You can generate one from [your settings page](https://huggingface.co/settings/tokens). |
| **x-use-cache** | _boolean, default to `true`_ | There is a cache layer on the inference API to speed up requests we have already seen. Most models can use those results as they are deterministic (meaning the outputs will be the same anyway). However, if you use a nondeterministic model, you can set this parameter to prevent the caching mechanism from being used, resulting in a real new query. Read more about caching [here](../parameters#caching]). |
| **x-wait-for-model** | _boolean, default to `false`_ | If the model is not ready, wait for it instead of receiving 503. It limits the number of requests required to get your inference done. It is advised to only set this flag to true after receiving a 503 error, as it will limit hanging in your application to known places. Read more about model availability [here](../overview#eligibility]). |

For more information about Inference API headers, check out the parameters [guide](../parameters).

#### Response

| Body |  |
| :--- | :--- | :--- |
| **(array)** | _object[]_ | Output is an array of objects. |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;label** | _string_ | The predicted label for the bounding box. |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;score** | _number_ | The associated score / probability. |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;box** | _object_ |  |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;xmin** | _integer_ | The x-coordinate of the top-left corner of the bounding box. |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;xmax** | _integer_ | The x-coordinate of the bottom-right corner of the bounding box. |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ymin** | _integer_ | The y-coordinate of the top-left corner of the bounding box. |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ymax** | _integer_ | The y-coordinate of the bottom-right corner of the bounding box. |


### Using the API


<inferencesnippet>

<curl>
```bash
curl https://api-inference.huggingface.co/models/facebook/detr-resnet-50 \
	-X POST \
	--data-binary '@cats.jpg' \
	-H "Authorization: Bearer hf_***"

```
</curl>

<python>
```py
import requests

API_URL = "https://api-inference.huggingface.co/models/facebook/detr-resnet-50"
headers = {"Authorization": "Bearer hf_***"}

def query(filename):
    with open(filename, "rb") as f:
        data = f.read()
    response = requests.post(API_URL, headers=headers, data=data)
    return response.json()

output = query("cats.jpg")
```

To use the Python client, see `huggingface_hub`'s [package reference](https://huggingface.co/docs/huggingface_hub/package_reference/inference_client#huggingface_hub.InferenceClient.object_detection).
</python>

<js>
```js
async function query(filename) {
	const data = fs.readFileSync(filename);
	const response = await fetch(
		"https://api-inference.huggingface.co/models/facebook/detr-resnet-50",
		{
			headers: {
				Authorization: "Bearer hf_***"
				"Content-Type": "application/json",
			},
			method: "POST",
			body: data,
		}
	);
	const result = await response.json();
	return result;
}

query("cats.jpg").then((response) => {
	console.log(JSON.stringify(response));
});
```

To use the JavaScript client, see `huggingface.js`'s [package reference](https://huggingface.co/docs/huggingface.js/inference/classes/HfInference#objectdetection).
</js>

</inferencesnippet>


