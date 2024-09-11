# Getting Started

The Serverless Inference API allows you to easily do inference on a wide range of models and tasks. You can do requests with your favorite tools (Python, cURL, etc). We also provide a Python SDK (`huggingface_hub`) to make it even easier.

We'll do a minimal example using a [sentiment classification model](https://huggingface.co/cardiffnlp/twitter-roberta-base-sentiment-latest). Please visit task-specific parameters and further documentation in our [API Reference](./parameters.md).

## Getting a Token

Using the Serverless Inference API requires passing a user token in the request headers. You can get a token by signing up on the Hugging Face website and then going to the [tokens page](https://huggingface.co/settings/tokens/new?globalPermissions=inference.serverless.write&tokenType=fineGrained). We recommend creating a `Fine-grained` token with the scope to `Make calls to the serverless Inference API`.

TODO: add screenshot
For more details about user tokens, check out [this guide](https://huggingface.co/docs/hub/en/security-tokens).

## cURL

```bash
curl 'https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3.1-8B-Instruct/v1/chat/completions' \
-H "Authorization: Bearer hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" \
-H 'Content-Type: application/json' \
-d '{
    "model": "meta-llama/Meta-Llama-3.1-8B-Instruct",
    "messages": [{"role": "user", "content": "What is the capital of France?"}],
    "max_tokens": 500,
    "stream": false
}'
```

## Python

You can use the `requests` library to make a request to the Inference API.

```python
import requests

API_URL = "https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3.1-8B-Instruct/v1/chat/completions"
headers = {"Authorization": "Bearer hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"}
payload = {
    "model": "meta-llama/Meta-Llama-3.1-8B-Instruct",
    "messages": [{"role": "user", "content": "What is the capital of France?"}],
    "max_tokens": 500,
    "stream": False
}

response = requests.post(API_URL, headers=headers, json=payload)
response.json()
```

Hugging Face also provides a [`InferenceClient`](https://huggingface.co/docs/huggingface_hub/guides/inference) that handles inference for you. Make sure to install it with `pip install huggingface_hub` first.

```python
from huggingface_hub import InferenceClient

client = InferenceClient(
    "meta-llama/Meta-Llama-3.1-8B-Instruct",
    token="hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
)

for message in client.chat_completion(
	messages=[{"role": "user", "content": "What is the capital of France?"}],
	max_tokens=500,
	stream=True,
):
    print(message.choices[0].delta.content, end="")
```

## JavaScript

```js
import fetch from "node-fetch";

async function query(data) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3.1-8B-Instruct/v1/chat/completions",
        {
            method: "POST",
            headers: {
                Authorization: `Bearer hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );
    const result = await response.json();
    return result;
}

query({
	"model": "meta-llama/Meta-Llama-3.1-8B-Instruct",
	"messages": [{"role": "user", "content": "What is the capital of France?"}],
	"max_tokens": 500,
	"stream": false
}).then((response) => {
    console.log(JSON.stringify(response, null, 2));
});
```

Hugging Face also provides a [`HfInference`](https://huggingface.co/docs/huggingface.js/inference/classes/HfInference) client that handles inference. Make sure to install it with `npm install @huggingface/inference` first.

```js
import { HfInference } from "@huggingface/inference";

const inference = new HfInference("hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");

for await (const chunk of inference.chatCompletionStream({
	model: "meta-llama/Meta-Llama-3.1-8B-Instruct",
	messages: [{ role: "user", content: "What is the capital of France?" }],
	max_tokens: 500,
})) {
	process.stdout.write(chunk.choices[0]?.delta?.content || "");
}
```

## Next Steps

Now that you know the basics, you can explore the [API Reference](./parameters.md) to learn more about task-specific settings and parameters. 