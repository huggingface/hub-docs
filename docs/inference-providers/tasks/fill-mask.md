<!---
This markdown file has been generated from a script. Please do not edit it directly.
For more details, check out:
- the `generate.ts` script: https://github.com/huggingface/hub-docs/blob/main/scripts/inference-providers/scripts/generate.ts
- the task template defining the sections in the page: https://github.com/huggingface/hub-docs/tree/main/scripts/inference-providers/templates/task/fill-mask.handlebars
- the input jsonschema specifications used to generate the input markdown table: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/tasks/fill-mask/spec/input.json
- the output jsonschema specifications used to generate the output markdown table: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/tasks/fill-mask/spec/output.json
- the snippets used to generate the example:
  - curl: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/snippets/curl.ts
  - python: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/snippets/python.ts
  - javascript: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/snippets/js.ts
- the "tasks" content for recommended models: https://huggingface.co/api/tasks
--->

## Fill-mask

Mask filling is the task of predicting the right word (token to be precise) in the middle of a sequence.

<Tip>

For more details about the `fill-mask` task, check out its [dedicated page](https://huggingface.co/tasks/fill-mask)! You will find examples and related materials.

</Tip>

### Recommended models


Explore all available models and find the one that suits you best [here](https://huggingface.co/models?inference=warm&pipeline_tag=fill-mask&sort=trending).

### Using the API


<InferenceSnippet
    pipeline=fill-mask
    providersMapping={ {"hf-inference":{"modelId":"google-bert/bert-base-uncased","providerModelId":"google-bert/bert-base-uncased"}} }
/>



### API specification

#### Request

| Headers |   |    |
| :--- | :--- | :--- |
| **authorization** | _string_ | Authentication header in the form `'Bearer: hf_****'` when `hf_****` is a personal user access token with "Inference Providers" permission. You can generate one from [your settings page](https://huggingface.co/settings/tokens/new?ownUserPermissions=inference.serverless.write&tokenType=fineGrained). |


| Payload |  |  |
| :--- | :--- | :--- |
| **inputs*** | _string_ | The text with masked tokens |
| **parameters** | _object_ |  |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;top_k** | _integer_ | When passed, overrides the number of predictions to return. |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;targets** | _string[]_ | When passed, the model will limit the scores to the passed targets instead of looking up in the whole vocabulary. If the provided targets are not in the model vocab, they will be tokenized and the first resulting token will be used (with a warning, and that might be slower). |


#### Response

| Body |  |
| :--- | :--- | :--- |
| **(array)** | _object[]_ | Output is an array of objects. |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sequence** | _string_ | The corresponding input with the mask token prediction. |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;score** | _number_ | The corresponding probability |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;token** | _integer_ | The predicted token id (to replace the masked one). |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;token_str** | _string_ | The predicted token (to replace the masked one). |

