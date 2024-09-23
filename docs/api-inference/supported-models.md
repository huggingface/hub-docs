# Supported Models

Given the fast-paced nature of the open ML ecosystem, the Inference API exposes models that have large community interest and are in active use (based on recent likes, downloads, and usage). Because of this, deployed models can be swapped without prior notice. The Hugging Face stack aims to keep all the latest popular models warm and ready to use.

You can find:

* **[Warm models](https://huggingface.co/models?inference=warm&sort=trending):** models ready to be used.
* **[Cold models](https://huggingface.co/models?inference=cold&sort=trending):** models that are not loaded but can be used.
* **[Frozen models](https://huggingface.co/models?inference=frozen&sort=trending):** models that currently can't be run with the API.

## What do I get with a PRO subscription?

In addition to thousands of public models available in the Hub, PRO and Enterprise users get higher [rate limits](./rate-limits) and free access to the following models:

<!-- Manually maintained hard-coded list based on https://github.com/huggingface-internal/api-inference/blob/main/master-rs/custom_config.yml -->

| Model                          | Size                                                                                                                                                                                       | Supported Context Length | Use                                                          |
|--------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------|--------------------------------------------------------------|
| Meta Llama 3.1 Instruct  | [8B](https://huggingface.co/meta-llama/Meta-Llama-3.1-8B-Instruct), [70B](https://huggingface.co/meta-llama/Meta-Llama-3.1-70B-Instruct)                                                      | 70B: 32k tokens / 8B: 8k tokens | High quality multilingual chat model with large context length |
| Meta Llama 3 Instruct          | [8B](https://huggingface.co/meta-llama/Meta-Llama-3-8B-Instruct), [70B](https://huggingface.co/meta-llama/Meta-Llama-3-70B-Instruct)                                                       | 8k tokens      | One of the best chat models                                  |
| Meta Llama Guard 3          | [8B](https://huggingface.co/meta-llama/Llama-Guard-3-8B)                                                       | 4k tokens      | |
| Llama 2 Chat                   | [7B](https://huggingface.co/meta-llama/Llama-2-7b-chat-hf), [13B](https://huggingface.co/meta-llama/Llama-2-13b-chat-hf), [70B](https://huggingface.co/meta-llama/Llama-2-70b-chat-hf) | 4k tokens      | One of the best conversational models                        |
| DeepSeek Coder v2 | [236B](https://huggingface.co/deepseek-ai/DeepSeek-Coder-V2-Instruct) | 16k tokens | A model with coding capabilities. |
| Aya 23 | [8B](https://huggingface.co/CohereForAI/aya-23-8B), [35B](https://huggingface.co/CohereForAI/aya-23-35B) | 4k tokens | A model with multilingual capabilities. |
| C4AI Command R+ 08-2024 | [104B](https://huggingface.co/CohereForAI/c4ai-command-r-plus-08-2024) | 32k tokens | A model with high quality tool calling capabilities.
| Bark                           | [0.9B](https://huggingface.co/suno/bark)                                                                                                                                                   | -              | Text to audio generation                                     |


## Running Private Models

The free Serverless API is designed to run popular public models. If you have a private model, you can use [Inference Endpoints](https://huggingface.co/docs/inference-endpoints) to deploy it.
