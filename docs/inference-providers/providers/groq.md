<!---
WARNING

This markdown file has been generated from a script. Please do not edit it directly.

### Template

If you want to update the content related to groq's description, please edit the template file under `https://github.com/huggingface/hub-docs/tree/main/scripts/inference-providers/templates/providers/groq.handlebars`.

### Logos

If you want to update groq's logo, upload a file by opening a PR on https://huggingface.co/datasets/huggingface/documentation-images/tree/main/inference-providers/logos. Ping @wauplin and @celinah on the PR to let them know you uploaded a new logo.
Logos must be in .png format and be named `groq-light.png` and `groq-dark.png`. Visit https://huggingface.co/settings/theme to switch between light and dark mode and check that the logos are displayed correctly.

### Generation script

For more details, check out the `generate.ts` script: https://github.com/huggingface/hub-docs/blob/main/scripts/inference-providers/scripts/generate.ts.
--->

# Groq

<Tip>

All supported Groq models can be found [here](https://huggingface.co/models?inference_provider=groq&sort=trending)

</Tip>

<div class="flex justify-center">
    <a href="https://groq.com/" target="_blank">
        <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/logos/groq-light.png"/>
        <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/logos/groq-dark.png"/>
    </a>
</div>

<div class="flex">
    <a href="https://huggingface.co/groq" target="_blank">
        <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/badges/resolve/main/follow-us-on-hf-lg.svg"/>
        <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/badges/resolve/main/follow-us-on-hf-lg-dark.svg"/>
    </a>
</div>

Groq is fast AI inference. Their groundbreaking LPU technology delivers record-setting performance and efficiency for GenAI models. With custom chips specifically designed for AI inference workloads and a deterministic, software-first approach, Groq eliminates the bottlenecks of conventional hardware to enable real-time AI applications with predictable latency and exceptional throughput so developers can build fast.

For latest pricing, visit our [pricing page](https://groq.com/pricing/).

## Resources
 - **Website**: https://groq.com/
 - **Documentation**: https://console.groq.com/docs
 - **Community Forum**: https://community.groq.com/
 - **X**: [@GroqInc](https://x.com/GroqInc)
 - **LinkedIn**: [Groq](https://www.linkedin.com/company/groq/)
 - **YouTube**: [Groq](https://www.youtube.com/@GroqInc)

## Supported tasks


### Chat Completion (LLM)

Find out more about Chat Completion (LLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=text-generation
    providersMapping={ {"groq":{"modelId":"moonshotai/Kimi-K2-Instruct","providerModelId":"moonshotai/kimi-k2-instruct"} } }
conversational />


### Chat Completion (VLM)

Find out more about Chat Completion (VLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=image-text-to-text
    providersMapping={ {"groq":{"modelId":"meta-llama/Llama-4-Scout-17B-16E-Instruct","providerModelId":"meta-llama/llama-4-scout-17b-16e-instruct"} } }
conversational />

