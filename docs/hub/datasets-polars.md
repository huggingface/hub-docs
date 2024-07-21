# Polars

[Polars](https://pola.rs/) is an in-memory DataFrame library on top of an [OLAP](https://en.wikipedia.org/wiki/Online_analytical_processing) query engine. It is fast, easy to use, and [open source](https://github.com/pola-rs/polars/). 

Starting from `v1.2.0` Polars provides native! support for the hugging face file system. This means that all the benefits of the Polars query optimizer (e.g. predicate & projection pushdown) are applied and Polars will only load the data that is necessary to complete the query. This significantly speeds up reading, especially for large datasets (see [optimizations](./datasets-polars-optimizations))

## Getting started

To get started you can simply `pip install` Polars into your environment

```
pip install polars
``` 

Once you have installed Polars, you can directly query a dataset based on a hugging face url. No other dependencies are needed for this.

```python
import polars as pl
pl.read_parquet("hf://datasets/roneneldan/TinyStories/data/train-00000-of-00004-2d5a1467fff1081b.parquet")
```

<Tip>

Polars provides two API's, a lazy one (`scan_parquet`) and an eager API (`read_parquet`). We would recommend using the eager API for interactive workloads and the lazy API for performance as it allows for better query optimization. For more information on the topic, go to [lazy vs eager](https://docs.pola.rs/user-guide/concepts/lazy-vs-eager/).

</Tip>

Polars supports globbing to download multiple files at once into a single DataFrame

```python
pl.read_parquet("hf://datasets/roneneldan/TinyStories/data/train-*.parquet")
```

### Hugging Face Url's

A hugging face url can be constructed from the `username` and `dataset` name like this:
 
- `hf://datasets/{username}/{dataset}/{path_to_file}`. 

The path may include globbing patterns such as `**/*.parquet` to query all the files matching the pattern. Additionally, for any non-supported [file formats](./datasets-polars-file-formats) you can use the auto-converted parquet files that Hugging Face provides using the `@~parquet branch`: 

- `hf://datasets/{my-username}/{my-dataset}@~parquet/{path_to_file}`
