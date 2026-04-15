# Pricing and Billing

Hugging Face Jobs let you run compute tasks on Hugging Face infrastructure without managing it yourself. Simply define a command, a Docker image, and a hardware flavor among various CPU and GPU options.

> [!TIP]
> Jobs are available to any user or organization with [pre-paid credits](https://huggingface.co/pricing).

Billing on Jobs is based on hardware usage and is computed by the minute: you get charged for every minute the Jobs runs on the requested hardware.

During a Job’s lifecycle, it is only billed when the Job is Starting or Running. This means that there is no cost during build.

If a running Job starts to fail, it will be automatically suspended and the billing will stop.

## Pricing

<!-- STRETCH TABLES -->

Jobs are billed per minute based on the hardware used. Below are the available hardware options and their pricing.

### CPU

| **Hardware**           | **CPU**       | **Memory**   | **Hourly Price**  |
|----------------------- |-------------- |------------- | ----------------- |
| CPU Basic              | 2 vCPU        | 16 GB        | $0.01             |
| CPU Upgrade            | 8 vCPU        | 32 GB        | $0.03             |
| CPU XL                 | 16 vCPU       | 124 GB       | $1.00             |
| CPU Performance        | 32 vCPU       | 256 GB       | $1.90             |

### GPU

| **Hardware**           | **CPU**       | **Memory**   | **GPU Memory**  | **Hourly Price**  |
|----------------------- |-------------- |------------- |---------------- | ----------------- |
| Nvidia T4 - small      | 4 vCPU        | 15 GB        | 16 GB           | $0.40             |
| Nvidia T4 - medium     | 8 vCPU        | 30 GB        | 16 GB           | $0.60             |
| 1x Nvidia L4           | 8 vCPU        | 30 GB        | 24 GB           | $0.80             |
| 4x Nvidia L4           | 48 vCPU       | 186 GB       | 96 GB           | $3.80             |
| 1x Nvidia L40S         | 8 vCPU        | 62 GB        | 48 GB           | $1.80             |
| 4x Nvidia L40S         | 48 vCPU       | 382 GB       | 192 GB          | $8.30             |
| 8x Nvidia L40S         | 192 vCPU      | 1534 GB      | 384 GB          | $23.50            |
| Nvidia A10G - small    | 4 vCPU        | 15 GB        | 24 GB           | $1.00             |
| Nvidia A10G - large    | 12 vCPU       | 46 GB        | 24 GB           | $1.50             |
| 2x Nvidia A10G - large | 24 vCPU       | 92 GB        | 48 GB           | $3.00             |
| 4x Nvidia A10G - large | 48 vCPU       | 184 GB       | 96 GB           | $5.00             |
| Nvidia A100 - large    | 12 vCPU       | 142 GB       | 80 GB           | $2.50             |
| 4x Nvidia A100 - large | 48 vCPU       | 568 GB       | 320 GB          | $10.00            |
| 8x Nvidia A100 - large | 96 vCPU       | 1136 GB      | 640 GB          | $20.00            |
| Nvidia H200            | 23 vCPU       | 256 GB       | 141 GB          | $5.00             |
| 2x Nvidia H200         | 46 vCPU       | 512 GB       | 282 GB          | $10.00            |
| 4x Nvidia H200         | 92 vCPU       | 1024 GB      | 564 GB          | $20.00            |
| 8x Nvidia H200         | 184 vCPU      | 2048 GB      | 1128 GB         | $40.00            |

You can also retrieve available hardware and pricing programmatically via the API at `GET /api/jobs/hardware` or via the CLI:

```bash
>>> hf jobs hardware
```

## Manage billing

### Bill to your organization

Billing is done to the user's namespace by default, but you can bill to your organization instead by specifying the right `namespace`:

```bash
hf jobs run --namespace my-org-name ...
```

In this case the Job runs under the organization account, and you can see it in your organization Jobs page (organization page > settings > Jobs).

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
