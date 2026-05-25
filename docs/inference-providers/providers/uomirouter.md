<!---
WARNING

This markdown file has been generated from a script. Please do not edit it directly.

### Template

If you want to update the content related to uomirouter's description, please edit the template file under `https://github.com/huggingface/hub-docs/tree/main/scripts/inference-providers/templates/providers/uomirouter.handlebars`.

### Logos

If you want to update uomirouter's logo, upload a file by opening a PR on https://huggingface.co/datasets/huggingface/documentation-images/tree/main/inference-providers/logos. Ping @wauplin and @celinah on the PR to let them know you uploaded a new logo.
Logos must be in .png format and be named `uomirouter-light.png` and `uomirouter-dark.png`. Visit https://huggingface.co/settings/theme to switch between light and dark mode and check that the logos are displayed correctly.

### Generation script

For more details, check out the `generate.ts` script: https://github.com/huggingface/hub-docs/blob/main/scripts/inference-providers/scripts/generate.ts.
--->

# UomiRouter

> [!TIP]
> All supported UomiRouter models can be found [here](https://huggingface.co/models?inference_provider=uomirouter&sort=trending)

<div class="flex justify-center">
    <a href="https://uomirouter.uomi.ai/" target="_blank">
        <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/logos/uomirouter-light.png"/>
        <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/logos/uomirouter-dark.png"/>
    </a>
</div>

<div class="flex">
    <a href="https://huggingface.co/uomi-network" target="_blank">
        <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/badges/resolve/main/follow-us-on-hf-lg.svg"/>
        <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/badges/resolve/main/follow-us-on-hf-lg-dark.svg"/>
    </a>
</div>

UomiRouter is an OpenAI-compatible inference network powered by distributed GPUs across the vast.ai marketplace and homelab operators. Every response is signed by the GPU that produced it and anchored to the UOMI L1 via on-chain Proof of Computation (OPoC), letting agents verify the model and parameters that actually generated their tokens. We serve open-weight models (Qwen3.6, Gemma 4, etc.) at $0.10 / Mtok input + output — roughly 2–12× cheaper than centralized APIs.

Endpoints are served from EU (Sweden, Czechia, Netherlands), US, and APAC (Korea, Australia) regions through a single public gateway at `https://gateway.uomi.ai`. Per-model pricing is exposed via `/v1/models` (`pricing.input` / `pricing.output`, USD per million tokens). Inference payloads are retained for 7 days for billing reconciliation and never used for training — UomiRouter is a routing layer, so GPU operators only see the request payload, not user identity. Full provider documentation lives at [https://uomirouter.uomi.ai/docs](https://uomirouter.uomi.ai/docs).

## Supported tasks


### Chat Completion (LLM)

Find out more about Chat Completion (LLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=text-generation
    providersMapping={ {"uomirouter":{"modelId":"Qwen/Qwen3.6-27B-Instruct-FP8","providerModelId":"Qwen/Qwen3.6-27B-Instruct-FP8"} } }
conversational />


### Chat Completion (VLM)

Find out more about Chat Completion (VLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=image-text-to-text
    providersMapping={ {"uomirouter":{"modelId":"google/gemma-4-31B-it","providerModelId":"google/gemma-4-31B-it"} } }
conversational />


---
