# Recipes

A recipe is a tested way to serve one Hub model on one Amazon SageMaker AI instance. It pins everything that changes the result:

- **Model**: the Hub model ID and, when set, the exact model revision.
- **Container**: the Hugging Face vLLM Deep Learning Container (DLC) `huggingface-vllm`, pinned by tag and, when available, by image digest.
- **Instance**: the SageMaker instance type, for example `ml.g6e.12xlarge` with 4 NVIDIA L40S GPUs.
- **Engine settings**: the `SM_VLLM_*` environment variables passed to the container. Each one maps to a vLLM engine argument, so `SM_VLLM_TENSOR_PARALLEL_SIZE=4` becomes `--tensor-parallel-size 4`.
- **Endpoint settings**: the inference AMI version (`al2023-ami-sagemaker-inference-gpu-4-1` for the CUDA 13 images) and the container startup health check timeout.
- **Results**: validation checks and benchmark numbers measured by Hugging Face on a real SageMaker endpoint with these exact settings.

Each recipe is published as a JSON record in the [hub-docs repository](https://github.com/huggingface/hub-docs/tree/main/docs/sagemaker/recipes), and each model page below shows the same data with a deploy snippet. To deploy any recipe, follow [Deploy a recipe](./deploy-a-recipe).

## How recipes are measured

Every recipe is deployed as a SageMaker real-time endpoint and tested through the SageMaker runtime, so the numbers include the SageMaker front end and not only the engine.

### Validation

Validation sends one request per capability and checks the response:

- **Chat**: a chat completion returns a well-formed answer.
- **Streaming**: the same request with `stream: true` returns server-sent events.
- **Tool calling**: the model returns a structured tool call for a request that defines tools.
- **Reasoning**: the reasoning parser separates the reasoning content from the final answer.
- **Vision**: the model answers a question about an image, for models that accept images.

A recipe page lists the capabilities that passed, the ones that failed, and the ones that were not checked.

> [!WARNING]
> These initial measurements have partially passing validation. A benchmark result does not mean every capability works: review the failed checks on each model page before deploying. The results include SageMaker routing limitations and failures fetching validation images.

### Benchmarks

Benchmarks use [`vllm bench serve`](https://docs.vllm.ai/en/latest/cli/bench/serve.html) against the endpoint. Each suite models a different workload:

| Suite | Concurrency | Input tokens | Output tokens | Workload |
|---|---:|---:|---:|---|
| `single-request` | 1 | 1,024 | 2,048 | One user at a time; shows the best per-user speed |
| `long-decode` | 4 | 1,024 | 4,096 | Long answers, such as reports or code |
| `long-prefill` | 4 | 16,384 | 128 | Long prompts with short answers, such as retrieval or document questions |
| `concurrency` | 64 | 1,024 | 256 | Many users at once; shows the throughput of the instance |
| `prefix` | 32 | 4,096 shared + 256 | 128 | Requests that share a long prompt prefix, such as a system prompt; shows the effect of prefix caching |
| `sharegpt` | up to 256 | varies | varies | 1,000 real conversations from the ShareGPT dataset |

The maximum concurrency of any suite is 256. The SageMaker front end throttles large bursts of requests with HTTP 429 errors, so a higher concurrency measures the throttling instead of the model.

## How to read the metrics

- **Per-user tok/s**: how fast one user sees tokens arrive, computed as 1,000 divided by the median time per output token (TPOT). Higher is better. The single-request suite gives the best case.
- **TTFT**: time to first token, the delay between sending a request and receiving the first token. It grows with the prompt length and with load. Lower is better.
- **Output tok/s**: total output tokens per second across all concurrent requests. It measures the capacity of the instance. Higher is better.
- **USD per 1M output tokens**: the on-demand hourly price of the instance divided by the output tokens generated in one hour at the measured throughput. It assumes the endpoint is busy all the time, so it is a lower bound for a real workload.

Prices are SageMaker on-demand prices in the region shown on each recipe; check [Amazon SageMaker AI pricing](https://aws.amazon.com/sagemaker/ai/pricing/) for your region. `n/a` means the value was not measured.

## Available recipes

<!-- GENERATED RECIPES TABLE -->

| Model | Instance | GPUs | vLLM DLC | Context length | Validation | Single-user tok/s | Median TTFT (ms) | Output tok/s at c64 | USD per hour | USD per 1M output tokens at c64 |
|---|---|---|---|---:|---|---:|---:|---:|---:|---:|
| [google/gemma-4-31B-it](./google-gemma-4-31b-it) | `ml.g7e.2xlarge` | 1 x NVIDIA RTX PRO 6000 | 0.34.0 | 131,072 | failed | 22.3 | 260.9 | 331.0 | 4.20 | 3.53 |
| [openai/gpt-oss-20b](./openai-gpt-oss-20b) | `ml.g6e.2xlarge` | 1 x NVIDIA L40S | 0.34.0 | 131,072 | failed | 155.2 | 84.3 | 2,173.6 | 2.80 | 0.36 |
| [Qwen/Qwen3-14B](./qwen-qwen3-14b) | `ml.g7e.4xlarge` | 1 x NVIDIA RTX PRO 6000 | 0.34.0 | 40,960 | failed | 47.6 | 115.2 | 1,243.0 | 5.00 | 1.12 |
| [Qwen/Qwen3-8B](./qwen-qwen3-8b) | `ml.g6e.xlarge` | 1 x NVIDIA L40S | 0.34.0 | 40,960 | failed | 45.2 | 123.1 | 1,062.2 | 2.61 | 0.68 |
| [Qwen/Qwen3.5-4B](./qwen-qwen3-5-4b) | `ml.g6e.xlarge` | 1 x NVIDIA L40S | 0.34.0 | 262,144 | failed | 79.4 | 112.4 | 1,618.5 | 2.61 | 0.45 |
| [Qwen/Qwen3.5-9B](./qwen-qwen3-5-9b) | `ml.g6e.xlarge` | 1 x NVIDIA L40S | 0.34.0 | 262,144 | failed | 44.0 | 136.8 | 1,121.5 | 2.61 | 0.65 |

<!-- END GENERATED RECIPES TABLE -->
