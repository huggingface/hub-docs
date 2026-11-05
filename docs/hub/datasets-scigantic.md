# Scigantic

[Scigantic](https://scigantic.com) opens a Hub dataset in a hosted JupyterLab with the repository mounted read-only, so you can look at the files and run code on them in the browser before deciding whether to download anything. The [`scigantic`](https://github.com/Scigantic/scigantic) Python package prints or opens that page from the command line, and also streams individual files from the Hub to your own machine over `hf://` paths.

Nothing is copied when a dataset is opened. The hosted notebook mounts the repository through the Hub's file API and reads bytes when a file is opened.

## Prerequisites

The package needs Python 3.9 or newer and has no required dependencies:

```bash
pip install scigantic
```

Local streaming uses `huggingface_hub`, which the `hf` extra installs:

```bash
pip install "scigantic[hf]"
```

## Open a dataset in the browser

Public datasets with a permissive licence have a landing page at `https://scigantic.com/hf/<owner>/<repo>`. The page needs no account. Running the notebook needs a free Scigantic account. A dataset that cannot be served gets the same page, with the reason and a link back to the Hub.

As an example, to open the [Iris dataset](https://huggingface.co/datasets/scikit-learn/iris):

```bash
scigantic open hf:scikit-learn/iris
```

The same from Python:

```python
import scigantic

scigantic.open("scikit-learn/iris")
```

Both print the landing URL and open it in your browser. Inside a Jupyter kernel, `scigantic.open` shows the URL as a link instead. Any of these forms names the same dataset: `hf:scikit-learn/iris`, `scikit-learn/iris`, `hf://datasets/scikit-learn/iris`, or `https://huggingface.co/datasets/scikit-learn/iris`.

To check whether a dataset can be served without opening a browser, ask for the JSON reply:

```bash
scigantic open hf:scikit-learn/iris --json --no-browser
```

```json
{
  "archiveId": "250e0ef0-9c8c-5564-9bc3-8882d20b69cd",
  "archiveUrl": "https://scigantic.com/archive/250e0ef0-9c8c-5564-9bc3-8882d20b69cd",
  "created": false,
  "license": "cc0-1.0",
  "success": true,
  "title": "Iris",
  "unlisted": true
}
```

## What the notebook contains

The repository is mounted read-only at `~/archive` (also `/mnt/archive`, and in the `SCIGANTIC_MOUNT_PATH` environment variable) with the same file layout as on the Hub. A starter notebook lists the mount and opens the first readable file, so for Iris the second cell prints the shape and first rows of `Iris.csv`. Files are fetched when they are read, so a large repository opens as quickly as a small one. Write your own results to `~/notebooks`, which persists between sessions.

## Stream files locally

`scigantic.hf` is built on `huggingface_hub`'s [`HfFileSystem`](/docs/huggingface_hub/guides/hf_file_system) and reads files with HTTP range requests, without downloading the whole repository:

```python
from scigantic import hf

hf.files("scikit-learn/iris")
# ['.gitattributes', 'Iris.csv', 'README.md', 'database.sqlite']

with hf.open("scikit-learn/iris", "Iris.csv") as f:
    print(f.readline())
```

`hf.files`, `hf.open` and `hf.info` accept `revision=` (a branch, tag or commit) and `token=`. Without a token they use the one `huggingface_hub` already knows about, so gated and private datasets you have access to stream locally even though the hosted notebook does not serve them. The CLI has the same listing:

```bash
scigantic files hf:scikit-learn/iris
```

## Which datasets are served

The hosted notebook serves datasets that are public, not gated, not disabled, and whose card carries one of these licence ids: `mit`, `apache-2.0`, `cc-by-4.0`, `cc-by-sa-4.0`, `cc-by-3.0`, `cc-by-sa-3.0`, `cc0-1.0`, `bsd-3-clause`, `bsd-2-clause`, `openrail`, `openrail++`, `odc-by`, `odc-odbl`, `pddl`, `lgpl-3.0`, `artistic-2.0`, `ecl-2.0`. Repositories with an `other` or missing licence are refused, because serving the files from a hosted notebook is redistribution.

The first request for a dataset registers it, and later requests reuse that entry. Registration is limited to repositories under 2 TiB and 50,000 files, and to 30 new datasets per address per day. Opening a dataset that is already registered is not limited.

When a dataset is refused, the landing page and the JSON reply give one of these reasons:

| Reason | Meaning |
| --- | --- |
| `gated` | The dataset is gated. Use it from your own Hub account, or stream it locally with your token. |
| `license` | The licence is not on the list above. |
| `not_found` | No public dataset by that name. It may be private or misspelled. |
| `disabled` | The dataset is disabled on the Hub. |
| `too_large` | Above the registration size or file-count limit. |
| `rate_limited` | Too many new datasets from one address today. |

## Associate the library with your dataset

To show Scigantic under **Use this dataset** on your dataset page, add the `scigantic` tag to the dataset card metadata:

```yaml
tags:
- scigantic
```

See [Associate a library to the dataset](./datasets-cards#associate-a-library-to-the-dataset) for how library tags work. You can list the datasets that carry the tag with:

```python
from huggingface_hub import HfApi

HfApi().list_datasets(filter="scigantic")
```
