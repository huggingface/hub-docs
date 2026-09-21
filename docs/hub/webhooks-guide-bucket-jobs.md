# Webhook guide: Process new files in a bucket with Jobs

[Storage Buckets](./storage-buckets) are a good place for files that arrive over time: exports from other tools, logs, recordings, scans. You will often have a workflow that needs to be done to these files before they are useful, such as converting, cleaning or transcribing them.

A webhook on the bucket and a [Job](./jobs) can do this work automatically, without a server. When files change, the webhook starts the Job. The Job receives the list of changed files, processes them and stops. You pay only while it runs.

This guide explains the pattern, then sets it up with one example: converting uploaded CSV and JSON files to optimized Parquet.

## How it works

```text
file uploaded ──▶ webhook ──▶ Job runs with the event ──▶ result written to a second bucket
```

A webhook can [trigger a Job](./jobs-webhooks) instead of calling a URL. You create the Job once, and each webhook event runs it again with the event in its environment. For a bucket, `WEBHOOK_PAYLOAD` lists the files that changed:

```json
{
  "event": { "action": "update", "scope": "repo.content" },
  "repo": { "type": "bucket", "name": "your-username/my-raw-files", ... },
  "updatedFiles": [
    { "path": "data.csv", "action": "add", "xetHash": "433b53b8...", "size": 10983 }
  ]
}
```

So the Job processes only the new files, and it can decide how to handle each file before it downloads anything. For example, it can stream a file that is too large for its disk.

The Job writes its results to a **second bucket**. If it wrote to the bucket it watches, its own output would trigger the webhook again.

## Example: turn uploads into optimized Parquet

CSV and JSON exports are slow to query and awkward to share. [Optimized Parquet](./datasets-libraries#optimized-parquet-files) is faster to filter and stream, and uploads and downloads faster thanks to Xet deduplication. In this example, every CSV, JSON or Parquet file uploaded to one bucket appears as optimized Parquet in another. The Job runs [`optimize-parquet.py`](https://huggingface.co/datasets/uv-scripts/data-processing/blob/main/optimize-parquet.py), a ready-made script from [uv-scripts](https://huggingface.co/uv-scripts).

You need a Hugging Face account with [pre-paid credits](https://huggingface.co/settings/billing) and the [`hf` CLI](https://huggingface.co/docs/huggingface_hub/en/guides/cli#getting-started).

### Create two buckets

One bucket receives your uploads, and the other receives the Parquet files:

```bash
hf buckets create my-raw-files --private
hf buckets create my-parquet --private
```

### Create the Job

Create the Job that the webhook will run:

```bash
hf jobs run --flavor cpu-upgrade --timeout 2h --secrets HF_TOKEN \
    -e OUTPUT_BUCKET=your-username/my-parquet \
    ghcr.io/astral-sh/uv:python3.12-bookworm \
    uv run https://huggingface.co/datasets/uv-scripts/data-processing/raw/main/optimize-parquet.py
```

This first run has no webhook event, so it stops straight away. Copy the Job ID that it prints.

Two details matter for a Job that a webhook runs:

- **The script runs from its URL, with `hf jobs run`.** `hf jobs uv run` is the usual way to run a UV script, but it uploads the script to a volume, and webhook runs don't keep the Job's volumes. `hf jobs run` with the uv image runs the script straight from its URL instead.
- **`--secrets HF_TOKEN` gives the Job a token** to read and write both buckets. A [fine-grained token](./security-tokens) with only the permissions the Job needs is the safest choice.

### Create the webhook

Watch the first bucket and run your Job when it changes:

```bash
hf webhooks create --job-id <job ID> --watch bucket:your-username/my-raw-files --domain repo
```

The command prints the webhook ID. To stop the pipeline later, delete the webhook with `hf webhooks delete <webhook ID>`.

### Upload a file

```bash
hf buckets cp data.csv hf://buckets/your-username/my-raw-files/data.csv
```

About a minute later, a Job appears on your [Jobs page](https://huggingface.co/settings/jobs). When it finishes, the Parquet file is in the second bucket:

```bash
hf buckets ls your-username/my-parquet -R
```

```text
data.csv/README.md
data.csv/data/train-00000-of-00001.parquet
```

To convert many files, upload them with one `hf buckets sync`. Files uploaded together usually arrive as one event, so one Job converts all of them.

### What the script does

The part that is specific to webhooks is reading the event:

```python
event = json.loads(os.environ["WEBHOOK_PAYLOAD"])
input_bucket = os.environ["WEBHOOK_REPO_ID"]

for changed_file in event["updatedFiles"]:
    if changed_file["action"] != "add":
        continue  # skip deleted files
    path, size = changed_file["path"], changed_file["size"]
    ...  # convert the file (see the full script)
```

For each new file, the script loads it with `datasets` straight from the bucket (`hf://buckets/...`). If the file is larger than a third of the Job's free disk, it is streamed instead of downloaded. `push_to_hub` then writes it to the output bucket as Parquet with content-defined chunking, a page index and row groups of at most 100 MB.

## Use the pattern for your own task

Keep the setup and change the script. For example:

- **Remove personal data before training.** Collect raw text in a private bucket, redact personal information with a model such as [GLiNER2 PII filter](https://huggingface.co/fastino/gliner2-privacy-filter-PII-multi), and push only the redacted text to your training dataset.
- **Evaluate new checkpoints.** A training Job saves checkpoints to a bucket, and each new checkpoint starts an evaluation Job. If a checkpoint is uploaded in several parts, react only to the file written last.
- **Transcribe or embed new files.** Turn new recordings into transcripts, or new documents into embeddings for search.

## Webhook or schedule?

A webhook starts a Job for every event, so new files are processed about a minute after they arrive. If they don't need to be processed that fast, a [scheduled Job](./jobs-schedule) is an alternative: it runs every hour or every day and processes everything that arrived since the last run. This groups the work into fewer Jobs, which helps with GPU tasks that are slow to start. The script must then find the new files itself, for example by comparing the input and output buckets.
