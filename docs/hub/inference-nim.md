# Serverless Inference powered by NVIDIA

<Tip warning={true}>
This feature is part of the <a href="https://huggingface.co/enterprise" target="_blank">Enterprise Hub</a>.
</Tip>

Serverless Inference powered by NVIDIA offers access to NVIDIA AI technology GPUs an [NVIDIA Inference Microservices](https://www.nvidia.com/en-us/ai/) (NIM) in a serverless way. Use standardized APIs and a few lines of code to run inference in a pay-as-you-go pricing model.

## How it works

Read the [blogpost for Serverless Inference with Hugging Face and NVIDIA NIMs](https://huggingface.co/blog/inference-dgx-cloud#how-it-works).

## Pricing

Usage of Serverless Inference powered by NVIDIA is billed based on the compute time spent per request. Usage fees accrue to your Enterprise Hub Organizations’ current monthly billing cycle, once a job is completed. You can check your current and past usage at any time within the billing settings of your Enterprise Hub Organization.

The total cost for a request will depend on the model size, the number of GPUs required, and the time taken to process the request.

| NVIDIA GPU                | GPU Memory                | On-Demand Price/hr        |
|---------------------------|---------------------------|---------------------------|
| NVIDIA L40S               | 48GB                      |$2.75                      |
| NVIDIA H100               | 80GB                      |$8.25                      |

## Supported models

You can find all supported models in [this NVIDIA Collection](https://huggingface.co/collections/nvidia/nim-66a3c6fcdcb5bbc6e975b508).