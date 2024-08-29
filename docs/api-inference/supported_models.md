# Supported Models

Given the fast-paced nature of the open ML ecosystem, the Inference API exposes models that have large community interest and are in active use (based on recent likes, downloads, and usage). Because of this, deployed models can be swapped without prior notice. The Hugging Face stack aims to keep all the latest popular models warm and ready to use.

You can find:

* **[Warm models](https://huggingface.co/models?inference=warm&sort=trending):** models ready to be used.
* **[Cold models](https://huggingface.co/models?inference=cold&sort=trending):** models that are not loaded but can be used.
* **[Frozen models](https://huggingface.co/models?inference=frozen&sort=trending):** models that currently can't be run with the API.

TODO: add screenshot

## What do I get with a PRO subscription?

In addition to thousands of public models available in the Hub, PRO and Enterprise users get higher [rate limits](./rate_limits) and free access to the following models:


| Model                          | Size                                                                                                                                                                                       | Context Length | Use                                                          |
|--------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------|--------------------------------------------------------------|
| Meta Llama 3.1 Instruct  | [8B](https://huggingface.co/meta-llama/Meta-Llama-3.1-8B-Instruct), [70B](https://huggingface.co/meta-llama/Meta-Llama-3.1-70B-Instruct)                                                      | 128k tokens      | High quality multilingual chat model with large context length |
| Meta Llama 3 Instruct          | [8B](https://huggingface.co/meta-llama/Meta-Llama-3-8B-Instruct), [70B](https://huggingface.co/meta-llama/Meta-Llama-3-70B-Instruct)                                                       | 8k tokens      | One of the best chat models                                  |
| Llama 2 Chat                   | [7B](https://huggingface.co/meta-llama/Llama-2-7b-chat-hf), [13B](https://huggingface.co/meta-llama/Llama-2-13b-chat-hf), [70B](https://huggingface.co/meta-llama/Llama-2-70b-chat-hf) | 4k tokens      | One of the best conversational models                        |
| Bark                           | [0.9B](https://huggingface.co/suno/bark)                                                                                                                                                   | -              | Text to audio generation                                     |


## Running Private Models

The free Serverless API is designed to run popular public models. If you have a private model, you can use [Inference Endpoints](https://huggingface.co/docs/inference/endpoints) to deploy it.
