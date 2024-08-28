## Text Classification

Text Classification is the task of assigning a label or class to a given text. Some use cases are sentiment analysis, natural language inference, and assessing grammatical correctness.

<Tip>

For more details about the `text-classification` task, check out its [dedicated page](https://huggingface.co/tasks/text-classification)! You will find examples and related materials.

</Tip>

### Recommended models

- [distilbert-base-uncased-finetuned-sst-2-english](https://huggingface.co/distilbert-base-uncased-finetuned-sst-2-english): A robust model trained for sentiment analysis.
- [roberta-large-mnli](https://huggingface.co/roberta-large-mnli): Multi-genre natural language inference model.

This is only a subset of the supported models. Find the model that suits you best [here](https://huggingface.co/models?inference=warm&pipeline_tag=text-classification&sort=trending).

### API specification

#### Request

| Payload |  |  |
| :--- | :--- | :--- |
| **inputs*** | _string_ | The text to classify |
| **parameters** | _object_ | Additional inference parameters for Text Classification |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;function_to_apply** | _enum_ | Possible values: sigmoid, softmax, none. |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;top_k** | _integer_ | When specified, limits the output to the top K most probable classes. |


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
| **(array)** | _undefined[]_ | Output is an array of undefineds. |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;label** | _string_ | The predicted class label. |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;score** | _number_ | The corresponding probability. |


### Using the API


<inferencesnippet>

<curl>
```bash
curl https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english \
	-X POST \
	-d '{"inputs": "I like you. I love you"}' \
	-H 'Content-Type: application/json' \
	-H "Authorization: Bearer hf_***"

```
</curl>

<python>
```py
import requests

API_URL = "https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english"
headers = {"Authorization": "Bearer hf_***"}

def query(payload):
	response = requests.post(API_URL, headers=headers, json=payload)
	return response.json()
	
output = query({
	"inputs": "I like you. I love you",
})
```

To use the Python client, see `huggingface_hub`'s [package reference](https://huggingface.co/docs/huggingface_hub/package_reference/inference_client#huggingface_hub.InferenceClient.text_classification).
</python>

<js>
```js
async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english",
		{
			headers: {
				Authorization: "Bearer hf_***"
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}

query({"inputs": "I like you. I love you"}).then((response) => {
	console.log(JSON.stringify(response));
});
```

To use the JavaScript client, see `huggingface.js`'s [package reference](https://huggingface.co/docs/huggingface.js/inference/classes/HfInference#textclassification).
</js>

</inferencesnippet>


