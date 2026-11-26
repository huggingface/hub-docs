# How recipes are measured

A recipe is a tested way to serve one Hub model on one Amazon SageMaker AI instance. It pins everything that changes the result:

- **Model**: the Hub model ID and, when set, the exact model revision.
- **Container**: the Hugging Face vLLM Deep Learning Container (DLC) `huggingface-vllm`, pinned by tag and, when available, by image digest.
- **Instance**: the SageMaker instance type, for example `ml.g6e.12xlarge` with 4 NVIDIA L40S GPUs.
- **Engine settings**: the `SM_VLLM_*` environment variables passed to the container. Each one maps to a vLLM engine argument, so `SM_VLLM_TENSOR_PARALLEL_SIZE=4` becomes `--tensor-parallel-size 4`.
- **Endpoint settings**: the inference AMI version (`al2023-ami-sagemaker-inference-gpu-4-1` for the CUDA 13 images) and the container startup health check timeout.
- **Results**: for recipes measured on SageMaker, the validation checks and benchmark numbers Hugging Face measured on a real SageMaker endpoint with these exact settings.

Hugging Face maintains the recipes in Kitchen, its benchmarking service, and regenerates the [recipes catalog](./index) and the model pages from them every day. Each recipe also has an AWS CloudFormation template that the deploy buttons and AWS CLI commands use.

A recipe is either measured on SageMaker or not measured yet. A measured recipe was deployed as a SageMaker real-time endpoint and tested through the SageMaker runtime, so its numbers include the SageMaker front end and not only the engine. A recipe that is not measured yet comes from a Kitchen configuration for the same GPUs: it has the same deploy options, but no validation or benchmark results until it runs on SageMaker.

## Validation

Validation sends one request per capability and checks the response:

- **Chat**: a chat completion returns a well-formed answer.
- **Streaming**: the same request with `stream: true` returns server-sent events.
- **Tool calling**: the model returns a structured tool call for a request that defines tools.
- **Reasoning**: the reasoning parser separates the reasoning content from the final answer.
- **Vision**: the model answers a question about an image, for models that accept images.
- **Responses**: a request to the OpenAI Responses API (`/v1/responses`).

A model page lists the capabilities that passed, the ones that failed, and the ones that were not tested. The `responses` check fails on every recipe: the SageMaker OpenAI-compatible route only serves chat completions, so the Responses API is not reachable through SageMaker even though vLLM supports it.

## Benchmarks

Benchmarks use [`vllm bench serve`](https://docs.vllm.ai/en/latest/cli/bench/serve.html) against the endpoint. Each workload models a different use:

| Workload | Concurrency | Input tokens | Output tokens | Use |
|---|---:|---:|---:|---|
| `single-request` | 1 | 1,024 | 2,048 | One user at a time; shows the best per-user speed |
| `long-decode` | 4 | 1,024 | 4,096 | Long answers, such as reports or code |
| `long-prefill` | 4 | 16,384 | 128 | Long prompts with short answers, such as retrieval or document questions |
| `concurrency` | 64 | 1,024 | 256 | Many users at once; shows the throughput of the instance |
| `prefix` | 32 | 4,096 shared + 256 | 128 | Requests that share a long prompt prefix, such as a system prompt; shows the effect of prefix caching |
| `sharegpt` | up to 256 | varies | varies | 1,000 real conversations from the ShareGPT dataset |

The maximum concurrency of any workload is 256. The SageMaker front end throttles large bursts of requests with HTTP 429 errors, so a higher concurrency measures the throttling instead of the model.

## How to read the metrics

- **Per-user tok/s**: how fast one user sees tokens arrive, computed as 1,000 divided by the median time per output token (TPOT). Higher is better. The `single-request` workload gives the best case.
- **TTFT**: time to first token, the delay between sending a request and receiving the first token. It grows with the prompt length and with load. Lower is better.
- **Output tok/s**: total output tokens per second across all concurrent requests. It measures the capacity of the instance. Higher is better.
- **USD per 1M output tokens**: the on-demand hourly price of the instance divided by the output tokens generated in one hour at the measured throughput. It assumes the endpoint is busy all the time, so it is a lower bound for a real workload.

Prices are SageMaker on-demand prices in the region shown on each recipe; check [Amazon SageMaker AI pricing](https://aws.amazon.com/sagemaker/ai/pricing/) for your region. `n/a` means the value was not measured.
