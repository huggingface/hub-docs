# Configuration

## Authentication

You need to be authenticated with `hf auth login` to run Jobs, and use a token with the permission to start and manage Jobs.

Alternatively, pass a Hugging Face token manually with `--token` in the CLI, the `token` argument in Python or a Bearer token for the HTTP API.

## UV Jobs

Specify the UV script or python command to run as you would with UV:

```bash
>>> hf jobs uv run train.py
```

```bash
>>> hf jobs uv run python -c 'print("Hello from the cloud!")'
```

The `hf jobs uv run` command accepts an UV argument like `--with` and `--python`. The `--with` argument lets you specify python dependencies, and `--python` lets you choose the python version to use:


```bash
>>> hf jobs uv run --with trl train.py
>>> hf jobs uv run --python 3.12 train.py
```

Arguments following the command (or script) are not interpreted as arguments to uv. All options to uv must be provided before the command, e.g., uv run --verbose foo. A `--` can be used to separate the command from jobs/uv options for clarity, e.g.

```bash
>>> hf jobs uv run --with trl-jobs -- trl-jobs sft --model_name Qwen/Qwen3-0.6B --dataset_name trl-lib/Capybara
```

Find the list of all arguments in the [CLI documentation](https://huggingface.co/docs/huggingface_hub/package_reference/cli#hf-jobs-uv-run) and the [UV Commands documentation](https://docs.astral.sh/uv/reference/cli/#uv-run).

By default, UV Jobs run with the `ghcr.io/astral-sh/uv:python3.12-bookworm` Docker image, but you can use another image as long as it has UV installed, using `--image <docker-image>`.

## Docker Jobs

Specify the Docker image and the command to run as you would with docker:

```bash
>>> hf jobs run ubuntu echo "Hello from the cloud!"
```

All options to Jobs must be provided before the command. A `--` can be used to separate the command from jobs/uv options for clarity, e.g.

```bash
>>> hf jobs run --token hf_xxx ubuntu -- echo "Hello from the cloud!"
```

Find the list of all arguments in the [CLI documentation](https://huggingface.co/docs/huggingface_hub/package_reference/cli#hf-jobs-run).

## Environment variables and Secrets

You can pass environment variables to your job using 

```bash
# Pass environment variables
>>> hf jobs uv run -e FOO=foo -e BAR=bar python -c 'import os; print(os.environ["FOO"], os.environ["BAR"])'
```

```bash
# Pass an environment from a local .env file
>>> hf jobs uv run --env-file .env python -c 'import os; print(os.environ["FOO"], os.environ["BAR"])'
```

```bash
# Pass secrets - they will be encrypted server side
>>> hf jobs uv run -s MY_SECRET=psswrd python -c 'import os; print(os.environ["MY_SECRET"])'
```

```bash
# Pass secrets from a local .env.secrets file - they will be encrypted server side
>>> hf jobs uv run --secrets-file .env.secrets python -c 'import os; print(os.environ["MY_SECRET"])'
```

> [!TIP]
> Use `--secrets HF_TOKEN` to pass your local Hugging Face token implicitly.
> With this syntax, the secret is retrieved from the environment variable.
> For `HF_TOKEN`, it may read the token file located in the Hugging Face home folder if the environment variable is unset.

## Hardware flavor

Run jobs on GPUs or TPUs with the `flavor` argument. For example, to run a PyTorch job on an A10G GPU:

```bash
>>> hf jobs uv run --with torch --flavor a10g-small python -c "import torch; print(f'This code ran with the following GPU: {torch.cuda.get_device_name()}')"
```

Running this will show the following output!

```
This code ran with the following GPU: NVIDIA A10G
```

Here is another example to run a fine-tuning script like [trl/scripts/sft.py](https://github.com/huggingface/trl/blob/main/trl/scripts/sft.py):

```bash
>>> hf jobs uv run --with trl --flavor a10g-small -s HF_TOKEN -- sft.py --model_name_or_path Qwen/Qwen2-0.5B ...
```

> [!TIP]
> For comprehensive guidance on running model training jobs with TRL on Hugging Face infrastructure, check out the [TRL Jobs Training documentation](https://huggingface.co/docs/trl/main/en/jobs_training). It covers fine-tuning recipes, hardware selection, and best practices for training models efficiently.

Available `--flavor` options:

- CPU: `cpu-basic`, `cpu-upgrade`
- GPU: `t4-small`, `t4-medium`, `l4x1`, `l4x4`, `a10g-small`, `a10g-large`, `a10g-largex2`, `a10g-largex4`,`a100-large`
- TPU: `v5e-1x1`, `v5e-2x2`, `v5e-2x4`

(updated in 12/2025 from Hugging Face [suggested_hardware docs](https://huggingface.co/docs/hub/en/spaces-config-reference))

## Timeout

Jobs have a default timeout (30 minutes), after which they will automatically stop. This is important to know when running long-running tasks like model training.

You can specify a custom timeout value using the `--timeout` parameter when running a job. The timeout can be specified in two ways:

1. **As a number** (interpreted as seconds):

Use `--timeout` and pass the number in seconds (here 2 hours = 7200 seconds):

```bash
>>> hf jobs uv run --timeout 7200 --with torch --flavor a10g-large train.py
```

2. **As a string with time units**:

Or use `--timeout` and use diffetent time units:

```bash
>>> hf jobs uv run --timeout 2h --with torch --flavor a10g-large train.py
```

Other examples:

```bash
--timeout 30m    # 30 minutes
--timeout 1.5h   # 1.5 hours
--timeout 1d     # 1 day
--timeout 3600s  # 3600 seconds
```

Supported time units:
- `s` - seconds
- `m` - minutes  
- `h` - hours
- `d` - days

> [!WARNING]
> If you don't specify a timeout, a default timeout will be applied to your job. For long-running tasks like model training that may take hours, make sure to set an appropriate timeout to avoid unexpected job terminations.

## Namespace

Run Jobs under your organization account using the `--namespace` argument. Make sure you are logged in with a token that has the permission to start and manage Jobs under your orgzanization account.

```bash
>>> hf jobs uv run --namespace my-org-name python -c "print('Running in an org account')"
```

Note that you can pass a token with the right permission manually:

```bash
>>> hf jobs uv run --namespace my-org-name --token hf_xxx python -c "print('Running in an org account')"
```
