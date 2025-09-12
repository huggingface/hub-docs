# Inference Providers

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/Inference-providers-banner-light.png"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/Inference-providers-banner-dark.png"/>
</div>

Hugging Face’s Inference Providers give developers access to hundreds of machine learning models, powered by world-class inference providers. They are also integrated into our client SDKs (for JS and Python), making it easy to explore serverless inference of models on your favorite providers.

## Partners

Our platform integrates with leading AI infrastructure providers, giving you access to their specialized capabilities through a single, consistent API. Here's what each partner supports:

| Provider                                     | Chat completion (LLM) | Chat completion (VLM) | Feature Extraction | Text to Image | Text to video | Speech to text |
| -------------------------------------------- | :-------------------: | :-------------------: | :----------------: | :-----------: | :-----------: | :------------: |
| [Cerebras](./providers/cerebras)             |          ✅           |                       |                    |               |               |                |
| [Cohere](./providers/cohere)                 |          ✅           |          ✅           |                    |               |               |                |
| [Fal AI](./providers/fal-ai)                 |                       |                       |                    |      ✅       |      ✅       |       ✅       |
| [Featherless AI](./providers/featherless-ai) |          ✅           |          ✅           |                    |               |               |                |
| [Fireworks](./providers/fireworks-ai)        |          ✅           |          ✅           |                    |               |               |                |
| [Groq](./providers/groq)                     |          ✅           |          ✅           |                    |               |               |                |
| [HF Inference](./providers/hf-inference)     |          ✅           |          ✅           |         ✅         |      ✅       |               |       ✅       |
| [Hyperbolic](./providers/hyperbolic)         |          ✅           |          ✅           |                    |               |               |                |
| [Nebius](./providers/nebius)                 |          ✅           |          ✅           |         ✅         |      ✅       |               |                |
| [Novita](./providers/novita)                 |          ✅           |          ✅           |                    |               |      ✅       |                |
| [Nscale](./providers/nscale)                 |          ✅           |          ✅           |                    |      ✅       |               |                |
| [Public AI](./providers/publicai)             |          ✅           |                       |                    |               |               |                |
| [Replicate](./providers/replicate)           |                       |                       |                    |      ✅       |      ✅       |       ✅       |
| [SambaNova](./providers/sambanova)           |          ✅           |                       |         ✅         |               |               |                |
| [Together](./providers/together)             |          ✅           |          ✅           |                    |      ✅       |               |                |

## Why Choose Inference Providers?

When you build AI applications, it's tough to manage multiple provider APIs, comparing model performance, and dealing with varying reliability. Inference Providers solves these challenges by offering:

**Instant Access to Cutting-Edge Models**: Go beyond mainstream providers to access thousands of specialized models across multiple AI tasks. Whether you need the latest language models, state-of-the-art image generators, or domain-specific embeddings, you'll find them here.

**Zero Vendor Lock-in**: Unlike being tied to a single provider's model catalog, you get access to models from Cerebras, Groq, Together AI, Replicate, and more — all through one consistent interface.

**Production-Ready Performance**: Built for enterprise workloads with the reliability your applications demand.

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

<a href="https://huggingface.co/playground" target="blank"><img src="https://cdn-uploads.huggingface.co/production/uploads/5f17f0a0925b9863e28ad517/9_Tgf0Tv65srhBirZQMTp.png" alt="Inference Playground thumbnail" style="max-width: 550px; width: 100%;"/></a>

### Authentication

You'll need a Hugging Face token to authenticate your requests. Create one by visiting your [token settings](https://huggingface.co/settings/tokens/new?ownUserPermissions=inference.serverless.write&tokenType=fineGrained) and generating a `fine-grained` token with `Make calls to Inference Providers` permissions.

