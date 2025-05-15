<!---
WARNING

This markdown file has been generated from a script. Please do not edit it directly.

### Template

If you want to update the content related to nscale's description, please edit the template file under `https://github.com/huggingface/hub-docs/tree/main/scripts/inference-providers/templates/providers/nscale.handlebars`.

### Logos

If you want to update nscale's logo, upload a file by opening a PR on https://huggingface.co/datasets/huggingface/documentation-images/tree/main/inference-providers/logos. Ping @wauplin and @celinah on the PR to let them know you uploaded a new logo.
Logos must be in .png format and be named `nscale-light.png` and `nscale-dark.png`. Visit https://huggingface.co/settings/theme to switch between light and dark mode and check that the logos are displayed correctly.

### Generation script

For more details, check out the `generate.ts` script: https://github.com/huggingface/hub-docs/blob/main/scripts/inference-providers/scripts/generate.ts.
--->

# Nscale

<div class="flex justify-center">
    <a href="https://www.nscale.com/" target="_blank">
        <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/logos/nscale-light.png"/>
        <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/logos/nscale-dark.png"/>
    </a>
</div>

<div class="flex">
    <a href="https://huggingface.co/nscale" target="_blank">
        <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/badges/resolve/main/follow-us-on-hf-lg.svg"/>
        <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/badges/resolve/main/follow-us-on-hf-lg-dark.svg"/>
    </a>
</div>

Nscale is a vertically integrated AI cloud that delivers bespoke, sovereign AI infrastructure at scale.

Built on this foundation, Nscale's inference service empowers developers with a wide range of models and ready-to-use inference services that integrate into workflows without the need to manage the underlying infrastructure.

## Supported tasks


### Chat Completion (LLM)

Find out more about Chat Completion (LLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=text-generation
    providersMapping={ {"nscale":{"modelId":"Qwen/Qwen3-235B-A22B","providerModelId":"Qwen/Qwen3-235B-A22B"} } }
conversational />


### Chat Completion (VLM)

Find out more about Chat Completion (VLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=image-text-to-text
    providersMapping={ {"nscale":{"modelId":"meta-llama/Llama-4-Scout-17B-16E-Instruct","providerModelId":"meta-llama/Llama-4-Scout-17B-16E-Instruct"} } }
conversational />


### Text To Image

Find out more about Text To Image [here](../tasks/text_to_image).

<InferenceSnippet
    pipeline=text-to-image
    providersMapping={ {"nscale":{"modelId":"black-forest-labs/FLUX.1-schnell","providerModelId":"black-forest-labs/FLUX.1-schnell"} } }
/>

