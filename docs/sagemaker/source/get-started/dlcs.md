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

<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 my-6 not-prose">
  <div class="rounded-xl border border-gray-200 px-5 py-4 dark:border-gray-800">
    <div class="font-semibold text-gray-900 dark:text-white">One command to train</div>
    <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">The training DLCs ship with everything needed to run a single command — for example the <a href="https://huggingface.co/docs/trl/en/clis">TRL CLI</a> — to fine-tune LLMs from single-GPU to multi-node multi-GPU.</p>
  </div>
  <div class="rounded-xl border border-gray-200 px-5 py-4 dark:border-gray-800">
    <div class="font-semibold text-gray-900 dark:text-white">Production serving engines</div>
    <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">Dedicated DLCs built around <a href="https://docs.vllm.ai/">vLLM</a>, <a href="https://docs.sglang.ai/">SGLang</a>, and <a href="https://github.com/ggml-org/llama.cpp">llama.cpp</a> serve most Hub text-generation architectures with OpenAI-compatible APIs and direct Amazon S3 model loading.</p>
  </div>
  <div class="rounded-xl border border-gray-200 px-5 py-4 dark:border-gray-800">
    <div class="font-semibold text-gray-900 dark:text-white">Embeddings and reranking</div>
    <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">The <a href="https://huggingface.co/docs/text-embeddings-inference">Text Embeddings Inference (TEI)</a> DLC serves embedding, re-ranking, and sequence-classification models on CPU and GPU, including the thousands of <a href="https://huggingface.co/models?other=text-embeddings-inference">supported models</a> on the Hub.</p>
  </div>
  <div class="rounded-xl border border-gray-200 px-5 py-4 dark:border-gray-800">
    <div class="font-semibold text-gray-900 dark:text-white">Built-in performance</div>
    <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">Tested, optimized environments with production-ready endpoints that scale with your AWS environment, so you can pick infrastructure by price/performance target.</p>
  </div>
</div>

## Available DLCs

Below you can find a listing of our latest Deep Learning Containers (DLCs) available on AWS.

