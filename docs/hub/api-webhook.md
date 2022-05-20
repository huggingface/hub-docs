---
title: Webhook
---

<h1>Webhook</h1>

If you ever need to programmatically get notified about all the changes/additions to model/dataset/Space repositories on the Hugging Face Hub, you can subscribe to the Hugging Face Hub webhook.

When you're subscribed – meaning you sent us a URL on your side that you want us to ping – we will call it over HTTP with the following payload:

```python
{ "add": "user/model_id" }
# or
{ "add": "datasets/user/dataset_id" }
# or
{ "update": "spaces/organization/space_id" }
# or
{ "remove": "user/model_id" }
```

✉️ Contact us at `website at huggingface.co` if you would like to subscribe to the webhook.
