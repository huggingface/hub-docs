# Migrating Data to Storage Buckets

This guide shows how to move large datasets into a [Storage Bucket](./storage-buckets) from wherever they live today: local disk, another cloud, or the Hub. Find your source in the table below and jump to that section.

Wherever you can, make your data readable as a filesystem and run `hf sync`. It deduplicates on the client, so you upload fewer bytes than a raw copy.

## At a glance

| Where your data is now | Recommended | Alternatives |
|---|---|---|
| Local disk or cluster filesystem | [`hf sync`](#from-local-disk-or-a-cluster-filesystem) | — |
| AWS S3 or S3-compatible (R2, MinIO) | [Mount with `mount-s3`, then `hf sync`](#from-aws-s3-or-s3-compatible-storage) | [rclone through the S3 gateway](#alternative-rclone-through-the-s3-gateway) |
| Google Cloud Storage | [Mount with `gcsfuse`, then `hf sync`](#from-google-cloud-storage-or-azure-blob-storage) | rclone, or a [Job](#run-the-migration-in-the-background-with-jobs) |
| Azure Blob Storage | [Mount with `blobfuse2`, then `hf sync`](#from-google-cloud-storage-or-azure-blob-storage) | rclone, or a [Job](#run-the-migration-in-the-background-with-jobs) |
| A Hub repository or another bucket | [`hf buckets cp` (server-side)](#from-a-hub-repository-or-another-bucket) | — |
| Very large S3 prefix | [hf-s3ream (alpha)](#very-large-s3-prefixes-with-hf-s3ream) | Mount + `hf sync`, [split by subpath](#split-by-subpath-experimental) |

Why `hf sync` is the default:

- **You upload less.** `hf sync` uploads through the [Xet](./xet/index) client, which chunks and deduplicates your data first, so only chunks the Hub hasn't seen are sent. A raw copy (for example, rclone through the S3 gateway) transfers every byte.
- **It's at least as fast.** In the migrations we've supported so far, `hf sync` over a mounted source has matched or beaten rclone on throughput.

## Before you start

All commands in this guide use `hf`, the [Hugging Face CLI](https://huggingface.co/docs/huggingface_hub/guides/cli). Its help output is agent-readable, so a coding agent can put together and monitor a migration for you (see [CLI for AI Agents](./agents-cli)). Review the commands before running them at scale.

1. **Install the CLI.** The Xet client ships with it.

   ```bash
   curl -LsSf https://hf.co/cli/install.sh | bash
   hf version
   ```

2. **Log in** with a token that has **Write** access ([create one](https://huggingface.co/settings/tokens)):

   ```bash
   hf auth login
   hf auth whoami
   ```

3. **Create the destination bucket.** `<namespace>` is your username or organization. Without `--region`, the bucket goes to the namespace's default [storage region](./storage-regions), which is always the US outside Team & Enterprise plans. On those plans, pass `--region us` or `--region eu` to choose.

   ```bash
   hf buckets create <namespace>/<bucket> --private
   ```

> [!TIP]
> Start with a test run. Whichever path you use, rehearse it on a small subset (one folder, or an `--include` pattern), check the result with `--dry-run` and `hf buckets ls`, then launch the full migration. Every path in this guide can be resumed, so a test run costs nothing.

## From local disk or a cluster filesystem

Use this when your data is on a local disk, an attached volume, or cluster scratch: anything the machine can read as files. It is also the last step of every cloud path below, once the source is mounted.

```bash
hf sync ./data hf://buckets/<namespace>/<bucket>/data
```

`hf sync` compares source and destination and transfers only the difference, so re-running the same command resumes an interrupted migration: files already uploaded are skipped. Common variants:

```bash
# Mirror exactly: also delete destination files that are gone from the source
hf sync ./data hf://buckets/<namespace>/<bucket>/data --delete

# Preview what would transfer, without uploading
hf sync ./data hf://buckets/<namespace>/<bucket>/data --dry-run

# Only some files
hf sync ./data hf://buckets/<namespace>/<bucket>/data --include "*.parquet" --exclude "tmp/*"
```

To review a large migration before it runs, write the plan to a file, check it, then apply it. This scans the source and destination once, instead of once for a dry run and again for the real run.

```bash
hf sync ./data hf://buckets/<namespace>/<bucket>/data --plan plan.jsonl   # scan once, write the plan
hf sync --apply plan.jsonl                                                # run exactly that plan
```

Run `--apply` from the directory where you created the plan, since the plan records the source path as you typed it. `--apply` doesn't check what has already been uploaded, so to resume an interrupted run, re-run the plain `hf sync` command instead.

To verify, check that a dry run has nothing left to transfer, and spot-check the contents:

```bash
hf sync ./data hf://buckets/<namespace>/<bucket>/data --dry-run
hf buckets ls hf://buckets/<namespace>/<bucket>/data
```

### Tuning

- **Keep the cache on fast disk.** The Xet client caches chunks and a deduplication index (the shard cache) under `HF_HOME`. Point `HF_HOME` at local NVMe if your home directory isn't on one.
- **Turn on high-performance mode** for bulk migrations on a well-resourced machine. `HF_XET_HIGH_PERFORMANCE=1` raises concurrency, buffer sizes, and the number of files ingested at once, so the client can use every CPU core and saturate the network. It is meant for machines with high bandwidth and fast disk; with `hf_xet` versions before 1.7.0, only use it with at least 64 GB of RAM (check yours with `hf env`). See [Environment Variables](./xet/using-xet-storage#environment-variables).
- **Cap the shard cache.** Its size limit is soft: the cache is pruned only at the start of a run, so within one long run it can grow well past the limit. On a large migration, especially in high-performance mode, it can grow to hundreds of GB and fill the disk, aborting the run. Set `HF_XET_SHARD_CACHE_SIZE_LIMIT` comfortably below your free disk space, but no lower than you need: a cache of size *X* deduplicates against roughly 1000 × *X* of data. See [Shard Cache](./xet/using-xet-storage#shard-cache).

Set these before starting the sync. Sizes accept human-readable values like `64gb`:

```bash
export HF_HOME=/mnt/nvme/hf                 # chunk and shard caches on NVMe
export HF_XET_HIGH_PERFORMANCE=1            # use all cores and the full network
export HF_XET_SHARD_CACHE_SIZE_LIMIT=64gb   # keep the shard cache under free disk space

hf sync ./data hf://buckets/<namespace>/<bucket>/data
```

### Split by subpath (experimental)

For very large datasets, you can split the source into subpaths and run several `hf sync` processes at once. Early testing suggests throughput scales roughly linearly, but this needs more validation. Two rules:

- Split on related data, so each worker's files deduplicate well against each other.
- Give each worker its own `HF_HOME` so they don't contend for the cache. Each cache takes disk space, so divide `HF_XET_SHARD_CACHE_SIZE_LIMIT` between workers.

```bash
HF_HOME=/mnt/nvme/hf-a hf sync ./data/groupA hf://buckets/<namespace>/<bucket>/groupA &
HF_HOME=/mnt/nvme/hf-b hf sync ./data/groupB hf://buckets/<namespace>/<bucket>/groupB &
wait
```

A single process shares one cache and deduplicates best, so only split when one process can't saturate your network.

### Troubleshooting

| Symptom | Fix |
|---|---|
| `401` or authentication error | Run `hf auth login` with a **Write** token, and check it with `hf auth whoami`. |
| Slower than expected | Put `HF_HOME` on NVMe, set `HF_XET_HIGH_PERFORMANCE=1`, and [run close to your data](#where-to-run-a-large-migration). |
| Run aborts with a disk-full error | The shard cache filled the disk. Set `HF_XET_SHARD_CACHE_SIZE_LIMIT` below your free space, or move `HF_HOME` to a larger disk. |
| Transfer interrupted | Re-run the same `hf sync` command. Files already uploaded are skipped. |

## From AWS S3 or S3-compatible storage

`hf sync` doesn't read `s3://` URLs, so mount the source bucket as a filesystem with [Mountpoint for Amazon S3](https://github.com/awslabs/mountpoint-s3), then sync from the mount. Your data still goes through the Xet client, so you get client-side deduplication.

```bash
mount-s3 my-source-bucket /mnt/src
hf sync /mnt/src hf://buckets/<namespace>/<bucket>
umount /mnt/src
```

For S3-compatible stores such as Cloudflare R2 or MinIO, add `--endpoint-url <url>` to `mount-s3`. Verification, tuning, and troubleshooting are the same as [for local data](#from-local-disk-or-a-cluster-filesystem).

### Alternative: rclone through the S3 gateway

Use this if you already run rclone and would rather not mount. The trade-off: rclone sends every byte through the [S3 gateway](./storage-buckets-s3) with no client-side deduplication, so it transfers more than `hf sync`. You need [S3 credentials](./storage-buckets-s3#generating-s3-credentials) for the gateway.

> [!WARNING]
> Use rclone 1.70 or newer (check with `rclone version`, upgrade from [rclone downloads](https://rclone.org/downloads/)). Older versions can run out of memory listing very large buckets. Older advice often recommends [`--fast-list`](https://rclone.org/docs/#fast-list); with a recent rclone you don't need it, and on a huge listing it holds everything in memory and can cause the same failure.

Add the gateway as a remote in `~/.config/rclone/rclone.conf`, next to the remote for your source (`aws` below):

```ini
[hf]
type = s3
provider = Other
endpoint = https://s3.hf.co/<namespace>
access_key_id = HFAK...
secret_access_key = ...
region = us-east-1
force_path_style = true
list_version = 2
upload_cutoff = 256M
chunk_size = 256M
```

The gateway supports only ListObjectsV2, so `list_version = 2` is required. The 256M multipart settings mean fewer, larger parts, which improves deduplication. Then copy and check:

```bash
rclone copy aws:my-source-bucket hf:<bucket> --transfers 16 --checkers 16 --progress
rclone check aws:my-source-bucket hf:<bucket>
```

`rclone copy` transfers only missing or changed objects, so it's safe to re-run to resume. Before a large import, read the [gateway limitations](./storage-buckets-s3#limitations-and-differences-from-aws-s3), especially the object key naming rules.

## From Google Cloud Storage or Azure Blob Storage

Same approach as S3: mount the source with its cloud's own driver, then run `hf sync`.

**Google Cloud Storage**: mount with [gcsfuse](https://cloud.google.com/storage/docs/gcsfuse).

```bash
gcsfuse my-gcs-bucket /mnt/src
hf sync /mnt/src hf://buckets/<namespace>/<bucket>
```

**Azure Blob Storage**: mount with [blobfuse2](https://learn.microsoft.com/azure/storage/blobs/blobfuse2-what-is). The config file names your storage account and container.

```bash
blobfuse2 mount /mnt/src --config-file=./blobfuse2.yaml
hf sync /mnt/src hf://buckets/<namespace>/<bucket>
```

Without a mount, you can use rclone (it reads GCS and Azure natively; reuse the `hf` remote [above](#alternative-rclone-through-the-s3-gateway), with the same no-deduplication trade-off), or [run the migration as a Job](#run-the-migration-in-the-background-with-jobs).

## Run the migration in the background with Jobs

[Jobs](./jobs) runs a script on Hugging Face compute: you pick the hardware, launch it from the CLI, and [pay by the minute](./jobs-pricing). Use it when you want a long, multi-TB migration to run unattended instead of on your laptop or a session you have to keep open.

**1. Write the migration script** (`migrate.py`). This example streams an S3 prefix into a bucket through the Xet client, so writes are deduplicated, and skips files already copied, so it's safe to re-run. Adapt the settings at the top:

```python
# /// script
# dependencies = ["huggingface_hub", "boto3"]
# ///
import boto3
from huggingface_hub import HfFileSystem

# --- adapt these ---
SRC_BUCKET = "my-source-bucket"
SRC_PREFIX = "some/prefix/"
DST = "buckets/<namespace>/<bucket>"
# -------------------

s3 = boto3.client("s3")   # AWS credentials come from the Job's secrets
fs = HfFileSystem()       # HF token comes from the Job's HF_TOKEN secret

pages = s3.get_paginator("list_objects_v2").paginate(Bucket=SRC_BUCKET, Prefix=SRC_PREFIX)
for page in pages:
    for obj in page.get("Contents", []):
        key, size = obj["Key"], obj["Size"]
        dst = f"{DST}/{key}"
        if fs.exists(dst) and fs.size(dst) == size:
            continue  # already copied
        body = s3.get_object(Bucket=SRC_BUCKET, Key=key)["Body"]
        with fs.open(dst, "wb") as out:
            for chunk in iter(lambda: body.read(64 << 20), b""):
                out.write(chunk)
        print(f"copied {key}")
```

For GCS or Azure, swap `boto3` for that cloud's SDK (`google-cloud-storage`, `azure-storage-blob`) and adjust the listing and read calls. The destination half stays the same.

**2. Launch it as a background Job**, passing your credentials as secrets:

```bash
hf jobs uv run --detach --flavor cpu-performance --timeout 24h \
  --secrets HF_TOKEN \
  --secrets AWS_ACCESS_KEY_ID \
  --secrets AWS_SECRET_ACCESS_KEY \
  migrate.py
```

Each `--secrets NAME` passes the value of that variable from your environment (for `HF_TOKEN`, your logged-in token is used if it isn't set). Jobs stop after 30 minutes by default, so set `--timeout` long enough for the whole transfer; if a Job stops early, launch it again and it skips the files already copied.

`--detach` returns right away with a Job ID. Follow progress with `hf jobs logs -f <job_id>`, list runs with `hf jobs ls`, and see hardware options with `hf jobs hardware`.

## From a Hub repository or another bucket

If the data is already on the Hub, in a model or dataset repository or another bucket, copy it server-side. For [Xet](./xet/index)-tracked files only content hashes move, so the copy is near-instant and nothing is re-uploaded.

```bash
# From a dataset repository into a bucket
hf buckets cp hf://datasets/<org>/<dataset>/<path> hf://buckets/<namespace>/<bucket>/<path>

# From one bucket to another
hf buckets cp hf://buckets/<namespace>/<bucket-a>/<path> hf://buckets/<namespace>/<bucket-b>/<path>
```

- Source and destination must be in the same storage region.
- You need read access to the source and write access to the destination.
- Small files that aren't Xet-tracked (configs, READMEs) are downloaded and re-uploaded automatically.
- Copying from a bucket back into a repository isn't available yet; it's on the roadmap.

See [Copying files between repos and buckets](./storage-buckets#copying-files-between-repos-and-buckets) for the Python equivalent.

## Very large S3 prefixes with hf-s3ream

> [!WARNING]
> hf-s3ream is an early-stage (alpha) community tool, not an officially supported Hugging Face product. Test it on a small prefix before using it for a large migration.

[hf-s3ream](https://huggingface.co/spaces/glutamatt/hf-s3ream) runs a large S3-to-bucket copy from a web UI:

1. Sign in with Hugging Face.
2. Enter the S3 source prefix, the destination bucket, and your AWS credentials.
3. **Analyze** runs a cheap dry run that checks access, detects the source region, and recommends a configuration. It creates the destination bucket (private) if it doesn't exist.
4. **Run** launches a planner job. The planner builds a range-based copy plan, starts copier jobs, and shows progress on a live graph. The copy keeps running if you close the tab, but the page won't reconnect to it.

hf-s3ream runs on [Jobs](./jobs) under your account, so the Jobs are billed to you. S3 buckets that only allow access from a private network (VPC) can't be reached from Jobs.

## Where to run a large migration

For a multi-TB migration you'll usually run the transfer on a cloud VM rather than a laptop. If you'd rather not manage a VM, [run it as a Job](#run-the-migration-in-the-background-with-jobs).

- **Run in the same cloud and region as your source.** Reading the source over the local network is fastest and cheapest, and egress from the source cloud is usually the largest cost. Uploads then go over the internet to Hugging Face (the US region is in AWS `us-east-1`).
- **Use one process with many threads.** A single `hf sync` in high-performance mode shares one deduplication cache. [Split by subpath](#split-by-subpath-experimental) only when one process can't saturate your network.
- **Keep long runs alive.** Over SSH, start the migration inside [`tmux`](https://github.com/tmux/tmux/wiki) (or `screen`, or `nohup`) so it survives a dropped session: `tmux new -s migrate`, detach with Ctrl-b then d, and reattach later with `tmux attach -t migrate`.

Sizing starting points, to validate on a test run:

| Resource | Guidance | AWS example | GCP example |
|---|---|---|---|
| Disk | Local NVMe for `HF_HOME`, with free space above your shard cache limit. Avoid network-attached disks for the cache. | Instance-store NVMe (`c7i`/`m7i` `d` variants, or `i4i`) | Local SSD on an `n2` or `c3` VM |
| CPU | Many vCPUs: the client chunks and hashes data on the CPU. | `c7i.8xlarge` or larger | `c3-standard-22` or larger |
| Memory | Plenty for high-performance mode's buffers; at least 64 GB with `hf_xet` before 1.7.0. | — | — |
| Network | High bandwidth to the internet (25 Gbps class). | — | — |

## Next steps

- **Use the data in place.** Mount the bucket as a local filesystem with [hf-mount](./storage-buckets-access#mount-as-a-local-filesystem), or as a [volume in Jobs and Spaces](./storage-buckets-access#volume-mounts-in-jobs-and-spaces).
- **Read it from your tools.** pandas, Dask, PyArrow, Daft, DuckDB, 🤗 Datasets, and Spark read `hf://buckets/...` paths directly. See [Bucket Integrations](./storage-buckets-integrations).

> [!WARNING]
> Don't run a bulk ingest through a mount. hf-mount stages writes in an on-disk cache (`/tmp/hf-mount-cache` by default), and a large migration through it can fill that disk. Use one of the paths above to get data into a bucket. If you must write a lot through a mount, point the cache at a disk with plenty of free space: `hf-mount start --cache-dir /mnt/big bucket <namespace>/<bucket> /mnt/data` (the flag goes before `bucket`).
