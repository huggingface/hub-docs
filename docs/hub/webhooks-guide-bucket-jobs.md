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

So the Job processes only the new files, and it can decide how to handle each one before downloading anything.

Each run reuses the Job's image, command, environment variables, hardware flavor and timeout. It does not get the Job's volumes or its secrets. That is why the steps below run the script from a URL and put the token on the webhook.

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
hf jobs run --flavor cpu-upgrade --timeout 2h \
    -e OUTPUT_BUCKET=your-username/my-parquet \
    ghcr.io/astral-sh/uv:python3.12-bookworm \
    uv run https://huggingface.co/datasets/uv-scripts/data-processing/raw/main/optimize-parquet.py
```

The script runs from its URL, with `hf jobs run`. `hf jobs uv run` is the usual way to run a UV script, but it uploads the script to a volume, which a webhook run would not have. `cpu-upgrade` is enough for this work, and the two-hour timeout leaves room for large files.

The script can also be in a private repo. Add `--secrets HF_TOKEN` to the command, with a token that can read that repo, so that uv can download the script. If the run fails with a `SyntaxError`, the token cannot read the script. Webhook runs do not get this secret, so the token you give the webhook must also be able to read the repo.

`hf jobs run` starts the Job at once. This first run has no webhook event, and `optimize-parquet.py` does nothing without one, so the Job stops straight away. Copy the Job ID that it prints.

### Create the webhook

Watch the first bucket and run your Job when it changes:

```bash
hf webhooks create --job-id <job ID> --watch bucket:your-username/my-raw-files \
    --domain repo --secrets HF_TOKEN
```

`--domain repo` restricts the webhook to file and settings changes. Buckets only send those, so this is explicit rather than necessary, but it keeps the command right if you later watch a model or dataset.

`--secrets HF_TOKEN` stores a token with the webhook, encrypted. Every Job the webhook starts receives it as a secret and uses it to read and write the buckets. The value comes from `HF_TOKEN` in your environment, or from the token you logged in with. A [fine-grained token](./security-tokens) with only the permissions the Job needs is the safest choice.

> [!TIP]
> To use a token made just for this pipeline, pass the value explicitly with `--secrets HF_TOKEN=hf_…`, or keep it out of your shell history by piping it in: `printf 'HF_TOKEN=hf_…\n' | hf webhooks create … --secrets-file -`.

The command prints the webhook ID. To stop the pipeline later, delete the webhook with `hf webhooks delete <webhook ID>`.

### Upload a file

```bash
hf buckets cp data.csv hf://buckets/your-username/my-raw-files/data.csv
```

About a minute later, a Job appears on your [Jobs page](https://huggingface.co/settings/jobs). If none does, open the Activity tab of the webhook in your [webhook settings](https://huggingface.co/settings/webhooks) to see the delivery, and read a Job's output with `hf jobs logs <job ID>`. When the Job finishes, the Parquet file is in the second bucket:

```bash
hf buckets ls your-username/my-parquet -R
```

```text
data.csv/README.md
data.csv/data/train-00000-of-00001.parquet
```

To convert many files, upload them with one `hf buckets sync`. Files uploaded together usually arrive as one event, so one Job converts all of them, up to 10,000 files per event. See [Webhooks](./webhooks#buckets) for the full bucket payload and what happens above that limit.

### What the script does

The part that is specific to webhooks is reading the event:

```python
event = json.loads(os.environ.get("WEBHOOK_PAYLOAD", "{}"))  # empty when you run the Job yourself
input_bucket = os.environ.get("WEBHOOK_REPO_ID")

for changed_file in event.get("updatedFiles", []):
    if changed_file["action"] != "add":
        continue  # skip deleted files
    path, size = changed_file["path"], changed_file["size"]
    ...  # convert the file (see the full script)
```

For each new file, the script loads it with `datasets` straight from the bucket (`hf://buckets/...`). If the file is larger than a third of the Job's free disk, it is streamed instead of downloaded. `push_to_hub` then writes it to the output bucket as Parquet with content-defined chunking, a page index and row groups of at most 100 MB.

## Use the pattern for your own task

Keep the setup and change the script. For example:

- **Remove personal data before training.** Collect raw text in a private bucket, redact personal information with a model such as [GLiNER2 PII filter](https://huggingface.co/fastino/gliner2-privacy-filter-PII-multi), and push only the redacted text to your training dataset.
- **Evaluate new checkpoints.** A training Job saves checkpoints to a bucket, and each new checkpoint starts an evaluation Job. If a checkpoint is uploaded in several parts, react only when a marker file you write last appears in `updatedFiles`; events can arrive out of order.
- **Transcribe or embed new files.** Turn new recordings into transcripts, or new documents into embeddings for search.

When you write your script, decide what it does in the first run, when `WEBHOOK_PAYLOAD` is not set. It can exit, as `optimize-parquet.py` does, or do real work, such as processing the files that were already in the bucket. If the first run needs a token, for example to read the bucket or a private script, add `--secrets HF_TOKEN` to `hf jobs run`. Webhook runs do not get this secret. They get their token from the webhook.

## Webhook or schedule?

A webhook starts a Job for every event, so new files are processed about a minute after they arrive. If they don't need to be processed that fast, a [scheduled Job](./jobs-schedule) is an alternative: it runs every hour or every day and processes everything that arrived since the last run. This groups the work into fewer Jobs, which helps with GPU tasks that are slow to start, and it avoids the webhook limit of 1,000 triggers per 24 hours. The script must then find the new files itself, for example by comparing the input and output buckets.
