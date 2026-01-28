# Manage Jobs

## List Jobs

Find your list of Jobs in the Jobs page or your organization Jobs page (user/organization page > settings > Jobs):


<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/jobs/jobs-page.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/jobs/jobs-page-dark.png"/>
</div>

It is also available in the Hugging Face CLI. Show the list of running Jobs with `hf jobs ps` and use `-a` to show all the Jobs:

```bash
>>> hf jobs ps
JOB ID       IMAGE/SPACE      COMMAND     CREATED             STATUS  
------------ ---------------- ----------- ------------------- ------- 
69402ea6c... ghcr.io/astra... uv run p... 2025-12-15 15:52:06 RUNNING
>>> hf jobs ps -a
JOB ID       IMAGE/SPACE COMMAND         CREATED             STATUS    
------------ ---------- --------------- ------------------- --------- 
69402ea6c... ghcr.io... uv run pytho... 2025-12-15 15:52:06 RUNNING   
693b06b8c... ghcr.io... uv run pytho... 2025-12-11 18:00:24 CANCELED  
693b069fc... ghcr.io... uv run pytho... 2025-12-11 17:59:59 ERROR     
693aef401... ghcr.io... uv run pytho... 2025-12-11 16:20:16 COMPLETED 
693aee76c... ubuntu     echo Hello f... 2025-12-11 16:16:54 COMPLETED 
693ae8e3c... python:... python -c pr... 2025-12-11 15:53:07 COMPLETED
```

Specify your organization `namespace` to list Jobs under your organization:

```bash
>>> hf jobs ps --namespace <my-org-name>
```

## Filter Jobs

Click on a Job's label to filter Jobs by label:

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/jobs/jobs-labels-page.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/jobs/jobs-labels-page-dark.png"/>
</div>

In the CLI, you can filter Jobs based on conditions provided, using the format key=value:

Filter by labels:

```bash
>>> hf jobs ps --filter label=fine-tuning --filter label=model=Qwen3-06B -a
JOB ID       IMAGE/SPACE  COMMAND          CREATED             STATUS 
------------ ------------ ---------------- ------------------- ---------
6978b1254... ghcr.io/a... uv run --with... 2026-01-27 12:35:49 COMPLETED  
6978b11d4... ghcr.io/a... uv run --with... 2026-01-27 12:33:53 COMPLETED
```

Filter on any condition:

```bash
>>> hf jobs ps --filter status=error -a
JOB ID       IMAGE/SPACE COMMAND            CREATED            STATUS 
------------ ---------- ------------------ ------------------- ------ 
693b069fc... ghcr.io... uv run python -... 2025-12-11 17:59:59 ERROR  
693996dec... ghcr.io... bash -c python ... 2025-12-10 15:50:54 ERROR  
69399695c... ghcr.io... uv run --with t... 2025-12-10 15:49:41 ERROR  
693994bdc... ghcr.io... uv run --with t... 2025-12-10 15:41:49 ERROR  
68d3c1af3... ghcr.io... uv run bash -c ... 2025-09-24 10:02:23 ERROR
```

Filtering supports negation `!=` and glob patterns (including `*` and `?`):

```bash
# Show Jobs that are not completed
>>> hf jobs ps -a --filter status!=completed

# Show Jobs with a command that ends with "train.py"
>>> hf jobs ps -a --filter "command=*train.py"

# Show Jobs with a "fine-tuning" label
>>> hf jobs ps -a --filter label=fine-tuning

# Show Jobs that don't have the "prod" label and have a label that starts with "data-"
>>> hf jobs ps -a --filter label!=prod --filter "label=data-*"

# Show Jobs based on key=value labels
>>> hf jobs ps -a --filter label=model=Qwen3-06B --filter label=dataset!=Capybara
```

## Monitor resource usage

Use `hf jobs stats` to get the usage statistics for CPU, memory, network and GPU (if any) of running Jobs:

```bash
>>> hf jobs stats
JOB ID                   CPU % NUM CPU MEM % MEM USAGE        NET I/O         GPU UTIL % GPU MEM % GPU MEM USAGE   
------------------------ ----- ------- ----- ---------------- --------------- ---------- --------- --------------- 
695e83c5d2f3efac77e8cf18 8%    12.0    7.18% 10.9GB / 152.5GB 0.0bps / 0.0bps 100%       31.92%    25.9GB / 81.2GB
```

Specify one or several Job ids to only show the statistics of certain Jobs:

```bash
>>> hf jobs stats [job-ids]...
```

## Inspect a Job

You can see the status logs of a Job in the Job page:

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/jobs/trl-sft-job-page.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/jobs/trl-sft-job-page-dark.png"/>
</div>

Alternatively using the CLI

