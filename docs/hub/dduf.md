# DDUF

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/DDUF/DDUF-Banner.svg"/>
     <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/DDUF/DDUF-Banner-dark.svg"/>
</div>


## Overview

DDUF (**D**DUF’s **D**iffusion **U**nified **F**ormat) is a single-file format for diffusion models that aims to unify the different model distribution methods and weight-saving formats by packaging all model components into a single file. It is language-agnostic and built to be parsable from a remote location without downloading the entire file.

This work draws inspiration from the [GGUF](https://github.com/ggerganov/ggml/blob/master/docs/gguf.md) format.

Check out the [DDUF](https://huggingface.co/DDUF) org to start using some of the most popular diffusion models in DDUF.

> [!TIP]
> We welcome contributions with open arms!
>
> To create a widely adopted file format, we need early feedback from the community. Nothing is set in stone, and we value everyone's input. Is your use case not covered? Please let us know in the DDUF organization [discussions](https://huggingface.co/spaces/DDUF/README/discussions/2).

Its key features include the following.

1. **Single file** packaging.
2. Based on **ZIP file format** to leverage existing tooling.
3. No compression, ensuring **`mmap` compatibility** for fast loading and saving.
4. **Language-agnostic**: tooling can be implemented in Python, JavaScript, Rust, C++, etc.
5. **HTTP-friendly**: metadata and file structure can be fetched remotely using HTTP Range requests.
6. **Flexible**: each model component is stored in its own directory, following the current Diffusers structure.
7. **Safe**: uses [Safetensors](https://huggingface.co/docs/diffusers/using-diffusers/other-formats#safetensors) as a weight-saving format and prohibits nested directories to prevent ZIP bombs.

## Technical specifications

Technically, a `.dduf` file **is** a [`.zip` archive](https://en.wikipedia.org/wiki/ZIP_(file_format)). By building on a universally supported file format, we ensure robust tooling already exists. However, some constraints are enforced to meet diffusion models' requirements:
- Data must be stored uncompressed (flag `0`), allowing lazy-loading using memory-mapping.
- Data must be stored using ZIP64 protocol, enabling saving files above 4GB.
- The archive can only contain `.json`, `.safetensors`, `.model` and `.txt` files.
- A `model_index.json` file must be present at the root of the archive. It must contain a key-value mapping with metadata about the model and its components.
- Each component must be stored in its own directory (e.g., `vae/`, `text_encoder/`). Nested files must use UNIX-style path separators (`/`).
- Each directory must correspond to a component in the `model_index.json` index.
- Each directory must contain a json config file (one of `config.json`, `tokenizer_config.json`, `preprocessor_config.json`, `scheduler_config.json`).
- Sub-directories are forbidden.

Want to check if your file is valid? Check it out using this Space: https://huggingface.co/spaces/DDUF/dduf-check.

## Usage

The `huggingface_hub` provides tooling to handle DDUF files in Python. It includes built-in rules to validate file integrity and helpers to read and export DDUF files. The goal is to see this tooling adopted in the Python ecosystem, such as in the `diffusers` integration. Similar tooling can be developed for other languages (JavaScript, Rust, C++, etc.).

### How to read a DDUF file?

Pass a path to `read_dduf_file` to read a DDUF file. Only the metadata is read, meaning this is a lightweight call that won't explode your memory. In the example below, we consider that you've already downloaded the [`FLUX.1-dev.dduf`](https://huggingface.co/DDUF/FLUX.1-dev-DDUF/blob/main/FLUX.1-dev.dduf) file locally.

```python
>>> from huggingface_hub import read_dduf_file

# Read DDUF metadata
>>> dduf_entries = read_dduf_file("FLUX.1-dev.dduf")
```

`read_dduf_file` returns a mapping where each entry corresponds to a file in the DDUF archive. A file is represented by a `DDUFEntry` dataclass that contains the filename, offset, and length of the entry in the original DDUF file. This information is useful to read its content without loading the whole file. In practice, you won't have to handle low-level reading but rely on helpers instead.

For instance, here is how to load the `model_index.json` content:
```python
>>> import json
>>> json.loads(dduf_entries["model_index.json"].read_text())
{'_class_name': 'FluxPipeline', '_diffusers_version': '0.32.0.dev0', '_name_or_path': 'black-forest-labs/FLUX.1-dev', ...
```

For binary files, you'll want to access the raw bytes using `as_mmap`. This returns bytes as a memory-mapping on the original file. The memory-mapping allows you to read only the bytes you need without loading everything in memory. For instance, here is how to load safetensors weights:

```python
>>> import safetensors.torch
>>> with dduf_entries["vae/diffusion_pytorch_model.safetensors"].as_mmap() as mm:
...     state_dict = safetensors.torch.load(mm) # `mm` is a bytes object
```

> [!TIP]
> `as_mmap` must be used in a context manager to benefit from the memory-mapping properties.

### How to write a DDUF file?

Pass a folder path to `export_folder_as_dduf` to export a DDUF file.

```python
# Export a folder as a DDUF file
>>> from huggingface_hub import export_folder_as_dduf
>>> export_folder_as_dduf("FLUX.1-dev.dduf", folder_path="path/to/FLUX.1-dev")
```

This tool scans the folder, adds the relevant entries and ensures the exported file is valid. If anything goes wrong during the process, a `DDUFExportError` is raised.

For more flexibility, use [`export_entries_as_dduf`] to explicitly specify a list of files to include in the final DDUF file:

```python
# Export specific files from the local disk.
>>> from huggingface_hub import export_entries_as_dduf
>>> export_entries_as_dduf(
...     dduf_path="stable-diffusion-v1-4-FP16.dduf",
...     entries=[ # List entries to add to the DDUF file (here, only FP16 weights)
...         ("model_index.json", "path/to/model_index.json"),
...         ("vae/config.json", "path/to/vae/config.json"),
...         ("vae/diffusion_pytorch_model.fp16.safetensors", "path/to/vae/diffusion_pytorch_model.fp16.safetensors"),
...         ("text_encoder/config.json", "path/to/text_encoder/config.json"),
...         ("text_encoder/model.fp16.safetensors", "path/to/text_encoder/model.fp16.safetensors"),
...         # ... add more entries here
...     ]
... )
```

`export_entries_as_dduf` works well if you've already saved your model on the disk. But what if you have a model loaded in memory and want to serialize it directly into a DDUF file? `export_entries_as_dduf` lets you do that by providing a Python `generator` that tells how to serialize the data iteratively:

```python
(...)

# Export state_dicts one by one from a loaded pipeline
>>> def as_entries(pipe: DiffusionPipeline) -> Generator[Tuple[str, bytes], None, None]:
...     # Build a generator that yields the entries to add to the DDUF file.
...     # The first element of the tuple is the filename in the DDUF archive. The second element is the content of the file.
...     # Entries will be evaluated lazily when the DDUF file is created (only 1 entry is loaded in memory at a time)
...     yield "vae/config.json", pipe.vae.to_json_string().encode()
...     yield "vae/diffusion_pytorch_model.safetensors", safetensors.torch.save(pipe.vae.state_dict())
...     yield "text_encoder/config.json", pipe.text_encoder.config.to_json_string().encode()
...     yield "text_encoder/model.safetensors", safetensors.torch.save(pipe.text_encoder.state_dict())
...     # ... add more entries here

>>> export_entries_as_dduf(dduf_path="my-cool-diffusion-model.dduf", entries=as_entries(pipe))
```

### Loading a DDUF file with Diffusers

Diffusers has a built-in integration for DDUF files. Here is an example on how to load a pipeline from a stored checkpoint on the Hub:

```py
from diffusers import DiffusionPipeline
import torch

pipe = DiffusionPipeline.from_pretrained(
    "DDUF/FLUX.1-dev-DDUF", dduf_file="FLUX.1-dev.dduf", torch_dtype=torch.bfloat16
).to("cuda")
image = pipe(
    "photo a cat holding a sign that says Diffusers", num_inference_steps=50, guidance_scale=3.5
).images[0]
image.save("cat.png")
```

## F.A.Q.

### Why build on top of ZIP?

ZIP provides several advantages:
- Universally supported file format
- No additional dependencies for reading
- Built-in file indexing
- Wide language support

### Why not use a TAR with a table of contents at the beginning of the archive?

See the explanation in this [comment](https://github.com/huggingface/huggingface_hub/pull/2692#issuecomment-2519863726).

### Why no compression?

- Enables direct memory mapping of large files
- Ensures consistent and predictable remote file access
- Prevents CPU overhead during file reading
- Maintains compatibility with safetensors

### Can I modify a DDUF file?

No. For now, DDUF files are designed to be immutable. To update a model, create a new DDUF file.
	
### Which frameworks/apps support DDUFs?
	
- [Diffusers](https://github.com/huggingface/diffusers)
	
We are constantly reaching out to other libraries and frameworks. If you are interested in adding support to your project, open a Discussion in the [DDUF org](https://huggingface.co/spaces/DDUF/README/discussions).
