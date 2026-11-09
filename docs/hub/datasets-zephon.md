# Zephon

[Zephon](https://github.com/datologyai/zephon) is a data loader for foundation model training, built by [DatologyAI](https://www.datologyai.com).
It tokenizes, packs and mixes data while training runs, and it gives the same batches when you change the number of GPUs (elastic determinism).
Zephon reads datasets directly from the Hugging Face Hub with `hf://` paths.

## Installation

The `hf` extra adds support for Hub datasets and Parquet files. The examples below also need `transformers` for tokenization:

```bash
pip install "zephon[hf]" transformers
```

## Load a dataset from the Hub

Pass an `hf://` path to `Dataset.from_path`. The path names a dataset, a configuration and a split, for example the `train` split of the `sample-10BT` configuration of [HuggingFaceFW/fineweb-edu](https://huggingface.co/datasets/HuggingFaceFW/fineweb-edu).
Zephon reads Hub datasets through its [shard cache](https://datologyai.github.io/zephon/datasets/storage_backends_and_shard_cache.html), so you must enable the cache. Put the cache on fast local disk and set a size limit:

```python
from zephon import Pipeline
from zephon.io import CacheOptions, Dataset, StoreOptions
from zephon.work import MixtureSpec, StaticMixtureWorkSource

dataset = Dataset.from_path("fineweb_edu", "hf://HuggingFaceFW/fineweb-edu/sample-10BT/train")
work_source = StaticMixtureWorkSource(
    datasets=[dataset],
    mixture=MixtureSpec({"fineweb_edu": 1.0}),
    seed=42,
)
cache = CacheOptions(enabled=True, root="/tmp/zephon-cache", limit_bytes=50 << 30)  # 50 GiB

pipeline = (
    Pipeline(work_source)
    .options(io_options=StoreOptions(cache=cache))
    .tokenize(tokenizer_id="gpt2", field="text")
    .pack_flat(max_length=2049, algorithm="wrap")
    .batch(microbatch_size=8)
)

for batch in pipeline:
    tensors = batch.to_training(return_labels=True)
    print(tensors["input_ids"].shape, tensors["labels"].shape)  # (8, 2048) (8, 2048)
    break
```

`tokenize` converts the `text` column to token IDs. `pack_flat` joins the tokenized documents into sequences of `max_length` tokens. Set `max_length` to the context length plus one: with `return_labels=True`, `to_training` shifts the labels by one position, so `input_ids` and `labels` both have the context length.

A `Pipeline` is a Python iterable, so you can use it in any training loop. Zephon downloads a complete shard before it reads from it, so the first batch can take some time.

To read private or gated datasets, log in with your Hugging Face account first, for example with `hf auth login`. Zephon also reads the `HF_TOKEN` environment variable.

## Path format

Zephon's `hf://` paths for Hub datasets have this format:

```
hf://{org}/{name}[@[{revision}][~{source}]]/[{config}/]{split}
```

- `revision`: a branch, tag or commit. The default is `main`. Zephon pins the path to a commit when it loads the dataset, so all ranks read the same files.
- `source`: `original` reads the files uploaded to the repository, and `parquet` reads the Hub's [automatic Parquet conversion](https://huggingface.co/docs/dataset-viewer/parquet). Put the source after the `@`, for example `@~parquet`. By default, Zephon reads the uploaded files when it supports their format, and uses the Parquet conversion if it doesn't.
- `config`: the dataset configuration. Include it when the dataset has more than one configuration.

| Path                                                       | Reads                                                                         |
| ---------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `hf://HuggingFaceFW/fineweb-edu/sample-10BT/train`         | The `train` split of the `sample-10BT` configuration, from the `main` branch  |
| `hf://HuggingFaceFW/fineweb-edu@v1.4.0/sample-10BT/train`  | The same split from the `v1.4.0` branch                                       |
| `hf://yahma/alpaca-cleaned@~parquet/train`                 | The `train` split from the automatic Parquet conversion                       |

> [!WARNING]
> Zephon paths name a dataset and a split, not a file. They don't use the `hf://datasets/...` file paths that pandas, Polars and DuckDB use. Use `hf://HuggingFaceFW/fineweb-edu/sample-10BT/train`, not `hf://datasets/HuggingFaceFW/fineweb-edu/sample-10BT/train`.

## Mix datasets

To train on several Hub datasets, add them to the work source with the proportion of each one. This example mixes FineWeb-Edu with English Wikipedia, targeting a 70/30 mixture by tokens:

```python
from zephon import Pipeline
from zephon.io import CacheOptions, Dataset, StoreOptions
from zephon.work import MixtureSpec, StaticMixtureWorkSource, TokenEstimation

work_source = StaticMixtureWorkSource(
    datasets=[
        Dataset.from_path("fineweb_edu", "hf://HuggingFaceFW/fineweb-edu/sample-10BT/train"),
        Dataset.from_path("wikipedia", "hf://wikimedia/wikipedia/20231101.en/train"),
    ],
    mixture=MixtureSpec({"fineweb_edu": 0.7, "wikipedia": 0.3}),
    seed=42,
    token_estimation=TokenEstimation(primer="measure", calibration_samples=2048, calibration_shards_max=4),
)
cache = CacheOptions(enabled=True, root="/tmp/zephon-cache", limit_bytes=50 << 30)  # 50 GiB

pipeline = (
    Pipeline(work_source)
    .options(io_options=StoreOptions(cache=cache))
    .tokenize(tokenizer_id="gpt2", field="text")
    .pack_flat(max_length=2049, algorithm="wrap")
    .batch(microbatch_size=8)
)
```

To mix by samples instead, leave out `token_estimation`.

## Learn more

- [Zephon documentation](https://datologyai.github.io/zephon/)
- [Launch blog post](https://www.datologyai.com/blog/zephon)
- [Zephon paper](https://arxiv.org/abs/2610.03087)
- [DatologyAI on the Hub](https://huggingface.co/DatologyAI)
