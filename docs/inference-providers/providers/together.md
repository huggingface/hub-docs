<!---
WARNING

This markdown file has been generated from a script. Please do not edit it directly.

### Template

If you want to update the content related to together's description, please edit the template file under `https://github.com/huggingface/hub-docs/tree/main/scripts/inference-providers/templates/providers/together.handlebars`.

### Logos

If you want to update together's logo, upload a file by opening a PR on https://huggingface.co/datasets/huggingface/documentation-images/tree/main/inference-providers/logos. Ping @wauplin and @celinah on the PR to let them know you uploaded a new logo.
Logos must be in .png format and be named `together-light.png` and `together-dark.png`. Visit https://huggingface.co/settings/theme to switch between light and dark mode and check that the logos are displayed correctly.

### Generation script

For more details, check out the `generate.ts` script: https://github.com/huggingface/hub-docs/blob/main/scripts/inference-providers/scripts/generate.ts.
--->

# Together

> [!TIP]
> All supported Together models can be found [here](https://huggingface.co/models?inference_provider=together&sort=trending)

<div class="flex justify-center">
    <a href="https://together.xyz/" target="_blank">
        <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/logos/together-light.png"/>
        <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/logos/together-dark.png"/>
    </a>
</div>

<div class="flex">
    <a href="https://huggingface.co/togethercomputer" target="_blank">
        <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/badges/resolve/main/follow-us-on-hf-lg.svg"/>
        <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/badges/resolve/main/follow-us-on-hf-lg-dark.svg"/>
    </a>
</div>

Together decentralized cloud services empower developers and researchers at organizations of all sizes to train, fine-tune, and deploy generative AI models.

## Supported tasks


### Chat Completion (LLM)

Find out more about Chat Completion (LLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=text-generation
    providersMapping={ {"together":{"modelId":"EssentialAI/rnj-1-instruct","providerModelId":"essentialai/rnj-1-instruct"} } }
conversational />


### Chat Completion (VLM)

Find out more about Chat Completion (VLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=image-text-to-text
    providersMapping={ {"together":{"modelId":"ServiceNow-AI/Apriel-1.6-15b-Thinker","providerModelId":"ServiceNow-AI/Apriel-1.5-15b-Thinker"} } }
conversational />


### Text To Image

Find out more about Text To Image [here](../tasks/text-to-image).

<InferenceSnippet
    pipeline=text-to-image
    providersMapping={ {"together":{"modelId":"black-forest-labs/FLUX.1-dev","providerModelId":"black-forest-labs/FLUX.1-dev"} } }
/>

