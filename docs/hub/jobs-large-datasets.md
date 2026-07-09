# Process Large Datasets

Every Job comes with a fixed amount of local disk, set by its [hardware flavor](./jobs-pricing#pricing) (the **Ephemeral Storage** column, also shown by `hf jobs hardware`). You don't need to fit a whole dataset on that disk to work with it: datasets and [Storage Buckets](./storage-buckets) can be read directly from the Hub — streamed, queried, or mounted — so a single Job can process data far larger than its disk. This page covers the options and when to reach for each.

## Which approach?

- **Fits on disk** → a plain `load_dataset(...)` works as-is (or just pick a bigger flavor — up to 1 TB of ephemeral disk).
- **Iterating over rows, processing or training** → [stream](#stream-the-dataset) it.
- **Filtered or column-pruned scans** → query it [directly over `hf://`](#read-and-filter-over-hf) with Polars or DuckDB.
- **Tools that expect local file paths** → [mount](#mount-a-dataset-model-or-bucket) the repo and read it lazily.
- **Persisting results** → write them to a [Storage Bucket](#save-results) so they survive the Job.

## Stream the dataset

Streaming reads examples from the Hub as your code consumes them — no download, no local copy, and it scales to multi-TB datasets. Recent releases made it [up to 100× more efficient](https://huggingface.co/blog/streaming-datasets), reaching performance on par with local SSDs when training across many workers:

```python
from datasets import load_dataset

ds = load_dataset("HuggingFaceFW/fineweb-edu", "sample-10BT", split="train", streaming=True)
for example in ds.take(1000):
    ...  # streams in as you iterate, nothing hits disk
```

A streamed dataset is an `IterableDataset` supporting lazy `.filter()`, `.map()`, `.shuffle(buffer_size=...)`, and `.batch()`, and can be passed straight to a PyTorch `DataLoader` or a `Trainer` to train on data larger than disk. See the [Stream guide](/docs/datasets/stream) for the full API, and [Examples & Tutorials](./jobs-examples) for end-to-end training walkthroughs.

## Read and filter over `hf://`

Many data libraries read Hub datasets directly over `hf://` paths — **Polars**, **DuckDB**, and **pandas** all scan Hub Parquet natively, pushing filters and column selection down into the scan, so a single Job can process far more data than fits in memory or on disk. This query summarizes ~28 GB of Parquet in about four minutes on the default CPU flavor:

```python
import polars as pl

agg = (
    pl.scan_parquet("hf://datasets/HuggingFaceFW/fineweb-edu/sample/10BT/*.parquet")
    .filter(pl.col("int_score") >= 4)
    .group_by("int_score")
    .agg(pl.len().alias("docs"), pl.col("token_count").sum().alias("tokens"))
    .sort("int_score")
    .collect()
)
print(agg)
```

Scans like this are network-bound rather than memory-bound, and engines differ in how aggressively they parallelize remote reads, so timings vary by library. Two practical consequences: set `--timeout` above the default 30 minutes for long scans, and split the work across several Jobs running in parallel to go faster. See [Polars](./datasets-polars), [DuckDB](./datasets-duckdb), and [pandas](./datasets-pandas) for per-library examples, and [Python data tools](./storage-buckets-access#python-data-tools) for reading **buckets** over `hf://` (which goes through [`HfFileSystem`](/docs/huggingface_hub/guides/hf_file_system)).

## Mount a dataset, model, or bucket

Mount a repository or bucket into the Job as a local path with `-v` / `--volume`; files are fetched lazily over the network as your code reads them, so any tool that reads local files just works:

```bash
hf jobs uv run --flavor cpu-upgrade \
  -v hf://datasets/HuggingFaceFW/fineweb-edu:/mnt/data \
  process.py
```

```python
# /// script
# dependencies = ["polars"]
# ///
# process.py — the mounted repo is just a directory of files
from pathlib import Path

import polars as pl

for path in Path("/mnt/data/sample/10BT").glob("*.parquet"):
    shard = pl.read_parquet(path)
    ...  # process one shard at a time, write results out
```

Mounting is the natural fit when files are consumed whole — model weights, audio or image files, archives — or when a tool only accepts file paths. For large multi-file Parquet scans, querying [directly over `hf://`](#read-and-filter-over-hf) is typically several times faster than scanning through a mount.

Datasets and models mount read-only; buckets are read-write, which makes them a good place to [save results](#save-results). See [Configuration](./jobs-configuration#volumes) for the full `-v` syntax and [bucket access patterns](./storage-buckets-access#volume-mounts-in-jobs-and-spaces) for details.

> [!TIP]
> Files read through a mount are cached on the Job's ephemeral disk, so reading lazily (one file at a time) keeps the footprint small. When running a local script with `hf jobs uv run`, the script directory is mounted at `/data`, so mount your data elsewhere (e.g. `/mnt/data`).

## Save results

Ephemeral disk doesn't survive the Job, so write anything you want to keep to a [Storage Bucket](./storage-buckets) mounted read-write, or push it to the Hub as a dataset. DuckDB can filter the source over `hf://` and write the matches straight to a mounted bucket in one out-of-core query, so the result never has to fit in memory:

```bash
hf jobs uv run --flavor cpu-upgrade --timeout 1h \
  -v hf://buckets/username/my-output:/mnt/out \
  filter.py
```

```python
# /// script
# dependencies = ["duckdb"]
# ///
# filter.py — scan ~28 GB of Parquet, keep only the matching rows
import duckdb

duckdb.sql(
    """
    COPY (
        SELECT text, url, token_count
        FROM 'hf://datasets/HuggingFaceFW/fineweb-edu/sample/10BT/*.parquet'
        WHERE int_score >= 4 AND token_count >= 4000
    ) TO '/mnt/out/result.parquet' (FORMAT parquet)
    """
)
```

Files written under the bucket mount path persist after the Job ends. To publish a processed dataset instead, use [`Dataset.push_to_hub`](/docs/datasets/upload_dataset).

## Worked example: query Common Crawl without downloading it

Common Crawl mirrors its archive to the bucket [`commoncrawl/commoncrawl`](https://huggingface.co/buckets/commoncrawl/commoncrawl) — hundreds of TB. Stream one WET (plaintext) shard straight from `hf://`, parse it, and query it with DuckDB; only a few MB transit because the gzip is read sequentially and stopped early:

```python
# /// script
# requires-python = ">=3.11"
# dependencies = ["huggingface_hub>=1.0", "fastwarc>=0.15", "duckdb>=1.0"]
# ///
import duckdb
from fastwarc.warc import ArchiveIterator, WarcRecordType
from huggingface_hub import hffs

WET = (
    "buckets/commoncrawl/commoncrawl/crawl-data/CC-MAIN-2026-17/"
    "segments/1775805908305.14/wet/"
    "CC-MAIN-20260410081153-20260410111153-00000.warc.wet.gz"
)

rows = []
with hffs.open(WET, "rb") as f:
    for rec in ArchiveIterator(f, record_types=WarcRecordType.conversion):
        lang = (rec.headers.get("WARC-Identified-Content-Language", "") or "und").split(",")[0]
        rows.append((rec.headers.get("WARC-Target-URI", ""), lang, len(rec.reader.read())))
        if len(rows) >= 5000:
            break

con = duckdb.connect()
con.execute("CREATE TABLE wet(url VARCHAR, lang VARCHAR, n_chars BIGINT)")
con.executemany("INSERT INTO wet VALUES (?,?,?)", rows)
con.sql("SELECT lang, count(*) AS docs FROM wet GROUP BY lang ORDER BY docs DESC LIMIT 10").show()
```

Run it with `hf jobs uv run cc_wet.py` — it completes in about a minute on the default CPU flavor and prints:

```
┌─────────┬───────┐
│  lang   │ docs  │
│ varchar │ int64 │
├─────────┼───────┤
│ eng     │  1974 │
│ zho     │   586 │
│ rus     │   434 │
│ jpn     │   244 │
│ …       │    …  │
└─────────┴───────┘
```

## See also

- [Stream](/docs/datasets/stream) · [Streaming datasets: 100× more efficient](https://huggingface.co/blog/streaming-datasets)
- [Pricing & hardware](./jobs-pricing#pricing) — ephemeral disk per flavor · [Configuration](./jobs-configuration#volumes) — volumes
- [Storage Buckets](./storage-buckets) · [access patterns](./storage-buckets-access) · [integrations](./storage-buckets-integrations)