For complete token management details, see our [security tokens guide](https://huggingface.co/docs/hub/en/security-tokens).

### Quick Start - LLM

Let's start with the most common use case: conversational AI using large language models. This section demonstrates how to perform chat completions using DeepSeek V3, showcasing the different ways you can integrate Inference Providers into your applications.

Whether you prefer our native clients, want OpenAI compatibility, or need direct HTTP access, we'll show you how to get up and running with just a few lines of code.

#### Python

Here are three ways to integrate Inference Providers into your Python applications, from high-level convenience to low-level control:

<hfoptions id="python-clients">

<hfoption id="huggingface_hub">

For convenience, the `huggingface_hub` library provides an [`InferenceClient`](https://huggingface.co/docs/huggingface_hub/guides/inference) that automatically handles provider selection and request routing.

In your terminal, install the Hugging Face Hub Python client and log in:

```shell
pip install huggingface_hub
hf auth login # get a read token from hf.co/settings/tokens
```

You can now use the the client with a Python interpreter:

```python
import os
from huggingface_hub import InferenceClient

client = InferenceClient()

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

If you're already using OpenAI's Python client, then you need a **drop-in OpenAI replacement**. Just swap-out the base URL to instantly access hundreds of additional open-weights models through our provider network.

Our system automatically routes your request to the most popular provider for the specified model. You can also select the provider of your choice by appending it to the model id (e.g. `"deepseek-ai/DeepSeek-V3-0324:sambanova"`).

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
```

</hfoption>

<hfoption id="requests">

For maximum control and interoperability with custom frameworks, use our OpenAI-compatible REST API directly.

Our routing system automatically selects the most popular available provider for your chosen model. You can also select the provider of your choice by appending it to the model id (e.g. `"deepseek-ai/DeepSeek-V3-0324:novita"`).

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

Install with NPM:

```shell
npm install @huggingface/inference
```

Then use the client with Javascript:

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

If you're already using OpenAI's Javascript client, then you need a **drop-in OpenAI replacement**. Just swap-out the base URL to instantly access hundreds of additional open-weights models through our provider network. Our system automatically routes your request to the most popular provider for the specified model. You can also select the provider of your choice by appending it to the model id (e.g. `"deepseek-ai/DeepSeek-V3-0324:nebius"`).

```javascript
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HF_TOKEN,
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

For lightweight applications or custom implementations, use our REST API directly with standard fetch.

Our routing system automatically selects the most popular available provider for your chosen model. You can also select the provider of your choice by appending it to the model id (e.g. `"deepseek-ai/DeepSeek-V3-0324:fireworks-ai"`).

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

For testing, debugging, or integrating with any HTTP client, here's the raw REST API format.
Our routing system automatically selects the most popular available provider for your chosen model. You can also select the provider of your choice by appending it to the model id (e.g. `"deepseek-ai/DeepSeek-V3-0324:fireworks-ai"`).

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

### Quick Start - Text-to-Image Generation

Let's explore how to generate images from text prompts using Inference Providers. We'll use [black-forest-labs/FLUX.1-dev](https://huggingface.co/black-forest-labs/FLUX.1-dev), a state-of-the-art diffusion model that produces highly detailed, photorealistic images.

#### Python

Use the `huggingface_hub` library for the simplest image generation experience with automatic provider selection:

```python
import os
from huggingface_hub import InferenceClient

client = InferenceClient(api_key=os.environ["HF_TOKEN"])

image = client.text_to_image(
    prompt="A serene lake surrounded by mountains at sunset, photorealistic style",
    model="black-forest-labs/FLUX.1-dev"
)

# Save the generated image
image.save("generated_image.png")
```

#### JavaScript

Use our JavaScript SDK for streamlined image generation with TypeScript support:

```js
import { InferenceClient } from "@huggingface/inference";
import fs from "fs";

const client = new InferenceClient(process.env.HF_TOKEN);

const imageBlob = await client.textToImage({
  model: "black-forest-labs/FLUX.1-dev",
  inputs:
    "A serene lake surrounded by mountains at sunset, photorealistic style",
});

// Save the image
const buffer = Buffer.from(await imageBlob.arrayBuffer());
fs.writeFileSync("generated_image.png", buffer);
```

## Provider Selection

The Inference Providers API acts as a unified proxy layer that sits between your application and multiple AI providers. Understanding how provider selection works is crucial for optimizing performance, cost, and reliability in your applications.

### API as a Proxy Service

When using Inference Providers, your requests go through Hugging Face's proxy infrastructure, which provides several key benefits:

- **Unified Authentication & Billing**: Use a single Hugging Face token for all providers
- **Automatic Failover**: When using automatic provider selection (`provider="auto"`), requests are automatically routed to alternative providers if the primary provider is flagged as unavailable by our validation system
- **Consistent Interface through client libraries**: When using our client libraries, the same request format works across different providers

Because the API acts as a proxy, the exact HTTP request may vary between providers as each provider has their own API requirements and response formats. **When using our official client libraries** (JavaScript or Python), these provider-specific differences are handled automatically whether you use `provider="auto"` or specify a particular provider.

### Client-Side Provider Selection (Inference Clients)

When using the Hugging Face inference clients (JavaScript or Python), you can explicitly specify a provider or let the system choose automatically. The client then formats the HTTP request to match the selected provider's API requirements.

<hfoptions id="client-side-provider-selection">

<hfoption id="javascript">

```javascript
import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient(process.env.HF_TOKEN);

// Explicit provider selection
await client.chatCompletion({
  model: "meta-llama/Llama-3.1-8B-Instruct",
  provider: "sambanova", // Specific provider
  messages: [{ role: "user", content: "Hello!" }],
});

// Automatic provider selection (default: "auto")
await client.chatCompletion({
  model: "meta-llama/Llama-3.1-8B-Instruct",
  // Defaults to "auto" selection of the provider
  // provider="auto",
  messages: [{ role: "user", content: "Hello!" }],
});
```

</hfoption>

<hfoption id="python">

```python
import os
from huggingface_hub import InferenceClient

client = InferenceClient(token=os.environ["HF_TOKEN"])

# Explicit provider selection
result = client.chat_completion(
    model="meta-llama/Llama-3.1-8B-Instruct",
    provider="sambanova",  # Specific provider
    messages=[{"role": "user", "content": "Hello!"}],
)

# Automatic provider selection (default: "auto")
result = client.chat_completion(
    model="meta-llama/Llama-3.1-8B-Instruct",
    # Defaults to "auto" selection of the provider
    # provider="auto",
    messages=[{"role": "user", "content": "Hello!"}],
)
```

</hfoption>

</hfoptions>

**Provider Selection Policy:**

- `provider: "auto"` (default): Selects the first available provider for the model, sorted by your preference order in [Inference Provider settings](https://hf.co/settings/inference-providers)
- `provider: "specific-provider"`: Forces use of a specific provider (e.g., "together", "replicate", "fal-ai", ...)

### Alternative: OpenAI-Compatible Chat Completions Endpoint (Chat Only)

If you prefer to work with familiar OpenAI APIs or want to migrate existing chat completion code with minimal changes, we offer a drop-in compatible endpoint that handles all provider selection automatically on the server side.

**Note**: This OpenAI-compatible endpoint is currently available for chat completion tasks only. For other tasks like text-to-image, embeddings, or speech processing, use the Hugging Face inference clients shown above.

<hfoptions id="openai-compatible">

<hfoption id="javascript">

```javascript
import { OpenAI } from "openai";

const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HF_TOKEN,
});

