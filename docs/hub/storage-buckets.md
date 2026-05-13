# Storage Buckets

Storage Buckets are a repo type on the Hugging Face Hub providing S3-like object storage, powered by the [Xet](./xet/index) storage backend. Unlike Git-based [repositories](./repositories) (models, datasets, Spaces), buckets are **non-versioned** and **mutable**, designed for use cases where you need simple, fast storage such as training checkpoints, logs, intermediate artifacts, or any large collection of files that doesn't need version control.

You can interact with buckets using the Hub web interface, the [`hf` CLI](https://huggingface.co/docs/huggingface_hub/guides/cli#hf-buckets), or the [Python API](https://huggingface.co/docs/huggingface_hub/guides/buckets).

> [!TIP]
> Buckets are available to all users and organizations. See [hf.co/storage](https://huggingface.co/storage) for pricing details.

> [!TIP]
> See [Access Patterns](./storage-buckets-access) for how to reach bucket data from your tools (mount as a filesystem, `hf://` paths, volume mounts in Jobs/Spaces), and [Bucket Integrations](./storage-buckets-integrations) for ready-to-use snippets in popular data libraries like pandas, Dask, and Spark.

## Buckets vs Repositories

The Hub offers two types of storage: Git-based **repositories** for versioned, collaborative work and **buckets** for fast, mutable object storage.

| Feature            | Repositories (Git-based)        | Storage Buckets                     |
| ------------------ | ------------------------------- | ----------------------------------- |
| Versioning         | Full Git history                | None (mutable, overwrite-in-place)  |
| Types              | Models, Datasets, Spaces        | Standalone bucket                   |
| Primary use case   | Publishing finished artifacts   | Working storage / intermediate data |
| Operations         | Hub API, Git push/pull          | S3-like `sync`, `cp`, `rm`          |
| Deduplication      | Xet chunk-level                 | Xet chunk-level                     |
| Pull Requests      | Yes                             | No                                  |
| Model/Dataset Cards| Yes                             | No (but plain README rendered)      |

Use **repositories** when you want version history, collaboration features (PRs, discussions), and library integrations. Use **buckets** when you need fast, mutable storage for data that changes frequently — files can be overwritten or deleted in place.

## Creating a Bucket

### From the Hub UI

1. Navigate to [huggingface.co/new-bucket](https://huggingface.co/new-bucket):

<!-- TODO: Screenshot of the bucket creation page showing name field, owner selector, and visibility toggle -->
<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/buckets/buckets-create.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/buckets/buckets-create-dark.png"/>
</div>

2. Specify the owner of the bucket: this can be either you or any of the organizations you're affiliated with.

3. Enter a bucket name.

4. Choose whether the bucket should be public or private.

5. Optionally, preselect [CDN pre-warming](#pre-warming-and-cdn) regions to cache your data closer to your compute from the start.

After creating the bucket, you should see the bucket page:

<!-- TODO: Screenshot of the empty bucket page right after creation -->
<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/buckets/buckets-empty.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/buckets/buckets-empty-dark.png"/>
</div>

### From the CLI

```bash
# Create a bucket under your namespace
hf buckets create my-bucket

# Create a private bucket
hf buckets create my-bucket --private

# Create a bucket under an organization
hf buckets create my-org/shared-bucket
```

### From Python

```python
from huggingface_hub import create_bucket

# Create a bucket under your namespace
create_bucket("my-bucket")

# Create a private bucket
create_bucket("my-bucket", private=True)

# Create a bucket under an organization
create_bucket("my-org/shared-bucket")
```

For the full Python API reference including deleting, moving, and listing buckets, see the [`huggingface_hub` Buckets guide](https://huggingface.co/docs/huggingface_hub/guides/buckets).

## Browsing Buckets on the Hub

Every bucket has a page on the Hub where you can browse its contents, navigate directories, and view file details. Bucket pages are available at `https://huggingface.co/buckets/<owner>/<bucket-name>`.

<!-- TODO: Screenshot of a bucket file browser showing several files and folders with sizes and timestamps -->
<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/buckets/buckets-file-browser.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/buckets/buckets-file-browser-dark.png"/>
</div>

### README rendering

If a directory in your bucket contains a `README.md` file, the Hub renders it below the file list on that directory's page. This works both at the bucket root and inside any subdirectory — useful for documenting what a bucket contains, how data is organized, or how downstream tools should consume it.

### Listing from the CLI

You can also list bucket contents from the CLI:

```bash
# List files in a bucket (with human-readable sizes)
hf buckets list julien-c/my-training-bucket -h
                     Feb 17 14:46  art/
                     Feb 17 14:58  arxivqa/
                     Feb 17 15:02  arxivqa2/
                     Feb 17 15:04  arxivqa3/
                     Feb 17 14:47  captcha/
                     Feb 17 14:53  captcha2/
                     Feb 24 17:22  julien/

# Recursive listing
hf buckets list julien-c/my-training-bucket/art -h -R
    423.6 MB         Feb 17 14:29  art/train-00000-of-00011.parquet
    441.0 MB         Feb 17 14:29  art/train-00001-of-00011.parquet
    521.7 MB         Feb 17 14:29  art/train-00002-of-00011.parquet
    481.4 MB         Feb 17 14:29  art/train-00003-of-00011.parquet
    444.6 MB         Feb 17 14:29  art/train-00004-of-00011.parquet
    461.6 MB         Feb 17 14:29  art/train-00005-of-00011.parquet
    466.4 MB         Feb 17 14:29  art/train-00006-of-00011.parquet
    486.3 MB         Feb 17 14:29  art/train-00007-of-00011.parquet
    477.0 MB         Feb 17 14:29  art/train-00008-of-00011.parquet
    454.0 MB         Feb 17 14:29  art/train-00009-of-00011.parquet
    483.1 MB         Feb 17 14:29  art/train-00010-of-00011.parquet

# Tree view
hf buckets list julien-c/my-training-bucket --tree -h -R
                        ├── art/
423.6 MB  Feb 17 14:29  │   ├── train-00000-of-00011.parquet
441.0 MB  Feb 17 14:29  │   ├── train-00001-of-00011.parquet
521.7 MB  Feb 17 14:29  │   ├── train-00002-of-00011.parquet
481.4 MB  Feb 17 14:29  │   ├── train-00003-of-00011.parquet
444.6 MB  Feb 17 14:29  │   ├── train-00004-of-00011.parquet
461.6 MB  Feb 17 14:29  │   ├── train-00005-of-00011.parquet
466.4 MB  Feb 17 14:29  │   ├── train-00006-of-00011.parquet
486.3 MB  Feb 17 14:29  │   ├── train-00007-of-00011.parquet
477.0 MB  Feb 17 14:29  │   ├── train-00008-of-00011.parquet
454.0 MB  Feb 17 14:29  │   ├── train-00009-of-00011.parquet
483.1 MB  Feb 17 14:29  │   └── train-00010-of-00011.parquet
                        ├── arxivqa/
495.9 MB  Feb 17 14:32  │   ├── train-00000-of-00164.parquet
518.3 MB  Feb 17 14:32  │   ├── train-00001-of-00164.parquet
495.5 MB  Feb 17 14:32  │   ├── train-00002-of-00164.parquet
486.6 MB  Feb 17 14:32  │   ├── train-00003-of-00164.parquet
490.4 MB  Feb 17 14:32  │   ├── train-00004-of-00164.parquet
...
```

## Managing Files

You can upload and download files directly from the bucket page on the Hub, or use the CLI and Python API for programmatic access. Bucket files are referenced using `hf://buckets/` paths (e.g., `hf://buckets/username/my-bucket/path/to/file`). The `hf buckets cp` command handles individual file transfers while `hf buckets sync` is better suited for directories. All commands work in both directions — local-to-remote and remote-to-local.

### Uploading files

For quick uploads, you can drag and drop files directly on the bucket page in your browser. For programmatic use, `hf buckets cp` copies individual files into a bucket. The source is a local path and the destination is an `hf://buckets/` path. You can also pipe data from stdin, which is handy for programmatically generated content.

**CLI:**
```bash
# Upload a single file
hf buckets cp ./model.safetensors hf://buckets/username/my-bucket/models/model.safetensors

# Upload from stdin
cat config.json | hf buckets cp - hf://buckets/username/my-bucket/config.json
```

In Python, use `batch_bucket_files` to upload one or more files in a single call. Each entry is a tuple of `(local_path, remote_path)`.

**Python:**
```python
from huggingface_hub import batch_bucket_files

batch_bucket_files(
    "username/my-bucket",
    add=[
        ("./model.safetensors", "models/model.safetensors"),
        ("./config.json", "models/config.json"),
    ],
)
```

For more upload options (raw bytes, combined upload+delete, etc.), see the [`huggingface_hub` upload guide](https://huggingface.co/docs/huggingface_hub/guides/buckets#upload-files).

### Downloading files

You can download individual files directly from the bucket page on the Hub by clicking on them. For programmatic access, downloading mirrors the upload syntax — swap the source and destination in `hf buckets cp`. You can also stream a file to stdout by using `-` as the destination, which lets you pipe bucket contents directly into other tools.

**CLI:**
```bash
# Download a single file
hf buckets cp hf://buckets/username/my-bucket/models/model.safetensors ./model.safetensors

# Download to stdout and pipe
hf buckets cp hf://buckets/username/my-bucket/config.json - | jq .
```

In Python, use `download_bucket_files` with a list of `(remote_path, local_path)` tuples.

**Python:**
```python
from huggingface_hub import download_bucket_files

download_bucket_files(
    "username/my-bucket",
    files=[
        ("models/model.safetensors", "./local/model.safetensors"),
        ("config.json", "./local/config.json"),
    ],
)
```

For faster downloads using pre-fetched metadata, see the [`huggingface_hub` download guide](https://huggingface.co/docs/huggingface_hub/guides/buckets#download-files).

### Syncing directories

The `sync` command works like `rsync` or `aws s3 sync` — it compares source and destination and only transfers files that have changed. This is the most efficient way to keep a local directory and a bucket in sync. By default, `sync` only adds and updates files. Pass `--delete` to also remove files at the destination that no longer exist at the source. Use `--dry-run` to preview what would happen without actually transferring anything.

**CLI:**
```bash
# Upload a local directory to a bucket
hf buckets sync ./data hf://buckets/username/my-bucket/data

# Download from a bucket to a local directory
hf buckets sync hf://buckets/username/my-bucket/data ./data

# Sync with deletion of extraneous files
hf buckets sync ./data hf://buckets/username/my-bucket/data --delete

# Preview what would be synced without executing
hf buckets sync ./data hf://buckets/username/my-bucket/data --dry-run

# Plan and apply: review the sync plan before executing
hf buckets sync ./data hf://buckets/username/my-bucket/data --plan sync-plan.jsonl
# ... review the plan file, then apply it
hf buckets sync --apply sync-plan.jsonl
```

> [!TIP]
> `hf sync` is a convenient alias for `hf buckets sync`.

**Python:**
```python
from huggingface_hub import sync_bucket

# Upload a local directory to a bucket
sync_bucket("./data", "hf://buckets/username/my-bucket/data")

# Download from a bucket to a local directory
sync_bucket("hf://buckets/username/my-bucket/data", "./data")
```

The `sync` command supports filtering (`--include`, `--exclude`), comparison modes (`--ignore-times`, `--existing`), and a **plan-and-apply** workflow to review operations before executing them. For the full set of options, see the [`huggingface_hub` sync guide](https://huggingface.co/docs/huggingface_hub/guides/buckets#sync-directories).

### Deleting files

Since buckets are non-versioned, deletions are immediate and permanent — there is no way to recover a deleted file. Use `--dry-run` to double-check before removing files, especially when using `--recursive`.

**CLI:**
```bash
# Remove a single file
hf buckets rm username/my-bucket/old-model.bin

# Remove all files under a prefix
hf buckets rm username/my-bucket/logs/ --recursive

# Preview what would be deleted
hf buckets rm username/my-bucket/checkpoints/ --recursive --dry-run
```

**Python:**
```python
from huggingface_hub import batch_bucket_files

batch_bucket_files("username/my-bucket", delete=["old-model.bin", "logs/debug.log"])
```

For more deletion options (pattern-based filtering, recursive removal, etc.), see the [`huggingface_hub` delete guide](https://huggingface.co/docs/huggingface_hub/guides/buckets#delete-files).

### Copying files between repos and buckets

You can copy [Xet](./xet/index)-tracked files from any repository (model, dataset, Space) or bucket into a destination bucket without re-uploading the data. The copy is server-side: only the Xet content hashes are migrated, so even very large files are copied instantly.

> [!NOTE]
> Only Xet-tracked files are copied server-to-server. Small non-Xet files (e.g., config files and READMEs) are automatically downloaded and re-uploaded.

**CLI:**
```bash
hf buckets cp \
  hf://datasets/HuggingFaceFW/fineweb/data \
  hf://buckets/username/fineweb-data
```

**Python:**
```python
from huggingface_hub import HfApi

api = HfApi()

api.copy_files(
    "hf://datasets/HuggingFaceFW/fineweb/data",
    "hf://buckets/username/fineweb-data",
)
```

You need read access to the source repository or bucket and write access to the destination bucket.

Note that transferring data the other way from a bucket to a repository (model, dataset, Space) without reuploading is not yet available, but is on the roadmap.

## Pre-warming and CDN

Buckets live on the Hub's global storage by default. For workloads where storage location directly affects throughput you can **pre-warm** bucket data to bring it closer to your compute.

Pre-warming caches files at edge locations near specific cloud providers and regions, so your jobs read data locally instead of pulling it across regions. This is especially useful for:

- Training clusters that need fast access to large datasets or checkpoints
- Multi-region setups where different parts of a pipeline run in different clouds
- Distributing large artifacts to many consumers worldwide

See [hf.co/storage](https://huggingface.co/storage) for available regions and details on enabling pre-warming.

## Use Cases

### Training checkpoints and logs

When running training jobs (e.g., via [Jobs](./jobs)), save checkpoints and logs to a bucket. Unlike a Git repo, you can overwrite the latest checkpoint without accumulating version history, and `sync` ensures only changed data is transferred.

```bash
# After each evaluation step, sync checkpoints to a bucket
hf sync ./checkpoints hf://buckets/my-org/training-run-42/checkpoints
```

Because buckets are built on [Xet](./xet/index), successive checkpoints where large parts of the model are frozen benefit from chunk-level deduplication. Only the changed chunks are uploaded.

### Data processing pipelines

Buckets serve as staging areas for data processing workflows. Process raw data, write intermediate outputs to a bucket, then promote the final artifact to a versioned [Dataset](./datasets) repository when the pipeline completes. This keeps your versioned repo clean while giving your pipeline fast mutable storage.

Note that transferring data from a Bucket to a repository without reuploading is not yet available, but is on the roadmap.

### Agentic storage

AI agents need scratch storage for intermediate results, tool outputs, traces, and working memory. Buckets provide a Hub-native place for this data: fast mutable access without Git overhead, standard Hugging Face permissions, and addressable via `hf://buckets/` paths across the Hub ecosystem.

### Rolling backups

Buckets are well-suited for maintaining rolling backups. With a Git-based [Dataset](./datasets) repository, deleting outdated files doesn't free storage — Git history retains every past version, so you'd need to squash commits or rewrite history to actually reclaim space. With buckets, old files are truly gone once deleted, and you only pay for what's currently stored.

```bash
# Sync today's backup, removing files that no longer exist locally
hf sync ./daily-backup hf://buckets/my-user/backups/latest --delete
```

### Linking models to buckets

You can create a two-way link between a model and a bucket by adding the `buckets` field to the model card metadata. The linked models will then appear on the bucket page, and the bucket will appear as a tag on the model page.

```yaml
# In the model card YAML frontmatter
buckets:
- my-org/my-bucket
```

See [Specifying a bucket](./model-cards#specifying-a-bucket) in the model cards documentation for more details.

## Pricing

Storage Buckets are billed based on the amount of data stored, with simple per-TB pricing. Enterprise plans benefit from dedup-based billing, where shared chunks across files directly reduce the billed footprint.

As for other repositories, buckets are free to create and have a free storage allowance. For usage above the [free tier](https://huggingface.co/docs/hub/storage-limits), see [hf.co/storage](https://huggingface.co/storage). For general billing information, see the [Billing](./billing) documentation.
