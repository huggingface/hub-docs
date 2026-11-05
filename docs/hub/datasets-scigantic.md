# Scigantic

[Scigantic](https://scigantic.com) opens a Hub dataset in a hosted JupyterLab with the files mounted, so you can read a dataset in the browser before deciding whether to download it. The `scigantic` Python package also streams individual files from the Hub to your own machine over `hf://` paths. Nothing is copied: the hosted notebook mounts the repository read-only and fetches bytes on access.

## Open a dataset in the browser

Public datasets with a permissive licence have a landing page at `https://scigantic.com/hf/<owner>/<repo>`. The page needs no account. Running the notebook needs a free account. A dataset that cannot be served gets the same page with the reason and a link back to the Hub.

To open a dataset from the command line:

```bash
pip install scigantic
scigantic open hf:owner/repo
```

The same from Python:

```python
import scigantic

scigantic.open("owner/repo")
```

Both print the landing URL and open it in your browser. In the notebook the repository is mounted read-only at `~/archive`, with the same file layout as the Hub repository, and files are read on access.

## Stream files locally

The `hf` extra adds `scigantic.hf`, built on `huggingface_hub`'s `HfFileSystem`. It reads files from a Hub repository without downloading the whole repository.

```bash
pip install "scigantic[hf]"
```

```python
import scigantic.hf

for path in scigantic.hf.files("owner/repo"):
    print(path)

with scigantic.hf.open("owner/repo", "data/train.parquet") as f:
    header = f.read(4)
```

`scigantic.hf.open` returns a file object for the `hf://datasets/owner/repo/<path>` location. Gated and private repositories need a Hub token in the usual `huggingface_hub` places.

## Which datasets are served

The hosted notebook serves public datasets whose card carries one of these licence ids: `mit`, `apache-2.0`, `cc-by-4.0`, `cc-by-sa-4.0`, `cc-by-3.0`, `cc-by-sa-3.0`, `cc0-1.0`, `bsd-3-clause`, `bsd-2-clause`, `openrail`, `openrail++`, `odc-by`, `odc-odbl`, `pddl`, `lgpl-3.0`, `artistic-2.0`, `ecl-2.0`.

Gated, private and disabled repositories, and repositories whose licence is `other` or missing, are refused. The landing page says why and links back to the dataset on the Hub. Local streaming with `scigantic.hf` is not affected by this rule, since it reads the Hub directly with your own credentials.

## Associate the library with your dataset

To show Scigantic under **Use this dataset** on your dataset page, add the `scigantic` tag to the dataset card metadata:

```yaml
tags:
- scigantic
```

See [Associate a library to the dataset](./datasets-cards#associate-a-library-to-the-dataset) for how library tags work.
