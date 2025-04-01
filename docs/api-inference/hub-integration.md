# Hub Integration

Inference Providers is tightly integrated with the Hugging Face Hub. No matter which provider you use, the usage and billing will be centralized in your Hugging Face account.

## Model search

When listing models on the Hub, you can filter to select models deployed on the inference provider of your choice. For example, to list all models deployed on Fireworks AI infra: https://huggingface.co/models?inference_provider=fireworks-ai.

<div class="flex justify-center">
    <img class="block light:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/models-filter-by-provider-light.png"/>
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/models-filter-by-provider-dark.png"/>
</div>

It is also possible to select all or multiple providers and filter their available models: https://huggingface.co/models?inference_provider=all.

<div class="flex justify-center">
    <img class="block light:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/models-filter-any-provider-light.png"/>
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/models-filter-any-provider-dark.png"/>
</div>

## Features using Inference Providers

Several Hugging Face features utilize Inference Providers and count towards your monthly credits. The included monthly credits for PRO and Enterprise should cover moderate usage of these features for most users.

- [Inference Widgets](https://huggingface.co/deepseek-ai/DeepSeek-V3-0324): Interactive widgets available on model pages. This is the entry point to quickly test a model on the Hub.

<div class="flex justify-center">
    <img class="block light:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/widget-select-provider-light.png"/>
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/widget-select-provider-dark.png"/>
</div>

- [Inference Playground](https://huggingface.co/playground): A comprehensive chat interface supporting various models and providers.

<div class="flex justify-center">
    <img class="block light:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/playground-example-light.png"/>
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/playground-example-dark.png"/>
</div>

- [Data Studio AI](https://huggingface.co/datasets/open-r1/codeforces-cots/viewer): Converts text to SQL queries for datasets.

<div class="flex justify-center">
    <img class="block light:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/data-studio-example-light.png"/>
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/data-studio-example-dark.png"/>
</div>

## User Settings

In your user account settings, you are able to:
- set your own API keys for the providers you’ve signed up with. If you don't, your requests will be billed on your HF account. More details in the [billing section](./pricing#routed-requests-vs-direct-calls).

<div class="flex justify-center">
    <img class="block light:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/set-custom-key-light.png"/>
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/set-custom-key-dark.png"/>
</div>

- order providers by preference. This applies to the widget and code snippets in the model pages.

<div class="flex justify-center">
    <img class="block light:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/provider-list-light.png"/>
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/provider-list-dark.png"/>
</div>
