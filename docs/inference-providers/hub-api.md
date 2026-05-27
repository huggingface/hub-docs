# Hub API

The Hub provides a few APIs to interact with Inference Providers. Here is a list of them:

## List models

To list models powered by a provider, use the `inference_provider` query parameter:

```sh
# List all models served by Fireworks AI
~ curl -s https://huggingface.co/api/models?inference_provider=fireworks-ai | jq ".[].id"
"deepseek-ai/DeepSeek-V3-0324"
"deepseek-ai/DeepSeek-R1"
"Qwen/QwQ-32B"
"deepseek-ai/DeepSeek-V3"
...
```

It can be combined with other filters to e.g. select only `text-to-image` models:

```sh
# List text-to-image models served by Fal AI
~ curl -s https://huggingface.co/api/models?inference_provider=fal-ai&pipeline_tag=text-to-image | jq ".[].id"
"black-forest-labs/FLUX.1-dev"
"stabilityai/stable-diffusion-3.5-large"
"black-forest-labs/FLUX.1-schnell"
"stabilityai/stable-diffusion-3.5-large-turbo"
...
```

Pass a comma-separated list of providers to select multiple:

```sh
# List image-text-to-text models served by Novita or Sambanova
~ curl -s https://huggingface.co/api/models?inference_provider=sambanova,novita&pipeline_tag=image-text-to-text | jq ".[].id"
"meta-llama/Llama-3.2-11B-Vision-Instruct"
"meta-llama/Llama-3.2-90B-Vision-Instruct"
"Qwen/Qwen2-VL-72B-Instruct"
```

Finally, you can select all models served by at least one inference provider:

```sh
# List text-to-video models served by any provider
~ curl -s https://huggingface.co/api/models?inference_provider=all&pipeline_tag=text-to-video | jq ".[].id"
"Wan-AI/Wan2.1-T2V-14B"
"Lightricks/LTX-Video"
"tencent/HunyuanVideo"
"Wan-AI/Wan2.1-T2V-1.3B"
"THUDM/CogVideoX-5b"
"genmo/mochi-1-preview"
"BagOu22/Lora_HKLPAZ"
```

## Get model status

To find an inference provider for a specific model, request the `inference` attribute in the model info endpoint:

<inferencesnippet>

<curl>

```sh
# Get google/gemma-3-27b-it inference status (warm)
~ curl -s https://huggingface.co/api/models/google/gemma-3-27b-it?expand[]=inference
{
"_id": "67c35b9bb236f0d365bf29d3",
"id": "google/gemma-3-27b-it",
"inference": "warm"
}
```
</curl>

<python>

In the `huggingface_hub`, use `model_info` with the expand parameter:

```py
>>> from huggingface_hub import model_info

>>> info = model_info("google/gemma-3-27b-it", expand="inference")
>>> info.inference
'warm'
```

</python>

</inferencesnippet>

Inference status is either "warm" or undefined:

<inferencesnippet>

<curl>

```sh
# Get inference status (no inference)
~ curl -s https://huggingface.co/api/models/manycore-research/SpatialLM-Llama-1B?expand[]=inference
{
"_id": "67d3b141d8b6e20c6d009c8b",
"id": "manycore-research/SpatialLM-Llama-1B"
}
```

</curl>

<python>

In the `huggingface_hub`, use `model_info` with the expand parameter:

```py
>>> from huggingface_hub import model_info

>>> info = model_info("manycore-research/SpatialLM-Llama-1B", expand="inference")
>>> info.inference
None
```

</python>

</inferencesnippet>

## List OpenAI-compatible models

The router exposes an OpenAI-compatible endpoint to list chat-completion models served by Inference Providers, together with provider metadata used for routing and comparison:

