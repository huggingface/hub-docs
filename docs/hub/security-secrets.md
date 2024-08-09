# Secrets Scanning

It is important to manage [your secrets (env variables) properly](./spaces-overview#managing-secrets-and-environment-variables). The most common way people expose their secrets to the outside world is by hard-coding their secrets in their code files directly, which makes it possible for a malicious user to utilize your secrets and services your secrets have access to.

For example, this is what a compromised `app.py` file might look like:

```py
import numpy as np
import scipy as sp

api_key = "sw-xyz1234567891213"

def call_inference(prompt: str) -> str:
    result = call_api(prompt, api_key)
    return result
```

To prevent this issue, we run a tool called [TruffleHog](https://trufflesecurity.com/trufflehog) on each push you make. TruffleHog scans for hard-coded secrets and we will send you an email upon detection. You'll only receive an email for verified secrets. Verified secrets are secrets that have been verified by trufflehog, meaning that they can be used to authenticate to their given provider. Note that unverified secrets are not necessarily invalid, verification can also fail due to technical reasons, e.g. in that case of a network error.

You can opt-out from those email notifications from [your settings](https://huggingface.co/settings/notifications).

TODO: add a picture of the email?
