# Webhooks Automation

Webhooks allow you to listen for new changes on specific repositories or to all repositories belonging to particular set of users/organizations (not just your repos, but any repo) on Hugging Face.

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

The webhook triggers the Job with the webhook payload in the environment variable `WEBHOOK_PAYLOAD`.

The webjook payload contains multiple fields, here are a few useful ones:

* event:
  * action: one of "create", "delete", "move", "update"
  * scope: string
* repo:
  * owner: string
  * headSha: string
  * name: string
  * type: one of "dataset", "model", "space"

You can find more information on webhooks in the [`huggingface_hub` Webhooks documentation](https://huggingface.co/docs/huggingface_hub/en/guides/webhooks).
