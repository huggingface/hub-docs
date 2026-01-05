<!---
WARNING

This markdown file has been generated from a script. Please do not edit it directly.

### Template

If you want to update the content related to featherless-ai's description, please edit the template file under `https://github.com/huggingface/hub-docs/tree/main/scripts/inference-providers/templates/providers/featherless-ai.handlebars`.

### Logos

If you want to update featherless-ai's logo, upload a file by opening a PR on https://huggingface.co/datasets/huggingface/documentation-images/tree/main/inference-providers/logos. Ping @wauplin and @celinah on the PR to let them know you uploaded a new logo.
Logos must be in .png format and be named `featherless-ai-light.png` and `featherless-ai-dark.png`. Visit https://huggingface.co/settings/theme to switch between light and dark mode and check that the logos are displayed correctly.

### Generation script

For more details, check out the `generate.ts` script: https://github.com/huggingface/hub-docs/blob/main/scripts/inference-providers/scripts/generate.ts.
--->

# Featherless AI

> [!TIP]
> All supported Featherless AI models can be found [here](https://huggingface.co/models?inference_provider=featherless-ai&sort=trending)

<div class="flex justify-center">
    <a href="https://featherless.ai/" target="_blank">
        <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/logos/featherless-ai-light.png"/>
        <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/logos/featherless-ai-dark.png"/>
    </a>
</div>

<div class="flex">
    <a href="https://huggingface.co/featherless-ai" target="_blank">
        <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/badges/resolve/main/follow-us-on-hf-lg.svg"/>
        <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/badges/resolve/main/follow-us-on-hf-lg-dark.svg"/>
    </a>
</div>

[Featherless AI](https://featherless.ai) is a serverless AI inference platform that offers access to thousands of open-source models. 

Our goal is to make all AI models available for serverless inference. We provide inference via API to a continually expanding library of open-weight models.

## Supported tasks


### Chat Completion (LLM)

Find out more about Chat Completion (LLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=text-generation
    providersMapping={ {"featherless-ai":{"modelId":"meta-llama/Llama-3.1-8B-Instruct","providerModelId":"meta-llama/Meta-Llama-3.1-8B-Instruct"} } }
conversational />


### Chat Completion (VLM)

Find out more about Chat Completion (VLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=image-text-to-text
    providersMapping={ {"featherless-ai":{"modelId":"google/gemma-3-27b-it","providerModelId":"google/gemma-3-27b-it"} } }
conversational />


### Text Generation

Find out more about Text Generation [here](../tasks/text-generation).

<InferenceSnippet
    pipeline=text-generation
    providersMapping={ {"featherless-ai":{"modelId":"meta-llama/Llama-3.1-8B-Instruct","providerModelId":"meta-llama/Meta-Llama-3.1-8B-Instruct"} } }
/>

