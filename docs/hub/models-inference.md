# Inference Providers

Please refer to the [Inference Providers Documentation](https://huggingface.co/docs/inference-providers) for detailed information.

## What is HF-Inference API?

HF-Inference API is the serverless Inference API powered by Hugging Face. This service used to be called “Inference API (serverless)” prior to Inference Providers. HF-Inference API is one of the many providers available on the Hugging Face Hub.

For more details about the HF-Inference API, check out it's [dedicated page](https://huggingface.co/docs/inference-providers/providers/hf-inference).

## What technology do you use to power the HF-Inference API?

The HF-Inference API is powered by [Inference Endpoints](https://huggingface.co/docs/inference-endpoints/index) under the hood.

## Why don't I see an inference widget, or why can't I use the API?

For some tasks, there might not be support by any Inference Provider, and hence, there is no widget.

## How can I see my usage?

To check usage across all providers, check out your [billing page](https://huggingface.co/settings/billing).

To check your HF-Inference usage specifically, check out the [Inference Dashboard](https://ui.endpoints.huggingface.co/endpoints). The dashboard shows both your serverless and dedicated endpoints usage.

## Is there programmatic access to Inference Providers?

Yes! We provide client wrappers in both JS and Python:
- [JS (`@huggingface/inference`)](https://huggingface.co/docs/huggingface.js/inference/classes/InferenceClient)
- [Python (`huggingface_hub`)](https://huggingface.co/docs/huggingface_hub/guides/inference)
