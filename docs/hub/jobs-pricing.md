# Pricing and Billing

Hugging Face Jobs let you run compute tasks on Hugging Face infrastructure without managing it yourself. Simply define a command, a Docker image, and a hardware flavor among various CPU and GPU options.

> [!TIP]
> Jobs are available to any user or organization with a positive [credit balance](https://huggingface.co/settings/billing).

Billing on Jobs is based on hardware usage and is computed by the minute: you get charged for every minute the Jobs runs on the requested hardware.

During a Job’s lifecycle, it is only billed when the Job is Starting or Running. This means that there is no cost during build.

If a running Job starts to fail, it will be automatically suspended and the billing will stop.

## Pricing

<!-- STRETCH TABLES -->

Jobs are billed per minute based on the hardware used. Below are the available hardware options and their pricing.

### CPU

| **Hardware**           | **CPU**       | **Memory**   | **Ephemeral Storage** | **Hourly Price**  |
|----------------------- |-------------- |------------- |---------------------- | ----------------- |
| CPU Basic              | 2 vCPU        | 16 GB        | 50 GB                 | $0.01             |
| CPU Upgrade            | 8 vCPU        | 32 GB        | 50 GB                 | $0.03             |
| CPU XL                 | 16 vCPU       | 124 GB       | 1000 GB               | $1.00             |
| CPU Performance        | 32 vCPU       | 256 GB       | 1024 GB               | $1.90             |

### GPU

| **Hardware**           | **CPU**       | **Memory**   | **GPU Memory**  | **Ephemeral Storage** | **Hourly Price**  |
|----------------------- |-------------- |------------- |---------------- |---------------------- | ----------------- |
| Nvidia T4 - small      | 4 vCPU        | 15 GB        | 16 GB           | 50 GB                 | $0.40             |
| Nvidia T4 - medium     | 8 vCPU        | 30 GB        | 16 GB           | 100 GB                | $0.60             |
| 1x Nvidia L4           | 8 vCPU        | 30 GB        | 24 GB           | 400 GB                | $0.80             |
| 4x Nvidia L4           | 48 vCPU       | 186 GB       | 96 GB           | 3200 GB               | $3.80             |
| 1x Nvidia L40S         | 8 vCPU        | 62 GB        | 48 GB           | 380 GB                | $1.80             |
| 4x Nvidia L40S         | 48 vCPU       | 382 GB       | 192 GB          | 3200 GB               | $8.30             |
| 8x Nvidia L40S         | 192 vCPU      | 1534 GB      | 384 GB          | 6500 GB               | $23.50            |
| Nvidia A10G - small    | 4 vCPU        | 15 GB        | 24 GB           | 110 GB                | $1.00             |
| Nvidia A10G - large    | 12 vCPU       | 46 GB        | 24 GB           | 200 GB                | $1.50             |
| 2x Nvidia A10G - large | 24 vCPU       | 92 GB        | 48 GB           | 1000 GB               | $3.00             |
| 4x Nvidia A10G - large | 48 vCPU       | 184 GB       | 96 GB           | 2000 GB               | $5.00             |
| Nvidia A100 - large    | 12 vCPU       | 142 GB       | 80 GB           | 1000 GB               | $2.50             |
| 4x Nvidia A100 - large | 48 vCPU       | 568 GB       | 320 GB          | 4000 GB               | $10.00            |
| 8x Nvidia A100 - large | 96 vCPU       | 1136 GB      | 640 GB          | 8000 GB               | $20.00            |
| Nvidia H200            | 23 vCPU       | 256 GB       | 141 GB          | 3000 GB               | $5.00             |
| 2x Nvidia H200         | 46 vCPU       | 512 GB       | 282 GB          | 6000 GB               | $10.00            |
| 4x Nvidia H200         | 92 vCPU       | 1024 GB      | 564 GB          | 12000 GB              | $20.00            |
| 8x Nvidia H200         | 184 vCPU      | 2048 GB      | 1128 GB         | 24000 GB              | $40.00            |
| Nvidia RTX PRO 6000    | 23 vCPU       | 256 GB       | 96 GB           | 475 GB                | $2.75             |
| 2x Nvidia RTX PRO 6000 | 46 vCPU       | 512 GB       | 192 GB          | 950 GB                | $5.50             |
| 4x Nvidia RTX PRO 6000 | 92 vCPU       | 1024 GB      | 384 GB          | 1900 GB               | $11.00            |
| 8x Nvidia RTX PRO 6000 | 184 vCPU      | 2048 GB      | 768 GB          | 3800 GB               | $22.00            |

You can also retrieve available hardware and pricing programmatically via the API at `GET /api/jobs/hardware` or via the CLI:

```bash
>>> hf jobs hardware
```

### Exposed ports

A Job can [expose one or more ports](./jobs-configuration#expose-ports) to make them reachable from the outside while the Job is running. Exposing one or more ports is billed at a flat rate per Job, in addition to the hardware price:

| **Product**   | **Hourly Price**  |
|---------------| ----------------- |
| Exposed ports | $0.01             |

Like hardware, it is billed by the minute, only while the Job is Starting or Running.

## Manage billing

### Bill to your organization

Billing is done to the user's namespace by default, but you can bill to your organization instead by specifying the right `namespace`:

```bash
hf jobs run --namespace my-org-name ...
```

In this case the Job runs under the organization account, and you can see it in your organization Jobs page (organization page > settings > Jobs).

### Bill to a resource group

> [!WARNING]
> This feature is part of the <a href="https://huggingface.co/enterprise">Team & Enterprise</a> plans.

If your organization has [Resource Groups](./security-resource-groups) set up, you can attribute job costs to a specific resource group. To do so:

1. Your user token must be a member of the resource group.
2. Pass the resource group's ID as the `namespace` when running the job.

You can find the resource group's ID in your organization's Resource Groups settings page.

```bash
hf jobs run --namespace <resource-group-id> ...
```

In Python:

```python
>>> from huggingface_hub import run_job
>>> run_job(
...     image="python:3.12",
...     command=["python", "-c", "print('Hello!')"],
...     namespace="<resource-group-id>",
... )
```

### View current compute usage

You can look at your current billing information for Jobs in in your [Billing](https://huggingface.co/settings/billing) page, under the "Compute Usage" section:

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/jobs/billing.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/jobs/billing-dark.png"/>
</div>

Additional information about billing can be found in the [dedicated Hub documentation](https://huggingface.co/docs/hub/en/billing).

### Recommendations

#### Set timeout limits

Set a `timeout` when creating the Job to ensure it can't run beyond a certain duration.
A Job run that reaches the `timeout` duration is automatically stopped, and so is its billing.
Here is how to set a timeout with the CLI:

```bash
hf jobs run --timeout 3h ...
```

Note that the default timeout is set to **30 minutes**.
You must therefore specify a longer timeout if your Job requires more time to run.

#### Cancel irrelevant Jobs

If a running Job is no longer relevant, you can cancel it prematurely to stop its billing, either via the Job page or the CLI:

```bash
hf jobs cancel <job-id>
```

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/jobs/cancel-job.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/jobs/cancel-job-dark.png"/>
</div>
