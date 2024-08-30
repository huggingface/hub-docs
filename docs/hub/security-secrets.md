# Secrets Scanning

It is important to manage [your secrets (env variables) properly](./spaces-overview#managing-secrets). The most common way people expose their secrets to the outside world is by hard-coding their secrets in their code files directly, which makes it possible for a malicious user to utilize your secrets and services your secrets have access to.

For example, this is what a compromised `app.py` file might look like:

```py
import numpy as np
import scipy as sp

api_key = "sw-xyz1234567891213"

def call_inference(prompt: str) -> str:
    result = call_api(prompt, api_key)
    return result
```

To prevent this issue, we run [TruffleHog](https://trufflesecurity.com/trufflehog) on each push you make. TruffleHog scans for hard-coded secrets, and we will send you an email upon detection.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/token-leak-email-example.png"/>
</div>

You'll only receive emails for verified secrets, which are the ones that have been confirmed to work for authentication against their respective providers. Note, however, that unverified secrets are not necessarily harmless or invalid: verification can fail due to technical reasons, such as in the case of a network error.

TruffleHog can verify secrets that work across multiple services, it is not restricted to Hugging Face tokens.

You can opt-out from those email notifications from [your settings](https://huggingface.co/settings/notifications).

