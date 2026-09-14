# Using Docker images

Every Job runs inside a Docker image, which provides its software environment, including
system tools and installed libraries. With `hf jobs run`, you provide an image and a command.
With `hf jobs uv run`, uv prepares the Python environment for your script, and Jobs selects
a default image unless you specify one.

## Choose how to run your workload

Start with `hf jobs uv run` when your Python script's dependencies can be installed with uv,
as shown in the [Quickstart](./jobs-quickstart). Choose an image when you need additional
system tools or want to use a prepared software environment.

| What you need                                                           | Starting point                           |
| ----------------------------------------------------------------------- | ---------------------------------------- |
| Run a Python script with its declared dependencies                      | `hf jobs uv run script.py`               |
| Use tools or Python packages already installed in an image              | `hf jobs run IMAGE COMMAND`              |
| Run a script with uv-managed dependencies and additional system tooling | `hf jobs uv run --image IMAGE script.py` |

The default image includes Python and uv. See [UV Jobs configuration](./jobs-configuration#uv-jobs)
for the current default image and available options.

You can use an existing image from a registry such as Docker Hub, or an
[image from a Space](#use-an-image-from-a-space). To build and host your own image on the Hub,
see the [Docker Spaces setup guide](./spaces-sdks-docker#setting-up-docker-spaces).

## Run a command in an existing image

Use `hf jobs run` with an image and the command to run inside it. For example, use a PyTorch
image to create a tensor on a GPU and double its values:

```bash
hf jobs run --flavor t4-small --timeout 5m \
    pytorch/pytorch:2.6.0-cuda12.4-cudnn9-devel \
    -- python -c 'import torch; x = torch.ones(3, device="cuda"); print(x * 2)'
```

The image supplies PyTorch and its CUDA software stack. `--flavor t4-small` selects the GPU,
`--timeout 5m` limits the Job's runtime, and the Python command uses the image's installed
PyTorch package. Its output appears in the Job's logs.

> [!TIP]
> `--` separates Jobs options from the command and its arguments. For example, `--help`
> after this separator is passed to your command. See [Passing arguments](./jobs-configuration#passing-arguments).

### Run your own script with input and output files

A script run by `hf jobs run` must be available inside the Job. You can use a script included
in the image, or [mount a local directory](./jobs-configuration#local-directories).

For example, suppose you have an inference script that uses the Transformers and PyTorch
packages in the `huggingface/trl` image. Your local `work` directory contains `inference.py`
and `inputs.jsonl`, and the script accepts `--input` and `--output` paths. After creating a
[Storage Bucket](./storage-buckets) for the results, run it with:

```bash
hf jobs run --flavor t4-small --timeout 10m \
    -v ./work:/work \
    -v hf://buckets/YOUR_USERNAME/results:/output \
    huggingface/trl \
    -- python /work/inference.py --input /work/inputs.jsonl --output /output/results.jsonl
```

Replace `YOUR_USERNAME` with the bucket owner's namespace. The CLI uploads the local directory
and mounts it at `/work`. Your script reads the input there and writes results to the bucket
mounted at `/output`, where they remain available after the Job finishes. Adapt the command's
arguments, hardware and timeout to your script; see [Volumes](./jobs-configuration#volumes)
for other input and output options.

## Use an image with uv

Use `hf jobs uv run --image` when your script needs system tooling beyond the default image
while keeping uv's Python dependency workflow. The chosen image must have `uv` installed.

There are three parts to the environment:

- **System tools and libraries in the image**, such as `ffmpeg` or the CUDA toolkit, are
  available to the Job according to the image's configuration.
- **Python packages installed in the image** belong to its existing Python environment.
- **Python packages declared by your script** are installed by uv. A `# /// script`
  dependency header creates an isolated environment, so the image's Python packages are
  not automatically included.

For example, a vLLM script may need an image with CUDA tooling while using uv to install its
own declared Python dependencies. The system tooling must still be compatible with the
packages uv installs.

If you want to use an image's preinstalled PyTorch, TRL or vLLM directly, use `hf jobs run`.
If you also need uv to install extra dependencies, see
[Reuse the image's packages and add dependencies with uv](#reuse-the-images-packages-and-add-dependencies-with-uv).

## Use an image from a Space

Use a Space's image when it already packages the tools or workload you need, or when someone
has shared their environment as a Space. Its source repository gives you a place to inspect
the code and build configuration. Pass the Space URL where you would normally put an image name:

```bash
hf jobs run --flavor cpu-basic hf.co/spaces/lhoestq/duckdb -- duckdb -c "SELECT 42 AS answer;"
```

The [lhoestq/duckdb Space](https://huggingface.co/spaces/lhoestq/duckdb/tree/main) packages the
DuckDB command-line tool. The Space supplies the built image; the Job runs the SQL command
on the hardware you select.

Inspect the Space's source files to see what its image contains and which command to run.
When a Space uses the Docker SDK, its Dockerfile defines how the image is built. The Space
build produces the image that Jobs uses; each Job does not rebuild the Dockerfile. Starting
a Job can still involve downloading the image. A repository containing a Dockerfile alone
is not enough: an image must have been built successfully.
Configure the Job's [secrets](./jobs-configuration#environment-variables-and-secrets) and
[volumes](./jobs-configuration#volumes) when you launch it.

## Example images

<a id="vllm"></a>
<a id="trl"></a>

| Image                                         | What it provides                                                                  |
| --------------------------------------------- | --------------------------------------------------------------------------------- |
| `pytorch/pytorch:2.6.0-cuda12.4-cudnn9-devel` | PyTorch and a CUDA development environment, used in the example above.            |
| `huggingface/trl`                             | TRL, Transformers, PyTorch and uv for post-training and related Python workloads. |
| `vllm/vllm-openai`                            | vLLM, uv and CUDA tooling for LLM inference.                                      |

Use `hf jobs run` to run commands with an image's installed packages. For `hf jobs uv run`,
check that the image has uv installed and follow the [environment guidance](#use-an-image-with-uv)
above. Browse [Examples & Tutorials](./jobs-examples) for workloads to run and adapt.

## Reuse the image's packages and add dependencies with uv

Framework images provide preinstalled packages that can be slow or difficult to build, such as
PyTorch, vLLM, and their CUDA extensions. You may still need additional Python packages for your
script — for example, to load a particular data format or track experiments.

You can reuse the image's preinstalled stack while using uv to install those extras. Declare the
additional packages in your script's `# /// script` dependency header, then point uv at the
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

- `--python` creates uv's environment with the **image's** interpreter, matching the Python
  version used by its compiled extensions. It does not expose the image's packages by itself.
- `-e PYTHONPATH=...` makes `import vllm` resolve to the image's prebuilt build for that run.
- Trim your `# /// script` dependencies to what the image _lacks_. `PYTHONPATH` is searched
  before uv's environment, so the image shadows anything your header declares for the same
  package — including a newer version you pinned. Dependencies you retain can still pull in
  those packages transitively; uv does not use `PYTHONPATH` to satisfy dependency resolution.

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
> This selects the image's builds for imports, not for uv's dependency resolver. Trimming the
> header can reduce redundant installs, but does not guarantee they are eliminated. A
> `uv run --system-site-packages` that would skip the `PYTHONPATH` step is
> [requested upstream](https://github.com/astral-sh/uv/issues/7999).

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

Some GPU libraries need additional system tooling, such as the CUDA compiler (`nvcc`),
NCCL or cuDNN. Installing their Python packages does not guarantee that the image contains
every tool they need. For example, FlashInfer's sampler can fail when it tries to compile
a kernel in an image without the CUDA toolkit:

```text
RuntimeError: Could not find nvcc and default cuda_home='/usr/local/cuda' doesn't exist
```

Passing a framework image with the required CUDA tooling addresses this missing-toolkit error:

```bash
hf jobs uv run --image vllm/vllm-openai --flavor l4x4 -s HF_TOKEN generate-responses.py
```

uv still resolves and installs your script dependencies separately. The image supplies system
tooling, but does not guarantee that the resolved Python packages are compatible with it.
