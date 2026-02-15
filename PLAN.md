---
name: Eval Results Target Spec
overview: Define the target benchmark eval.yaml schema and the required contents of evaluation result PRs.
todos:
  - id: define-benchmark-eval-yaml
    content: Define the target eval.yaml schema for benchmarks.
    status: pending
  - id: define-eval-results-pr-content
    content: Define required fields for `.eval_results/*.yaml` files in PR submissions.
    status: pending
  - id: define-verification-flow
    content: Define how frameworks obtain verification tokens and how the Hub validates them.
    status: pending
  - id: define-token-authentication
    content: Define authentication and authorization for token issuance.
    status: pending
isProject: false
---

# Evaluation Results Target Spec

This document only defines the target `eval.yaml` format and the expected content of evaluation result PRs.

## Benchmark `eval.yaml` (target shape)

Required top-level fields:

- `name` — Human-readable display name for the benchmark (e.g. `"Humanity's Last Exam"`).
- `description` — Short description of what the benchmark measures.
- `metrics[]` — List of metrics this benchmark tracks (see below).
- `tasks[]` — List of tasks (sub-leaderboards) defined by this benchmark (see below).

Each `metrics[]` item:

- `id` (required) — Unique identifier for the metric (e.g. `"accuracy"`, `"wer"`). Model eval results reference this id via `metric_id`.
- `display_name` (required) — Human-readable label shown on the leaderboard (e.g. `"Top-1 Accuracy"`).
- `higher_is_better` (required) — Boolean indicating sort direction: `true` if higher values are better, `false` otherwise.
- `primary` (required when there are multiple metrics; exactly one metric must be `true`) — Boolean marking the primary ranking metric.

Each `tasks[]` item:

- `id` (required) — Unique identifier for the task (e.g. `"hle"`, `"gpqa_diamond"`). A single benchmark can define several tasks, each producing its own leaderboard.
- `config` (optional) — Dataset configuration/subset name to use (e.g. `"default"`).
- `split` (optional) — Dataset split to evaluate on (e.g. `"test"`).

Example:

```yaml
name: "Humanity's Last Exam"
description: "Multi-modal benchmark at the frontier of human knowledge."

metrics:
  - id: "accuracy"
    display_name: "Top-1 Accuracy"
    higher_is_better: true
    primary: true
  - id: "wer"
    display_name: "Word Error Rate"
    higher_is_better: false

tasks:
  - id: hle
    config: default
    split: test
```

## Evaluation Result PR Content (target contract)

For each evaluation submission PR:

- Add one file under `.eval_results/<benchmark_repo_name>.yaml`, where `<benchmark_repo_name>` is the lowercased, hyphen-to-underscore repo name part of the benchmark's HF dataset id (for example `cais/hle` → `.eval_results/hle.yaml`, `ScaleAI/SWE-bench_Pro` → `.eval_results/swe_bench_pro.yaml`).
- Include one or more result entries in that file.

Required fields per result entry (run-level):

- `dataset.id` — The Hugging Face dataset id of the benchmark (e.g. `"cais/hle"`). Must match a dataset that has a "Benchmark" tag.
- `dataset.task_id` — ID of the task as defined in the benchmark's `eval.yaml` (e.g. `"default"`, `"gpqa_diamond"`).
- `metrics[]` — One or more metric values for the same run (see below).

Required fields per `metrics[]` item:

- `metric_id` — Must match a metric `id` defined in the benchmark's `eval.yaml` (e.g. `"accuracy"`).
- `value` — The numeric score for this metric (e.g. `20.90`).

Optional fields per result entry:

- `dataset.revision` — Full commit SHA of the dataset revision used. Recommended for reproducibility.
- `model_revision` — Full commit SHA of the model evaluated. Recommended for reproducibility.
- `framework.name` — Name of the evaluation framework (e.g. `"inspect-ai"`, `"lighteval"`). Omit if unknown (e.g. results from a paper).
- `framework.version` — Version of the evaluation framework (e.g. `"0.4.2"`).
- `framework.command` — The exact invocation used to run the evaluation (e.g. `"inspect eval theory.py --model openai/gpt-4"`).
- `verify_token` — A signed token proving the evaluation is auditable and reproducible. Only for verifiable runs (see Verification Flow below).

Minimal example (for example from a paper or blog post):

```yaml
- dataset:
    id: "cais/hle"
    task_id: "default"
  metrics:
    - metric_id: "accuracy"
      value: 20.90
```

Example with full provenance:

