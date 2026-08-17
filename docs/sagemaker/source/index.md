# Hugging Face on AWS

![Hugging Face on AWS](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/sagemaker/cover.png)

Hugging Face partners with Amazon Web Services (AWS) to democratize artificial intelligence, enabling developers to seamlessly build, train, and deploy state-of-the-art machine learning models on AWS cloud infrastructure. This collaboration gives developers access to a growing catalog of pre-trained models and datasets from the Hugging Face Hub, through Hugging Face open-source libraries, across a broad spectrum of AWS services and hardware platforms.

We build new experiences to train and deploy Hugging Face models, whether you use AWS AI platforms such as Amazon SageMaker AI and AWS Bedrock, or AWS compute services such as Elastic Container Service (ECS), Elastic Kubernetes Service (EKS), and Amazon Elastic Compute Cloud (EC2). We also develop tools to simplify the adoption of custom AI accelerators like AWS Inferentia and AWS Trainium, designed to enhance the performance and cost-efficiency of machine learning workloads.

Whether you are building a first prototype or operating production workloads, you can choose the level of infrastructure control that fits your application.

## Where to start

Choose from the following options to quicklyget started:

<div class="grid grid-cols-1 gap-4 sm:grid-cols-3 my-6 not-prose">
  <a class="group flex flex-col rounded-xl border border-orange-100 bg-linear-to-br from-orange-50 px-6 py-5 no-underline! dark:border-gray-850 dark:from-orange-500/10" href="./tutorials/jumpstart/jumpstart-quickstart">
    <div class="mb-2 text-lg font-semibold text-orange-600 dark:text-orange-300">Quickstart</div>
    <p class="mb-4 grow text-sm text-gray-600 dark:text-gray-400">Deploy and test a Hugging Face model with SageMaker JumpStart.</p>
    <span class="text-sm font-semibold text-gray-800 group-hover:text-orange-600 dark:text-gray-200 dark:group-hover:text-orange-300">Deploy a model →</span>
  </a>
  <a class="group flex flex-col rounded-xl border border-blue-100 bg-linear-to-br from-blue-50 px-6 py-5 no-underline! dark:border-gray-850 dark:from-blue-500/10" href="./tutorials/index">
    <div class="mb-2 text-lg font-semibold text-blue-600 dark:text-blue-300">Choose a service</div>
    <p class="mb-4 grow text-sm text-gray-600 dark:text-gray-400">Compare SageMaker AI, Bedrock, AWS compute, and Inference Endpoints.</p>
    <span class="text-sm font-semibold text-gray-800 group-hover:text-blue-600 dark:text-gray-200 dark:group-hover:text-blue-300">Compare options →</span>
  </a>
  <a class="group flex flex-col rounded-xl border border-purple-100 bg-linear-to-br from-purple-50 px-6 py-5 no-underline! dark:border-gray-850 dark:from-purple-500/10" href="./tutorials/sagemaker-sdk/sagemaker-sdk-quickstart">
    <div class="mb-2 text-lg font-semibold text-purple-600 dark:text-purple-300">SageMaker SDK</div>
    <p class="mb-4 grow text-sm text-gray-600 dark:text-gray-400">Deploy any Hub model to a managed endpoint from Python.</p>
    <span class="text-sm font-semibold text-gray-800 group-hover:text-purple-600 dark:text-gray-200 dark:group-hover:text-purple-300">Start from Python →</span>
  </a>
</div>

## Choose your path

For a more in-depth exploration of the different options, choose from the following paths:

<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 my-6 not-prose">
  <div class="flex flex-col rounded-xl border border-gray-200 px-6 py-5 dark:border-gray-800">
    <div class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Amazon SageMaker AI</div>
    <p class="mb-4 grow text-sm text-gray-600 dark:text-gray-400">Train, fine-tune, and deploy models with managed jobs and endpoints. Use the Python SDK for programmatic workflows or JumpStart for a guided deployment.</p>
    <div class="flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold">
      <a class="no-underline! text-orange-600 dark:text-orange-300" href="./tutorials/sagemaker-sdk/deploy-sagemaker-sdk">Deploy →</a>
      <a class="no-underline! text-orange-600 dark:text-orange-300" href="./tutorials/sagemaker-sdk/training-sagemaker-sdk">Train →</a>
      <a class="no-underline! text-orange-600 dark:text-orange-300" href="./tutorials/jumpstart/jumpstart-quickstart">JumpStart →</a>
    </div>
  </div>
  <div class="flex flex-col rounded-xl border border-gray-200 px-6 py-5 dark:border-gray-800">
    <div class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Amazon Bedrock</div>
    <p class="mb-4 grow text-sm text-gray-600 dark:text-gray-400">Combine JumpStart models with the managed Bedrock APIs and features such as Agents, Knowledge Bases, Guardrails, and Model Evaluation.</p>
    <a class="text-sm font-semibold text-orange-600 no-underline! dark:text-orange-300" href="./tutorials/bedrock/bedrock-quickstart">Deploy with Bedrock →</a>
  </div>
  <div class="flex flex-col rounded-xl border border-gray-200 px-6 py-5 dark:border-gray-800">
    <div class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">AWS compute</div>
    <p class="mb-4 grow text-sm text-gray-600 dark:text-gray-400">Run Hugging Face DLCs on Amazon EC2, ECS, or EKS when you need direct control over networking, orchestration, and infrastructure.</p>
    <a class="text-sm font-semibold text-orange-600 no-underline! dark:text-orange-300" href="./tutorials/compute-services/compute-services-quickstart">Explore EC2, ECS, and EKS →</a>
  </div>
  <div class="flex flex-col rounded-xl border border-gray-200 px-6 py-5 dark:border-gray-800">
    <div class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Hugging Face Inference Endpoints</div>
    <p class="mb-4 grow text-sm text-gray-600 dark:text-gray-400">Deploy models on AWS infrastructure through a fully managed Hugging Face service, optimized for cost and throughput, without managing the serving stack yourself.</p>
    <a class="text-sm font-semibold text-orange-600 no-underline! dark:text-orange-300" href="https://huggingface.co/docs/inference-endpoints/guides/create_endpoint">Create an Inference Endpoint →</a>
  </div>
</div>

## Explore the documentation

DLCs are Docker images pre-installed with Hugging Face libraries and serving engines such as vLLM, SGLang, and llama.cpp, maintained by Hugging Face and AWS.

<div class="grid grid-cols-1 gap-4 sm:grid-cols-3 my-6 not-prose">
  <a class="group rounded-xl border border-gray-200 px-5 py-4 no-underline! dark:border-gray-800" href="./dlcs/introduction">
    <div class="font-semibold text-gray-900 group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-300">Deep Learning Containers</div>
    <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">What the DLCs are, how they work, and which images are available.</p>
  </a>
  <a class="group rounded-xl border border-gray-200 px-5 py-4 no-underline! dark:border-gray-800" href="./tutorials/index">
    <div class="font-semibold text-gray-900 group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-300">Guides</div>
    <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">Follow task-oriented training and deployment tutorials.</p>
  </a>
  <a class="group rounded-xl border border-gray-200 px-5 py-4 no-underline! dark:border-gray-800" href="./examples/sagemaker-sdk-fine-tune-embedding-models">
    <div class="font-semibold text-gray-900 group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-300">Examples</div>
    <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">Explore complete notebooks for real workloads.</p>
  </a>
</div>

## Reference

- [Available DLCs](./dlcs/available)
- [Inference Toolkit API](./reference/inference-toolkit)
- [Other Resources](./reference/resources)
