# Text Generation Inference (TGI) Images

[TGI](https://huggingface.co/docs/text-generation-inference/en/index) is a toolkit for deploying and serving Large Language Models (LLMs). TGI enables high-performance text generation for the most popular open-source LLMs, including Llama, Falcon, StarCoder, BLOOM, GPT-NeoX, and T5.

Below, you can find a list of the latest available images for TGI for use on AWS SageMaker.

To find the latest supported versions of the HF DLCs, check out https://aws.amazon.com/releasenotes/dlc-support-policy/

<!-- START AUTOGEN TABLE -->
## huggingface-pytorch-tgi-inference

| Framework Version | Image Type | Image URI | Size (GB) | Pushed At | Details |
| --- | --- | --- | --- | --- | --- |
| 2.6 | gpu | `763104351884.dkr.ecr.us-west-2.amazonaws.com/huggingface-pytorch-tgi-inference:2.6.0-tgi3.1.1-gpu-py311-cu124-ubuntu22.04-v2.0` | 8.1 | 2025-03-17 16:47:39 | [Details](https://github.com/aws/deep-learning-containers/blob/master/available_images.md#huggingface-text-generation-inference-tgi-containers) |
| 2.4 | gpu | `763104351884.dkr.ecr.us-west-2.amazonaws.com/huggingface-pytorch-tgi-inference:2.4.0-tgi3.0.1-gpu-py311-cu124-ubuntu22.04-v2.2` | 6.5 | 2025-03-06 18:28:24 | [Details](https://github.com/aws/deep-learning-containers/blob/master/available_images.md#huggingface-text-generation-inference-tgi-containers) |
| 2.3 | gpu | `763104351884.dkr.ecr.us-west-2.amazonaws.com/huggingface-pytorch-tgi-inference:2.3.0-tgi2.2.0-gpu-py310-cu121-ubuntu22.04-v2.1` | 4.92 | 2024-10-04 21:59:12 | [Details](https://github.com/aws/deep-learning-containers/blob/master/available_images.md#huggingface-text-generation-inference-tgi-containers) |


### SM Example
```
# create Hugging Face Model Class
huggingface_model = HuggingFaceModel(
	image_uri=get_huggingface_llm_image_uri("huggingface",version="2.6"),
	env=<insert_hub_obj>,
	role=<insert_role>, 
)

# deploy model to SageMaker Inference
predictor = huggingface_model.deploy(
	initial_instance_count=1,
	instance_type="ml.g6.48xlarge",
	container_startup_health_check_timeout=2400,
)
```
                          
<!-- END AUTOGEN TABLE -->
