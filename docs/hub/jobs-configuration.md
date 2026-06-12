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

## Volumes

Mount Hugging Face repositories (models, datasets) or [Storage Buckets](./storage-buckets) as volumes in your job container using `-v` or `--volume`. The syntax uses the `hf://` URL scheme: `hf://[TYPE/]SOURCE:/MOUNT_PATH[:ro]`.

Volume types:

| Type | Example |
|------|---------|
| Model repo | `-v hf://openai/gpt-oss-120b:/model` |
| Dataset repo | `-v hf://datasets/stanfordnlp/imdb:/data` |
| Storage bucket | `-v hf://buckets/username/my-bucket:/mnt` |
| Subfolder | `-v hf://datasets/org/my-dataset/train:/data` |

Then use the mounted volume as a local directory inside the container:

```bash
# Mount a dataset and query it with DuckDB
>>> hf jobs run -v hf://datasets/stanfordnlp/imdb:/dataset \
...     duckdb/duckdb duckdb -c "SELECT * FROM '/dataset/**/*.parquet' LIMIT 5"

# Mount a bucket to save training checkpoints
>>> hf jobs uv run -v hf://buckets/username/my-bucket:/training-outputs \
...     sft.py --output-dir /training-outputs/training-v3-final
```

Multiple volumes can be mounted by repeating the `-v` flag:

```bash
>>> hf jobs run -v hf://datasets/username/my-dataset:/data -v hf://buckets/username/my-bucket:/output \
...     python:3.12 python script.py
```

Models and datasets are always mounted **read-only**. Storage buckets are **read-write** by default, which is useful for saving outputs, checkpoints, or intermediate results. Use `:ro` to mount a bucket in read-only mode:

```bash
>>> hf jobs run -v hf://buckets/username/my-bucket:/mnt:ro python:3.12 ls /mnt
```

