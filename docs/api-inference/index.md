# Serverless Inference API


    <InferenceSnippet
        pipeline="text-generation"
        conversational
        providersMapping={{
            "fireworks-ai": {modelId: "deepseek-ai/DeepSeek-R1", providerModelId: "accounts/fireworks/models/deepseek-r1"},
            novita: {modelId: "deepseek-ai/DeepSeek-V3-0324", providerModelId: "deepseek/deepseek-v3-0324"},
            cohere: {modelId: "deepseek-ai/DeepSeek-V3-0324", providerModelId: "deepseek/deepseek-v3-0324"},
            hyperbolic: {modelId: "deepseek-ai/DeepSeek-V3-0324", providerModelId: "deepseek/deepseek-v3-0324"}
        }}
    />

    <InferenceSnippet
        pipeline="text-generation"
        conversational
        providersMapping={{
            "fireworks-ai": {modelId: "deepseek-ai/DeepSeek-R1", providerModelId: "accounts/fireworks/models/deepseek-r1"}
        }}
    />

    <InferenceSnippet
        pipeline="text-to-image"
        providersMapping={{
            "black-forest-labs": {modelId: "black-forest-labs/FLUX.1-dev", providerModelId: "flux-dev"},
            "replicate": {modelId: "black-forest-labs/FLUX.1-dev", providerModelId: "black-forest-labs/flux-dev"},
            "fal-ai": {modelId: "black-forest-labs/FLUX.1-dev", providerModelId: "fal-ai/flux/dev"},
        }}
    />


**Instant Access to thousands of ML Models for Fast Prototyping**

Explore the most popular models for text, image, speech, and more — all with a simple API request. Build, test, and experiment without worrying about infrastructure or setup.

---

## Why use the Inference API?

The Serverless Inference API offers a fast and simple way to explore thousands of models for a variety of tasks. Whether you're prototyping a new application or experimenting with ML capabilities, this API gives you instant access to high-performing models across multiple domains:

* **Text Generation:** Including large language models and tool-calling prompts, generate and experiment with high-quality responses.
* **Image Generation:** Easily create customized images, including LoRAs for your own styles.
* **Document Embeddings:** Build search and retrieval systems with SOTA embeddings.
* **Classical AI Tasks:** Ready-to-use models for text classification, image classification, speech recognition, and more.

⚡ **Fast and Free to Get Started**: The Inference API is free to try out and comes with additional included credits for PRO users. For production needs, explore [Inference Endpoints](https://ui.endpoints.huggingface.co/) for dedicated resources, autoscaling, advanced security features, and more.

---

## Key Benefits

- 🚀 **Instant Prototyping:** Access powerful models without setup.
- 🎯 **Diverse Use Cases:** One API for text, image, and beyond.
- 🔧 **Developer-Friendly:** Simple requests, fast responses.

---

## Main Features

* Leverage over 800,000+ models from different open-source libraries (transformers, sentence transformers, adapter transformers, diffusers, timm, etc.).
* Use models for a variety of tasks, including text generation, image generation, document embeddings, NER, summarization, image classification, and more.
* Accelerate your prototyping by using GPU-powered models.
* Run very large models that are challenging to deploy in production.
* Production-grade platform without the hassle: built-in automatic scaling, load balancing and caching.

---

## Contents

The documentation is organized into two sections:

* **Getting Started** Learn the basics of how to use the Inference API.
* **API Reference** Dive into task-specific settings and parameters.

---

## Inference Playground

If you want to get started quickly with [Chat Completion models](https://huggingface.co/models?inference=warm&other=conversational&sort=trending) use the Inference Playground to quickly test and compare models against your prompts.

<a href="https://huggingface.co/playground" target="blank"><img src="https://cdn-uploads.huggingface.co/production/uploads/5f17f0a0925b9863e28ad517/9_Tgf0Tv65srhBirZQMTp.png" style="max-width: 550px; width: 100%;"/></a>

---

## Serious about AI in your organisation? Build faster with the Hugging Face Enterprise Hub.

<a target="_blank" href="https://huggingface.co/enterprise">
    <img alt="Hugging Face Enterprise Hub" src="https://cdn-uploads.huggingface.co/production/uploads/5f17f0a0925b9863e28ad517/64zNL-65xyIpRqWHe2iD0.png" style="width: 100%; max-width: 550px; border: 1px solid #eee; border-radius: 4px; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);">
</a><br>
