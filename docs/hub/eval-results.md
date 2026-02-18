# Evaluation Results

> [!WARNING]
> This is a work in progress feature.

The Hub provides a decentralized system for tracking model evaluation results. Benchmark datasets host leaderboards, and model repos store evaluation scores that automatically appear on both the model page and the benchmark's leaderboard.

## Benchmark Datasets

Dataset repos can be defined as **Benchmarks** (e.g., [MMLU-Pro](https://huggingface.co/datasets/TIGER-Lab/MMLU-Pro), [HLE](https://huggingface.co/datasets/cais/hle), [GPQA](https://huggingface.co/datasets/Idavidrein/gpqa)). These display a "Benchmark" tag and automatically aggregate evaluation results from model repos across the Hub and display a leaderboard of top models.

![Benchmark Dataset](https://huggingface.co/huggingface/documentation-images/resolve/main/evaluation-results/benchmark-preview.png)

### Registering a Benchmark

To register your dataset as a benchmark:

1. Create a dataset repo containing your evaluation data
2. Add an `eval.yaml` file to the repo root with your benchmark configuration, conform the specification defined below.
3. The file is validated at push time
4. (**Beta**) Get in touch so we can add it to the allow-list.

Examples can be found in these benchmarks: [GPQA](https://huggingface.co/datasets/Idavidrein/gpqa/blob/main/eval.yaml), [MMLU-Pro](https://huggingface.co/datasets/TIGER-Lab/MMLU-Pro/blob/main/eval.yaml), [HLE](https://huggingface.co/datasets/cais/hle/blob/main/eval.yaml), [GSM8K](https://huggingface.co/datasets/openai/gsm8k/blob/main/eval.yaml).

## Eval.yaml specification

The `eval.yaml` should contain the following fields:

- `name` — Human-readable display name for the benchmark (e.g. `"Humanity's Last Exam"`).
- `description` — Short description of what the benchmark measures.
- `evaluation_framework` — Canonical evaluation framework identifier for this benchmark (e.g. `"inspect-ai"`, `"math-arena"`, `"verifiers"`, `"helm"`). This is an enumerable which the Hugging Face team maintains. Exactly one framework is supported per benchmark.
- `metrics[]` — List of metrics this benchmark tracks (see below).
- `tasks[]` — List of tasks (sub-leaderboards) defined by this benchmark (see below).

Required fields in each `metrics[]` item:

- `id` — Unique identifier for the metric (e.g. `"accuracy"`, `"wer"`). Model eval results reference this id via `metric_id`.

Optional fields in each `metrics[]` item:

- `higher_is_better` — Boolean indicating sort direction: `true` if higher values are better, `false` otherwise. Defaults to `true`.
- `primary` — Boolean marking the primary ranking metric. Required only when there are multiple metrics; in that case, exactly one metric must be `true`.

Required fields in each `tasks[]` item:

- `id` — Unique identifier for the task. (e.g. `"gpqa_diamond"`). A single benchmark can define several tasks, each producing its own leaderboard. Feel free to choose a leaderboard identifier for each task.

Optional fields in each `tasks[]` item:

- `config` — Dataset configuration/subset name to evaluate (e.g. `"default"`). Defaults to the dataset's default config.
- `split` — Dataset split to evaluate (e.g. `"test"`). Defaults to the dataset's default split.

Minimal example (required fields only):

```yaml
name: "Humanity's Last Exam"
description: "Multi-modal benchmark at the frontier of human knowledge."
evaluation_framework: "inspect-ai"

metrics:
  - id: "accuracy"

tasks:
  - id: "hle"
```

Extended example:

```yaml
name: "Humanity's Last Exam"
description: "Multi-modal benchmark at the frontier of human knowledge."
evaluation_framework: "inspect-ai"

metrics:
  - id: "accuracy"
    higher_is_better: true
    primary: true
  - id: "cost"
    higher_is_better: false

tasks:
  - id: hle
    config: default
    split: test
```

## Model Evaluation Results

Evaluation scores are stored in model repos as YAML files in the `.eval_results/` folder. These results:

- Appear on the model page with links to the benchmark leaderboard
- Are aggregated into the benchmark dataset's leaderboards
- Can be submitted via PRs and marked as "community-provided"

![Model Evaluation Results](https://huggingface.co/huggingface/documentation-images/resolve/main/evaluation-results/eval-results-previw.png)

### Adding Evaluation Results

To add evaluation results to a model, you can submit a PR to the model repo with a YAML file in the `.eval_results/` folder.

Create a YAML file in `.eval_results/*.yaml` in your model repo:

```yaml
- dataset:
    id: cais/hle                  # Required. Hub dataset ID (must be a Benchmark)
    task_id: default              # Required. ID of the Task, as defined in the dataset's eval.yaml
    revision: <hash>              # Optional. Dataset revision hash
  metrics:
    - metric_id: "accuracy"       # Required. Metric id
      value: 20.90                # Required. Metric value
  verifyToken: <token>            # Optional. Cryptographic proof of auditable evaluation
  date: "2025-01-15"              # Optional. ISO-8601 date or datetime (defaults to git commit time)
  source:                         # Optional. Attribution for this result, for instance a repo containing output traces or a Paper
    url: https://huggingface.co/spaces/SaylorTwift/smollm3-mmlu-pro  # Required if source provided
    name: Eval traces             # Optional. Display name
    user: SaylorTwift             # Optional. HF username/org
  notes: "no-tools"               # Optional. Details about the evaluation setup (e.g., "tools", "no-tools", etc.)
```

Or, with only the required attributes:

```yaml
- dataset:
    id: Idavidrein/gpqa
    task_id: gpqa_diamond
  metrics:
    - metric_id: "accuracy"
      value: 20.90
```

Results display badges based on their metadata in the YAML file:

| Badge | Condition |
|-------|-----------|
| verified | A `verifyToken` is valid (evaluation ran in HF Jobs with inspect-ai) |
| community | Result submitted via open PR (not merged to main) |
| leaderboard | Links to the benchmark dataset |
| source | Links to evaluation logs or external source |

For more details on how to format this data, check out the [Eval Results](https://github.com/huggingface/hub-docs/blob/main/eval_results.yaml) specifications.

### Community Contributions

Anyone can submit evaluation results to any model via Pull Request:

1. Go to the model page and click on the "Community" tab and open a Pull Request.
3. Add a `.eval_results/*.yaml` file with your results.
4. The PR will show as "community-provided" on the model page while open.

For help evaluating a model, see the [Evaluating models with Inspect](https://huggingface.co/docs/inference-providers/guides/evaluation-inspect-ai) guide.
