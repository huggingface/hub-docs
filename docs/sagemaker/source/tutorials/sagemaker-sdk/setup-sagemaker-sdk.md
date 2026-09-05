# Set up the SageMaker SDK

Welcome to the SageMaker SDK tutorials. Spend a few minutes on this page once, and every tutorial after it will work out of the box.

## AWS account and SDK

You need an AWS account. If you do not have one yet, the [AWS setup guide](https://docs.aws.amazon.com/sagemaker/latest/dg/gs-set-up.html) walks you through it.

Then install the SageMaker Python SDK v3:

```bash
pip install "sagemaker>=3.0.0"
```

> [!NOTE]
> These docs and examples use the [SageMaker Python SDK v3](https://github.com/aws/sagemaker-python-sdk), which introduces a new framework-agnostic API built around `ModelBuilder` (inference) and `ModelTrainer` (training), replacing the v2 `HuggingFaceModel` and `HuggingFace` classes.

## Where to run

The tutorials work the same wherever you prefer to run them:

- [SageMaker Studio](https://docs.aws.amazon.com/sagemaker/latest/dg/gs-studio-onboard.html)
- A [SageMaker notebook instance](https://docs.aws.amazon.com/sagemaker/latest/dg/gs-console.html)
- Your local environment, as long as your AWS credentials are configured

## Execution role

SageMaker runs training jobs and endpoints under an [IAM execution role](https://docs.aws.amazon.com/sagemaker/latest/dg/sagemaker-roles.html) with access to S3. How you provide the role depends on where you run.

**SageMaker Studio or a notebook instance** — nothing to set up, `get_execution_role()` finds the role for you:

```python
from sagemaker.core.helper.session_helper import Session, get_execution_role

sess = Session()
role = get_execution_role()
```

Keep in mind that this only works inside SageMaker: `get_execution_role()` fails with a region error anywhere else.

**Your local environment** — look up the role ARN once and pass it yourself:

```python
import boto3
from sagemaker.core.helper.session_helper import Session

iam_client = boto3.client("iam")
role = iam_client.get_role(RoleName="role-name-of-your-iam-role-with-right-permissions")["Role"]["Arn"]
sess = Session()
```

## What's next

You are all set. Continue with [Train models](./training-sagemaker-sdk) or [Deploy models](./deploy-sagemaker-sdk) — or head back to the [Quickstart](./sagemaker-sdk-quickstart) if you have not run it yet.
