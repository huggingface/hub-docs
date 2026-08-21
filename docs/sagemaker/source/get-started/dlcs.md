# Deep Learning Containers

Hugging Face, together with Amazon Web Services, builds and maintains Deep Learning Containers (DLCs) so you can run your machine learning workloads in an optimized environment with no configuration or maintenance on your part. These are Docker images pre-installed with popular frameworks and libraries such as 🤗 Transformers, 🤗 Datasets, and 🤗 Tokenizers, alongside high-performance serving engines. The DLCs let you serve and train models directly, skipping the complex process of building and optimizing your own environments from scratch.

The containers are publicly maintained, updated, and released periodically by Hugging Face and the AWS team, and are available to all AWS customers in the [Amazon Elastic Container Registry (ECR)](https://aws.github.io/deep-learning-containers/reference/available_images/#huggingface-vllm-inference). You can use them in **Amazon SageMaker AI**: a fully managed platform to build, train, and deploy ML models into a production-ready hosted environment.

Hugging Face DLCs are open source and licensed under Apache 2.0. Browse the full list of images and versions in the [Available DLCs](#available-dlcs) section below, and feel free to reach out on our [community forum](https://discuss.huggingface.co/c/sagemaker/17) if you have any questions.

<div class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 my-6 not-prose">
  <a class="group rounded-xl border border-gray-200 px-4 py-3 no-underline! dark:border-gray-800" href="#vllm">
    <div class="font-semibold text-gray-900 group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-300">vLLM</div>
    <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">LLM serving on GPU and Neuron</p>
  </a>
  <a class="group rounded-xl border border-gray-200 px-4 py-3 no-underline! dark:border-gray-800" href="#sglang">
    <div class="font-semibold text-gray-900 group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-300">SGLang</div>
    <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">Fast serving on GPU</p>
  </a>
  <a class="group rounded-xl border border-gray-200 px-4 py-3 no-underline! dark:border-gray-800" href="#llamacpp">
    <div class="font-semibold text-gray-900 group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-300">llama.cpp</div>
    <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">Lightweight GGUF serving</p>
  </a>
  <a class="group rounded-xl border border-gray-200 px-4 py-3 no-underline! dark:border-gray-800" href="#text-embeddings-inference">
    <div class="font-semibold text-gray-900 group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-300">TEI</div>
    <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">Embeddings and reranking</p>
  </a>
  <a class="group rounded-xl border border-gray-200 px-4 py-3 no-underline! dark:border-gray-800" href="#transformers">
    <div class="font-semibold text-gray-900 group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-300">Transformers</div>
    <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">Training and general inference</p>
  </a>
</div>

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

These engines serve the vast majority of text generation architectures available on the Hugging Face Hub, expose OpenAI-compatible APIs, and support loading models directly from Amazon S3 with no extra configuration. Pick the latest image for your engine and accelerator in the [Available DLCs](#available-dlcs) section below.

### High-performance embeddings

For embedding, re-ranking, and sequence-classification workloads, the [Text Embeddings Inference (TEI)](https://huggingface.co/docs/text-embeddings-inference) DLC provides high-performance serving on both CPU and GPU. It can deploy any of the thousands of [supported embedding models](https://huggingface.co/models?other=text-embeddings-inference) on the Hub, or any custom model whose architecture is supported by TEI.

### Built-in performance

Hugging Face DLCs feature built-in optimizations that let you train faster and serve efficiently, while giving you the flexibility to choose the infrastructure that best fits your price/performance target. The inference DLCs provide production-ready endpoints that scale with your AWS environment, with built-in monitoring and enterprise features.

## Available DLCs

Below you can find a listing of our latest Deep Learning Containers (DLCs) available on AWS.

For each supported combination of use-case (training, inference), accelerator type (CPU, GPU, Neuron), and framework (PyTorch, TGI, TEI) containers are created.

Neuron DLCs for training and inference on AWS Trainium and AWS Inferentia instances can be found in the [Optimum Neuron documentation](https://huggingface.co/docs/optimum-neuron/en/containers).

If you want to keep track of all our available DLCs, you can also check the [AWS Deep Learning Containers releases](https://aws.github.io/deep-learning-containers/reference/available_images#huggingface-pytorch-training) page.

### Transformers

#### Training

For training, the DLCs are available for PyTorch via Transformers. They include GPUs and AWS AI chips support, with libraries such as TRL, Sentence Transformers, or Diffusers.

You can also keep track of the latest PyTorch Training DLC releases [here](https://github.com/aws/deep-learning-containers/releases?q=huggingface-training+AND+NOT+neuronx&expanded=true).

| Container URI                                                                                                                    | Accelerator |
| -------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| 763104351884.dkr.ecr.us-east-1.amazonaws.com/huggingface-pytorch-training:2.9.0-transformers5.3.0-gpu-py312-cu130-ubuntu22.04 | GPU         |
| 763104351884.dkr.ecr.us-west-2.amazonaws.com/huggingface-pytorch-training-neuronx:2.8.0-transformers4.55.4-neuronx-py310-sdk2.26.0-ubuntu22.04 | Neuron         |

#### Inference

For inference, there is a general-purpose PyTorch inference DLC, for serving models trained with any of those frameworks mentioned before on CPU, GPU, and AWS AI chips.

| Container URI                                                                                                                    | Accelerator |
| -------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| 763104351884.dkr.ecr.us-east-1.amazonaws.com/huggingface-pytorch-inference:2.6.0-transformers4.51.3-cpu-py312-ubuntu22.04 | CPU         |
| 763104351884.dkr.ecr.us-east-1.amazonaws.com/huggingface-pytorch-inference:2.6.0-transformers4.51.3-gpu-py312-cu124-ubuntu22.04 | GPU         |
| 763104351884.dkr.ecr.us-west-2.amazonaws.com/huggingface-pytorch-inference-neuronx:2.8.0-transformers4.55.4-neuronx-py310-sdk2.26.0-ubuntu22.04 | Neuron         |

### vLLM

In case you want to serve text generation models with vLLM, there are specific DLCs available for GPU and AWS AI chips.

| vLLM version | Container URI                                                                                                                    | Accelerator |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| 0.25.1         | 763104351884.dkr.ecr.us-west-2.amazonaws.com/huggingface-vllm:0.25.1-transformers5.10-gpu-py312-cu130-ubuntu22.04 | GPU         |
| 0.11.0         | 763104351884.dkr.ecr.us-west-2.amazonaws.com/huggingface-vllm-inference-neuronx:0.11.0-optimum0.4.5-neuronx-py310-sdk2.26.1-ubuntu22.04 | Neuron         |

#### vLLM Omni

You can also use vLLM Omni for serving multimodal models with vLLM on GPUs.

| vLLM Omni version | Container URI                                                                                                                    | Accelerator |
| ---------------| -------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| 0.20.0         | 763104351884.dkr.ecr.us-west-2.amazonaws.com/huggingface-vllm-omni:0.20.0-transformers5.8.1-gpu-py312-cu130-amzn2023 | GPU         |


### SGLang

There is also a specific DLC for serving models with SGLang on GPU.

| SGLang version | Container URI                                                                                                                    | Accelerator |
| ---------------| -------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| 0.5.12          | 763104351884.dkr.ecr.us-west-2.amazonaws.com/huggingface-sglang:0.5.12-transformers5.6.0-gpu-py312-cu130-ubuntu24.04 | GPU         |


### Llama.cpp

For a lightweight inference serving, there is a specific DLC for serving models with Llama.cpp on both CPU and GPU.

| Llama.cpp version | Container URI                                                                                                                    | Accelerator |
| ---------------| -------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| b9522          | 763104351884.dkr.ecr.us-west-2.amazonaws.com/huggingface-llama.cpp:b9522-gpu-cu130-ubuntu24.04 | GPU         |
| b9522          | 763104351884.dkr.ecr.us-west-2.amazonaws.com/huggingface-llama.cpp:b9522-cpu-ubuntu24.04 | CPU         |


### Text Embeddings Inference

Finally, there is the Text Embeddings Inference (TEI) DLC for high-performance serving of embedding models on CPU and GPU.

| Container URI                                                                                                                    | Accelerator |
| -------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| 683313688378.dkr.ecr.us-east-1.amazonaws.com/tei-cpu:2.0.1-tei1.9.3-cpu-py310-ubuntu24.04 | CPU         |
| 683313688378.dkr.ecr.us-east-1.amazonaws.com/tei:2.0.1-tei1.9.3-gpu-py310-cu129-ubuntu24.04 | GPU         |

## FAQ

**How to find the URI of my container?**

The SageMaker SDK provides a utility function to get the URI of a container programmatically:

```python
from sagemaker.core import image_uris

AVAILABLE_FRAMEWORKS = [
    "huggingface",
    "huggingface-tei",
    "huggingface-llamacpp",
    "huggingface-vllm",
    "huggingface-vllm-omni",
    "huggingface-sglang",
]

image_uris.retrieve(
    "huggingface-vllm",
    region="us-east-1",
    image_scope="inference", # or "training" for training containers
    instance_type="ml.g5.2xlarge",
)
```

If you just want to use the default container for a given model, you can also rely on the SageMaker SDK `ModelBuilder`, which will automatically choose the correct container for you:

```python
from sagemaker.serve import ModelBuilder

builder = ModelBuilder(
    model="google/gemma-4-E2B-it",
    instance_type="ml.g5.2xlarge",
    role_arn=role,
)
```

>[!NOTE]
>Be aware that the SDK may not always be up to date or may choose the wrong container for your use case. When in doubt, always double check the container URI returned by the SDK and compare it to the ones available in this documentation.
