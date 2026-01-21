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

### Authentication

To read private datasets and to get access to more generous rate limits, you need to set your Hugging Face token as an environment variable:

```shell
export HF_TOKEN="your_hugging_face_token_here"
```

## Why Lance?

- Optimized for ML/AI workloads: Lance is a modern columnar format designed for fast random access without compromising scan performance.
- Multimodal assets are stored as bytes, or binary objects ("[blobs as files](https://lance.org/guide/blob/)") in Lance alongside embeddings, and traditional scalar data -- this makes it easier to govern, share, and distribute your large datasets via the Hub.
- Indexing is a first-class citizen (native to the format itself): Lance comes with fast, on-disk, scalable [vector](https://lance.org/quickstart/vector-search) and FTS indexes that sit right alongside the dataset on the Hub, so you can share not only your data but also your embeddings and indexes without your users needing to recompute them.
- Flexible schema and [data evolution](https://lance.org/guide/data_evolution) let you incrementally add new features/columns (moderation tags, embeddings, etc.) **without** needing to rewrite the entire table.

## Scan a Lance dataset

You can open a Lance dataset that's stored on the Hugging Face Hub using the `hf://` path specifier. This scans the remote dataset without requiring that you download it locally.
Because multimodal datasets can be really large, Lance makes it simple to set limits, filters and projections to only fetch the data you need.

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

## Vector search

Because indexes native to the Lance format, you can store not only your data but also your **embeddings and indexes together** in one dataset and query them directly on the Hub.

If the dataset includes a vector index (for example `img_emb`), you can run vector search queries directly on the remote dataset without downloading it.
The example below shows how to run a nearest neighbor search on a vector index using an image embedding as the query vector.

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

## Work with video blobs

Unlike other data formats, large multimodal binary objects (blobs) are first-class citizens in Lance. The `OpenVid-1M` dataset (from [this paper](https://arxiv.org/abs/2407.02371)) is a good example dataset to explore, contains high-quality, expressive videos and their captions. The video data is stored in the `video_blob` column of the following Lance dataset on the Hub.

You can 

```python
import lance

lance_ds = lance.dataset("hf://datasets/lance-format/openvid-lance")
blob_file = lance_ds.take_blobs("video_blob", ids=[0])[0]
video_bytes = blob_file.read()
```

For large video blobs (e.g., ~10 MB and beyond) that Lance also provides a high-level[blob API](https://lance.org/guide/blob/) to store, distribute and search on them efficiently.
The following example shows how to efficiently browse metadata without loading the heavier video blobs, then fetch the relevant video blobs on demand.

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
The blob API is compatible with `torchcodec` to decode videos as torch tensors:

```python
from torchcodec.decoders import VideoDecoder
decoder = VideoDecoder(blob_file)
tensor = decoder[0]  # uint8 tensor of shape [C, H, W]
```

Refer to the [torchcodec docs](https://docs.pytorch.org/torchcodec/stable/generated/torchcodec.decoders.VideoDecoder.html) to see more functions for efficiently decoding videos.
## Explore more Lance datasets

Lance is an open format with native support for multimodal blobs alongside your traditional tabular data. You can work with images, audio, video, text, embeddings, and scalar metadata all in one place!

Explore more Lance datasets on the [Hugging Face Hub](https://huggingface.co/datasets?search=lance-format&sort=downloads). Feel free to upload and share your own Lance datasets too!
