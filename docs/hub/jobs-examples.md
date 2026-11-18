# Examples & Tutorials

## Train models

The launch commands for Transformers, TRL, Unsloth and Axolotl are on [Train Models on Jobs](./jobs-training). Each one links to the library's own guide.

## Process data at scale

[DataTrove](https://github.com/huggingface/datatrove) provides an experimental [`JobsPipelineExecutor`](https://github.com/huggingface/datatrove#jobspipelineexecutor) for distributing data processing pipelines across a pool of Jobs. It supports concurrency limits, multi-stage dependencies, retries, and resumable runs — re-running a pipeline skips tasks that already completed and only runs the remaining ones.

See the ready-to-run examples for:

- [Filtering a Hub dataset](https://github.com/huggingface/datatrove/blob/main/examples/filter_hf_dataset_jobs.py)
- [Tokenizing and merging a Hub dataset](https://github.com/huggingface/datatrove/blob/main/examples/tokenize_hf_dataset_jobs.py)
- [Multi-stage MinHash deduplication](https://github.com/huggingface/datatrove/blob/main/examples/minhash_deduplication_jobs.py)

## UV Scripts

The [uv-scripts](https://huggingface.co/uv-scripts) organization maintains a collection of self-contained uv scripts that run on Jobs with a single command. Scripts cover OCR, batch inference, text classification, object detection, dataset statistics, embedding visualization, and more.

[Unsloth](https://huggingface.co/datasets/unsloth/jobs) also provides ready-to-run training scripts for fine-tuning LLMs and VLMs on Jobs.

## Coding Agent Skills

Coding agents like Claude Code, Codex and Cursor can submit and monitor Jobs for you. Install the `hf` CLI skill, generated from your installed CLI so it stays current:

```bash
hf skills add
```

See [Hugging Face CLI for AI agents](./agents-cli) for setup per agent, and [Agent Skills](./agents-skills) for training and other workflow skills.

## Sandboxes

The [expose ports](./jobs-configuration#expose-ports) feature of Jobs makes them a great fit for building sandboxes, i.e. temporary self-contained environments used by agents and LLM applications.

## Community Tutorials and Projects

- [Train on massive datasets without downloading](https://danielvanstrien.xyz/posts/2026/hf-streaming-unsloth/train-massive-datasets-without-downloading.html) - Stream datasets directly on Jobs with Unsloth, no local storage needed
- [Fine-tune a vision-language model with TRL](https://danielvanstrien.xyz/posts/2025/iconclass-vlm-sft/trl-vlm-fine-tuning-iconclass.html) - Fine-tune Qwen2.5-VL for art history tasks using TRL and Jobs
- [FreeFlow](https://github.com/wjbmattingly/freeflow) - Open-source annotation platform with built-in Jobs integration for training YOLOv11 object detection models
- [hfdask](https://github.com/Hanno-Labs/hfdask) - Run Dask programs across CPU and GPU Jobs from one YAML cluster definition, with mTLS between nodes and automatic cleanup

---

Have a tutorial or project using Jobs? [Open a PR](https://github.com/huggingface/hub-docs/edit/main/docs/hub/jobs-examples.md) to add it here.
