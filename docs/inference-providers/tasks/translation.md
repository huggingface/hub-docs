<!---
This markdown file has been generated from a script. Please do not edit it directly.
For more details, check out:
- the `generate.ts` script: https://github.com/huggingface/hub-docs/blob/main/scripts/inference-providers/scripts/generate.ts
- the task template defining the sections in the page: https://github.com/huggingface/hub-docs/tree/main/scripts/inference-providers/templates/task/translation.handlebars
- the input jsonschema specifications used to generate the input markdown table: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/tasks/translation/spec/input.json
- the output jsonschema specifications used to generate the output markdown table: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/tasks/translation/spec/output.json
- the snippets used to generate the example:
  - curl: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/snippets/curl.ts
  - python: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/snippets/python.ts
  - javascript: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/snippets/js.ts
- the "tasks" content for recommended models: https://huggingface.co/api/tasks
--->

## Translation

Translation is the task of converting text from one language to another.

<Tip>

For more details about the `translation` task, check out its [dedicated page](https://huggingface.co/tasks/translation)! You will find examples and related materials.

</Tip>

### Recommended models

- [google-t5/t5-base](https://huggingface.co/google-t5/t5-base): A general-purpose Transformer that can be used to translate from English to German, French, or Romanian.

Explore all available models and find the one that suits you best [here](https://huggingface.co/models?inference=warm&pipeline_tag=translation&sort=trending).

### Using the API


<InferenceSnippet
    pipeline=translation
    providersMapping={ {"hf-inference":{"modelId":"google-t5/t5-base","providerModelId":"google-t5/t5-base"}} }
/>



### API specification

#### Request

| Headers |   |    |
| :--- | :--- | :--- |
| **authorization** | _string_ | Authentication header in the form `'Bearer: hf_****'` when `hf_****` is a personal user access token with "Inference Providers" permission. You can generate one from [your settings page](https://huggingface.co/settings/tokens/new?ownUserPermissions=inference.serverless.write&tokenType=fineGrained). |


| Payload |  |  |
| :--- | :--- | :--- |
| **inputs*** | _string_ | The text to translate. |
| **parameters** | _object_ |  |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;src_lang** | _string_ | The source language of the text. Required for models that can translate from multiple languages. |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;tgt_lang** | _string_ | Target language to translate to. Required for models that can translate to multiple languages. |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;clean_up_tokenization_spaces** | _boolean_ | Whether to clean up the potential extra spaces in the text output. |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;truncation** | _enum_ | Possible values: do_not_truncate, longest_first, only_first, only_second. |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;generate_parameters** | _object_ | Additional parametrization of the text generation algorithm. |


#### Response

| Body |  |
| :--- | :--- | :--- |
| **translation_text** | _string_ | The translated text. |