```bash
>>> hf jobs inspect 693994e21a39f67af5a41ad0 
[
    {
        "id": "693994e21a39f67af5a41ad0",
        "created_at": "2025-12-10 15:42:26.835000+00:00",
        "docker_image": "ghcr.io/astral-sh/uv:python3.12-bookworm",
        "space_id": null,
        "command": ["bash", "-c", "python -c \"import urllib.request; import os; from pathlib import Path; o = urllib.request.build_opener(); o.addheaders = [(\\\"Authorization\\\", \\\"Bearer \\\" + os.environ[\\\"UV_SCRIPT_HF_TOKEN\\\"])]; Path(\\\"/tmp/script.py\\\").write_bytes(o.open(os.environ[\\\"UV_SCRIPT_URL\\\"]).read())\" && uv run --with trl /tmp/script.py"],
        "arguments": [],
        "environment": {"UV_SCRIPT_URL": "https://huggingface.co/datasets/lhoestq/hf-cli-jobs-uv-run-scripts/resolve/728cc5682eb402d7ffe66a2f6f97645b34cb08dd/train.py"},
        "secrets": ["HF_TOKEN", "UV_SCRIPT_HF_TOKEN"],
        "flavor": "a100-large",
        "status": {"stage": "COMPLETED", "message": null},
        "owner": {"id": "5e9ecfc04957053f60648a3e", "name": "lhoestq", "type": "user"},
        "endpoint": "https://huggingface.co",
        "url": "https://huggingface.co/jobs/lhoestq/693994e21a39f67af5a41ad0"
    }
]
```

and for the logs

```bash
>>> hf jobs logs 693994e21a39f67af5a41ad0
Downloading nvidia-cuda-nvrtc-cu12 (84.0MiB)
Downloading numpy (15.8MiB)
Downloading nvidia-cuda-cupti-cu12 (9.8MiB)
Downloading tokenizers (3.1MiB)
Downloading nvidia-cusolver-cu12 (255.1MiB)
Downloading nvidia-cufft-cu12 (184.2MiB)
Downloading transformers (11.4MiB)
Downloading setuptools (1.1MiB)
... 
```

Specify your organization `namespace` to inspect a Job under your organization:

```bash
hf jobs inspect --namespace <my-org-name> <job_id>
hf jobs logs --namespace <my-org-name> <job_id>
```

## Debug a Job

If a Job has an error, you can see it in on the Job page

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/jobs/erroring-job-page.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/jobs/erroring-job-page-dark.png"/>
</div>

Look at the status message and the logs on the Job page to see what went wrong.

You may also look at the last lines of logs to see what happened before a Job failed. You can see that in the Job page, or using the CLI:

```bash
>>> hf jobs logs 69405cf51a39f67af5a41f29 | tail -n 10     
 Downloaded nvidia-cudnn-cu12
 Downloaded torch
Installed 66 packages in 226ms
Generating train split: 100%|██████████| 15806/15806 [00:00<00:00, 73330.17 examples/s]
Generating test split: 100%|██████████| 200/200 [00:00<00:00, 45427.32 examples/s]
Traceback (most recent call last):
  File "/tmp/script.py", line 7, in <module>
    train_dataset=train_dataset,
                  ^^^^^^^^^^^^^
NameError: name 'train_dataset' is not defined. Did you mean: 'load_dataset'?
```

Debug a Job locally using your local UV or Docker setup:

* `hf jobs uv run ...` -> `uv run ...`
* `hf jobs run ...` -> `docker run ...`

The status message can say "Job timeout": it means the Job didn't finish in time before the timeout (the default is 30min) and therefore it was stopped.
In this case you need to specify a higher timeout, using `--timeout` in the CLI, e.g.

```bash
hf jobs uv run --timeout 3h ...
```

## Cancel Jobs

Use the "Cancel" button on the Job page to cancel a Job:

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/jobs/cancel-job.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/jobs/cancel-job-dark.png"/>
</div>

or in the CLI:

```bash
hf jobs cancel 693b06b8c67c9f186cfe239e
```

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/jobs/cancelled-job-page.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/jobs/cancelled-job-page-dark.png"/>
</div>

Specify your organization `namespace` to cancel a Job under your organization:

```bash
hf jobs cancel --namespace <my-org-name> <job_id>
```

## MacOS menu bar

Find your list of Jobs in the MacOS [`hfjobs-menubar`](https://github.com/drbh/hfjobs-menubar) client:

<div class="flex justify-center">
<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/jobs/macos-hfjobs-list.png"/>
</div>

Get Jobs information, and monitor logs and resource usage statistics:

<div class="flex justify-center">
<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/jobs/macos-hfjobs-stats.png"/>
</div>
