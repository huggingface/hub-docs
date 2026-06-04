# Popular Images

Here is the list of ready-to-use Docker images from popular frameworks that you can use in Jobs with uv.

These Docker images already have uv installed but if you want to use an image + uv for an image without uv installed you’ll need to make sure uv is installed first. This will work well in many cases but for LLM inference libraries which can have quite specific requirements, it can be useful to use a specific image that has the library installed.

> [!TIP]
> For GPU inference libraries, pass `--image` so the run gets a matching CUDA system stack
> (toolkit, `nvcc`, libraries) — see [Using framework images for GPU
> libraries](#using-framework-images-for-gpu-libraries) below.

## vLLM

vLLM is a very well known and heavily used inference engine. It is known for its ability to scale inference for LLMs.
They provide the `vllm/vllm-openai` Docker image with vLLM and UV ready. This image is ideal to run batch inference.

Use the `--image` argument to use this Docker image:

```bash
>>> hf jobs uv run --image vllm/vllm-openai --flavor l4x4 generate-responses.py
```

> [!TIP]
> The `vllm/vllm-openai` image bundles the CUDA toolkit and prebuilt vLLM/FlashInfer kernels.
> Using it is usually all you need; you can also reuse its prebuilt Python builds — see [Using
> framework images for GPU libraries](#using-framework-images-for-gpu-libraries) below.

You can find more information on vLLM batch inference on Jobs in [Daniel Van Strien's blog post](https://danielvanstrien.xyz/posts/2025/hf-jobs/vllm-batch-inference.html).

## TRL

TRL is a library designed for post-training models using techniques like Supervised Fine-Tuning (SFT), Group Relative Policy Optimization (GRPO), and Direct Preference Optimization (DPO). An up-to-date Docker image with UV and all TRL dependencies is available at `huggingface/trl` and can be used directly with Hugging Face Jobs.

Use the `--image` argument to use this Docker image:

```bash
>>> hf jobs uv run --image huggingface/trl --flavor a100-large -s HF_TOKEN train.py
```

## Using framework images for GPU libraries

GPU libraries like vLLM need more than their Python package — they need a matching system
environment: the CUDA toolkit (including `nvcc`), system libraries like NCCL and cuDNN, and so
on. If you omit `--image`, `hf jobs uv run` uses the default uv image
(`ghcr.io/astral-sh/uv:python3.12-bookworm`), a bare Python base with no CUDA toolkit. Your
dependencies still install from PyPI, but at runtime a library that needs the toolkit can fail —
for example FlashInfer's sampler JIT-compiles a kernel and aborts with:

```text
RuntimeError: Could not find nvcc and default cuda_home='/usr/local/cuda' doesn't exist
```

Passing the framework image fixes this — it provides the CUDA toolkit, `nvcc`, and matched
libraries — and **this is usually all you need**:

```bash
hf jobs uv run --image vllm/vllm-openai --flavor l4x4 -s HF_TOKEN generate-responses.py
```

UV still reinstalls your `# /// script` dependencies from PyPI, but they now run against the
image's system stack, so the framework works.

### Optionally: reuse the image's prebuilt Python builds

These images also ship prebuilt, CUDA-matched builds of the framework itself. To import those
instead of UV's fresh PyPI install — handy if a PyPI build and the image's CUDA stack disagree
(an ABI mismatch, or a kernel that won't build) — point UV at the image's interpreter and add
its site-packages to the import path:

```bash
hf jobs uv run \
    --image vllm/vllm-openai \
    --flavor l4x4 \
    --python /usr/bin/python3 \
    -e PYTHONPATH=/usr/local/lib/python3.12/dist-packages \
    -s HF_TOKEN \
    generate-responses.py
```

- `--python` uses the **image's** interpreter, keeping ABI compatibility with its compiled extensions.
- `-e PYTHONPATH=...` makes `import vllm` resolve to the image's prebuilt build for that run.

Paths differ per image, so probe them on `cpu-basic` rather than hardcoding:

```bash
hf jobs run --flavor cpu-basic vllm/vllm-openai bash -c 'which python3; which uv; python3 -m pip show vllm | grep Location'
```

```text
/usr/bin/python3                              # pass to --python
/usr/local/bin/uv                             # uv is present, so `uv run` works
Location: /usr/local/lib/python3.12/dist-packages   # pass to PYTHONPATH
```

Swap `vllm` for whichever library you're reusing. Layouts vary — `vllm/vllm-openai` and
`lmsysorg/sglang` use the system `dist-packages` above, while `unsloth/unsloth` uses a
virtualenv (`/opt/venv/...`).

> [!TIP]
> This pins imports to the image's build; UV still installs your declared dependencies, so it
> isn't a speed-up. A `uv run --system-site-packages` that would reuse the image's packages and
> skip the reinstall is [requested upstream](https://github.com/astral-sh/uv/issues/7999).
