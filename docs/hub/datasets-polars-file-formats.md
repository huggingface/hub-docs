# File formats

Polars supports the following file formats when reading from Hugging Face:

-  [Parquet](parquet)
-  [CSV](CSV)
-  [JSON](JSON)

The examples below show the default settings only. There are various parameters which you can use depending on your use case. View the API reference guide for more information: [Parquet](https://docs.pola.rs/api/python/stable/reference/api/polars.read_parquet.html), [CSV](https://docs.pola.rs/api/python/stable/reference/api/polars.read_csv.html), [JSON](https://docs.pola.rs/api/python/stable/reference/api/polars.read_ndjson.html)

# Parquet

Parquet is the preferred file format as it stores the schema with type information within the file. This avoids any ambiguity with parsing and speeds up reading. To read a parquet file in Polars do the following

```python
pl.read_parquet("hf://datasets/roneneldan/TinyStories/data/train-00000-of-00004-2d5a1467fff1081b.parquet")
```

# CSV

In order to read in a CSV file you can use the `scan_csv` method:

```python
pl.read_csv("hf://datasets/lhoestq/demo1/data/train.csv")
```

# JSON

Polars supports reading in new line delimited JSON also known as [json lines](https://jsonlines.org/) with the `read_ndjson` method:

```python
pl.read_ndjson("hf://datasets/proj-persona/PersonaHub/persona.jsonl")
```

