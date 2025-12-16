# Available DLCs on AWS

Below you can find a listing of all the Deep Learning Containers (DLCs) available on AWS.

For each supported combination of use-case (training, inference), accelerator type (CPU, GPU, Neuron), and framework (PyTorch, TGI, TEI) containers are created.

Neuron DLCs for training and inference on AWS Trainium and AWS Inferentia instances can be found in the [Optimum Neuron documentation](https://huggingface.co/docs/optimum-neuron/en/containers).

## Training

Pytorch Training DLC: For training, our DLCs are available for PyTorch via Transformers. They include support for training on GPUs and AWS AI chips with libraries such as TRL, Sentence Transformers, or Diffusers.

You can also keep track of the latest Pytorch Training DLC releases [here](https://github.com/aws/deep-learning-containers/releases?q=huggingface-training+AND+NOT+neuronx&expanded=true).

| Container URI                                                                                                                    | Accelerator |
| -------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| 763104351884.dkr.ecr.us-east-1.amazonaws.com/huggingface-pytorch-training:2.8.0-transformers4.56.2-gpu-py312-cu129-ubuntu22.04 | GPU         |
| 763104351884.dkr.ecr.us-west-2.amazonaws.com/huggingface-pytorch-training-neuronx:2.7.0-transformers4.51.0-neuronx-py310-sdk2.24.1-ubuntu22.04 | Neuron         |

## Inference

### Pytorch Inference DLC

For inference, we have a general-purpose PyTorch inference DLC, for serving models trained with any of those frameworks mentioned before on CPU, GPU, and AWS AI chips.

You can also keep track of the latest Pytorch Inference DLC releases [here](https://github.com/aws/deep-learning-containers/releases?q=huggingface-inference+AND+NOT+tgi+AND+NOT+neuronx&expanded=true).

| Container URI                                                                                                                    | Accelerator |
| -------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| 763104351884.dkr.ecr.us-east-1.amazonaws.com/huggingface-pytorch-inference:2.6.0-transformers4.51.3-cpu-py312-ubuntu22.04- | CPU         |
| 763104351884.dkr.ecr.us-east-1.amazonaws.com/huggingface-pytorch-inference:2.6.0-transformers4.51.3-gpu-py312-cu124-ubuntu22.04 | GPU         |
| 763104351884.dkr.ecr.us-west-2.amazonaws.com/huggingface-pytorch-inference-neuronx:2.7.1-transformers4.51.3-neuronx-py310-sdk2.24.1-ubuntu22.04 | Neuron         |

### LLM TGI

There is also the LLM Text Generation Inference (TGI) DLC for high-performance text generation of LLMs on GPU and AWS AI chips.

You can also keep track of the latest LLM TGI DLC releases [here](https://github.com/aws/deep-learning-containers/releases?q=tgi+AND+gpu&expanded=true).

| Container URI                                                                                                                    | Accelerator |
| -------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| 763104351884.dkr.ecr.us-east-1.amazonaws.com/huggingface-pytorch-tgi-inference:2.7.0-tgi3.3.6-gpu-py311-cu124-ubuntu22.04 | GPU         |
| 763104351884.dkr.ecr.us-west-2.amazonaws.com/huggingface-pytorch-tgi-inference:2.7.0-optimum3.3.6-neuronx-py310-ubuntu22.04 | Neuron         |

### Text Embedding Inference

Finally, there is a Text Embeddings Inference (TEI) DLC for high-performance serving of embedding models on CPU and GPU.

| Container URI                                                                                                                    | Accelerator |
| -------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| 683313688378.dkr.ecr.us-east-1.amazonaws.com/2.0.1-tei1.8.2-cpu-py310-ubuntu22.04 | CPU         |
| 683313688378.dkr.ecr.us-east-1.amazonaws.com/2.0.1-tei1.8.2-gpu-py310-cu122-ubuntu22.04 | GPU         |

## FAQ

**How to choose the right inference container for my use case?**

![inference-dlc-decision-tree](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/sagemaker/inference-dlc-decision-tree.png)

*Note:* See [here](https://huggingface.co/docs/sagemaker/main/en/reference/inference-toolkit) for the list of supported task in the inference toolkit.

*Note:* Browse through the Hub to see if you model is tagged ["text-generation-inference"](https://huggingface.co/models?other=text-generation-inference) or ["text-embeddings-inference"](https://huggingface.co/models?other=text-embeddings-inference)

**How to find the URI of my container?**

The URI is built with an AWS account ID and an AWS region. Those two values need to be replaced depending on your use case.
Let's say you want to use the training DLC for GPUs in  
- `dlc-aws-account-id`: The AWS account ID of the account that owns the ECR repository. You can find them in the [here](https://github.com/aws/sagemaker-python-sdk/blob/e0b9d38e1e3b48647a02af23c4be54980e53dc61/src/sagemaker/image_uri_config/huggingface.json#L21)
- `region`: The AWS region where you want to use it.

**How to find the URI of my container but simpler?**

The Python SagemMaker SDK util functions are not always up to date but it is much simpler than reconstructing the image URI yourself. 

> [!WARNING]
> [SageMaker Python SDK v3 has been recently released](https://github.com/aws/sagemaker-python-sdk), so unless specified otherwise, all the documentation and tutorials are still using the [SageMaker Python SDK v2](https://github.com/aws/sagemaker-python-sdk/tree/master-v2). We are actively working on updating all the tutorials and examples, but in the meantime make sure to install the SageMaker SDK as `pip install "sagemaker<3.0.0"`.

```python
from sagemaker.huggingface import HuggingFaceModel, get_huggingface_llm_image_uri

print(f"TGI GPU: {get_huggingface_llm_image_uri('huggingface')}")
print(f"TEI GPU: {get_huggingface_llm_image_uri('huggingface-tei')}")
print(f"TEI CPU: {get_huggingface_llm_image_uri('huggingface-tei-cpu')}")
print(f"TGI Neuron: {get_huggingface_llm_image_uri('huggingface-neuronx')}")
```

For Pytorch Training and Pytorch Inference DLCs, there is no such utility. 