```yaml
- dataset:
    id: "cais/hle"
    task_id: "default"
    revision: "5503434ddd753f426f4b38109466949a1217c2bb"
  framework:
    name: "inspect-ai"
    version: "0.4.2"
    command: "inspect eval theory.py --model openai/gpt-4"
  model_revision: "9f3c2c9a1c4e6d1e"
  metrics:
    - metric_id: "accuracy"
      value: 20.90
  verify_token: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9..."
```

## Verification Flow (target behavior)

Verification is based on signed evidence, not user-declared fields.

### Framework-driven PR flow

1. A framework (for example `inspect-ai`, `verifiers`) runs evaluation against pinned model and benchmark revisions.
2. The framework builds a canonical claims payload from the run output.
3. The framework obtains a signed `verify_token` from a trusted issuer.
4. The framework programmatically opens a PR with `huggingface_hub` and includes:
   - `.eval_results/*.yaml` entries
   - `verify_token` for verifiable runs
5. Hub services validate token signature, issuer trust, freshness, and claim/value matching.
6. Result provenance is computed server-side (for example `verified` vs `unverified`), never set by the PR author.

### Required token claims

At minimum, `verify_token` claims should bind to:

- `model_revision` — Identifies the exact model and commit that was evaluated.
- `benchmark_repo`, `benchmark_revision` — Identifies the exact benchmark dataset and commit used.
- `task_id` — The specific task within the benchmark that was evaluated.
- `metrics` — Canonical ordered list of `{metric_id, value}` pairs, ensuring the token is bound to exact scores.
- `framework.name`, `framework.version` — Identifies the evaluation framework and version that produced the results.

### Token issuance authentication and authorization

The token issuer endpoint must authenticate caller identity and enforce per-framework authorization.

Authentication requirements:

- Caller must authenticate with a machine identity (for example OAuth app, scoped PAT, or OIDC workload identity).
- Caller identity must map to a registered framework integration (for example official `inspect-ai` integration).
- Anonymous requests must never be eligible for verified token issuance.

Authorization requirements:

- A caller can request tokens only for allowed `framework.name` values.
- Optional policy gates can restrict allowed benchmark repos, orgs, or model repos per integration.
- Issuer should apply rate limits and abuse detection per caller identity.

Token safety requirements:

- Issued tokens should have short lifetimes.
- Claims must be bound to exact submitted content via canonical digest fields.

### Validation rules

A result can be marked as verified only if all checks pass:

- Token signature is valid.
- Token issuer is trusted.
- Claims match the submitted YAML fields exactly.

If any check fails, the result remains visible but is not marked verified.

## Optional Extensions (non-core spec)

These fields are optional extensions and are not required for core compatibility.

### Optional `eval.yaml` extensions

- Per metric (`metrics[]`):
  - `unit` — Unit of measurement for the metric value (e.g. `"percentage"`, `"usd"`, `"x"`).
  - `aggregation`: `single | macro | micro | weighted | per_class | per_language | per_domain` — How metric values are aggregated across samples or classes.
  - `slice` — Named subset the metric applies to (e.g. `"language=en"`, `"iou=0.50:0.95"`). Useful for breakdowns.
- Per task (`tasks[]`):
  - `display_name` — Human-readable label for the task, shown on the leaderboard UI.

### Optional model PR extensions (`.eval_results/*.yaml`)

- Per run entry:
  - `framework.command` — The exact invocation used to run eval (e.g. `"inspect eval theory.py --model openai/gpt-4"`).
  - `source.url` — A link to evaluation logs, a paper, or another external source for attribution.
  - `date` — When the evaluation was run (ISO-8601 date or datetime string).
  - `notes` — Free-text details about the evaluation setup (e.g. `"tools"`, `"no-tools"`, `"chain-of-thought"`).
  - `run` — Structured run metadata for detailed reproducibility:
    - `framework_version` — Version of the evaluation framework used.
    - `adapter_version` — Version of any adapter or plugin on top of the framework.
    - `dataset_revision` — Commit SHA of the dataset (redundant with `dataset.revision` but useful for nested tooling).
    - `code_revision` — Commit SHA of the evaluation code or harness.
    - `seed` — Random seed used for reproducibility.
    - `num_samples` — Number of samples evaluated.
    - `batch_size` — Batch size used during evaluation.
  - `artifacts` — Predictions, logs, or traces with hashes or URLs for auditability.
  - `runtime_context` — Hardware and environment metadata (important for throughput-sensitive metrics):
    - `compute` — Hardware description (e.g. GPU type and count).
    - `latency` — End-to-end evaluation latency.
    - `budget` — Cost or token budget for the evaluation run.
    - `environment` — Software environment details (e.g. CUDA version, PyTorch version).
