<!---
WARNING

This markdown file has been generated from a script. Please do not edit it directly.

If you want to update the content related to cerebras's description, please edit the template file under `https://github.com/huggingface/hub-docs/tree/main/scripts/inference-providers/templates/providers/cerebras.handlebars`.

For more details, check out the `generate.ts` script: https://github.com/huggingface/hub-docs/blob/main/scripts/inference-providers/scripts/generate.ts.
--->

# Cerebras

[![Cerebras Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cerebras_logo.svg/512px-Cerebras_logo.svg.png)](https://www.cerebras.ai/)

[![Follow us on Hugging Face](https://huggingface.co/datasets/huggingface/badges/resolve/main/follow-us-on-hf-lg.svg)](https://huggingface.co/cerebras)

Cerebras stands alone as the world’s fastest AI inference and training platform. Organizations across fields like medical research, cryptography, energy, and agentic AI use our CS-2 and CS-3 systems to build on-premise supercomputers, while developers and enterprises everywhere can access the power of Cerebras through our pay-as-you-go cloud offerings.

## Supported tasks


### Chat Completion (LLM)

Find out more about Chat Completion (LLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=text-generation
    providersMapping={ {"cerebras":{"modelId":"meta-llama/Llama-3.3-70B-Instruct","providerModelId":"llama-3.3-70b"} } }
conversational />

