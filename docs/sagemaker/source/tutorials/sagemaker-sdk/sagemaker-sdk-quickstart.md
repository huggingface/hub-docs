# Train and deploy a Hugging Face model on Amazon SageMaker with the SDK

The get started guide will show you how to quickly use Hugging Face on Amazon SageMaker with the SDK. Learn how to fine-tune and deploy a pretrained 🤗 Transformers model on SageMaker for a binary text classification task.

<iframe width="560" height="315" src="https://www.youtube.com/embed/pYqjCzoyWyo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

📓 Open the [sagemaker-notebook.ipynb file](https://github.com/huggingface/notebooks/blob/main/sagemaker/01_getting_started_pytorch/sagemaker-notebook.ipynb) to follow along!

## Installation and setup

Get started by installing the necessary Hugging Face libraries and SageMaker. You will also need to install [PyTorch](https://pytorch.org/get-started/locally/) if you don't already have it installed. If you run this example in SageMaker Studio, it is already installed in the notebook kernel!

```python
pip install "sagemaker>=3.0.0" "transformers" "datasets[s3]" --upgrade
```

> [!NOTE]
> These docs and examples use the [SageMaker Python SDK v3](https://github.com/aws/sagemaker-python-sdk), which introduces a new framework-agnostic API built around `ModelBuilder` (inference) and `ModelTrainer` (training), replacing the v2 `HuggingFaceModel` and `HuggingFace` classes. Install it with `pip install "sagemaker>=3.0.0"`.

If you want to run this example in [SageMaker Studio](https://docs.aws.amazon.com/sagemaker/latest/dg/studio.html), upgrade [ipywidgets](https://ipywidgets.readthedocs.io/en/latest/) for the 🤗 Datasets library and restart the kernel:

```python
%%capture
import IPython
!conda install -c conda-forge ipywidgets -y
IPython.Application.instance().kernel.do_shutdown(True)
```

Next, you should set up your environment: a SageMaker session and an S3 bucket. The S3 bucket will store data, models, and logs. You will need access to an [IAM execution role](https://docs.aws.amazon.com/sagemaker/latest/dg/sagemaker-roles.html) with the required permissions.

If you are planning on using SageMaker in a local environment, you need to provide the `role` yourself. Learn more about how to set this up [here](https://huggingface.co/docs/sagemaker/train#installation-and-setup).

⚠️ The execution role is only available when you run a notebook within SageMaker. If you try to run `get_execution_role` in a notebook not on SageMaker, you will get a region error.

```python
from sagemaker.core.helper.session_helper import Session, get_execution_role

sess = Session()
sagemaker_session_bucket = sess.default_bucket()
role = get_execution_role()
```

## Preprocess

The 🤗 Datasets library makes it easy to download and preprocess a dataset for training. Download and tokenize the [IMDb](https://huggingface.co/datasets/imdb) dataset:

```python
from datasets import load_dataset
from transformers import AutoTokenizer

# load dataset
train_dataset, test_dataset = load_dataset("imdb", split=["train", "test"])

# load tokenizer
tokenizer = AutoTokenizer.from_pretrained("distilbert/distilbert-base-uncased")

# create tokenization function
def tokenize(batch):
    return tokenizer(batch["text"], padding="max_length", truncation=True)

# tokenize train and test datasets
train_dataset = train_dataset.map(tokenize, batched=True)
test_dataset = test_dataset.map(tokenize, batched=True)

# set dataset format for PyTorch
train_dataset =  train_dataset.rename_column("label", "labels")
train_dataset.set_format("torch", columns=["input_ids", "attention_mask", "labels"])
test_dataset = test_dataset.rename_column("label", "labels")
test_dataset.set_format("torch", columns=["input_ids", "attention_mask", "labels"])
```

## Upload dataset to S3 bucket

Next, upload the preprocessed dataset to your S3 session bucket with 🤗 Datasets S3 [filesystem](https://huggingface.co/docs/datasets/filesystems.html) implementation:

```python
# save train_dataset to s3
training_input_path = f's3://{sess.default_bucket()}/{s3_prefix}/train'
train_dataset.save_to_disk(training_input_path)

# save test_dataset to s3
test_input_path = f's3://{sess.default_bucket()}/{s3_prefix}/test'
test_dataset.save_to_disk(test_input_path)
```

## Start a training job

Create a `ModelTrainer` to handle end-to-end SageMaker training. The most important parameters to pay attention to are:

* `source_code` bundles the fine-tuning script (`entry_script`) and its directory (`source_dir`); you can find the script in [train.py file](https://github.com/huggingface/notebooks/blob/main/sagemaker/01_getting_started_pytorch/scripts/train.py).
* `compute` defines the SageMaker instance(s) that will be launched. Take a look [here](https://aws.amazon.com/sagemaker/pricing/) for a complete list of instance types.
* `training_image` is the container image used for training. We retrieve the Hugging Face PyTorch training DLC with `image_uris.retrieve`.
* `hyperparameters` refers to the training hyperparameters the model will be fine-tuned with (passed to the script as `--key value` CLI args).

```python
from sagemaker.train.model_trainer import ModelTrainer
from sagemaker.train.configs import SourceCode, Compute
from sagemaker.core import image_uris

hyperparameters = {
    "epochs": 1,                                        # number of training epochs
    "train_batch_size": 32,                             # training batch size
    "model_name": "distilbert/distilbert-base-uncased"  # name of pretrained model
}

instance_type = "ml.p3.2xlarge"

# Retrieve the Hugging Face PyTorch training DLC image URI
training_image = image_uris.retrieve(
    framework="huggingface",
    region=sess.boto_region_name,
    version="4.49.0",                        # Transformers version
    base_framework_version="pytorch2.5.1",   # PyTorch version
    py_version="py311",                      # Python version
    image_scope="training",
    instance_type=instance_type,
)

huggingface_estimator = ModelTrainer(
    sagemaker_session=sess,
    role=role,                              # IAM role used in training job to access AWS resources (S3)
    training_image=training_image,
    source_code=SourceCode(
        source_dir="./scripts",             # directory where fine-tuning script is stored
        entry_script="train.py",            # fine-tuning script to use in training job
    ),
    compute=Compute(
        instance_type=instance_type,        # instance type
        instance_count=1,                   # number of instances
    ),
    hyperparameters=hyperparameters,        # hyperparameters to use in training job
)
```

Begin training by passing your S3 paths as input data channels:

```python
from sagemaker.train.configs import InputData

huggingface_estimator.train(
    input_data_config=[
        InputData(channel_name="train", data_source=training_input_path),
        InputData(channel_name="test", data_source=test_input_path),
    ]
)
```

## Deploy model

Once the training job is complete, deploy your fine-tuned model with a `ModelBuilder`. We point it at the trained model artifacts and the Hugging Face PyTorch inference DLC, then call `deploy()`:

```python
from sagemaker.serve import ModelBuilder
from sagemaker.core import image_uris

instance_type = "ml.g4dn.xlarge"

# S3 URI of the fine-tuned model artifacts produced by the training job
model_data = huggingface_estimator._latest_training_job.model_artifacts.s3_model_artifacts

# Retrieve the Hugging Face PyTorch inference DLC image URI
inference_image = image_uris.retrieve(
    framework="huggingface",
    region=sess.boto_region_name,
    version="4.51.3",                        # Transformers version
    base_framework_version="pytorch2.6.0",   # PyTorch version
    py_version="py312",                      # Python version
    image_scope="inference",
    instance_type=instance_type,
)

model_builder = ModelBuilder(
    image_uri=inference_image,
    s3_model_data_url=model_data,
    role_arn=role,
    sagemaker_session=sess,
    instance_type=instance_type,
)
model_builder.build()

predictor = model_builder.deploy(initial_instance_count=1, instance_type=instance_type)
```

Call `invoke()` on your data. The request and response bodies are JSON:

```python
import json

sentiment_input = {"inputs": "It feels like a curtain closing...there was an elegance in the way they moved toward conclusion. No fan is going to watch and feel short-changed."}

res = predictor.invoke(body=json.dumps(sentiment_input), content_type="application/json")
print(json.loads(res.body.read()))
```

After running your request, delete the endpoint:

```python
predictor.delete()
```

## What's next?

Congratulations, you've just fine-tuned and deployed a pretrained 🤗 Transformers model on SageMaker for binary text classification! 🎉
