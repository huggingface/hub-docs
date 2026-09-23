# Train Models on Jobs

A Job gives a training run a GPU for exactly as long as it needs one. You launch from your machine, the run pushes its weights to the Hub, and the machine goes away when it finishes. There is no environment to set up on the GPU side: the script or image you launch brings its own.

This page is an overview of training on Jobs, with examples for common libraries. Every example is capped to a short run that finishes in minutes on a single A10G. Each section says what to remove for the full run. If you have not run a Job before, [Quickstart](./jobs-quickstart) covers installing the CLI, logging in and the credits a Job needs.

## How a training Job is put together

Every command below has the same five parts. The first Transformers command shows all of them.

- **What runs.** Either a uv script, launched with `hf jobs uv run`: a Python script that declares its dependencies in a `# /// script` comment block near the top, which uv installs into a fresh environment. The TRL section shows one. Or a library's Docker image, launched with `hf jobs run`, which uses the library already installed in the image. Start with a uv script when the library installs with `pip`. Use the image when the library ships one with compiled dependencies, or when its docs say to. See [Using Docker images](./jobs-images) for the trade-off.
- **A token.** Jobs get no Hugging Face token by default. `-s HF_TOKEN` forwards yours as a secret, so the run can push its model and read gated or private inputs. A fine-grained token needs write and create access to the model repo, or the run trains to the end and then fails on the upload. Other secrets travel the same way, for example `-s WANDB_API_KEY`.
- **Hardware and time.** `--flavor` picks the GPU. `--timeout` sets the time limit, which defaults to 30 minutes. A run that hits the timeout is stopped and its container is discarded, so set `--timeout` above your expected run time. See [Hardware flavor](./jobs-configuration#hardware-flavor) and [Timeout](./jobs-configuration#timeout).
- **A `--` between the `hf` flags and the script.** Flags before `--` are for `hf jobs`. After it come the script path and the script's own arguments. Without it, a script argument that shares a name with an `hf` flag, such as `--timeout` or `--token`, is taken by `hf`. In the image form, what follows `--` is the command to run in the container.
- **Where the output goes.** The container's disk is gone when the Job ends. Every library below can push the finished model to a Hub repo, and each example shows the option. For Transformers and TRL the repo takes the `--output_dir` name. A run can also write to a mounted [bucket](./storage-buckets) as it goes, using `-v` to mount one into the container. See [After it ends](#after-it-ends).

A script can also carry its own launch config in a `[tool.hf-jobs]` table of its header, as the TRL section shows. See [Define the launch config in the script](./jobs-configuration#define-the-launch-config-in-the-script). The same commands are available from Python as `run_uv_job()` and `run_job()`, covered in [Configuration](./jobs-configuration).

## Checks before a long run

A few checks before launch save a wasted run.

- **Smoke-test first.** Run the command with a step cap on a small flavor, as the examples below do. It proves the dependencies install, the data loads, the model fits and the push works. Then remove the cap and launch the full run.
- **Check the data fits.** Each flavor has a fixed disk, listed in the Ephemeral Storage column on [Pricing and Billing](./jobs-pricing#pricing). Weights, dataset and saved checkpoints share it. A dataset too big for the disk can be streamed or mounted instead of downloaded. See [Process Large Datasets](./jobs-large-datasets).
- **Estimate the run time.** The smoke test's final `train_*` metrics include `train_steps_per_second`, and the trainer prints the total step count when it starts. Together they give the full run's training time. Set `--timeout` comfortably above it, since the Job also spends time installing dependencies and downloading the model. Rates per flavor are on [Pricing and Billing](./jobs-pricing).
- **On a multi-GPU flavor, start one process per GPU.** Flavors ending in `x2`, `x4` or `x8` give several GPUs on one machine. Make sure the way you launch uses them. Transformers and TRL need `accelerate launch`, as the TRL section shows. Axolotl does it by itself. A plain `python train.py` uses one GPU, and a `Trainer` falls back to `DataParallel`, which is slower than one process per GPU.
- **Pin if you will rerun.** Pin a script URL to a commit instead of `main`, and an image to a specific tag instead of `latest`. A rerun then gets the same software. The script URLs below track `main`, so pin the commit before you rerun one.
- **Checkpoint long runs** to a mounted bucket, so a timeout or a crash does not lose the run. See [After it ends](#after-it-ends).

## While it runs

`hf jobs run` and `hf jobs uv run` both stream the logs and hold your terminal until the run ends. For longer runs, pass `-d` (detach) to get the Job ID back straight away, then follow the run with `hf jobs logs -f <job_id>` and confirm the GPU is busy with `hf jobs stats <job_id>`. Ctrl+C stops the streaming, not the Job. To stop the Job, use `hf jobs cancel <job_id>`. After a detached run, `hf jobs wait <job_id>` blocks until the Job ends and exits non-zero if it failed, which is what a script or an agent loop needs. A non-detached run already does this. See [Manage Jobs](./jobs-manage).

Job logs print loss values as text. For curves, point the trainer at an experiment tracker such as [trackio](https://huggingface.co/docs/trackio) and, for a hosted tracker such as Weights & Biases, pass its key as a second secret.

## After it ends

A Job's disk is discarded when the Job ends, whether it finished, failed or timed out. Anything you want to keep has to leave the container before then.

**Push the model to a Hub repo.** Every library on this page has an option for it: `--push_to_hub` for Transformers and TRL, `--output-repo` for the Unsloth scripts, `hub_model_id` in an Axolotl YAML. At the end of the run the library uploads the weights, the tokenizer and a generated model card recording the base model and the training arguments. The repo is created if it does not exist. To make it private, create it first with `hf repos create <name> --private`.

**Write to a bucket as you go.** For a run that takes hours, mount an existing [Storage Bucket](./storage-buckets) read-write (create one with `hf buckets create`) and point the library's output directory at it. Checkpoints land in the bucket as they are saved, so a timeout or a crash does not lose the run, and the next Job can resume from them. The same route works for evaluation outputs, logs and anything else that is not a model.

```bash
hf jobs uv run --flavor a10g-large --timeout 8h -s HF_TOKEN \
  -v hf://buckets/your-username/checkpoints:/ckpt -- \
  train.py --output_dir /ckpt/run-01
```

Transformers and TRL scripts take `--output_dir`. Axolotl takes `output_dir` in the YAML. To continue an interrupted run, mount the same bucket again and pass the library's resume option, such as `--resume_from_checkpoint` for a Transformers `Trainer`. See [Volumes](./jobs-configuration#volumes) for the mount options.

**Read a failed run.** A Job that fails keeps its logs: `hf jobs logs <job_id>` works after it ends, and `hf jobs inspect <job_id>` gives the final status and error message. `hf jobs logs -f` returns when the log stream ends whether the run succeeded or not, so check `inspect` before assuming it worked.

## Transformers

The [example scripts](https://github.com/huggingface/transformers/tree/main/examples/pytorch) in the Transformers repository declare their dependencies in a script header, so they run on Jobs straight from their GitHub URL. Arguments after the URL go to the script:

```bash
hf jobs uv run --flavor a10g-small --timeout 30m -s HF_TOKEN -- \
  https://raw.githubusercontent.com/huggingface/transformers/main/examples/pytorch/image-classification/run_image_classification.py \
  --model_name_or_path google/vit-base-patch16-224-in21k \
  --dataset_name ethz/food101 \
  --do_train --do_eval \
  --remove_unused_columns False \
  --max_train_samples 2000 --max_eval_samples 500 --num_train_epochs 1 \
  --output_dir vit-food101 \
  --push_to_hub
```

This trains on 2,000 images and finishes in about three minutes. Drop `--max_train_samples 2000 --max_eval_samples 500 --num_train_epochs 1` for the full run: three epochs over the 75,000 Food-101 training images take about an hour on `a10g-small` and reach 90% accuracy, so raise `--timeout` to `2h` before you launch it. `--push_to_hub` uploads the model under your namespace using the output directory name. Scripts exist for text classification, summarization, translation, token classification, speech recognition and more.

## TRL

[TRL](https://huggingface.co/docs/trl) ships its training scripts with script headers, so SFT, DPO, GRPO and the other trainers run the same way. This fine-tunes a small model on a chat dataset:

```bash
hf jobs uv run --flavor a10g-small --timeout 30m -s HF_TOKEN -- \
  https://raw.githubusercontent.com/huggingface/trl/refs/heads/main/trl/scripts/sft.py \
  --model_name_or_path Qwen/Qwen2-0.5B-Instruct \
  --dataset_name trl-lib/Capybara \
  --max_steps 100 \
  --output_dir Qwen2-0.5B-SFT \
  --push_to_hub
```

This finishes in about six minutes. Remove `--max_steps` for the full run: three epochs of Capybara, the script's default, take about 2 h 20 min on `a10g-small`, so raise `--timeout` with it. TRL's own docs use `a100-large`, which is faster.

The full guide, including writing your own TRL script and running the `huggingface/trl` image, is [Training with Jobs](https://huggingface.co/docs/trl/jobs_training) in the TRL docs.

For several GPUs, switch to the TRL image, which ships `accelerate`, and let it start one process per GPU:

```bash
hf jobs run --flavor a10g-largex2 --timeout 30m -s HF_TOKEN huggingface/trl -- \
  accelerate launch --num_processes 2 -m trl.scripts.sft \
  --model_name_or_path Qwen/Qwen2-0.5B-Instruct \
  --dataset_name trl-lib/Capybara \
  --max_steps 100 \
  --output_dir Qwen2-0.5B-SFT \
  --push_to_hub
```

Without `--max_steps`, the full run (three epochs of Capybara, the script's default) takes about 1 h 35 min on two A10Gs.

When you write your own TRL script, the launch config can travel with it. A `[tool.hf-jobs]` table in the script header sets the flavor, timeout and secrets:

```python
# /// script
# dependencies = ["trl"]
#
# [tool.hf-jobs]
# flavor  = "a10g-small"
# timeout = "1h"
# secrets = ["HF_TOKEN"]
# ///
from trl import SFTConfig, SFTTrainer
...
```

`hf jobs uv run train.py` then needs no flags, and a flag you do pass still wins. See [Define the launch config in the script](./jobs-configuration#define-the-launch-config-in-the-script).

## Unsloth

[Unsloth](https://unsloth.ai) provides ready-to-run scripts in the [`unsloth/jobs`](https://huggingface.co/datasets/unsloth/jobs) dataset, one per model family. They install Unsloth from the script header and take the dataset and output repo as arguments:

```bash
hf jobs uv run --flavor a10g-small --timeout 30m -s HF_TOKEN -- \
  https://huggingface.co/datasets/unsloth/jobs/resolve/main/sft-lfm2.5.py \
  --dataset mlabonne/FineTome-100k \
  --max-steps 50 \
  --output-repo your-username/lfm-finetuned
```

This finishes in about five minutes and pushes a LoRA adapter. For a full epoch, replace `--max-steps 50` with `--num-epochs 1` and raise `--timeout`. The walkthrough is [Fine-tune with Unsloth on Jobs](https://huggingface.co/blog/unsloth-jobs) on the Hugging Face blog.

## Axolotl

[Axolotl](https://docs.axolotl.ai) takes a YAML config and runs from its own Docker image, so this section uses `hf jobs run` with a pinned tag and syncs the config in from a local directory with `-v`. Save a config from the [Axolotl examples](https://github.com/axolotl-ai-cloud/axolotl/tree/main/examples) as `./configs/lora.yml`, with the keys below added. The image already contains the `axolotl` command.

```bash
hf jobs run --flavor a10g-small --timeout 30m -s HF_TOKEN \
  -v ./configs:/configs \
  axolotlai/axolotl:0.19.0-py3.12-cu130-2.12.1 -- \
  axolotl train /configs/lora.yml
```

`-v ./configs:/configs` uploads the local `configs` directory to your private `jobs-artifacts` bucket (created for you on first use) and mounts it read-only in the container, so the YAML on your disk is the YAML the run uses. Output is set in the YAML. These keys push the model at the end of the run, and `max_steps` caps this trial run:

```yaml
hub_model_id: your-username/my-adapter
hub_strategy: end
hub_private_repo: true
max_steps: 20
```

Remove `max_steps` for the full run. Tags are listed on [Docker Hub](https://hub.docker.com/r/axolotlai/axolotl/tags).

For more GPUs, change the flavor and nothing else: on `a10g-largex4`, `axolotl train` starts one process per GPU by itself. DeepSpeed and FSDP are then a matter of YAML keys, covered in [Axolotl's multi-GPU guide](https://docs.axolotl.ai/docs/multi-gpu.html).

## Going further

- [Serve Models](./jobs-serving) to put the model you trained behind a temporary endpoint, for an evaluation run or a demo. [Inference Endpoints](https://huggingface.co/docs/inference-endpoints) runs one that stays up.
- [Configuration](./jobs-configuration) for secrets, environment variables, volumes and the `[tool.hf-jobs]` header that lets a script carry its own flavor and timeout.
- [Manage Jobs](./jobs-manage) for listing, inspecting, debugging and cancelling Jobs.
- [Process Large Datasets](./jobs-large-datasets) for streaming and mounting data that does not fit the disk.
- [Schedule Jobs](./jobs-schedule) to run a training command on a timer.
- [Examples & Tutorials](./jobs-examples) for community write-ups, including vision-language fine-tuning and streaming large datasets into a training run.
- [Use Jobs from a coding agent](./jobs-examples#coding-agent-skills): the `hf` CLI skill lets Claude Code, Codex and Cursor launch and watch these runs for you.
