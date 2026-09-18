# Train Models on Jobs

A Job gives a training run a GPU for exactly as long as it needs one. You launch from your laptop, the run pushes its weights to the Hub, and the machine goes away when it finishes. There is no environment to set up on the GPU side: the script or image you launch brings its own.

This page shows the launch command for the most common training libraries. Each library's own guide covers what to train and how; the job here is to get the run started.

## How a training Job is put together

Every command below has the same four parts.

- **What runs.** Either a uv script, launched with `hf jobs uv run`, which installs the dependencies declared in the script's header into a fresh environment, or a library's Docker image, launched with `hf jobs run`, which runs the library that is installed in the image. Libraries that ship a self-contained script use the first form; libraries that ship a tuned image use the second. See [Using Docker images](./jobs-popular-images) for the trade-off.
- **A token.** Jobs get no Hugging Face token by default. `-s HF_TOKEN` forwards yours as a secret, so the run can push its model and read gated or private inputs. Without it, a run that trains for an hour fails at the push.
- **Hardware and time.** `--flavor` picks the GPU and `--timeout` raises the default of 30 minutes. A run that hits the timeout is stopped and its container is discarded, so set it above your expected run time. See [Hardware flavor](./jobs-configuration#hardware-flavor) and [Timeout](./jobs-configuration#timeout).
- **Where the output goes.** The container's disk is gone when the Job ends. Every library below can push the finished model to a Hub repo; pass the repo name through the library's own option, shown in each example.

For runs long enough that a timeout or a crash would cost real money, write checkpoints to a mounted bucket as you go. See [Keep checkpoints across runs](#keep-checkpoints-across-runs) at the end of this page.

## Transformers

The [example scripts](https://github.com/huggingface/transformers/tree/main/examples/pytorch) in the Transformers repository declare their dependencies in a script header, so they run on Jobs straight from their GitHub URL. Arguments after the URL go to the script:

```bash
hf jobs uv run --flavor a10g-small --timeout 2h -s HF_TOKEN \
  https://raw.githubusercontent.com/huggingface/transformers/main/examples/pytorch/image-classification/run_image_classification.py \
  --model_name_or_path google/vit-base-patch16-224-in21k \
  --dataset_name ethz/food101 \
  --output_dir vit-food101 \
  --push_to_hub
```

`--push_to_hub` uploads the model under your namespace using the output directory name. Scripts exist for text classification, summarization, translation, token classification, speech recognition and more.

## TRL

[TRL](https://huggingface.co/docs/trl) ships its training scripts with script headers, so SFT, DPO, GRPO and the other trainers run the same way. This fine-tunes a small model on a chat dataset:

```bash
hf jobs uv run --flavor a100-large --timeout 2h -s HF_TOKEN \
  https://raw.githubusercontent.com/huggingface/trl/refs/heads/main/trl/scripts/sft.py \
  --model_name_or_path Qwen/Qwen2-0.5B-Instruct \
  --dataset_name trl-lib/Capybara \
  --output_dir Qwen2-0.5B-SFT \
  --push_to_hub
```

For a shorter command with tuned defaults, [TRL Jobs](https://github.com/huggingface/trl-jobs) wraps the same launch: `trl-jobs sft --model_name Qwen/Qwen3-0.6B --dataset_name trl-lib/Capybara`. The full guide, including writing your own TRL script and running the `huggingface/trl` image, is [Training with Jobs](https://huggingface.co/docs/trl/jobs_training) in the TRL docs.

## Unsloth

[Unsloth](https://unsloth.ai) provides ready-to-run scripts in the [`unsloth/jobs`](https://huggingface.co/datasets/unsloth/jobs) dataset, one per model family. They install Unsloth from the script header and take the dataset and output repo as arguments:

```bash
hf jobs uv run --flavor a10g-small --timeout 4h -s HF_TOKEN \
  https://huggingface.co/datasets/unsloth/jobs/resolve/main/sft-lfm2.5.py \
  --dataset mlabonne/FineTome-100k \
  --num-epochs 1 \
  --output-repo your-username/lfm-finetuned
```

The walkthrough is [Fine-tune with Unsloth on Jobs](https://huggingface.co/blog/unsloth-jobs) on the Hugging Face blog.

## Axolotl

[Axolotl](https://docs.axolotl.ai) is configured with a YAML file and run from its own Docker image, so this is the image form: `hf jobs run` with a pinned tag, and the config synced in from a local directory with `-v`. The image already contains the `axolotl` command and the `hf` CLI.

```bash
hf jobs run --flavor a10g-small --timeout 2h -s HF_TOKEN \
  -v ./configs:/configs \
  axolotlai/axolotl:0.19.0-py3.12-cu130-2.12.1 -- \
  axolotl train /configs/lora.yml
```

`-v ./configs:/configs` uploads the local `configs` directory to your private `jobs-artifacts` bucket and mounts it read-only in the container, so the YAML on your disk is the YAML the run uses. The output side is set in the YAML, which is how Axolotl pushes a model anywhere:

```yaml
hub_model_id: your-username/my-adapter
hub_strategy: end
hub_private_repo: true
```

Any example from the [Axolotl examples](https://github.com/axolotl-ai-cloud/axolotl/tree/main/examples) works with those three lines added. Pin an image tag from [Docker Hub](https://hub.docker.com/r/axolotlai/axolotl/tags) rather than `main-latest`, so a rerun next month starts the same software.

## Keep checkpoints across runs

A Job's disk is discarded when the Job ends, whether it finished, failed or timed out. For a run that takes hours, mount a [Storage Bucket](./storage-buckets) read-write and point the library's output directory at it. Checkpoints are written to the bucket as they are saved, and the next Job can resume from them:

```bash
hf jobs uv run --flavor a10g-large --timeout 8h -s HF_TOKEN \
  -v hf://buckets/your-username/checkpoints:/ckpt \
  train.py --output_dir /ckpt/run-01
```

Transformers and TRL scripts take `--output_dir`; Axolotl takes `output_dir` in the YAML. To continue an interrupted run, mount the same bucket again and pass the library's resume option, such as `--resume_from_checkpoint` for a Transformers `Trainer`. See [Volumes](./jobs-configuration#volumes) for the mount options.

## Going further

- [Configuration](./jobs-configuration) for secrets, environment variables, volumes and the `[tool.hf-jobs]` header that lets a script carry its own flavor and timeout.
- [Examples & Tutorials](./jobs-examples) for community write-ups, including vision-language fine-tuning and streaming large datasets into a training run.
