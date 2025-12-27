<!---
WARNING

This markdown file has been generated from a script. Please do not edit it directly.

### Template

If you want to update the content related to nebius's description, please edit the template file under `https://github.com/huggingface/hub-docs/tree/main/scripts/inference-providers/templates/providers/nebius.handlebars`.

### Logos

If you want to update nebius's logo, upload a file by opening a PR on https://huggingface.co/datasets/huggingface/documentation-images/tree/main/inference-providers/logos. Ping @wauplin and @celinah on the PR to let them know you uploaded a new logo.
Logos must be in .png format and be named `nebius-light.png` and `nebius-dark.png`. Visit https://huggingface.co/settings/theme to switch between light and dark mode and check that the logos are displayed correctly.

### Generation script

For more details, check out the `generate.ts` script: https://github.com/huggingface/hub-docs/blob/main/scripts/inference-providers/scripts/generate.ts.
--->

# Nebius

> [!TIP]
> All supported Nebius models can be found [here](https://huggingface.co/models?inference_provider=nebius&sort=trending)

<div class="flex justify-center">
    <a href="https://nebius.com/" target="_blank">
        <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/logos/nebius-light.png"/>
        <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/logos/nebius-dark.png"/>
    </a>
</div>

<div class="flex">
    <a href="https://huggingface.co/nebius" target="_blank">
        <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/badges/resolve/main/follow-us-on-hf-lg.svg"/>
        <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/badges/resolve/main/follow-us-on-hf-lg-dark.svg"/>
    </a>
</div>

​Nebius AI is a technology company specializing in AI-centric cloud platforms, offering scalable GPU clusters, managed services, and developer tools designed for intensive AI workloads. Headquartered in Amsterdam, Nebius provides flexible architecture and high-performance infrastructure to support AI model training and inference at any scale.

## Supported tasks


### Chat Completion (LLM)

Find out more about Chat Completion (LLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=text-generation
    providersMapping={ {"nebius":{"modelId":"meta-llama/Llama-3.1-8B-Instruct","providerModelId":"meta-llama/Meta-Llama-3.1-8B-Instruct-fast"} } }
conversational />


### Chat Completion (VLM)

Find out more about Chat Completion (VLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=image-text-to-text
    providersMapping={ {"nebius":{"modelId":"google/gemma-3-27b-it","providerModelId":"google/gemma-3-27b-it-fast"} } }
conversational />


### Feature Extraction

Find out more about Feature Extraction [here](../tasks/feature-extraction).

<InferenceSnippet
    pipeline=feature-extraction
    providersMapping={ {"nebius":{"modelId":"Qwen/Qwen3-Embedding-8B","providerModelId":"Qwen/Qwen3-Embedding-8B"} } }
/>


### Text To Image

Find out more about Text To Image [here](../tasks/text-to-image).

<InferenceSnippet
    pipeline=text-to-image
    providersMapping={ {"nebius":{"modelId":"black-forest-labs/FLUX.1-dev","providerModelId":"black-forest-labs/flux-dev"} } }
/>

