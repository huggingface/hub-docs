<!---
This markdown file has been generated from a script. Please do not edit it directly.
For more details, check out:
- the `generate.ts` script: https://github.com/huggingface/hub-docs/blob/main/scripts/inference-providers/scripts/generate.ts
- the task template defining the sections in the page: https://github.com/huggingface/hub-docs/tree/main/scripts/inference-providers/templates/task/token-classification.handlebars
- the input jsonschema specifications used to generate the input markdown table: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/tasks/token-classification/spec/input.json
- the output jsonschema specifications used to generate the output markdown table: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/tasks/token-classification/spec/output.json
- the snippets used to generate the example:
  - curl: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/snippets/curl.ts
  - python: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/snippets/python.ts
  - javascript: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/snippets/js.ts
- the "tasks" content for recommended models: https://huggingface.co/api/tasks
--->

## Token Classification

Token classification is a task in which a label is assigned to some tokens in a text. Some popular token classification subtasks are Named Entity Recognition (NER) and Part-of-Speech (PoS) tagging.

<Tip>

For more details about the `token-classification` task, check out its [dedicated page](https://huggingface.co/tasks/token-classification)! You will find examples and related materials.

</Tip>

### Recommended models

- [dslim/bert-base-NER](https://huggingface.co/dslim/bert-base-NER): A robust performance model to identify people, locations, organizations and names of miscellaneous entities.
- [FacebookAI/xlm-roberta-large-finetuned-conll03-english](https://huggingface.co/FacebookAI/xlm-roberta-large-finetuned-conll03-english): A strong model to identify people, locations, organizations and names in multiple languages.
- [blaze999/Medical-NER](https://huggingface.co/blaze999/Medical-NER): A token classification model specialized on medical entity recognition.
- [flair/ner-english](https://huggingface.co/flair/ner-english): Flair models are typically the state of the art in named entity recognition tasks.

Explore all available models and find the one that suits you best [here](https://huggingface.co/models?inference=warm&pipeline_tag=token-classification&sort=trending).

### Using the API


<InferenceSnippet
    pipeline=token-classification

    providersMapping={ {"hf-inference":{"modelId":"dslim/bert-base-NER","providerModelId":"dslim/bert-base-NER"}} }
/>



### API specification

#### Request

| Payload |  |  |
| :--- | :--- | :--- |
| **inputs*** | _string_ | The input text data |
| **parameters** | _object_ |  |
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

| Body |  |
| :--- | :--- | :--- |
| **(array)** | _object[]_ | Output is an array of objects. |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;entity_group** | _string_ | The predicted label for a group of one or more tokens |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;entity** | _string_ | The predicted label for a single token |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;score** | _number_ | The associated score / probability |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;word** | _string_ | The corresponding text |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;start** | _integer_ | The character position in the input where this group begins. |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;end** | _integer_ | The character position in the input where this group ends. |


