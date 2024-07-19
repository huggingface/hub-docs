# Optimizations

We briefly touched upon the difference between `Lazy` and `Eager` evaluation. On this page we will show how the lazy API can be used to get huge performance benefits.


## Lazy vs Eager

Polars supports two modes of operation: lazy and eager. In the eager API the query is executed immediately while in the lazy API the query is only evaluated once it is 'needed'. Deferring the execution to the last minute can have significant performance advantages and is why the Lazy API is preferred in most non-interactive cases. 

## Example

We will be using the example from the previous page to show the performance benefits of using the lazy API. The code below will compute the number of uploads from `archive.org`.

### Eager

```python
df = pl.read_parquet("hf://datasets/KBlueLeaf/danbooru2023-metadata-database/parquet/post.parquet")
df = df.select(["id","uploader_id","source","file_url","score"])
df = df.filter(pl.col("source").str.contains("archive.org"))
df = df.group_by("uploader_id").agg(pl.len().alias("number_of_uploads")).sort("number_of_uploads",descending=True)
print(df)
```

### Lazy

```python
lf = (
    pl.scan_parquet(
        "hf://datasets/KBlueLeaf/danbooru2023-metadata-database/parquet/post.parquet"
    )
    .filter(pl.col("source").str.contains("archive.org"))
    .group_by("uploader_id")
    .agg(pl.len().alias("number_of_uploads"))
    .sort("number_of_uploads", descending=True)
)
print(lf.collect())
```

### Timings

Running both queries lead to following run times on a regular laptop with a household internet connection

- Eager: `195.95` seconds
- Lazy: `20.56` seconds

The Lazy query is ~9 times faster than the eager one. The reason for this is the query optimizer. If we delay `collect`'ing our dataset until the end Polars will be able to reason about which columns & rows you need and only fetch those from Hugging Face saving bandwith and time. 