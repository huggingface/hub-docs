# Quickstart — Using Hugging Face Models with Amazon Bedrock Marketplace

## Why use Bedrock Marketplace for Hugging Face models?
Amazon Bedrock now exposes 83 Hugging Face open-weight models—including Gemma, Llama 3, Mistral, and more—through a single catalog. You invoke them with the same Bedrock APIs you already use for Titan, Anthropic, Cohere, etc. Under the hood, Bedrock Marketplace model endpoints are managed by Amazon SageMaker AI. With Bedrock Marketplace, you can now combine the ease of use of SageMaker JumpStart with the fully managed infrastructure of Amazon Bedrock, including compatibility with high-level APIs such as Agents, Knowledge Bases, Guardrails and Model Evaluations.

## 1 . Prerequisites

|  | Requirement | Notes |
|---|-------------|
| AWS account in a Bedrock Region | Marketplace is regional; switch the console to one of the 14 supported Regions first. |
| Permissions | For a quick trial, attach AmazonBedrockFullAccess and AmazonSageMakerFullAccess.|
| Service quotas | The SageMaker endpoint uses GPU instances (for example ml.g5). Verify you have quota or request it. |
| JumpStart-only | If you choose path B, create a SageMaker Studio domain and user profile first (Console ▸ SageMaker ▸ Domains). Open Studio before continuing. |

When registering your Sagemaker Jumpstart endpoints in Amazon Bedrock, you only pay for the SageMaker compute resources and regular Amazon Bedrock APIs prices are applicable.

## 2. Endpoint deployment

There are two equivalent paths to use a Hugging Face model with Amazon Bedrock Marketplace.

Path A is from the Bedrock *Model Catalog*:
1. Console → Amazon Bedrock → Foundation Models → Model catalog  
2. Filter Provider → “Hugging Face”, then pick your model (e.g., Gemma 2 27B Instruct)  
3. If you see Subscribe, review pricing & terms, click Subscribe, then continue  
4. Click Deploy → name the endpoint → keep the recommended instance → accept the EULA → Deploy  
5. Wait for Foundation Models → Marketplace deployments to show status In service (takes a few minutes)  
6. Click the deployment name and copy the SageMaker endpoint ARN — you’ll need it for API calls  

Path B is from SageMaker JumpStart for the model that shows “Use with Bedrock”:
1. In SageMaker Studio, open JumpStart  
2. Filter Bedrock Ready models → select the model card (e.g., Gemma 2 9B Instruct)  
3. Click Deploy, accept the EULA, keep defaults, Deploy  
4. Studio → Deployments → Endpoints → wait for status In service  
5. Click the endpoint, choose Use with Bedrock
6. In the Bedrock console, review and Register → a new entry appears under Marketplace deployments  
7. Open that entry and copy the SageMaker endpoint ARN for code samples  

## 3 . Test interactively 

To test the model interactively in the console, select the model under Marketplace deployments, open it in the playground, and send a prompt in Chat/Text mode to verify the model's response.

Alternatively, you can programmatically access your endpoint.

```python
import boto3

bedrock = boto3.client("bedrock-runtime")

# Paste the endpoint ARN you copied above
endpoint_arn = "arn:aws:sagemaker:<region>:<account‑id>:endpoint/<name>"

inference_cfg = {"maxTokens": 256, "temperature": 0.1, "topP": 0.95}
extra = {"parameters": {"repetition_penalty": 1.05}}

response = bedrock.converse(
    modelId=endpoint_arn,                  # <- SageMaker endpoint ARN
    messages=[{
        "role": "user",
        "content": [{"text": "Give me three taglines for a serverless AI startup"}]
    }],
    inferenceConfig=inference_cfg,
    additionalModelRequestFields=extra,
)

print(response["output"]["message"]["content"][0]["text"])
```

*Heads‑up*: the same `modelId=endpoint_arn` works with **InvokeModel**, **Knowledge Bases (RetrieveAndGenerate)**, **Agents**, and **Guardrails**—no code changes.

## 4 . Clean‑up (stop charges)

| Resource | How to delete |
|----------|---------------|
| SageMaker endpoint | Console → Marketplace deployments → select → Delete (also de‑registers it) • *or* `boto3.client("sagemaker").delete_endpoint(...)` |
| Optional extras | Delete Knowledge Base, Guardrail, or S3 vectors if you created them. |

For more information, refer to the [Bedrock documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html).
