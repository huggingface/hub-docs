# Quickstart

In this guide you will run a Job to fine-tune an open source model on Hugging Face infrastastructure in only a few minutes. Make sure you are logged in to Hugging Face and have access to your [Jobs page](https://huggingface.co/settings/jobs).

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/jobs/jobs-page.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/jobs/jobs-page-dark.png"/>
</div>

## Getting started

First install the Hugging Face CLI:

1. Install the CLI

```bash
>>> curl -LsSf https://hf.co/cli/install.sh | bash
```

Install the CLI (using Homebrew)

```bash
>>> brew install huggingface-cli
```

Install the CLI (using uv)

```bash
>>> uv tool install hf
```

2. Login to your Hugging Face account:

Login

```bash
>>> hf auth login
```

3. Create your first jobs using the `hf jobs` command:

Run a UV command or script

```bash
>>> hf jobs uv run python -c 'print("Hello from the cloud!")'
Job started with ID: 693aef401a39f67af5a41c0e
View at: https://huggingface.co/jobs/lhoestq/693aef401a39f67af5a41c0e
Hello from the cloud!
```

```bash
>>> hf jobs uv run path/to/script.py
```

Run a Docker command

```bash
>>> hf jobs run ubuntu echo 'Hello from the cloud!'
Job started with ID: 693aee76c67c9f186cfe233e
View at: https://huggingface.co/jobs/lhoestq/693aee76c67c9f186cfe233e
Hello from the cloud!
```

4. Check your first jobs

The job logs appear in your terminal, but you can also see them in your jobs page. Open the job page to see the job information, status and logs:

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/jobs/first-job-page.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/jobs/firts-job-page-dark.png"/>
</div>


## The training script

Here is a simple training script to fine-tune a base model to a conversational model using Supervised Fine-Tuning (SFT). It uses the [Qwen/Qwen2.5-0.5B](https://huggingface.co/Qwen/Qwen2.5-0.5B) model and the [trl-lib/Capybara](https://huggingface.co/datasets/trl-lib/Capybara) dataset, and the [TRL](https://huggingface.co/docs/trl/en/index) library, and saves the resulting model to your Hugging Face account under the name `"Qwen2.5-0.5B-SFT"`:

```python
from datasets import load_dataset
from trl import SFTTrainer

dataset = load_dataset("trl-lib/Capybara", split="train")
trainer = SFTTrainer(
    model="Qwen/Qwen2.5-0.5B",
    train_dataset=dataset,
)
trainer.train()
trainer.push_to_hub("Qwen2.5-0.5B-SFT")
```

Save this script as `train.py`, and we can now run it with UV on Hugging Face Jobs.

## Run the training job

`hf jobs` takes several arguments: select the hardware with `--flavor`, and pass environment variable with `--env` and `--secrets`. Here we use the A100 Large GPU flavor with `--flavor a100-large` and pass your Hugging Face token as a secret with `--secrets HF_TOKEN` in order to be able to push the resulting model to your account.

Moreover, UV accepts the `--with` argument to define python dependencies, so we use `--with trl` to have the `trl` library available.

You can now run the final command which looks like this:

```bash
hf jobs uv run \
    --flavor a100-large \
    --with trl \
    --secrets HF_TOKEN \
    train.py
```

The logs appear in your terminal, and you can safely Ctrl+C to stop streaming the logs, the job will keep running.

```
...
Downloaded nvidia-cudnn-cu12 
Downloaded torch
Installed 66 packages in 233ms
Generating train split: 100%|██████████| 15806/15806 [00:00<00:00, 76686.50 examples/s]
Generating test split: 100%|██████████| 200/200 [00:00<00:00, 43880.36 examples/s]
Tokenizing train dataset: 100%|██████████| 15806/15806 [00:41<00:00, 384.97 examples/s]
Truncating train dataset: 100%|██████████| 15806/15806 [00:00<00:00, 212272.92 examples/s]
The model is already on multiple devices. Skipping the move to device specified in `args`.
The tokenizer has new PAD/BOS/EOS tokens that differ from the model config and generation config. The model config and generation config were aligned accordingly, being updated with the tokenizer's values. Updated tokens: {'bos_token_id': None, 'pad_token_id': 151643}.
{'loss': 1.7357, 'grad_norm': 4.8733229637146, 'learning_rate': 1.9969635627530365e-05, 'entropy': 1.7238958358764649, 'num_tokens': 59528.0, 'mean_token_accuracy': 0.6124177813529968, 'epoch': 0.01}
{'loss': 1.6239, 'grad_norm': 6.200186729431152, 'learning_rate': 1.9935897435897437e-05, 'entropy': 1.644005584716797, 'num_tokens': 115219.0, 'mean_token_accuracy': 0.6259662985801697, 'epoch': 0.01}
{'loss': 1.4449, 'grad_norm': 6.167325496673584, 'learning_rate': 1.990215924426451e-05, 'entropy': 1.5156117916107177, 'num_tokens': 171787.0, 'mean_token_accuracy': 0.6586395859718323, 'epoch': 0.02}
{'loss': 1.6023, 'grad_norm': 5.133708953857422, 'learning_rate': 1.986842105263158e-05, 'entropy': 1.6885507702827454, 'num_tokens': 226067.0, 'mean_token_accuracy': 0.6271904468536377, 'epoch': 0.02}
```

Follow the Job advancements on the job page on Hugging Face:


<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/jobs/trl-sft-job-page.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/jobs/trl-sft-job-page-dark.png"/>
</div>

Once the job is done, find your model on your account:

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/jobs/trl-sft-model-page.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/jobs/trl-sft-model-page-dark.png"/>
</div>

Congrats ! You just run your first Job to fine-tune an open source model 🔥

Feel free to try out your model locally and evaluate it using e.g. [tranfomers](https://huggingface.co/docs/transformers) by clicking on "Use this model", or deploy it to [Inference Endpoints](https://huggingface.co/docs/inference-endpoints) in one click using the "Deploy" button.
