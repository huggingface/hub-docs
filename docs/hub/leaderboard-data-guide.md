# Accessing Benchmark Leaderboard Data

[Benchmark datasets](./eval-results#benchmark-datasets) on the Hub contain leaderboards ranking models by their evaluation scores. You can access this data programmatically to analyse, build dashboards or tools on top of it.

## Discovering official benchmarks

Use `huggingface_hub` to find all official benchmark datasets:

```python
from huggingface_hub import HfApi

api = HfApi()
for ds in api.list_datasets(benchmark=True):
    print(ds.id)
```

Or via the REST API directly (useful for agents and scripting):

```
GET https://huggingface.co/api/datasets?filter=benchmark:official
```

## Getting leaderboard rankings

The leaderboard API returns ranked model scores for a benchmark dataset:

```
GET https://huggingface.co/api/datasets/{dataset_id}/leaderboard
```

Use [`get_dataset_leaderboard`](https://huggingface.co/docs/huggingface_hub/package_reference/hf_api#huggingface_hub.HfApi.get_dataset_leaderboard) to fetch ranked model scores as typed [`DatasetLeaderboardEntry`](https://huggingface.co/docs/huggingface_hub/package_reference/hf_api#huggingface_hub.DatasetLeaderboardEntry) objects:

```python
from huggingface_hub import HfApi

api = HfApi()
leaderboard = api.get_dataset_leaderboard("SWE-bench/SWE-bench_Verified")

for entry in leaderboard[:5]:
    print(f"#{entry.rank} {entry.model_id}: {entry.value}")
```

> [!TIP]
> `huggingface_hub` uses your cached token by default. For gated benchmark datasets, make sure you are logged in (`huggingface-cli login`) or pass a token explicitly:
> ```python
> leaderboard = api.get_dataset_leaderboard("gated/benchmark", token="hf_...")
> ```

> [!TIP]
> Curl one-liner for quick access (useful for agents and scripting):
> ```bash
> curl https://huggingface.co/api/datasets/cais/hle/leaderboard \
>   --header "Authorization: Bearer $(cat ~/.cache/huggingface/token)" | jq .
> ```

### Response fields

Each [`DatasetLeaderboardEntry`](https://huggingface.co/docs/huggingface_hub/package_reference/hf_api#huggingface_hub.DatasetLeaderboardEntry) contains:

| Field | Description |
|---|---|
| `rank` | Position on the leaderboard |
| `model_id` | Full model ID (e.g. `Qwen/Qwen3.5-397B-A17B`) |
| `value` | The benchmark score |
| `verified` | Whether the result has been independently verified |
| `author` | A [`User`](https://huggingface.co/docs/huggingface_hub/package_reference/hf_api#huggingface_hub.User) or [`Organization`](https://huggingface.co/docs/huggingface_hub/package_reference/hf_api#huggingface_hub.Organization) object |
| `source` | Where the result was submitted from (model card, external, etc.) |
| `filename` | Path to the eval results YAML file (e.g. `.eval_results/swe_bench_verified.yaml`) |
| `pull_request` | PR number for the submission on the benchmark dataset repo |
| `notes` | Optional notes associated with the entry |

## Pre-aggregated multi-benchmark dataset

If you want scores from multiple benchmarks in a single file, the [`OpenEvals/leaderboard-data`](https://huggingface.co/datasets/OpenEvals/leaderboard-data) dataset aggregates scores across official benchmarks into one Parquet file:

You can load it directly with [pandas](./datasets-pandas) using the `hf://` path:

```python
import pandas as pd

df = pd.read_parquet(
    "hf://datasets/OpenEvals/leaderboard-data/data/train-00000-of-00001.parquet"
)
print(df[["model_name", "provider", "aime2026_score", "mmluPro_score"]].head())
```

This is the fastest way to get a cross-benchmark view without calling multiple API endpoints.

## Enriching with model metadata

Use `huggingface_hub` to enrich leaderboard data with release dates, parameter counts, and other metadata:

```python
from huggingface_hub import HfApi

api = HfApi()
info = api.model_info("Qwen/Qwen3.5-397B-A17B")

print(f"Released: {info.created_at}")
print(f"Parameters: {info.safetensors.total / 1e9:.1f}B" if info.safetensors else "")
```

## Model-centric view: eval results per model

The leaderboard API gives a dataset-centric view (all models on one benchmark). For the reverse — all benchmark scores for a single model — use `model_info` with `expand=["evalResults"]`:

```python
from huggingface_hub import HfApi

api = HfApi()
info = api.model_info("Qwen/Qwen3.5-397B-A17B", expand=["evalResults"])

for result in info.eval_results:
    print(f"{result.dataset_id}: {result.value}")
```

This returns [`EvalResultEntry`](https://huggingface.co/docs/huggingface_hub/package_reference/hf_api#huggingface_hub.EvalResultEntry) objects parsed from the model's `.eval_results/` files.

## Example: building on leaderboard data

The [Benchmark Leaderboard Race](https://huggingface.co/spaces/davanstrien/benchmark-race) Space combines these data sources to create an animated visualization of how model rankings evolve over time. You can build your own analyses and visualizations on top of this data — see the [source code](https://huggingface.co/spaces/davanstrien/benchmark-race/tree/main) for a complete example.

## Related

- [Eval Results](./eval-results) — how to submit evaluation results and register benchmarks
- [Official Benchmark Datasets](https://huggingface.co/datasets?benchmark=benchmark:official&sort=trending) — browse all official benchmarks
