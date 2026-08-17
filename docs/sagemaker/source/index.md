# Hugging Face on AWS

Train and deploy open models from the Hugging Face Hub on AWS, using Deep Learning Containers (DLCs) and integrations maintained by Hugging Face and AWS.

> [!NOTE]
> These docs and examples use the [SageMaker Python SDK v3](https://github.com/aws/sagemaker-python-sdk), which introduces a new framework-agnostic API built around `ModelBuilder` (inference) and `ModelTrainer` (training), replacing the v2 `HuggingFaceModel` and `HuggingFace` classes. Install it with `pip install "sagemaker>=3.0.0"`.

## Deploy on AWS

<div class="flex flex-wrap gap-4 my-6">
  <a href="./tutorials/sagemaker-sdk/deploy-sagemaker-sdk" class="block w-full sm:w-72 border border-gray-200 dark:border-gray-700 rounded-lg p-4 no-underline hover:shadow-md">
    <div class="font-semibold">SageMaker SDK</div>
    <div class="text-sm">Deploy any Hub model to a managed endpoint from Python.</div>
  </a>
  <a href="./tutorials/jumpstart/jumpstart-quickstart" class="block w-full sm:w-72 border border-gray-200 dark:border-gray-700 rounded-lg p-4 no-underline hover:shadow-md">
    <div class="font-semibold">JumpStart</div>
    <div class="text-sm">Deploy curated open models from the SageMaker catalog in a few clicks.</div>
  </a>
  <a href="./tutorials/bedrock/bedrock-quickstart" class="block w-full sm:w-72 border border-gray-200 dark:border-gray-700 rounded-lg p-4 no-underline hover:shadow-md">
    <div class="font-semibold">Bedrock</div>
    <div class="text-sm">Combine JumpStart models with the managed Bedrock APIs.</div>
  </a>
  <a href="https://huggingface.co/docs/inference-endpoints/guides/create_endpoint" class="block w-full sm:w-72 border border-gray-200 dark:border-gray-700 rounded-lg p-4 no-underline hover:shadow-md">
    <div class="font-semibold">Inference Endpoints</div>
    <div class="text-sm">Deploy on infrastructure managed by Hugging Face, optimized for cost and throughput.</div>
  </a>
  <a href="./tutorials/compute-services/compute-services-quickstart" class="block w-full sm:w-72 border border-gray-200 dark:border-gray-700 rounded-lg p-4 no-underline hover:shadow-md">
    <div class="font-semibold">EC2, ECS, and EKS</div>
    <div class="text-sm">Run the DLCs directly on AWS compute services.</div>
  </a>
</div>

## Train on AWS

<div class="flex flex-wrap gap-4 my-6">
  <a href="./tutorials/sagemaker-sdk/training-sagemaker-sdk" class="block w-full sm:w-72 border border-gray-200 dark:border-gray-700 rounded-lg p-4 no-underline hover:shadow-md">
    <div class="font-semibold">SageMaker SDK</div>
    <div class="text-sm">Run training and fine-tuning jobs with ModelTrainer.</div>
  </a>
  <a href="./tutorials/compute-services/compute-services-quickstart" class="block w-full sm:w-72 border border-gray-200 dark:border-gray-700 rounded-lg p-4 no-underline hover:shadow-md">
    <div class="font-semibold">EC2, ECS, and EKS</div>
    <div class="text-sm">Run the training DLCs directly on AWS compute services.</div>
  </a>
</div>

## Deep Learning Containers

DLCs are Docker images pre-installed with Hugging Face libraries and serving engines such as vLLM, SGLang, and llama.cpp, maintained by Hugging Face and AWS.

<div class="flex flex-wrap gap-4 my-6">
  <a href="./dlcs/introduction" class="block w-full sm:w-72 border border-gray-200 dark:border-gray-700 rounded-lg p-4 no-underline hover:shadow-md">
    <div class="font-semibold">Introduction</div>
    <div class="text-sm">What the DLCs are and how they work.</div>
  </a>
  <a href="./dlcs/available" class="block w-full sm:w-72 border border-gray-200 dark:border-gray-700 rounded-lg p-4 no-underline hover:shadow-md">
    <div class="font-semibold">Available DLCs</div>
    <div class="text-sm">Images and versions for training and inference.</div>
  </a>
</div>

## Reference

- [Inference Toolkit API](./reference/inference-toolkit)
- [Other Resources](./reference/resources)
