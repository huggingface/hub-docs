<!---
WARNING

This markdown file has been generated from a script. Please do not edit it directly.

If you want to update the content related to sambanova's description, please edit the template file under `https://github.com/huggingface/hub-docs/tree/main/scripts/inference-providers/templates/providers/sambanova.handlebars`.

For more details, check out the `generate.ts` script: https://github.com/huggingface/hub-docs/blob/main/scripts/inference-providers/scripts/generate.ts.
--->

# SambaNova

![https://sambanova.ai/](https://sambanova.ai/hubfs/sambanova-logo-black.png)

SambaNova's AI platform is the technology backbone for the next decade of AI innovation.
Customers are turning to SambaNova to quickly deploy state-of-the-art AI and deep learning capabilities that help them outcompete their peers.

## Supported tasks


### Chat Completion (LLM)

Find out more about Chat Completion (LLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=text-generation
    providersMapping={ {"sambanova":{"modelId":"deepseek-ai/DeepSeek-V3-0324","providerModelId":"DeepSeek-V3-0324"} } }
conversational />


### Chat Completion (VLM)

Find out more about Chat Completion (VLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=image-text-to-text
    providersMapping={ {"sambanova":{"modelId":"meta-llama/Llama-4-Scout-17B-16E-Instruct","providerModelId":"Llama-4-Scout-17B-16E-Instruct"} } }
conversational />


### Feature Extraction

Find out more about Feature Extraction [here](../tasks/feature_extraction).

<InferenceSnippet
    pipeline=feature-extraction
    providersMapping={ {"sambanova":{"modelId":"intfloat/e5-mistral-7b-instruct","providerModelId":"E5-Mistral-7B-Instruct"} } }
/>

