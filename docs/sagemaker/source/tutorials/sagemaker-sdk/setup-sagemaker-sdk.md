# Set up the SageMaker SDK

Everything in the SageMaker SDK tutorials assumes the setup below. Do it once, then pick any tutorial.

## AWS account and SDK

You need an AWS account. If you do not have one, follow the [AWS setup guide](https://docs.aws.amazon.com/sagemaker/latest/dg/gs-set-up.html).

Install the SageMaker Python SDK v3:

```bash
pip install "sagemaker>=3.0.0"
```

> [!NOTE]
> These docs and examples use the [SageMaker Python SDK v3](https://github.com/aws/sagemaker-python-sdk), which introduces a new framework-agnostic API built around `ModelBuilder` (inference) and `ModelTrainer` (training), replacing the v2 `HuggingFaceModel` and `HuggingFace` classes.

## Where to run

You can run the tutorials from any of the following:

- [SageMaker Studio](https://docs.aws.amazon.com/sagemaker/latest/dg/gs-studio-onboard.html)
- A [SageMaker notebook instance](https://docs.aws.amazon.com/sagemaker/latest/dg/gs-console.html)
- A local environment with AWS credentials configured

## Execution role

SageMaker needs an [IAM execution role](https://docs.aws.amazon.com/sagemaker/latest/dg/sagemaker-roles.html) with permissions to access S3 and create training jobs and endpoints.

**SageMaker environment (Studio or notebook instance)**

`get_execution_role()` returns the role automatically:

```python
from sagemaker.core.helper.session_helper import Session, get_execution_role

sess = Session()
role = get_execution_role()
```

The execution role only exists inside SageMaker. If you call `get_execution_role` in a notebook that does not run on SageMaker, you get a region error.

**Local environment**

Look up the role ARN yourself and create the session:

```python
import boto3
from sagemaker.core.helper.session_helper import Session

iam_client = boto3.client("iam")
role = iam_client.get_role(RoleName="role-name-of-your-iam-role-with-right-permissions")["Role"]["Arn"]
sess = Session()
```
