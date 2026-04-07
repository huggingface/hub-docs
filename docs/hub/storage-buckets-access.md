# Access Patterns

Beyond the [CLI and Python SDK](./storage-buckets#managing-files), there are several ways to access bucket data from your existing tools and workflows.

## Choosing an Access Method

| Method | Best for | Details |
|--------|----------|---------|
| **hf-mount** | Mount as local filesystem — any tool works | [See below](#mount-as-a-local-filesystem) |
| **hf:// paths** (fsspec) | Python data tools (pandas, DuckDB) | [See below](#python-data-tools) |
| **Volume mounts** | HF Jobs & Spaces | [See below](#volume-mounts-in-jobs-and-spaces) |
| **CLI sync** | Batch transfers, backups | [Sync docs](./storage-buckets#syncing-directories) |

## Mount as a Local Filesystem

[hf-mount](https://github.com/huggingface/hf-mount) lets you mount buckets (and repos) as local filesystems via NFS (recommended) or FUSE. Files are fetched lazily — only the bytes your code reads hit the network.

Install:

```bash
curl -fsSL https://raw.githubusercontent.com/huggingface/hf-mount/main/install.sh | sh
```

Mount a bucket:

```bash
hf-mount start bucket username/my-bucket /mnt/data
```

Once mounted, any tool that reads or writes files works with your bucket — pandas, DuckDB, vLLM, training scripts, shell commands, etc.

> [!TIP]
> Buckets are mounted read-write; repos are read-only. See the [hf-mount repository](https://github.com/huggingface/hf-mount) for full documentation including backend options, caching, and write modes.

## Python Data Tools

The [`HfFileSystem`](/docs/huggingface_hub/guides/hf_file_system) provides [fsspec](https://filesystem-spec.readthedocs.io)-compatible access to buckets using `hf://buckets/` paths. Any Python library that supports fsspec can read and write bucket data directly.

**pandas:**

```python
import pandas as pd

df = pd.read_parquet("hf://buckets/username/my-bucket/data.parquet")
df.to_parquet("hf://buckets/username/my-bucket/output.parquet")
```

**DuckDB** (Python client):

```python
import duckdb
from huggingface_hub import HfFileSystem

duckdb.register_filesystem(HfFileSystem())
duckdb.sql("SELECT * FROM 'hf://buckets/username/my-bucket/data.parquet' LIMIT 10")
```

For more on `hf://` paths and supported operations, see the [`HfFileSystem` guide](/docs/huggingface_hub/guides/hf_file_system) and the [Buckets Python guide](/docs/huggingface_hub/guides/buckets).

## Volume Mounts in Jobs and Spaces

When running [Jobs](./jobs) or [Spaces](./spaces), you can mount buckets directly as volumes — no extra setup needed. Buckets are mounted read-write by default.

```bash
hf jobs run -v hf://buckets/username/my-bucket:/data python:3.12 python script.py
```

For the full volume mount syntax and Python API, see the [Jobs configuration docs](./jobs-configuration#volumes).
