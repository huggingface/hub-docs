# Quickstart — Run Hugging Face Models with AWS Deadline Cloud

## Why use Deadline Cloud for Hugging Face models?

AWS Deadline Cloud is a fully managed batch compute service with job queuing, scheduling, and auto-scaling worker fleets. Unlike an always-on inference endpoint, you pay only while jobs are running — a natural fit for offline Hugging Face workloads: generating LLM responses for thousands of prompts, fine-tuning a model on a custom dataset, batch image generation, or evaluating models across benchmarks.

Jobs are defined as [Open Job Description job bundles](https://docs.aws.amazon.com/deadline-cloud/latest/developerguide/build-job-bundle.html): a directory with a YAML template, parameters, and the files your job needs. The [deadline-cloud-samples](https://github.com/aws-deadline/deadline-cloud-samples/tree/mainline/job_bundles) repository provides ready-to-submit bundles built on Hugging Face models and libraries:

| Sample | What it does |
|---|---|
| [vLLM batch inference](https://github.com/aws-deadline/deadline-cloud-samples/tree/mainline/job_bundles/vllm_batch) | High-throughput LLM inference over a JSONL file of prompts, fanned out across a GPU fleet |
| [LoRA / QLoRA fine-tuning](https://github.com/aws-deadline/deadline-cloud-samples/tree/mainline/job_bundles/hf_finetune_lora) | Fine-tune any Hugging Face causal LM with 🤗 Transformers, PEFT, and bitsandbytes |
| [Text-to-image batch generation](https://github.com/aws-deadline/deadline-cloud-samples/tree/mainline/job_bundles/text_to_image_batch) | Generate images at scale from a batch of prompts |
| [FLUX.2 Klein LoRA](https://github.com/aws-deadline/deadline-cloud-samples/tree/mainline/job_bundles/flux2_klein_lora) | LoRA training and image generation on GPUs |
| [vLLM evaluation leaderboard](https://github.com/aws-deadline/deadline-cloud-samples/tree/mainline/job_bundles/vllm_lm_eval_leaderboard) | Compare multiple LLMs across benchmarks with CSV/Markdown aggregation |
| [ESMFold prediction](https://github.com/aws-deadline/deadline-cloud-samples/tree/mainline/job_bundles/esmfold_predict) | Parallel protein structure prediction from FASTA to PDB |

In this quickstart, we will run batch LLM inference with vLLM, then fine-tune a model with QLoRA.

## 1. Prerequisites

| | Requirement |
|---|---|
| AWS account | An AWS account with AWS Deadline Cloud enabled. |
| A farm with a GPU fleet | A Deadline Cloud farm with a service-managed fleet of Linux NVIDIA GPU workers (≥ 16 GB VRAM for fine-tuning, ≥ 32 GB RAM for vLLM) and a queue with a Conda queue environment. The fastest path is deploying the [`cuda_farm` CloudFormation template](https://github.com/aws-deadline/deadline-cloud-samples/tree/mainline/cloudformation/farm_templates/cuda_farm). |
| Deadline Cloud CLI | `pip install deadline[gui]` — see the [Deadline Cloud CLI](https://github.com/aws-deadline/deadline-cloud) repository. |
| Service quotas | GPU instances (e.g. g5/g6 families) require vCPU quota in your region. |

Configure the CLI defaults after your farm is created:

```bash
deadline config set defaults.farm_id <FARM_ID>
deadline config set defaults.queue_id <QUEUE_ID>
```

Then clone the samples:

```bash
git clone https://github.com/aws-deadline/deadline-cloud-samples.git
cd deadline-cloud-samples/job_bundles
```

## 2. Batch LLM inference with vLLM

The `vllm_batch` bundle takes a JSONL file where each line is one prompt, loads the model once per worker with a vLLM server step environment, and fans prompts out across the fleet in chunked tasks.

Create an input file:

```jsonl
{"prompt": "What is photosynthesis?", "id": "001"}
{"prompt": "Write a haiku about clouds.", "id": "002"}
{"prompt": "Explain gravity to a 5 year old.", "id": "003", "max_tokens": 256, "temperature": 0.9}
```

Submit the job — either with the GUI submitter (`deadline bundle gui-submit vllm_batch/`) or the CLI:

```bash
deadline bundle submit vllm_batch/ \
  --parameter InputFile=prompts.jsonl \
  --parameter Prompts=1-3 \
  --parameter ChunkSize=5 \
  --parameter OutputDir=$PWD/results
```

When the job completes, download the results:

```bash
deadline job download-output --job-id <JOB_ID>
open results/output/results.html   # standalone visual results viewer
cat results/output/output.jsonl    # combined results, one JSON object per line
```

## 3. Fine-tune a model with LoRA / QLoRA

The `hf_finetune_lora` bundle fine-tunes any Hugging Face causal language model on an instruction dataset (JSONL with `instruction` and `output` fields) and returns a small LoRA adapter (~50–200 MB) you can load on top of the base model.

```bash
deadline bundle submit hf_finetune_lora/ \
  -p BaseModel=Qwen/Qwen2.5-1.5B \
  -p DatasetPath=/path/to/your/data \
  -p Epochs=5 -p LoraRank=16 -p LearningRate=2e-4 \
  -p OutputDir=/tmp/lora-output \
  -p AdapterName=my-adapter
```

Submitting with all defaults trains on the bundle's included sample dataset, so you can verify your farm end to end before bringing your own data. Dropdown models are public; provide a `HuggingFaceToken` parameter only for gated models such as Llama or Gemma.

Wait for completion and download the adapter:

```bash
deadline job wait --job-id <JOB_ID> --timeout 3600
deadline job download-output --job-id <JOB_ID>
```

Then load it locally with 🤗 PEFT:

```python
from peft import PeftModel
from transformers import AutoModelForCausalLM, AutoTokenizer

base = AutoModelForCausalLM.from_pretrained("Qwen/Qwen2.5-1.5B")
model = PeftModel.from_pretrained(base, "/tmp/lora-output/my-adapter")
tokenizer = AutoTokenizer.from_pretrained("Qwen/Qwen2.5-1.5B")
```

## 4. Clean up

Deadline Cloud service-managed fleets auto-scale to zero when queues are empty, so completed jobs stop incurring compute charges automatically. To remove everything, delete the CloudFormation stack (if you used the `cuda_farm` template) or delete the queue, fleet, and farm in the Deadline Cloud console.
