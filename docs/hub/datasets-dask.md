# Dask

[Dask](https://github.com/dask/dask) is a parallel and distributed computing library that scales the existing Python and PyData ecosystem.
Since it uses [fsspec](https://filesystem-spec.readthedocs.io) to read and write remote data, you can use the Hugging Face paths (`hf://`) to read and write data on the Hub:

First you need to [Login with your Hugging Face account](../huggingface_hub/quick-start#login), for example using:

```
huggingface-cli login
```

And then you can use Hugging Face paths in Dask:

```python
import dask.dataframe as dd

df.write_parquet("hf://datasets/username/my_dataset")

# or write in separate directories if the dataset has train/validation/test splits
df_train.write_parquet("hf://datasets/username/my_dataset/train")
df_valid.write_parquet("hf://datasets/username/my_dataset/validation")
df_test .write_parquet("hf://datasets/username/my_dataset/test")
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

To have more information on the Hugging Face paths and how they are implemented, please refer to the [the client library's documentation on the HfFileSystem](https://huggingface.co/docs/huggingface_hub/guides/hf_file_system).
