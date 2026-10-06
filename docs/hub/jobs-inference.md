# Run LLM Inference on Jobs

This page generates text with a finished model: load it on a GPU, hand it your prompts, read the answers, and the Job ends. Nothing stays up between runs, and you pay only for the minutes it takes. Every example is capped to a short run that finishes in a couple of minutes, on one GPU or two, for a few cents of compute. The Job runs on Hugging Face's machines, so it keeps going if you close your terminal or your laptop. If you have not run a Job before, [Quickstart](./jobs-quickstart) covers installing the CLI, logging in and the credits a Job needs.

Reach for this when the work has a beginning and an end: building a synthetic dataset, labelling or scoring rows, running an evaluation, checking what a model answers before you fine-tune it. Two neighbouring pages cover the other shapes:

- [Serve Models](./jobs-serving) keeps a Job up with an exposed port and answers requests over HTTP. Same engines, started as servers, for an API you call repeatedly.
- [Inference Endpoints](https://huggingface.co/docs/inference-endpoints) runs an endpoint that stays up, with autoscaling, monitoring and a stable URL.

## Pick an engine

| Engine | How it runs on Jobs | Reach for it when |
| ---------------------------------------------------------------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| [vLLM](https://docs.vllm.ai)                                           | `hf jobs run vllm/vllm-openai` | the default. `LLM` and `LLM.chat()` load a model once and push a list of prompts through it. Widest model coverage, quantization options, and tensor parallelism across several GPUs. |
| [SGLang](https://docs.sglang.ai)                                       | `hf jobs run lmsysorg/sglang` | the same offline batch, through `sgl.Engine`. Its RadixAttention reuses the cached prefix a batch of prompts share, so a long system prompt or a few-shot block costs once. |
| [llama.cpp](https://github.com/ggml-org/llama.cpp) through [llama-cpp-python](https://github.com/abetlen/llama-cpp-python) | `hf jobs uv run` | you have or want a GGUF quant. A Q4_K_M file holds a 7-8B model in about 5 GB, so it fits the cheapest GPU, and the same code runs on a CPU flavor once the wheel is built without CUDA. |
| [Transformers](https://huggingface.co/docs/transformers)             | `hf jobs uv run` | the model is small and the run is a one-off. The [Quickstart](./jobs-quickstart) generates text this way. |

The three sections below run a script from each library's own repository, with only the lines it needs to fit a Job, so you can compare them on the same kind of work.

## A first run

This command runs vLLM's own chat example on an A10G. It loads [Qwen2.5-0.5B-Instruct](https://huggingface.co/Qwen/Qwen2.5-0.5B-Instruct), generates one conversation, then the same conversation ten times as a batch:

```bash
hf jobs run --flavor a10g-small --timeout 20m -s HF_TOKEN \
  vllm/vllm-openai -- \
  bash -c "curl -fsSL https://raw.githubusercontent.com/vllm-project/vllm/main/examples/basic/offline_inference/chat.py -o /tmp/chat.py && \
    exec python3 /tmp/chat.py --model Qwen/Qwen2.5-0.5B-Instruct --max-model-len 4096 --max-tokens 64 --temperature 0"
```

That run billed 94 seconds at the `a10g-small` rate, about $0.03. The answers land in the logs:

```text
Prompt: [{'role': 'system', 'content': 'You are a helpful assistant'}, {'role': 'user', 'content': 'Hello'},
{'role': 'assistant', 'content': 'Hello! How can I assist you today?'},
{'role': 'user', 'content': 'Write an essay about the importance of higher education.'}]

Generated text: 'Higher education is a fundamental aspect of human development and progress, providing
individuals with the knowledge, skills, and perspectives necessary to lead fulfilling lives. ...'
```

The [vLLM](#vllm) section covers the arguments, and [Run a batch over a dataset](#run-a-batch-over-a-dataset) does the same thing over a dataset.

## How an inference Job is put together

The command above has the same five parts as every command on this page.

- **What runs.** Either a Docker image with the engine already installed, launched with `hf jobs run IMAGE -- COMMAND`: that is how vLLM and SGLang run below, since both ship an image with their compiled kernels and CUDA tooling. Or a uv script, launched with `hf jobs uv run`: a Python file that declares its dependencies in a comment block near the top (`# /// script`, the [PEP 723](https://peps.python.org/pep-0723/) format), which uv installs into a fresh environment. That is how llama.cpp runs. See [Using Docker images](./jobs-images) for the trade-off, and [Reuse the image's packages and add dependencies with uv](./jobs-images#reuse-the-images-packages-and-add-dependencies-with-uv) for a job that needs both.
- **Your code.** The image examples fetch the library's own example script with `curl` and run it, the way you would in a `docker run` one-liner. Your own code has three routes: hand the file to `hf jobs uv run`, which uploads a local path or a URL for you, as the [llama.cpp](#llamacpp-for-gguf-quants) section does; mount a directory into an image Job with `-v ./my-job:/job` and run `/job/infer.py` from it; or keep the script in a Hub repo or bucket and mount that. The mount takes a directory, not a single file. See [Volumes](./jobs-configuration#volumes).
- **A token.** Jobs get no Hugging Face token by default. `-s HF_TOKEN` forwards yours as a secret, so the run can download gated or private weights and write to a bucket. Other secrets travel the same way.
- **Hardware and time.** `--flavor` picks the GPU, `--timeout` sets the limit, which defaults to 30 minutes. Engine start-up is most of a short run: vLLM spends about 40 seconds profiling, building its KV cache and warming up before the first token, and SGLang spends about a minute capturing CUDA graphs. Both are billed, and both are amortized by a bigger batch. See [Hardware flavor](./jobs-configuration#hardware-flavor) and [Timeout](./jobs-configuration#timeout).
- **A `--` between the `hf` flags and the command.** Flags before `--` are for `hf jobs`. After it come the image and the command to run in it, or the script and its arguments. Without the separator, a script argument that shares a name with an `hf` flag, such as `--timeout` or `--token`, is taken by `hf`.

**Where the answers go.** A Job's disk is discarded when it ends, so the logs hold anything you did not write out. That is fine for a handful of prompts and not fine for a dataset. [Run a batch over a dataset](#run-a-batch-over-a-dataset) mounts a [Storage Bucket](./storage-buckets) and writes one JSON line per prompt into it.

## Fit the model on the GPU

Weights in bf16 take about 2 GB per billion parameters, and the KV cache and activations need room on top of that. Rough guide, with a margin for the cache:

| Weights in bf16 | Typical model | Flavors that fit |
| --------------- | ------------- | ---------------- |
| under 2 GB      | 0.5-1B, or a 7-8B GGUF at Q4 | `t4-small`, `t4-medium`, `l4x1`, `a10g-small` |
| 2-18 GB         | 7-8B | `a10g-small`, `a10g-large`, `l4x1`, `l40sx1` |
| 20-45 GB        | 14B | `l40sx1`, `a10g-largex2` |
| 60-90 GB        | 32B | `a100-large`, `rtx-pro-6000` |
| 140 GB and up   | 70B | `h200`, or `a100x4` and `a10g-largex4` split across GPUs |

The first row and the 7B case below are the runs on this page; the rest is the same arithmetic. Rates and memory per flavor are on [Pricing and Billing](./jobs-pricing).

When a model does not fit on one GPU:

- **Cap the context.** The KV cache grows with the context length, not with the prompt you actually send. `--max-model-len 4096` for vLLM and `--context-length 4096` for SGLang free that memory back to the weights. Both engines print the resulting cache in their startup logs, along with how many requests at that length it holds.
- **Quantize.** vLLM and SGLang take `--quantization` with a quantized checkpoint, and a GGUF quant is the same weights in a smaller file, which is what the llama.cpp section runs.
- **Split across GPUs.** Flavors ending in `x2`, `x4` or `x8` give several GPUs on one machine. Both engines take the split as one flag: `--tensor-parallel-size 2` for vLLM, `--tp-size 2` for SGLang. Nothing else changes:

  ```bash
  hf jobs run --flavor a10g-largex2 --timeout 30m -s HF_TOKEN \
    vllm/vllm-openai -- \
    bash -c "curl -fsSL https://raw.githubusercontent.com/vllm-project/vllm/main/examples/basic/offline_inference/chat.py -o /tmp/chat.py && \
      exec python3 /tmp/chat.py --model Qwen/Qwen2.5-7B-Instruct --tensor-parallel-size 2 --max-model-len 4096 --max-tokens 64 --temperature 0"
  ```

  [Qwen2.5-7B-Instruct](https://huggingface.co/Qwen/Qwen2.5-7B-Instruct) across two A10Gs takes just under two minutes of running, weights download included, about $0.17 at that flavor's rate. `hf jobs stats <job_id>` prints per-GPU memory and utilization while the Job runs.

## vLLM

The example in [A first run](#a-first-run) is vLLM's [`examples/basic/offline_inference/chat.py`](https://github.com/vllm-project/vllm/blob/main/examples/basic/offline_inference/chat.py), run unchanged. Its arguments are the engine's own, plus four sampling flags the example adds:

- `--model` is a Hub repo id, a local path, or a mounted repo.
- `--max-model-len` caps the context each sequence may reach, the largest lever on KV memory.
- `--max-tokens` and `--temperature` go to the sampling parameters. `--temperature 0` makes generation greedy, so a rerun gives the same text.
- Everything else `LLM()` accepts is on the command line: `EngineArgs.add_cli_args` builds the parser, so `--gpu-memory-utilization`, `--tensor-parallel-size`, `--quantization`, `--enable-lora` and the rest work as they do in Python.

Four things to know about running it on Jobs:

- **The command runs as written.** Jobs does not pass your arguments to the image's entrypoint, which here is the OpenAI server, so the command starts with `bash -c` and spells out what to run. See [Serve Models](./jobs-serving#start-a-vllm-server) for the server itself, which is the same image on an [exposed port](./jobs-configuration#expose-ports).
- **`python3`, not `python`.** The image's interpreter is `/usr/bin/python3`; `python` is not on its `PATH`, and the Job fails with `exec: python: not found` and exit code 127.
- **The image ships vLLM, not the rest of your stack.** `import datasets`, `pandas` or `pyarrow` fails in it. Install what your script needs when the Job starts — `uv pip install --system datasets` — or keep the image's vLLM and let uv install your dependencies, covered in [Reuse the image's packages and add dependencies with uv](./jobs-images#reuse-the-images-packages-and-add-dependencies-with-uv).
- **The image is a few gigabytes**, so a Job that lands on a cold node spends five or six minutes pulling it before anything runs, and that time is billed as `Starting`. Set `--timeout` above it. A Job that lands on a node which already has the image starts in seconds, so retries are cheaper than the first run.

Your own script runs the same way. With `infer.py` in a local `my-job` directory:

```bash
hf jobs run --flavor a10g-small --timeout 30m -s HF_TOKEN \
  -v ./my-job:/job \
  vllm/vllm-openai -- \
  bash -c "exec python3 /job/infer.py --model Qwen/Qwen2.5-0.5B-Instruct"
```

## SGLang

This runs SGLang's [`examples/runtime/engine/offline_batch_inference.py`](https://github.com/sgl-project/sglang/blob/main/examples/runtime/engine/offline_batch_inference.py), which builds an `sgl.Engine` in the process and calls `generate()` with a list of prompts and a sampling dictionary:

```bash
hf jobs run --flavor a10g-small --timeout 30m -s HF_TOKEN \
  lmsysorg/sglang:v0.5.21 -- \
  bash -c "curl -fsSL https://raw.githubusercontent.com/sgl-project/sglang/main/examples/runtime/engine/offline_batch_inference.py -o /tmp/offline.py && \
    exec python /tmp/offline.py --model-path Qwen/Qwen2.5-0.5B-Instruct --mem-fraction-static 0.8"
```

Two minutes of running on `a10g-small`, about $0.12 with the time the Job spent pulling the image on the way in.

- `--model-path` is the Hub repo id. The engine's own startup flags come from the same parser, so `--context-length`, `--tp-size`, `--quantization` and `--chat-template` are all available here.
- `--mem-fraction-static` is the share of GPU memory the engine claims up front for weights and the KV cache. On a 24 GB card with a 0.5B model, `0.8` left room for a 1.4M-token cache. Lower it if the engine is refused memory at startup.
- About a minute of the start-up goes into capturing CUDA graphs. `--disable-cuda-graph` skips that minute at the cost of slower decoding, which is the right trade for a short run.
- The image is large, so the first Job on a node spends around five minutes pulling it. Pin the tag, as above, rather than following `latest`.
- Several GPUs: `--tp-size 2` on an `x2` flavor, like the vLLM command above.

## llama.cpp for GGUF quants

[llama-cpp-python](https://github.com/abetlen/llama-cpp-python) wraps llama.cpp, which reads GGUF files: a quantized 7-8B model comes in around 5 GB, so the whole thing runs on a `t4-small` for cents. This Job runs [the library's high-level API example](https://github.com/abetlen/llama-cpp-python/blob/main/examples/high_level_api/high_level_api_inference.py) with a GGUF pulled from the Hub:

```bash
hf jobs uv run --flavor t4-small --timeout 20m -s HF_TOKEN -- \
  https://raw.githubusercontent.com/huggingface/hub-docs/main/examples/jobs/llama_cpp_gguf.py
```

About a minute and a half of running, around $0.02. The answer is in the logs, after llama.cpp's own startup lines:

```text
Question: What are the names of the planets in the solar system? Answer: 1. Mercury 2. Venus 3. Earth 4. Mars 5. Jupiter 6. Saturn 7. Uranus 8. Neptune
```

Here is the script, so you can see what it adds over the upstream example:

```python
# /// script
# requires-python = ">=3.10"
# dependencies = [
#     "llama-cpp-python @ https://github.com/abetlen/llama-cpp-python/releases/download/v0.3.36-cu125/llama_cpp_python-0.3.36-py3-none-manylinux_2_35_x86_64.whl",
#     "huggingface-hub",
#     "nvidia-cuda-runtime-cu12",
#     "nvidia-cublas-cu12",
# ]
# ///
import ctypes
import pathlib

import nvidia.cublas
import nvidia.cuda_runtime

for _pkg in (nvidia.cuda_runtime, nvidia.cublas):
    for _so in sorted(pathlib.Path(_pkg.__path__[0]).joinpath("lib").glob("*.so*")):
        ctypes.CDLL(str(_so), mode=ctypes.RTLD_GLOBAL)

from llama_cpp import Llama

llm = Llama.from_pretrained(
    repo_id="bartowski/Qwen2.5-1.5B-Instruct-GGUF",
    filename="Qwen2.5-1.5B-Instruct-Q4_K_M.gguf",
    n_gpu_layers=-1,
)

output = llm(
    "Question: What are the names of the planets in the solar system? Answer: ",
    max_tokens=48,
    stop=["Q:", "\n"],
    echo=True,
)

print(output["choices"][0]["text"])
```

- The dependency header pins llama-cpp-python to a prebuilt CUDA wheel from the project's GitHub releases (the `v0.3.36-cu125` tag, and the same wheels on its [wheel index](https://abetlen.github.io/llama-cpp-python/whl/cu125/)). PyPI carries only the source archive, which would compile llama.cpp inside the Job.
- The prebuilt wheel is linked against CUDA but does not ship the CUDA libraries, and a plain uv job has none on its library path. The few `ctypes` lines load `libcudart` and `libcublas` from the two `nvidia-*` wheels before `llama_cpp` is imported. Without them, the import fails with `libcudart.so.12: cannot open shared object file`.
- `Llama.from_pretrained(repo_id, filename)` downloads one file from a GGUF repo — [models with the GGUF library tag](https://huggingface.co/models?library=gguf) list the same weights in several quantizations, and `filename` picks one. Pass `-s HF_TOKEN` for a gated repo.
- `n_gpu_layers=-1` puts every layer on the GPU. `0` keeps them all on the CPU, which is how you run a GGUF on a CPU flavor. A number in between leaves part of the model in system memory, for a quant a little too big for the GPU.
- To run it without CUDA, drop the wheel URL and the `ctypes` block, put `llama-cpp-python` in `dependencies`, set `n_gpu_layers=0` and pass `-e CMAKE_ARGS=-DGGML_CUDA=OFF`. uv then builds a CPU-only wheel in the Job, which took about three minutes on a `cpu-upgrade`, for well under a cent.
- For an HTTP server on a GGUF instead of a Python call, llama.cpp's own image does it in one command: [Serve GGUF models with llama.cpp](./jobs-serving#serve-gguf-models-with-llamacpp).

## Run a batch over a dataset

The shape of a real inference job: load the model once, generate over many prompts, and write the answers somewhere they outlive the Job. This Job takes the first 20 prompts of [trl-lib/Capybara](https://huggingface.co/datasets/trl-lib/Capybara), runs them through vLLM, and writes one JSON line per prompt to a bucket:

```bash
hf buckets create inference-output

hf jobs run --flavor a10g-small --timeout 30m -s HF_TOKEN \
  -v hf://buckets/your-username/inference-output:/output \
  vllm/vllm-openai -- \
  bash -c "curl -fsSL https://raw.githubusercontent.com/huggingface/hub-docs/main/examples/jobs/vllm_batch_generate.py -o /tmp/batch.py && \
    uv pip install --system --quiet datasets && exec python3 /tmp/batch.py --max-tokens 128"
```

The [script](https://github.com/huggingface/hub-docs/blob/main/examples/jobs/vllm_batch_generate.py) reads the dataset with `load_dataset`, turns each row into a chat message, calls `llm.chat()` once for the whole list, and writes `/output/answers.jsonl`. `--model`, `--dataset`, `--split` and `--max-tokens` are its arguments; point `--dataset` and the row-mapping line at your own data. `datasets` is not in the image, so the command installs it before running.

That run took a minute and a half on `a10g-small`, about $0.03, and almost none of it was generation: vLLM reported about 2,400 output tokens per second once the engine was up. Which is the point: within one Job, the prompts after the first are nearly free, so put a whole slice in one Job rather than one Job per prompt — each Job pays for the image pull, the install and the model download again. To go wider, shard the slice across Jobs: pass a different `--split` to each, and a different `--output` name, then read the files back together.

The script ends on a deliberate `os._exit(0)`, for the reason in [Troubleshooting](#troubleshooting): vLLM leaves its engine process and a few threads alive after the last call, and an interpreter waiting on them keeps a finished Job `RUNNING` and billing.

For data that does not fit the Job's disk, see [Process Large Datasets](./jobs-large-datasets) for streaming and mounting instead of downloading.

## While it runs, and after

Both `hf jobs run` and `hf jobs uv run` stream the logs and hold your terminal until the run ends. Ctrl+C stops only the log stream — the Job keeps running until it finishes or you stop it with `hf jobs cancel <job_id>`. For a long batch, pass `-d` (detach) to get the Job ID back at once, then follow it with `hf jobs logs -f <job_id>`, check the GPU with `hf jobs stats <job_id>`, and block on it with `hf jobs wait <job_id>`, which exits non-zero if the run failed. Logs stay readable after the run ends, and `hf jobs inspect <job_id>` gives the final status and error message — `logs -f` returns when the stream ends whether the run worked or not. See [Manage Jobs](./jobs-manage).

Anything you want to keep has to leave the container: a Job's disk is discarded when it ends, whether it finished, failed or timed out. Write to a mounted bucket as you go, as the batch example does, or push a finished file to a Hub repo with `hf repos cp`. See [Persist your results](./jobs-manage#persist-your-results).

## Before a longer run

- **Smoke-test with a cap.** Keep `--split train[:20]` and a small `--max-tokens` for the first run, as the examples here do. It proves the dependencies install, the dataset loads, the weights fit and the output lands. Then drop the cap.
- **Estimate from the first run.** vLLM prints a progress bar with the generation rate, and its log says how long the engine took to initialize. Add those two, plus image pull and weights download, and set `--timeout` comfortably above the total.
- **Check the disk.** Each flavor has a fixed ephemeral disk, in the Ephemeral Storage column of [Pricing and Billing](./jobs-pricing). The Hugging Face cache, your inputs and your outputs share it, and a 70B model is 140 GB of weights before the first token.
- **Pin what you rerun.** An image tag such as `vllm/vllm-openai:v0.31.0` or `lmsysorg/sglang:v0.5.21` rather than the default, and a script URL pinned to a commit rather than `main`. The URLs on this page track `main`, so pin the commit before you schedule one.
- **Keep `-s HF_TOKEN` on.** Gated weights fail without it, and it removes the anonymous download limits.

## Troubleshooting

- **`CUDA out of memory` while the engine loads.** Lower `--max-model-len` (vLLM) or `--context-length` / `--mem-fraction-static` (SGLang), then `--gpu-memory-utilization`. If the weights alone do not fit, quantize or move up a flavor, or split across GPUs with tensor parallelism. For llama.cpp, lower `n_gpu_layers`.
- **`exec: python: not found`, exit code 127.** The vLLM image has `python3` only. Jobs also runs your command as given, without the image's entrypoint, so the command line has to be complete: `vllm serve ...`, `python3 ...`, not bare arguments.
- **`ModuleNotFoundError` for a package the library does not need.** Framework images ship the engine and its own dependencies. Install the rest at the start of the command with `uv pip install --system <package>`, or run your script with uv and point it at the image, as described in [Using Docker images](./jobs-images#reuse-the-images-packages-and-add-dependencies-with-uv).
- **llama.cpp stops with no traceback, exit code 132.** The prebuilt CUDA wheels are compiled for recent server CPUs; on some flavors llama.cpp dies with an illegal instruction on arrival (`a10g-small` and `l4x1` in our runs, `t4-small` and `a100-large` were fine). Use one of the flavors that works, or build the CPU-only wheel as described in the llama.cpp section.
- **`libcudart.so.12: cannot open shared object file` on import.** The wheel needs the CUDA libraries at load time. Load them from the `nvidia-*` wheels before importing `llama_cpp`, as the script above does.
- **The Job runs on past its last log line.** An engine that leaves worker processes behind keeps the container alive, and a Job sitting in `RUNNING` with nothing happening still bills. `--timeout` is the hard stop and the real cost cap; end a script with a flush and an explicit exit, as the batch script does, and use `hf jobs inspect <job_id>` to see the stage it is stuck in.
- **The Job sits in `SCHEDULING` with `Pulling container image`.** The vLLM and SGLang images are several gigabytes, and a cold node takes five minutes or more to pull either. This is normal and billed as `Starting`; set `--timeout` to cover it, and look at `hf jobs inspect <job_id>` to see which stage the time went to.
- **A gated or private model fails to download.** Pass `-s HF_TOKEN`, and make sure the token can read the repo. See [Configuration](./jobs-configuration#environment-variables-and-secrets).

## Going further

- [Serve Models](./jobs-serving) to keep the same engines up on an exposed port, for an OpenAI-compatible endpoint that lives as long as the Job.
- [Train Models on Jobs](./jobs-training) for the other half of the loop: fine-tune the model you just checked, then run this page's commands against the result.
- [Process Large Datasets](./jobs-large-datasets) for reading and writing data that does not fit the Job's disk.
- [Configuration](./jobs-configuration) for secrets, volumes, exposed ports and the `[tool.hf-jobs]` table that lets a script carry its own flavor and timeout.
- [Schedule Jobs](./jobs-schedule) and [Webhook Automation](./jobs-webhooks) to rerun a batch on a timer or whenever a model or dataset is updated.
- [Pricing and Billing](./jobs-pricing) for per-flavor rates and how to cap spend.
