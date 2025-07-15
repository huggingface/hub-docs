# PyArrow

[Arrow](https://github.com/apache/arrow) is a columnar format and a toolbox for fast data interchange and in-memory analytics.
Since PyArrow supports [fsspec](https://filesystem-spec.readthedocs.io) to read and write remote data, you can use the Hugging Face paths ([`hf://`](/docs/huggingface_hub/guides/hf_file_system#integrations)) to read and write data on the Hub.
It is especially useful for [Parquet](https://parquet.apache.org/) data, since Parquet is the most common file format on Hugging Face.
Indeed, Parquet is particularly efficient thanks to its structure, typing, metadata and compression.

## Load a Table

You can load data from local files or from remote storage like Hugging Face Datasets. PyArrow supports many formats including CSV, JSON and more importantly Parquet:

```python
>>> import pyarrow.parquet as pq
>>> table = pq.read_table("path/to/data.parquet")
```

To load a file from Hugging Face, the path needs to start with `hf://`. For example, the path to the [stanfordnlp/imdb](https://huggingface.co/datasets/stanfordnlp/imdb) dataset repository is `hf://datasets/stanfordnlp/imdb`. The dataset on Hugging Face contains multiple Parquet files. The Parquet file format is designed to make reading and writing data frames efficient, and to make sharing data across data analysis languages easy. Here is how to load the file `plain_text/train-00000-of-00001.parquet` as a pyarrow Table (it requires `pyarrow>=21.0`):

```python
>>> import pyarrow.parquet as pq
>>> table = pq.read_table("hf://datasets/stanfordnlp/imdb/plain_text/train-00000-of-00001.parquet")
>>> table
pyarrow.Table
text: string
label: int64
----
text: [["I rented I AM CURIOUS-YELLOW from my video store because of all the controversy that surrounded it (... 1542 chars omitted)", ...],...,[..., "The story centers around Barry McKenzie who must go to England if he wishes to claim his inheritan (... 221 chars omitted)"]]
label: [[0,0,0,0,0,...,0,0,0,0,0],...,[1,1,1,1,1,...,1,1,1,1,1]]
```

If you don't want to load the full Parquet data, you can get the Parquet metadata or load row group by row group instead:

```python
>>> import pyarrow.parquet as pq
>>> pf = pq.ParquetFile("hf://datasets/stanfordnlp/imdb/plain_text/train-00000-of-00001.parquet")
>>> pf.metadata
<pyarrow._parquet.FileMetaData object at 0x1171b4090>
  created_by: parquet-cpp-arrow version 12.0.0
  num_columns: 2
  num_rows: 25000
  num_row_groups: 25
  format_version: 2.6
  serialized_size: 62036
>>> for i in pf.num_row_groups:
...     table = pf.read_row_group(i)
...     ...
```

For more information on the Hugging Face paths and how they are implemented, please refer to the [the client library's documentation on the HfFileSystem](/docs/huggingface_hub/guides/hf_file_system).

## Save a Table

You can save a pyarrow Table using `pyarrow.parquet.write_table` to a local file or to Hugging Face directly.

To save the Table on Hugging Face, you first need to [Login with your Hugging Face account](/docs/huggingface_hub/quick-start#login), for example using:

```
huggingface-cli login
```

Then you can [Create a dataset repository](/docs/huggingface_hub/quick-start#create-a-repository), for example using:

```python
from huggingface_hub import HfApi

HfApi().create_repo(repo_id="username/my_dataset", repo_type="dataset")
```

Finally, you can use [Hugging Face paths](/docs/huggingface_hub/guides/hf_file_system#integrations) in PyArrow:

```python
import pyarrow.parquet as pq

pq.write_table(table, "hf://datasets/username/my_dataset/imdb.parquet", use_content_defined_chunking=True)

# or write in separate files if the dataset has train/validation/test splits
pq.write_table(table_train, "hf://datasets/username/my_dataset/train.parquet", use_content_defined_chunking=True)
pq.write_table(table_valid, "hf://datasets/username/my_dataset/validation.parquet", use_content_defined_chunking=True)
pq.write_table(table_test , "hf://datasets/username/my_dataset/test.parquet", use_content_defined_chunking=True)
```

We use `use_content_defined_chunking=True` to enable faster uploads and downloads from Hugging Face thanks to Xet deduplication (it requires `pyarrow>=21.0`).

<Tip>

Content defined chunking (CDC) makes the Parquet writer chunk the data pages in a way that makes duplicate data chunked and compressed identically.
Without CDC, the pages are arbitrarily chunked and therefore duplicate data are impossible to detect because of compression.
Thanks to CDC, Parquet uploads and downloads from Hugging Face are faster, since duplicate data are uploaded or downloaded only once.

</Tip>

Find more information about Xet [here](https://huggingface.co/join/xet).

## Use Images

You can load a folder with a metadata file containing a field for the names or paths to the images, structured like this:

```
Example 1:            Example 2:
folder/               folder/
├── metadata.parquet  ├── metadata.parquet
├── img000.png        └── images
├── img001.png            ├── img000.png
...                       ...
└── imgNNN.png            └── imgNNN.png
```

You can iterate on the images paths like this:

```python
from pathlib import Path
import pyarrow as pq

folder_path = Path("path/to/folder")
table = pq.read_table(folder_path + "metadata.parquet")
for file_name in table["file_name"].to_pylist():
    image_path = folder_path / file_name
    ...
```

Since the dataset is in a [supported structure](https://huggingface.co/docs/hub/en/datasets-image#additional-columns) (a `metadata.parquet` file with a `file_name` field), you can save this dataset to Hugging Face and the Dataset Viewer shows both the metadata and images on Hugging Face.

```python
from huggingface_hub import HfApi
api = HfApi()

api.upload_folder(
    folder_path=folder_path,
    repo_id="username/my_image_dataset",
    repo_type="dataset",
)
```

### Embed Images inside Parquet

PyArrow has a binary type which allows to have the images bytes in Arrow tables. Therefore it enables saving the dataset as one single Parquet file containing both the images (bytes and path) and the samples metadata:

```python
import pyarrow as pa
import pyarrow.parquet as pq

# Embed the image bytes in Arrow
image_array = pa.array([
    {
        "bytes": (folder_path / file_name).read_bytes(),
        "path": file_name,
    }
    for file_name in table["file_name"].to_pylist()
])
table.append_column("image", image_array)

# (Optional) Set the HF Image type for the Dataset Viewer and the `datasets` library
features = {"image": {"_type": "Image"}}  # or using datasets.Features(...).to_dict()
schema_metadata = {"huggingface": {"dataset_info": {"features": features}}}
table = table.replace_schema_metadata(schema_metadata)

# Save to Parquet
# (Optional) with use_content_defined_chunking for faster uploads and downloads
# (Optional) with row_group_size to allow loading 100 images at a time
pq.write_table(table, "data.parquet", use_content_defined_chunking=True, row_group_size=100)
```

Setting the Image type in the Arrow schema metadata allows other libraries and the Hugging Face Dataset Viewer to know that "image" contains images and not just binary data.

## Use Audios

You can load a folder with a metadata file containing a field for the names or paths to the audios, structured like this:

```
Example 1:            Example 2:
folder/               folder/
├── metadata.parquet  ├── metadata.parquet
├── rec000.wav        └── audios
├── rec001.wav            ├── rec000.wav
...                       ...
└── recNNN.wav            └── recNNN.wav
```

You can iterate on the audios paths like this:

```python
from pathlib import Path
import pyarrow as pq

folder_path = Path("path/to/folder")
table = pq.read_table(folder_path + "metadata.parquet")
for file_name in table["file_name"].to_pylist():
    audio_path = folder_path / file_name
    ...
```

Since the dataset is in a [supported structure](https://huggingface.co/docs/hub/en/datasets-audio#additional-columns) (a `metadata.parquet` file with a `file_name` field), you can save it to Hugging Face, and the Hub Dataset Viewer shows both the metadata and audio. 

```python
from huggingface_hub import HfApi
api = HfApi()

api.upload_folder(
    folder_path=folder_path,
    repo_id="username/my_audio_dataset",
    repo_type="dataset",
)
```

### Embed Audios inside Parquet

PyArrow has a binary type which allows to have the audios bytes in Arrow tables. Therefore it enables saving the dataset as one single Parquet file containing both the audios (bytes and path) and the samples metadata:

```python
import pyarrow as pa
import pyarrow.parquet as pq

# Embed the audio bytes in Arrow
audio_array = pa.array([
    {
        "bytes": (folder_path / file_name).read_bytes(),
        "path": file_name,
    }
    for file_name in table["file_name"].to_pylist()
])
table.append_column("audio", audio_array)

# (Optional) Set the HF Audio type for the Dataset Viewer and the `datasets` library
features = {"audio": {"_type": "Audio"}}  # or using datasets.Features(...).to_dict()
schema_metadata = {"huggingface": {"dataset_info": {"features": features}}}
table = table.replace_schema_metadata(schema_metadata)

# Save to Parquet
# (Optional) with use_content_defined_chunking for faster uploads and downloads
# (Optional) with row_group_size to allow loading 100 audios at a time
pq.write_table(table, "data.parquet", use_content_defined_chunking=True, row_group_size=100)
```

Setting the Audio type in the Arrow schema metadata allows other libraries and the Hugging Face Dataset Viewer to know that "audio" contains audios and not just binary data.
