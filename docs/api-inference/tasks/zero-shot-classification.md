<!---
This markdown file has been generated from a script. Please do not edit it directly.
For more details, check out:
- the `generate.ts` script: https://github.com/huggingface/hub-docs/blob/main/scripts/api-inference/scripts/generate.ts
- the task template defining the sections in the page: https://github.com/huggingface/hub-docs/tree/main/scripts/api-inference/templates/task/zero-shot-classification.handlebars
- the input jsonschema specifications used to generate the input markdown table: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/tasks/zero-shot-classification/spec/input.json
- the output jsonschema specifications used to generate the output markdown table: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/tasks/zero-shot-classification/spec/output.json
- the snippets used to generate the example:
  - curl: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/snippets/curl.ts
  - python: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/snippets/python.ts
  - javascript: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/snippets/js.ts
- the "tasks" content for recommended models: https://huggingface.co/api/tasks
--->

## Zero-Shot Classification

Zero-shot text classification is super useful to try out classification with zero code, you simply pass a sentence/paragraph and the possible labels for that sentence, and you get a result. The model has not been necessarily trained on the labels you provide, but it can still predict the correct label.

<Tip>

For more details about the `zero-shot-classification` task, check out its [dedicated page](https://huggingface.co/tasks/zero-shot-classification)! You will find examples and related materials.

</Tip>

### Recommended models

- [facebook/bart-large-mnli](https://huggingface.co/facebook/bart-large-mnli): Powerful zero-shot text classification model.

Explore all available models and find the one that suits you best [here](https://huggingface.co/models?inference=warm&pipeline_tag=zero-shot-classification&sort=trending).

### Using the API


<inferencesnippet>

<curl>
```bash
curl https://api-inference.huggingface.co/models/facebook/bart-large-mnli \
	-X POST \
	-d '{"inputs": "Hi, I recently bought a device from your company but it is not working as advertised and I would like to get reimbursed!", "parameters": {"candidate_labels": ["refund", "legal", "faq"]}}' \
	-H 'Content-Type: application/json' \
	-H 'Authorization: Bearer hf_***'
```
</curl>

<python>
```py
import requests

API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-mnli"
headers = {"Authorization": "Bearer hf_***"}

def query(payload):
	response = requests.post(API_URL, headers=headers, json=payload)
	return response.json()

output = query({
    "inputs": "Hi, I recently bought a device from your company but it is not working as advertised and I would like to get reimbursed!",
    "parameters": {"candidate_labels": ["refund", "legal", "faq"]},
})
```

To use the Python client, see `huggingface_hub`'s [package reference](https://huggingface.co/docs/huggingface_hub/package_reference/inference_client#huggingface_hub.InferenceClient.zero_shot_classification).
</python>

<js>
```js
async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/facebook/bart-large-mnli",
		{
			headers: {
				Authorization: "Bearer hf_***",
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}

query({"inputs": "Hi, I recently bought a device from your company but it is not working as advertised and I would like to get reimbursed!", "parameters": {"candidate_labels": ["refund", "legal", "faq"]}}).then((response) => {
	console.log(JSON.stringify(response));
});
```

To use the JavaScript client, see `huggingface.js`'s [package reference](https://huggingface.co/docs/huggingface.js/inference/classes/HfInference#zeroshotclassification).
</js>

</inferencesnippet>



### API specification

#### Request

| Payload |  |  |
| :--- | :--- | :--- |
| **inputs*** | _string_ | The text to classify |
| **parameters*** | _object_ |  |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;candidate_labels*** | _string[]_ | The set of possible class labels to classify the text into. |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;hypothesis_template** | _string_ | The sentence used in conjunction with `candidate_labels` to attempt the text classification by replacing the placeholder with the candidate labels. |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;multi_label** | _boolean_ | Whether multiple candidate labels can be true. If false, the scores are normalized such that the sum of the label likelihoods for each sequence is 1. If true, the labels are considered independent and probabilities are normalized for each candidate. |


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
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;label** | _string_ | The predicted class label. |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;score** | _number_ | The corresponding probability. |

