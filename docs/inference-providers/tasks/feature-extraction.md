<!---
This markdown file has been generated from a script. Please do not edit it directly.
For more details, check out:
- the `generate.ts` script: https://github.com/huggingface/hub-docs/blob/main/scripts/inference-providers/scripts/generate.ts
- the task template defining the sections in the page: https://github.com/huggingface/hub-docs/tree/main/scripts/inference-providers/templates/task/feature-extraction.handlebars
- the input jsonschema specifications used to generate the input markdown table: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/tasks/feature-extraction/spec/input.json
- the output jsonschema specifications used to generate the output markdown table: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/tasks/feature-extraction/spec/output.json
- the snippets used to generate the example:
  - curl: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/snippets/curl.ts
  - python: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/snippets/python.ts
  - javascript: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/snippets/js.ts
- the "tasks" content for recommended models: https://huggingface.co/api/tasks
--->

## Feature Extraction

Feature extraction is the task of converting a text into a vector (often called "embedding").

Example applications:
* Retrieving the most relevant documents for a query (for RAG applications).
* Reranking a list of documents based on their similarity to a query.
* Calculating the similarity between two sentences.

<Tip>

For more details about the `feature-extraction` task, check out its [dedicated page](https://huggingface.co/tasks/feature-extraction)! You will find examples and related materials.

</Tip>

### Recommended models

- [thenlper/gte-large](https://huggingface.co/thenlper/gte-large): A powerful feature extraction model for natural language processing tasks.

Explore all available models and find the one that suits you best [here](https://huggingface.co/models?inference=warm&pipeline_tag=feature-extraction&sort=trending).

### Using the API


<InferenceSnippet
    pipeline=feature-extraction
    providersMapping={ {"hf-inference":{"modelId":"intfloat/multilingual-e5-large","providerModelId":"intfloat/multilingual-e5-large"},"sambanova":{"modelId":"intfloat/e5-mistral-7b-instruct","providerModelId":"E5-Mistral-7B-Instruct"}} }
/>



### API specification

#### Request

| Headers |   |    |
| :--- | :--- | :--- |
| **authorization** | _string_ | Authentication header in the form `'Bearer: hf_****'` when `hf_****` is a personal user access token with "Inference Providers" permission. You can generate one from [your settings page](https://huggingface.co/settings/tokens/new?ownUserPermissions=inference.serverless.write&tokenType=fineGrained). |


| Payload |  |  |
| :--- | :--- | :--- |
| **inputs*** | _unknown_ | One of the following: |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(#1)** | _string_ |  |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(#2)** | _string[]_ |  |
| **normalize** | _boolean_ |  |
| **prompt_name** | _string_ | The name of the prompt that should be used by for encoding. If not set, no prompt will be applied.  Must be a key in the `sentence-transformers` configuration `prompts` dictionary.  For example if ``prompt_name`` is "query" and the ``prompts`` is {"query": "query: ", ...}, then the sentence "What is the capital of France?" will be encoded as "query: What is the capital of France?" because the prompt text will be prepended before any text to encode. |
| **truncate** | _boolean_ |  |
| **truncation_direction** | _enum_ | Possible values: Left, Right. |


#### Response

| Body |  |
| :--- | :--- | :--- |
| **(array)** | _array[]_ | Output is an array of arrays. |


