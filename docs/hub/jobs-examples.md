# Examples & Tutorials

## Guides to train with Jobs

Guides for using popular libraries with Jobs:

- [Training with TRL on Jobs](https://huggingface.co/docs/trl/jobs_training) - Run SFT, GRPO, DPO and more using TRL and TRL Jobs
- [Fine-tune with Unsloth on Jobs](https://huggingface.co/blog/unsloth-jobs) - ~2x faster training and ~60% less VRAM using Unsloth
- [Transformers example scripts](https://github.com/huggingface/transformers/tree/main/examples/pytorch) - UV-compatible training scripts for text classification, summarization, image classification, NER, speech recognition, and more — run directly on Jobs:

```bash
hf jobs uv run --flavor a10g-small --secrets HF_TOKEN \
  https://raw.githubusercontent.com/huggingface/transformers/main/examples/pytorch/image-classification/run_image_classification.py \
  --model_name_or_path google/vit-base-patch16-224-in21k \
  --dataset_name ethz/food101 \
  --output_dir vit-food101 \
  --push_to_hub
```

## UV Scripts

The [uv-scripts](https://huggingface.co/uv-scripts) organization maintains a collection of self-contained uv scripts that run on Jobs with a single command. Scripts cover OCR, batch inference, text classification, object detection, dataset statistics, embedding visualization, and more.

[Unsloth](https://huggingface.co/datasets/unsloth/jobs) also provides ready-to-run training scripts for fine-tuning LLMs and VLMs on Jobs.

## Coding Agent Skills

The [hugging-face-jobs skill](https://github.com/huggingface/skills/tree/main/skills/hugging-face-jobs) lets coding agents like Claude Code and Cursor submit and monitor Jobs directly from your editor.

## Community Tutorials and Projects

- [Train on massive datasets without downloading](https://danielvanstrien.xyz/posts/2026/hf-streaming-unsloth/train-massive-datasets-without-downloading.html) - Stream datasets directly on Jobs with Unsloth, no local storage needed
- [Fine-tune a vision-language model with TRL](https://danielvanstrien.xyz/posts/2025/iconclass-vlm-sft/trl-vlm-fine-tuning-iconclass.html) - Fine-tune Qwen2.5-VL for art history tasks using TRL and Jobs
- [FreeFlow](https://github.com/wjbmattingly/freeflow) - Open-source annotation platform with built-in Jobs integration for training YOLOv11 object detection models

---

Have a tutorial or project using Jobs? [Open a PR](https://github.com/huggingface/hub-docs/edit/main/docs/hub/jobs-examples.md) to add it here.
