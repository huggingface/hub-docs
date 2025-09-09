# Daft

[Daft](https://daft.ai/) is a high-performance data engine providing simple and reliable data processing for any modality and scale. Daft has native support for reading from and writing to Hugging Face datasets.

<div class="flex justify-center">
<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/daft_hf.png"/>
</div>


## Getting Started

To get started, pip install `daft` with the `huggingface` feature:

```bash
pip install 'daft[hugggingface]'
```

## Read

Daft is able to read datasets directly from the Hugging Face Hub using the [`daft.read_huggingface()`](https://docs.daft.ai/en/stable/api/io/#daft.read_huggingface) function or via the `hf://datasets/` protocol.

### Reading an Entire Dataset

Using [`daft.read_huggingface()`](https://docs.daft.ai/en/stable/api/io/#daft.read_huggingface), you can easily load a dataset.


```python
import daft

df = daft.read_huggingface("username/dataset_name")
```

This will read the entire dataset into a DataFrame.

### Reading Specific Files

Not only can you read entire datasets, but you can also read individual files from a dataset repository. Using a read function that takes in a path (such as [`daft.read_parquet()`](https://docs.daft.ai/en/stable/api/io/#daft.read_parquet), [`daft.read_csv()`](https://docs.daft.ai/en/stable/api/io/#daft.read_csv), or [`daft.read_json()`](https://docs.daft.ai/en/stable/api/io/#daft.read_json)), specify a Hugging Face dataset path via the `hf://datasets/` prefix:

```python
import daft

# read a specific Parquet file
df = daft.read_parquet("hf://datasets/username/dataset_name/file_name.parquet")

# or a csv file
df = daft.read_csv("hf://datasets/username/dataset_name/file_name.csv")

# or a set of Parquet files using a glob pattern
df = daft.read_parquet("hf://datasets/username/dataset_name/**/*.parquet")
```

## Write

Daft is able to write Parquet files to a Hugging Face dataset repository using [`daft.DataFrame.write_huggingface`](https://docs.daft.ai/en/stable/api/dataframe/#daft.DataFrame.write_deltalake). Daft supports [Content-Defined Chunking](https://huggingface.co/blog/parquet-cdc) and [Xet](https://huggingface.co/blog/xet-on-the-hub) for faster, deduplicated writes.

Basic usage:

```python
import daft

df: daft.DataFrame = ...

df.write_huggingface("username/dataset_name")
```

See the [`DataFrame.write_huggingface`](https://docs.daft.ai/en/stable/api/dataframe/#daft.DataFrame.write_huggingface) API page for more info.

## Authentication

The `token` parameter in [`daft.io.HuggingFaceConfig`](https://docs.daft.ai/en/stable/api/config/#daft.io.HuggingFaceConfig) can be used to specify a Hugging Face access token for requests that require authentication (e.g. reading private dataset repositories or writing to a dataset repository).

Example of loading a dataset with a specified token:

```python
from daft.io import IOConfig, HuggingFaceConfig

io_config = IOConfig(hf=HuggingFaceConfig(token="your_token"))
df = daft.read_parquet("hf://datasets/username/dataset_name", io_config=io_config)
```
