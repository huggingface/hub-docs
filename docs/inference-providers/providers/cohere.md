<!---
WARNING

This markdown file has been generated from a script. Please do not edit it directly.

### Template

If you want to update the content related to cohere's description, please edit the template file under `https://github.com/huggingface/hub-docs/tree/main/scripts/inference-providers/templates/providers/cohere.handlebars`.

### Logos

If you want to update cohere's logo, upload a file by opening a PR on https://huggingface.co/datasets/huggingface/documentation-images/tree/main/inference-providers/logos. Ping @wauplin and @celinah on the PR to let them know you uploaded a new logo.
Logos must be in .png format and be named `cohere-light.png` and `cohere-dark.png`. Visit https://huggingface.co/settings/theme to switch between light and dark mode and check that the logos are displayed correctly.

### Generation script

For more details, check out the `generate.ts` script: https://github.com/huggingface/hub-docs/blob/main/scripts/inference-providers/scripts/generate.ts.
--->

# Cohere

> [!TIP]
> All supported Cohere models can be found [here](https://huggingface.co/models?inference_provider=cohere&sort=trending)

<div class="flex justify-center">
    <a href="https://cohere.com/" target="_blank">
        <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/logos/cohere-light.png"/>
        <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/logos/cohere-dark.png"/>
    </a>
</div>

<div class="flex">
    <a href="https://huggingface.co/CohereLabs" target="_blank">
        <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/badges/resolve/main/follow-us-on-hf-lg.svg"/>
        <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/badges/resolve/main/follow-us-on-hf-lg-dark.svg"/>
    </a>
</div>

Cohere brings you cutting-edge multilingual models, advanced retrieval, and an AI workspace tailored for the modern enterprise — all within a single, secure platform.

Cohere is the first model creator to share and serve their models directly on the Hub as an Inference Provider.

## Supported tasks


### Chat Completion (LLM)

Find out more about Chat Completion (LLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=text-generation
    providersMapping={ {"cohere":{"modelId":"CohereLabs/c4ai-command-r7b-12-2024","providerModelId":"command-r7b-12-2024"} } }
conversational />


### Chat Completion (VLM)

Find out more about Chat Completion (VLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=image-text-to-text
    providersMapping={ {"cohere":{"modelId":"CohereLabs/aya-vision-32b","providerModelId":"c4ai-aya-vision-32b"} } }
conversational />

