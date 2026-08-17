# Amazon SageMaker SDK Quickstart

Deploy a model from the Hugging Face Hub to a live SageMaker endpoint in a few minutes with the SageMaker Python SDK. No training, no data preparation.

## Prerequisites

- An AWS account. If you do not have one, follow the [AWS setup guide](https://docs.aws.amazon.com/sagemaker/latest/dg/gs-set-up.html).
- The SageMaker Python SDK v3, which provides `ModelBuilder` for inference and `ModelTrainer` for training:

```bash
pip install "sagemaker>=3.0.0"
```

- An IAM execution role. In SageMaker Studio or on a SageMaker notebook instance, `get_execution_role()` returns it automatically. In a local environment you must pass the role ARN yourself — both setups are shown in [Set up the SageMaker SDK](./setup-sagemaker-sdk).

## Deploy a model from the Hub

Create a session, then point `ModelBuilder` at a model ID from the Hub:

```python
from sagemaker.core.helper.session_helper import Session, get_execution_role
from sagemaker.serve import ModelBuilder, ModelServer
from sagemaker.serve.builder.schema_builder import SchemaBuilder
from sagemaker.core import image_uris

sess = Session()
role = get_execution_role()

model_id = "cardiffnlp/twitter-roberta-base-sentiment-latest"  # any Hub model works
instance_type = "ml.m5.xlarge"

# Retrieve the Hugging Face PyTorch inference DLC image URI
inference_image = image_uris.retrieve(
    framework="huggingface",
    region=sess.boto_region_name,
    version="4.51.3",                      # Transformers version
    base_framework_version="pytorch2.6.0", # PyTorch version
    py_version="py312",                    # Python version
    image_scope="inference",
    instance_type=instance_type,
)

# Sample request/response used by ModelBuilder to set up serialization
sample_input = {"inputs": "I love how simple this was!"}
sample_output = [{"label": "positive", "score": 0.99}]

model_builder = ModelBuilder(
    model=model_id,                        # Hub model ID, loaded at deploy time
    model_server=ModelServer.MMS,
    image_uri=inference_image,
    env_vars={"HF_TASK": "text-classification"},  # tells the Inference Toolkit which pipeline to serve
    role_arn=role,
    sagemaker_session=sess,
    instance_type=instance_type,
    schema_builder=SchemaBuilder(sample_input=sample_input, sample_output=sample_output),
)
model_builder.build()

predictor = model_builder.deploy(initial_instance_count=1, instance_type=instance_type)
```

## Invoke the endpoint

The request and response bodies are JSON, and every request needs an `inputs` key:

```python
import json

res = predictor.invoke(
    body=json.dumps({"inputs": "I love how simple this was!"}),
    content_type="application/json",
)
print(json.loads(res.body.read()))
```

## Clean up

Delete the endpoint when you are done:

```python
predictor.delete()
```

## What's next

- [Deploy models](./deploy-sagemaker-sdk) covers deploying models you trained in SageMaker or stored in S3, batch transform jobs, and custom inference code.
- [Train models](./training-sagemaker-sdk) covers `ModelTrainer`: training scripts, distributed training, spot instances, and metrics.
- For a full LLM recipe, see the example [Fine-Tuning LLMs with TRL CLI on SageMaker](../../examples/sagemaker-sdk-fine-tune-trl-cli).
