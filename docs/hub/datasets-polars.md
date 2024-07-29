# Polars

[Polars](https://pola.rs/) is an in-memory DataFrame library on top of an [OLAP](https://en.wikipedia.org/wiki/Online_analytical_processing) query engine. It is fast, easy to use, and [open source](https://github.com/pola-rs/polars/).

Starting from version `1.2.0`, Polars provides _native_ support for the Hugging Face file system. This means that all the benefits of the Polars query optimizer (e.g. predicate and projection pushdown) are applied and Polars will only load the data necessary to complete the query. This significantly speeds up reading, especially for large datasets (see [optimizations](./datasets-polars-optimizations))

## Getting started

To get started, you can simply `pip install` Polars into your environment:

```
pip install polars
```

Once you have installed Polars, you can directly query a dataset based on a Hugging Face URL. No other dependencies are needed for this.

```python
import polars as pl

pl.read_parquet("hf://datasets/roneneldan/TinyStories/data/train-00000-of-00004-2d5a1467fff1081b.parquet")
```

<Tip>

Polars provides two APIs: a lazy API (`scan_parquet`) and an eager API (`read_parquet`). We recommend using the eager API for interactive workloads and the lazy API for performance as it allows for better query optimization. For more information on the topic, check out the [Polars user guide](https://docs.pola.rs/user-guide/concepts/lazy-vs-eager/).

</Tip>

Polars supports globbing to download multiple files at once into a single DataFrame.

```python
pl.read_parquet("hf://datasets/roneneldan/TinyStories/data/train-*.parquet")
```

### Hugging Face URLs

A Hugging Face URL can be constructed from the `username` and `dataset` name like this:

- `hf://datasets/{username}/{dataset}/{path_to_file}`

The path may include globbing patterns such as `**/*.parquet` to query all the files matching the pattern. Additionally, for any non-supported [file formats](./datasets-polars-file-formats) you can use the auto-converted parquet files that Hugging Face provides using the `@~parquet branch`:

- `hf://datasets/{my-username}/{my-dataset}@~parquet/{path_to_file}`
