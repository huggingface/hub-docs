# Optimizations

We briefly touched upon the difference between `Lazy` and `Eager` evaluation. On this page we will show how the lazy API can be used to get huge performance benefits.


## Lazy vs Eager

Polars supports two modes of operation: lazy and eager. In the eager API the query is executed immediately while in the lazy API the query is only evaluated once it is 'needed'. Deferring the execution to the last minute can have significant performance advantages and is why the Lazy API is preferred in most non-interactive cases. 

## Example

We will be using the example from the previous page to show the performance benefits of using the lazy API. The code below will compute the number of uploads from `archive.org`.

### Eager

```python
df = pl.read_csv("hf://datasets/commoncrawl/statistics/tlds.csv",try_parse_dates = True)
df = df.select(["suffix","crawl","date","tld","pages","domains"])
df = df.filter(
    (pl.col("date") >= datetime.date(2020, 1, 1)) | 
    pl.col("crawl").str.contains("CC")
)
df = df.with_columns(
    (pl.col("pages") / pl.col("domains")).alias("pages_per_domain")
)
df = df.group_by("tld","date").agg(
    pl.col("pages").sum(),
    pl.col("domains").sum()
)
df = df.group_by("tld").agg(
    pl.col("date").unique().count().alias("number_of_scrapes"),
    pl.col("domains").mean().alias("avg_number_of_domains"),
    pl.col("pages").sort_by("date").pct_change().mean().alias("avg_page_growth_rate")
).sort("avg_number_of_domains",descending=True).head(10)
```

### Lazy

```python
lf = (
    pl.scan_csv("hf://datasets/commoncrawl/statistics/tlds.csv",try_parse_dates = True)
    .filter(
        (pl.col("date") >= datetime.date(2020, 1, 1)) | 
        pl.col("crawl").str.contains("CC")
    ).with_columns(
        (pl.col("pages") / pl.col("domains")).alias("pages_per_domain")
    ).group_by("tld","date").agg(
        pl.col("pages").sum(),
        pl.col("domains").sum()
    ).group_by("tld").agg(
        pl.col("date").unique().count().alias("number_of_scrapes"),
        pl.col("domains").mean().alias("avg_number_of_domains"),
        pl.col("pages").sort_by("date").pct_change().mean().alias("avg_page_growth_rate")
    ).sort("avg_number_of_domains",descending=True).head(10)
)
df = lf.collect()
```

### Timings

Running both queries lead to following run times on a regular laptop with a household internet connection

- Eager: `1.96` seconds
- Lazy: `410` milliseconds

The Lazy query is ~5 times faster than the eager one. The reason for this is the query optimizer. If we delay `collect`'ing our dataset until the end Polars will be able to reason about which columns & rows you need and apply filters as early as possible when reading the data. For datasets with metadata included (e.g. min, max in a certain group of rows) such as `parquet` the difference can even be bigger as Polars can skip entire groups based on the filters and the metadata without sending the data over the wire.  