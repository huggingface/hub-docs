<!---
WARNING

This markdown file has been generated from a script. Please do not edit it directly.

### Template

If you want to update the content related to neuronpool's description, please edit the template file under `https://github.com/huggingface/hub-docs/tree/main/scripts/inference-providers/templates/providers/neuronpool.handlebars`.

### Logos

If you want to update neuronpool's logo, upload a file by opening a PR on https://huggingface.co/datasets/huggingface/documentation-images/tree/main/inference-providers/logos. Ping @wauplin and @celinah on the PR to let them know you uploaded a new logo.
Logos must be in .png format and be named `neuronpool-light.png` and `neuronpool-dark.png`. Visit https://huggingface.co/settings/theme to switch between light and dark mode and check that the logos are displayed correctly.

### Generation script

For more details, check out the `generate.ts` script: https://github.com/huggingface/hub-docs/blob/main/scripts/inference-providers/scripts/generate.ts.
--->

# NeuronPool

> [!TIP]
> All supported NeuronPool models can be found [here](https://huggingface.co/models?inference_provider=neuronpool&sort=trending)

<div class="flex justify-center">
    <a href="https://neuronpool.dev/" target="_blank">
        <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/logos/neuronpool-light.png"/>
        <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/logos/neuronpool-dark.png"/>
    </a>
</div>

<div class="flex">
    <a href="https://huggingface.co/neuronpool" target="_blank">
        <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/badges/resolve/main/follow-us-on-hf-lg.svg"/>
        <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/badges/resolve/main/follow-us-on-hf-lg-dark.svg"/>
    </a>
</div>

NeuronPool is social compute: idle machines join a pool and serve
OpenAI-compatible inference, so a friend group can run a shared model and
public buyers can pay the same catalog. Linux hosts run llama.cpp; Mac hosts
run MLX. The coordinator is an OpenAI-compatible LLM API (`/v1/chat/completions`)
with tool calling and structured output.

**Supported task:** Chat Completion (LLM). Embeddings are served on the
NeuronPool API but are not mapped through Inference Providers.

**Billing:** every response includes an `Inference-Id` header (the job id).
Hugging Face polls `POST /partners/hf/billing` with those ids and receives
`costNanoUsd` (nano-USD, idempotent, unknown/unsettled ids omitted). Catalog
prices are on `GET /v1/models` as `pricing.input` / `pricing.output` (USD per
million tokens) plus `context_length`.

For latest pricing, see [`GET /v1/models`](https://api.neuronpool.dev/v1/models)
or the [OpenRouter-shaped catalog](https://api.neuronpool.dev/openrouter/models).

## Resources
 - **Website**: https://neuronpool.dev/
 - **API**: https://api.neuronpool.dev/v1
 - **Documentation**: https://docs.neuronpool.dev/
 - **Dashboard**: https://neuronpool.dev/dashboard
 - **GitHub**: [dannymota/neuronpool](https://github.com/dannymota/neuronpool)

## Supported tasks


### Chat Completion (LLM)

Find out more about Chat Completion (LLM) [here](../tasks/chat-completion).

Partner model mapping is registered with the Hub org (`neuronpool`). Until
that mapping is live, the InferenceSnippet below is a placeholder and
`scripts/inference-providers` `generate.ts` will fill it.

<InferenceSnippet
    pipeline=text-generation
    providersMapping={ {"neuronpool":{"modelId":"openai/gpt-oss-20b","providerModelId":"gpt-oss-20b"} } }
conversational />