In Python, use the [`Volume`](https://huggingface.co/docs/huggingface_hub/package_reference/jobs#huggingface_hub.Volume) class:

```python
from huggingface_hub import Volume, run_job

job = run_job(
    image="python:3.12",
    command=["python", "-c", "import os; print(os.listdir('/data'))"],
    volumes=[
        Volume(type="dataset", source="username/my-dataset", mount_path="/data"),
        Volume(type="bucket", source="username/my-bucket", mount_path="/output"),
    ],
)
```

> [!NOTE]
> Volume mounting requires `huggingface_hub` >= 1.8.0. See the [Python client documentation](https://huggingface.co/docs/huggingface_hub/guides/jobs#mount-a-volume) and [installation guide](https://huggingface.co/docs/huggingface_hub/installation) for more details.

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
name             pretty name             cpu       ram      storage   accelerator               cost/min  cost/hour
cpu-basic        CPU Basic               2 vCPU    16 GB    50 GB                               $0.0002   $0.01
cpu-upgrade      CPU Upgrade             8 vCPU    32 GB    50 GB                               $0.0005   $0.03
cpu-performance  CPU Performance         32 vCPU   256 GB   1024 GB                             $0.0317   $1.90
cpu-xl           CPU XL                  16 vCPU   124 GB   1000 GB                             $0.0167   $1.00
t4-small         Nvidia T4 - small       4 vCPU    15 GB    50 GB     1x T4 (16 GB)             $0.0067   $0.40
t4-medium        Nvidia T4 - medium      8 vCPU    30 GB    100 GB    1x T4 (16 GB)             $0.0100   $0.60
a10g-small       Nvidia A10G - small     4 vCPU    15 GB    110 GB    1x A10G (24 GB)           $0.0167   $1.00
a10g-large       Nvidia A10G - large     12 vCPU   46 GB    200 GB    1x A10G (24 GB)           $0.0250   $1.50
a10g-largex2     2x Nvidia A10G - large  24 vCPU   92 GB    1000 GB   2x A10G (48 GB)           $0.0500   $3.00
a10g-largex4     4x Nvidia A10G - large  48 vCPU   184 GB   2000 GB   4x A10G (96 GB)           $0.0833   $5.00
a100-large       Nvidia A100 - large     12 vCPU   142 GB   1000 GB   1x A100 (80 GB)           $0.0417   $2.50
a100x4           4x Nvidia A100          48 vCPU   568 GB   4000 GB   4x A100 (320 GB)          $0.1667   $10.00
a100x8           8x Nvidia A100          96 vCPU   1136 GB  8000 GB   8x A100 (640 GB)          $0.3333   $20.00
h200             Nvidia H200             23 vCPU   256 GB   3000 GB   1x H200 (141 GB)          $0.0833   $5.00
h200x2           Nvidia H200             46 vCPU   512 GB   6000 GB   2x H200 (282 GB)          $0.1667   $10.00
h200x4           Nvidia H200             92 vCPU   1024 GB  12000 GB  4x H200 (564 GB)          $0.3333   $20.00
h200x8           Nvidia H200             184 vCPU  2048 GB  24000 GB  8x H200 (1128 GB)         $0.6667   $40.00
rtx-pro-6000     Nvidia RTX PRO 6000     23 vCPU   256 GB   475 GB    1x RTX PRO 6000 (96 GB)   $0.0458   $2.75
rtx-pro-6000x2   Nvidia RTX PRO 6000     46 vCPU   512 GB   950 GB    2x RTX PRO 6000 (192 GB)  $0.0917   $5.50
rtx-pro-6000x4   Nvidia RTX PRO 6000     92 vCPU   1024 GB  1900 GB   4x RTX PRO 6000 (384 GB)  $0.1833   $11.00
rtx-pro-6000x8   Nvidia RTX PRO 6000     184 vCPU  2048 GB  3800 GB   8x RTX PRO 6000 (768 GB)  $0.3667   $22.00
l4x1             1x Nvidia L4            8 vCPU    30 GB    400 GB    1x L4 (24 GB)             $0.0133   $0.80
l4x4             4x Nvidia L4            48 vCPU   186 GB   3200 GB   4x L4 (96 GB)             $0.0633   $3.80
l40sx1           1x Nvidia L40S          8 vCPU    62 GB    380 GB    1x L40S (48 GB)           $0.0300   $1.80
l40sx4           4x Nvidia L40S          48 vCPU   382 GB   3200 GB   4x L40S (192 GB)          $0.1383   $8.30
l40sx8           8x Nvidia L40S          192 vCPU  1534 GB  6500 GB   8x L40S (384 GB)          $0.3917   $23.50
```

## Expose Ports

Jobs can expose container ports through the public jobs proxy using `--expose <port>` (CLI) or `expose=[<port>]` (Python API). Each exposed port is reachable at `https://<job_id>--<port>.hf.jobs` and requires an HF token with `read` access to the job's namespace:

```bash
curl -H "Authorization: Bearer $HF_TOKEN" https://<job_id>--<port>.hf.jobs/
```

This works on `hf jobs run`, `hf jobs uv run`, and their scheduled variants. Repeat the flag to expose multiple ports (`--expose 8000 --expose 8001`), or pass several ports in the list (`expose=[8000, 8001]`).

> [!NOTE]
> Exposed ports are billed at a small flat hourly rate on top of the job's hardware price, only while the job is running. See the [pricing page](./jobs-pricing) for details.

### CLI

```bash
# Expose a web server running on port 8000
>>> hf jobs run --expose 8000 python:3.12 python -m http.server 8000
✓ Job started
  id: 6a2aa7cec4f53f9fc5aa4cff
  url: https://huggingface.co/jobs/Wauplin/6a2aa7cec4f53f9fc5aa4cff
Hint: Exposed ports are reachable at (requires an HF token with read access to the job):
  https://6a2aa7cec4f53f9fc5aa4cff--8000.hf.jobs
Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...
```

### Python

```python
>>> from huggingface_hub import run_job
>>> job = run_job(image="python:3.12", command=["python", "-m", "http.server", "8000"], expose=[8000])
>>> job.status.expose_urls
['https://6a2ab384c4f53f9fc5aa4d4f--8000.hf.jobs']
```

## SSH

You can open an interactive SSH session into a running Job to debug, inspect, or work directly inside the container. Enable it with `--ssh` (CLI) or `ssh=True` (Python API), then connect with `hf jobs ssh <job_id>`.

Only users with write access to the Job's namespace are allowed in (the Job creator, or members of the owner organization), authenticated by an SSH public key registered at [https://huggingface.co/settings/keys](https://huggingface.co/settings/keys).

> [!NOTE]
> SSH access is **not billed** on top of the Job's hardware price.

SSH is available on `hf jobs run` and `hf jobs uv run`. It is not supported for scheduled jobs.

### CLI

```bash
# Start a job with SSH enabled
>>> hf jobs run --ssh --detach --timeout 10m python:3.12 sleep infinity
✓ Job started
  id: 6a2bd1f1871c005b5352ad31
  url: https://huggingface.co/jobs/Wauplin/6a2bd1f1871c005b5352ad31
Hint: Use `hf jobs ssh 6a2bd1f1871c005b5352ad31` to open an SSH session into the job.

# Open an SSH session into the job
>>> hf jobs ssh 6a2bd1f1871c005b5352ad31
```

You can also print the SSH command without running it (`--dry-run`), or pass a specific identity file (`-i`/`--identity-file`):

```bash
>>> hf jobs ssh 6a2bd1f1871c005b5352ad31 --dry-run
ssh 6a2bd1f1871c005b5352ad31@ssh.hf.jobs

>>> hf jobs ssh 6a2bd1f1871c005b5352ad31 -i ~/.ssh/id_ed25519
```

### Python

```python
>>> from huggingface_hub import run_job
>>> job = run_job(image="python:3.12", command=["sleep", "infinity"], ssh=True)
>>> job.status.ssh_url
'ssh://6a2bd1f1871c005b5352ad31@ssh.hf.jobs'
```

Then connect from a terminal with `hf jobs ssh <job_id>`, or directly with `ssh <job_id>@ssh.hf.jobs`.

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
