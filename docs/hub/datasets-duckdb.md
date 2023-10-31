# DuckDB

[DuckDB](https://github.com/duckdb/duckdb) is an in-process SQL OLAP database management system.
Since it supports [fsspec](https://filesystem-spec.readthedocs.io) to read and write remote data, you can use the Hugging Face paths (`hf://`) to read and write data on the Hub:

First login using 

```
huggingface-cli login
```

And then you can use Hugging Face paths in DuckDB:

```python
>>> from huggingface_hub import HfFileSystem
>>> import duckdb

>>> fs = HfFileSystem()
>>> duckdb.register_filesystem(fs)
>>> df = duckdb.query(f"SELECT * FROM 'hf://datasets/username/my_dataset/data.parquet' LIMIT 10").df()
```
