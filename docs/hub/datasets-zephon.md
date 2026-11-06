# Zephon

[Zephon](https://github.com/datologyai/zephon) is a data loader for foundation model training, built by [DatologyAI](https://www.datologyai.com).
It tokenizes, packs and mixes data while training runs, and it gives the same batches when you change the number of GPUs.
Zephon reads datasets directly from the Hugging Face Hub with `hf://` paths.

## Installation

The `hf` extra adds support for Hub datasets and Parquet files. The examples below also need `transformers` for tokenization:

```bash
pip install "zephon[hf]" transformers
```

## Load a dataset from the Hub

Pass an `hf://` path to `Dataset.from_path`. The path names a dataset, a configuration and a split, for example the `train` split of the `sample-10BT` configuration of [HuggingFaceFW/fineweb-edu](https://huggingface.co/datasets/HuggingFaceFW/fineweb-edu).
Zephon reads remote datasets through its shard cache, so you must enable the cache:

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

pipeline = (
    Pipeline(work_source)
    .options(io_options=StoreOptions(cache=CacheOptions(enabled=True)))
    .tokenize(tokenizer_id="gpt2", field="text")
    .pack_flat(max_length=2049, algorithm="wrap", pad_token_id=0)
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

Zephon paths have this format:

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

To train on several Hub datasets, add them to the work source with the proportion of each one. This example mixes FineWeb-Edu with English Wikipedia:

```python
from zephon import Pipeline
from zephon.io import CacheOptions, Dataset, StoreOptions
from zephon.work import MixtureSpec, StaticMixtureWorkSource

work_source = StaticMixtureWorkSource(
    datasets=[
        Dataset.from_path("fineweb_edu", "hf://HuggingFaceFW/fineweb-edu/sample-10BT/train"),
        Dataset.from_path("wikipedia", "hf://wikimedia/wikipedia/20231101.en/train"),
    ],
    mixture=MixtureSpec({"fineweb_edu": 0.7, "wikipedia": 0.3}),
    seed=42,
)

pipeline = (
    Pipeline(work_source)
    .options(io_options=StoreOptions(cache=CacheOptions(enabled=True)))
    .tokenize(tokenizer_id="gpt2", field="text")
    .pack_flat(max_length=2049, algorithm="wrap", pad_token_id=0)
    .batch(microbatch_size=8)
)
```

## Small datasets

Zephon reads each dataset in chunks of `chunk_size` samples. The default is 16,384, which suits large pretraining datasets.
Each dataset needs about `chunk_size` multiplied by its mixture weight samples, or more. If a dataset is smaller, Zephon raises a `ValueError` when it sets up the pipeline.
For small datasets, set a smaller `chunk_size` on the work source:

```python
work_source = StaticMixtureWorkSource(
    datasets=[dataset],
    mixture=MixtureSpec({"my_dataset": 1.0}),
    chunk_size=512,
    seed=42,
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
