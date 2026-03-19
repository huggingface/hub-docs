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

## Getting leaderboard rankings

The leaderboard API returns ranked model scores for a benchmark dataset:

```
GET https://huggingface.co/api/datasets/{dataset_id}/leaderboard
```

Each entry includes the model's rank, score, model ID, and the submitting organization's avatar:

```python
import requests

resp = requests.get(
    "https://huggingface.co/api/datasets/SWE-bench/SWE-bench_Verified/leaderboard"
)
entries = resp.json()

for entry in entries[:5]:
    print(f"#{entry['rank']} {entry['modelId']}: {entry['value']}")
```

```
#1 Qwen/Qwen3.5-397B-A17B: 76.4
#2 MiniMaxAI/MiniMax-M2.5: 75.8
#3 stepfun-ai/Step-3.5-Flash: 74.4
...
```

> [!TIP]
> For gated benchmark datasets, pass an authorization header:
> ```python
> headers = {"Authorization": "Bearer hf_..."}
> resp = requests.get(url, headers=headers)
> ```

> [!TIP]
> Curl one-liner for quick access (useful for scripting):
> ```bash
> curl https://huggingface.co/api/datasets/cais/hle/leaderboard \
>   --header "Authorization: Bearer $(cat ~/.cache/huggingface/token)" | jq .
> ```

### Response fields

Each leaderboard entry contains:

| Field | Description |
|---|---|
| `rank` | Position on the leaderboard |
| `modelId` | Full model ID (e.g. `Qwen/Qwen3.5-397B-A17B`) |
| `value` | The benchmark score |
| `verified` | Whether the result has been independently verified |
| `author` | Organization/user info including `avatarUrl` |
| `source` | Where the result was submitted from (model card, external, etc.) |
| `filename` | Path to the eval results YAML file (e.g. `.eval_results/swe_bench_verified.yaml`) |
| `pullRequest` | PR number for the submission on the benchmark dataset repo |

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

## Example: building on leaderboard data

The [Benchmark Leaderboard Race](https://huggingface.co/spaces/davanstrien/benchmark-race) Space combines these data sources to create an animated visualization of how model rankings evolve over time. You can build your own analyses and visualizations on top of this data — see the [source code](https://huggingface.co/spaces/davanstrien/benchmark-race/tree/main) for a complete example.

## Related

- [Eval Results](./eval-results) — how to submit evaluation results and register benchmarks
- [Official Benchmark Datasets](https://huggingface.co/datasets?benchmark=benchmark:official&sort=trending) — browse all official benchmarks
