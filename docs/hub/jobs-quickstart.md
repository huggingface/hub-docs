# Quickstart

Run your Python code on Hugging Face CPUs and GPUs. In this guide, you'll run a simple command on a CPU, then generate text with a small language model on a GPU.

You'll need a Hugging Face account with [pre-paid credits](https://huggingface.co/settings/billing). See [Pricing and Billing](./jobs-pricing) for compute costs.

## 1. Set up the CLI

[Install the Hugging Face CLI](https://huggingface.co/docs/huggingface_hub/en/guides/cli#getting-started), then log in to your account:

```bash
>>> hf auth login
```

## 2. Run Hello World

Run this command in your terminal:

```bash
>>> hf jobs uv run python -c 'print("Hello from the cloud!")'
```

`hf jobs uv run` runs the command in a Python environment on Hugging Face infrastructure. It uses a CPU by default and streams the Job's logs to your terminal. After startup, you'll see:

```text
Hello from the cloud!
```

The CLI also prints your Job's ID and a link to its page. Open the link to view its status and logs in your browser. You can find your Jobs again on your [Jobs page](https://huggingface.co/settings/jobs), or use the ID with the CLI commands below.

## 3. Run a model on a GPU

Run this prepared script to generate a robot name. You can [view it on GitHub](https://github.com/huggingface/hub-docs/blob/main/examples/jobs/hello_gpu.py) or read the code below.

```bash
hf jobs uv run \
    --flavor t4-small \
    --timeout 5m \
    https://raw.githubusercontent.com/huggingface/hub-docs/main/examples/jobs/hello_gpu.py
```

- `--flavor t4-small` selects a machine with an NVIDIA T4 GPU.
- `--timeout 5m` sets a five-minute limit on the Job.

The Job downloads the model and prints its answer in the logs. For example:

```text
RoboLearnbot
```

Here is the complete script:

```python
# /// script
# dependencies = ["torch", "transformers"]
# ///

from transformers import pipeline

generator = pipeline(
    "text-generation",
    model="HuggingFaceTB/SmolLM2-360M-Instruct",
    dtype="float16",
)
messages = [{
    "role": "user",
    "content": "Suggest a name for a robot that helps people learn Python. Answer with only the name.",
}]
outputs = generator(messages, max_new_tokens=48, do_sample=False, return_full_text=False)
print(outputs[0]["generated_text"])
```

The [dependency header](https://docs.astral.sh/uv/guides/scripts/#declaring-script-dependencies) tells uv to install `torch` and `transformers` in the Job. You can also specify dependencies with `--with`. You only need the `hf` CLI locally.

The script runs [SmolLM2-360M-Instruct](https://huggingface.co/HuggingFaceTB/SmolLM2-360M-Instruct) on the Job's GPU. `max_new_tokens` caps the answer length.

Startup time varies with hardware availability, dependency installation and model downloads.

> [!TIP]
> Pressing Ctrl+C stops streaming logs; the Job keeps running. To stop the Job, use `hf jobs cancel JOB_ID`, replacing `JOB_ID` with the ID printed by the CLI.

## 4. Check your result

Use the GPU Job's ID to check its status and read its logs again:

```bash
>>> hf jobs inspect JOB_ID
>>> hf jobs logs JOB_ID
```

A successful run has the status `COMPLETED`, and its logs contain the generated answer.

The answer remains available in the Job's logs after it finishes. When you adapt the script to produce files, [save those results to a bucket or Hub repository](./jobs-manage#persist-your-results) so they survive the Job.

## Try your own script (optional)

Copy the code above into `hello_gpu.py`, edit the prompt in `messages`, and run your local file:

```bash
hf jobs uv run --flavor t4-small --timeout 5m hello_gpu.py
```

The CLI uploads your edited script automatically. Replace `hello_gpu.py` with its path if you saved it elsewhere.

## Next steps

Build on this example with a larger workload:

- [Annotate a dataset with OCR, classification or batch inference](./jobs-examples#uv-scripts).
- [Fine-tune and save a model](./jobs-examples#guides-to-train-with-jobs) using TRL or Unsloth.
- [Read datasets or buckets and save processed results](./jobs-large-datasets).
- [Run commands in Docker images](./jobs-configuration#docker-jobs).
- [Use Jobs from a coding agent](./jobs-examples#coding-agent-skills).
