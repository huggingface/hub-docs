# Overview

## Main Features

* Leverage over 800,000+ models from different open-source libraries (transformers, sentence transformers, adapter transformers, diffusers, timm, etc.).
* Use models for a variety of tasks, including text generation, image generation, document embeddings, NER, summarization, image classification, and more.
* Accelerate your prototyping by using GPU-powered models.
* Run very large models that are challenging to deploy in production.
* Production-grade platform without the hassle: built-in automatic scaling, load balancing and caching.

## Eligibility

Given the fast-paced nature of the open ML ecosystem, the Inference API exposes models that have large community interest and are in active use (based on recent likes, downloads, and usage). Because of this, deployed models can be swapped without prior notice.

You can find:

* **[Warm models](https://huggingface.co/models?inference=warm&sort=trending):** models ready to be used.
* **[Cold models](https://huggingface.co/models?inference=cold&sort=trending):** models that are not loaded but can be used.
* **[Frozen models](https://huggingface.co/models?inference=frozen&sort=trending):** models that currently can't be run with the API.

TODO: add screenshot

## GPU vs CPU

By default, the Inference API uses GPUs to run large models. For small models that can run well on CPU, such as small text classification and text embeddings, the API will automatically switch to CPU to save costs.

## Inference for PRO

In addition to thousands of public models available in the Hub, PRO and Enteprise users get higher rate limits and free access to the following models:


| Model                          | Size                                                                                                                                                                                       | Context Length | Use                                                          |
|--------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------|--------------------------------------------------------------|
| Meta Llama 3.1Instruct  | [8B](https://huggingface.co/meta-llama/Meta-Llama-3.1-8B-Instruct), [70B](https://huggingface.co/meta-llama/Meta-Llama-3.1-70B-Instruct)                                                      | 128k tokens      | High quality multilingual chat model with large context length |
| Meta Llama 3 Instruct          | [8B](https://huggingface.co/meta-llama/Meta-Llama-3-8B-Instruct), [70B](https://huggingface.co/meta-llama/Meta-Llama-3-70B-Instruct)                                                       | 8k tokens      | One of the best chat models                                  |
| Llama 2 Chat                   | [7B](https://huggingface.co/meta-llama/Llama-2-7b-chat-hf), [13B](https://huggingface.co/meta-llama/Llama-2-13b-chat-hf), [70B](https://huggingface.co/meta-llama/Llama-2-70b-chat-hf) | 4k tokens      | One of the best conversational models                        |
| Bark                           | [0.9B](https://huggingface.co/suno/bark)                                                                                                                                                   | -              | Text to audio generation                                     |


## FAQ

### Running Private Models

The free Serverless API is designed to run popular public models. If you have a private model, you can use [Inference Endpoints](https://huggingface.co/docs/inference/endpoints) to deploy your model.

### Fine-tuning Models

To automatically finetune a model on your data, please try [AutoTrain](https://huggingface.co/autotrain). It’s a no-code solution for automatically training a model; all you have to do is upload your data.

