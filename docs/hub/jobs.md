# Hugging Face Jobs

<!-- STRETCH TABLES -->

Hugging Face Jobs let you run compute tasks on Hugging Face infrastructure without managing any infrastructure. Simply define a command, a Docker image, and a hardware flavor (CPU, GPU, or TPU).

Jobs are ideal for:
- **Model training & fine-tuning** on GPUs without local setup
- **Synthetic data generation** using LLMs
- **Batch inference** on large datasets
- **Data processing** with high-CPU configurations

You can run jobs via the `hf jobs` CLI or the Python API, schedule recurring jobs with CRON expressions, and pay only for the seconds you use.

> [!TIP]
> Jobs are available to [Pro users](https://huggingface.co/pro) and [Team or Enterprise organizations](https://huggingface.co/enterprise).

**For usage guides and API reference, see the [Jobs documentation](https://huggingface.co/docs/jobs).**

## Pricing

Jobs are billed per minute based on the hardware used. Below are the available hardware options and their pricing.

### CPU

| **Hardware**           | **CPU**       | **Memory**   | **Hourly Price**  |
|----------------------- |-------------- |------------- | ----------------- |
| CPU Basic              | 2 vCPU        | 16 GB        | Free              |
| CPU Upgrade            | 8 vCPU        | 32 GB        | $0.03             |

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

You can also retrieve available hardware and pricing programmatically via the API at `GET /api/jobs/hardware`.
