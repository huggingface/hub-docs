<!---
WARNING

This markdown file has been generated from a script. Please do not edit it directly.

If you want to update the content related to nebius's description, please edit the template file under `https://github.com/huggingface/hub-docs/tree/main/scripts/inference-providers/templates/providers/nebius.handlebars`.

For more details, check out the `generate.ts` script: https://github.com/huggingface/hub-docs/blob/main/scripts/inference-providers/scripts/generate.ts.
--->

# Nebius

[![Nebius Logo](https://companieslogo.com/img/orig/NBIS_BIG-446495ba.png?t=1729269594)](https://nebius.com/)

[![Follow us on Hugging Face](https://huggingface.co/datasets/huggingface/badges/resolve/main/follow-us-on-hf-lg.svg)](https://huggingface.co/nebius)

​Nebius AI is a technology company specializing in AI-centric cloud platforms, offering scalable GPU clusters, managed services, and developer tools designed for intensive AI workloads. Headquartered in Amsterdam, Nebius provides flexible architecture and high-performance infrastructure to support AI model training and inference at any scale.

## Supported tasks


### Chat Completion (LLM)

Find out more about Chat Completion (LLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=text-generation
    providersMapping={ {"nebius":{"modelId":"deepseek-ai/DeepSeek-V3-0324","providerModelId":"deepseek-ai/DeepSeek-V3-0324-fast"} } }
conversational />


### Chat Completion (VLM)

Find out more about Chat Completion (VLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=image-text-to-text
    providersMapping={ {"nebius":{"modelId":"google/gemma-3-27b-it","providerModelId":"google/gemma-3-27b-it-fast"} } }
conversational />


### Text To Image

Find out more about Text To Image [here](../tasks/text_to_image).

<InferenceSnippet
    pipeline=text-to-image
    providersMapping={ {"nebius":{"modelId":"black-forest-labs/FLUX.1-dev","providerModelId":"black-forest-labs/flux-dev"} } }
/>

