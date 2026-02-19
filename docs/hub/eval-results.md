# Evaluation Results

> [!WARNING]
> This is a work in progress feature.

The Hub provides a decentralized system for tracking model evaluation results. Benchmark datasets host leaderboards, and model repos store evaluation scores that automatically appear on both the model page and the benchmark's leaderboard.

## Benchmark Datasets

Dataset repos can be defined as **Benchmarks** (e.g., [MMLU-Pro](https://huggingface.co/datasets/TIGER-Lab/MMLU-Pro), [HLE](https://huggingface.co/datasets/cais/hle), [GPQA](https://huggingface.co/datasets/Idavidrein/gpqa)). These display a "Benchmark" tag and automatically aggregate evaluation results from model repos across the Hub and display a leaderboard of top models.

![Benchmark Dataset](https://huggingface.co/huggingface/documentation-images/resolve/main/evaluation-results/benchmark-preview.png)

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
  value: 20.90                    # Required. Metric value
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
  value: 0.412
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

## Registering a Benchmark

To register your dataset as a benchmark:

1. Create a dataset repo containing your evaluation data
2. Add an `eval.yaml` file to the repo root with your benchmark configuration, conform to the specification defined below.
3. The file is validated at push time
4. (**Beta**) Get in touch so we can add it to the allow-list.

Examples can be found in these benchmarks: [GPQA](https://huggingface.co/datasets/Idavidrein/gpqa/blob/main/eval.yaml), [MMLU-Pro](https://huggingface.co/datasets/TIGER-Lab/MMLU-Pro/blob/main/eval.yaml), [HLE](https://huggingface.co/datasets/cais/hle/blob/main/eval.yaml), [GSM8K](https://huggingface.co/datasets/openai/gsm8k/blob/main/eval.yaml).

## Eval.yaml specification

The `eval.yaml` should contain the following fields:

- `name` — Human-readable display name for the benchmark (e.g. `"Humanity's Last Exam"`).
- `description` — Short description of what the benchmark measures.
- `evaluation_framework` — Canonical evaluation framework identifier for this benchmark. This is an enumerable which the Hugging Face team maintains. Add your own to the list [here](https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/eval.ts). Exactly one framework is supported per benchmark.
- `tasks[]` — List of tasks (sub-leaderboards) defined by this benchmark (see below).

Required fields in each `tasks[]` item:

- `id` — Unique identifier for the task. (e.g. `"gpqa_diamond"`). A single benchmark can define several tasks, each producing its own leaderboard. Feel free to choose a leaderboard identifier for each task.

Optional fields in each `tasks[]` item:

- `config` — Configuration of the Hugging Face dataset to evaluate (e.g. `"default"`). Defaults to the dataset's default config.
- `split` — Split of the Hugging Face dataset to evaluate (e.g. `"test"`). Defaults to `"test"`.

When setting `evaluation_framework: inspect-ai`, one also requires to set the following fields:

- `field_spec` — Specification of the input and output fields. Consists of `input`, `target`, `choices` and optional `input_image` subfields. See the [docs](https://inspect.aisi.org.uk/tasks.html#hugging-facehttps://inspect.aisi.org.uk/tasks.html#hugging-face) for more details.
- `solvers` — Solvers used to go from input to output using the AI model. This can range from a simple system prompt to self-critique loops. See the [docs](https://inspect.aisi.org.uk/solvers.html) for more details.
- `scores` — Scorers used. Scorers determine whether solvers were successful in finding the right output for the target defined in the dataset, and in what measure. See the [docs](https://inspect.aisi.org.uk/scorers.html) for more details.

Minimal example (required fields only):

```yaml
name: MathArena AIME 2026
description: The American Invitational Mathematics Exam (AIME).
evaluation_framework: math-arena

tasks:
  - id: MathArena/aime_2026

Extended example:

```yaml
name: MathArena AIME 2026
description: The American Invitational Mathematics Exam (AIME).
evaluation_framework: "math-arena"

tasks:
  - id: MathArena/aime_2026
    config: default
    split: test
```

Extended example (`"inspect-ai"`-specific):

```yaml
name: Humanity's Last Exam
description: >
  Humanity's Last Exam (HLE) is a multi-modal benchmark at the frontier of human
  knowledge, designed to be the final closed-ended academic benchmark of its
  kind with broad subject coverage. Humanity's Last Exam consists of 2,500
  questions across dozens of subjects, including mathematics, humanities, and
  the natural sciences. HLE is developed globally by subject-matter experts and
  consists of multiple-choice and short-answer questions suitable for automated
  grading.
evaluation_framework: "inspect-ai"

tasks:
  - id: hle
    config: default
    split: test

    field_spec:
      input: question
      input_image: image
      target: answer

    solvers:
      - name: system_message
        args:
          template: |
            Your response should be in the following format:
            Explanation: {your explanation for your answer choice}
            Answer: {your chosen answer}
            Confidence: {your confidence score between 0% and 100% for your answer}
      - name: generate

    scorers:
      - name: model_graded_fact
        args:
          model: openai/o3-mini
```
