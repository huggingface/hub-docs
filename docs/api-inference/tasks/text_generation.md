## Text generation

Generate text based on a prompt.

<Tip>

For more details about the `text-generation` task, check out its [dedicated page](https://huggingface.co/tasks/text-generation)! You will find examples and related materials.

</Tip>

### Recommended models

- [google/gemma-2-2b-it](https://huggingface.co/google/gemma-2-2b-it): A text-generation model trained to follow instructions.
- [bigcode/starcoder](https://huggingface.co/bigcode/starcoder): A code generation model that can generate code in 80+ languages.
- [meta-llama/Meta-Llama-3.1-8B-Instruct](https://huggingface.co/meta-llama/Meta-Llama-3.1-8B-Instruct): Very powerful text generation model trained to follow instructions.
- [microsoft/Phi-3-mini-4k-instruct](https://huggingface.co/microsoft/Phi-3-mini-4k-instruct): Small yet powerful text generation model.
- [AI-MO/NuminaMath-7B-TIR](https://huggingface.co/AI-MO/NuminaMath-7B-TIR): A very powerful model that can solve mathematical problems.
- [HuggingFaceH4/starchat2-15b-v0.1](https://huggingface.co/HuggingFaceH4/starchat2-15b-v0.1): Strong coding assistant model.
- [mistralai/Mistral-Nemo-Instruct-2407](https://huggingface.co/mistralai/Mistral-Nemo-Instruct-2407): Very strong open-source large language model.

This is only a subset of the supported models. Find the model that suits you best [here](https://huggingface.co/models?inference=warm&pipeline_tag=text-generation&sort=trending).

### API specification

#### Request

| Payload |  |  |
| :--- | :--- | :--- |
| **inputs** | _string, required_ |  |
| **parameters** | _object, optional_ |  |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;best_of** | _integer, optional_ |  |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;decoder_input_details** | _boolean, optional_ |  |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;details** | _boolean, optional_ |  |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;do_sample** | _boolean, optional_ |  |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;frequency_penalty** | _number, optional_ |  |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;grammar** | _object, optional_ | One of the following: |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(#1)** |  |  |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type** | _enum, required_ | Possible values: json |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;value** | _object, required_ | A string that represents a [JSON Schema](https://json-schema.org/).<br><br>JSON Schema is a declarative language that allows to annotate JSON documents<br>with types and descriptions. |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(#2)** |  |  |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type** | _enum, required_ | Possible values: regex |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;value** | _string, required_ |  |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;max_new_tokens** | _integer, optional_ |  |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;repetition_penalty** | _number, optional_ |  |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return_full_text** | _boolean, optional_ |  |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;seed** | _integer, optional_ |  |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;stop** | _array, optional_ |  |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;temperature** | _number, optional_ |  |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;top_k** | _integer, optional_ |  |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;top_n_tokens** | _integer, optional_ |  |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;top_p** | _number, optional_ |  |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;truncate** | _integer, optional_ |  |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;typical_p** | _number, optional_ |  |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;watermark** | _boolean, optional_ |  |
| **stream** | _boolean, optional_ |  |


| Headers |   |    |
| :--- | :--- | :--- |
| **authorization** | _string, optional_ | Authentication header in the form `'Bearer: hf_****'` when `hf_****` is a personal user access token with Inference API permission. You can generate one from [your settings page](https://huggingface.co/settings/tokens). |
| **x-use-cache** | _boolean, optional, default to `true`_ | There is a cache layer on the inference API to speed up requests we have already seen. Most models can use those results as they are deterministic (meaning the outputs will be the same anyway). However, if you use a nondeterministic model, you can set this parameter to prevent the caching mechanism from being used, resulting in a real new query. Read more about caching [here](../parameters#caching]). |
| **x-wait-for-model** | _boolean, optional, default to `false`_ | If the model is not ready, wait for it instead of receiving 503. It limits the number of requests required to get your inference done. It is advised to only set this flag to true after receiving a 503 error, as it will limit hanging in your application to known places. Read more about model availability [here](../overview#eligibility]). |


#### Response

Output type depends on the `stream` input parameter.
If `stream` is `false` (default), the response will be a JSON object with the following fields:

| Body |  |
| :--- | :--- | :--- |
| **details** | _object_ |  |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;best_of_sequences** | _array_ |  |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;finish_reason** | _enum_ | Possible values: length, eos_token, stop_sequence |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;generated_tokens** | _integer_ |  |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;prefill** | _array_ |  |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;seed** | _integer_ |  |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;tokens** | _array_ |  |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;top_tokens** | _array_ |  |
| **generated_text** | _string_ |  |


If `stream` is `true`, generated tokens are returned as a stream, using Server-Sent Events (SSE).
For more information about streaming, check out [this guide](https://huggingface.co/docs/text-generation-inference/conceptual/streaming).

| Body |  |
| :--- | :--- | :--- |
| **details** | _object_ |  |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;finish_reason** | _enum_ | Possible values: length, eos_token, stop_sequence |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;generated_tokens** | _integer_ |  |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;seed** | _integer_ |  |
| **generated_text** | _string_ |  |
| **index** | _integer_ |  |
| **token** | _object_ |  |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id** | _integer_ |  |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;logprob** | _number_ |  |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;special** | _boolean_ |  |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;text** | _string_ |  |
| **top_tokens** | _array_ |  |


### Using the API


<inferencesnippet>

<curl>
```bash
curl https://api-inference.huggingface.co/models/google/gemma-2-2b-it \
	-X POST \
	-d '{"inputs": "Can you please let us know more details about your "}' \
	-H 'Content-Type: application/json' \
	-H "Authorization: Bearer hf_***"

```
</curl>

<python>
```py
import requests

API_URL = "https://api-inference.huggingface.co/models/google/gemma-2-2b-it"
headers = {"Authorization": "Bearer hf_***"}

def query(payload):
	response = requests.post(API_URL, headers=headers, json=payload)
	return response.json()
	
output = query({
	"inputs": "Can you please let us know more details about your ",
})
```

To use the Python client, see `huggingface_hub`'s [package reference](https://huggingface.co/docs/huggingface_hub/package_reference/inference_client#huggingface_hub.InferenceClient.text_generation).
</python>

<js>
```js
async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/google/gemma-2-2b-it",
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

query({"inputs": "Can you please let us know more details about your "}).then((response) => {
	console.log(JSON.stringify(response));
});
```

To use the JavaScript client, see `huggingface.js`'s [package reference](https://huggingface.co/docs/huggingface.js/inference/classes/HfInference#textgeneration).
</js>

</inferencesnippet>


