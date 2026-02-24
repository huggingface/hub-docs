# Configuration

## Authentication

You need to be authenticated with `hf auth login` to run Jobs, and use a token with the permission to start and manage Jobs.

Alternatively, pass a Hugging Face token manually with `--token` in the CLI, or the `token` argument in Python.

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

### Built-in environment variables

Similarly to the [built-in environment variables in Spaces](./spaces-overview#built-in-environment-variables), Jobs automatically provide the following environment variables inside the container:

| Variable | Description |
|----------|-------------|
| `JOB_ID` | The unique identifier of the current job (e.g., `699d874f1aad19adb8aaeadc`). This is the same ID shown in the UI and the job URL. |
| `ACCELERATOR` | The type of accelerator available (e.g., `t4-medium`, `a10g-small`, `a100x4`), or `none` for CPU-only jobs. |
| `CPU_CORES` | The number of CPU cores allocated to the job. |
| `MEMORY` | The amount of memory allocated to the job (e.g., `8Gi`). |

You can use these variables to track outputs, adapt your code to available resources, or reference the current job programmatically:

```bash
# Access job environment information
>>> hf jobs run python:3.12 python -c "import os; print(f'Job: {os.environ.get(\"JOB_ID\")}, CPU: {os.environ.get(\"CPU_CORES\")}, Mem: {os.environ.get(\"MEMORY\")}')"
```

### User-defined environment variables

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

See the list of available `--flavor` options using the `hf jobs hardware` command (default is `cpu-basic`):

```bash
>>> hf jobs hardware
NAME         PRETTY NAME            CPU      RAM     ACCELERATOR      COST/MIN COST/HOUR 
------------ ---------------------- -------- ------- ---------------- -------- --------- 
cpu-basic    CPU Basic              2 vCPU   16 GB   N/A              $0.0002  $0.01     
cpu-upgrade  CPU Upgrade            8 vCPU   32 GB   N/A              $0.0005  $0.03     
t4-small     Nvidia T4 - small      4 vCPU   15 GB   1x T4 (16 GB)    $0.0067  $0.40     
t4-medium    Nvidia T4 - medium     8 vCPU   30 GB   1x T4 (16 GB)    $0.0100  $0.60     
a10g-small   Nvidia A10G - small    4 vCPU   15 GB   1x A10G (24 GB)  $0.0167  $1.00     
a10g-large   Nvidia A10G - large    12 vCPU  46 GB   1x A10G (24 GB)  $0.0250  $1.50     
a10g-largex2 2x Nvidia A10G - large 24 vCPU  92 GB   2x A10G (48 GB)  $0.0500  $3.00     
a10g-largex4 4x Nvidia A10G - large 48 vCPU  184 GB  4x A10G (96 GB)  $0.0833  $5.00     
a100-large   Nvidia A100 - large    12 vCPU  142 GB  1x A100 (80 GB)  $0.0417  $2.50     
a100x4       4x Nvidia A100         48 vCPU  568 GB  4x A100 (320 GB) $0.1667  $10.00    
a100x8       8x Nvidia A100         96 vCPU  1136 GB 8x A100 (640 GB) $0.3333  $20.00    
l4x1         1x Nvidia L4           8 vCPU   30 GB   1x L4 (24 GB)    $0.0133  $0.80     
l4x4         4x Nvidia L4           48 vCPU  186 GB  4x L4 (96 GB)    $0.0633  $3.80     
l40sx1       1x Nvidia L40S         8 vCPU   62 GB   1x L40S (48 GB)  $0.0300  $1.80     
l40sx4       4x Nvidia L40S         48 vCPU  382 GB  4x L40S (192 GB) $0.1383  $8.30     
l40sx8       8x Nvidia L40S         192 vCPU 1534 GB 8x L40S (384 GB) $0.3917  $23.50
```

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

## Labels

Add one or more labels to a Job to add some metadata with `-l` or `-label`.
You can use such metadata later to filter Jobs on the website or in the CLI.

Add labels with `--label my-label` or key-value labels with `--label key=value`.
For example:

```bash
hf jobs uv run --label fine-tuning --label model=Qwen3-0.6B --label dataset=Capybara ...
```

Note that using the same `key` multiple times causes the last `key=value` to overwrite and discard any previous label with `key`.
