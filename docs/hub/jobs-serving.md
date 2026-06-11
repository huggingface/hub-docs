# Serve Models on Jobs

With [exposed ports](./jobs-configuration#expose-ports), a Job can act as a temporary inference server: start vLLM on a GPU flavor, point any OpenAI-compatible client at the job's URL, and cancel the job when you are done. You pay per minute while the job runs, and the endpoint disappears with the job.

This is a good fit when the endpoint is a means rather than the product: an evaluation run, a data labelling session, iterating on prompts against a hot model, or a demo that only needs to live for an afternoon.

> [!TIP]
> If you want a more permanent endpoint that won't disappear, you want [Inference Endpoints](https://huggingface.co/docs/inference-endpoints), which provides managed infrastructure with autoscaling, monitoring, and stable URLs.

## Start a vLLM server

The `vllm/vllm-openai` image has everything pre-installed. One command starts an OpenAI-compatible server:

```bash
>>> hf jobs run --detach --expose 8000 --flavor a10g-small -s HF_TOKEN \
...   vllm/vllm-openai \
...   vllm serve LiquidAI/LFM2.5-8B-A1B --max-model-len 8192
✓ Job started
  id: 6a2b137a59bbdade52d4a58c
  url: https://huggingface.co/jobs/davanstrien/6a2b137a59bbdade52d4a58c
Hint: Exposed ports are reachable at (requires an HF token with read access to the job):
  https://6a2b137a59bbdade52d4a58c--8000.hf.jobs
```

`-s HF_TOKEN` forwards your Hugging Face token to the job as a secret, so the model download is authenticated — required for gated or private models, and gives you higher rate limits and faster downloads for everything else.

> [!NOTE]
> Jobs runs the command you provide directly — it does not pass arguments to the image's entrypoint like `docker run` does. Always spell out the full command (`vllm serve ...`, not just `--model ...`).

The server takes a few minutes to become ready (image pull, model download, model load). Follow progress with `hf jobs logs -f <job_id>`; the server is ready when the logs show `Application startup complete`.

## Connect a client

Exposed ports require an HF token with `read` access to the job's namespace, passed as a Bearer token. For an OpenAI-compatible server this slots directly into the client's API key — the base URL is the exposed port URL plus `/v1`:

```python
import os
from openai import OpenAI

client = OpenAI(
    base_url="https://6a2b137a59bbdade52d4a58c--8000.hf.jobs/v1",
    api_key=os.environ["HF_TOKEN"],  # any token with read access to the job's namespace
)

response = client.chat.completions.create(
    model="LiquidAI/LFM2.5-8B-A1B",
    messages=[{"role": "user", "content": "Write a haiku about ephemeral compute."}],
)
print(response.choices[0].message.content)
```

LFM2.5 is a reasoning model, so the response includes its reasoning inside `<think>` tags before the final answer.

Or with `curl`:

```bash
>>> curl https://6a2b137a59bbdade52d4a58c--8000.hf.jobs/v1/chat/completions \
...   -H "Authorization: Bearer $HF_TOKEN" \
...   -H "Content-Type: application/json" \
...   -d '{"model": "LiquidAI/LFM2.5-8B-A1B", "messages": [{"role": "user", "content": "Hello!"}]}'
```

Because the token travels in the `Authorization` header, these URLs work from scripts, notebooks, and agents — anywhere you'd use an OpenAI-compatible API. They can't be opened directly in a browser.

## Serve GGUF models with llama.cpp

The same pattern works with any server that speaks HTTP. llama.cpp's `llama-server` pulls GGUF files straight from the Hub with the `-hf` flag and serves the same OpenAI-compatible API. For example, to serve [Gemma 4 E4B](https://huggingface.co/ggml-org/gemma-4-E4B-it-GGUF) with Gemma's recommended sampling settings:

```bash
>>> hf jobs run --detach --expose 8080 --flavor a10g-small -s HF_TOKEN \
...   ghcr.io/ggml-org/llama.cpp:server-cuda -- \
...   /app/llama-server -hf ggml-org/gemma-4-E4B-it-GGUF \
...   --host 0.0.0.0 --port 8080 -ngl 99 \
...   --temp 1.0 --top-p 0.95 --top-k 64
```

The `--` separates the job's command from `hf jobs run`'s own options — needed here because `llama-server`'s flags would otherwise be parsed by the CLI itself.

> [!TIP]
> You can skip the model download entirely by mounting the model repo as a read-only volume and pointing the server at the file directly:
>
> ```bash
> >>> hf jobs run --detach --expose 8080 --flavor a10g-small -s HF_TOKEN \
> ...   -v hf://ggml-org/gemma-4-E4B-it-GGUF:/model:ro \
> ...   ghcr.io/ggml-org/llama.cpp:server-cuda -- \
> ...   /app/llama-server --model /model/gemma-4-E4B-it-Q4_K_M.gguf \
> ...   --host 0.0.0.0 --port 8080 -ngl 99
> ```
>
> The server starts much faster since there is nothing to download — the model streams from the mounted repo as it loads.

> [!WARNING]
> Your server must listen on `0.0.0.0`. `llama-server` binds to `127.0.0.1` by default, which the jobs proxy can't reach — pass `--host 0.0.0.0` explicitly.

The same applies to any other OpenAI-compatible server (SGLang, ...): start the server on an exposed port, listen on `0.0.0.0`, and connect with your HF token as the API key.

## Stop the server

The job — and its billing — stops when you cancel it or when its timeout is reached (30 minutes by default; set `--timeout` explicitly for longer sessions):

```bash
>>> hf jobs cancel <job_id>
```

> [!NOTE]
> Exposed ports require `huggingface_hub` >= 1.19.0 and are billed on top of the job's hardware price — see [Jobs pricing](./jobs-pricing).
