# Run training on Amazon SageMaker

This guide will show you how to train a 🤗 Transformers model with the SageMaker Python SDK. Make sure you have [set up the SageMaker SDK](./setup-sagemaker-sdk) first. Learn how to:

- [Prepare a training script](#prepare-a--transformers-fine-tuning-script).
- [Create a ModelTrainer](#create-a-modeltrainer).
- [Run training with the `train` method](#execute-training).
- [Access your trained model](#access-trained-model).
- [Perform distributed training](#distributed-training).
- [Create a spot instance](#spot-instances).
- [Load a training script from a GitHub repository](#git-repository).
- [Collect training metrics](#sagemaker-metrics).

## Prepare a 🤗 Transformers fine-tuning script

Our training script is very similar to a training script you might run outside of SageMaker. However, you can access useful properties about the training environment through various environment variables (see [here](https://github.com/aws/sagemaker-training-toolkit/blob/master/ENVIRONMENT_VARIABLES.md) for a complete list), such as:

- `SM_MODEL_DIR`: A string representing the path to which the training job writes the model artifacts. After training, artifacts in this directory are uploaded to S3 for model hosting. `SM_MODEL_DIR` is always set to `/opt/ml/model`.

- `SM_NUM_GPUS`: An integer representing the number of GPUs available to the host.

- `SM_CHANNEL_XXXX:` A string representing the path to the directory that contains the input data for the specified channel. For example, when you specify `train` and `test` channels in the `ModelTrainer` via `input_data_config`, the environment variables are set to `SM_CHANNEL_TRAIN` and `SM_CHANNEL_TEST`.

The `hyperparameters` defined in the [ModelTrainer](#create-a-modeltrainer) are passed as named arguments and processed by `ArgumentParser()`.

```python
import transformers
import datasets
import argparse
import os

if __name__ == "__main__":

    parser = argparse.ArgumentParser()

    # hyperparameters sent by the client are passed as command-line arguments to the script
    parser.add_argument("--epochs", type=int, default=3)
    parser.add_argument("--train_batch_size", type=int, default=32)
    parser.add_argument("--model_name", type=str)

    # data, model, and output directories
    parser.add_argument("--model-dir", type=str, default=os.environ["SM_MODEL_DIR"])
    parser.add_argument("--training_dir", type=str, default=os.environ["SM_CHANNEL_TRAIN"])
    parser.add_argument("--test_dir", type=str, default=os.environ["SM_CHANNEL_TEST"])
```

_Note that SageMaker doesn’t support argparse actions. For example, if you want to use a boolean hyperparameter, specify `type` as `bool` in your script and provide an explicit `True` or `False` value._

Look [train.py file](https://github.com/huggingface/notebooks/blob/main/sagemaker/01_getting_started_pytorch/scripts/train.py) for a complete example of a 🤗 Transformers training script.

## Training Output Management

If `output_dir` in the `TrainingArguments` is set to '/opt/ml/model' the Trainer saves all training artifacts, including logs, checkpoints, and models. Amazon SageMaker archives the whole '/opt/ml/model' directory as `model.tar.gz` and uploads it at the end of the training job to Amazon S3. Depending on your Hyperparameters and `TrainingArguments` this could lead to a large artifact (> 5GB), which can slow down deployment for Amazon SageMaker Inference. 
You can control how checkpoints, logs, and artifacts are saved by customization the [TrainingArguments](https://huggingface.co/docs/transformers/main/en/main_classes/trainer#transformers.TrainingArguments). For example by providing `save_total_limit` as `TrainingArgument` you can control the limit of the total amount of checkpoints. Deletes the older checkpoints in `output_dir` if new ones are saved and the maximum limit is reached.

In addition to the options already mentioned above, there is another option to save the training artifacts during the training session. Amazon SageMaker supports [Checkpointing](https://docs.aws.amazon.com/sagemaker/latest/dg/model-checkpoints.html), which allows you to continuously save your artifacts during training to Amazon S3 rather than at the end of your training. To enable [Checkpointing](https://docs.aws.amazon.com/sagemaker/latest/dg/model-checkpoints.html) you need to provide a `CheckpointConfig(s3_uri=...)` pointing to an Amazon S3 location on the `ModelTrainer` and set `output_dir` to `/opt/ml/checkpoints`. 
_Note: If you set `output_dir` to `/opt/ml/checkpoints` make sure to call `trainer.save_model("/opt/ml/model")` or model.save_pretrained("/opt/ml/model")/`tokenizer.save_pretrained("/opt/ml/model")` at the end of your training to be able to deploy your model seamlessly to Amazon SageMaker for Inference._

## Create a ModelTrainer

Run 🤗 Transformers training scripts on SageMaker by creating a [`ModelTrainer`](https://sagemaker.readthedocs.io/en/stable/). The `ModelTrainer` handles end-to-end SageMaker training. There are several parameters you should define:

1. `source_code` specifies the fine-tuning script (`entry_script`) and its directory (`source_dir`).
2. `compute` specifies the Amazon instance(s) to launch. Refer [here](https://aws.amazon.com/sagemaker/pricing/) for a complete list of instance types.
3. `training_image` is the training container image, retrieved with `image_uris.retrieve`.
4. `hyperparameters` specifies training hyperparameters. View additional available hyperparameters in [train.py file](https://github.com/huggingface/notebooks/blob/main/sagemaker/01_getting_started_pytorch/scripts/train.py).

The following code sample shows how to train with a custom script `train.py` with three hyperparameters (`epochs`, `train_batch_size`, and `model_name`):

```python
from sagemaker.train.model_trainer import ModelTrainer
from sagemaker.train.configs import SourceCode, Compute
from sagemaker.core import image_uris
from sagemaker.core.helper.session_helper import Session, get_execution_role

# set up the SageMaker session and execution role
sess = Session()
role = get_execution_role()

# hyperparameters which are passed to the training job (as `--key value` CLI args)
hyperparameters = {
    'epochs': 1,
    'train_batch_size': 32,
    'model_name': 'distilbert-base-uncased',
}

instance_type = 'ml.g6.12xlarge'

# Retrieve the Hugging Face PyTorch training DLC image URI
training_image = image_uris.retrieve(
    framework="huggingface",
    region=sess.boto_region_name,
    version="4.49.0",
    base_framework_version="pytorch2.5.1",
    py_version="py311",
    image_scope="training",
    instance_type=instance_type,
)

# create the ModelTrainer
huggingface_estimator = ModelTrainer(
    sagemaker_session=sess,
    role=role,
    training_image=training_image,
    source_code=SourceCode(
        source_dir='./scripts',
        entry_script='train.py',
    ),
    compute=Compute(
        instance_type=instance_type,
        instance_count=1,
    ),
    hyperparameters=hyperparameters,
)
```

If you are running a `TrainingJob` locally, define `instance_type='local'` or `instance_type='local_gpu'` for GPU usage. Note that this will not work with SageMaker Studio.

The sections below reuse `sess`, `role`, `training_image`, and `hyperparameters` from this example; each snippet shows only what it changes.

## Execute training

Start your `TrainingJob` by calling `train` on a `ModelTrainer`. Specify your input training data as channels via `input_data_config`. Each channel's `data_source` can be a:

- S3 URI such as `s3://my-bucket/my-training-data`.
- `FileSystemInput` for Amazon Elastic File System or FSx for Lustre.

Each channel is mounted inside the container at `/opt/ml/input/data/<channel_name>`. Call `train` to begin training:

```python
from sagemaker.train.configs import InputData

huggingface_estimator.train(
    input_data_config=[
        InputData(channel_name="train", data_source="s3://<your-bucket>/imdb/train"),
        InputData(channel_name="test", data_source="s3://<your-bucket>/imdb/test"),
    ]
)
```

SageMaker starts and manages all the required EC2 instances and initiates the `TrainingJob` by running:

```bash
/opt/conda/bin/python train.py --epochs 1 --model_name distilbert-base-uncased --train_batch_size 32
```

## Access trained model

Once training is complete, you can access your model through the [AWS console](https://console.aws.amazon.com/console/home?nc2=h_ct&src=header-signin) or download it directly from S3. The S3 URI of the trained model artifacts is available on the completed training job:

```python
import boto3
from urllib.parse import urlparse

# S3 URI where the trained model artifacts (model.tar.gz) are located
model_data = huggingface_estimator._latest_training_job.model_artifacts.s3_model_artifacts

parsed = urlparse(model_data)
boto3.client("s3").download_file(
    parsed.netloc,                 # bucket
    parsed.path.lstrip("/"),       # key
    "model.tar.gz",                # local path where the artifact is saved
)
```

## Distributed training

SageMaker provides two strategies for distributed training: data parallelism and model parallelism. Data parallelism splits a training set across several GPUs, while model parallelism splits a model across several GPUs.

### Data parallelism

The Hugging Face [Trainer](https://huggingface.co/docs/transformers/main_classes/trainer) supports distributed data parallel training. With `ModelTrainer` you launch your script with `torchrun` by passing a `Torchrun` config to the `distributed` parameter. Set `process_count_per_node` to the number of GPUs per instance (`ml.p3dn.24xlarge` has 8):

```python
from sagemaker.train.distributed import Torchrun

# reuses sess, role, training_image, and hyperparameters from the ModelTrainer example above

instance_type = 'ml.p3dn.24xlarge'  # 8 GPUs per instance

# create the ModelTrainer with torchrun for distributed data parallelism
huggingface_estimator = ModelTrainer(
    sagemaker_session=sess,
    role=role,
    training_image=training_image,
    source_code=SourceCode(source_dir='./scripts', entry_script='train.py'),
    compute=Compute(instance_type=instance_type, instance_count=2),
    distributed=Torchrun(process_count_per_node=8),
    hyperparameters=hyperparameters,
)
```

📓 Open the [sagemaker-notebook.ipynb notebook](https://github.com/huggingface/notebooks/blob/main/sagemaker/07_tensorflow_distributed_training_data_parallelism/sagemaker-notebook.ipynb) for an example of how to run the data parallelism library with TensorFlow.

### Model parallelism

The Hugging Face [Trainer] also supports model parallelism through the SageMaker Model Parallelism library (SMP). With `ModelTrainer` you enable it by passing an `SMP` config to `Torchrun`. SMP provides tensor parallelism, context parallelism and sharded data parallelism:

```python
from sagemaker.train.distributed import Torchrun, SMP

# reuses sess, role, training_image, and hyperparameters from the ModelTrainer example above

instance_type = 'ml.p3dn.24xlarge'  # 8 GPUs per instance

# create the ModelTrainer with torchrun + SMP for model parallelism
huggingface_estimator = ModelTrainer(
    sagemaker_session=sess,
    role=role,
    training_image=training_image,
    source_code=SourceCode(source_dir='./scripts', entry_script='train.py'),
    compute=Compute(instance_type=instance_type, instance_count=2),
    distributed=Torchrun(
        process_count_per_node=8,
        smp=SMP(
            tensor_parallel_degree=2,
            hybrid_shard_degree=1,
        ),
    ),
    hyperparameters=hyperparameters,
)
```

📓 Open the [sagemaker-notebook.ipynb notebook](https://github.com/huggingface/notebooks/blob/main/sagemaker/04_distributed_training_model_parallelism/sagemaker-notebook.ipynb) for an example of how to run the model parallelism library.

## Spot instances

The Hugging Face extension for the SageMaker Python SDK means we can benefit from [fully-managed EC2 spot instances](https://docs.aws.amazon.com/sagemaker/latest/dg/model-managed-spot-training.html). This can help you save up to 90% of training costs!

_Note: Unless your training job completes quickly, we recommend you use [checkpointing](https://docs.aws.amazon.com/sagemaker/latest/dg/model-checkpoints.html) with managed spot training. In this case, you need to define the `checkpoint_s3_uri`._

Set `enable_managed_spot_training=True` on `Compute` and define `max_wait_time_in_seconds` and `max_runtime_in_seconds` on `StoppingCondition` to use spot instances:

```python
from sagemaker.train.configs import StoppingCondition, CheckpointConfig

# reuses sess, role, and training_image from the ModelTrainer example above
# spot instances need checkpointing, so the training script must write to /opt/ml/checkpoints
hyperparameters = {
    'epochs': 1,
    'train_batch_size': 32,
    'model_name': 'distilbert-base-uncased',
    'output_dir': '/opt/ml/checkpoints',
}

instance_type = 'ml.g6.12xlarge'

# create the ModelTrainer
huggingface_estimator = ModelTrainer(
    sagemaker_session=sess,
    role=role,
    training_image=training_image,
    source_code=SourceCode(source_dir='./scripts', entry_script='train.py'),
    compute=Compute(
        instance_type=instance_type,
        instance_count=1,
        enable_managed_spot_training=True,   # use fully-managed spot instances
    ),
    # max_wait_time_in_seconds should be equal to or greater than max_runtime_in_seconds
    stopping_condition=StoppingCondition(
        max_runtime_in_seconds=1000,
        max_wait_time_in_seconds=3600,
    ),
    checkpoint_config=CheckpointConfig(s3_uri=f's3://{sess.default_bucket()}/checkpoints'),
    hyperparameters=hyperparameters,
)

# Training seconds: 874
# Billable seconds: 262
# Managed Spot Training savings: 70.0%
```

📓 Open the [sagemaker-notebook.ipynb notebook](https://github.com/huggingface/notebooks/blob/main/sagemaker/05_spot_instances/sagemaker-notebook.ipynb) for an example of how to use spot instances.

## Git repository

The v2 `git_config` parameter is not available in `ModelTrainer`. To run a training script that lives in a GitHub repository (such as the [🤗 Transformers example scripts](https://github.com/huggingface/transformers/tree/main/examples)), clone the repository locally first and point `source_dir`/`entry_script` at the checked-out files. Choose a branch that matches the Transformers version of your training image.

_Tip: Save your model to S3 by setting `output_dir=/opt/ml/model` in the hyperparameter of your training script._

```bash
# clone the repo locally, matching the transformers version of your training image
git clone --branch v4.49.0 https://github.com/huggingface/transformers.git
```

```python
# reuses sess, role, and training_image from the ModelTrainer example above
# run_glue.py takes the Transformers example argument names
hyperparameters = {
    'epochs': 1,
    'per_device_train_batch_size': 32,
    'model_name_or_path': 'distilbert-base-uncased',
}

# create the ModelTrainer pointing at the cloned example directory
huggingface_estimator = ModelTrainer(
    sagemaker_session=sess,
    role=role,
    training_image=training_image,
    source_code=SourceCode(
        source_dir='transformers/examples/pytorch/text-classification',
        entry_script='run_glue.py',
        requirements='requirements.txt',
    ),
    compute=Compute(instance_type='ml.g6.12xlarge', instance_count=1),
    hyperparameters=hyperparameters,
)
```

## SageMaker metrics

[SageMaker metrics](https://docs.aws.amazon.com/sagemaker/latest/dg/training-metrics.html#define-train-metrics) automatically parses training job logs for metrics and sends them to CloudWatch. If you want SageMaker to parse the logs, you must specify the metric's name and a regular expression for SageMaker to use to find the metric. With `ModelTrainer` you attach them using `with_metric_definitions`:

```python
from sagemaker.train.configs import MetricDefinition

# reuses sess, role, training_image, and hyperparameters from the ModelTrainer example above

instance_type = 'ml.g6.12xlarge'

# define metrics definitions
metric_definitions = [
    MetricDefinition(name="train_runtime", regex="train_runtime.*=\D*(.*?)$"),
    MetricDefinition(name="eval_accuracy", regex="eval_accuracy.*=\D*(.*?)$"),
    MetricDefinition(name="eval_loss", regex="eval_loss.*=\D*(.*?)$"),
]

# create the ModelTrainer
huggingface_estimator = ModelTrainer(
    sagemaker_session=sess,
    role=role,
    training_image=training_image,
    source_code=SourceCode(source_dir='./scripts', entry_script='train.py'),
    compute=Compute(instance_type=instance_type, instance_count=1),
    hyperparameters=hyperparameters,
).with_metric_definitions(metric_definitions)
```

📓 Open the [notebook](https://github.com/huggingface/notebooks/blob/main/sagemaker/06_sagemaker_metrics/sagemaker-notebook.ipynb) for an example of how to capture metrics in SageMaker.

## What's next

Once your training job is complete, the model artifacts are in S3 and ready for deployment. Continue with [Deploy models](./deploy-sagemaker-sdk#deploy-a--transformers-model-trained-in-sagemaker) to serve your trained model on a SageMaker endpoint.
