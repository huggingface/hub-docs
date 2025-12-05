# Quickstart - Deploy Hugging Face Models with SageMaker Jumpstart

## Why use SageMaker JumpStart for Hugging Face models?

Amazon SageMaker JumpStart lets you deploy the most-popular open Hugging Face models with one click—inside your own AWS account. JumpStart offers a curated [selection](https://aws.amazon.com/sagemaker-ai/jumpstart/getting-started/?sagemaker-jumpstart-cards.sort-by=item.additionalFields.model-name&sagemaker-jumpstart-cards.sort-order=asc&awsf.sagemaker-jumpstart-filter-product-type=*all&awsf.sagemaker-jumpstart-filter-text=*all&awsf.sagemaker-jumpstart-filter-vision=*all&awsf.sagemaker-jumpstart-filter-tabular=*all&awsf.sagemaker-jumpstart-filter-audio-tasks=*all&awsf.sagemaker-jumpstart-filter-multimodal=*all&awsf.sagemaker-jumpstart-filter-RL=*all&awsm.page-sagemaker-jumpstart-cards=1&sagemaker-jumpstart-cards.q=qwen&sagemaker-jumpstart-cards.q_operator=AND) of model checkpoints for various tasks, including text generation, embeddings, vision, audio, and more. Most models are deployed using the official [Hugging Face Deep Learning Containers](https://huggingface.co/docs/sagemaker/main/en/dlcs/introduction) with a sensible default instance type, so you can move from idea to production in minutes.

In this quickstart guide, we will deploy [Qwen/Qwen2.5-14B-Instruct](https://huggingface.co/Qwen/Qwen2.5-14B-Instruct).

## 1. Prerequisites

|   | Requirement |
|---|-------------|
| AWS account with SageMaker enabled | An AWS account that will contain all your AWS resources. |
| An IAM role to access SageMaker AI | Learn more about how IAM works with SageMaker AI in this [guide](https://docs.aws.amazon.com/sagemaker/latest/dg/security-iam.html). |
| SageMaker Studio domain and user profile | We recommend using SageMaker Studio for straightforward deployment and inference. Follow this [guide](https://docs.aws.amazon.com/sagemaker/latest/dg/onboard-quick-start.html). |
| Service quotas | Most LLMs need GPU instances (e.g. ml.g5). Verify you have quota for `ml.g5.24xlarge` or [request it](https://docs.aws.amazon.com/sagemaker/latest/dg/canvas-requesting-quota-increases.html). | 

> [!WARNING]
> [SageMaker Python SDK v3 has been recently released](https://github.com/aws/sagemaker-python-sdk), so unless specified otherwise, all the documentation and tutorials are still using the [SageMaker Python SDK v2](https://github.com/aws/sagemaker-python-sdk/tree/master-v2). We are actively working on updating all the tutorials and examples, but in the meantime make sure to install the SageMaker SDK as `pip install "sagemaker<3.0.0"`.

## 2· Endpoint deployment

Let's explain how you would deploy a Hugging Face model to SageMaker browsing through the Jumpstart catalog:
1. Open SageMaker → JumpStart.  
2. Filter “Hugging Face” or search for your model (e.g. Qwen2.5-14B).  
3. Click Deploy → (optional) adjust instance size / count → Deploy.  
4. Wait until Endpoints shows In service.  
5. Copy the Endpoint name (or ARN) for later use.

<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/sagemaker/jumpstart-deployment.gif"
     alt="JumpStart deployment demo"
     width="500">

Alternatively, you can also browse through the Hugging Face Model Hub:
1. Open the model page → Click Deploy → SageMaker → Jumpstart tab if model is available.
2. Copy the code snippet and use it from a SageMaker Notebook instance.


<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/sagemaker/hf-jumpstart-deployment.gif"
     alt="JumpStart deployment demo"
     width="500">

```python
# SageMaker JumpStart provides APIs as part of SageMaker SDK that allow you to deploy and fine-tune models in network isolation using scripts that SageMaker maintains.

from sagemaker.jumpstart.model import JumpStartModel


model = JumpStartModel(model_id="huggingface-llm-qwen2-5-14b-instruct")
example_payloads = model.retrieve_all_examples()

predictor = model.deploy()

for payload in example_payloads:
    response = predictor.predict(payload.body)
    print("Input:\n", payload.body[payload.prompt_key])
    print("Output:\n", response[0]["generated_text"], "\n\n===============\n")
```

The endpoint creation can take several minutes, depending on the size of the model.

## 3. Test interactively

If you deployed through the console, you need to grab the endpoint ARN and reuse in your code.
```python
from sagemaker.predictor import retrieve_default
endpoint_name = "MY ENDPOINT NAME"
predictor = retrieve_default(endpoint_name)
payload = {
    "messages": [
        {
            "role": "system",
            "content": "You are a passionate data scientist."
        },
        {
            "role": "user",
            "content": "what is machine learning?"
        }
    ],
    "max_tokens": 2048,
    "temperature": 0.7,
    "top_p": 0.9,
    "stream": False
}

response = predictor.predict(payload)
print(response)
```

The endpoint support the Open AI API specification. 

## 4. Clean‑up

To avoid incurring unnecessary costs, when you’re done, delete the SageMaker endpoints in the Deployments → Endpoints console or using the following code snippets:
```python
predictor.delete_model()
predictor.delete_endpoint()
```