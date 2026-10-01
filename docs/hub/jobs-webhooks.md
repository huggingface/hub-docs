# Webhooks Automation

Webhooks allow you to listen for new changes on specific repositories or buckets, or to all repositories belonging to particular set of users/organizations (not just your repos, but any repo) on Hugging Face.

Use `create_webhook` in the `huggingface_hub` Python client to create a webhook that triggers a Job when a change happens in a Hugging Face repository:

```python
from huggingface_hub import create_webhook

# Example: Creating a webhook that triggers a Job
webhook = create_webhook(
    job_id=job_id,
    watched=[{"type": "user", "name": "your-username"}, {"type": "org", "name": "your-org-name"}],
    domains=["repo", "discussion"],
    secret="your-secret"
)
```

To run a Job when files are added to or deleted from a [bucket](./storage-buckets), watch the bucket:

```python
webhook = create_webhook(
    job_id=job_id,
    watched=[{"type": "bucket", "name": "your-username/your-bucket"}],
    domains=["repo"],
)
```

For a complete example, see [Process new files in a bucket with Jobs](./webhooks-guide-bucket-jobs).

The webhook triggers the Job with the following environment variables:

- `WEBHOOK_PAYLOAD`: the full webhook payload as a JSON string
- `WEBHOOK_REPO_ID`: the repository or bucket name (e.g., `user/repo-name`)
- `WEBHOOK_REPO_TYPE`: the repository type (`model`, `dataset`, `space`, or `bucket`)
- `WEBHOOK_SECRET`: the webhook secret, if one was configured
- `WEBHOOK_ID`: a unique identifier for the delivery, stable across retries of that delivery

> [!WARNING]
> A webhook run does not keep the Job's volumes. To run a UV script from a webhook, define your job with `hf jobs run <image> uv run <url>`, otherwise `hf jobs uv run` uploads the script to a volume, which a webhook run does not have.

The webhook payload contains multiple fields, here are a few useful ones:

```
- event:
  - action: one of "create", "delete", "move", "update"
  - scope: string
- repo:
  - owner: string
  - headSha: string (not sent for buckets)
  - name: string
  - type: one of "dataset", "model", "space", "bucket"
- updatedFiles: for bucket file changes, the list of added and deleted files
```

You can find more information on webhooks in the [`huggingface_hub` Webhooks documentation](https://huggingface.co/docs/huggingface_hub/en/guides/webhooks).
