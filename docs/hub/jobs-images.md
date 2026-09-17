# Using Docker images

Every Job runs inside a Docker image, which provides its software environment, including system tools and installed libraries. With `hf jobs run`, you provide an image and a command. With `hf jobs uv run`, uv prepares the Python environment for your script, and Jobs selects a default image unless you specify one.

## Choose how to run your workload

Start with `hf jobs uv run` when your Python script's dependencies can be installed with uv, as shown in the [Quickstart](./jobs-quickstart). Choose an image when you need additional system tools or want to use a prepared software environment.

| What you need                                                           | Starting point                           |
| ----------------------------------------------------------------------- | ---------------------------------------- |
| Run a Python script with its declared dependencies                      | `hf jobs uv run script.py`               |
| Use tools or Python packages already installed in an image              | `hf jobs run IMAGE COMMAND`              |
| Run a script with uv-managed dependencies and additional system tooling | `hf jobs uv run --image IMAGE script.py` |

The default image includes Python and uv. See [UV Jobs configuration](./jobs-configuration#uv-jobs) for the current default image and available options.

You can use an existing image from a registry such as Docker Hub, or [build and host your own image with a Docker Space](#build-your-own-image-with-a-docker-space).

## Use a ready-made image

Use `hf jobs run` with an image and the command to run inside it. Any public image from Docker Hub or another registry works, including a specific tag. Start with a small one:

```bash
hf jobs run ubuntu echo 'Hello from the cloud!'
```

The Job pulls the image, runs the command and exits. To use software an image already provides, choose an image that ships it. For example, use a PyTorch image to create a tensor on a GPU and double its values:

```bash
hf jobs run --flavor t4-small --timeout 5m \
    pytorch/pytorch:2.6.0-cuda12.4-cudnn9-devel \
    -- python -c 'import torch; x = torch.ones(3, device="cuda"); print(x * 2)'
```

The image supplies PyTorch and its CUDA software stack. `--flavor t4-small` selects the GPU, `--timeout 5m` limits the Job's runtime, and the Python command uses the image's installed PyTorch package. Its output appears in the Job's logs.

> [!TIP]
> `--` separates Jobs options from the command and its arguments. For example, `--help` after this separator is passed to your command. See [Passing arguments](./jobs-configuration#passing-arguments).

### Run your own script with input and output files

A script run by `hf jobs run` must be available inside the Job. You can use a script included in the image, or [mount a local directory](./jobs-configuration#local-directories).

For example, suppose you have an inference script that uses the Transformers and PyTorch packages in the `huggingface/trl` image. Your local `work` directory contains `inference.py` and `inputs.jsonl`, and the script accepts `--input` and `--output` paths. After creating a [Storage Bucket](./storage-buckets) for the results, run it with:

```bash
hf jobs run --flavor t4-small --timeout 10m \
    -v ./work:/work \
    -v hf://buckets/YOUR_USERNAME/results:/output \
    huggingface/trl \
    -- python /work/inference.py --input /work/inputs.jsonl --output /output/results.jsonl
```

Replace `YOUR_USERNAME` with the bucket owner's namespace. The CLI uploads the local directory and mounts it at `/work`. Your script reads the input there and writes results to the bucket mounted at `/output`, where they remain available after the Job finishes. Adapt the command's arguments, hardware and timeout to your script; see [Volumes](./jobs-configuration#volumes) for other input and output options.

## Use an image with uv

Use `hf jobs uv run --image` when your script needs system tooling beyond the default image while keeping uv's Python dependency workflow. The chosen image must have `uv` installed.

There are three parts to the environment:

- **System tools and libraries in the image**, such as `ffmpeg` or the CUDA toolkit, are available to the Job according to the image's configuration.
- **Python packages installed in the image** belong to its existing Python environment.
- **Script dependencies.** With an [inline dependency header](https://docs.astral.sh/uv/guides/scripts/#declaring-script-dependencies), uv installs your Python packages in an isolated environment. Packages preinstalled in the image are not automatically available.

For example, a vLLM script may need an image with CUDA tooling while using uv to install its own declared Python dependencies. The system tooling must still be compatible with the packages uv installs.

If you want to use an image's preinstalled PyTorch, TRL or vLLM directly, use `hf jobs run`. If you also need uv to install extra dependencies, see [Reuse the image's packages and add dependencies with uv](#reuse-the-images-packages-and-add-dependencies-with-uv).

## Build your own image with a Docker Space

A Docker Space can build and host an image with the tools your workload needs, including your own scripts, and the image can be private without a registry account. For example, add FFmpeg to a Python image to prepare an environment for processing audio or video.

Create a [Docker Space](./spaces-sdks-docker#setting-up-docker-spaces) and add this `Dockerfile` at the root of its repository:

```dockerfile
FROM python:3.12-slim-bookworm

# Install FFmpeg for audio and video processing.
RUN apt-get update \
    && apt-get install -y --no-install-recommends ffmpeg \
    && rm -rf /var/lib/apt/lists/*

# Match the non-root user ID used by Docker Spaces.
RUN useradd --create-home --uid 1000 user
USER user

# Check that FFmpeg is available.
CMD ["ffmpeg", "-version"]
```

`FROM` supplies Python. FFmpeg is not included in this base image, so `RUN` installs it at build time. `useradd` creates a user with a home directory and UID `1000`, matching [Docker Spaces](./spaces-sdks-docker#permissions); `USER` runs commands as that user. `CMD` sets a default command, here checking the FFmpeg installation.

Commit the file and wait for the Space's build logs to show that the image was pushed. Then pass the Space URL where you would normally put an image name, replacing `YOUR_USERNAME/video-tools` with your Space ID:

```bash
hf jobs run --flavor cpu-basic --timeout 5m \
    hf.co/spaces/YOUR_USERNAME/video-tools -- ffmpeg -version
```

The version appears in the Job's logs. Supply a different command after the Space URL to use FFmpeg or Python for your workload. To include your own script in the image, add a line such as `COPY --chown=user:user process.py /app/process.py` to the Dockerfile and run `python /app/process.py`. See [input and output files](#run-your-own-script-with-input-and-output-files) for mounting data and saving results.

> [!NOTE]
> This example prints a version and exits, so the Space shows a runtime error after the build. That is fine: Jobs only need the built image, not a running Space.

> [!TIP]
> A Space's built image is not guaranteed to stay pullable. It can be lost to registry maintenance or a region move. If a Job reports that the image was not found, factory reboot the Space to rebuild it. Jobs always use the latest build, so a new commit replaces the image too.

## Example images

<a id="vllm"></a>
<a id="trl"></a>

Registry images are maintained by their publishers and can be pinned to a specific tag.

| Image                                         | What it provides                                                                  |
| --------------------------------------------- | --------------------------------------------------------------------------------- |
| `pytorch/pytorch:2.6.0-cuda12.4-cudnn9-devel` | PyTorch and a CUDA development environment, used in the example above.            |
| `huggingface/trl`                             | TRL, Transformers, PyTorch and uv for post-training and related Python workloads. |
| `vllm/vllm-openai`                            | vLLM, uv and CUDA tooling for LLM inference.                                      |

Use `hf jobs run` to run commands with an image's installed packages. For `hf jobs uv run`, check that the image has uv installed and follow the [environment guidance](#use-an-image-with-uv) above. Browse [Examples & Tutorials](./jobs-examples) for workloads to run and adapt.

## Reuse the image's packages and add dependencies with uv

Framework images provide preinstalled packages that can be slow or difficult to build, such as PyTorch, vLLM, and their CUDA extensions. You may still need additional Python packages for your script — for example, to load a particular data format or track experiments.

You can reuse the image's preinstalled stack while using uv to install those extras. Declare the additional packages in your script's `# /// script` dependency header, then point uv at the image's interpreter and add its site-packages to the import path:

```bash
hf jobs uv run \
    --image vllm/vllm-openai \
    --flavor l4x4 \
    --python /usr/bin/python3 \
    -e PYTHONPATH=/usr/local/lib/python3.12/dist-packages \
    -s HF_TOKEN \
    generate-responses.py
```

- `--python` creates uv's environment with the image's interpreter, matching the Python version used by its compiled extensions. It does not expose the image's packages by itself.
- `-e PYTHONPATH=...` makes `import vllm` resolve to the image's prebuilt build for that run.
- Trim your `# /// script` dependencies to what the image _lacks_. `PYTHONPATH` is searched before uv's environment, so the image shadows anything your header declares for the same package — including a newer version you pinned. Dependencies you retain can still pull in those packages transitively; uv does not use `PYTHONPATH` to satisfy dependency resolution.

Paths differ per image, so probe them on `cpu-basic` rather than hardcoding:

```bash
hf jobs run --flavor cpu-basic vllm/vllm-openai bash -c 'which python3; which uv; python3 -m pip show vllm | grep Location'
```

```text
/usr/bin/python3                              # pass to --python
/usr/local/bin/uv                             # uv is present, so `uv run` works
Location: /usr/local/lib/python3.12/dist-packages   # pass to PYTHONPATH
```

Swap `vllm` for whichever library you're reusing. Layouts vary — `vllm/vllm-openai` and `lmsysorg/sglang` use the system `dist-packages` above, `unsloth/unsloth` uses a virtualenv (`/opt/venv/...`), and `huggingface/trl` uses conda (`/opt/conda/lib/python3.11/site-packages`, inherited from `pytorch/pytorch`).

> [!TIP]
> This selects the image's builds for imports, not for uv's dependency resolver. Trimming the header can reduce redundant installs, but does not guarantee they are eliminated. A `uv run --system-site-packages` that would skip the `PYTHONPATH` step is [requested upstream](https://github.com/astral-sh/uv/issues/7999).

For the `huggingface/trl` image, the corresponding interpreter and package paths are:

```bash
hf jobs uv run \
    --image huggingface/trl \
    --flavor a100-large \
    --python /opt/conda/bin/python3 \
    -e PYTHONPATH=/opt/conda/lib/python3.11/site-packages \
    -s HF_TOKEN \
    train.py
```

These commands use `generate-responses.py` and `train.py` as names for your own scripts.

## Troubleshooting

### Using framework images for GPU libraries

Some GPU libraries need additional system tooling, such as the CUDA compiler (`nvcc`), NCCL or cuDNN. Installing their Python packages does not guarantee that the image contains every tool they need. For example, FlashInfer's sampler can fail when it tries to compile a kernel in an image without the CUDA toolkit:

```text
RuntimeError: Could not find nvcc and default cuda_home='/usr/local/cuda' doesn't exist
```

Passing a framework image with the required CUDA tooling addresses this missing-toolkit error:

```bash
hf jobs uv run --image vllm/vllm-openai --flavor l4x4 -s HF_TOKEN generate-responses.py
```

uv still resolves and installs your script dependencies separately. The image supplies system tooling, but does not guarantee that the resolved Python packages are compatible with it.
