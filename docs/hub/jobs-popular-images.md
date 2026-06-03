# Popular Images

Here is the list of ready-to-use Docker images from popular frameworks that you can use in Jobs with uv.

These Docker images already have uv installed but if you want to use an image + uv for an image without uv installed you’ll need to make sure uv is installed first. This will work well in many cases but for LLM inference libraries which can have quite specific requirements, it can be useful to use a specific image that has the library installed.

> [!WARNING]
> By default, `hf jobs uv run` installs your script's dependencies from PyPI and does **not**
> reuse the libraries already baked into these images. For CUDA-heavy inference libraries
> (vLLM, FlashInfer, and so on) the naive command can fail at startup. See
> [Reusing image-baked libraries with `uv run`](#reusing-image-baked-libraries-with-uv-run)
> below for the workaround.

## vLLM

vLLM is a very well known and heavily used inference engine. It is known for its ability to scale inference for LLMs.
They provide the `vllm/vllm-openai` Docker image with vLLM and UV ready. This image is ideal to run batch inference.

Use the `--image` argument to use this Docker image:

```bash
>>> hf jobs uv run --image vllm/vllm-openai --flavor l4x4 generate-responses.py
```

> [!TIP]
> The `vllm/vllm-openai` image ships prebuilt vLLM and FlashInfer kernels. To use those
> rather than letting UV reinstall vLLM from PyPI, follow [Reusing image-baked libraries
> with `uv run`](#reusing-image-baked-libraries-with-uv-run) below.

You can find more information on vLLM batch inference on Jobs in [Daniel Van Strien's blog post](https://danielvanstrien.xyz/posts/2025/hf-jobs/vllm-batch-inference.html).

## TRL

TRL is a library designed for post-training models using techniques like Supervised Fine-Tuning (SFT), Group Relative Policy Optimization (GRPO), and Direct Preference Optimization (DPO). An up-to-date Docker image with UV and all TRL dependencies is available at `huggingface/trl` and can be used directly with Hugging Face Jobs.

Use the `--image` argument to use this Docker image:

```bash
>>> hf jobs uv run --image huggingface/trl --flavor a100-large -s HF_TOKEN train.py
```

## Reusing image-baked libraries with `uv run`

When you run a script against one of these images with `hf jobs uv run`, UV builds its own
isolated environment and installs your `# /// script` dependencies from PyPI — it does
**not** reuse the libraries already baked into the image. For images that ship prebuilt,
CUDA-matched builds (vLLM, PyTorch, FlashInfer, and so on) you usually want the opposite:
reuse the image's copies for faster cold starts and to avoid CUDA/ABI mismatches with the
image's driver. Two flags do that — point UV at the image's interpreter, and add its
site-packages to the import path:

```bash
hf jobs uv run \
    --image vllm/vllm-openai \
    --flavor l4x4 \
    --python /usr/bin/python3 \
    -e PYTHONPATH=/usr/local/lib/python3.12/dist-packages \
    -s HF_TOKEN \
    generate-responses.py
```

- `--python` runs the script with the **image's** interpreter instead of one UV provisions
  itself, keeping ABI compatibility with the image's compiled extensions.
- `-e PYTHONPATH=...` adds the image's site-packages to the import path **for that UV run**,
  so `import vllm` resolves to the image's prebuilt build rather than a fresh PyPI install.

The exact paths differ per image. Find them with a one-off probe on `cpu-basic` — it prints
the interpreter path to pass as `--python` and the package directory to pass as `PYTHONPATH`:

```bash
hf jobs run --flavor cpu-basic vllm/vllm-openai bash -c '
  which python3
  python3 -c "import importlib.util, os; print(os.path.dirname(os.path.dirname(importlib.util.find_spec(\"vllm\").origin)))"
'
```

(Swap `vllm` for whichever library you're reusing.)

> [!TIP]
> Symptoms of *not* reusing the image's build vary by library. With vLLM, for example, a
> PyPI-installed copy can fail at startup with `RuntimeError: Could not find nvcc` — its
> FlashInfer sampler tries to JIT-compile a CUDA kernel the runtime has no compiler for,
> while the image already ships the prebuilt kernels.

This only applies to `hf jobs uv run`. With generic `hf jobs run <image> python ...`, the
image's libraries import directly — no `--python` or `PYTHONPATH` needed. There's an
[open issue in `uv`](https://github.com/astral-sh/uv/issues/7999) to make this less manual
in future.
