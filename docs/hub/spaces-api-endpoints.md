# Spaces as API endpoints

Every Gradio Space on Hugging Face is automatically available as an API endpoint. You can call it from Python, JavaScript, or any HTTP client. If you can use a Space in your browser, you can call it as an API.

## Quick start

Install the Python client and call any public Space:

```bash
pip install --upgrade gradio_client
```

```python
from gradio_client import Client

client = Client("abidlabs/en2fr", token="hf_...")
result = client.predict("Hello, world!", api_name="/predict")
print(result)  # "Bonjour, le monde!"
```

## View available API endpoints

Every Gradio Space has a "Use via API" link in the footer. Click it to see:

- All available endpoints and their names
- Parameter types and descriptions
- Auto-generated code snippets for Python and JavaScript
- An API Recorder that generates code from your UI interactions

Every Space also exposes an OpenAPI specification at:

```
https://<space-subdomain>.hf.space/gradio_api/openapi.json
```

For example: `https://abidlabs-en2fr.hf.space/gradio_api/openapi.json`

This is useful to understand the full API schema and integrate it into your own applications.

You can also inspect endpoints programmatically:

```python
from gradio_client import Client

client = Client("abidlabs/whisper", token="hf_...")
client.view_api()  # Prints all endpoints with parameters
```

## Python client

### Installation

```bash
pip install --upgrade gradio_client
```

Requires Python 3.10+.

### Connect to a Space

```python
from gradio_client import Client

# Public Space
client = Client("username/space-name")

# Private Space (requires token)
client = Client("username/private-space", token="hf_xxxxx")
```

> [!TIP]
> Get your Hugging Face token at [https://huggingface.co/settings/tokens](https://huggingface.co/settings/tokens). For private Spaces, you need a token with **READ** permissions.

### Make Predictions

**Synchronous (blocking):**

```python
result = client.predict("Hello", api_name="/predict")
```

**Asynchronous (non-blocking):**

```python
job = client.submit("Hello", api_name="/predict")
# Do other work...
result = job.result()  # Get result when ready
```

### Handle Files

Use `handle_file()` for any file inputs:

```python
from gradio_client import Client, handle_file

client = Client("abidlabs/whisper", token="hf_...")

# From local file
result = client.predict(audio=handle_file("audio.wav"), api_name="/predict")

# From URL
result = client.predict(audio=handle_file("https://example.com/audio.wav"), api_name="/predict")
```

### Monitor Job Status

```python
job = client.submit("Hello", api_name="/predict")

# Check status
status = job.status()
print(f"Queue position: {status.rank}, ETA: {status.eta}")

# Check if complete
if job.done():
    result = job.result()

# Cancel a pending job
job.cancel()
```

### Streaming/Generator Endpoints

For endpoints that yield multiple outputs:

```python
job = client.submit(prompt="Write a story", api_name="/generate")

# Iterate over streaming outputs
for output in job:
    print(output)
```

## JavaScript client

### Installation

```bash
npm i @gradio/client
```

Or use via CDN:

```html
<script type="module">
  import { Client } from "https://cdn.jsdelivr.net/npm/@gradio/client/dist/index.min.js";
</script>
```

### Connect and Predict

```javascript
import { Client } from "@gradio/client";

const app = await Client.connect("abidlabs/en2fr", { token: "hf_..." });
const result = await app.predict("/predict", ["Hello"]);
console.log(result.data);
```

### Handle Files

```javascript
import { Client, handle_file } from "@gradio/client";

const app = await Client.connect("abidlabs/whisper", { token: "hf_..." });
const result = await app.predict("/predict", [
  handle_file("https://example.com/audio.wav")
]);
```

### Stream Results

```javascript
const job = app.submit("/predict", ["Hello"]);

for await (const message of job) {
  if (message.type === "data") {
    console.log("Result:", message.data);
  }
  if (message.type === "status") {
    console.log("Queue position:", message.position);
  }
}
```

## REST API (curl)

You can also call Gradio Spaces directly via HTTP without any client library.

### Queue-Based API (Recommended)

Most Spaces use a two-step process:

**Step 1: Submit your request**

```bash
curl -X POST "https://abidlabs-en2fr.hf.space/gradio_api/call/predict" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $HF_TOKEN" \
  -d '{"data": ["Hello, world"]}'
```

Response:
```json
{"event_id": "abc123"}
```

**Step 2: Get the result**

```bash
curl -N "https://abidlabs-en2fr.hf.space/gradio_api/call/predict/abc123" \
  -H "Authorization: Bearer $HF_TOKEN"
```

Response (Server-Sent Events):
```
event: complete
data: ["Bonjour, le monde!"]
```

The `Authorization` header is required for private Spaces and gives better rate limits on public Spaces.

## ZeroGPU Spaces

ZeroGPU Spaces have usage quotas based on your account type:

| Account Type | Daily GPU Quota |
|-------------|----------------|
| Unauthenticated | 2 minutes |
| Free account | 3.5 minutes |
| PRO account | 25 minutes |

When you authenticate with your token, your account's GPU quota is consumed. Unauthenticated requests use a shared pool with stricter limits.

> [!TIP]
> You can [subscribe to PRO](https://huggingface.co/subscribe/pro) for 25 minutes of daily GPU quota and higher queue priority.

## Common patterns

### FastAPI Integration

```python
from fastapi import FastAPI
from gradio_client import Client, handle_file

app = FastAPI()
client = Client("abidlabs/whisper", token="hf_...")

@app.post("/transcribe/")
async def transcribe(file_url: str):
    result = client.predict(audio=handle_file(file_url), api_name="/predict")
    return {"transcription": result}
```

### Error Handling with Retries

```python
import time
from gradio_client import Client

def predict_with_retry(client, *args, max_retries=3, **kwargs):
    for attempt in range(max_retries):
        try:
            return client.predict(*args, **kwargs)
        except Exception as e:
            if attempt < max_retries - 1:
                time.sleep(2 ** attempt)  # Exponential backoff
            else:
                raise

client = Client("username/space", token="hf_...")
result = predict_with_retry(client, "input", api_name="/predict")
```

### Calling Spaces from Another Space

When calling a ZeroGPU Space from your own Gradio app, forward the user's authentication:

```python
import gradio as gr
from gradio_client import Client

def process(prompt, request: gr.Request):
    x_ip_token = request.headers.get('x-ip-token', '')
    client = Client("owner/zerogpu-space", headers={"x-ip-token": x_ip_token})
    return client.predict(prompt, api_name="/predict")

demo = gr.Interface(fn=process, inputs="text", outputs="text")
demo.launch()
```

## Find Spaces with semantic search

With thousands of Gradio Spaces available, you sometimes want to find one for a particular task:

```bash
curl -s "https://huggingface.co/api/spaces/semantic-search?q=text+to+speech&sdk=gradio"
```

This returns Spaces ranked by semantic relevance, with metadata including the Space ID, likes, and a short description. Use the `sdk=gradio` parameter to filter for Spaces that expose an API.

## Learn more

- [Gradio Python Client Guide](https://www.gradio.app/guides/getting-started-with-the-python-client)
- [Gradio JavaScript Client Guide](https://www.gradio.app/guides/getting-started-with-the-js-client)
- [Querying Gradio Apps with curl](https://www.gradio.app/guides/querying-gradio-apps-with-curl)
- [Spaces ZeroGPU](./spaces-zerogpu)
