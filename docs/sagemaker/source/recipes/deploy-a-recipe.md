# Deploy a recipe

This tutorial deploys a [recipe](./index) as an Amazon SageMaker AI real-time endpoint, sends it chat requests, and deletes it. The same steps work for every recipe: you only change the recipe ID.

A recipe record is a JSON file with the container image, instance type, environment variables, and endpoint settings that Hugging Face measured. The examples read these fields from the record instead of copying them by hand, so the endpoint matches the measured setup.

## Prerequisites

- An AWS account with a SageMaker execution role. Inside SageMaker Studio or a notebook instance, `get_execution_role()` finds it. Anywhere else, look up the role ARN as shown in [Set up the SDK](../tutorials/sagemaker-sdk/setup-sagemaker-sdk#execution-role).
- A SageMaker endpoint quota for the instance type of the recipe, for example `ml.g6e.12xlarge for endpoint usage`. Check it in the [Service Quotas console](https://console.aws.amazon.com/servicequotas/home/services/sagemaker/quotas).
- Python packages for the Python examples:

```bash
pip install "sagemaker>=3" boto3 openai
```

- For gated models, a Hugging Face [access token](https://huggingface.co/settings/tokens) exported as `HF_TOKEN` in your environment. The examples pass it to the container only when it is set.

Pick a recipe ID from the [recipes table](./index#available-recipes). The examples use `qwen-qwen3-6-27b--ml-g6e-12xlarge--9b35e88a65`, which serves [Qwen/Qwen3.6-27B](https://huggingface.co/Qwen/Qwen3.6-27B) on an `ml.g6e.12xlarge` instance, in the `us-east-1` region.

## Create the endpoint

The Hugging Face DLC images live in the AWS account `763104351884`, in an Amazon ECR registry in each region: `763104351884.dkr.ecr.<region>.amazonaws.com`. Use the registry in the region where you create the endpoint.

<hfoptions id="deploy">
<hfoption id="SageMaker Python SDK">

The SageMaker Python SDK v3 exposes each SageMaker API resource as a class in `sagemaker.core.resources`. Create the model, the endpoint configuration, and the endpoint, then wait for the endpoint to be `InService`:

```python
import json
import os
import urllib.request

import boto3
from sagemaker.core.helper.session_helper import Session, get_execution_role
from sagemaker.core.resources import Endpoint, EndpointConfig, Model
from sagemaker.core.shapes import ContainerDefinition, ProductionVariant

# AWS region where the endpoint runs
region = "us-east-1"
recipe_id = "qwen-qwen3-6-27b--ml-g6e-12xlarge--9b35e88a65"
# model, endpoint configuration, and endpoint share this name
name = recipe_id[:63]

# set up the SageMaker session and execution role
sess = Session(boto_session=boto3.Session(region_name=region))
role = get_execution_role()

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

Model.create(
    model_name=name,
    primary_container=ContainerDefinition(image=image_uri, environment=environment),
    # IAM role with permissions to create an endpoint
    execution_role_arn=role,
    session=sess.boto_session,
    region=region,
)

EndpointConfig.create(
    endpoint_config_name=name,
    production_variants=[
        ProductionVariant(
            variant_name="AllTraffic",
            model_name=name,
            instance_type=recipe["instance"]["type"],
            initial_instance_count=1,
            inference_ami_version=recipe["deployment"]["inference_ami_version"],
            container_startup_health_check_timeout_in_seconds=recipe["deployment"]["startup_health_check_timeout_s"],
        )
    ],
    session=sess.boto_session,
    region=region,
)

endpoint = Endpoint.create(
    endpoint_name=name,
    endpoint_config_name=name,
    session=sess.boto_session,
    region=region,
)

# large models can take more than 30 minutes to download and load
endpoint.wait_for_status("InService", poll=60)
print(f"{name} is InService")
```

</hfoption>
<hfoption id="boto3">

With boto3, call the SageMaker `create_model`, `create_endpoint_config`, and `create_endpoint` APIs with the same fields:

```python
import json
import os
import urllib.request

import boto3
from sagemaker.core.helper.session_helper import Session, get_execution_role

# AWS region where the endpoint runs
region = "us-east-1"
recipe_id = "qwen-qwen3-6-27b--ml-g6e-12xlarge--9b35e88a65"
# model, endpoint configuration, and endpoint share this name
name = recipe_id[:63]

# set up the SageMaker session and execution role
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
<hfoption id="AWS CLI">

Each recipe record also contains a SageMaker model package definition under `model_package`, in the input format of [`CreateModelPackage`](https://docs.aws.amazon.com/sagemaker/latest/APIReference/API_CreateModelPackage.html). Register it as a model package, then create the model from the package. This example needs the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) and [jq](https://jqlang.org/):

```bash
# AWS region where the endpoint runs
REGION=us-east-1
RECIPE_ID=qwen-qwen3-6-27b--ml-g6e-12xlarge--9b35e88a65
# model, endpoint configuration, and endpoint share this name
NAME=${RECIPE_ID:0:63}
# IAM role with permissions to create an endpoint
ROLE_ARN=$(aws iam get-role --role-name role-name-of-your-iam-role-with-right-permissions --query Role.Arn --output text)

# download the recipe record
curl -sSfL -o recipe.json "https://raw.githubusercontent.com/huggingface/hub-docs/main/docs/sagemaker/recipes/$RECIPE_ID.json"

# extract the model package and point its images at the ECR registry of your region
jq --arg region "$REGION" '.model_package | walk(if type == "object" and has("Image") then .Image |= sub("\\.dkr\\.ecr\\.[a-z0-9-]+\\."; ".dkr.ecr.\($region).") else . end)' recipe.json > model-package.json

PACKAGE_ARN=$(aws sagemaker create-model-package --region "$REGION" \
  --cli-input-json file://model-package.json \
  --query ModelPackageArn --output text)

# gated models need a Hugging Face token: read it from your environment
jq -n --arg arn "$PACKAGE_ARN" \
  '{ModelPackageName: $arn} + (if env.HF_TOKEN then {Environment: {HF_TOKEN: env.HF_TOKEN}} else {} end)' \
  > primary-container.json

aws sagemaker create-model --region "$REGION" \
  --model-name "$NAME" \
  --execution-role-arn "$ROLE_ARN" \
  --primary-container file://primary-container.json

jq --arg name "$NAME" '[{
  VariantName: "AllTraffic",
  ModelName: $name,
  InstanceType: .instance.type,
  InitialInstanceCount: 1,
  InferenceAmiVersion: .deployment.inference_ami_version,
  ContainerStartupHealthCheckTimeoutInSeconds: .deployment.startup_health_check_timeout_s
}]' recipe.json > production-variants.json

aws sagemaker create-endpoint-config --region "$REGION" \
  --endpoint-config-name "$NAME" \
  --production-variants file://production-variants.json

aws sagemaker create-endpoint --region "$REGION" \
  --endpoint-name "$NAME" \
  --endpoint-config-name "$NAME"

# the waiter gives up after 60 minutes; run it again if the endpoint is still Creating
aws sagemaker wait endpoint-in-service --region "$REGION" --endpoint-name "$NAME"
```

</hfoption>
</hfoptions>

If the endpoint ends in the `Failed` state, `describe-endpoint` shows the reason, and the container logs are in the Amazon CloudWatch log group `/aws/sagemaker/Endpoints/<endpoint-name>`.

## Invoke the endpoint

The vLLM DLC serves the OpenAI chat completions API. Send the OpenAI request body to the endpoint with `invoke_endpoint`:

```python
import json

import boto3

# AWS region where the endpoint runs
region = "us-east-1"
recipe_id = "qwen-qwen3-6-27b--ml-g6e-12xlarge--9b35e88a65"
endpoint_name = recipe_id[:63]
model_id = "Qwen/Qwen3.6-27B"

runtime = boto3.client("sagemaker-runtime", region_name=region)

response = runtime.invoke_endpoint(
    EndpointName=endpoint_name,
    ContentType="application/json",
    Body=json.dumps({
        "model": model_id,
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

# AWS region where the endpoint runs
region = "us-east-1"
recipe_id = "qwen-qwen3-6-27b--ml-g6e-12xlarge--9b35e88a65"
endpoint_name = recipe_id[:63]
model_id = "Qwen/Qwen3.6-27B"

client = OpenAI(
    base_url=f"https://runtime.sagemaker.{region}.amazonaws.com/endpoints/{endpoint_name}/openai/v1",
    # the token is valid for up to 12 hours
    api_key=generate_token(region=region),
)

stream = client.chat.completions.create(
    model=model_id,
    messages=[{"role": "user", "content": "What is the capital of France?"}],
    max_tokens=512,
    stream=True,
)
for chunk in stream:
    if chunk.choices and chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="")
```

## Clean up

An endpoint is billed for every hour it runs, even without traffic. Delete the endpoint, the endpoint configuration, and the model when you are done:

<hfoptions id="deploy">
<hfoption id="SageMaker Python SDK">

```python
from sagemaker.core.resources import Endpoint, EndpointConfig, Model

# AWS region where the endpoint runs
region = "us-east-1"
recipe_id = "qwen-qwen3-6-27b--ml-g6e-12xlarge--9b35e88a65"
name = recipe_id[:63]

Endpoint.get(endpoint_name=name, region=region).delete()
EndpointConfig.get(endpoint_config_name=name, region=region).delete()
Model.get(model_name=name, region=region).delete()
```

</hfoption>
<hfoption id="boto3">

```python
import boto3

# AWS region where the endpoint runs
region = "us-east-1"
recipe_id = "qwen-qwen3-6-27b--ml-g6e-12xlarge--9b35e88a65"
name = recipe_id[:63]

sm = boto3.client("sagemaker", region_name=region)
sm.delete_endpoint(EndpointName=name)
sm.delete_endpoint_config(EndpointConfigName=name)
sm.delete_model(ModelName=name)
```

</hfoption>
<hfoption id="AWS CLI">

```bash
# AWS region where the endpoint runs
REGION=us-east-1
RECIPE_ID=qwen-qwen3-6-27b--ml-g6e-12xlarge--9b35e88a65
NAME=${RECIPE_ID:0:63}
PACKAGE_NAME=$(curl -sSfL "https://raw.githubusercontent.com/huggingface/hub-docs/main/docs/sagemaker/recipes/$RECIPE_ID.json" | jq -r .model_package.ModelPackageName)

aws sagemaker delete-endpoint --region "$REGION" --endpoint-name "$NAME"
aws sagemaker delete-endpoint-config --region "$REGION" --endpoint-config-name "$NAME"
aws sagemaker delete-model --region "$REGION" --model-name "$NAME"
aws sagemaker delete-model-package --region "$REGION" --model-package-name "$PACKAGE_NAME"
```

</hfoption>
</hfoptions>
