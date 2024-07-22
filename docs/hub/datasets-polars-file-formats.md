# File formats

Polars supports the following file formats when reading from Hugging Face:

-  [Parquet](https://docs.pola.rs/api/python/stable/reference/api/polars.read_parquet.html)
-  [CSV](https://docs.pola.rs/api/python/stable/reference/api/polars.read_csv.html)
-  [JSON Lines](https://docs.pola.rs/api/python/stable/reference/api/polars.read_ndjson.html)

The examples below show the default settings only. Use the links above to view all available parameters in the API reference guide.

# Parquet

Parquet is the preferred file format as it stores the schema with type information within the file. This avoids any ambiguity with parsing and speeds up reading. To read a Parquet file in Polars, use the `read_parquet` function:

```python
pl.read_parquet("hf://datasets/roneneldan/TinyStories/data/train-00000-of-00004-2d5a1467fff1081b.parquet")
```

# CSV

The `scan_csv` function can be used to read a CSV file:

```python
pl.read_csv("hf://datasets/lhoestq/demo1/data/train.csv")
```

# JSON

Polars supports reading new line delimited JSON — also known as [json lines](https://jsonlines.org/) — with the `read_ndjson` function:

```python
pl.read_ndjson("hf://datasets/proj-persona/PersonaHub/persona.jsonl")
```
