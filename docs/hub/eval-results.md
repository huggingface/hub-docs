# Evaluation Results

> [!WARNING]
> This is a work in progress feature.

The Hub provides a decentralized system for tracking model evaluation results. Benchmark datasets host leaderboards, and model repos store evaluation scores that automatically appear on both the model page and the benchmark leaderboard.

## Benchmark Datasets

Dataset repos can be defined as **Benchmarks** (for example [MMLU-Pro](https://huggingface.co/datasets/TIGER-Lab/MMLU-Pro), [HLE](https://huggingface.co/datasets/cais/hle), and [GPQA](https://huggingface.co/datasets/Idavidrein/gpqa)). These display a "Benchmark" tag and aggregate evaluation results from model repos across the Hub.

![Benchmark Dataset](https://huggingface.co/huggingface/documentation-images/resolve/main/evaluation-results/benchmark-preview.png)

### Registering a Benchmark

To register your dataset as a benchmark:

1. Create a dataset repo containing your evaluation data.
2. Add an `eval.yaml` file to the dataset repo root.
3. Push changes; the file is validated at push time.
4. (**Beta**) Get in touch so we can add it to the allow-list by commenting on the [discussion](https://huggingface.co/spaces/OpenEvals/README/discussions/2).

Required top-level fields in `eval.yaml`:

- `name` — Human-readable display name for the benchmark (e.g. `"Humanity's Last Exam"`).
- `description` — Short description of what the benchmark measures.
- `metrics[]` — List of metrics this benchmark tracks (see below).
- `tasks[]` — List of tasks (sub-leaderboards) defined by this benchmark (see below).

Required fields in each `metrics[]` item:

- `id` — Unique identifier for the metric (e.g. `"accuracy"`, `"wer"`). Model eval results reference this id via `metric_id`.
- `display_name` — Human-readable label shown on the leaderboard (e.g. `"Top-1 Accuracy"`).
- `higher_is_better` — Boolean indicating sort direction: `true` if higher values are better, `false` otherwise.
- `primary` — Boolean marking the primary ranking metric. Required when there are multiple metrics; exactly one metric must be `true`.

Required fields in each `tasks[]` item:

- `id` — Unique identifier for the task (e.g. `"default"`, `"gpqa_diamond"`). A single benchmark can define several tasks, each producing its own leaderboard.
- `dataset.id` — The Hugging Face dataset id that contains the evaluation data (e.g. `"cais/hle"`).
- `dataset.revision` — Full commit SHA of the dataset revision to evaluate against. Required to ensure reproducibility.

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

Examples can be found in these benchmarks: [GPQA](https://huggingface.co/datasets/Idavidrein/gpqa/blob/main/eval.yaml), [MMLU-Pro](https://huggingface.co/datasets/TIGER-Lab/MMLU-Pro/blob/main/eval.yaml), [HLE](https://huggingface.co/datasets/cais/hle/blob/main/eval.yaml), and [GSM8K](https://huggingface.co/datasets/openai/gsm8k/blob/main/eval.yaml).

## Model Evaluation Results

Evaluation scores are stored in model repos as YAML files in the `.eval_results/` folder. These results:

- Appear on the model page with links to the benchmark leaderboard.
- Are aggregated into benchmark dataset leaderboards.
- Can be submitted via PRs and marked as community-provided while the PR is open.

![Model Evaluation Results](https://huggingface.co/huggingface/documentation-images/resolve/main/evaluation-results/eval-results-previw.png)

### Adding Evaluation Results

To add evaluation results to a model, submit a PR to the model repo with a YAML file in `.eval_results/<benchmark_repo_name>.yaml`, where `<benchmark_repo_name>` is the lowercased, hyphen-to-underscore repo name part of the benchmark's HF dataset id (for example `cais/hle` → `.eval_results/hle.yaml`, `ScaleAI/SWE-bench_Pro` → `.eval_results/swe_bench_pro.yaml`).

Each file should contain one or more run entries. Required fields per run entry:

- `dataset.id` — The Hugging Face dataset id of the benchmark (e.g. `"cais/hle"`). Must match a dataset that has a "Benchmark" tag.
- `dataset.task_id` — ID of the task as defined in the benchmark's `eval.yaml` (e.g. `"default"`, `"gpqa_diamond"`).
- `metrics[]` — One or more metrics for the same run (see below).

Required fields per `metrics[]` item:

- `metric_id` — Must match a metric `id` defined in the benchmark's `eval.yaml` (e.g. `"accuracy"`).
- `value` — The numeric score for this metric (e.g. `20.90`).

Optional fields per run entry:

- `dataset.revision` — Full commit SHA of the dataset revision used. Recommended for reproducibility.
- `model_revision` — Full commit SHA of the model revision evaluated. Recommended for reproducibility.
- `framework.name` — Name of the evaluation framework (e.g. `"inspect-ai"`, `"lighteval"`). Omit if unknown (e.g. results from a paper).
- `framework.version` — Version of the evaluation framework (e.g. `"0.4.2"`).
- `framework.command` — The command used to run the evaluation (e.g. `"inspect eval theory.py --model openai/gpt-4"`).
- `source.url` — A link to evaluation logs, a paper, or another external source (required if `source` is provided).
- `source.name` — Human-readable name for the source (e.g. `"Eval Logs"`).
- `date` — When the evaluation was run, as an ISO-8601 date or datetime string. Defaults to the file creation time in git if not provided.
- `notes` — Free-text details about the evaluation setup (e.g. `"tools"`, `"no-tools"`, `"chain-of-thought"`).
- `verify_token` — A signed token proving the evaluation is auditable and reproducible (see [Verification Flow](#verification-flow) below).

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

Results display badges based on their metadata:

| Badge | Condition |
|-------|-----------|
| verified | A `verify_token` passes signature, trust, freshness, and claim matching checks |
| community | Result submitted via an open PR (not merged to main) |
| leaderboard | Links to the benchmark dataset |
| source | Links to evaluation logs or another external source |

For more details on formatting, see the [Eval Results](https://github.com/huggingface/hub-docs/blob/main/eval_results.yaml) specification.

### Verification Flow

Verification is based on signed evidence, not user-declared status flags.

1. A framework runs evaluation against pinned model and benchmark revisions.
2. The framework builds a canonical claims payload from run output.
3. The framework obtains a signed `verify_token` from a trusted issuer.
4. The framework opens a PR and includes both run entries and verification material.
5. Hub services validate token signature, issuer trust, freshness, and claim matching.
6. Result provenance (for example `verified` vs `unverified`) is computed server-side.

At minimum, token claims should bind to:

- `model_repo`, `model_revision`
- `benchmark_repo`, `benchmark_revision`
- `task_id`
- `metrics` (canonical ordered list of `{metric_id, value}`)
- `framework.name`, `framework.version`, `framework.command`

### Token Issuance Authentication and Authorization

Token issuers must authenticate caller identity and enforce per-framework authorization.

Authentication requirements:

- Caller authenticates with machine identity (for example OAuth app, scoped PAT, or OIDC workload identity).
- Caller identity maps to a registered framework integration.
- Anonymous callers are never eligible for verified token issuance.

Authorization and safety requirements:

- A caller can request tokens only for allowed `framework.name` values.
- Issuers may apply policy gates for allowed benchmark repos, orgs, or model repos.
- Issuers should apply rate limits and abuse detection per caller identity.
- Tokens should be short-lived and replay-protected.
- Claims should be bound to exact submitted content via canonical digest fields.

If any validation check fails, the result remains visible but is not marked verified.

### Community Contributions

Anyone can submit evaluation results to any model via Pull Request:

1. Open the model page and create a Pull Request from the "Community" tab.
2. Add a `.eval_results/*.yaml` file with your results.
3. While open, the PR is shown as community-provided on the model page.

For help evaluating a model, see [Evaluating models with Inspect](https://huggingface.co/docs/inference-providers/guides/evaluation-inspect-ai).
