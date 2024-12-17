# Dask

[Dask](https://github.com/dask/dask) is a parallel and distributed computing library that scales the existing Python and PyData ecosystem.

In particular, we can use Dask DataFrame to scale up pandas workflows. Dask DataFrame parallelizes pandas to handle large tabular data. It closely mirrors the pandas API, making it simple to transition from testing on a single dataset to processing the full dataset. Dask is particularly effective with Parquet, the default format on Hugging Face Datasets, as it supports rich data types, efficient columnar filtering, and compression.

A good practical use case for Dask is running data processing or model inference on a dataset in a distributed manner. See, for example, Coiled's excellent blog post on [Scaling AI-Based Data Processing with Hugging Face + Dask](https://huggingface.co/blog/dask-scaling).

# Read and Write

Since Dask uses [fsspec](https://filesystem-spec.readthedocs.io) to read and write remote data, you can use the Hugging Face paths ([`hf://`](/docs/huggingface_hub/guides/hf_file_system#integrations)) to read and write data on the Hub;

First you need to [Login with your Hugging Face account](/docs/huggingface_hub/quick-start#login), for example using:

```
huggingface-cli login
```

Then you can [Create a dataset repository](/docs/huggingface_hub/quick-start#create-a-repository), for example using:

```python
from huggingface_hub import HfApi

HfApi().create_repo(repo_id="username/my_dataset", repo_type="dataset")
```

Finally, you can use [Hugging Face paths](/docs/huggingface_hub/guides/hf_file_system#integrations) in Dask.
Dask DataFrame supports distributed writing to Parquet on Hugging Face, which uses commits to track dataset changes:

```python
import dask.dataframe as dd

df.to_parquet("hf://datasets/username/my_dataset")

# or write in separate directories if the dataset has train/validation/test splits
df_train.to_parquet("hf://datasets/username/my_dataset/train")
df_valid.to_parquet("hf://datasets/username/my_dataset/validation")
df_test .to_parquet("hf://datasets/username/my_dataset/test")
```

Since this creates one commit per file, it is recommended to squash the history after the upload:

```python
from huggingface_hub import HfApi

HfApi().super_squash_history(repo_id=repo_id, repo_type="dataset")
```

This creates a dataset repository `username/my_dataset` containing your Dask dataset in Parquet format.
You can reload it later:

```python
import dask.dataframe as dd

df = dd.read_parquet("hf://datasets/username/my_dataset")

# or read from separate directories if the dataset has train/validation/test splits
df_train = dd.read_parquet("hf://datasets/username/my_dataset/train")
df_valid = dd.read_parquet("hf://datasets/username/my_dataset/validation")
df_test  = dd.read_parquet("hf://datasets/username/my_dataset/test")
```

For more information on the Hugging Face paths and how they are implemented, please refer to the [the client library's documentation on the HfFileSystem](/docs/huggingface_hub/guides/hf_file_system).

# Process data

To process a dataset in parallel using Dask, you can first define your data processing function for a pandas DataFrame or Series, and then use the Dask `map_partitions` function to apply this function to all the partitions of a dataset in parallel:

```python
def dummy_count_words(texts):
    return pd.Series([len(text.split(" ")) for text in texts])
```

In pandas you can use this function on a text column:

```python
# pandas API
df["num_words"] = dummy_count_words(df.text)
```

And in Dask you can run this function on every partition:

```python
# Dask API: run the function on every partition
df["num_words"] = df.text.map_partitions(dummy_count_words, meta=int)
```

Note that you also need to provide `meta` which is the type of the pandas Series or DataFrame in the output of your function.
This is needed because Dask DataFrame uses a lazy API. Since Dask will only run the data processing once `.compute()` is called, it needs
the `meta` argument to know the type of the new column in the meantime.

# Predicate and Projection Pushdown

When reading Parquet data from Hugging Face, Dask automatically leverages the metadata in Parquet files to skip entire files or row groups if they are not needed. For example if you apply a filter (predicate) on a Hugging Face Dataset in Parquet format or if you select a subset of the columns (projection), Dask will read the metadata of the Paquet files to discard the parts that are not needed without downloading them.

This is possible thanks to the `dask-expr` package which is generally installed by default with Dask.

For example this subset of FineWeb-Edu contains many Parquet files. If you can filter the dataset to keep the text from recent CC dumps, Dask will skip most of the files and only download the data that match the filter:

```python
import dask.dataframe as dd

df = dd.read_parquet("hf://datasets/HuggingFaceFW/fineweb-edu/sample/10BT/*.parquet")

# Dask will skip the files or row groups that don't
# match the query without downloading them.
df = df[df.dump >= "CC-MAIN-2023"]
```

Dask will also read only the required columns for your computation and skip the rest. This is useful when you want to manipulate a subset of the columns or for analytics:

```python
# Dask will download the 'dump' and 'token_count' needed
# for the computation and skip the other columns.
df.token_count.mean().compute()
```
