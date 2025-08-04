<!---
WARNING

This markdown file has been generated from a script. Please do not edit it directly.

### Template

If you want to update the content related to fireworks-ai's description, please edit the template file under `https://github.com/huggingface/hub-docs/tree/main/scripts/inference-providers/templates/providers/fireworks-ai.handlebars`.

### Logos

If you want to update fireworks-ai's logo, upload a file by opening a PR on https://huggingface.co/datasets/huggingface/documentation-images/tree/main/inference-providers/logos. Ping @wauplin and @celinah on the PR to let them know you uploaded a new logo.
Logos must be in .png format and be named `fireworks-ai-light.png` and `fireworks-ai-dark.png`. Visit https://huggingface.co/settings/theme to switch between light and dark mode and check that the logos are displayed correctly.

### Generation script

For more details, check out the `generate.ts` script: https://github.com/huggingface/hub-docs/blob/main/scripts/inference-providers/scripts/generate.ts.
--->

# Fireworks AI

<Tip>

All supported Fireworks AI models can be found [here](https://huggingface.co/models?inference_provider=fireworks-ai&sort=trending)

</Tip>

<div class="flex justify-center">
    <a href="https://fireworks.ai/" target="_blank">
        <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/logos/fireworks-ai-light.png"/>
        <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/logos/fireworks-ai-dark.png"/>
    </a>
</div>

<div class="flex">
    <a href="https://huggingface.co/fireworks-ai" target="_blank">
        <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/badges/resolve/main/follow-us-on-hf-lg.svg"/>
        <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/badges/resolve/main/follow-us-on-hf-lg-dark.svg"/>
    </a>
</div>

Fireworks AI is a developer-centric platform that delivers high-performance generative AI solutions, enabling efficient deployment and fine-tuning of large language models (LLMs) and image models.
## Supported tasks


### Chat Completion (LLM)

Find out more about Chat Completion (LLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=text-generation
    providersMapping={ {"fireworks-ai":{"modelId":"moonshotai/Kimi-K2-Instruct","providerModelId":"accounts/fireworks/models/kimi-k2-instruct"} } }
conversational />


### Chat Completion (VLM)

Find out more about Chat Completion (VLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=image-text-to-text
    providersMapping={ {"fireworks-ai":{"modelId":"meta-llama/Llama-4-Scout-17B-16E-Instruct","providerModelId":"accounts/fireworks/models/llama4-scout-instruct-basic"} } }
conversational />

