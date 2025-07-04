<!---
WARNING

This markdown file has been generated from a script. Please do not edit it directly.

### Template

If you want to update the content related to hyperfusion's description, please edit the template file under `https://github.com/huggingface/hub-docs/tree/main/scripts/inference-providers/templates/providers/hyperfusion.handlebars`.

### Logos

If you want to update hyperfusion's logo, upload a file by opening a PR on https://huggingface.co/datasets/huggingface/documentation-images/tree/main/inference-providers/logos. Ping @wauplin and @celinah on the PR to let them know you uploaded a new logo.
Logos must be in .png format and be named `hyperfusion-light.png` and `hyperfusion-dark.png`. Visit https://huggingface.co/settings/theme to switch between light and dark mode and check that the logos are displayed correctly.

### Generation script

For more details, check out the `generate.ts` script: https://github.com/huggingface/hub-docs/blob/main/scripts/inference-providers/scripts/generate.ts.
--->

# Hyperfusion

<div class="flex justify-center">
    <a href="https://hyperfusion.io/" target="_blank">
        <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/logos/hyperfusion-light.png"/>
        <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/logos/hyperfusion-dark.png"/>
    </a>
</div>

<div class="flex">
    <a href="https://huggingface.co/Hyperfusion" target="_blank">
        <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/badges/resolve/main/follow-us-on-hf-lg.svg"/>
        <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/badges/resolve/main/follow-us-on-hf-lg-dark.svg"/>
    </a>
</div>

Hyperfusion powers the next era of high-performance AI computing with optimized infrastructure, enterprise-grade support, and accessible solutions for teams of all sizes.

Founded by tech entrepreneurs and investors, we blend innovation, efficiency, and IP-driven design to deliver cutting-edge compute at competitive prices.

## Supported tasks


### Chat Completion (LLM)

Find out more about Chat Completion (LLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=text-generation
    providersMapping={ {"hyperfusion":{"modelId":"google/gemma-3-27b-it","providerModelId":"google/gemma-3-27b-it"} } }
conversational />


