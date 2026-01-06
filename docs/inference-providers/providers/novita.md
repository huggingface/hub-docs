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

> [!TIP]
> All supported Novita models can be found [here](https://huggingface.co/models?inference_provider=novita&sort=trending)

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

[Novita](https://novita.ai) is the go-to inference platform for AI developers seeking a low-cost, reliable, and simple solution for shipping AI models.

Offering 200+ APIs (LLMs, image, video, audio) with fully managed deployment — enterprise-grade, scalable, and maintenance-free.

## Supported tasks


### Chat Completion (LLM)

Find out more about Chat Completion (LLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=text-generation
    providersMapping={ {"novita":{"modelId":"zai-org/GLM-4.7","providerModelId":"zai-org/glm-4.7"} } }
conversational />


### Chat Completion (VLM)

Find out more about Chat Completion (VLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=image-text-to-text
    providersMapping={ {"novita":{"modelId":"zai-org/GLM-4.6V-Flash","providerModelId":"zai-org/glm-4.6v"} } }
conversational />


### Text To Video

Find out more about Text To Video [here](../tasks/text-to-video).

<InferenceSnippet
    pipeline=text-to-video
    providersMapping={ {"novita":{"modelId":"Wan-AI/Wan2.1-T2V-14B","providerModelId":"wan-t2v"} } }
/>

