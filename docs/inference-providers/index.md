# Inference Providers

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/Inference-providers-banner-light.png"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/Inference-providers-banner-dark.png"/>
</div>

Hugging Face’s Inference Providers give developers streamlined, unified access to hundreds of machine learning models, powered by our serverless inference partners. This new approach builds on our previous Serverless Inference API, offering more models, improved performance, and greater reliability thanks to world-class providers.

To learn more about the launch of Inference Providers, check out our [announcement blog post](https://huggingface.co/blog/inference-providers).

## Partners

Our platform integrates with leading AI infrastructure providers, giving you access to their specialized capabilities through a single, consistent API. Here's what each partner supports:

| Provider                                     | Chat completion (LLM) | Chat completion (VLM) | Feature Extraction | Text to Image | Text to video |
| -------------------------------------------- | :-------------------: | :-------------------: | :----------------: | :-----------: | :-----------: |
| [Cerebras](./providers/cerebras)             |          ✅           |                       |                    |               |               |
| [Cohere](./providers/cohere)                 |          ✅           |          ✅           |                    |               |               |
| [Fal AI](./providers/fal-ai)                 |                       |                       |                    |      ✅       |      ✅       |
| [Featherless AI](./providers/featherless-ai) |          ✅           |          ✅           |                    |               |               |
| [Fireworks](./providers/fireworks-ai)        |          ✅           |          ✅           |                    |               |               |
| [Groq](./providers/groq)                     |          ✅           |                       |                    |               |               |
| [HF Inference](./providers/hf-inference)     |          ✅           |          ✅           |         ✅         |      ✅       |               |
| [Hyperbolic](./providers/hyperbolic)         |          ✅           |          ✅           |                    |               |               |
| [Nebius](./providers/nebius)                 |          ✅           |          ✅           |         ✅         |      ✅       |               |
| [Novita](./providers/novita)                 |          ✅           |          ✅           |                    |               |      ✅       |
| [Nscale](./providers/nscale)                 |          ✅           |          ✅           |                    |      ✅       |               |
| [Replicate](./providers/replicate)           |                       |                       |                    |      ✅       |      ✅       |
| [SambaNova](./providers/sambanova)           |          ✅           |                       |         ✅         |               |               |
| [Together](./providers/together)             |          ✅           |          ✅           |                    |      ✅       |               |

## Why Choose Inference Providers?

If you're building AI-powered applications, you've likely experienced the pain points of managing multiple provider APIs, comparing model performance, and dealing with varying reliability. Inference Providers solves these challenges by offering:

**Instant Access to Cutting-Edge Models**: Go beyond mainstream providers to access thousands of specialized models across multiple AI tasks. Whether you need the latest language models, state-of-the-art image generators, or domain-specific embeddings, you'll find them here.

**Zero Vendor Lock-in**: Unlike being tied to a single provider's model catalog, you get access to models from Cerebras, Groq, Together AI, Replicate, and more — all through one consistent interface.

**Production-Ready Performance**: Built for enterprise workloads with automatic failover, intelligent routing, and the reliability your applications demand.

Here's what you can build:

- **Text Generation**: Use Large language models with tool-calling capabilities for chatbots, content generation, and code assistance
- **Image and Video Generation**: Create custom images and videos, including support for LoRAs and style customization
- **Search & Retrieval**: State-of-the-art embeddings for semantic search, RAG systems, and recommendation engines
- **Traditional ML Tasks**: Ready-to-use models for classification, NER, summarization, and speech recognition

⚡ **Get Started for Free**: Inference Providers includes a generous free tier, with additional credits for [PRO users](https://hf.co/subscribe/pro) and [Enterprise Hub organizations](https://huggingface.co/enterprise).

## Key Features

- **🎯 All-in-One API**: A single API for text generation, image generation, document embeddings, NER, summarization, image classification, and more.
- **🔀 Multi-Provider Support**: Easily run models from top-tier providers like fal, Replicate, Sambanova, Together AI, and others.
- **🚀 Scalable & Reliable**: Built for high availability and low-latency performance in production environments.
- **🔧 Developer-Friendly**: Simple requests, fast responses, and a consistent developer experience across Python and JavaScript clients.
- **👷 Easy to integrate**: Drop-in replacement for the OpenAI chat completions API.
- **💰 Cost-Effective**: No extra markup on provider rates.

## Getting Started

Inference Providers works with your existing development workflow. Whether you prefer Python, JavaScript, or direct HTTP calls, we provide native SDKs and OpenAI-compatible APIs to get you up and running quickly.

We'll walk through a practical example using [deepseek-ai/DeepSeek-V3-0324](https://huggingface.co/deepseek-ai/DeepSeek-V3-0324), a state-of-the-art open-weights conversational model.

### Inference Playground

Before diving into integration, explore models interactively with our [Inference Playground](https://huggingface.co/playground). Test different [chat completion models](http://huggingface.co/models?inference_provider=all&sort=trending&other=conversational) with your prompts and compare responses to find the perfect fit for your use case.

<a href="https://huggingface.co/playground" target="blank"><img src="https://cdn-uploads.huggingface.co/production/uploads/5f17f0a0925b9863e28ad517/9_Tgf0Tv65srhBirZQMTp.png" style="max-width: 550px; width: 100%;"/></a>

### Authentication

You'll need a Hugging Face token to authenticate your requests. Create one by visiting your [token settings](https://huggingface.co/settings/tokens/new?ownUserPermissions=inference.serverless.write&tokenType=fineGrained) and generating a `fine-grained` token with `Make calls to Inference Providers` permissions.

For complete token management details, see our [security tokens guide](https://huggingface.co/docs/hub/en/security-tokens).

### Quick Start - LLM

TODO : add blurb explaining what we're doing here (quick inference with LLM and chat completions)

#### Python

Here are three ways to integrate Inference Providers into your Python applications, from high-level convenience to low-level control:

<hfoptions id="python-clients">

<hfoption id="huggingface_hub">

For convenience, the `huggingface_hub` library provides an [`InferenceClient`](https://huggingface.co/docs/huggingface_hub/guides/inference) that automatically handles provider selection and request routing.

Install with `pip install huggingface_hub`:

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
            "content": "How many 'G's in 'huggingface'?"
        }
    ],
)

print(completion.choices[0].message)
```

</hfoption>

<hfoption id="openai">

**Drop-in OpenAI Replacement**: Already using OpenAI's Python client? Just change the base URL to instantly access hundreds of additional open-weights models through our provider network.

Our system automatically routes your request to the optimal provider for the specified model:

```python
import os
from openai import OpenAI

client = OpenAI(
    base_url="https://router.huggingface.co/v1",
    api_key=os.environ["HF_TOKEN"],
)

completion = client.chat.completions.create(
    model="deepseek-ai/DeepSeek-V3-0324",
    messages=[
        {
            "role": "user",
            "content": "How many 'G's in 'huggingface'?"
        }
    ],
)

print(completion.choices[0].message)
```

</hfoption>

<hfoption id="requests">

**Direct HTTP Integration**: For maximum control or integration with custom frameworks, use our OpenAI-compatible REST API directly.

Our routing system automatically selects the best available provider for your chosen model:

```python
import os
import requests

API_URL = "https://router.huggingface.co/v1/chat/completions"
headers = {"Authorization": f"Bearer {os.environ['HF_TOKEN']}"}
payload = {
    "messages": [
        {
            "role": "user",
            "content": "How many 'G's in 'huggingface'?"
        }
    ],
    "model": "deepseek-ai/DeepSeek-V3-0324",
}

response = requests.post(API_URL, headers=headers, json=payload)
print(response.json()["choices"][0]["message"])
```

</hfoption>

</hfoptions>

#### JavaScript

Integrate Inference Providers into your JavaScript applications with these flexible approaches:

<hfoptions id="javascript-clients">

<hfoption id="huggingface.js">

Our JavaScript SDK provides a convenient interface with automatic provider selection and TypeScript support.

Install with `npm install @huggingface/inference`:

```js
import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient(process.env.HF_TOKEN);

const chatCompletion = await client.chatCompletion({
  model: "deepseek-ai/DeepSeek-V3-0324",
  messages: [
    {
      role: "user",
      content: "How many 'G's in 'huggingface'?",
    },
  ],
});

console.log(chatCompletion.choices[0].message);
```

</hfoption>

<hfoption id="openai">

**OpenAI JavaScript Client Compatible**: Migrate your existing OpenAI integration seamlessly by updating just the base URL:

```javascript
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env["HF_TOKEN"],
});

