<!---
WARNING

This markdown file has been generated from a script. Please do not edit it directly.

### Template

If you want to update the content related to zai-org's description, please edit the template file under `https://github.com/huggingface/hub-docs/tree/main/scripts/inference-providers/templates/providers/zai-org.handlebars`.

### Logos

If you want to update zai-org's logo, upload a file by opening a PR on https://huggingface.co/datasets/huggingface/documentation-images/tree/main/inference-providers/logos. Ping @wauplin and @celinah on the PR to let them know you uploaded a new logo.
Logos must be in .png format and be named `zai-org-light.png` and `zai-org-dark.png`. Visit https://huggingface.co/settings/theme to switch between light and dark mode and check that the logos are displayed correctly.

### Generation script

For more details, check out the `generate.ts` script: https://github.com/huggingface/hub-docs/blob/main/scripts/inference-providers/scripts/generate.ts.
--->

# Z.ai

> [!TIP]
> All supported Z.ai models can be found [here](https://huggingface.co/models?inference_provider=zai-org&sort=trending)

<div class="flex justify-center">
    <a href="https://z.ai/" target="_blank">
        <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/logos/zai-org-light.png"/>
        <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/logos/zai-org-dark.png"/>
    </a>
</div>

<div class="flex">
    <a href="https://huggingface.co/zai-org" target="_blank">
        <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/badges/resolve/main/follow-us-on-hf-lg.svg"/>
        <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/badges/resolve/main/follow-us-on-hf-lg-dark.svg"/>
    </a>
</div>

Z.ai is an AI platform that provides cutting-edge large language models powered by GLM series. Their flagship models feature Mixture-of-Experts (MoE) architecture with advanced reasoning, coding, and agentic capabilities.

For latest pricing, visit the [pricing page](https://docs.z.ai/guides/overview/pricing).

## Resources
 - **Website**: https://z.ai/
 - **Documentation**: https://docs.z.ai/
 - **API Documentation**: https://docs.z.ai/api-reference/introduction
 - **GitHub**: https://github.com/zai-org
 - **Hugging Face**: https://huggingface.co/zai-org

## Supported tasks


### Chat Completion (LLM)

Find out more about Chat Completion (LLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=text-generation
    providersMapping={ {"zai-org":{"modelId":"zai-org/GLM-4.7","providerModelId":"glm-4.7"} } }
conversational />


### Chat Completion (VLM)

Find out more about Chat Completion (VLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=image-text-to-text
    providersMapping={ {"zai-org":{"modelId":"zai-org/GLM-4.6V-Flash","providerModelId":"glm-4.6v-flash"} } }
conversational />


