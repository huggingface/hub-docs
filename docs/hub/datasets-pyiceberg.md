# PyIceberg

PyIceberg is a Python implementation for accessing Iceberg tables.

You can use the PyIceberg library `faceberg` to deploy an Iceberg Datasets catalog and add datasets from the Hugging Face Hub.

Once your catalog is ready, use your favorite Iceberg client to query datasets in your catalog.
For example: run SQL queries to explore datasets, do analytics, mix datasets together, or run large processing jobs.

## Set up

### Installation

To be able to add Hugging Face Datasets to a catalog, you need to install the `faceberg` library:

```
pip install faceberg
```

This will also install required dependencies like `huggingface_hub` for authentication, and `datasets` for metadata discovery.

### Authentication

You need to authenticate to Hugging Face to read private/gated dataset repositories or to write to your dataset repositories.

You can use the CLI for example:

```
hf auth login
```

It's also possible to provide your Hugging Face token with the `HF_TOKEN` environment variable or passing the `token` option to the reader.
For more details about authentication, check out [this guide](https://huggingface.co/docs/huggingface_hub/quick-start#authentication).

## Deploy a Datasets Catalog

Use `faceberg <username>/catalog-name> init` to deploy an Iceberg Datasets Catalog under your account on Hugging Face Spaces (free !)

```bash
faceberg username/my-catalog init
```

This command will show you the created catalog information and some helpful commands:

```
🤗🧊 Catalog: hf://spaces/username/my-catalog

Initializing remote catalog: hf://spaces/username/my-catalog
✓ Catalog initialized successfully!

Space URL: https://username-my-catalog.hf.space
Repository: https://huggingface.co/spaces/username/my-catalog

Next steps:
  • Run faceberg add <dataset> to add tables
  • Run faceberg sync to sync tables from datasets
  • Use faceberg scan <table> to view sample data
  • Run faceberg serve to start the REST catalog server
  • Run faceberg quack to open DuckDB with the catalog
```

In particular, note the Space URL that ends with `.hf.space`.
It is your catalog uri for iceberg clients, and also the web interface you can open in your browser:

<div class="flex justify-center">
    <img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-faceberg-space-empty-min.png"/>
</div>

Alternatively, deploy a catalog locally using using `"/path/to/catalog"` or `"file:///path/to/catalog"` instead of a Space repository name.

## Add a dataset

The `faceberg` command line makes it easy to add datasets from Hugging Face to an Iceberg catalog.

This is compatible with all the dataset in [supported format](https://huggingface.co/docs/hub/datasets-adding#file-formats) on Hugging Face.
Under the hood, the catalog points to the dataset's Parquet files.

For example here is how to load the [stanfordnlp/imdb](https://huggingface.co/stanfordnlp/imdb) dataset and the `faceberg add` command:

```bash
faceberg username/my-catalog add stanfordnlp/imdb
```

which shows:

```
🤗🧊 Catalog: hf://spaces/username/my-catalog

Adding dataset: stanfordnlp/imdb
Table identifier: stanfordnlp.imdb

stanfordnlp.imdb ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% • Complete

✓ Added stanfordnlp.imdb to catalog
  Dataset: stanfordnlp/imdb
  Location: hf://spaces/username/my-catalog/stanfordnlp/imdb/metadata/v1.metadata.json

Table schema:
imdb(
  1: split: optional string,
  2: text: optional string,
  3: label: optional long
),
partition by: [split],
sort order: [],
snapshot: Operation.APPEND: id=1, schema_id=0
```

<div class="flex justify-center">
    <img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-faceberg-space-imdb-min.png"/>
</div>

> [!TIP]
> On Hugging Face, datasets that are not in Parquet format are automatically converted to Parquet in a separate git branch `refs/convert/parquet`.
> Therefore it is possible to add to an Iceberg catalog a dataset that is not originally in Parquet.

Here is another example with the [BAAI/Infinity-Instruct](https://huggingface.co/datasets/BAAI/Infinity-Instruct) dataset.
It is a gated repository, users have to accept the terms of use before accessing it.
It also has multiple subsets, namely, "3M" and "7M". So we need to specify which one to load.

```bash
faceberg username/my-catalog add BAAI/Infinity-Instruct --config 7M
```

<div class="flex justify-center">
    <img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-faceberg-space-infinity-instruct-7m-min.png"/>
</div>

## Load a dataset table

### Using `faceberg`

Use the `faceberg` to get the PyIceberg catalog in python, and `.load_table()` to load the dataset table (more precisely the config or subset named "7M" containing 7M samples). Here is how to compute the number of dialogue per language and filter the dataset.

After logging-in to access the gated dataset, you can run:

```python
>>> import faceberg
>>> catalog = faceberg.catalog("username/my-catalog")
>>> table = catalog.load_table("BAAI.Infinity-Instruct")
>>> table.scan(limit=5).to_pandas()
Out[9]: 
   split  id                                      conversations                                              label langdetect          source     reward
0  train   0  [{'from': 'human', 'value': 'def extinguish_fi...  {'ability_en': ['programming ability'], 'abili...         en  code_exercises   3.718750
1  train   1  [{'from': 'human', 'value': 'See the multi-cho...  {'ability_en': ['logical reasoning'], 'ability...         en            flan  -3.359375
2  train   2  [{'from': 'human', 'value': 'This is some data...  {'ability_en': ['geographic knowledge', 'text ...         en            flan  -1.171875
3  train   3  [{'from': 'human', 'value': 'If you don't want...  {'ability_en': ['logical reasoning'], 'ability...         en            flan -12.187500
4  train   4  [{'from': 'human', 'value': 'In a United State...  {'ability_en': ['text understanding', 'informa...         en            flan  12.687500
```

### Using `pyiceberg`

Here is how to instantiate the catalog using native PyIceberg.
The catalog is a REST catalog so we use `pyiceberg.catalog.rest.RestCatalog`.

The uri of the catalog is the Space HTTP URL that ends with `.hf.space`, and the warehouse property should point to the Space repository on Hugging face, which contains the metadata files of the iceberg tables:

```python
>>> from pyiceberg.catalog.rest import RestCatalog
>>> properties = {
...     "uri": "https://username-my-catalog.hf.space",
...     "warehouse": "hf://spaces/username/my-catalog",
... }
>>> catalog = RestCatalog("username/my-catalog", **properties)
>>> table = catalog.load_table("BAAI.Infinity-Instruct")
```

## Run SQL queries

Once you have your PyIceberg table ready, you can run SQL queries from the catalog Space:

<div class="flex justify-center">
    <img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-faceberg-space-imdb-sql-min.png"/>
</div>

## Use other Iceberg clients

Access datasets via your Iceberg Datasets Catalog via other clients:

* **DuckDB** to run SQL, see the [documentation](./datasets-duckdb-iceberg)
* **Pandas** for easy dataframe processing, see the [documentation](./datasets-pandas-iceberg)

More generally, any client that supports REST catalogs and `hf://` URIs can now use access your Iceberg Datasets Catalog.
In addition to native support in DuckDB, `hf://` URIs are also supported in any `fsspec`-based client in Python and in any `object_store_opendal`-based client in Rust.
