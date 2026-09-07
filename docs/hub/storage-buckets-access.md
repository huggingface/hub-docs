# Access Patterns

Beyond the [CLI and Python SDK](./storage-buckets#managing-files), there are several ways to access bucket data from your existing tools and workflows.

## Choosing an Access Method

| Method | Best for | Details |
|--------|----------|---------|
| **hf-mount** | Mount as local filesystem — any tool works | [See below](#mount-as-a-local-filesystem) |
| **Volume mounts** | HF Jobs & Spaces (same idea, managed for you) | [See below](#volume-mounts-in-jobs-and-spaces) |
| **DuckDB** | SQL queries over bucket files, from the CLI or any client | [See below](#query-with-duckdb) |
| **hf:// paths** (fsspec) | Python data tools (pandas and other fsspec-aware libraries) | [See below](#python-data-tools) |
| **CLI sync** | Batch transfers, backups | [Sync docs](./storage-buckets#syncing-directories) |
| **S3 API** | Existing S3 tooling (AWS CLI, boto3, s5cmd) | [S3-Compatible API](./storage-buckets-s3) |

For tools that use buckets as a backend (SkyPilot, Inspect, …), see [Integrations](./storage-buckets-integrations).

## Mount as a Local Filesystem

[hf-mount](https://github.com/huggingface/hf-mount) lets you mount buckets (and repos) as local filesystems via NFS (recommended) or FUSE. Files are fetched lazily — only the bytes your code reads hit the network.

Install with [Homebrew](https://brew.sh/):

```bash
brew install hf-mount
```

Mount a bucket:

```bash
hf-mount start bucket username/my-bucket /mnt/data
```

Once mounted, any tool that reads or writes files works with your bucket — pandas, DuckDB, vLLM, training scripts, shell commands, etc.

> [!TIP]
> Buckets are mounted read-write; repos are read-only. See the [hf-mount repository](https://github.com/huggingface/hf-mount) for full documentation including backend options, caching, and write modes.

## Volume Mounts in Jobs and Spaces

Volume mounts in [Jobs](./jobs) and [Spaces](./spaces) are the same idea as `hf-mount`, managed for you by the platform — no extra setup needed. Buckets are mounted read-write by default.

```bash
hf jobs run -v hf://buckets/username/my-bucket:/data python:3.12 python script.py
```

Jobs can also take a **local directory** as the volume source (`-v ./training-data:/data`): the directory is synced to your private `jobs-artifacts` bucket and mounted from there, so incremental re-syncs and output pull-back come for free.

For the full volume mount syntax and Python API, see the [Jobs configuration docs](./jobs-configuration#volumes) and the [Spaces volume mount guide](/docs/huggingface_hub/guides/manage-spaces#mount-volumes-in-your-space).

## Query with DuckDB

[DuckDB](https://duckdb.org/) 2.0 and later read `hf://buckets/` paths natively through the `httpfs` extension. From the DuckDB CLI or any client, load `httpfs` and query a bucket:

```sql
LOAD httpfs;

SELECT * FROM 'hf://buckets/username/my-bucket/data.parquet' LIMIT 10;
```

Glob patterns work as they do for datasets, e.g. `'hf://buckets/username/my-bucket/data/**/*.parquet'`. Buckets are not versioned, so the `@revision` syntax does not apply to bucket paths. Native `hf://buckets/` access is read-only for now; to write query results to a bucket, use the [S3-compatible API](./storage-buckets-s3#query-a-bucket-with-duckdb) or the Python client with `HfFileSystem`.

**Private buckets:** create a Hugging Face secret first. It picks up the token from `hf auth login` or the `HF_TOKEN` environment variable:

```sql
CREATE SECRET hf (TYPE huggingface, PROVIDER credential_chain);
```

> [!NOTE]
> On DuckDB 1.x, `httpfs` does not recognize `hf://buckets/` paths. Register [`HfFileSystem`](/docs/huggingface_hub/guides/hf_file_system) from Python instead, or use the [S3-compatible API](./storage-buckets-s3#query-a-bucket-with-duckdb) from the CLI and other clients.

## Python Data Tools

The [`HfFileSystem`](/docs/huggingface_hub/guides/hf_file_system) provides [fsspec](https://filesystem-spec.readthedocs.io)-compatible access to buckets using `hf://buckets/` paths. Any Python library that supports fsspec can read and write bucket data directly.

**pandas:**

```python
import pandas as pd

df = pd.read_parquet("hf://buckets/username/my-bucket/data.parquet")
df.to_parquet("hf://buckets/username/my-bucket/output.parquet")
```

For more on `hf://` paths and supported operations, see the [`HfFileSystem` guide](/docs/huggingface_hub/guides/hf_file_system) and the [Buckets Python guide](/docs/huggingface_hub/guides/buckets).
