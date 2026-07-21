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

## Daft

Daft supports `hf://buckets/` paths natively, with [Xet-accelerated reads](https://docs.daft.ai/en/stable/connectors/huggingface/) enabled by default:

```python
import daft
from daft.io import IOConfig, HuggingFaceConfig
from huggingface_hub import get_token

io_config = IOConfig(hf=HuggingFaceConfig(token=get_token()))
df = daft.read_parquet("hf://buckets/username/my-bucket/data.parquet", io_config=io_config)
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

## SkyPilot

[SkyPilot](https://docs.skypilot.co/) runs AI workloads across 20+ clouds, Kubernetes, and on-prem, and can use Hugging Face storage as a backend — so one bucket is readable from every cloud with no per-cloud copies. Set `store: hf` on a `file_mounts` entry to mount a bucket read-write or a repo read-only:

```yaml
# qwen-sft.yaml — launch anywhere: sky launch qwen-sft.yaml --infra aws|gcp|...
resources:
  accelerators: H100:1

file_mounts:
  /base-model:
    source: hf://Qwen/Qwen2.5-3B           # model repo, read-only
    store: hf
    mode: MOUNT
  /data:
    source: hf://datasets/username/my-data@v1.0   # dataset repo, pinned to a tag, read-only
    store: hf
    mode: MOUNT
  /checkpoints:
    source: hf://buckets/username/qwen-sft   # bucket, read-write — checkpoints sync back
    store: hf
    mode: MOUNT

run: |
  python train.py --model /base-model --output_dir /checkpoints
```

Authenticate once - `hf auth login` (or `export HF_TOKEN=<your-token>`) is all SkyPilot needs. It forwards your local Hugging Face token to every cloud, so the bucket and repo mounts authenticate automatically:

```bash
pip install "skypilot[huggingface]"
hf auth login                              # or: export HF_TOKEN=<your-token>
sky launch qwen-sft.yaml
```

If your own `run` code pulls gated repos, add `--secret HF_TOKEN` to the launch command to also expose the token as an env var.

> [!TIP]
> `MOUNT` and `MOUNT_CACHED` behave identically for `hf` and use the [hf-mount](https://github.com/huggingface/hf-mount) FUSE backend, which needs a base image with glibc ≥ 2.34 and `/dev/fuse`. Bare-VM clouds provide both. SkyPilot's default Kubernetes image ships older glibc, so set a newer `image_id` (e.g. `docker:mirror.gcr.io/ubuntu:22.04`). See the [SkyPilot storage docs](https://docs.skypilot.co/en/latest/reference/storage.html) for the current environment requirements.

See the [SkyPilot + Hugging Face storage blog post](https://huggingface.co/blog/skypilot-hf-storage) for benchmarks and a full walkthrough.

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

Native `hf://` URL support is on the way for more libraries — including Polars, DuckDB, and webdataset. In the meantime, all of these already work today through the [S3-compatible API](./storage-buckets-s3).
