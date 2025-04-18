<!---
WARNING

This markdown file has been generated from a script. Please do not edit it directly.

### Template

If you want to update the content related to novita's description, please edit the template file under `https://github.com/huggingface/hub-docs/tree/main/scripts/inference-providers/templates/providers/novita.handlebars`.

### Logos

If you want to update novita's logo, upload a file by opening a PR on https://huggingface.co/datasets/huggingface/documentation-images/tree/main/inference-providers/logos. Ping @wauplin and @celinah on the PR to let them know you uploaded a new logo.
Logos must be in .png format and be named `novita-light.png` and `novita-dark.png`. Visit https://huggingface.co/settings/theme to switch between light and dark mode and check that the logos are displayed correctly.

### Generation script

For more details, check out the `generate.ts` script: https://github.com/huggingface/hub-docs/blob/main/scripts/inference-providers/scripts/generate.ts.
--->

# Novita

<div class="flex justify-center">
    <a href="https://novita.ai/" target="_blank">
        <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/logos/novita-light.png"/>
        <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/logos/novita-dark.png"/>
    </a>
</div>

<div class="flex">
    <a href="https://huggingface.co/novita" target="_blank">
        <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/badges/resolve/main/follow-us-on-hf-lg.svg"/>
        <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/badges/resolve/main/follow-us-on-hf-lg-dark.svg"/>
    </a>
</div>

​Novita AI is a comprehensive AI cloud platform that provides developers and businesses with access to over 200 APIs for tasks such as image generation, video processing, audio synthesis, and large language models.

## Supported tasks


### Chat Completion (LLM)

Find out more about Chat Completion (LLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=text-generation
    providersMapping={ {"novita":{"modelId":"deepseek-ai/DeepSeek-V3-0324","providerModelId":"deepseek/deepseek-v3-0324"} } }
conversational />


### Chat Completion (VLM)

Find out more about Chat Completion (VLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=image-text-to-text
    providersMapping={ {"novita":{"modelId":"meta-llama/Llama-4-Scout-17B-16E-Instruct","providerModelId":"meta-llama/llama-4-scout-17b-16e-instruct"} } }
conversational />


### Text To Video

Find out more about Text To Video [here](../tasks/text_to_video).

<InferenceSnippet
    pipeline=text-to-video
    providersMapping={ {"novita":{"modelId":"Wan-AI/Wan2.1-T2V-14B","providerModelId":"wan-t2v"} } }
/>

