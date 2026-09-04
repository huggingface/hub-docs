# Popular Images

Here is the list of ready-to-use Docker images from popular frameworks that you can use in Jobs.

Choose how to run your code:

- [`hf jobs run`](./jobs-configuration#docker-jobs) executes a command directly in the image,
  so you can use its preinstalled Python packages.
- [`hf jobs uv run`](./jobs-configuration#uv-jobs) runs your script with UV. For a script with
  a `# /// script` dependency header, UV creates an isolated environment. `--image` supplies
  the system environment, but does not automatically expose the image's Python packages.

The UV examples below require an image with `uv` installed. To combine UV-managed dependencies
with the image's preinstalled packages, see [Reuse the image's packages and add dependencies with UV](#reuse-the-images-packages-and-add-dependencies-with-uv).

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
> With `hf jobs uv run`, this image provides CUDA tooling, but UV resolves vLLM from your
> script's dependencies rather than using the image's preinstalled vLLM build and its kernels.
> To use the image's build, run a command with `hf jobs run`, or use the
> [reuse approach](#reuse-the-images-packages-and-add-dependencies-with-uv) below.

You can find more information on vLLM batch inference on Jobs in [Daniel Van Strien's blog post](https://danielvanstrien.xyz/posts/2025/hf-jobs/vllm-batch-inference.html).

## TRL

TRL is a library designed for post-training models using techniques like Supervised Fine-Tuning (SFT), Group Relative Policy Optimization (GRPO), and Direct Preference Optimization (DPO). An up-to-date Docker image with UV and all TRL dependencies is available at `huggingface/trl` and can be used directly with Hugging Face Jobs.

Use the `--image` argument to use this Docker image:

```bash
>>> hf jobs uv run --image huggingface/trl --flavor a100-large -s HF_TOKEN train.py
```

This gives your script the image's CUDA stack, but not its Python packages, including TRL and
PyTorch. A script with a `# /// script` header uses the dependencies UV resolves from that header.
To use the image's TRL directly, use `hf jobs run`. For example, check its installed version:

```bash
>>> hf jobs run --flavor cpu-basic huggingface/trl python -c 'import trl; print(trl.__version__)'
```

If you need UV's script workflow while reusing the image's packages, select its interpreter
and expose its site-packages as described in [Reuse the image's packages and add dependencies with UV](#reuse-the-images-packages-and-add-dependencies-with-uv):

```bash
hf jobs uv run \
    --image huggingface/trl \
    --flavor a100-large \
    --python /opt/conda/bin/python3 \
    -e PYTHONPATH=/opt/conda/lib/python3.11/site-packages \
    -s HF_TOKEN \
    train.py
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

Passing a framework image with the required CUDA tooling addresses this missing-toolkit error:

```bash
hf jobs uv run --image vllm/vllm-openai --flavor l4x4 -s HF_TOKEN generate-responses.py
```

UV still resolves and installs your script dependencies separately. The image supplies system
tooling, but does not guarantee that the resolved Python packages are compatible with it.

### Reuse the image's packages and add dependencies with UV

Framework images provide preinstalled packages that can be slow or difficult to build, such as
PyTorch, vLLM, and their CUDA extensions. You may still need additional Python packages for your
script — for example, to load a particular data format or track experiments.

You can reuse the image's preinstalled stack while using UV to install those extras. Declare the
additional packages in your script's `# /// script` dependency header, then point UV at the
image's interpreter and add its site-packages to the import path:

```bash
hf jobs uv run \
    --image vllm/vllm-openai \
    --flavor l4x4 \
    --python /usr/bin/python3 \
    -e PYTHONPATH=/usr/local/lib/python3.12/dist-packages \
    -s HF_TOKEN \
    generate-responses.py
```

- `--python` creates UV's environment with the **image's** interpreter, matching the Python
  version used by its compiled extensions. It does not expose the image's packages by itself.
- `-e PYTHONPATH=...` makes `import vllm` resolve to the image's prebuilt build for that run.
- Trim your `# /// script` dependencies to what the image *lacks*. `PYTHONPATH` is searched
  before UV's environment, so the image shadows anything your header declares for the same
  package — including a newer version you pinned. Dependencies you retain can still pull in
  those packages transitively; UV does not use `PYTHONPATH` to satisfy dependency resolution.

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
`lmsysorg/sglang` use the system `dist-packages` above, `unsloth/unsloth` uses a virtualenv
(`/opt/venv/...`), and `huggingface/trl` uses conda
(`/opt/conda/lib/python3.11/site-packages`, inherited from `pytorch/pytorch`).

> [!TIP]
> This selects the image's builds for imports, not for UV's dependency resolver. Trimming the
> header can reduce redundant installs, but does not guarantee they are eliminated. A `uv run
> --system-site-packages` that would skip the `PYTHONPATH` step is [requested
> upstream](https://github.com/astral-sh/uv/issues/7999).
