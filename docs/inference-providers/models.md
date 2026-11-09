# Models

Model ids are Hub ids, like `deepseek-ai/DeepSeek-V4.1-Flash`. Compare providers, then use the id as it is or add a [routing suffix](./routing).

## Browse models

- On the Hub: [all models served by a provider](https://huggingface.co/models?inference_provider=all&sort=trending), with filters by task and provider.
- In a table: [huggingface.co/inference/models](https://huggingface.co/inference/models) compares price, context, speed and features for every provider of every chat model.

## List models from code

<hfoptions id="list">
<hfoption id="OpenAI-compatible API">

`GET /v1/models` returns every chat model with the providers serving it:

```bash
curl -s https://router.huggingface.co/v1/models | jq '.data[] | {id, providers: [.providers[].provider]}'
```

Each provider entry has its price (USD per million tokens), context length, speed and features:

```json
{
  "id": "deepseek-ai/DeepSeek-V4.1-Flash",
  "owned_by": "deepseek-ai",
  "architecture": { "input_modalities": ["text", "image"], "output_modalities": ["text"] },
  "providers": [
    {
      "provider": "deepinfra",
      "status": "live",
      "context_length": 1048576,
      "pricing": { "input": 0.2, "output": 0.6 },
      "supports_tools": true,
      "supports_structured_output": true,
      "first_token_latency_ms": 428,
      "throughput": 71.27
    }
  ]
}
```

</hfoption>
<hfoption id="hf CLI">

```bash
# Models served by at least one provider
hf models ls --warm

# Search them
hf models ls --warm --search GLM-5.2

# Text-to-image models served by fal
hf models ls --inference-provider fal-ai --pipeline-tag text-to-image
```

Add `--json` for scripts and agents.

</hfoption>
<hfoption id="Hub API">

```bash
# Text-to-video models served by any provider
curl -s "https://huggingface.co/api/models?inference_provider=all&pipeline_tag=text-to-video" | jq ".[].id"
```

See the [Hub API](./hub-api) for every filter, and how to get a model's providers.

</hfoption>
</hfoptions>

## Choose a model

| You need | Look for |
| --- | --- |
| An agent or tool use | `supports_tools: true` |
| JSON output | `supports_structured_output: true` |
| Images as input | `"image"` in `architecture.input_modalities` |
| Long documents | A large `context_length` |
| Low latency | A low `first_token_latency_ms`, or the `:fastest` suffix |
| Low cost | A low `pricing.output`, or the `:cheapest` suffix |
