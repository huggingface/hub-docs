<!---
WARNING

This markdown file has been generated from a script. Please do not edit it directly.

### Template

If you want to update the content related to scaleway's description, please edit the template file under `https://github.com/huggingface/hub-docs/tree/main/scripts/inference-providers/templates/providers/scaleway.handlebars`.

### Logos

If you want to update scaleway's logo, upload a file by opening a PR on https://huggingface.co/datasets/huggingface/documentation-images/tree/main/inference-providers/logos. Ping @wauplin and @celinah on the PR to let them know you uploaded a new logo.
Logos must be in .png format and be named `scaleway-light.png` and `scaleway-dark.png`. Visit https://huggingface.co/settings/theme to switch between light and dark mode and check that the logos are displayed correctly.

### Generation script

For more details, check out the `generate.ts` script: https://github.com/huggingface/hub-docs/blob/main/scripts/inference-providers/scripts/generate.ts.
--->

# Scaleway

<Tip>

All supported Scaleway models can be found [here](https://huggingface.co/models?inference_provider=scaleway&sort=trending)

</Tip>

<div class="flex justify-center">
    <a href="https://www.scaleway.com" target="_blank">
        <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/logos/scaleway-light.png"/>
        <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/logos/scaleway-dark.png"/>
    </a>
</div>

<div class="flex">
    <a href="https://huggingface.co/scaleway" target="_blank">
        <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/badges/resolve/main/follow-us-on-hf-lg.svg"/>
        <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/badges/resolve/main/follow-us-on-hf-lg-dark.svg"/>
    </a>
</div>

Scaleway is a European cloud provider, serving latest LLM models through its [Generative APIs](https://www.scaleway.com/en/generative-apis/) alongside a complete cloud ecosystem.

## Supported tasks


### Chat Completion (LLM)

Find out more about Chat Completion (LLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=text-generation
    providersMapping={ {"scaleway":{"modelId":"openai/gpt-oss-120b","providerModelId":"gpt-oss-120b"} } }
conversational />


### Chat Completion (VLM)

Find out more about Chat Completion (VLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=image-text-to-text
    providersMapping={ {"scaleway":{"modelId":"google/gemma-3-27b-it","providerModelId":"gemma-3-27b-it"} } }
conversational />


### Feature Extraction

Find out more about Feature Extraction [here](../tasks/feature_extraction).

<InferenceSnippet
    pipeline=feature-extraction
    providersMapping={ {"scaleway":{"modelId":"BAAI/bge-multilingual-gemma2","providerModelId":"bge-multilingual-gemma2"} } }
/>