For each supported combination of use-case (training, inference), accelerator type (CPU, GPU, Neuron), and framework (PyTorch, vLLM, SGLang, llama.cpp, TEI) containers are created. The URIs below use `us-east-1` or `us-west-2`; replace the region as needed, or [retrieve the URI programmatically](#faq).

Neuron DLCs for training and inference on AWS Trainium and AWS Inferentia instances can be found in the [Optimum Neuron documentation](https://huggingface.co/docs/optimum-neuron/en/containers). To keep track of all our available DLCs, check the [AWS Deep Learning Containers releases](https://aws.github.io/deep-learning-containers/reference/available_images#huggingface-pytorch-training) page.

### Transformers

#### Training

For training, the DLCs are available for PyTorch via Transformers. They include GPUs and AWS AI chips support, with libraries such as TRL, Sentence Transformers, or Diffusers. You can also keep track of the latest PyTorch Training DLC releases [here](https://github.com/aws/deep-learning-containers/releases?q=huggingface-training+AND+NOT+neuronx&expanded=true).

<div class="overflow-x-auto my-4 not-prose">
<table class="w-full text-sm">
<thead>
<tr class="border-b border-gray-200 dark:border-gray-800"><th class="py-2 pr-4 text-left font-semibold">Accelerator</th><th class="py-2 text-left font-semibold">Container URI</th></tr>
</thead>
<tbody>
<tr class="border-b border-gray-100 dark:border-gray-850"><td class="py-2 pr-4 whitespace-nowrap">GPU</td><td class="py-2"><code class="text-xs break-all">763104351884.dkr.ecr.us-east-1.amazonaws.com/huggingface-pytorch-training:2.9.0-transformers5.3.0-gpu-py312-cu130-ubuntu22.04</code></td></tr>
<tr class="border-b border-gray-100 dark:border-gray-850"><td class="py-2 pr-4 whitespace-nowrap">Neuron</td><td class="py-2"><code class="text-xs break-all">763104351884.dkr.ecr.us-west-2.amazonaws.com/huggingface-pytorch-training-neuronx:2.8.0-transformers4.55.4-neuronx-py310-sdk2.26.0-ubuntu22.04</code></td></tr>
</tbody>
</table>
</div>

#### Inference

For inference, the general-purpose PyTorch inference DLC serves models trained with any of those frameworks on CPU, GPU, and AWS AI chips.

<div class="overflow-x-auto my-4 not-prose">
<table class="w-full text-sm">
<thead>
<tr class="border-b border-gray-200 dark:border-gray-800"><th class="py-2 pr-4 text-left font-semibold">Accelerator</th><th class="py-2 text-left font-semibold">Container URI</th></tr>
</thead>
<tbody>
<tr class="border-b border-gray-100 dark:border-gray-850"><td class="py-2 pr-4 whitespace-nowrap">CPU</td><td class="py-2"><code class="text-xs break-all">763104351884.dkr.ecr.us-east-1.amazonaws.com/huggingface-pytorch-inference:2.6.0-transformers4.51.3-cpu-py312-ubuntu22.04</code></td></tr>
<tr class="border-b border-gray-100 dark:border-gray-850"><td class="py-2 pr-4 whitespace-nowrap">GPU</td><td class="py-2"><code class="text-xs break-all">763104351884.dkr.ecr.us-east-1.amazonaws.com/huggingface-pytorch-inference:2.6.0-transformers4.51.3-gpu-py312-cu124-ubuntu22.04</code></td></tr>
<tr class="border-b border-gray-100 dark:border-gray-850"><td class="py-2 pr-4 whitespace-nowrap">Neuron</td><td class="py-2"><code class="text-xs break-all">763104351884.dkr.ecr.us-west-2.amazonaws.com/huggingface-pytorch-inference-neuronx:2.8.0-transformers4.55.4-neuronx-py310-sdk2.26.0-ubuntu22.04</code></td></tr>
</tbody>
</table>
</div>

### vLLM

For serving text generation models with [vLLM](https://docs.vllm.ai/), there are specific DLCs available for GPU and AWS AI chips.

<div class="overflow-x-auto my-4 not-prose">
<table class="w-full text-sm">
<thead>
<tr class="border-b border-gray-200 dark:border-gray-800"><th class="py-2 pr-4 text-left font-semibold">Accelerator</th><th class="py-2 pr-4 text-left font-semibold">Version</th><th class="py-2 text-left font-semibold">Container URI</th></tr>
</thead>
<tbody>
<tr class="border-b border-gray-100 dark:border-gray-850"><td class="py-2 pr-4 whitespace-nowrap">GPU</td><td class="py-2 pr-4 whitespace-nowrap">0.28.0</td><td class="py-2"><code class="text-xs break-all">763104351884.dkr.ecr.us-east-1.amazonaws.com/huggingface-vllm:0.28.0-transformers5.15.0-gpu-py312-cu130-ubuntu24.04</code></td></tr>
<tr class="border-b border-gray-100 dark:border-gray-850"><td class="py-2 pr-4 whitespace-nowrap">Neuron</td><td class="py-2 pr-4 whitespace-nowrap">0.11.0</td><td class="py-2"><code class="text-xs break-all">763104351884.dkr.ecr.us-west-2.amazonaws.com/huggingface-vllm-inference-neuronx:0.11.0-optimum0.4.5-neuronx-py310-sdk2.26.1-ubuntu22.04</code></td></tr>
</tbody>
</table>
</div>

#### vLLM Omni

You can also use vLLM Omni for serving multimodal models with vLLM on GPUs.

<div class="overflow-x-auto my-4 not-prose">
<table class="w-full text-sm">
<thead>
<tr class="border-b border-gray-200 dark:border-gray-800"><th class="py-2 pr-4 text-left font-semibold">Accelerator</th><th class="py-2 pr-4 text-left font-semibold">Version</th><th class="py-2 text-left font-semibold">Container URI</th></tr>
</thead>
<tbody>
<tr class="border-b border-gray-100 dark:border-gray-850"><td class="py-2 pr-4 whitespace-nowrap">GPU</td><td class="py-2 pr-4 whitespace-nowrap">0.20.0</td><td class="py-2"><code class="text-xs break-all">763104351884.dkr.ecr.us-west-2.amazonaws.com/huggingface-vllm-omni:0.20.0-transformers5.8.1-gpu-py312-cu130-amzn2023</code></td></tr>
</tbody>
</table>
</div>

### SGLang

There is also a specific DLC for serving models with [SGLang](https://docs.sglang.ai/) on GPU.

<div class="overflow-x-auto my-4 not-prose">
<table class="w-full text-sm">
<thead>
<tr class="border-b border-gray-200 dark:border-gray-800"><th class="py-2 pr-4 text-left font-semibold">Accelerator</th><th class="py-2 pr-4 text-left font-semibold">Version</th><th class="py-2 text-left font-semibold">Container URI</th></tr>
</thead>
<tbody>
<tr class="border-b border-gray-100 dark:border-gray-850"><td class="py-2 pr-4 whitespace-nowrap">GPU</td><td class="py-2 pr-4 whitespace-nowrap">0.5.12</td><td class="py-2"><code class="text-xs break-all">763104351884.dkr.ecr.us-west-2.amazonaws.com/huggingface-sglang:0.5.12-transformers5.6.0-gpu-py312-cu130-ubuntu24.04</code></td></tr>
</tbody>
</table>
</div>

### Llama.cpp

For lightweight inference serving, there is a specific DLC for serving models with [llama.cpp](https://github.com/ggml-org/llama.cpp) on both CPU and GPU.

<div class="overflow-x-auto my-4 not-prose">
<table class="w-full text-sm">
<thead>
<tr class="border-b border-gray-200 dark:border-gray-800"><th class="py-2 pr-4 text-left font-semibold">Accelerator</th><th class="py-2 pr-4 text-left font-semibold">Version</th><th class="py-2 text-left font-semibold">Container URI</th></tr>
</thead>
<tbody>
<tr class="border-b border-gray-100 dark:border-gray-850"><td class="py-2 pr-4 whitespace-nowrap">GPU</td><td class="py-2 pr-4 whitespace-nowrap">b9522</td><td class="py-2"><code class="text-xs break-all">763104351884.dkr.ecr.us-west-2.amazonaws.com/huggingface-llama.cpp:b9522-gpu-cu130-ubuntu24.04</code></td></tr>
<tr class="border-b border-gray-100 dark:border-gray-850"><td class="py-2 pr-4 whitespace-nowrap">CPU</td><td class="py-2 pr-4 whitespace-nowrap">b9522</td><td class="py-2"><code class="text-xs break-all">763104351884.dkr.ecr.us-west-2.amazonaws.com/huggingface-llama.cpp:b9522-cpu-ubuntu24.04</code></td></tr>
</tbody>
</table>
</div>

### Text Embeddings Inference

Finally, the [Text Embeddings Inference (TEI)](https://huggingface.co/docs/text-embeddings-inference) DLC provides high-performance serving of embedding models on CPU and GPU.

<div class="overflow-x-auto my-4 not-prose">
<table class="w-full text-sm">
<thead>
<tr class="border-b border-gray-200 dark:border-gray-800"><th class="py-2 pr-4 text-left font-semibold">Accelerator</th><th class="py-2 text-left font-semibold">Container URI</th></tr>
</thead>
<tbody>
<tr class="border-b border-gray-100 dark:border-gray-850"><td class="py-2 pr-4 whitespace-nowrap">CPU</td><td class="py-2"><code class="text-xs break-all">683313688378.dkr.ecr.us-east-1.amazonaws.com/tei-cpu:2.0.1-tei1.9.3-cpu-py310-ubuntu24.04</code></td></tr>
<tr class="border-b border-gray-100 dark:border-gray-850"><td class="py-2 pr-4 whitespace-nowrap">GPU</td><td class="py-2"><code class="text-xs break-all">683313688378.dkr.ecr.us-east-1.amazonaws.com/tei:2.0.1-tei1.9.3-gpu-py310-cu129-ubuntu24.04</code></td></tr>
</tbody>
</table>
</div>

## FAQ

<details class="my-3 rounded-xl border border-gray-200 px-5 py-4 dark:border-gray-800">
<summary class="cursor-pointer font-semibold text-gray-900 dark:text-white">How do I find the URI of my container?</summary>

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

# use image_scope="training" for training containers
image_uris.retrieve(
    "huggingface-vllm",
    region="us-east-1",
    image_scope="inference",
    instance_type="ml.g5.2xlarge",
)
```

</details>

<details class="my-3 rounded-xl border border-gray-200 px-5 py-4 dark:border-gray-800">
<summary class="cursor-pointer font-semibold text-gray-900 dark:text-white">Can the SDK choose the container for me?</summary>

If you just want the default container for a given model, you can rely on the SageMaker SDK `ModelBuilder`, which automatically chooses the container for you:

```python
from sagemaker.serve import ModelBuilder

builder = ModelBuilder(
    model="google/gemma-4-E2B-it",
    instance_type="ml.g5.2xlarge",
    role_arn=role,
)
```

> [!NOTE]
> The SDK may not always be up to date or may choose the wrong container for your use case. When in doubt, compare the container URI returned by the SDK with the ones listed on this page.

</details>
