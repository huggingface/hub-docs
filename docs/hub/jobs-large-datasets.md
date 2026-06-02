# Process large datasets

Every Job comes with a fixed amount of local disk, set by its [hardware flavor](./jobs-pricing#pricing) (the **Ephemeral Storage** column). That's plenty for many tasks — but you don't need to fit a dataset on disk to work with it. To use datasets larger than the disk, read them directly from the Hub.

**Which approach?**

- **Fits on disk** → a plain `load_dataset(...)` works as-is.
- **Iterating over rows, or training** → [stream](#stream-the-dataset) it.
- **Filtered or column-pruned scans** → [mount](#mount-a-dataset-model-or-bucket) the repo and read it lazily, or query it [directly over `hf://`](#read-and-filter-over-hf) with Polars or DuckDB.
- **Persisting results** → write them to a [Storage Bucket](#saving-results) so they survive the Job.

## Stream the dataset

Streaming reads examples from the Hub as your code consumes them — no download, no local copy, and it scales to multi-TB datasets. Recent releases made it [up to 100× more efficient](https://huggingface.co/blog/streaming-datasets), reaching performance on par with local SSDs when training across many workers:

```python
from datasets import load_dataset

ds = load_dataset("HuggingFaceFW/fineweb-edu", "sample-10BT", split="train", streaming=True)
for example in ds.take(1000):
    ...  # streams in as you iterate, nothing hits disk
```

A streamed dataset is an `IterableDataset` supporting lazy `.filter()`, `.map()`, `.shuffle(buffer_size=...)`, and `.batch()`, and can be passed straight to a PyTorch `DataLoader` or a `Trainer` to train on data larger than disk. See the [Stream guide](/docs/datasets/stream) for the full API, and [Examples & Tutorials](./jobs-examples) for end-to-end training walkthroughs.

## Mount a dataset, model, or bucket

Mount a repository or bucket into the Job as a local path with `-v` / `--volume`; files are fetched lazily over the network as your code reads them, so any tool that reads local files just works:

```bash
hf jobs uv run --flavor cpu-upgrade \
  -v hf://datasets/HuggingFaceFW/fineweb-edu:/mnt/data \
  filter.py
```

```python
# filter.py — lazy scan: reads Parquet metadata first, then only the columns/rows the query needs
import polars as pl

df = (
    pl.scan_parquet("/mnt/data/sample/10BT/*.parquet")
    .filter(pl.col("int_score") >= 4)
    .select("text", "url", "token_count")
    .collect()
)
```

Datasets and models mount read-only; buckets are read-write, which makes them a good place to [save results](#saving-results). See [Configuration](./jobs-configuration#volumes) for the full `-v` syntax and [bucket access patterns](./storage-buckets-access#volume-mounts-in-jobs-and-spaces) for details.

> [!TIP]
> Files read through a mount are cached on the Job's ephemeral disk, so reading lazily (a `scan_parquet`, or one file at a time) keeps the footprint small. When running a local script with `hf jobs uv run`, the script directory is mounted at `/data`, so mount your data elsewhere (e.g. `/mnt/data`).

## Read and filter over `hf://`

Many data libraries read datasets and buckets straight from the Hub over `hf://` (via [`HfFileSystem`](/docs/huggingface_hub/guides/hf_file_system)/fsspec) with no mount needed. **Polars**, **DuckDB**, and **pandas** all read Hub Parquet directly, pushing filters and column selection down into the scan, so a single Job can process far more data than fits in memory. For example, DuckDB can filter the source and write the result to a mounted bucket in one query:

```python
import duckdb
from huggingface_hub import HfFileSystem

duckdb.register_filesystem(HfFileSystem())
duckdb.sql(
    """
    COPY (
        SELECT text, url, token_count
        FROM 'hf://datasets/HuggingFaceFW/fineweb-edu/sample/100BT/*.parquet'
        WHERE int_score >= 4 AND token_count >= 4000
    ) TO '/mnt/out/result.parquet' (FORMAT parquet)
    """
)
```

See [Python data tools](./storage-buckets-access#python-data-tools) and [bucket integrations](./storage-buckets-integrations) for per-library examples. A large scan is network-bound rather than memory-bound, so to go faster you can split the work across several Jobs running in parallel.

## Saving results

Ephemeral disk doesn't survive the Job, so write anything you want to keep to a [Storage Bucket](./storage-buckets) mounted read-write, or push it to the Hub as a dataset:

```bash
hf jobs uv run --flavor cpu-performance \
  -v hf://datasets/HuggingFaceFW/fineweb-edu:/mnt/data \
  -v hf://buckets/username/my-output:/mnt/out \
  filter.py
```

Files written under the bucket mount path persist after the Job ends. To publish a processed dataset instead, use [`Dataset.push_to_hub`](/docs/datasets/upload_dataset).

## Worked example: query Common Crawl without downloading it

Common Crawl mirrors its archive to the bucket [`commoncrawl/commoncrawl`](https://huggingface.co/datasets/commoncrawl/commoncrawl) — hundreds of TB. Stream one WET (plaintext) shard straight from `hf://`, parse it, and query it with DuckDB; only a few MB transit because the gzip is read sequentially and stopped early:

```python
# /// script
# requires-python = ">=3.11"
# dependencies = ["huggingface_hub>=1.0", "fastwarc>=0.15", "duckdb>=1.0"]
# ///
import duckdb
from fastwarc.warc import ArchiveIterator, WarcRecordType
from huggingface_hub import HfFileSystem

WET = (
    "buckets/commoncrawl/commoncrawl/crawl-data/CC-MAIN-2026-17/"
    "segments/1775805908305.14/wet/"
    "CC-MAIN-20260410081153-20260410111153-00000.warc.wet.gz"
)

rows = []
with HfFileSystem().open(WET, "rb") as f:
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

Run it with `hf jobs uv run cc_wet.py`.

## See also

- [Stream](/docs/datasets/stream) · [Streaming datasets: 100× more efficient](https://huggingface.co/blog/streaming-datasets)
- [Pricing & hardware](./jobs-pricing#pricing) — ephemeral disk per flavor · [Configuration](./jobs-configuration#volumes) — volumes
- [Storage Buckets](./storage-buckets) · [access patterns](./storage-buckets-access) · [integrations](./storage-buckets-integrations)