const completion = await client.chat.completions.create({
  model: "meta-llama/Llama-3.1-8B-Instruct",
  messages: [{ role: "user", content: "Hello!" }],
});
```

</hfoption>

<hfoption id="python">

```python
import os
from openai import OpenAI

client = OpenAI(
    base_url="https://router.huggingface.co/v1",
    api_key=os.environ["HF_TOKEN"],
)

completion = client.chat.completions.create(
    model="meta-llama/Llama-3.1-8B-Instruct",
    messages=[{"role": "user", "content": "Hello!"}],
)

print(completion.choices[0].message.content)
```

</hfoption>

</hfoptions>

This endpoint can also be requested through direct HTTP access, making it suitable for integration with various HTTP clients and applications that need to interact with the chat completion service directly.

```bash
curl https://router.huggingface.co/v1/chat/completions \
  -H "Authorization: Bearer $HF_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "meta-llama/Llama-3.1-8B-Instruct",
    "messages": [
      {
        "role": "user",
        "content": "Hello!"
      }
    ]
  }'
```

**Key Features:**

- **Server-Side Provider Selection**: The server automatically chooses the best available provider
- **Model Listing**: GET `/v1/models` returns available models across all providers
- **OpenAI SDK Compatibility**: Works with existing OpenAI client libraries
- **Chat Tasks Only**: Limited to conversational workloads

### Choosing the Right Approach

**Use Inference Clients when:**

- You need support for all task types (text-to-image, speech, embeddings, etc.)
- You want explicit control over provider selection
- You're building applications that use multiple AI tasks

**Use OpenAI-Compatible Endpoint when:**

- You're only doing chat completions
- You want to migrate existing OpenAI-based code with minimal changes
- You prefer server-side provider management

**Use Direct HTTP when:**

- You're implementing custom request logic
- You need fine-grained control over the request/response cycle
- You're working in environments without available client libraries

## Next Steps

Now that you understand the basics, explore these resources to make the most of Inference Providers:

- **[Announcement Blog Post](https://huggingface.co/blog/inference-providers)**: Learn more about the launch of Inference Providers
- **[Pricing and Billing](./pricing)**: Understand costs and billing of Inference Providers
- **[Hub Integration](./hub-integration)**: Learn how Inference Providers are integrated with the Hugging Face Hub
- **[Register as a Provider](./register-as-a-provider)**: Requirements to join our partner network as a provider
- **[Hub API](./hub-api)**: Advanced API features and configuration
- **[API Reference](./tasks/index)**: Complete parameter documentation for all supported tasks
