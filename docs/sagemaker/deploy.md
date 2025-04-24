# Deploy models on AWS

Deploying Hugging Face models on AWS is streamlined through various services, each suited for different deployment scenarios. Here's how you can deploy your models using AWS and Hugging Face offerings.

## With Sagemaker SDK

Amazon SageMaker is a fully managed AWS service for building, training, and deploying machine learning models at scale. The SageMaker SDK simplifies interacting with SageMaker programmatically. Amazon SageMaker SDK provides a seamless integration specifically designed for Hugging Face models, simplifying the deployment process of managed endpoints. With this integration, you can quickly deploy pre-trained Hugging Face models or your own fine-tuned models directly into SageMaker-managed endpoints, significantly reducing setup complexity and time to production.

[Sagemaker SDK Quickstart](https://huggingface.co/docs/sagemaker/main/en/how-to/sagemaker-sdk-quickstart)

## With Sagemaker Jumpstart

Amazon SageMaker JumpStart is a curated model catalog from which you can deploy a model with just a few clicks. We maintain a Hugging Face section in the catalog that will let you self-host the most famous open models in your VPC with performant default configurations, powered under the hood by Hugging Face Deep Learning Catalogs (DLCs). (#todo link to DLC intro)

[Sagemaker Jumpstart Quickstart](https://huggingface.co/docs/sagemaker/main/en/how-to/jumpstart-quickstart)

## With AWS Bedrock

Amazon Bedrock enables developers to easily build and scale generative AI applications through a single API.  With Bedrock Marketplace, you can now combine the ease of use of SageMaker JumpStart with the fully managed infrastructure of Amazon Bedrock, including compatibility with high-level APIs such as Agents, Knowledge Bases, Guardrails and Model Evaluations.

[AWS Bedrock Quickstart](https://huggingface.co/docs/sagemaker/main/en/how-to/bedrock-quickstart)

## With Hugging Face Inference Endpoints

Hugging Face Inference Endpoints allow you to deploy models hosted directly by Hugging Face, fully managed and optimized for performance. It's ideal for quick deployment and scalable inference workloads.

[Hugging Face Inference Endpoints Quickstart](https://huggingface.co/docs/inference-endpoints/guides/create_endpoint).

## With ECS, EKS, and EC2

Hugging Face provides Inference Deep Learning Containers (DLCs) to AWS users, optimized environments preconfigured with Hugging Face libraries for inference, natively integrated in SageMaker SDK and JumpStart. However, the HF DLCs can also be used across other AWS services like ECS, EKS, and EC2.

AWS Elastic Container Service (ECS), Elastic Kubernetes Service (EKS), and Elastic Compute Cloud (EC2) allow you to leverage DLCs directly.

[EC2, ECS and EKS Quickstart](https://huggingface.co/docs/sagemaker/main/en/how-to/compute-services-quickstart)