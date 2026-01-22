# Lance

[Lance](https://lance.org) is an open multimodal lakehouse table format for AI. You can use Hugging Face paths (`hf://`) to access Lance datasets on the Hub. This lets you scan and search large datasets on the Hugging Face Hub without having to copy the entire dataset locally.

<div class="flex justify-center">
<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/hf_x_lance.png"/>
</div>

## Getting Started

To get started, pip install `pylance` and `pyarrow`:

```bash
pip install pylance pyarrow
```

## Why Lance?

- Optimized for ML/AI workloads: Lance is a modern columnar format designed for fast random access without compromising scan performance.
- Multimodal assets are stored as bytes, or binary objects ("[blobs as files](https://lance.org/guide/blob/)") in Lance alongside embeddings, and traditional scalar data -- this makes it easier to govern, share, and distribute your large datasets via the Hub.
- Indexing is a first-class citizen (native to the format itself): Lance comes with fast, on-disk, scalable [vector](https://lance.org/quickstart/vector-search) and FTS indexes that sit right alongside the dataset on the Hub, so you can share not only your data but also your embeddings and indexes without your users needing to recompute them.
- Flexible schema and [data evolution](https://lance.org/guide/data_evolution) let you incrementally add new features/columns (moderation tags, embeddings, etc.) **without** needing to rewrite the entire table.

## Store all your data in one place

In Lance, your multimodal data assets (images, audio, video) are stored as raw bytes alongside your scalar metadata and embeddings. This makes it easy to scan and filter your dataset in one place without needing to stitch together multiple storage systems.

## Stream from the Hub with `datasets`

Use `load_dataset(..., streaming=True)` to scan and iterate through the data without downloading it locally.

```python
from datasets import load_dataset

# Return as a Hugging Face dataset
ds = load_dataset(
    "lance-format/laion-1m",
    split="train",
    streaming=True
)
# Take first three rows
for row in ds.take(3):
    print(row["caption"])
```

Streaming is great for sampling metadata to understand what you have. For vector search or working with large binary blobs, you can use the Lance `dataset` API, explained below.

> [!WARNING]
> Streaming is fast for sampling simple scalar metadata but not as quick for embeddings or large multimodal assets. To work with large datasets, it's recommended to scan the metadata, identify subsets of what you need, and download that portion of the dataset locally to avoid facing Hub rate limits:
> `huggingface-cli download lance-format/laion-1m --repo-type dataset --local-dir ./laion`

## Stream from the Hub with `lance.dataset`

You can also scan a Lance dataset that's stored on the Hugging Face Hub using the `hf://` path specifier. This scans the remote dataset without requiring that you download it locally. Using the Lance `dataset` API, it's very simple to set limits, filters and projections to only fetch the data you need.

```python
import lance

# Return as a Lance dataset
ds = lance.dataset("hf://datasets/lance-format/laion-1m/data/train.lance")

scanner = ds.scanner(
    columns=["caption", "url", "similarity"],
    limit=5
)

rows = scanner.to_table().to_pylist()
for row in rows:
    print(row)
```

## Work with binary assets

The example below shows how images are retreved from a Lance dataset as raw JPEG bytes in the `image` column, and used downstream.
Use `ds.take` to fetch the bytes and write them to disk so you can use them elsewhere.

```python
import lance
from pathlib import Path

ds = lance.dataset("hf://datasets/lance-format/laion-1m/data/train.lance")

dir_name = "laion_samples"
Path(dir_name).mkdir(exist_ok=True)

rows = ds.take([0, 1], columns=["image", "caption"]).to_pylist()
for idx, row in enumerate(rows):
    with open(f"{dir_name}/{idx}.jpg", "wb") as f:
        f.write(row["image"])
        print(f"Wrote image with caption: {row['caption']}")
```

## Write a subset to a new Lance dataset

Working with large datasets? It's simple to run a filtered scan to select a subset of rows from the Hub and materialize them into a local Lance dataset.

```python
import lance

ds = lance.dataset("hf://datasets/lance-format/laion-1m/data/train.lance")
scanner = ds.scanner(
    columns=["image", "caption", "width", "height"],
    filter="width >= 200 AND height >= 100",
    limit=10,
)
subset = scanner.to_table()

lance.write_dataset(subset, "./laion_subset")
```

## Vector search

Because indexes are first-class citizens in Lance, you can store not only your data but also your embeddings and indexes together in a dataset and query them directly on the Hub. Simply use the `describe_indices()` method to list the index information for the dataset. If an index doesn't exist in the dataset, you can use `lance.write_dataset()` to write a local version of the dataset and use [LanceDataset.create_index](https://lance-format.github.io/lance-python-doc/all-modules.html#lance.dataset.LanceDataset.create_index) to create an index for your needs.

The example below shows a dataset for which we have a vector index on the `img_emb` field, as well as its index statistics.
```python
import lance

ds = lance.dataset("hf://datasets/lance-format/laion-1m/data/train.lance")

print(ds.list_indices())

# Returns
# [
#   IndexDescription(
#       name=img_emb_idx,
#       type_url=/lance.table.VectorIndexDetails,
#       num_rows_indexed=1209588,
#       fields=[15],
#       field_names=["img_emb"],
#       num_segments=1
#.   )
# ]
```

You can run vector search queries directly on the remote dataset without downloading it. The example below shows how to run a nearest neighbor search on a vector index using an image embedding as the query vector.

```python
import lance
import pyarrow as pa

ds = lance.dataset("hf://datasets/lance-format/laion-1m/data/train.lance")

emb_field = ds.schema.field("img_emb")
ref = ds.take([0], columns=["img_emb"]).to_pylist()[0]["img_emb"]
query = pa.array([ref], type=emb_field.type)

neighbors = ds.scanner(
    nearest={
        "column": emb_field.name,
        "q": query[0],
        "k": 6,
        "nprobes": 16,
        "refine_factor": 30,
    },
    columns=["caption", "url", "similarity"],
).to_table().to_pylist()
```

> [!NOTE]
> Setting a large `k` or `nprobes` value, or sending a large batch of queries all at once can hit Hub rate limits. For heavy usage, download the dataset (or a subset of it) locally and point Lance at the local path to avoid throttling.

## Dataset evolution

One of Lance's most powerful features is flexible, zero-cost data evolution, meaning that you can effortlessly add derived columns **without** rewriting the original table. For very large tables with a lot of large blobs, the savings in I/O can be quite significant. This feature is very relevant if you're experimenting with your data for ML/AI engineering tasks and you frequently find yourself adding new features, embeddings, or derived metadata.

The example below shows how to add a derived `moderation_label` column that marks an image as `NSFW` based on an existing score column. When you make this change, backfilling the new column **only** writes the new column data, without touching the original image blobs or data in other columns. You can also choose to just add the new column schema without backfilling any data.

```python
import lance
import pyarrow as pa

# Assumes you ran the export to Lance example above to store a local subset of the data
local_ds = lance.dataset("./laion_subset")

# schema only (data to be added later)
local_ds.add_columns(pa.field("moderation_label", pa.string()))

# with data backfill
local_ds.add_columns(
    {
        "moderation_label": "case WHEN \"NSFW\" > 0.5 THEN 'review' ELSE 'ok' END"
    }
)
```

See the Lance docs on [data evolution](https://lance.org/guide/data_evolution/) to learn how to alter and drop columns in Lance datasets.

## Work with video blobs

Lance tables also support large inline video blobs. The `OpenVid-1M` dataset (from [this paper](https://arxiv.org/abs/2407.02371)) contains high-quality, expressive videos and their captions. The video data is stored in the `video_blob` column of the following Lance dataset on the Hub.

```python
import lance

lance_ds = lance.dataset("hf://datasets/lance-format/openvid-lance")
blob_file = lance_ds.take_blobs("video_blob", ids=[0])[0]
video_bytes = blob_file.read()
```

Unlike other data formats, large multimodal binary objects (blobs) are first-class citizens in Lance. The [blob API](https://lance.org/guide/blob/) provides a high-level API to store and retrieve large blobs in Lance datasets. The following example shows how to efficiently browse metadata without loading the heavier video blobs, then fetch the relevant video blobs on demand.

```python
import lance

ds = lance.dataset("hf://datasets/lance-format/openvid-lance/data/train.lance")

# 1. Browse metadata without loading video blobs.
metadata = ds.scanner(
    columns=["caption", "aesthetic_score"],
    filter="aesthetic_score >= 4.5",
    limit=2,
).to_table().to_pylist()

# 2. Fetch a single video blob by row index.
selected_index = 0
blob_file = ds.take_blobs("video_blob", ids=[selected_index])[0]
with open("video_0.mp4", "wb") as f:
    f.write(blob_file.read())
```

## Explore more Lance datasets

Lance is an open format with native support for multimodal blobs alongside your traditional tabular data.
With the Hugging Face Hub integration, you can easily work with images, audio, video, text, embeddings, and
scalar metadata all in one place.

Explore more Lance datasets on the [Hugging Face Hub](https://huggingface.co/datasets?format=format:lance),
and share your own Lance datasets with others in the community!
You can visit [lance.org](https://lance.org/integrations/huggingface/) for more code snippets and examples.

