# DuckDB

[DuckDB](https://github.com/duckdb/duckdb) is an in-process SQL [OLAP](https://en.wikipedia.org/wiki/Online_analytical_processing) database management system.
Since it supports [fsspec](https://filesystem-spec.readthedocs.io) to read and write remote data, you can use the Hugging Face paths (`hf://`) to read and write data on the Hub:

First you need to [Login with your Hugging Face account](../huggingface_hub/quick-start#login), for example using:

```
huggingface-cli login
```

Then you can [Create a dataset repository](../huggingface_hub/quick-start#create-a-repository), for example using:

```python
from huggingface_hub import HfApi

HfApi().create_repo(repo_id="username/my_dataset", repo_type="dataset")
```

Finally, you can use Hugging Face paths in DuckDB:

```python
>>> from huggingface_hub import HfFileSystem
>>> import duckdb

>>> fs = HfFileSystem()
>>> duckdb.register_filesystem(fs)
>>> duckdb.sql("COPY tbl TO 'hf://datasets/username/my_dataset/data.parquet' (FORMAT PARQUET);")
```

This creates a file `data.parquet` in the dataset repository `username/my_dataset` containing your dataset in Parquet format.
You can reload it later:

```python
>>> from huggingface_hub import HfFileSystem
>>> import duckdb

>>> fs = HfFileSystem()
>>> duckdb.register_filesystem(fs)
>>> df = duckdb.query("SELECT * FROM 'hf://datasets/username/my_dataset/data.parquet' LIMIT 10;").df()
```
