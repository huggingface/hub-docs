<!---
WARNING

This markdown file has been generated from a script. Please do not edit it directly.

If you want to update the content related to hyperbolic's description, please edit the template file under `https://github.com/huggingface/hub-docs/tree/main/scripts/inference-providers/templates/providers/hyperbolic.handlebars`.

For more details, check out the `generate.ts` script: https://github.com/huggingface/hub-docs/blob/main/scripts/inference-providers/scripts/generate.ts.
--->

# Hyperbolic

[![hyperbolic.xyz logo](https://cdn-images-1.medium.com/max/330/1*vVHd_J2oAOKr1IyjFB-pYQ@2x.png)](https://hyperbolic.xyz/)

[![Follow us on Hugging Face](https://huggingface.co/datasets/huggingface/badges/resolve/main/follow-us-on-hf-lg.svg)](https://huggingface.co/hyperbolic)

Hyperbolic is building an open-access platform for AI development by aggregating idle computing resources and making it seamlessly simple to use them.

## Supported tasks


### Chat Completion (LLM)

Find out more about Chat Completion (LLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=text-generation
    providersMapping={ {"hyperbolic":{"modelId":"deepseek-ai/DeepSeek-V3-0324","providerModelId":"deepseek-ai/DeepSeek-V3-0324"} } }
conversational />


### Chat Completion (VLM)

Find out more about Chat Completion (VLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=image-text-to-text
    providersMapping={ {"hyperbolic":{"modelId":"Qwen/Qwen2.5-VL-7B-Instruct","providerModelId":"Qwen/Qwen2.5-VL-7B-Instruct"} } }
conversational />

