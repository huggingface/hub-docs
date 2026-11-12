# Hub Integration

Inference Providers is tightly integrated with the Hugging Face Hub. No matter which provider you use, the usage and billing will be centralized in your Hugging Face account.

## Model search

When listing models on the Hub, you can filter to select models deployed on the inference provider of your choice. For example, to list all models deployed on Fireworks AI infra: https://huggingface.co/models?inference_provider=fireworks-ai.

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/models-filter-by-provider-light.png"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/models-filter-by-provider-dark.png"/>
</div>

It is also possible to select all or multiple providers and filter their available models: https://huggingface.co/models?inference_provider=all.

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/models-filter-any-provider-light.png"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/models-filter-any-provider-dark.png"/>
</div>

## Features using Inference Providers

Several Hugging Face features utilize Inference Providers and count towards your monthly credits. The included monthly credits for PRO and Enterprise should cover moderate usage of these features for most users.

### Inference Widgets

Interactive widgets available on model pages (e.g. [deepseek-ai/DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash)). This is the entry point to quickly test a model on the Hub.

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/widget-select-provider-light.png"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/widget-select-provider-dark.png"/>
</div>

### Inference Playground

A comprehensive chat interface supporting various models and providers available at https://huggingface.co/playground.

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/playground-example-light.png"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/playground-example-dark.png"/>
</div>

### Data Studio AI

Converts text to SQL queries on dataset pages (e.g. [open-r1/codeforces-cots](https://huggingface.co/datasets/open-r1/codeforces-cots/viewer)).

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/data-studio-example-light.png"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/data-studio-example-dark.png"/>
</div>

## User Settings

In your [Inference Providers settings](https://huggingface.co/settings/inference-providers), you can turn off any provider you don't want to use. The router never sends your requests to a provider you turned off, and pinning it with a suffix returns an error.

## Organization Settings

Similar settings can be found in your Organization settings. They apply to every request [billed to the organization](./pricing#billing-for-team-and-enterprise-organizations), instead of the member's own settings. Additionally, you can see a graph of your team member's usage over time, helpful to centralize usage billing at the team level.
