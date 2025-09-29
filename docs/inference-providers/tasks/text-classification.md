<!---
This markdown file has been generated from a script. Please do not edit it directly.
For more details, check out:
- the `generate.ts` script: https://github.com/huggingface/hub-docs/blob/main/scripts/inference-providers/scripts/generate.ts
- the task template defining the sections in the page: https://github.com/huggingface/hub-docs/tree/main/scripts/inference-providers/templates/task/text-classification.handlebars
- the input jsonschema specifications used to generate the input markdown table: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/tasks/text-classification/spec/input.json
- the output jsonschema specifications used to generate the output markdown table: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/tasks/text-classification/spec/output.json
- the snippets used to generate the example:
  - curl: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/snippets/curl.ts
  - python: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/snippets/python.ts
  - javascript: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/snippets/js.ts
- the "tasks" content for recommended models: https://huggingface.co/api/tasks
--->

## Text Classification

Text Classification is the task of assigning a label or class to a given text. Some use cases are sentiment analysis, natural language inference, and assessing grammatical correctness.

> [!TIP]
> For more details about the `text-classification` task, check out its [dedicated page](https://huggingface.co/tasks/text-classification)! You will find examples and related materials.


### Recommended models

- [distilbert/distilbert-base-uncased-finetuned-sst-2-english](https://huggingface.co/distilbert/distilbert-base-uncased-finetuned-sst-2-english): A robust model trained for sentiment analysis.
- [ProsusAI/finbert](https://huggingface.co/ProsusAI/finbert): A sentiment analysis model specialized in financial sentiment.
- [cardiffnlp/twitter-roberta-base-sentiment-latest](https://huggingface.co/cardiffnlp/twitter-roberta-base-sentiment-latest): A sentiment analysis model specialized in analyzing tweets.
- [papluca/xlm-roberta-base-language-detection](https://huggingface.co/papluca/xlm-roberta-base-language-detection): A model that can classify languages.
- [meta-llama/Prompt-Guard-86M](https://huggingface.co/meta-llama/Prompt-Guard-86M): A model that can classify text generation attacks.

Explore all available models and find the one that suits you best [here](https://huggingface.co/models?inference=warm&pipeline_tag=text-classification&sort=trending).

### Using the API


<InferenceSnippet
    pipeline=text-classification
    providersMapping={ {"hf-inference":{"modelId":"tabularisai/multilingual-sentiment-analysis","providerModelId":"tabularisai/multilingual-sentiment-analysis"}} }
/>



### API specification

#### Request

| Headers |   |    |
| :--- | :--- | :--- |
| **authorization** | _string_ | Authentication header in the form `'Bearer: hf_****'` when `hf_****` is a personal user access token with "Inference Providers" permission. You can generate one from [your settings page](https://huggingface.co/settings/tokens/new?ownUserPermissions=inference.serverless.write&tokenType=fineGrained). |


| Payload |  |  |
| :--- | :--- | :--- |
| **inputs*** | _string_ | The text to classify |
| **parameters** | _object_ |  |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;function_to_apply** | _enum_ | Possible values: sigmoid, softmax, none. |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;top_k** | _integer_ | When specified, limits the output to the top K most probable classes. |


#### Response

| Body |  |
| :--- | :--- | :--- |
| **(array)** | _object[]_ | Output is an array of objects. |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;label** | _string_ | The predicted class label. |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;score** | _number_ | The corresponding probability. |

