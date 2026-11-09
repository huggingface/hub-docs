# Inference Providers

Inference Providers offers the best open models for text, image, video and audio, ready to call from your app or your coding agent, at the provider's price with no markup. Language models are powered by [OpenRouter](https://openrouter.ai), the unified interface for LLMs trusted by millions: each request goes to a provider serving the model, and switches to another one automatically if it's down or rate limited.

One Hugging Face token gives you the whole stack: [storage](https://huggingface.co/storage), compute with [Jobs](https://huggingface.co/docs/hub/jobs-overview), dedicated inference with [Inference Endpoints](https://huggingface.co/docs/inference-endpoints) and serverless inference with Inference Providers. PRO, Team and Enterprise include monthly credits to spend on compute and inference.

## Getting Started

Create a [fine-grained token](https://huggingface.co/settings/tokens/new?ownUserPermissions=inference.serverless.write&tokenType=fineGrained) with the **Make calls to Inference Providers** permission and export it as `HF_TOKEN`, then pick your client or coding agent. To try models first, open the [Inference Playground](https://huggingface.co/playground).

<QuickstartSnippet />

## What you can run

Pick a task, then browse every model served for it on the Hub.

| Task | How to call it | Browse |
| --- | --- | --- |
| Chat, vision and agents (text and images in, tools, JSON, reasoning) | OpenAI-compatible `/v1/chat/completions` and `/v1/responses` | [Chat models](https://huggingface.co/models?inference_provider=all&other=or:text-generation,image-text-to-text) |
| Embeddings | SDKs: [`feature_extraction`](./tasks/feature-extraction) | [Embedding models](https://huggingface.co/models?inference_provider=all&pipeline_tag=feature-extraction&sort=trending) |
| Text to image | SDKs: [`text_to_image`](./tasks/text-to-image) | [Image models](https://huggingface.co/models?inference_provider=all&pipeline_tag=text-to-image&sort=trending) |
| Image editing | SDKs: [`image_to_image`](./tasks/image-to-image) | [Image editing models](https://huggingface.co/models?inference_provider=all&pipeline_tag=image-to-image&sort=trending) |
| Text to video | SDKs: [`text_to_video`](./tasks/text-to-video) | [Video models](https://huggingface.co/models?inference_provider=all&pipeline_tag=text-to-video&sort=trending) |
| Speech to text | SDKs: [`automatic_speech_recognition`](./tasks/automatic-speech-recognition) | [Speech models](https://huggingface.co/models?inference_provider=all&pipeline_tag=automatic-speech-recognition&sort=trending) |

### Compare providers for a model

A model is often served by several providers, each with its own price, speed and context length. Compare them on the [models page](https://huggingface.co/inference/models), or get the same data from code with `GET https://router.huggingface.co/v1/models` (see [Hub API](./hub-api#list-openai-compatible-models)).

## Why Choose Inference Providers?

When you build AI applications, it's tough to manage multiple provider APIs, comparing model performance, and dealing with varying reliability. Inference Providers solves these challenges by offering:

**Instant Access to Cutting-Edge Models**: Go beyond mainstream providers to access thousands of specialized models across multiple AI tasks. Whether you need the latest language models, state-of-the-art image generators, or domain-specific embeddings, you'll find them here.

**Zero Vendor Lock-in**: Unlike being tied to a single provider's model catalog, you get access to models from Cerebras, DeepInfra, Together AI, Replicate, and [more](./providers), all through one consistent interface.

**Production-Ready Performance**: Built for enterprise workloads with the reliability your applications demand.

Here's what you can build:

- **Text Generation**: Use Large language models with tool-calling capabilities for chatbots, content generation, and code assistance
- **Image and Video Generation**: Create custom images and videos, including support for LoRAs and style customization
- **Search & Retrieval**: State-of-the-art embeddings for semantic search, RAG systems, and recommendation engines
- **Traditional ML Tasks**: Ready-to-use models for classification, NER, summarization, and speech recognition

⚡ **Get Started**: Inference Providers is pay-as-you-go, with monthly included credits for [PRO users](https://hf.co/subscribe/pro) and [Team & Enterprise organizations](https://huggingface.co/enterprise).

## Provider Selection

Requests go through the Hugging Face router, which handles authentication and billing. For language models, OpenRouter picks the provider and retries on another one if it fails. See [Routing and Providers](./routing).

| You want | OpenAI-compatible API (model id) | HF SDKs (`provider`) |
| --- | --- | --- |
| The best mix of price, speed and reliability (default) | `deepseek-ai/DeepSeek-V4.1-Flash` | `"auto"` |
| The fastest provider | `deepseek-ai/DeepSeek-V4.1-Flash:fastest` | suffix in the model id |
| The cheapest provider | `deepseek-ai/DeepSeek-V4.1-Flash:cheapest` | suffix in the model id |
| A specific provider | `deepseek-ai/DeepSeek-V4.1-Flash:novita` | `"novita"` |

> [!TIP]
> Use the OpenAI-compatible API for chat with existing OpenAI code, and the HF SDKs for every other task (images, video, embeddings, speech).

## Next Steps

- [Pricing and Billing](./pricing): credits, pay as you go, organization billing
- [Hub Integration](./hub-integration): provider settings, widgets and the Playground
- [Hub API](./hub-api): list models and providers programmatically
- [API Reference](./tasks/index): every parameter for every task
