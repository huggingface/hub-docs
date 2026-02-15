<!---
WARNING

This markdown file has been generated from a script. Please do not edit it directly.

### Template

If you want to update the content related to cerebras's description, please edit the template file under `https://github.com/huggingface/hub-docs/tree/main/scripts/inference-providers/templates/providers/cerebras.handlebars`.

### Logos

If you want to update cerebras's logo, upload a file by opening a PR on https://huggingface.co/datasets/huggingface/documentation-images/tree/main/inference-providers/logos. Ping @wauplin and @celinah on the PR to let them know you uploaded a new logo.
Logos must be in .png format and be named `cerebras-light.png` and `cerebras-dark.png`. Visit https://huggingface.co/settings/theme to switch between light and dark mode and check that the logos are displayed correctly.

### Generation script

For more details, check out the `generate.ts` script: https://github.com/huggingface/hub-docs/blob/main/scripts/inference-providers/scripts/generate.ts.
--->

# Cerebras

> [!TIP]
> All supported Cerebras models can be found [here](https://huggingface.co/models?inference_provider=cerebras&sort=trending)

<div class="flex justify-center">
    <a href="https://www.cerebras.ai/" target="_blank">
        <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/logos/cerebras-light.png"/>
        <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/logos/cerebras-dark.png"/>
    </a>
</div>

<div class="flex">
    <a href="https://huggingface.co/cerebras" target="_blank">
        <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/badges/resolve/main/follow-us-on-hf-lg.svg"/>
        <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/badges/resolve/main/follow-us-on-hf-lg-dark.svg"/>
    </a>
</div>

Cerebras stands alone as the world’s fastest AI inference and training platform. Organizations across fields like medical research, cryptography, energy, and agentic AI use our CS-2 and CS-3 systems to build on-premise supercomputers, while developers and enterprises everywhere can access the power of Cerebras through our pay-as-you-go cloud offerings.

## Supported tasks


### Chat Completion (LLM)

Find out more about Chat Completion (LLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=text-generation
    providersMapping={ {"cerebras":{"modelId":"meta-llama/Llama-3.1-8B-Instruct","providerModelId":"llama3.1-8b"} } }
conversational />

