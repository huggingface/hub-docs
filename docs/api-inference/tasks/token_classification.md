## Token Classification

Token classification is a task in which a label is assigned to some tokens in a text. Some popular token classification subtasks are Named Entity Recognition (NER) and Part-of-Speech (PoS) tagging.

<Tip>

For more details about the `token-classification` task, check out its [dedicated page](https://huggingface.co/tasks/token-classification)! You will find examples and related materials.

</Tip>

### Recommended models

- [dslim/bert-base-NER](https://huggingface.co/dslim/bert-base-NER): A robust performance model to identify people, locations, organizations and names of miscellaneous entities.
- [flair/ner-english](https://huggingface.co/flair/ner-english): Flair models are typically the state of the art in named entity recognition tasks.

This is only a subset of the supported models. Find the model that suits you best [here](https://huggingface.co/models?inference=warm&pipeline_tag=token-classification&sort=trending).

### API specification

#### Request

| Payload |  |  |
| :--- | :--- | :--- |
| **inputs*** | _string_ | The input text data |
| **parameters** | _object_ | Additional inference parameters for Token Classification |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ignore_labels** | _string[]_ | A list of labels to ignore |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;stride** | _integer_ | The number of overlapping tokens between chunks when splitting the input text. |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;aggregation_strategy** | _string_ | One of the following: |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(#1)** | _&#x27;none&#x27;_ | Do not aggregate tokens |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(#2)** | _&#x27;simple&#x27;_ | Group consecutive tokens with the same label in a single entity. |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(#3)** | _&#x27;first&#x27;_ | Similar to "simple", also preserves word integrity (use the label predicted for the first token in a word). |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(#4)** | _&#x27;average&#x27;_ | Similar to "simple", also preserves word integrity (uses the label with the highest score, averaged across the word's tokens). |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(#5)** | _&#x27;max&#x27;_ | Similar to "simple", also preserves word integrity (uses the label with the highest score across the word's tokens). |


Some options can be configured by passing headers to the Inference API. Here are the available headers:

| Headers |   |    |
| :--- | :--- | :--- |
| **authorization** | _string_ | Authentication header in the form `'Bearer: hf_****'` when `hf_****` is a personal user access token with Inference API permission. You can generate one from [your settings page](https://huggingface.co/settings/tokens). |
| **x-use-cache** | _boolean, default to `true`_ | There is a cache layer on the inference API to speed up requests we have already seen. Most models can use those results as they are deterministic (meaning the outputs will be the same anyway). However, if you use a nondeterministic model, you can set this parameter to prevent the caching mechanism from being used, resulting in a real new query. Read more about caching [here](../parameters#caching]). |
| **x-wait-for-model** | _boolean, default to `false`_ | If the model is not ready, wait for it instead of receiving 503. It limits the number of requests required to get your inference done. It is advised to only set this flag to true after receiving a 503 error, as it will limit hanging in your application to known places. Read more about model availability [here](../overview#eligibility]). |

For more information about Inference API headers, check out the parameters [guide](../parameters).

#### Response

Output type depends on the `stream` input parameter.
If `stream` is `false` (default), the response will be a JSON object with the following fields:

| Body |  |
| :--- | :--- | :--- |
| **(array)** | _object[]_ | Output is an array of objects. |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;entity_group** | _string_ | The predicted label for that group of tokens |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;score** | _number_ | The associated score / probability |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;word** | _string_ | The corresponding text |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;start** | _integer_ | The character position in the input where this group begins. |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;end** | _integer_ | The character position in the input where this group ends. |


If `stream` is `true`, generated tokens are returned as a stream, using Server-Sent Events (SSE).
For more information about streaming, check out [this guide](https://huggingface.co/docs/token-classification-inference/conceptual/streaming).



### Using the API


<inferencesnippet>

<curl>
```bash
curl https://api-inference.huggingface.co/models/dslim/bert-base-NER \
	-X POST \
	-d '{"inputs": "My name is Sarah Jessica Parker but you can call me Jessica"}' \
	-H 'Content-Type: application/json' \
	-H "Authorization: Bearer hf_***"

```
</curl>

<python>
```py
import requests

API_URL = "https://api-inference.huggingface.co/models/dslim/bert-base-NER"
headers = {"Authorization": "Bearer hf_***"}

def query(payload):
	response = requests.post(API_URL, headers=headers, json=payload)
	return response.json()
	
output = query({
	"inputs": "My name is Sarah Jessica Parker but you can call me Jessica",
})
```

To use the Python client, see `huggingface_hub`'s [package reference](https://huggingface.co/docs/huggingface_hub/package_reference/inference_client#huggingface_hub.InferenceClient.token_classification).
</python>

<js>
```js
async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/dslim/bert-base-NER",
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

query({"inputs": "My name is Sarah Jessica Parker but you can call me Jessica"}).then((response) => {
	console.log(JSON.stringify(response));
});
```

To use the JavaScript client, see `huggingface.js`'s [package reference](https://huggingface.co/docs/huggingface.js/inference/classes/HfInference#tokenclassification).
</js>

</inferencesnippet>


