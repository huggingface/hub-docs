# Inference Providers

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/Inference-providers-banner-light.png"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/Inference-providers-banner-dark.png"/>
</div>

Hugging Face’s Inference Providers give developers streamlined, unified access to hundreds of machine learning models, powered by our serverless inference partners. This new approach builds on our previous Serverless Inference API, offering more models, improved performance, and greater reliability thanks to world-class providers.

To learn more about the launch of Inference Providers, check out our [announcement blog post](https://huggingface.co/blog/inference-providers).

## Partners

Here is the complete list of partners integrated with Inference Providers, and the supported tasks for each of them:

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

## Why use Inference Providers?

Inference Providers offers a fast and simple way to explore thousands of models for a variety of tasks. Whether you're experimenting with ML capabilities or building a new application, this API gives you instant access to high-performing models across multiple domains:

- **Text Generation:** Including large language models and tool-calling prompts, generate and experiment with high-quality responses.
- **Image and Video Generation:** Easily create customized images, including LoRAs for your own styles.
- **Document Embeddings:** Build search and retrieval systems with SOTA embeddings.
- **Classical AI Tasks:** Ready-to-use models for text classification, image classification, speech recognition, and more.

⚡ **Fast and Free to Get Started**: Inference Providers comes with a free-tier and additional included credits for [PRO users](https://hf.co/subscribe/pro), as well as [Enterprise Hub organizations](https://huggingface.co/enterprise).

## Key Features

- **🎯 All-in-One API**: A single API for text generation, image generation, document embeddings, NER, summarization, image classification, and more.
- **🔀 Multi-Provider Support**: Easily run models from top-tier providers like fal, Replicate, Sambanova, Together AI, and others.
- **🚀 Scalable & Reliable**: Built for high availability and low-latency performance in production environments.
- **🔧 Developer-Friendly**: Simple requests, fast responses, and a consistent developer experience across Python and JavaScript clients.
- **👷 Easy to integrate**: Drop-in replacement for the OpenAI chat completions API.
- **💰 Cost-Effective**: No extra markup on provider rates.

## Inference Playground

To get started quickly with [Chat Completion models](http://huggingface.co/models?inference_provider=all&sort=trending&other=conversational), use the [Inference Playground](https://huggingface.co/playground) to easily test and compare models with your prompts.

<a href="https://huggingface.co/playground" target="blank"><img src="https://cdn-uploads.huggingface.co/production/uploads/5f17f0a0925b9863e28ad517/9_Tgf0Tv65srhBirZQMTp.png" style="max-width: 550px; width: 100%;"/></a>

## Get Started

You can use Inference Providers with your preferred tools, such as Python, JavaScript, or cURL. To simplify integration, we offer both a Python SDK (`huggingface_hub`) and a JavaScript SDK (`huggingface.js`).

In this section, we will demonstrate a simple example using [deepseek-ai/DeepSeek-V3-0324](https://huggingface.co/deepseek-ai/DeepSeek-V3-0324), a conversational Large Language Model.

### Authentication

Inference Providers requires passing a user token in the request headers. You can generate a token by signing up on the Hugging Face website and going to the [settings page](https://huggingface.co/settings/tokens/new?ownUserPermissions=inference.serverless.write&tokenType=fineGrained). We recommend creating a `fine-grained` token with the scope to `Make calls to Inference Providers`.

For more details about user tokens, check out [this guide](https://huggingface.co/docs/hub/en/security-tokens).

### Quick Start - LLM

TODO : add blurb explaining what we're doing here (quick inference with LLM and chat completions)

<hfoptions id="inference-providers-examples">

<hfoption id="python">

**Python**

This section explains how to use the Inference Providers API to run inference requests with [deepseek-ai/DeepSeek-V3-0324](https://huggingface.co/deepseek-ai/DeepSeek-V3-0324) in Python.

<hfoptions>

<hfoption id="huggingface_hub">

For convenience, the Python library `huggingface_hub` provides an [`InferenceClient`](https://huggingface.co/docs/huggingface_hub/guides/inference) that handles inference for you.
The most suitable provider is automatically selected by the client library.

Make sure to install it with `pip install huggingface_hub`.

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

The Inference Providers API can be used as a drop-in replacement for the OpenAI API (or any chat completions compatible API) for your preferred client.
Just replace the chat completion base URL with `https://router.huggingface.co/v1`.
The most suitable provider for the model is automatically selected by the hugging face server.
For example, with the OpenAI Python client:

```python
import os
from openai import OpenAI

client = OpenAI(
    base_url="https://router.huggingface.co/v1",
    api_key=os.environ["HF_TOKEN"],
)

completion = client.chat.completions.create(
    model="deepseek-ai/DeepSeek-V3-024",
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

<hfoption id="request">

If you would rather implement a lower-level integration, you can request the Inference Provider API with HTTP.
The Inference Providers API will automatically select the most suitable provider for the requested model.
For example with the `requests` library:

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
    "model": "deepseek/deepseek-v3-0324",
}

response = requests.post(API_URL, headers=headers, json=payload)
print(response.json()["choices"][0]["message"])
```

</hfoption>

</hfoptions>
</hfoption>

<hfoption id="javascript">

**JavaScript**

This section explains how to use the Inference Providers API to run inference requests with [deepseek-ai/DeepSeek-V3-0324](https://huggingface.co/deepseek-ai/DeepSeek-V3-0324) in Javascript.

<hfoptions>

<hfoption id="huggingface.js">

For convenience, the JS library `@huggingface/inference` provides an [`InferenceClient`](https://huggingface.co/docs/huggingface.js/inference/classes/InferenceClient) that handles inference for you.
The most suitable provider is automatically selected by the client library.

You can install it with `npm install @huggingface/inference`.

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

The Inference Providers API can be used as a drop-in replacement for the OpenAI API (or any chat completions compatible API) for your preferred client.
Just replace the chat completion base URL with `https://router.huggingface.co/v1`.
The most suitable provider for the model is automatically selected by the hugging face server.
For example, with the OpenAI JS client:

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

If you would rather implement a lower-level integration, you can request the Inference Provider API with HTTP.
The Inference Providers API will automatically select the most suitable provider for the requested model.
For example, using `fetch`:

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
</hfoption>

<hfoption id="curl">

**cURL / HTTP**

The following cURL command highlighting the raw HTTP request. You can adapt this request to be run with the tool of your choice.

The most suitable provider for the requested model will be automatically selected by the server.

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
        "model": "deepseek/deepseek-v3-0324",
        "stream": false
    }'
```

</hfoption>

</hfoptions>

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

In this introduction, we've covered the basics of Inference Providers. To learn more about this service, check out our guides and API Reference:

- [Pricing and Billing](./pricing): everything you need to know about billing.
- [Hub integration](./hub-integration): how is Inference Providers integrated with the Hub?
- [Register as an Inference Provider](./register-as-a-provider): everything about how to become an official partner.
- [Hub API](./hub-api): high-level API for Inference Providers.
- [API Reference](./tasks/index): learn more about the parameters and task-specific settings.
