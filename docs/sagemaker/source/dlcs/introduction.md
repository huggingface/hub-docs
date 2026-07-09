# Introduction

Hugging Face, together with Amazon Web Services, builds and maintains Deep Learning Containers (DLCs) so you can run your machine learning workloads in an optimized environment with no configuration or maintenance on your part. These are Docker images pre-installed with popular frameworks and libraries such as 🤗 Transformers, 🤗 Datasets, and 🤗 Tokenizers, alongside high-performance serving engines. The DLCs let you serve and train models directly, skipping the complex process of building and optimizing your own environments from scratch.

The containers are publicly maintained, updated, and released periodically by Hugging Face and the AWS team, and are available to all AWS customers in the [Amazon Elastic Container Registry (ECR)](https://aws.github.io/deep-learning-containers/reference/available_images/#huggingface-vllm-inference). You can use them in **Amazon SageMaker AI**: a fully managed platform to build, train, and deploy ML models into a production-ready hosted environment.

Hugging Face DLCs are open source and licensed under Apache 2.0. Browse the full list of images and versions on the [Available DLCs](https://huggingface.co/docs/sagemaker/dlcs/available) page, and feel free to reach out on our [community forum](https://discuss.huggingface.co/c/sagemaker/17) if you have any questions.

## Features & benefits

Hugging Face DLCs provide ready-to-use, tested environments to train and deploy Hugging Face models.

### One command is all you need

Train and deploy cutting-edge Transformers models in a single line of code. The Hugging Face PyTorch DLCs for training ship with everything needed to run a single command — for example the [TRL CLI](https://huggingface.co/docs/trl/en/clis) — to fine-tune LLMs in any setting, from single-GPU to multi-node multi-GPU.

### From science to production

For inference, the general-purpose Hugging Face PyTorch DLC comes with the [`sagemaker-huggingface-inference-toolkit`](https://github.com/aws/sagemaker-huggingface-inference-toolkit), which supports serving any PyTorch model on AWS. Deploy your own trained models or pick from the ever-growing catalog of models on the [Hugging Face Hub](https://huggingface.co/models) with just one more line of code.

### High-performance text generation

For deploying large language models in production, Hugging Face provides dedicated DLCs built around leading open-source inference engines:

* **[vLLM](https://docs.vllm.ai/)** — high-throughput, memory-efficient LLM serving, available for both GPU and AWS AI chips (Neuron).
* **[SGLang](https://docs.sglang.ai/)** — fast serving with an efficient runtime, available for GPU.
* **[llama.cpp](https://github.com/ggml-org/llama.cpp)** — lightweight serving of GGUF / quantized models, available for both CPU and GPU.

These engines serve the vast majority of text generation architectures available on the Hugging Face Hub, expose OpenAI-compatible APIs, and support loading models directly from Amazon S3 with no extra configuration. Pick the latest image for your engine and accelerator on the [Available DLCs](https://huggingface.co/docs/sagemaker/dlcs/available) page.

### High-performance embeddings

For embedding, re-ranking, and sequence-classification workloads, the [Text Embeddings Inference (TEI)](https://huggingface.co/docs/text-embeddings-inference) DLC provides high-performance serving on both CPU and GPU. It can deploy any of the thousands of [supported embedding models](https://huggingface.co/models?other=text-embeddings-inference) on the Hub, or any custom model whose architecture is supported by TEI.

### Built-in performance

Hugging Face DLCs feature built-in optimizations that let you train faster and serve efficiently, while giving you the flexibility to choose the infrastructure that best fits your price/performance target. The inference DLCs provide production-ready endpoints that scale with your AWS environment, with built-in monitoring and enterprise features.
