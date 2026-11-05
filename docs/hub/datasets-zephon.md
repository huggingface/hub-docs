# Zephon

[Zephon](https://github.com/datologyai/zephon) is a data loader for foundation model training, built by [DatologyAI](https://www.datologyai.com).
It tokenizes, packs and mixes data while training runs, and it gives the same batches when you change the number of GPUs.
Zephon reads datasets directly from the Hugging Face Hub with `hf://` paths.

## Installation

The `hf` extra adds support for Hub datasets and Parquet files. The example below also needs `transformers` for tokenization:

```bash
pip install "zephon[hf]" transformers
```

## Load a dataset from the Hub

Pass an `hf://` path to `Dataset.from_path`. The path names a dataset and a split, for example the `train` split of [stanfordnlp/imdb](https://huggingface.co/datasets/stanfordnlp/imdb).
Zephon reads remote datasets through its shard cache, so you must enable the cache:

```python
from zephon import Pipeline
from zephon.io import CacheOptions, Dataset, StoreOptions
from zephon.work import MixtureSpec, StaticMixtureWorkSource

dataset = Dataset.from_path("imdb", "hf://stanfordnlp/imdb/train")
work_source = StaticMixtureWorkSource(
    datasets=[dataset],
    mixture=MixtureSpec({"imdb": 1.0}),
    seed=42,
)

pipeline = (
    Pipeline(work_source)
    .options(io_options=StoreOptions(cache=CacheOptions(enabled=True)))
    .tokenize(tokenizer_id="gpt2", field="text", max_length=512, truncation=True, padding="max_length")
    .batch(microbatch_size=8)
)

for batch in pipeline:
    input_ids = batch.to_training()["input_ids"]
    print(input_ids.shape)  # (8, 512)
    break
```

A `Pipeline` is a Python iterable, so you can use it in any training loop.

To read private or gated datasets, log in with your Hugging Face account first, for example with `hf auth login`. Zephon also reads the `HF_TOKEN` environment variable.

## Path format

Zephon paths have this format:

```
hf://{org}/{name}[@{revision}][~{source}]/[{config}/]{split}
```

- `revision`: a branch, tag or commit. The default is `main`. Zephon pins the path to a commit when it loads the dataset, so all ranks read the same files.
- `source`: `original` reads the files uploaded to the repository, and `parquet` reads the Hub's [automatic Parquet conversion](https://huggingface.co/docs/dataset-viewer/parquet). By default, Zephon reads the uploaded files when it supports their format, and uses the Parquet conversion if it doesn't.
- `config`: the dataset configuration. Include it when the dataset has more than one configuration.

| Path                                          | Reads                                                     |
| --------------------------------------------- | --------------------------------------------------------- |
| `hf://stanfordnlp/imdb/train`                 | The `train` split from the `main` branch                  |
| `hf://stanfordnlp/imdb@main/plain_text/train` | The `train` split of the `plain_text` configuration       |
| `hf://stanfordnlp/imdb@~parquet/train`        | The `train` split from the automatic Parquet conversion   |

> [!WARNING]
> Zephon paths name a dataset and a split, not a file. They don't use the `hf://datasets/...` file paths that pandas, Polars and DuckDB use. Use `hf://stanfordnlp/imdb/train`, not `hf://datasets/stanfordnlp/imdb/train`.

## Mix datasets

To train on several Hub datasets, add them to the work source with the proportion of each one:

```python
from zephon import Pipeline
from zephon.io import CacheOptions, Dataset, StoreOptions
from zephon.work import MixtureSpec, StaticMixtureWorkSource

work_source = StaticMixtureWorkSource(
    datasets=[
        Dataset.from_path("imdb", "hf://stanfordnlp/imdb/train"),
        Dataset.from_path("ag_news", "hf://fancyzhx/ag_news/train"),
    ],
    mixture=MixtureSpec({"imdb": 0.7, "ag_news": 0.3}),
    seed=42,
)

pipeline = (
    Pipeline(work_source)
    .options(io_options=StoreOptions(cache=CacheOptions(enabled=True)))
    .tokenize(tokenizer_id="gpt2", field="text", max_length=512, truncation=True, padding="max_length")
    .batch(microbatch_size=8)
)
```

## Configure the shard cache

Zephon downloads each shard (file) completely into a local cache. When the cache reaches its size limit, Zephon removes the shards it used least recently. All ranks on a node share the same cache.
For training runs, put the cache on fast local storage and set a size limit:

```python
from zephon.io import CacheOptions, StoreOptions

cache = CacheOptions(enabled=True, root="/mnt/nvme/zephon-cache", limit_bytes=512 << 30)
io_options = StoreOptions(cache=cache)
```

Pass `io_options` to `Pipeline(...).options(io_options=io_options)`. For more information, see [Storage backends and shard cache](https://datologyai.github.io/zephon/datasets/storage_backends_and_shard_cache.html) in the Zephon documentation.

## Learn more

- [Zephon documentation](https://datologyai.github.io/zephon/)
- [Launch blog post](https://www.datologyai.com/blog/zephon)
- [Zephon paper](https://arxiv.org/abs/2610.03087)