- Per metric item (`metrics[]`):
  - `value_type` (`float | int | percentage | rank`) — Data type of the metric value, for correct rendering and comparison.
  - `slice` — Named subset this specific metric value applies to (e.g. `"language=en"`).

## Examples (battle-tested benchmarks)

This section shows concrete examples of what benchmark `eval.yaml` files and model PR entries (`.eval_results/*.yaml`) could look like for three well-known benchmarks.

### 1) SWE-Bench Pro (public)

Reference:
- https://scale.com/leaderboard/swe_bench_pro_public
- https://scaleapi.github.io/SWE-bench_Pro-os/

Observed benchmark conventions to encode:
- Primary metric is accuracy (`% Resolved` on the public leaderboard).
- Public set has a fixed task count and often reports confidence intervals.

#### Example `eval.yaml`

```yaml
name: "SWE-Bench Pro (Public)"
description: "Long-horizon software engineering benchmark on real repositories."

metrics:
  - id: "accuracy"
    display_name: "Accuracy (% Resolved)"
    higher_is_better: true
    unit: "percentage"
    primary: true
  - id: "ci95_half_width"
    display_name: "95% CI (+/-)"
    higher_is_better: false
    unit: "percentage_points"

tasks:
  - id: "SWE-bench_Pro"
    config: "default"
    split: "test"
```

#### Example model PR file (`.eval_results/swe_bench_pro.yaml`)

```yaml
- dataset:
    id: "ScaleAI/SWE-bench_Pro"
    task_id: "public"
    revision: "9d2f4f8f4c1a96d4d6e7c1a1d0c9f3f3d5b7e102"
  framework:
    name: "swe-agent"
    version: "1.0.0"
    command: "sweagent run --dataset ScaleAI/SWE-bench_Pro --subset public --model openai/gpt-5"
  model_revision: "c6b4f7a8c4d94c8b7713b0f85e4df4f8de64a1af"
  metrics:
    - metric_id: "accuracy"
      value: 23.30
    - metric_id: "ci95_half_width"
      value: 3.40
  date: "2026-02-14"
  notes: "turn_limit=250, uncapped cost, accuracy submission"
  source:
    url: "https://scaleapi.github.io/SWE-bench_Pro-os/"
    name: "SWE-Bench Pro OSS leaderboard"
```

#### Gaps and recommended schema changes

- Add `sample_size` per metric item (or per run) to make confidence intervals auditable (`n=730` for public set).
- Add optional `benchmark_subset` at run level when a dataset repo contains multiple subsets (public/private/held-out) that share similar task IDs.

### 2) COCO object detection

Reference:
- https://cocodataset.org/#home
- https://github.com/cocodataset/cocoapi/blob/master/PythonAPI/pycocotools/cocoeval.py

Observed benchmark conventions to encode:
- Canonical detection summary includes AP, AP50, AP75, AP-small/medium/large, and often AR at max detections.
- AP is computed over IoU thresholds 0.50:0.95.

#### Example `eval.yaml`

```yaml
name: "COCO Object Detection"
description: "COCO detection benchmark (bbox)."

metrics:
  - id: "ap"
    display_name: "AP@[IoU=0.50:0.95]"
    higher_is_better: true
    primary: true
    unit: "percentage"
    aggregation: "micro"
  - id: "ap50"
    display_name: "AP@0.50"
    higher_is_better: true
    unit: "percentage"
  - id: "ap75"
    display_name: "AP@0.75"
    higher_is_better: true
    unit: "percentage"
  - id: "aps"
    display_name: "AP Small"
    higher_is_better: true
    unit: "percentage"
  - id: "apm"
    display_name: "AP Medium"
    higher_is_better: true
    unit: "percentage"
  - id: "apl"
    display_name: "AP Large"
    higher_is_better: true
    unit: "percentage"

tasks:
  - id: "phiyodr/coco2017"
    config: "default"
    split: "test"
```

#### Example model PR file (`.eval_results/coco.yaml`)

```yaml
- dataset:
    id: "coco"
    task_id: "bbox_testdev_2017"
    revision: "b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1"
  framework:
    name: "pycocotools"
    version: "2.0.10"
    command: "python eval.py --iouType bbox --maxDets 100 --ann instances_val2017.json --pred preds.json"
  model_revision: "4dd7bb3d0bf8cc2fbf5f3a7645b3f02ae2d6f8ad"
  metrics:
    - metric_id: "ap"
      value: 51.40
    - metric_id: "ap50"
      value: 69.20
    - metric_id: "ap75"
      value: 56.00
    - metric_id: "aps"
      value: 33.10
    - metric_id: "apm"
      value: 55.20
    - metric_id: "apl"
      value: 66.80
  date: "2026-02-14"
  source:
    url: "https://cocodataset.org/"
    name: "COCO benchmark"
```

