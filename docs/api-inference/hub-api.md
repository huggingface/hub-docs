# Hub API

The Hub provides a few API to deal with Inference Providers. Here is a list of them.

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

It can be combined with other filters to e.g. select only text-to-image models:

```sh
# List text-to-image models served by Fal AI
~ curl -s https://huggingface.co/api/models?inference_provider=fal-ai&pipeline_tag=text-to-image | jq ".[].id"
"black-forest-labs/FLUX.1-dev"
"stabilityai/stable-diffusion-3.5-large"
"black-forest-labs/FLUX.1-schnell"
"stabilityai/stable-diffusion-3.5-large-turbo"
...
```

Pass a comma-separated list to select from multiple providers:

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

If you are interested by a specific model and want to check if at least 1 provider serves it, you can request the `inference` attribute in the model info endpoint:

```sh
# Get google/gemma-3-27b-it inference status (warm)
~ curl -s https://huggingface.co/api/models/google/gemma-3-27b-it?expand[]=inference
{
"_id": "67c35b9bb236f0d365bf29d3",
"id": "google/gemma-3-27b-it",
"inference": "warm"
}
```

Inference status is either "warm" or undefined:

```sh
# Get inference status (not warm)
~ curl -s https://huggingface.co/api/models/manycore-research/SpatialLM-Llama-1B?expand[]=inference
{
"_id": "67d3b141d8b6e20c6d009c8b",
"id": "manycore-research/SpatialLM-Llama-1B"
}
```

## Get model providers

If you are interested by a specific model and want to check the list of providers serving it, you can request the `inferenceProviderMapping` attribute in the model info endpoint:

```sh
# List google/gemma-3-27b-it providers
~ curl -s https://huggingface.co/api/models/google/gemma-3-27b-it?expand[]=inferenceProviderMapping
{
    "_id": "67c35b9bb236f0d365bf29d3",
    "id": "google/gemma-3-27b-it",
    "inferenceProviderMapping": {
        "hf-inference": {
            "status": "live",
            "providerId": "google/gemma-3-27b-it",
            "task": "conversational"
        },
        "nebius": {
            "status": "live",
            "providerId": "google/gemma-3-27b-it-fast",
            "task": "conversational"
        }
    }
}
```

For each provider, you get the status (`staging` or `live`), the related task (here, `conversational`) and the providerId. In practice, this information is mostly relevant for the JS and Python clients. The relevant part is to know that the listed providers are the ones serving the model.
