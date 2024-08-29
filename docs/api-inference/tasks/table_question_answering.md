## Table Question Answering

Table Question Answering (Table QA) is the answering a question about an information on a given table.

<Tip>

For more details about the `table-question-answering` task, check out its [dedicated page](https://huggingface.co/tasks/table-question-answering)! You will find examples and related materials.

</Tip>

### Recommended models


This is only a subset of the supported models. Find the model that suits you best [here](https://huggingface.co/models?inference=warm&pipeline_tag=table-question-answering&sort=trending).

### API specification

#### Request

| Payload |  |  |
| :--- | :--- | :--- |
| **inputs*** | _object_ | One (table, question) pair to answer |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;table*** | _object_ | The table to serve as context for the questions |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;question*** | _string_ | The question to be answered about the table |
| **parameters** | _object_ | Additional inference parameters for Table Question Answering |


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
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;answer** | _string_ | The answer of the question given the table. If there is an aggregator, the answer will be preceded by `AGGREGATOR >`. |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;coordinates** | _array[]_ | Coordinates of the cells of the answers. |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cells** | _string[]_ | List of strings made up of the answer cell values. |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;aggregator** | _string_ | If the model has an aggregator, this returns the aggregator. |


### Using the API


<inferencesnippet>

<curl>
```bash
curl https://api-inference.huggingface.co/models/<REPO_ID> \
	-X POST \
	-d '{"inputs": { "query": "How many stars does the transformers repository have?", "table": { "Repository": ["Transformers", "Datasets", "Tokenizers"], "Stars": ["36542", "4512", "3934"], "Contributors": ["651", "77", "34"], "Programming language": [ "Python", "Python", "Rust, Python and NodeJS" ] } }}' \
	-H 'Content-Type: application/json' \
	-H "Authorization: Bearer hf_***"

```
</curl>

<python>
```py
import requests

API_URL = "https://api-inference.huggingface.co/models/<REPO_ID>"
headers = {"Authorization": "Bearer hf_***"}

def query(payload):
	response = requests.post(API_URL, headers=headers, json=payload)
	return response.json()
	
output = query({
	"inputs": {
	"query": "How many stars does the transformers repository have?",
	"table": {
		"Repository": ["Transformers", "Datasets", "Tokenizers"],
		"Stars": ["36542", "4512", "3934"],
		"Contributors": ["651", "77", "34"],
		"Programming language": [
			"Python",
			"Python",
			"Rust, Python and NodeJS"
		]
	}
},
})
```

To use the Python client, see `huggingface_hub`'s [package reference](https://huggingface.co/docs/huggingface_hub/package_reference/inference_client#huggingface_hub.InferenceClient.table_question-answering).
</python>

<js>
```js
async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/<REPO_ID>",
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

query({"inputs": {
	"query": "How many stars does the transformers repository have?",
	"table": {
		"Repository": ["Transformers", "Datasets", "Tokenizers"],
		"Stars": ["36542", "4512", "3934"],
		"Contributors": ["651", "77", "34"],
		"Programming language": [
			"Python",
			"Python",
			"Rust, Python and NodeJS"
		]
	}
}}).then((response) => {
	console.log(JSON.stringify(response));
});
```

To use the JavaScript client, see `huggingface.js`'s [package reference](https://huggingface.co/docs/huggingface.js/inference/classes/HfInference#tablequestion-answering).
</js>

</inferencesnippet>


