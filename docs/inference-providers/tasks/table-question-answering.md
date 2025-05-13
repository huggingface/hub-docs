<!---
This markdown file has been generated from a script. Please do not edit it directly.
For more details, check out:
- the `generate.ts` script: https://github.com/huggingface/hub-docs/blob/main/scripts/inference-providers/scripts/generate.ts
- the task template defining the sections in the page: https://github.com/huggingface/hub-docs/tree/main/scripts/inference-providers/templates/task/table-question-answering.handlebars
- the input jsonschema specifications used to generate the input markdown table: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/tasks/table-question-answering/spec/input.json
- the output jsonschema specifications used to generate the output markdown table: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/tasks/table-question-answering/spec/output.json
- the snippets used to generate the example:
  - curl: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/snippets/curl.ts
  - python: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/snippets/python.ts
  - javascript: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/snippets/js.ts
- the "tasks" content for recommended models: https://huggingface.co/api/tasks
--->

## Table Question Answering

Table Question Answering (Table QA) is the answering a question about an information on a given table.

<Tip>

For more details about the `table-question-answering` task, check out its [dedicated page](https://huggingface.co/tasks/table-question-answering)! You will find examples and related materials.

</Tip>

### Recommended models

- [microsoft/tapex-base](https://huggingface.co/microsoft/tapex-base): A table question answering model that is capable of neural SQL execution, i.e., employ TAPEX to execute a SQL query on a given table.
- [google/tapas-base-finetuned-wtq](https://huggingface.co/google/tapas-base-finetuned-wtq): A robust table question answering model.

Explore all available models and find the one that suits you best [here](https://huggingface.co/models?inference=warm&pipeline_tag=table-question-answering&sort=trending).

### Using the API


<InferenceSnippet
    pipeline=table-question-answering
    providersMapping={ {"hf-inference":{"modelId":"google/tapas-base-finetuned-wtq","providerModelId":"google/tapas-base-finetuned-wtq"}} }
/>



### API specification

#### Request

| Headers |   |    |
| :--- | :--- | :--- |
| **authorization** | _string_ | Authentication header in the form `'Bearer: hf_****'` when `hf_****` is a personal user access token with "Inference Providers" permission. You can generate one from [your settings page](https://huggingface.co/settings/tokens/new?ownUserPermissions=inference.serverless.write&tokenType=fineGrained). |


| Payload |  |  |
| :--- | :--- | :--- |
| **inputs*** | _object_ | One (table, question) pair to answer |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;table*** | _object_ | The table to serve as context for the questions |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;question*** | _string_ | The question to be answered about the table |
| **parameters** | _object_ |  |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;padding** | _enum_ | Possible values: do_not_pad, longest, max_length. |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sequential** | _boolean_ | Whether to do inference sequentially or as a batch. Batching is faster, but models like SQA require the inference to be done sequentially to extract relations within sequences, given their conversational nature. |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;truncation** | _boolean_ | Activates and controls truncation. |


#### Response

| Body |  |
| :--- | :--- | :--- |
| **(array)** | _object[]_ | Output is an array of objects. |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;answer** | _string_ | The answer of the question given the table. If there is an aggregator, the answer will be preceded by `AGGREGATOR >`. |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;coordinates** | _array[]_ | Coordinates of the cells of the answers. |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cells** | _string[]_ | List of strings made up of the answer cell values. |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;aggregator** | _string_ | If the model has an aggregator, this returns the aggregator. |

