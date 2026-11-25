# Deploy a recipe

This tutorial deploys a recipe from the [catalog](./index) as an Amazon SageMaker AI real-time endpoint, sends it chat requests, and deletes it. Every model page has the same three ways to deploy, with the values of each recipe filled in:

- **AWS console**: one link opens AWS CloudFormation with the recipe template and settings filled in, and you only choose **Create stack**.
- **AWS CLI**: one command creates the same CloudFormation stack.
- **Python**: boto3 calls the SageMaker APIs directly, without CloudFormation.

The examples use the recipe `qwen-qwen3-8b--ml-g6e-xlarge--1f5f3ff9b9`, which serves [Qwen/Qwen3-8B](https://huggingface.co/Qwen/Qwen3-8B) on an `ml.g6e.xlarge` instance, in the `us-east-1` region. To deploy another recipe, start from its [model page](./index) instead.

## Prerequisites

- An AWS account with a SageMaker endpoint quota for the instance type of the recipe, for example `ml.g6e.xlarge for endpoint usage`. Check it in the [Service Quotas console](https://console.aws.amazon.com/servicequotas/home/services/sagemaker/quotas).
- For the AWS console and the AWS CLI, permissions to create CloudFormation stacks and SageMaker endpoints. By default the stack also creates an IAM role for the endpoint, which needs permissions to create IAM roles; to skip it, pass the ARN of an existing SageMaker execution role as `ExecutionRoleArn`.
- For Python, a SageMaker execution role. Inside SageMaker Studio or a notebook instance, `get_execution_role()` finds it. Anywhere else, look up the role ARN as shown in [Set up the SDK](../tutorials/sagemaker-sdk/setup-sagemaker-sdk#execution-role).
- For gated models, such as the Llama models, a Hugging Face [access token](https://huggingface.co/settings/tokens) from an account that accepted the model license.

## Create the endpoint

<hfoptions id="deploy">
<hfoption id="AWS console">

1. Open [Deploy Qwen/Qwen3-8B in the AWS console](https://us-east-1.console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/quickcreate?templateURL=https%3A%2F%2Fhf-sagemaker-recipes.s3.us-east-1.amazonaws.com%2Ftemplates%2Fqwen-qwen3-8b--ml-g6e-xlarge--1f5f3ff9b9.json&stackName=qwen3-8b-g6e-xlarge&param_EndpointName=qwen3-8b-g6e-xlarge). On a model page, pick the region before you open the link. Sign in to your AWS account if asked.
2. The CloudFormation **Quick create stack** page shows the template and three parameters:
   - **EndpointName**: the name of the SageMaker endpoint, `qwen3-8b-g6e-xlarge` by default.
   - **ExecutionRoleArn**: leave it empty to create a role that can only pull the container image and write logs, or set the ARN of an existing SageMaker execution role.
   - **HuggingFaceToken**: your Hugging Face access token for gated models. Leave it empty for other models.
3. Select **I acknowledge that AWS CloudFormation might create IAM resources** and choose **Create stack**.

The stack reaches `CREATE_COMPLETE` when the endpoint is `InService`, usually after 10 to 30 minutes. The **Outputs** tab of the stack shows the endpoint name and its OpenAI-compatible URL.

</hfoption>
<hfoption id="AWS CLI">

The commands need the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html). For gated models, add `ParameterKey=HuggingFaceToken,ParameterValue="$HF_TOKEN"` to `--parameters`.

```bash
# AWS region where the endpoint runs
REGION=us-east-1
NAME=qwen3-8b-g6e-xlarge

aws cloudformation create-stack --region "$REGION" --stack-name "$NAME" \
  --template-url https://hf-sagemaker-recipes.s3.us-east-1.amazonaws.com/templates/qwen-qwen3-8b--ml-g6e-xlarge--1f5f3ff9b9.json \
  --capabilities CAPABILITY_IAM \
  --parameters ParameterKey=EndpointName,ParameterValue="$NAME"

# returns when the endpoint is InService; run it again if it times out after one hour
aws cloudformation wait stack-create-complete --region "$REGION" --stack-name "$NAME"
```

</hfoption>
<hfoption id="Python">

Each recipe is a JSON record with the container image, instance type, environment variables, and endpoint settings that Hugging Face measured. This example reads these fields from the record, so it works for any recipe ID:

```python
import json
import os
import urllib.request

import boto3
from sagemaker.core.helper.session_helper import Session, get_execution_role

# AWS region where the endpoint runs
region = "us-east-1"
recipe_id = "qwen-qwen3-8b--ml-g6e-xlarge--1f5f3ff9b9"
# model, endpoint configuration, and endpoint share this name
name = "qwen3-8b-g6e-xlarge"

sess = Session(boto_session=boto3.Session(region_name=region))
role = get_execution_role()
sm = sess.boto_session.client("sagemaker")

# download the recipe record
url = f"https://raw.githubusercontent.com/huggingface/hub-docs/main/docs/sagemaker/recipes/{recipe_id}.json"
with urllib.request.urlopen(url) as response:
    recipe = json.load(response)

# pin the image by digest when the recipe has one, otherwise by tag
image = recipe["image"]
reference = f"@{image['digest']}" if image["digest"] else f":{image['tag']}"
image_uri = f"{image['registry_account']}.dkr.ecr.{region}.amazonaws.com/{image['repository']}{reference}"

environment = dict(recipe["deployment"]["environment"])
# gated models need a Hugging Face token: read it from your environment
if "HF_TOKEN" in os.environ:
    environment["HF_TOKEN"] = os.environ["HF_TOKEN"]

sm.create_model(
    ModelName=name,
    # IAM role with permissions to create an endpoint
    ExecutionRoleArn=role,
    PrimaryContainer={"Image": image_uri, "Environment": environment},
)

sm.create_endpoint_config(
    EndpointConfigName=name,
    ProductionVariants=[
        {
            "VariantName": "AllTraffic",
            "ModelName": name,
            "InstanceType": recipe["instance"]["type"],
            "InitialInstanceCount": 1,
            "InferenceAmiVersion": recipe["deployment"]["inference_ami_version"],
            "ContainerStartupHealthCheckTimeoutInSeconds": recipe["deployment"]["startup_health_check_timeout_s"],
        }
    ],
)

sm.create_endpoint(EndpointName=name, EndpointConfigName=name)

# wait up to 90 minutes: large models can take more than 30 minutes to download and load
sm.get_waiter("endpoint_in_service").wait(
    EndpointName=name, WaiterConfig={"Delay": 60, "MaxAttempts": 90}
)
print(f"{name} is InService")
```

</hfoption>
</hfoptions>

The Hugging Face DLC images live in the AWS account `763104351884`, in an Amazon ECR registry in each region, and every recipe pins the image by digest, so the endpoint runs the exact container that was measured.

If the endpoint ends in the `Failed` state, `describe-endpoint` shows the reason, and the container logs are in the Amazon CloudWatch log group `/aws/sagemaker/Endpoints/<endpoint-name>`. With CloudFormation, the **Events** tab of the stack shows the same reason.

## Invoke the endpoint

The vLLM DLC serves the OpenAI chat completions API. Send the OpenAI request body to the endpoint with `invoke_endpoint`:

```python
import json

import boto3

# AWS region and name of the endpoint
region = "us-east-1"
endpoint_name = "qwen3-8b-g6e-xlarge"

runtime = boto3.client("sagemaker-runtime", region_name=region)

response = runtime.invoke_endpoint(
    EndpointName=endpoint_name,
    ContentType="application/json",
    Body=json.dumps({
        "model": "Qwen/Qwen3-8B",
        "messages": [{"role": "user", "content": "What is the capital of France?"}],
        "max_tokens": 512,
    }),
)

print(json.loads(response["Body"].read())["choices"][0]["message"]["content"])
```

SageMaker also exposes an OpenAI-compatible route for each endpoint at `https://runtime.sagemaker.<region>.amazonaws.com/endpoints/<endpoint-name>/openai/v1`. It authenticates with a short-lived bearer token signed with your AWS credentials, which `generate_token` from the SageMaker Python SDK creates. With it, any OpenAI client works, including streaming:

```python
from openai import OpenAI
from sagemaker.core.token_generator import generate_token

# AWS region and name of the endpoint
region = "us-east-1"
endpoint_name = "qwen3-8b-g6e-xlarge"

client = OpenAI(
    base_url=f"https://runtime.sagemaker.{region}.amazonaws.com/endpoints/{endpoint_name}/openai/v1",
    # the token is valid for up to 12 hours
    api_key=generate_token(region=region),
)

stream = client.chat.completions.create(
    model="Qwen/Qwen3-8B",
    messages=[{"role": "user", "content": "What is the capital of France?"}],
    max_tokens=512,
    stream=True,
)
for chunk in stream:
    if chunk.choices and chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="")
```

## Clean up

An endpoint is billed for every hour it runs, even without traffic. Delete it when you are done:

<hfoptions id="deploy">
<hfoption id="AWS console">

In the [CloudFormation console](https://console.aws.amazon.com/cloudformation/home), select the stack and choose **Delete**. Deleting the stack deletes the endpoint, the endpoint configuration, the model, and the role it created.

</hfoption>
<hfoption id="AWS CLI">

```bash
aws cloudformation delete-stack --region us-east-1 --stack-name qwen3-8b-g6e-xlarge
```

</hfoption>
<hfoption id="Python">

```python
import boto3

# AWS region and name of the endpoint
region = "us-east-1"
name = "qwen3-8b-g6e-xlarge"

sm = boto3.client("sagemaker", region_name=region)
sm.delete_endpoint(EndpointName=name)
sm.delete_endpoint_config(EndpointConfigName=name)
sm.delete_model(ModelName=name)
```

</hfoption>
</hfoptions>
