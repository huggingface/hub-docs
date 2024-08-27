# Getting Started

The Serverless Inference API allows you to easily do inference on a wide range of models and tasks. You can do requests with your favorite tools (Python, cURL, etc). We also provide a Python SDK (`huggingface_hub`) to make it even easier.

We'll do a minimal example using a [sentiment classification model](https://huggingface.co/cardiffnlp/twitter-roberta-base-sentiment-latest). Please visit task-specific parameters and further documentation in our [API Reference](./parameters.md).

## Getting a Token

Using the Serverless Inference API requires passing a user token in the request headers. You can get a token by signing up on the Hugging Face website and then going to the [tokens page](https://huggingface.co/settings/tokens). We recommend creating a `Fine-grained` token with the scope to `Make calls to the serverless Inference API`.

TODO: add screenshot

## cURL

```bash
curl https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment-latest \
    -X POST \
    -d '{"inputs": "Today is a nice day"}' \
    -H "Authorization: Bearer hf_***" \
    -H "Content-Type: application/json"
```

## Python

You can use the `requests` library to make a request to the Inference API.

```python
import requests

API_URL = "https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment-latest"
headers = {"Authorization": "Bearer hf_***"}

payload = {"inputs": "Today is a nice day"}
response = requests.post(API_URL, headers=headers, json=payload)
response.json()
```

Hugging Face also provides a [`InferenceClient`](https://huggingface.co/docs/huggingface_hub/guides/inference) that handles inference, caching, async, and more. Make sure to install it with `pip install huggingface_hub` first

```python
from huggingface_hub import InferenceClient

client = InferenceClient(model="cardiffnlp/twitter-roberta-base-sentiment-latest", token="hf_***")
client.text_classification("Today is a nice day")
```

## JavaScript

```js
import fetch from "node-fetch";

async function query(data) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/MODEL_ID",
        {
            method: "POST",
            headers: {
                Authorization: `Bearer cardiffnlp/twitter-roberta-base-sentiment-latest`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );
    const result = await response.json();
    return result;
}

query({
    inputs: "Today is a nice day"
}).then((response) => {
    console.log(JSON.stringify(response, null, 2));
});
```

## Next Steps

Now that you know the basics, you can explore the [API Reference](./parameters.md) to learn more about task-specific settings and parameters. 