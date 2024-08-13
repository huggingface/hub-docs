# Advanced Compute Options

Enterprise Hub organizations gain access to advanced compute options to accelerate their machine learning journey.

<Tip warning={true}>
This feature is part of the <a href="https://huggingface.co/enterprise" target="_blank">Enterprise Hub</a>.
</Tip>

## Train on NVIDIA DGX Cloud

Train on NVIDIA DGX Cloud offers a simple no-code training job creation experience powered by Hugging Face AutoTrain and Hugging Face Spaces. Instantly access NVIDIA GPUs and avoid the time-consuming work of writing, testing, and debugging training scripts for AI models.

### How it works

Read the [blogpost for Train on NVIDIA DGX Cloud](https://huggingface.co/blog/train-dgx-cloud#how-it-works).

### Supported architectures

#### Transformers

| Architecture              |
|---------------------------|
| Llama                     |
| Falcon                    |
| Mistral                   |
| Mixtral                   | 
| T5                        |
| gemma                     |

#### Diffusers

| Architecture              |
|---------------------------|
| Stable Diffusion          |
| Stable Diffusion XL       |

### Pricing

Usage of Train on NVIDIA DGX Cloud is billed by the minute of the GPU instances used during your training jobs. Usage fees accrue to your Enterprise Hub Organizations’ current monthly billing cycle, once a job is completed. You can check your current and past usage at any time within the billing settings of your Enterprise Hub Organization.

| NVIDIA GPU                | GPU Memory                | On-Demand Price/hr        |
|---------------------------|---------------------------|---------------------------|
| NVIDIA L40S               | 48GB                      |$2.75                      |
| NVIDIA H100               | 80GB                      |$8.25                      |

## NVIDIA NIM API (serverless)

NVIDIA NIM API (serverless) offers access to [NVIDIA Inference Microservices (NIM)](https://www.nvidia.com/en-us/ai/) powered by NVIDIA H100s in a serverless way. Use standardized APIs and a few lines of code to run inference in a pay-as-you-go pricing model.

### How it works

Read the [blogpost for Serverless Inference with Hugging Face and NVIDIA NIMs](https://huggingface.co/blog/inference-dgx-cloud#how-it-works).

### Supported models

You can find all supported models in [this NVIDIA Collection](https://huggingface.co/collections/nvidia/nim-66a3c6fcdcb5bbc6e975b508).

### Pricing

Usage of NVIDIA NIM API (serverless) is billed based on the compute time spent per request. Usage fees accrue to your Enterprise Hub Organizations’ current monthly billing cycle, once a job is completed. You can check your current and past usage at any time within the billing settings of your Enterprise Hub Organization.

| NVIDIA GPU                | GPU Memory                | On-Demand Price/hr        |
|---------------------------|---------------------------|---------------------------|
| NVIDIA H100               | 80GB                      |$8.25                      |

The total cost for a request will depend on the model size, the number of GPUs required, and the time taken to process the request. For each model, you can find which hardware configuration is used in the notes of [this NVIDIA Collection](https://huggingface.co/collections/nvidia/nim-66a3c6fcdcb5bbc6e975b508).