const completion = await client.chat.completions.create({
  model: "deepseek-ai/DeepSeek-V3-0324",
  messages: [
    {
      role: "user",
      content: "How many 'G's in 'huggingface'?",
    },
  ],
});

console.log(completion.choices[0].message.content);
```

</hfoption>

<hfoption id="fetch">

**Native Fetch Integration**: For lightweight applications or custom implementations, use our REST API directly with standard fetch:

```js
import fetch from "node-fetch";

const response = await fetch(
  "https://router.huggingface.co/v1/chat/completions",
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.HF_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "deepseek-ai/DeepSeek-V3-0324",
      messages: [
        {
          role: "user",
          content: "How many 'G's in 'huggingface'?",
        },
      ],
    }),
  }
);
console.log(await response.json());
```

</hfoption>

</hfoptions>

#### HTTP / cURL

For testing, debugging, or integrating with any HTTP client, here's the raw REST API format. Our intelligent routing automatically selects the optimal provider for your requested model:

```bash
curl https://router.huggingface.co/v1/chat/completions \
    -H "Authorization: Bearer $HF_TOKEN" \
    -H 'Content-Type: application/json' \
    -d '{
        "messages": [
            {
                "role": "user",
                "content": "How many G in huggingface?"
            }
        ],
        "model": "deepseek-ai/DeepSeek-V3-0324",
        "stream": false
    }'
```

### Quick Start - Image generation

TODO: explain how to use inference providers for text-to-image task

## Advanced usage

### Provider selection

TODO : explain how providers are selected in auto policy (client vs server selection)

TODO: explain the chat completion auto URLs vs Provider URLs

TODO: explain how a user or org can specify the order of selection for providers

### Implementation details

TODO: explain implementation details? (no URL rewrite, just proxy)

## Next Steps

Now that you understand the basics, explore these resources to make the most of Inference Providers:

- **[Pricing and Billing](./pricing)**: Understand costs and billing of Inference Providers
- **[Hub Integration](./hub-integration)**: Learn how Inference Providers are integrated with the Hugging Face Hub
- **[Register as a Provider](./register-as-a-provider)**: Requirements to join our partner network as a provider
- **[Hub API](./hub-api)**: Advanced API features and configuration
- **[API Reference](./tasks/index)**: Complete parameter documentation for all supported tasks
