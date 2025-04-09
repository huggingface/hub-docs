<!---
WARNING

This markdown file has been generated from a script. Please do not edit it directly.

If you want to update the content related to fireworks-ai's description, please edit the template file under `https://github.com/huggingface/hub-docs/tree/main/scripts/inference-providers/templates/providers/fireworks-ai.handlebars`.

For more details, check out the `generate.ts` script: https://github.com/huggingface/hub-docs/blob/main/scripts/inference-providers/scripts/generate.ts.
--->

# Fireworks AI

[![fireworks.ai](https://d1.awsstatic.com/fireworks-ai-wordmark-color-dark.93b1f27fdf77899fa02afb949fb27317ee4081ad.png)](https://fireworks.ai/)

[![Follow us on Hugging Face](https://huggingface.co/datasets/huggingface/badges/resolve/main/follow-us-on-hf-lg.svg)](https://huggingface.co/fireworks-ai)

Fireworks AI is a developer-centric platform that delivers high-performance generative AI solutions, enabling efficient deployment and fine-tuning of large language models (LLMs) and image models.
## Supported tasks


### Chat Completion (LLM)

Find out more about Chat Completion (LLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=text-generation
    providersMapping={ {"fireworks-ai":{"modelId":"deepseek-ai/DeepSeek-V3-0324","providerModelId":"accounts/fireworks/models/deepseek-v3-0324"} } }
conversational />


### Chat Completion (VLM)

Find out more about Chat Completion (VLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=image-text-to-text
    providersMapping={ {"fireworks-ai":{"modelId":"meta-llama/Llama-4-Scout-17B-16E-Instruct","providerModelId":"accounts/fireworks/models/llama4-scout-instruct-basic"} } }
conversational />

