# Evaluation Results

> [!WARNING]
> This is a work in progress feature.

The Hub provides a decentralized system for tracking model evaluation results. Benchmark datasets host leaderboards, and model repos store evaluation scores that automatically appear on both the model page and the benchmark's leaderboard.

## Benchmark Datasets

Dataset repos can be defined as **Benchmarks** (e.g., [AIME](https://huggingface.co/datasets/aime-ai/aime), [HLE](https://huggingface.co/datasets/cais/hle), [GPQA](https://huggingface.co/datasets/Idavidrein/gpqa)). These display a "Benchmark" tag and automatically aggregate evaluation results from model repos across the Hub and display a leaderboard of top models.

![Benchmark Dataset](https://huggingface.co/huggingface/documentation-images/resolve/main/evaluation-results/benchmark-preview.png)

### Registering a Benchmark

To register your dataset as a benchmark:

1. Create a dataset repo containing your evaluation data
2. Add an `eval.yaml` file to the repo root with your benchmark configuration
3. The file is validated at push time

The `eval.yaml` format is based on [Inspect AI](https://inspect.aisi.org.uk/), enabling reproducible evaluations. See the [Evaluating models with Inspect](https://huggingface.co/docs/inference-providers/guides/evaluation-inspect-ai) guide for details on running evaluations.

<!-- TODO: Add example of eval.yaml file -->

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
    config: default               # Optional. Dataset subset/config name
    split: test                   # Optional. e.g., test, validation
    revision: <hash>              # Optional. Dataset revision hash
  value: 20.90                    # Required. Metric value
  verifyToken: <token>            # Optional. Cryptographic proof of auditable evaluation
  date: 2025-01-15T10:30:00Z      # Optional. ISO-8601 datetime (defaults to git commit time)
  source:                         # Optional. Attribution for the result
    url: https://huggingface.co/datasets/cais/hle  # Required if source provided
    name: CAIS HLE                # Optional. Display name
    user: cais                    # Optional. HF username/org
```

Or, with only the required attributes:

```yaml
- dataset:
    id: Idavidrein/gpqa
    config: gpqa_diamond
  value: 0.412
```

Results display badges based on their metadata in the YAML file:

| Badge | Condition |
|-------|-----------|
| verified | A `verifyToken` is valid (evaluation ran in HF Jobs with inspect-ai) |
| community-provided | Result submitted via open PR (not merged to main) |
| leaderboard | Links to the benchmark dataset |
| source | Links to evaluation logs or external source |

### Community Contributions

Anyone can submit evaluation results to any model via Pull Request:

1. Go to the model page and click on the "Community" tab and open a Pull Request.
3. Add a `.eval_results/*.yaml` file with your results.
4. The PR will show as "community-provided" on the model page while open.

For help evaluating a model, see the [Evaluating models with Inspect](https://huggingface.co/docs/inference-providers/guides/evaluation-inspect-ai) guide.