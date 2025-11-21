# Streaming datasets

## Integrated libraries

If a dataset on the Hub is compatible with a [supported library](./datasets-libraries) that allows streaming from Hugging Face, streaming the dataset can be done in just a few lines. For information on accessing the dataset, you can click on the "Use this dataset" button on the dataset page to see how to do so. For example, [`knkarthick/samsum`](https://huggingface.co/datasets/knkarthick/samsum?library=datasets) shows how to do so with `datasets` below.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-usage.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-usage-dark.png"/>
</div>

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-usage-modal.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-usage-modal-dark.png"/>
</div>

## Using the Hugging Face Client Library

You can use the [`huggingface_hub`](/docs/huggingface_hub) library to create, delete, and access files from repositories. For example, to stream the `allenai/c4` dataset in Python, simply install the library (we recommend using the latest version) and run the following code.

```bash
pip install -U huggingface_hub
```
```python
from huggingface_hub import HfFileSystem

fs = HfFileSystem()

repo_id = "allenai/c4"
path_in_repo = "en/c4-train.00000-of-01024.json.gz"

# Stream the file
with fs.open(f"datasets/{repo_id}/{path_in_repo}", "r", compression="gzip") as f:
    print(f.readline())  # read only the first line
    # {"text":"Beginners BBQ Class Taking Place in Missoula!...}
```

See the [`HfFileSystem` documentation](https://huggingface.co/docs/huggingface_hub/en/guides/hf_file_system) for more information.

You can also integrate this into your own library! For example, you can quickly stream a CSV dataset using Pandas in batches.
```py
from huggingface_hub import HfFileSystem
import pandas as pd

fs = HfFileSystem()

repo_id = "YOUR_REPO_ID"
path_in_repo = "data.csv"

batch_size = 5

# Stream the file
with fs.open(f"datasets/{repo_id}/{path_in_repo}") as f:
    for df in pd.read_csv(f, iterator=True, chunksize=batch_size):  # read 5 lines at a time
        print(len(df))  # 5
```

Streaming is especially useful to read big files on Hugging Face progressively or only a small portion.
For example `tarfile` can iterate on the files of TAR archives, `zipfile` can read files from ZIP archives and `pyarrow` can access row groups of Parquet files.

> ![TIP]
> There is an equivalent filesystem implementation in Rust available in [OpenDAL](https://github.com/apache/opendal).

## Using cURL

Since all files on the Hub are available via HTTP, you can stream files using `cURL`:

```bash
>>> curl -L https://huggingface.co/datasets/fka/awesome-chatgpt-prompts/resolve/main/prompts.csv | head -n 5
"act","prompt"
"An Ethereum Developer","Imagine you are an experienced Ethereum developer tasked with creating...
"SEO Prompt","Using WebPilot, create an outline for an article that will be 2,000 words on the ...
"Linux Terminal","I want you to act as a linux terminal. I will type commands and you will repl...
"English Translator and Improver","I want you to act as an English translator, spelling correct...
```

Use range requests to access a specific portion of a file:

```bash
>>> curl -r 40-88 -L https://huggingface.co/datasets/fka/awesome-chatgpt-prompts/resolve/main/prompts.csv
Imagine you are an experienced Ethereum developer
```

Stream from private repositories using an [access token](https://huggingface.co/docs/hub/en/security-tokens):


```bash
>>> export HF_TOKEN=hf_xxx
>>> curl -H "Authorization: Bearer $HF_TOKEN" -L https://huggingface.co/...
```

## Streaming Parquet

Parquet is a great format for AI datasets. It offers good compression, a columnar structure for efficient processing and projections, and multi-level metadata for fast filtering, and is suitable for datasets of all sizes.

Parquet files are divided in row groups that are often around 100MB each. This lets data loaders and data processing frameworks stream data progressively, iterating on row groups.

### Stream Row Groups

Use PyArrow to stream row groups from Parquet files on Hugging Face:

```python
import pyarrow.parquet as pq

repo_id = "HuggingFaceFW/finewiki"
path_in_repo = "data/enwiki/000_00000.parquet"

# Stream the Parquet file row group per row group
with pq.ParquetFile(f"hf://datasets/{repo_id}/{path_in_repo}") as pf:
    for row_group_idx in range(pf.num_row_groups):
        row_group_table = pf.read_row_group(row_group_idx)
        df = row_group_table.to_pandas()
```

> ![TIP]
> PyArrow supports `hf://` paths out-of-the-box and uses `HfFileSystem` automatically

Find more information in the [PyArrow documentation](./datasets-pyarrow).

### Efficient random access

Row groups are further divided into columns, and columns into pages. Pages are often around 1MB and are the smallest unit of data in Parquet, since this is where compression is applied. Accessing pages enables loading specific rows without having to load a full row group, and is possible if the Parquet file has a page index. However not every Parquet frameworks support reading at the page level. PyArrow doesn't for example, but the `parquet` crate in Rust does:

```rust
use std::sync::Arc;
use object_store::path::Path;
use object_store_opendal::OpendalStore;
use opendal::services::Huggingface;
use opendal::Operator;
use parquet::arrow::async_reader::ParquetObjectReader;
use parquet::arrow::ParquetRecordBatchStreamBuilder;
use futures::TryStreamExt;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let repo_id = "HuggingFaceFW/finewiki";
    let path_in_repo = Path::from("data/enwiki/000_00000.parquet");
    let offset = 0;
    let limit = 10;

    let builder = Huggingface::default().repo_type("dataset").repo_id(repo_id);
    let operator = Operator::new(builder)?.finish();
    let store = Arc::new(OpendalStore::new(operator));
    let reader = ParquetObjectReader::new(store, path_in_repo.clone());
    let batch_stream =
        ParquetRecordBatchStreamBuilder::new(reader).await?
            .with_offset(offset as usize)
            .with_limit(limit as usize)
            .build()?;
    let results = batch_stream.try_collect::<Vec<_>>().await?;
    println!("Read {} batches", results.len());
    Ok(())
}
```

> ![TIP]
> In Rust we use OpenDAL's `Huggingface` service which is equivalent to `HfFileSystem` in python

Pass `write_page_index=True` in PyArrow to include the page index that enables efficient random access.
It notably adds "offset_index_offset" and "offset_index_length" to Parquet columns that you can see in the [Parquet metadata viewer on Hugging Face](https://huggingface.co/blog/cfahlgren1/intro-to-parquet-format).
Page indexes also speed up the [Hugging Face Dataset Viewer](https://huggingface.co/docs/dataset-viewer) and allows it to show data without row group size limit.
