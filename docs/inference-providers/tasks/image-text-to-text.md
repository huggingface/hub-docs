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

<Tip>

For more details about the `image-text-to-text` task, check out its [dedicated page](https://huggingface.co/tasks/image-text-to-text)! You will find examples and related materials.

</Tip>

### Recommended models

- [Qwen/Qwen2.5-VL-7B-Instruct](https://huggingface.co/Qwen/Qwen2.5-VL-7B-Instruct): Strong image-text-to-text model.

Explore all available models and find the one that suits you best [here](https://huggingface.co/models?inference=warm&pipeline_tag=image-text-to-text&sort=trending).

### Using the API


<InferenceSnippet
    pipeline=image-text-to-text
    providersMapping={ {"cerebras":{"modelId":"meta-llama/Llama-4-Scout-17B-16E-Instruct","providerModelId":"llama-4-scout-17b-16e-instruct"},"cohere":{"modelId":"CohereLabs/aya-vision-8b","providerModelId":"c4ai-aya-vision-8b"},"featherless-ai":{"modelId":"CEIA-UFG/Gemma-3-Gaia-PT-BR-4b-it","providerModelId":"CEIA-UFG/Gemma-3-Gaia-PT-BR-4b-it"},"fireworks-ai":{"modelId":"meta-llama/Llama-4-Scout-17B-16E-Instruct","providerModelId":"accounts/fireworks/models/llama4-scout-instruct-basic"},"groq":{"modelId":"meta-llama/Llama-4-Scout-17B-16E-Instruct","providerModelId":"meta-llama/llama-4-scout-17b-16e-instruct"},"hf-inference":{"modelId":"meta-llama/Llama-3.2-11B-Vision-Instruct","providerModelId":"meta-llama/Llama-3.2-11B-Vision-Instruct"},"hyperbolic":{"modelId":"Qwen/Qwen2.5-VL-7B-Instruct","providerModelId":"Qwen/Qwen2.5-VL-7B-Instruct"},"nebius":{"modelId":"google/gemma-3-27b-it","providerModelId":"google/gemma-3-27b-it-fast"},"novita":{"modelId":"baidu/ERNIE-4.5-VL-424B-A47B-Base-PT","providerModelId":"baidu/ernie-4.5-vl-424b-a47b"},"nscale":{"modelId":"meta-llama/Llama-4-Scout-17B-16E-Instruct","providerModelId":"meta-llama/Llama-4-Scout-17B-16E-Instruct"},"sambanova":{"modelId":"meta-llama/Llama-4-Maverick-17B-128E-Instruct","providerModelId":"Llama-4-Maverick-17B-128E-Instruct"},"together":{"modelId":"meta-llama/Llama-4-Scout-17B-16E-Instruct","providerModelId":"meta-llama/Llama-4-Scout-17B-16E-Instruct"}} }
conversational />



### API specification

For the API specification of conversational image-text-to-text models, please refer to the [Chat Completion API documentation](https://huggingface.co/docs/inference-providers/tasks/chat-completion#api-specification).
