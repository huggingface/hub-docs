# Bucket Integrations

Storage Buckets can be read and written from many Python data libraries using `hf://buckets/` paths, backed by the [`huggingface_hub` filesystem interface](/docs/huggingface_hub/guides/hf_file_system).

For the underlying access mechanisms — mounts, volume mounts, and fsspec — see [Access Patterns](./storage-buckets-access).

## pandas

```python
import pandas as pd

df = pd.read_parquet("hf://buckets/username/my-bucket/data.parquet")
df.to_parquet("hf://buckets/username/my-bucket/output.parquet")
```

## Dask

```python
import dask.dataframe as dd

df = dd.read_parquet("hf://buckets/username/my-bucket/data.parquet")
```

## PyArrow

```python
import pyarrow.parquet as pq

table = pq.read_table("hf://buckets/username/my-bucket/data.parquet")
```

## PySpark

With [`pyspark_huggingface`](https://github.com/huggingface/pyspark_huggingface) installed:

```python
df = (
    spark.read.format("huggingface")
    .option("data_files", '["data.parquet"]')
    .load("buckets/username/my-bucket")
)
```

See [PySpark on the Hub](./datasets-pyspark) for more.

## 🤗 Datasets

```python
from datasets import load_dataset

ds = load_dataset("buckets/username/my-bucket", data_files=["data.parquet"])
```

## Inspect AI

[Inspect AI](https://inspect.aisi.org.uk/) can write evaluation logs directly to a bucket — point its log directory at an `hf://buckets/` path (requires `huggingface_hub>=1.6.0`). Create the bucket and authenticate first (Inspect won't create it for you):

```bash
hf auth login
hf buckets create username/my-bucket --private

export INSPECT_LOG_DIR=hf://buckets/username/my-bucket/eval-logs
inspect eval popularity.py --model openai/gpt-4
inspect view
```

See [Inspect's eval logs guide](https://inspect.aisi.org.uk/eval-logs.html#sec-hugging-face-storage-buckets) for details.

## Filesystem operations

For direct file operations, `huggingface_hub` exposes a pre-instantiated [filesystem object](/docs/huggingface_hub/guides/hf_file_system), `hffs`:

```python
from huggingface_hub import hffs

with hffs.open("buckets/username/my-bucket/hello.txt", "w") as f:
    f.write("Hello world!")

hffs.cp("buckets/username/my-bucket/hello.txt", "buckets/username/my-bucket/hello2.txt")
hffs.rm("buckets/username/my-bucket/hello2.txt")
files = hffs.ls("buckets/username/my-bucket")
text_files = hffs.glob("buckets/username/my-bucket/*.txt")
```

## Other languages

[OpenDAL](https://opendal.apache.org/) provides a similar filesystem interface for Rust, Java, Go, JavaScript, and more.

## Coming soon

Support for more libraries is on the way — including Polars, DuckDB (native `hf://` URL support), Daft, and webdataset.
