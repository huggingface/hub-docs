<!---
WARNING

This markdown file has been generated from a script. Please do not edit it directly.

### Template

If you want to update the content related to hyperbolic's description, please edit the template file under `https://github.com/huggingface/hub-docs/tree/main/scripts/inference-providers/templates/providers/hyperbolic.handlebars`.

### Logos

If you want to update hyperbolic's logo, upload a file by opening a PR on https://huggingface.co/datasets/huggingface/documentation-images/tree/main/inference-providers/logos. Ping @wauplin and @celinah on the PR to let them know you uploaded a new logo.
Logos must be in .png format and be named `hyperbolic-light.png` and `hyperbolic-dark.png`. Visit https://huggingface.co/settings/theme to switch between light and dark mode and check that the logos are displayed correctly.

### Generation script

For more details, check out the `generate.ts` script: https://github.com/huggingface/hub-docs/blob/main/scripts/inference-providers/scripts/generate.ts.
--->

# Hyperbolic

<div class="flex justify-center">
    <a href="https://hyperbolic.xyz/" target="_blank">
        <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/logos/hyperbolic-light.png"/>
        <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/logos/hyperbolic-dark.png"/>
    </a>
</div>

<div class="flex justify-center">
    <a href="https://huggingface.co/hyperbolic" target="_blank">
        <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/badges/resolve/main/follow-us-on-hf-lg.svg"/>
        <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/badges/resolve/main/follow-us-on-hf-lg-dark.svg"/>
    </a>
</div>

Hyperbolic is building an open-access platform for AI development by aggregating idle computing resources and making it seamlessly simple to use them.

## Supported tasks


### Chat Completion (LLM)

Find out more about Chat Completion (LLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=text-generation
    providersMapping={ {"hyperbolic":{"modelId":"deepseek-ai/DeepSeek-V3-0324","providerModelId":"deepseek-ai/DeepSeek-V3-0324"} } }
conversational />


### Chat Completion (VLM)

Find out more about Chat Completion (VLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=image-text-to-text
    providersMapping={ {"hyperbolic":{"modelId":"Qwen/Qwen2.5-VL-7B-Instruct","providerModelId":"Qwen/Qwen2.5-VL-7B-Instruct"} } }
conversational />

