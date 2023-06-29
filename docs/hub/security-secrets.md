# Secrets Scanning

It is important to manage [your secrets (env variables) properly](./spaces-overview#managing-secrets). The most common way people expose their secrets to outside world is hard-coding their secrets in their `app.py` files directly, which makes it possible for a malicious user to utilise your secrets and services your secrets have access to. 

For example, here is how example `app.py` described above might look like:

```py
import numpy as np
import scipy as sp

api_key = "sw-xyz1234567891213"

def call_inference(prompt: str) -> str:
    result = call_api(prompt, api_key)
    return result
```

To prevent this issue, we run an automated bot (Spaces Secrets Scanner) that scans for hard-coded secrets and opens a discussion (in case hard-coded secrets are found) about the exposed secrets & how to handle this problem.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/token-scanner-light.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/token-scanner-dark.png"/>
</div>
