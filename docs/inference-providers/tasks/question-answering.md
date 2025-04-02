<!---
This markdown file has been generated from a script. Please do not edit it directly.
For more details, check out:
- the `generate.ts` script: https://github.com/huggingface/hub-docs/blob/main/scripts/inference-providers/scripts/generate.ts
- the task template defining the sections in the page: https://github.com/huggingface/hub-docs/tree/main/scripts/inference-providers/templates/task/question-answering.handlebars
- the input jsonschema specifications used to generate the input markdown table: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/tasks/question-answering/spec/input.json
- the output jsonschema specifications used to generate the output markdown table: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/tasks/question-answering/spec/output.json
- the snippets used to generate the example:
  - curl: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/snippets/curl.ts
  - python: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/snippets/python.ts
  - javascript: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/snippets/js.ts
- the "tasks" content for recommended models: https://huggingface.co/api/tasks
--->

## Question Answering

Question Answering models can retrieve the answer to a question from a given text, which is useful for searching for an answer in a document.

<Tip>

For more details about the `question-answering` task, check out its [dedicated page](https://huggingface.co/tasks/question-answering)! You will find examples and related materials.

</Tip>

### Recommended models


Explore all available models and find the one that suits you best [here](https://huggingface.co/models?inference=warm&pipeline_tag=question-answering&sort=trending).

### Using the API


<inferencesnippet>


<snippet provider="hf-inference" language="python" client="huggingface_hub">

```python
from huggingface_hub import InferenceClient

client = InferenceClient(
    provider="hf-inference",
    api_key="hf_***",
)

result = client.question_answering(
    inputs={
	"question": "What is my name?",
	"context": "My name is Clara and I live in Berkeley."
},
    model="distilbert/distilbert-base-cased-distilled-squad",
)
```

</snippet>

To use the Python `InferenceClient`, see the [package reference](https://huggingface.co/docs/huggingface_hub/package_reference/inference_client#huggingface_hub.InferenceClient.).

<snippet provider="hf-inference" language="python" client="requests">

```python
import requests

API_URL = "https://router.huggingface.co/hf-inference/models/distilbert/distilbert-base-cased-distilled-squad"
headers = {"Authorization": "Bearer hf_***"}

def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()

output = query({
    "inputs": {
	"question": "What is my name?",
	"context": "My name is Clara and I live in Berkeley."
},
})
```

</snippet>


<snippet provider="hf-inference" language="js" client="fetch">

```js
async function query(data) {
	const response = await fetch(
		"https://router.huggingface.co/hf-inference/models/distilbert/distilbert-base-cased-distilled-squad",
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

query({ inputs: {
	"question": "What is my name?",
	"context": "My name is Clara and I live in Berkeley."
} }).then((response) => {
    console.log(JSON.stringify(response));
});
```

</snippet>


<snippet provider="hf-inference" language="js" client="huggingface.js">

```js
import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient("hf_***");

const output = await client.questionAnswering({
	model: "distilbert/distilbert-base-cased-distilled-squad",
	inputs: {
	"question": "What is my name?",
	"context": "My name is Clara and I live in Berkeley."
},
	provider: "hf-inference",
});

console.log(output);
```

</snippet>

To use the JavaScript `InferenceClient`, see `huggingface.js`'s [package reference](https://huggingface.co/docs/huggingface.js/inference/classes/InferenceClient#).

<snippet provider="hf-inference" language="sh" client="curl">

```sh
curl https://router.huggingface.co/hf-inference/models/distilbert/distilbert-base-cased-distilled-squad \
    -X POST \
    -H 'Authorization: Bearer hf_***' \
    -H 'Content-Type: application/json' \
    -d '{
        "inputs": "{\n\t\"question\": \"What is my name?\",\n\t\"context\": \"My name is Clara and I live in Berkeley.\"\n}"
    }'
```

</snippet>


</inferencesnippet>



### API specification

#### Request

| Payload |  |  |
| :--- | :--- | :--- |
| **inputs*** | _object_ | One (context, question) pair to answer |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;context*** | _string_ | The context to be used for answering the question |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;question*** | _string_ | The question to be answered |
| **parameters** | _object_ |  |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;top_k** | _integer_ | The number of answers to return (will be chosen by order of likelihood). Note that we return less than topk answers if there are not enough options available within the context. |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;doc_stride** | _integer_ | If the context is too long to fit with the question for the model, it will be split in several chunks with some overlap. This argument controls the size of that overlap. |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;max_answer_len** | _integer_ | The maximum length of predicted answers (e.g., only answers with a shorter length are considered). |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;max_seq_len** | _integer_ | The maximum length of the total sentence (context + question) in tokens of each chunk passed to the model. The context will be split in several chunks (using docStride as overlap) if needed. |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;max_question_len** | _integer_ | The maximum length of the question after tokenization. It will be truncated if needed. |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;handle_impossible_answer** | _boolean_ | Whether to accept impossible as an answer. |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;align_to_words** | _boolean_ | Attempts to align the answer to real words. Improves quality on space separated languages. Might hurt on non-space-separated languages (like Japanese or Chinese) |


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
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;answer** | _string_ | The answer to the question. |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;score** | _number_ | The probability associated to the answer. |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;start** | _integer_ | The character position in the input where the answer begins. |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;end** | _integer_ | The character position in the input where the answer ends. |

