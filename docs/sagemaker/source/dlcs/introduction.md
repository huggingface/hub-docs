# Introduction

Hugging Face built Deep Learning Containers (DLCs) for Amazon Web Services customers to run any of their machine learning workload in an optimized environment, with no configuration or maintenance on their part. These are Docker images pre-installed with deep learning frameworks and libraries such as 🤗 Transformers, 🤗 Datasets, and 🤗 Tokenizers. The DLCs allow you to directly serve and train any models, skipping the complicated process of building and optimizing your serving and training environments from scratch.

The containers are publicly maintained, updated and released periodically by Hugging Face and the AWS team and available for all AWS customers within the AWS’s Elastic Container Registry. They can be used from any AWS service such as:
* **Amazon Sagemaker AI**: Amazon SageMaker AI is a fully managed machine learning (ML) platform for data scientists and developers to quickly and confidently build, train, and deploy ML models into a production-ready hosted environment.
* **Amazon Bedrock**: Amazon Bedrock is a fully managed service that makes high-performing foundation models (FMs) from leading AI companies and Amazon available for your use through a unified API to build generative AI applications.
* **Amazon Elastic Kubernetes Service (EKS)**: Amazon EKS is the premiere platform for running Kubernetes clusters in the AWS cloud.
* **Amazon Elastic Container Service (ECS)**: Amazon ECS is a fully managed container orchestration service that helps you easily deploy, manage, and scale containerized applications.
* **Amazon Elastic Compute Cloud (EC2)**: Amazon EC2 provides on-demand, scalable computing capacity in the Amazon Web Services (AWS) Cloud.

Hugging Face DLCs are open source and licensed under Apache 2.0. Feel free to reach out on our [community forum](https://discuss.huggingface.co/c/sagemaker/17) if you have any questions.

## Features & benefits

The Hugging Face DLCs provide ready-to-use, tested environments to train and deploy Hugging Face models.

### One command is all you need

With the new Hugging Face DLCs, train and deploy cutting-edge Transformers-based NLP models in a single line of code. The Hugging Face PyTorch DLCs for training come with all the libraries installed to run a single command e.g. via [TRL CLI](https://huggingface.co/docs/trl/en/clis) to fine-tune LLMs on any setting, either single-GPU, single-node multi-GPU, and more.

### Accelerate machine learning from science to production

In addition to Hugging Face DLCs, we created a first-class Hugging Face library for inference, [`sagemaker-huggingface-inference-toolkit`](https://github.com/aws/sagemaker-huggingface-inference-toolkit/tree/main/src/sagemaker_huggingface_inference_toolkit), that comes with the Hugging Face PyTorch DLCs for inference, with full support on serving any PyTorch model on AWS.

Deploy your trained models for inference with just one more line of code or select any of the ever growing publicly available models from the model Hub.

### High-performance text generation and embedding

Besides the PyTorch-oriented DLCs, Hugging Face also provides high-performance inference for both text generation and embedding models via the Hugging Face DLCs for both Text Generation Inference (TGI) and Text Embeddings Inference (TEI), respectively.

The Hugging Face DLC for TGI enables you to deploy any of the +225,000 text generation inference supported models from the Hugging Face Hub, or any custom model as long as its architecture is supported within TGI.

The Hugging Face DLC for TEI enables you to deploy any of the +12,000 embedding, re-ranking or sequence classification supported models from the Hugging Face Hub, or any custom model as long as its architecture is supported within TEI.

Additionally, these DLCs come with full support for AWS meaning that deploying models from Amazon Simple Storage Service (S3) is also straight forward and requires no configuration.

### Built-in performance

Hugging Face DLCs feature built-in performance optimizations for PyTorch to train models faster. The DLCs also give you the flexibility to choose a training infrastructure that best aligns with the price/performance ratio for your workload.

Hugging Face Inference DLCs provide you with production-ready endpoints that scale quickly with your AWS environment, built-in monitoring, and a ton of enterprise features.