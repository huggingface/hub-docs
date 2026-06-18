<!---
WARNING

This markdown file has been generated from a script. Please do not edit it directly.

### Template

If you want to update the content related to deepinfra's description, please edit the template file under `https://github.com/huggingface/hub-docs/tree/main/scripts/inference-providers/templates/providers/deepinfra.handlebars`.

### Logos

If you want to update deepinfra's logo, upload a file by opening a PR on https://huggingface.co/datasets/huggingface/documentation-images/tree/main/inference-providers/logos. Ping @wauplin and @celinah on the PR to let them know you uploaded a new logo.
Logos must be in .png format and be named `deepinfra-light.png` and `deepinfra-dark.png`. Visit https://huggingface.co/settings/theme to switch between light and dark mode and check that the logos are displayed correctly.

### Generation script

For more details, check out the `generate.ts` script: https://github.com/huggingface/hub-docs/blob/main/scripts/inference-providers/scripts/generate.ts.
--->

# DeepInfra

> [!TIP]
> All supported DeepInfra models can be found [here](https://huggingface.co/models?inference_provider=deepinfra&sort=trending)

<div class="flex justify-center">
    <a href="https://deepinfra.com/" target="_blank">
        <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/logos/deepinfra-light.png"/>
        <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/logos/deepinfra-dark.png"/>
    </a>
</div>

<div class="flex">
    <a href="https://huggingface.co/DeepInfra" target="_blank">
        <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/badges/resolve/main/follow-us-on-hf-lg.svg"/>
        <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/badges/resolve/main/follow-us-on-hf-lg-dark.svg"/>
    </a>
</div>

DeepInfra is a serverless AI inference platform offering one of the most cost-effective pricing per token in the industry. With a catalog of over 100 models spanning LLMs, text-to-image, text-to-speech, speech-to-text, video generation, OCR, and more, DeepInfra makes it easy for developers to integrate a wide range of AI capabilities into their applications with minimal setup.

## Resources
- **Website**: https://deepinfra.com/
- **Documentation**: https://docs.deepinfra.com

## Supported tasks


### Chat Completion (LLM)

Find out more about Chat Completion (LLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=text-generation
    providersMapping={ {"deepinfra":{"modelId":"deepseek-ai/DeepSeek-V4-Pro","providerModelId":"deepseek-ai/DeepSeek-V4-Pro"} } }
conversational />


### Chat Completion (VLM)

Find out more about Chat Completion (VLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=image-text-to-text
    providersMapping={ {"deepinfra":{"modelId":"google/gemma-4-31B-it","providerModelId":"google/gemma-4-31B-it"} } }
conversational />


