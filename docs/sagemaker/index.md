# Hugging Face on AWS

![cover](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/sagemaker/cover.png)

Hugging Face partners with Amazon Web Services (AWS) to democratize artificial intelligence (AI), enabling developers to seamlessly build, train, and deploy state-of-the-art machine learning models using AWS's robust cloud infrastructure. ​

This collaboration aims to offer developers access to an everyday growing catalog of pre-trained models and dataset from the Hugging Face Hub, using Hugging Face open-source libraries across a broad spectrum of AWS services and hardware platforms.

We build new experiences for developers to seamlessly train and deploy Hugging Face models whether they use AWS AI platforms such as Amazon SageMaker AI and AWS Bedrock, or AWS Compute services such as Elastic Container Service (ECS), Elastic Kubernetes Service (EKS), and virtual servers on Amazon Elastic Compute Cloud (EC2).

We develop new tools to simplify the adoption of custom AI accelerators like AWS Inferentia and AWS Trainium, designed to enhance the performance and cost-efficiency of machine learning workloads.

By combining Hugging Face's open-source models and libraries with AWS's scalable and secure cloud services, developers can more easily and affordably incorporate advanced AI capabilities into their applications.

## Deploy models on AWS

Deploying Hugging Face models on AWS is streamlined through various services, each suited for different deployment scenarios. Here's how you can deploy your models using AWS and Hugging Face offerings.

You can deploy any Hugging Face Model on AWS with:
- [Amazon Sagemaker SDK](#deploy-with-sagemaker-sdk)
- [Amazon Sagemaker Jumpstart](#deploy-with-sagemaker-jumpstart)
- [AWS Bedrock](#deploy-with-aws-bedrock)
- [Hugging Face Inference Endpoints](#deploy-with-hugging-face-inference-endpoints)
- [ECS, EKS, and EC2](#deploy-with-ecs-eks-and-ec2)

### Deploy with Sagemaker SDK

Amazon SageMaker is a fully managed AWS service for building, training, and deploying machine learning models at scale. The SageMaker SDK simplifies interacting with SageMaker programmatically. Amazon SageMaker SDK provides a seamless integration specifically designed for Hugging Face models, simplifying the deployment process of managed endpoints. With this integration, you can quickly deploy pre-trained Hugging Face models or your own fine-tuned models directly into SageMaker-managed endpoints, significantly reducing setup complexity and time to production.

[Sagemaker SDK Quickstart](https://huggingface.co/docs/sagemaker/main/en/how-to/sagemaker-sdk-quickstart)

### Deploy with Sagemaker Jumpstart

Amazon SageMaker JumpStart is a curated model catalog from which you can deploy a model with just a few clicks. We maintain a Hugging Face section in the catalog that will let you self-host the most famous open models in your VPC with performant default configurations, powered under the hood by Hugging Face Deep Learning Catalogs (DLCs). (#todo link to DLC intro)

[Sagemaker Jumpstart Quickstart](https://huggingface.co/docs/sagemaker/main/en/how-to/jumpstart-quickstart)

### Deploy with AWS Bedrock

Amazon Bedrock enables developers to easily build and scale generative AI applications through a single API.  With Bedrock Marketplace, you can now combine the ease of use of SageMaker JumpStart with the fully managed infrastructure of Amazon Bedrock, including compatibility with high-level APIs such as Agents, Knowledge Bases, Guardrails and Model Evaluations.

[AWS Bedrock Quickstart](https://huggingface.co/docs/sagemaker/main/en/how-to/bedrock-quickstart)

### Deploy with Hugging Face Inference Endpoints

Hugging Face Inference Endpoints allow you to deploy models hosted directly by Hugging Face, fully managed and optimized for performance. It's ideal for quick deployment and scalable inference workloads.

[Hugging Face Inference Endpoints Quickstart](https://huggingface.co/docs/inference-endpoints/guides/create_endpoint).

### Deploy with ECS, EKS, and EC2

Hugging Face provides Inference Deep Learning Containers (DLCs) to AWS users, optimized environments preconfigured with Hugging Face libraries for inference, natively integrated in SageMaker SDK and JumpStart. However, the HF DLCs can also be used across other AWS services like ECS, EKS, and EC2.

AWS Elastic Container Service (ECS), Elastic Kubernetes Service (EKS), and Elastic Compute Cloud (EC2) allow you to leverage DLCs directly.

[EC2, ECS and EKS Quickstart](https://huggingface.co/docs/sagemaker/main/en/how-to/compute-services-quickstart)

## Train models on AWS

Training Hugging Face models on AWS is streamlined through various services. Here's how you can fine-tune your models using AWS and Hugging Face offerings.

You can fine-tune any Hugging Face Model on AWS with:
- [Amazon Sagemaker SDK](#train-with-sagemaker-sdk)
- [ECS, EKS, and EC2](#train-with-ecs-eks-and-ec2)

### Train with Sagemaker SDK

Amazon SageMaker is a fully managed AWS service for building, training, and deploying machine learning models at scale. The SageMaker SDK simplifies interacting with SageMaker programmatically. Amazon SageMaker SDK provides a seamless integration specifically designed for Hugging Face models, simplifying the training job management. With this integration, you can quickly create your own fine-tuned models, significantly reducing setup complexity and time to production.

[Sagemaker SDK Quickstart](https://huggingface.co/docs/sagemaker/main/en/how-to/sagemaker-sdk-quickstart)

### Train with ECS, EKS, and EC2

Hugging Face provides Training Deep Learning Containers (DLCs) to AWS users, optimized environments preconfigured with Hugging Face libraries for training, natively integrated in SageMaker SDK. However, the HF DLCs can also be used across other AWS services like ECS, EKS, and EC2.

AWS Elastic Container Service (ECS), Elastic Kubernetes Service (EKS), and Elastic Compute Cloud (EC2) allow you to leverage DLCs directly.

[EC2, ECS and EKS Quickstart](https://huggingface.co/docs/sagemaker/main/en/how-to/compute-services-quickstart)