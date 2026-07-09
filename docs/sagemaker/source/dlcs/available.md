# Available DLCs on AWS

Below you can find a listing of our latest Deep Learning Containers (DLCs) available on AWS.

For each supported combination of use-case (training, inference), accelerator type (CPU, GPU, Neuron), and framework (PyTorch, TGI, TEI) containers are created.

Neuron DLCs for training and inference on AWS Trainium and AWS Inferentia instances can be found in the [Optimum Neuron documentation](https://huggingface.co/docs/optimum-neuron/en/containers).

If you want to keep track of all our available DLCs, you can also check the [AWS Deep Learning Containers releases](https://aws.github.io/deep-learning-containers/reference/available_images#huggingface-pytorch-training) page.

## Training

For training, the DLCs are available for PyTorch via Transformers. They include GPUs and AWS AI chips support, with libraries such as TRL, Sentence Transformers, or Diffusers.

You can also keep track of the latest PyTorch Training DLC releases [here](https://github.com/aws/deep-learning-containers/releases?q=huggingface-training+AND+NOT+neuronx&expanded=true).

| Container URI                                                                                                                    | Accelerator |
| -------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| 763104351884.dkr.ecr.us-east-1.amazonaws.com/huggingface-pytorch-training:2.9.0-transformers5.3.0-gpu-py312-cu130-ubuntu22.04 | GPU         |
| 763104351884.dkr.ecr.us-west-2.amazonaws.com/huggingface-pytorch-training-neuronx:2.8.0-transformers4.55.4-neuronx-py310-sdk2.26.0-ubuntu22.04 | Neuron         |

## Inference

### PyTorch Inference

For inference, there is a general-purpose PyTorch inference DLC, for serving models trained with any of those frameworks mentioned before on CPU, GPU, and AWS AI chips.

| Container URI                                                                                                                    | Accelerator |
| -------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| 763104351884.dkr.ecr.us-east-1.amazonaws.com/huggingface-pytorch-inference:2.6.0-transformers4.51.3-cpu-py312-ubuntu22.04- | CPU         |
| 763104351884.dkr.ecr.us-east-1.amazonaws.com/huggingface-pytorch-inference:2.6.0-transformers4.51.3-gpu-py312-cu124-ubuntu22.04 | GPU         |
| 763104351884.dkr.ecr.us-west-2.amazonaws.com/huggingface-pytorch-inference-neuronx:2.8.0-transformers4.55.4-neuronx-py310-sdk2.26.0-ubuntu22.04 | Neuron         |


### vLLM

In case you want to serve text generation models with vLLM, there are specific DLCs available for GPU and AWS AI chips.

| vLLM version | Container URI                                                                                                                    | Accelerator |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| 0.21.0         | 763104351884.dkr.ecr.us-west-2.amazonaws.com/huggingface-vllm:0.21.0-transformers5.8.1-gpu-py312-cu130-ubuntu22.04 | GPU         |
| 0.11.0         | 763104351884.dkr.ecr.us-west-2.amazonaws.com/huggingface-vllm-inference-neuronx:0.11.0-optimum0.4.5-neuronx-py310-sdk2.26.1-ubuntu22.04 | Neuron         |

### vLLM Omni

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
