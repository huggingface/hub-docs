<!---
This markdown file has been generated from a script. Please do not edit it directly.
For more details, check out:
- the `generate.ts` script: https://github.com/huggingface/hub-docs/blob/main/scripts/api-inference/scripts/generate.ts
- the task template defining the sections in the page: https://github.com/huggingface/hub-docs/tree/main/scripts/api-inference/templates/task/object-detection.handlebars
- the input jsonschema specifications used to generate the input markdown table: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/tasks/object-detection/spec/input.json
- the output jsonschema specifications used to generate the output markdown table: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/tasks/object-detection/spec/output.json
- the snippets used to generate the example:
  - curl: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/snippets/curl.ts
  - python: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/snippets/python.ts
  - javascript: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/snippets/js.ts
- the "tasks" content for recommended models: https://huggingface.co/api/tasks
--->

## Object detection

Object Detection models allow users to identify objects of certain defined classes. These models receive an image as input and output the images with bounding boxes and labels on detected objects.

<Tip>

For more details about the `object-detection` task, check out its [dedicated page](https://huggingface.co/tasks/object-detection)! You will find examples and related materials.

</Tip>

### Recommended models


Explore all available models and find the one that suits you best [here](https://huggingface.co/models?inference=warm&pipeline_tag=object-detection&sort=trending).

### Using the API


<inferencesnippet>


<snippet provider="hf-inference" language="python" client="huggingface_hub">

```python
from huggingface_hub import InferenceClient

client = InferenceClient(
    provider="hf-inference",
    api_key="hf_***",
)

output = client.object_detection("cats.jpg", model="facebook/detr-resnet-50")
```

</snippet>

To use the Python `InferenceClient`, see the [package reference](https://huggingface.co/docs/huggingface_hub/package_reference/inference_client#huggingface_hub.InferenceClient.).

<snippet provider="hf-inference" language="python" client="requests">

```python
import requests

API_URL = "https://router.huggingface.co/hf-inference/models/facebook/detr-resnet-50"
headers = {"Authorization": "Bearer hf_***"}

def query(filename):
    with open(filename, "rb") as f:
        data = f.read()
    response = requests.post(API_URL, headers={"Content-Type": "image/jpeg", **headers}, data=data)
    return response.json()

output = query("cats.jpg")
```

</snippet>


<snippet provider="hf-inference" language="js" client="fetch">

```js
async function query(data) {
	const response = await fetch(
		"https://router.huggingface.co/hf-inference/models/facebook/detr-resnet-50",
		{
			headers: {
				Authorization: "Bearer hf_***",
				"Content-Type": "image/jpeg"
			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}

query({ inputs: "cats.jpg" }).then((response) => {
    console.log(JSON.stringify(response));
});
```

</snippet>


<snippet provider="hf-inference" language="sh" client="curl">

```sh
curl https://router.huggingface.co/hf-inference/models/facebook/detr-resnet-50 \
    -X POST \
    -H 'Authorization: Bearer hf_***' \
    -H 'Content-Type: image/jpeg' \
    --data-binary @"cats.jpg"
```

</snippet>


</inferencesnippet>



### API specification

#### Request

| Payload |  |  |
| :--- | :--- | :--- |
| **inputs*** | _string_ | The input image data as a base64-encoded string. If no `parameters` are provided, you can also provide the image data as a raw bytes payload. |
| **parameters** | _object_ |  |
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

