<!---
WARNING

This markdown file has been generated from a script. Please do not edit it directly.

### Template

If you want to update the content related to sambanova's description, please edit the template file under `https://github.com/huggingface/hub-docs/tree/main/scripts/inference-providers/templates/providers/sambanova.handlebars`.

### Logos

If you want to update sambanova's logo, upload a file by opening a PR on https://huggingface.co/datasets/huggingface/documentation-images/tree/main/inference-providers/logos. Ping @wauplin and @celinah on the PR to let them know you uploaded a new logo.
Logos must be in .png format and be named `sambanova-light.png` and `sambanova-dark.png`. Visit https://huggingface.co/settings/theme to switch between light and dark mode and check that the logos are displayed correctly.

### Generation script

For more details, check out the `generate.ts` script: https://github.com/huggingface/hub-docs/blob/main/scripts/inference-providers/scripts/generate.ts.
--->

# SambaNova

<Tip>

All supported SambaNova models can be found [here](https://huggingface.co/models?inference_provider=sambanova&sort=trending)

</Tip>

<div class="flex justify-center">
    <a href="https://sambanova.ai/" target="_blank">
        <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/logos/sambanova-light.png"/>
        <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/logos/sambanova-dark.png"/>
    </a>
</div>

<div class="flex">
    <a href="https://huggingface.co/sambanovasystems" target="_blank">
        <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/badges/resolve/main/follow-us-on-hf-lg.svg"/>
        <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/badges/resolve/main/follow-us-on-hf-lg-dark.svg"/>
    </a>
</div>

SambaNova's AI platform is the technology backbone for the next decade of AI innovation.
Customers are turning to SambaNova to quickly deploy state-of-the-art AI and deep learning capabilities that help them outcompete their peers.

## Supported tasks


### Chat Completion (LLM)

Find out more about Chat Completion (LLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=text-generation
    providersMapping={ {"sambanova":{"modelId":"deepseek-ai/DeepSeek-R1-0528","providerModelId":"DeepSeek-R1-0528"} } }
conversational />


### Chat Completion (VLM)

Find out more about Chat Completion (VLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=image-text-to-text
    providersMapping={ {"sambanova":{"modelId":"meta-llama/Llama-4-Maverick-17B-128E-Instruct","providerModelId":"Llama-4-Maverick-17B-128E-Instruct"} } }
conversational />


### Feature Extraction

Find out more about Feature Extraction [here](../tasks/feature_extraction).

<InferenceSnippet
    pipeline=feature-extraction
    providersMapping={ {"sambanova":{"modelId":"intfloat/e5-mistral-7b-instruct","providerModelId":"E5-Mistral-7B-Instruct"} } }
/>

