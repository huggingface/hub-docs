<!---
WARNING

This markdown file has been generated from a script. Please do not edit it directly.

If you want to update the content related to together's description, please edit the template file under `https://github.com/huggingface/hub-docs/tree/main/scripts/inference-providers/templates/providers/together.handlebars`.

For more details, check out the `generate.ts` script: https://github.com/huggingface/hub-docs/blob/main/scripts/inference-providers/scripts/generate.ts.
--->

# Together

![https://www.together.ai/](https://cdn.prod.website-files.com/64f6f2c0e3f4c5a91c1e823a/65d36320026d81d87266e15f_together-color.jpg)

![https://huggingface.co/togethercomputer](https://huggingface.co/datasets/huggingface/badges/resolve/main/follow-us-on-hf-lg.svg)

Together decentralized cloud services empower developers and researchers at organizations of all sizes to train, fine-tune, and deploy generative AI models.

## Supported tasks


### Chat Completion (LLM)

Find out more about Chat Completion (LLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=text-generation
    providersMapping={ {"together":{"modelId":"deepseek-ai/DeepSeek-R1","providerModelId":"deepseek-ai/DeepSeek-R1"} } }
conversational />


### Chat Completion (VLM)

Find out more about Chat Completion (VLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=image-text-to-text
    providersMapping={ {"together":{"modelId":"meta-llama/Llama-4-Scout-17B-16E-Instruct","providerModelId":"meta-llama/Llama-4-Scout-17B-16E-Instruct"} } }
conversational />


### Text Generation

Find out more about Text Generation [here](../tasks/text_generation).

<InferenceSnippet
    pipeline=text-generation
    providersMapping={ {"together":{"modelId":"deepseek-ai/DeepSeek-R1","providerModelId":"deepseek-ai/DeepSeek-R1"} } }
/>


### Text To Image

Find out more about Text To Image [here](../tasks/text_to_image).

<InferenceSnippet
    pipeline=text-to-image
    providersMapping={ {"together":{"modelId":"black-forest-labs/FLUX.1-dev","providerModelId":"black-forest-labs/FLUX.1-dev"} } }
/>

