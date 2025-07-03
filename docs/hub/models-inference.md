# Inference Providers

Hugging Face's model pages have pay-as-you-go inference for thousands of models, so you can try them all out right in the browser. Service is powered by Inference Providers and includes a free-tier.

Inference Providers give developers streamlined, unified access to hundreds of machine learning models, powered by the best serverless inference partners. 👉 **For complete documentation, visit the [Inference Providers Documentation](https://huggingface.co/docs/inference-providers)**.

## Inference Providers on the Hub

Inference Providers is deeply integrated with the Hugging Face Hub, and you can use it in a few different ways:

- **Interactive Widgets** - Test models directly on model pages with interactive widgets that use Inference Providers under the hood. Check out the [DeepSeek-R1-0528 model page](https://huggingface.co/deepseek-ai/DeepSeek-R1-0528) for an example.
- **Inference Playground** - Easily test and compare chat completion models with your prompts. Check out the [Inference Playground](https://huggingface.co/playground) to get started.
- **Search** - Filter models by inference provider on the [models page](https://huggingface.co/models?inference_provider=all) to find models available through specific providers.
- **Data Studio** - Use AI to explore datasets on the Hub. Check out [Data Studio](https://huggingface.co/datasets/fka/awesome-chatgpt-prompts/viewer?views%5B%5D=train) on your favorite dataset.

## Build with Inference Providers

You can integrate Inference Providers into your own applications using our SDKs or HTTP clients. Here's a quick start with Python and JavaScript, for more details, check out the [Inference Providers Documentation](https://huggingface.co/docs/inference-providers).

<hfoptions id="inference-providers-quick-start">

<hfoption id="python">

You can use our Python SDK to interact with Inference Providers.

```python
from huggingface_hub import InferenceClient

import os

client = InferenceClient(
    api_key=os.environ["HF_TOKEN"],
    provider="auto",   # Automatically selects best provider
)

# Chat completion
completion = client.chat.completions.create(
    model="deepseek-ai/DeepSeek-V3-0324",
    messages=[{"role": "user", "content": "A story about hiking in the mountains"}]
)

# Image generation
image = client.text_to_image(
    prompt="A serene lake surrounded by mountains at sunset, photorealistic style",
    model="black-forest-labs/FLUX.1-dev"
)

```

Or, you can just use the OpenAI API compatible client.

```python
import os
from huggingface_hub import InferenceClient

client = InferenceClient(
    api_key=os.environ["HF_TOKEN"],
)

completion = client.chat.completions.create(
    model="deepseek-ai/DeepSeek-V3-0324",
    messages=[
        {
            "role": "user",
            "content": "A story about hiking in the mountains"
        }
    ],
)
```

> [!NOTE]
> The OpenAI API compatible client is not supported for image generation.

</hfoption>

<hfoption id="javascript">

You can use our JavaScript SDK to interact with Inference Providers.

```javascript
import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient(process.env.HF_TOKEN);

const chatCompletion = await client.chatCompletion({
    provider: "auto",  // Automatically selects best provider  
    model: "deepseek-ai/DeepSeek-V3-0324",
    messages: [{ role: "user", content: "Hello!" }]
});

const imageBlob = await client.textToImage({
  model: "black-forest-labs/FLUX.1-dev",
  inputs:
    "A serene lake surrounded by mountains at sunset, photorealistic style",
});
```

Or, you can just use the OpenAI API compatible client.

```javascript
import { OpenAI } from "openai";

const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HF_TOKEN,
});

const completion = await client.chat.completions.create({
  model: "meta-llama/Llama-3.1-8B-Instruct",
  messages: [{ role: "user", content: "A story about hiking in the mountains" }],
});

```

> [!NOTE]
> The OpenAI API compatible client is not supported for image generation.

</hfoption>

</hfoptions>

You'll need a Hugging Face token with inference permissions. Create one at [Settings > Tokens](https://huggingface.co/settings/tokens/new?ownUserPermissions=inference.serverless.write&tokenType=fineGrained).

### How Inference Providers works

To dive deeper into Inference Providers, check out the [Inference Providers Documentation](https://huggingface.co/docs/inference-providers). Here are some key resources:

- **[Quick Start](https://huggingface.co/docs/inference-providers)** 
- **[Pricing & Billing Guide](https://huggingface.co/docs/inference-providers/pricing)**
- **[Hub Integration Details](https://huggingface.co/docs/inference-providers/hub-integration)**

### What was the HF-Inference API?

HF-Inference API is one of the providers available through Inference Providers. It was previously called "Inference API (serverless)" and is powered by [Inference Endpoints](https://huggingface.co/docs/inference-endpoints/index) under the hood.

For more details about the HF-Inference provider specifically, check out its [dedicated page](https://huggingface.co/docs/inference-providers/providers/hf-inference).
