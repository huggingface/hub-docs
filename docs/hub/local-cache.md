# Hub Local Cache

This document describes the on-disk layout of the HF Hub local cache. It is intended as a reference for reimplementing the cache system in any language.

Here is a partial list of libraries and applications that use this cache layout. Please open a PR to add your own.

### Libraries

| Library | Language | Notes |
|---------|----------|-------|
| [`huggingface_hub`](https://github.com/huggingface/huggingface_hub) | Python | And any library that depends on it (e.g. `transformers`, `diffusers`, `datasets`, `mlx`, `vllm` …) |
| [`hf-hub`](https://github.com/huggingface/hf-hub) | Rust | |
| [`swift-huggingface`](https://github.com/huggingface/swift-huggingface) | Swift | |
| [`@huggingface/hub`](https://github.com/huggingface/huggingface.js) | JavaScript | Node.js only |
| [`SMILE`](https://github.com/haifengl/smile) | Java | See [`HuggingFaceHub`](https://haifengl.github.io/api/java/smile/util/HuggingFaceHub.html) documentation |

### Applications

| Application | Language | Notes |
|-------------|----------|-------|
| [`llama.cpp`](https://github.com/ggml-org/llama.cpp) | C++ | Since [#20775](https://github.com/ggml-org/llama.cpp/pull/20775) |
| [`LlamaBarn`](https://github.com/ggml-org/LlamaBarn) | Swift | macOS app, built on `llama.cpp` |
| [`HuggingFaceModelDownloader`](https://github.com/bodaay/HuggingFaceModelDownloader) | Go | |

## Cache location

The default cache directory is:

```
~/.cache/huggingface/hub
```

This can be overridden with environment variables:
- `HF_HUB_CACHE` - direct path to the cache directory (takes priority)
- `HF_HOME` - path to the Hugging Face home directory; if set, the cache lives at `$HF_HOME/hub`

## Overview

```
<CACHE_DIR>/
├── .locks/                                  # Lock files for concurrent download safety
├── models--<org>--<repo>/                   # Cached model repositories
├── datasets--<org>--<repo>/                 # Cached dataset repositories
└── spaces--<org>--<repo>/                   # Cached space repositories
```

Each downloaded repository gets a single flat folder. Inside each repo folder, files are stored once in a content-addressed `blobs/` directory and accessed through `snapshots/` symlinks. Named references (branches, tags) are tracked in `refs/`.

## Schema

```
                     ┌──────────────────────────────────────────┐
                     │           Repository folder              │
                     │  models--julien-c--EsperBERTo-small      │
                     └──────────────┬───────────────────────────┘
                                    │
              ┌─────────────┬───────┴───────┬──────────────┐
              │             │               │              │
              v             v               v              v
          ┌───────┐    ┌────────┐    ┌────────────┐   ┌──────────┐
          │ refs/ │    │ blobs/ │    │ snapshots/ │   │.no_exist/│
          └───┬───┘    └────┬───┘    └──────┬─────┘   └────┬─────┘
              │             │               │              │
              │             │               │              │
   "main" contains     Files stored     One folder     Empty marker
   commit hash         by content       per commit     files for
   e.g. "aaaaaa"       hash (SHA-1      hash, e.g.     files known
                       or SHA-256)      aaaaaa/        not to exist
   Resolves a                           bbbbbb/
   branch/tag to                            │
   a snapshot ──────────────────────►  Contains symlinks
                                       to ../../blobs/{hash}
```

## Repository folder naming

Repositories are stored as flat directories at the cache root. The folder name encodes the repo type and repo ID:

```
{type}s--{repo_id_with_slashes_replaced_by_--}
```

Rules:
- The repo type is **pluralized**: `models`, `datasets`, `spaces`
- Forward slashes (`/`) in the repo ID are replaced with `--`
- The separator between all parts is `--`
- Casing is preserved

Examples:

| Hub repo ID                          | Repo type | Cache folder name                            |
|--------------------------------------|-----------|----------------------------------------------|
| `julien-c/EsperBERTo-small`         | model     | `models--julien-c--EsperBERTo-small`         |
| `huggingface/DataMeasurementsFiles`  | dataset   | `datasets--huggingface--DataMeasurementsFiles` |
| `dalle-mini/dalle-mini`             | space     | `spaces--dalle-mini--dalle-mini`             |

> [!NOTE]
> Buckets are not handled by this cache as they are not git-backed. Use the dedicated `hf buckets sync` command instead.

## Inside a repository folder

Every cached repository has the same internal structure:

```
<repo_folder>/
├── blobs/
├── refs/
├── snapshots/
└── .no_exist/    # may not always be present
```

### `blobs/`: content-addressed file storage

The `blobs/` directory stores the actual file contents. Each file is named after its file etag on the Hub:

- **Git-tracked files**: named by their **SHA-1** hash (40 hexadecimal characters)
- **Git LFS files**: named by their **SHA-256** hash (64 hexadecimal characters)

This is a flat directory -- no subdirectories. Identical files across different revisions are stored only once.

```
blobs/
├── 403450e234d65943a7dcf7e05a771ce3c92faa84dd07db4ac20f592037a1e4bd   # SHA-256 (LFS)
├── 7cb18dc9bafbfcf74629a4b760af1b160957a83e                           # SHA-1 (git)
└── d7edf6bd2a681fb0175f7735299831ee1b22b812                           # SHA-1 (git)
```

### `refs/`: branch and tag references

The `refs/` directory maps human-readable references (branch names, tags, PR numbers) to commit hashes.

Each reference is a plain text file containing a single line: the full commit hash (40 hexadecimal characters).

```
refs/
├── main            # contains e.g. "bbc77c8132af1cc5cf678da3f1ddf2de43606d48"
├── 2.4.0           # a tag
└── refs/
    └── pr/
        └── 1       # pull request reference
```

When a file is downloaded using a branch or tag name, the corresponding ref file is created or updated with the latest commit hash.

### `snapshots/`: revision views

The `snapshots/` directory contains one subdirectory per cached revision (commit hash). Each revision directory mirrors the file structure of the repository on the Hub, but files are **symlinks** pointing into `../../blobs/{hash}`.

```
snapshots/
├── 2439f60ef33a0d46d85da5001d52aeda5b00ce9f/
│   ├── README.md -> ../../blobs/d7edf6bd2a681fb0175f7735299831ee1b22b812
│   └── pytorch_model.bin -> ../../blobs/403450e234d65943a7dcf7e05a771ce3c92faa84dd07db4ac20f592037a1e4bd
└── bbc77c8132af1cc5cf678da3f1ddf2de43606d48/
    ├── README.md -> ../../blobs/7cb18dc9bafbfcf74629a4b760af1b160957a83e
    └── pytorch_model.bin -> ../../blobs/403450e234d65943a7dcf7e05a771ce3c92faa84dd07db4ac20f592037a1e4bd
```

Key properties:
- Symlinks use **relative paths**: `../../blobs/{hash}`
- If a file is unchanged between two revisions, both symlinks point to the **same blob** with no data duplication
- Files in subdirectories on the Hub are represented as subdirectories in the snapshot (the full relative path is preserved)

Switching between snapshots is similar to using `git checkout` in a local git repository.

### `.no_exist/`: non-existence cache

The `.no_exist/` directory tracks files that were requested but do not exist on the Hub. This avoids repeated HTTP requests for optional files.

Structure mirrors `snapshots/`: one subdirectory per commit hash, containing **empty files** (not symlinks) named after the missing file.

```
.no_exist/
└── 2439f60ef33a0d46d85da5001d52aeda5b00ce9f/
    └── config_that_does_not_exist.json    # empty file
```

Disk usage is negligible since these are only empty marker files.

## Lock files

Lock files prevent concurrent processes from downloading the same blob simultaneously. They are stored in a `.locks/` directory at the cache root (not inside the repo folder):

```
<CACHE_DIR>/.locks/<repo_folder_name>/<blob_hash>.lock
```

Example:
```
<CACHE_DIR>/.locks/models--julien-c--EsperBERTo-small/403450e234d65943a7dcf7e05a771ce3c92faa84dd07db4ac20f592037a1e4bd.lock
```

## Full example

```
~/.cache/huggingface/hub/
├── .locks/
│   └── models--julien-c--EsperBERTo-small/
│       └── 403450e234d65943a7dcf7e05a771ce3c92faa84dd07db4ac20f592037a1e4bd.lock
│
└── models--julien-c--EsperBERTo-small/
    ├── blobs/
    │   ├── [321M]  403450e234d65943a7dcf7e05a771ce3c92faa84dd07db4ac20f592037a1e4bd
    │   ├── [ 398]  7cb18dc9bafbfcf74629a4b760af1b160957a83e
    │   └── [1.4K]  d7edf6bd2a681fb0175f7735299831ee1b22b812
    │
    ├── refs/
    │   └── main    # contains "bbc77c8132af1cc5cf678da3f1ddf2de43606d48"
    │
    ├── snapshots/
    │   ├── 2439f60ef33a0d46d85da5001d52aeda5b00ce9f/
    │   │   ├── README.md         -> ../../blobs/d7edf6bd2a681fb0175f7735299831ee1b22b812
    │   │   └── pytorch_model.bin -> ../../blobs/403450e234d65943a7dcf7e05a771ce3c92faa84dd07db4ac20f592037a1e4bd
    │   │
    │   └── bbc77c8132af1cc5cf678da3f1ddf2de43606d48/
    │       ├── README.md         -> ../../blobs/7cb18dc9bafbfcf74629a4b760af1b160957a83e
    │       └── pytorch_model.bin -> ../../blobs/403450e234d65943a7dcf7e05a771ce3c92faa84dd07db4ac20f592037a1e4bd
    │
    └── .no_exist/
        └── 2439f60ef33a0d46d85da5001d52aeda5b00ce9f/
            └── optional_config.json    # empty file
```

Note how `pytorch_model.bin` points to the **same blob** in both revisions. The 321 MB file is stored only once on disk.

## File resolution logic

To locate a cached file on disk:

1. **Resolve the revision to a commit hash**
   - If the revision is already a 40-character hex string, use it directly
   - Otherwise, read the file at `refs/{revision}` to get the commit hash

2. **Check the snapshot**
   - Look for `snapshots/{commit_hash}/{relative_path}`
   - If it exists (as a symlink or file), the file is cached. Follow the symlink to get the content

3. **Check non-existence**
   - Look for `.no_exist/{commit_hash}/{relative_path}`
   - If it exists, the file is known not to exist on the Hub for this revision

4. **Cache miss**
   - If neither path exists, the file has not been cached yet

## Windows behavior

The cache relies on **symbolic links**. On Windows systems where symlinks are not available, the cache operates in a **degraded mode**: actual file copies are placed directly in `snapshots/` instead of symlinks. The `blobs/` directory is not used in this mode.

This means the same file content may be duplicated across revisions, increasing disk usage. To enable symlink support on Windows, activate [Developer Mode](https://docs.microsoft.com/en-us/windows/apps/get-started/enable-your-device-for-development) or run as administrator.
