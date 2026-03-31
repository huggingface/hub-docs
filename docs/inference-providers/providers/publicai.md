<!---
WARNING

This markdown file has been generated from a script. Please do not edit it directly.

### Template

If you want to update the content related to publicai's description, please edit the template file under `https://github.com/huggingface/hub-docs/tree/main/scripts/inference-providers/templates/providers/publicai.handlebars`.

### Logos

If you want to update publicai's logo, upload a file by opening a PR on https://huggingface.co/datasets/huggingface/documentation-images/tree/main/inference-providers/logos. Ping @wauplin and @celinah on the PR to let them know you uploaded a new logo.
Logos must be in .png format and be named `publicai-light.png` and `publicai-dark.png`. Visit https://huggingface.co/settings/theme to switch between light and dark mode and check that the logos are displayed correctly.

### Generation script

For more details, check out the `generate.ts` script: https://github.com/huggingface/hub-docs/blob/main/scripts/inference-providers/scripts/generate.ts.
--->

# PublicAI

> [!TIP]
> All models supported by the PublicAI Inference Utility can be found [here](https://huggingface.co/models?inference_provider=publicai&sort=trending)

<div class="flex justify-center">
    <a href="https://publicai.co/" target="_blank">
        <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/logos/publicai-light.png"/>
        <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/logos/publicai-dark.png"/>
    </a>
</div>

<div class="flex">
    <a href="https://huggingface.co/publicai" target="_blank">
        <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/badges/resolve/main/follow-us-on-hf-lg.svg"/>
        <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/badges/resolve/main/follow-us-on-hf-lg-dark.svg"/>
    </a>
</div>

The Public AI Inference Utility is a nonprofit, open-source project. Their team builds products and organizes advocacy to support the work of public AI model builders like the Swiss AI Initiative, AI Singapore, AI Sweden, and the Barcelona Supercomputing Center.

They believe in public AI — AI as public infrastructure like highways, water, or electricity. Think of a BBC for AI, a public utility for AI, or public libraries for AI.

## Supported tasks


### Chat Completion (LLM)

Find out more about Chat Completion (LLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=text-generation
    providersMapping={ {"publicai":{"modelId":"allenai/Olmo-3.1-32B-Think","providerModelId":"allenai/Olmo-3.1-32B-Think"} } }
conversational />

