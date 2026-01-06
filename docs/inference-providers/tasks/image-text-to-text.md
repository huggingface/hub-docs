<!---
This markdown file has been generated from a script. Please do not edit it directly.
For more details, check out:
- the `generate.ts` script: https://github.com/huggingface/hub-docs/blob/main/scripts/inference-providers/scripts/generate.ts
- the task template defining the sections in the page: https://github.com/huggingface/hub-docs/tree/main/scripts/inference-providers/templates/task/image-text-to-text.handlebars
- the input jsonschema specifications used to generate the input markdown table: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/tasks/image-text-to-text/spec/input.json
- the output jsonschema specifications used to generate the output markdown table: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/tasks/image-text-to-text/spec/output.json
- the snippets used to generate the example:
  - curl: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/snippets/curl.ts
  - python: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/snippets/python.ts
  - javascript: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/snippets/js.ts
- the "tasks" content for recommended models: https://huggingface.co/api/tasks
--->

## Image-Text to Text

Image-text-to-text models take in an image and text prompt and output text. These models are also called vision-language models, or VLMs. The difference from image-to-text models is that these models take an additional text input, not restricting the model to certain use cases like image captioning, and may also be trained to accept a conversation as input.

> [!TIP]
> For more details about the `image-text-to-text` task, check out its [dedicated page](https://huggingface.co/tasks/image-text-to-text)! You will find examples and related materials.


### Recommended models

- [zai-org/GLM-4.5V](https://huggingface.co/zai-org/GLM-4.5V): Cutting-edge reasoning vision language model.

Explore all available models and find the one that suits you best [here](https://huggingface.co/models?inference=warm&pipeline_tag=image-text-to-text&sort=trending).

### Using the API


<InferenceSnippet
    pipeline=image-text-to-text
    providersMapping={ {"cohere":{"modelId":"CohereLabs/aya-vision-32b","providerModelId":"c4ai-aya-vision-32b"},"featherless-ai":{"modelId":"google/gemma-3-27b-it","providerModelId":"google/gemma-3-27b-it"},"fireworks-ai":{"modelId":"Qwen/Qwen2.5-VL-32B-Instruct","providerModelId":"accounts/fireworks/models/qwen2p5-vl-32b-instruct"},"hyperbolic":{"modelId":"Qwen/Qwen2.5-VL-7B-Instruct","providerModelId":"Qwen/Qwen2.5-VL-7B-Instruct"},"nebius":{"modelId":"google/gemma-3-27b-it","providerModelId":"google/gemma-3-27b-it-fast"},"novita":{"modelId":"zai-org/GLM-4.6V-Flash","providerModelId":"zai-org/glm-4.6v"},"ovhcloud":{"modelId":"Qwen/Qwen2.5-VL-72B-Instruct","providerModelId":"Qwen2.5-VL-72B-Instruct"},"scaleway":{"modelId":"google/gemma-3-27b-it","providerModelId":"gemma-3-27b-it"},"together":{"modelId":"ServiceNow-AI/Apriel-1.6-15b-Thinker","providerModelId":"ServiceNow-AI/Apriel-1.5-15b-Thinker"},"zai-org":{"modelId":"zai-org/GLM-4.6V-Flash","providerModelId":"glm-4.6v-flash"}} }
conversational />



### API specification

For the API specification of conversational image-text-to-text models, please refer to the [Chat Completion API documentation](https://huggingface.co/docs/inference-providers/tasks/chat-completion#api-specification).