#### Gaps and recommended schema changes

- No required change for core compatibility (current schema already supports multi-metric COCO summaries).
- Nice-to-have: standardize a structured `metric_context` object (for IoU range, area range, maxDets) instead of encoding these in free-text `slice`.

### 3) MathArena

Reference:
- https://matharena.ai/?view=problem
- https://matharena.ai/competitions

Observed benchmark conventions to encode:
- Many tasks/competitions (AIME, HMMT, IMO, etc.) under one ecosystem.
- Scores are often averaged over 4 attempts and cost is tracked.
- Some competitions allow tool use and some are no-tools.

#### Example `eval.yaml`

```yaml
name: "MathArena"
description: "Uncontaminated math competition benchmark suite."

metrics:
  - id: "accuracy"
    display_name: "Average Accuracy"
    higher_is_better: true
    unit: "percentage"
    primary: true
  - id: "cost_usd"
    display_name: "Average Cost per Full Competition Run (USD)"
    higher_is_better: false
    unit: "usd"
  - id: "attempts"
    display_name: "Number of Attempts"
    higher_is_better: false
    value_type: "int"

tasks:
  - id: "aime_2026"
    config: "default"
    split: "test"
```

#### Example model PR file (`.eval_results/aime_2026.yaml`)

```yaml
- dataset:
    id: "MathArena/aime_2026"
    task_id: "aime_2026"
    revision: "bafec50ab78c16e774241f7fe89e53f242fcb5ad"
  framework:
    name: "matharena-harness"
    version: "0.3.1"
    command: "uv run python scripts/run.py --comp aime/aime_2025 --models openai/gpt-4o"
  model_revision: "8a2f4ef13df15bfc95e46bd9fe5d52be5a95a087"
  metrics:
    - metric_id: "accuracy"
      value: 61.70
    - metric_id: "cost_usd"
      value: 14.83
    - metric_id: "attempts"
      value: 4
  notes: "No external tools"
  source:
    url: "https://matharena.ai/?comp=aime--aime_2026"
    name: "MathArena AIME 2026 leaderboard"
  date: "2026-02-14"
```

### 4) Open ASR Leaderboard

Reference:
- https://github.com/huggingface/open_asr_leaderboard

Observed benchmark conventions to encode:
- Core reported metrics are WER (lower is better) and inverse real-time factor (RTFx, higher is better).
- Results are reported per dataset/task, and reproducibility depends strongly on runtime setup (GPU/driver/CUDA/library versions).

#### Example `eval.yaml`

```yaml
name: "Open ASR Leaderboard"
description: "Reproducible multilingual and long-form ASR evaluation."

metrics:
  - id: "wer"
    display_name: "Word Error Rate"
    higher_is_better: false
    unit: "percentage"
    primary: true
  - id: "rtfx"
    display_name: "Inverse Real-Time Factor"
    higher_is_better: true
    unit: "x"

tasks:
  - id: "librispeech_asr_test_clean"
    config: "librispeech_asr"
    split: "test.clean"
  - id: "common_voice_test_en"
    config: "common_voice"
    split: "test.en"
```

#### Example model PR file (`.eval_results/datasets.yaml`)

```yaml
- dataset:
    id: "esb/datasets"
    task_id: "librispeech_asr_test_clean"
    revision: "f7b5d7210f117f1d4f7b42cd3ec4f31b5573e4f5"
  framework:
    name: "open-asr-leaderboard"
    version: "main"
    command: "python run_eval.py --model_id openai/whisper-large-v3 --dataset librispeech_asr --split test.clean --batch_size 8"
  model_revision: "03e58f7db5f2218d70aeb8ec7f70f9275f95f4dd"
  metrics:
    - metric_id: "wer"
      value: 3.12
    - metric_id: "rtfx"
      value: 148.60
  runtime_context:
    environment: "NVIDIA A100-SXM4-80GB, CUDA 12.6, PyTorch 2.4.0"
  source:
    url: "https://github.com/huggingface/open_asr_leaderboard"
    name: "Open ASR Leaderboard run script and manifests"
  notes: "English normalizer enabled; same decoding hyper-parameters across benchmark datasets"
  date: "2026-02-14"
```

#### Gaps and recommended schema changes

- Add optional `normalization` metadata for text post-processing (for example punctuation/casing/number normalization), since WER comparability depends on this.
- Add first-class hardware fields under `runtime_context` (`gpu`, `driver`, `cuda`, `torch`) because throughput metrics like `rtfx` are hardware-sensitive.