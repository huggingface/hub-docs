# Available DLCs on AWS

Below you can find the current Hugging Face Deep Learning Containers (DLCs) available on AWS.

For each supported combination of use case (training or inference), accelerator type (CPU, GPU, or Neuron), and framework or serving stack, AWS publishes a SageMaker container image.

The source of truth is the [AWS Deep Learning Containers available images](https://aws.github.io/deep-learning-containers/reference/available_images/#huggingface-pytorch-training) page. Replace `<region>` in the image URIs below with the AWS Region where you run SageMaker.

Neuron DLCs for training and inference on AWS Trainium and AWS Inferentia instances can also be found in the [Optimum Neuron documentation](https://huggingface.co/docs/optimum-neuron/en/containers).

## Training

### PyTorch Training

| Framework | Python | CUDA | Transformers | Accelerator | Container URI |
| --- | --- | --- | --- | --- | --- |
| PyTorch 2.9 | py312 | cu130 | 5.3.0 | GPU | `763104351884.dkr.ecr.<region>.amazonaws.com/huggingface-pytorch-training:2.9.0-transformers5.3.0-gpu-py312-cu130-ubuntu22.04` |
| PyTorch 2.5 | py311 | cu124 | 4.49.0 | GPU | `763104351884.dkr.ecr.<region>.amazonaws.com/huggingface-pytorch-training:2.5.1-transformers4.49.0-gpu-py311-cu124-ubuntu22.04` |
| PyTorch 2.1 | py310 | cu121 | 4.36.0 | GPU | `763104351884.dkr.ecr.<region>.amazonaws.com/huggingface-pytorch-training:2.1.0-transformers4.36.0-gpu-py310-cu121-ubuntu20.04` |
| PyTorch 2.0 | py310 | cu118 | 4.28.1 | GPU | `763104351884.dkr.ecr.<region>.amazonaws.com/huggingface-pytorch-training:2.0.0-transformers4.28.1-gpu-py310-cu118-ubuntu20.04` |
| PyTorch 1.13 | py39 | cu117 | 4.26.0 | GPU | `763104351884.dkr.ecr.<region>.amazonaws.com/huggingface-pytorch-training:1.13.1-transformers4.26.0-gpu-py39-cu117-ubuntu20.04` |

### PyTorch Training NeuronX

| Framework | Python | Neuron SDK | Transformers | Accelerator | Container URI |
| --- | --- | --- | --- | --- | --- |
| PyTorch 2.8 | py310 | 2.26.0 | 4.55.4 | NeuronX | `763104351884.dkr.ecr.<region>.amazonaws.com/huggingface-pytorch-training-neuronx:2.8.0-transformers4.55.4-neuronx-py310-sdk2.26.0-ubuntu22.04` |
| PyTorch 2.7 | py310 | 2.24.1 | 4.51.0 | NeuronX | `763104351884.dkr.ecr.<region>.amazonaws.com/huggingface-pytorch-training-neuronx:2.7.0-transformers4.51.0-neuronx-py310-sdk2.24.1-ubuntu22.04` |
| PyTorch 2.1 | py310 | 2.20.0 | 4.48.1 | NeuronX | `763104351884.dkr.ecr.<region>.amazonaws.com/huggingface-pytorch-training-neuronx:2.1.2-transformers4.48.1-neuronx-py310-sdk2.20.0-ubuntu20.04` |

### PyTorch Training Compiler

| Framework | Python | CUDA | Transformers | Accelerator | Container URI |
| --- | --- | --- | --- | --- | --- |
| PyTorch 1.11 | py38 | cu113 | 4.21.1 | GPU | `763104351884.dkr.ecr.<region>.amazonaws.com/huggingface-pytorch-trcomp-training:1.11.0-transformers4.21.1-gpu-py38-cu113-ubuntu20.04` |

### TensorFlow Training

| Framework | Python | CUDA | Transformers | Accelerator | Container URI |
| --- | --- | --- | --- | --- | --- |
| TensorFlow 2.6 | py38 | cu112 | 4.17.0 | GPU | `763104351884.dkr.ecr.<region>.amazonaws.com/huggingface-tensorflow-training:2.6.3-transformers4.17.0-gpu-py38-cu112-ubuntu20.04` |

## Inference

### PyTorch Inference

Use these general-purpose PyTorch inference DLCs for Transformers models on CPU or GPU.

| Framework | Python | CUDA | Transformers | Accelerator | Container URI |
| --- | --- | --- | --- | --- | --- |
| PyTorch 2.6 | py312 | cu124 | 5.5.3 | GPU | `763104351884.dkr.ecr.<region>.amazonaws.com/huggingface-pytorch-inference:2.6.0-transformers5.5.3-gpu-py312-cu124-ubuntu22.04` |
| PyTorch 2.6 | py312 | - | 5.5.3 | CPU | `763104351884.dkr.ecr.<region>.amazonaws.com/huggingface-pytorch-inference:2.6.0-transformers5.5.3-cpu-py312-ubuntu22.04` |
| PyTorch 2.1 | py310 | cu118 | 4.37.0 | GPU | `763104351884.dkr.ecr.<region>.amazonaws.com/huggingface-pytorch-inference:2.1.0-transformers4.37.0-gpu-py310-cu118-ubuntu20.04` |
| PyTorch 2.1 | py310 | - | 4.37.0 | CPU | `763104351884.dkr.ecr.<region>.amazonaws.com/huggingface-pytorch-inference:2.1.0-transformers4.37.0-cpu-py310-ubuntu22.04` |

### PyTorch Inference NeuronX

| Framework | Python | Neuron SDK | Transformers | Accelerator | Container URI |
| --- | --- | --- | --- | --- | --- |
| PyTorch 2.8 | py310 | 2.26.0 | 4.55.4 | NeuronX | `763104351884.dkr.ecr.<region>.amazonaws.com/huggingface-pytorch-inference-neuronx:2.8.0-transformers4.55.4-neuronx-py310-sdk2.26.0-ubuntu22.04` |
| PyTorch 2.7 | py310 | 2.24.1 | 4.51.3 | NeuronX | `763104351884.dkr.ecr.<region>.amazonaws.com/huggingface-pytorch-inference-neuronx:2.7.1-transformers4.51.3-neuronx-py310-sdk2.24.1-ubuntu22.04` |
| PyTorch 2.1 | py310 | 2.20.0 | 4.43.2 | NeuronX | `763104351884.dkr.ecr.<region>.amazonaws.com/huggingface-pytorch-inference-neuronx:2.1.2-transformers4.43.2-neuronx-py310-sdk2.20.0-ubuntu20.04` |

### TensorFlow Inference

| Framework | Python | CUDA | Transformers | Accelerator | Container URI |
| --- | --- | --- | --- | --- | --- |
| TensorFlow 2.11 | py39 | cu112 | 4.26.0 | GPU | `763104351884.dkr.ecr.<region>.amazonaws.com/huggingface-tensorflow-inference:2.11.1-transformers4.26.0-gpu-py39-cu112-ubuntu20.04` |
| TensorFlow 2.11 | py39 | - | 4.26.0 | CPU | `763104351884.dkr.ecr.<region>.amazonaws.com/huggingface-tensorflow-inference:2.11.1-transformers4.26.0-cpu-py39-ubuntu20.04` |

### Llama.cpp

| Framework | CUDA | Accelerator | Container URI |
| --- | --- | --- | --- |
| Llama.cpp b9522 | cu130 | GPU | `763104351884.dkr.ecr.<region>.amazonaws.com/huggingface-llamacpp:b9522-gpu-cu130-ubuntu24.04` |
| Llama.cpp b9522 | - | CPU | `763104351884.dkr.ecr.<region>.amazonaws.com/huggingface-llamacpp:b9522-cpu-ubuntu24.04` |

### vLLM

| vLLM version | Python | CUDA | Transformers | Accelerator | Container URI |
| --- | --- | --- | --- | --- | --- |
| 0.21.0 | py312 | cu130 | 5.8.1 | GPU | `763104351884.dkr.ecr.<region>.amazonaws.com/huggingface-vllm:0.21.0-transformers5.8.1-gpu-py312-cu130-ubuntu22.04` |
| 0.17.0 | py312 | cu129 | 4.57.5 | GPU | `763104351884.dkr.ecr.<region>.amazonaws.com/huggingface-vllm:0.17.0-transformers4.57.5-gpu-py312-cu129-ubuntu22.04` |
| 0.14.0 | py312 | cu129 | 4.57.3 | GPU | `763104351884.dkr.ecr.<region>.amazonaws.com/huggingface-vllm:0.14.0-transformers4.57.3-gpu-py312-cu129-ubuntu22.04` |

### vLLM-Omni

| vLLM-Omni version | Python | CUDA | Transformers | Accelerator | Container URI |
| --- | --- | --- | --- | --- | --- |
| 0.20.0 | py312 | cu130 | 5.8.1 | GPU | `763104351884.dkr.ecr.<region>.amazonaws.com/huggingface-vllm-omni:0.20.0-transformers5.8.1-gpu-py312-cu130-amzn2023` |

### vLLM Inference NeuronX

| vLLM version | Python | Neuron SDK | Optimum | Accelerator | Container URI |
| --- | --- | --- | --- | --- | --- |
| 0.11 | py310 | 2.26.1 | 0.4.5 | NeuronX | `763104351884.dkr.ecr.<region>.amazonaws.com/huggingface-vllm-inference-neuronx:0.11.0-optimum0.4.5-neuronx-py310-sdk2.26.1-ubuntu22.04` |

### SGLang

| SGLang version | Python | CUDA | Transformers | Accelerator | Container URI |
| --- | --- | --- | --- | --- | --- |
| 0.5.8 | py312 | cu129 | 4.57.3 | GPU | `763104351884.dkr.ecr.<region>.amazonaws.com/huggingface-sglang:0.5.8-transformers4.57.3-gpu-py312-cu129-ubuntu24.04` |

### Text Embeddings Inference

Use Text Embeddings Inference (TEI) DLCs for embedding and reranking models on CPU or GPU.

| Framework | CUDA | Accelerator | Container URI |
| --- | --- | --- | --- |
| TEI 1.8.2 | cu122 | GPU | `683313688378.dkr.ecr.<region>.amazonaws.com/tei:2.0.1-tei1.8.2-gpu-py310-cu122-ubuntu22.04` |
| TEI 1.8.2 | - | CPU | `683313688378.dkr.ecr.<region>.amazonaws.com/tei-cpu:2.0.1-tei1.8.2-cpu-py310-ubuntu22.04` |

## FAQ

**How to choose the right inference container for my use case?**

![inference-dlc-decision-tree](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/sagemaker/inference-dlc-decision-tree.png)

*Note:* See [here](https://huggingface.co/docs/sagemaker/main/en/reference/inference-toolkit) for the list of supported tasks in the inference toolkit.

*Note:* Browse through the Hub to see if your model is tagged ["text-generation-inference"](https://huggingface.co/models?other=text-generation-inference) or ["text-embeddings-inference"](https://huggingface.co/models?other=text-embeddings-inference).

**How to find the URI of my container?**

The URI is built with an AWS account ID, an AWS Region, and the image tag. The account ID is shown in each table above. Replace `<region>` with the AWS Region where you want to use the container.

For example, the latest GPU PyTorch training DLC listed above becomes this in `us-east-1`:

```text
763104351884.dkr.ecr.us-east-1.amazonaws.com/huggingface-pytorch-training:2.9.0-transformers5.3.0-gpu-py312-cu130-ubuntu22.04
```

**How to find the URI of my container but simpler?**

The `image_uris.retrieve` helper from `sagemaker.core` can be simpler, but it may lag behind the latest DLC releases. Use it only when it returns the exact image family and tag you need; otherwise, pass the explicit URI from the tables above.

> [!NOTE]
> These docs and examples use the [SageMaker Python SDK v3](https://github.com/aws/sagemaker-python-sdk), which introduces a new framework-agnostic API built around `ModelBuilder` (inference) and `ModelTrainer` (training), replacing the v2 `HuggingFaceModel` and `HuggingFace` classes.