```sh
~ curl -s https://router.huggingface.co/v1/models | jq '.data'
{
  "id": "deepseek-ai/DeepSeek-V4-Pro",
  "object": "model",
  "created": 1776837885,
  "owned_by": "deepseek-ai",
  "architecture": {
    "input_modalities": [
      "text"
    ],
    "output_modalities": [
      "text"
    ]
  },
  "providers": [
    {
      "provider": "novita",
      "status": "live",
      "context_length": 1048576,
      "pricing": {
        "input": 1.69,
        "output": 3.38
      },
      "supports_tools": true,
      "supports_structured_output": false,
      "first_token_latency_ms": 1490,
      "throughput": 24.69124008437934,
      "is_model_author": false
    },
    {
      "provider": "together",
      "status": "live",
      "context_length": 512000,
      "pricing": {
        "input": 2.1,
        "output": 4.4
      },
      "supports_tools": true,
      "supports_structured_output": true,
      "first_token_latency_ms": 611,
      "throughput": 40.13113557470821,
      "is_model_author": false
    },
    {
      "provider": "fireworks-ai",
      "status": "live",
      "context_length": 1048576,
      "supports_tools": true,
      "supports_structured_output": true,
      "first_token_latency_ms": 588.4,
      "throughput": 45.42948747753918,
      "is_model_author": false
    },
    {
      "provider": "featherless-ai",
      "status": "live",
      "is_model_author": false
    },
    {
      "provider": "deepinfra",
      "status": "live",
      "context_length": 65536,
      "pricing": {
        "input": 1.74,
        "output": 3.48
      },
      "supports_tools": true,
      "supports_structured_output": true,
      "first_token_latency_ms": 525.8,
      "throughput": 34.615908579189465,
      "is_model_author": false
    }
  ]
}
...
```

To retrieve a single model, append its model id to the endpoint:

```sh
~ curl -s https://router.huggingface.co/v1/models/deepseek-ai/DeepSeek-V4-Pro | jq '.'
```

Each provider entry may include the following fields:

| Field | Type | Description |
|---|---|---|
| `provider` | string | Provider identifier |
| `status` | string | `live` or `error` |
| `context_length` | number | Maximum context length supported by this provider for the model, when available |
| `pricing` | object | `input` and `output` prices in USD per million tokens, when available |
| `supports_tools` | boolean | Whether the provider supports tool calling, when available |
| `supports_structured_output` | boolean | Whether the provider supports structured output, when available |
| `first_token_latency_ms` | number | Time to first token in milliseconds from the latest validation probe, when available |
| `throughput` | number | Output throughput in tokens per second from the latest validation probe, when available |
| `is_model_author` | boolean | Whether the model was published by this provider |

These metrics are the same provider performance signals shown in the [provider comparison table](https://huggingface.co/inference/models). They are optional because some providers or models may not have the latest probe data available.

## Get model providers

If you are interested by a specific model and want to check the list of providers serving it, you can request the `inferenceProviderMapping` attribute in the model info endpoint:

<inferencesnippet>

<curl>

```sh
# List google/gemma-3-27b-it providers
~ curl -s https://huggingface.co/api/models/google/gemma-3-27b-it?expand[]=inferenceProviderMapping
{
    "_id": "67c35b9bb236f0d365bf29d3",
    "id": "google/gemma-3-27b-it",
    "inferenceProviderMapping": {
        featherless-ai: {
            status: live,
            providerId: google/gemma-3-27b-it,
            task: conversational,
            isModelAuthor: false
        },
        scaleway: {
            status: live,
            providerId: gemma-3-27b-it,
            task: conversational,
            isModelAuthor: false
        }
    }
}
```
</curl>

<python>

In the `huggingface_hub`, use `model_info` with the expand parameter:

```py
>>> from huggingface_hub import model_info

>>> info = model_info("google/gemma-3-27b-it", expand="inferenceProviderMapping")
>>> info.inference_provider_mapping
{
    'featherless-ai': InferenceProviderMapping(status='live', provider_id='google/gemma-3-27b-it', task='conversational'),
    'scaleway': InferenceProviderMapping(status='live', provider_id='google/gemma-3-27b-it-fast', task='conversational'),
}
```

</python>

</inferencesnippet>


Each provider serving the model shows a status (`staging` or `live`), the related task (here, `conversational`) and the providerId. In practice, this information is relevant for the JS and Python clients. 
