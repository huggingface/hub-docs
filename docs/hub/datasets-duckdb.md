# DuckDB

[DuckDB](https://github.com/duckdb/duckdb) is an in-process SQL [OLAP](https://en.wikipedia.org/wiki/Online_analytical_processing) database management system.
You can use the Hugging Face paths (`hf://`) to access data on the Hub, or an Iceberg Datasets Catalog.

The [DuckDB CLI](https://duckdb.org/docs/api/cli/overview.html) (Command Line Interface) is a single, dependency-free executable. 
There are also other APIs available for running DuckDB, including Python, C++, Go, Java, Rust, and more. For additional details, visit their [clients](https://duckdb.org/docs/api/overview.html) page.

> [!TIP]
> For installation details, visit the [installation page](https://duckdb.org/docs/installation).

Starting from version `v0.10.3`, the DuckDB CLI includes native support for accessing datasets on the Hugging Face Hub via URLs with the `hf://` scheme. Here are some features you can leverage with this powerful tool:

- Query public datasets and your own gated and private datasets
- Analyze datasets and perform SQL operations
- Combine datasets and export it to different formats
- Conduct vector similarity search on embedding datasets
- Implement full-text search on datasets
- Use an Iceberg Datasets Catalog

For a complete list of DuckDB features, visit the DuckDB [documentation](https://duckdb.org/docs/).

## Authentication

To access gated and private datasets, login to Hugging Face with:

```bash
hf auth login
```

Then in DuckDB, load the hf_token with this command:

```sql
CREATE SECRET hf_token (TYPE HUGGINGFACE, PROVIDER credential_chain);
```

See more details on authentication in the [DuckDB authentication documentation for Hugging face](./datasets-duckdb-auth).

## Querying files on Hugging Face

To access Hugging Face datasets, use the following URL format:

```plaintext
hf://datasets/{my-username}/{my-dataset}/{path_to_file} 
```

- **my-username**, the user or organization of the dataset, e.g. `stanfordnlp`
- **my-dataset**, the dataset name, e.g: `imdb`
- **path_to_parquet_file**, the parquet file path which supports glob patterns, e.g `**/*.parquet`, to query all parquet files


For example, to query the train split of the [stanfordnlp/imdb](https://huggingface.co/datasets/stanfordnlp/imdb) dataset:

```sql
SELECT * FROM 'hf://datasets/stanfordnlp/imdb/**/train-*.parquet' LIMIT 10;
```

Which returns:

```
┌──────────────────────────────────────────────────────────────────────┬───────┐
│                                 text                                 │ label │
│                               varchar                                │ int64 │
├──────────────────────────────────────────────────────────────────────┼───────┤
│ I rented I AM CURIOUS-YELLOW from my video store because of all th…  │     0 │
│ "I Am Curious: Yellow" is a risible and pretentious steaming pile.…  │     0 │
│ If only to avoid making this type of film in the future. This film…  │     0 │
│ This film was probably inspired by Godard's Masculin, féminin and …  │     0 │
│ Oh, brother...after hearing about this ridiculous film for umpteen…  │     0 │
│ I would put this at the top of my list of films in the category of…  │     0 │
│ Whoever wrote the screenplay for this movie obviously never consul…  │     0 │
│ When I first saw a glimpse of this movie, I quickly noticed the ac…  │     0 │
│ Who are these "They"- the actors? the filmmakers? Certainly couldn…  │     0 │
│ This is said to be a personal film for Peter Bogdonavitch. He base…  │     0 │
├──────────────────────────────────────────────────────────────────────┴───────┤
│ 10 rows                                                            2 columns │
└──────────────────────────────────────────────────────────────────────────────┘
```

## Query an Iceberg Datasets Catalog

Use the PyIceberg library `faceberg` to deploy an Iceberg catalog you can use to query datasets on Huggging Face using an easy syntax.

In particular you can query datasets as `faceberg.namespace.dataset_name` instead of having to pass a file pattern, and it automatically adds a `split` column to differentiate between train/test/validation splits.

For example, to query the [stanfordnlp/imdb](https://huggingface.co/datasets/stanfordnlp/imdb) dataset:

```sql
SELECT * FROM faceberg.stanfordnlp.imdb LIMIT 10;
```

```
┌─────────┬────────────────────────────────────────────────────────────┬───────┐
│  split  │                            text                            │ label │
│ varchar │                          varchar                           │ int64 │
├─────────┼────────────────────────────────────────────────────────────┼───────┤
│ train   │ I rented I AM CURIOUS-YELLOW from my video store because…  │     0 │
│ train   │ "I Am Curious: Yellow" is a risible and pretentious stea…  │     0 │
│ train   │ If only to avoid making this type of film in the future.…  │     0 │
│ train   │ This film was probably inspired by Godard's Masculin, fé…  │     0 │
│ train   │ Oh, brother...after hearing about this ridiculous film f…  │     0 │
│ train   │ I would put this at the top of my list of films in the c…  │     0 │
│ train   │ Whoever wrote the screenplay for this movie obviously ne…  │     0 │
│ train   │ When I first saw a glimpse of this movie, I quickly noti…  │     0 │
│ train   │ Who are these "They"- the actors? the filmmakers? Certai…  │     0 │
│ train   │ This is said to be a personal film for Peter Bogdonavitc…  │     0 │
├─────────┴────────────────────────────────────────────────────────────┴───────┤
│ 10 rows                                                            3 columns │
└──────────────────────────────────────────────────────────────────────────────┘
```

And you can simply filter by split like this:


```sql
SELECT * FROM faceberg.stanfordnlp.imdb WHERE split = 'test' LIMIT 10;
```

```
┌─────────┬────────────────────────────────────────────────────────────┬───────┐
│  split  │                            text                            │ label │
│ varchar │                          varchar                           │ int64 │
├─────────┼────────────────────────────────────────────────────────────┼───────┤
│ test    │ I love sci-fi and am willing to put up with a lot. Sci-f…  │     0 │
│ test    │ Worth the entertainment value of a rental, especially if…  │     0 │
│ test    │ its a totally average film with a few semi-alright actio…  │     0 │
│ test    │ STAR RATING: ***** Saturday Night **** Friday Night *** …  │     0 │
│ test    │ First off let me say, If you haven't enjoyed a Van Damme…  │     0 │
│ test    │ I had high hopes for this one until they changed the nam…  │     0 │
│ test    │ Isaac Florentine has made some of the best western Marti…  │     0 │
│ test    │ It actually pains me to say it, but this movie was horri…  │     0 │
│ test    │ Technically I'am a Van Damme Fan, or I was. this movie i…  │     0 │
│ test    │ Honestly awful film, bad editing, awful lighting, dire d…  │     0 │
├─────────┴────────────────────────────────────────────────────────────┴───────┤
│ 10 rows                                                            3 columns │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Create a catalog on HuggingFace Hub

To deploy an Iceberg Datasets catalog, run `pip install faceberg` and run this command using your own Hugging Face username instead of "user":

```bash
faceberg user/mycatalog init
```

### Add datasets

Once your catalog is ready, add datasets using the following command:

```bash
faceberg user/mycatalog add stanfordnlp/imdb
faceberg user/mycatalog add openai/gsm8k --config main
```

### Query with interactive DuckDB shell

`faceberg` comes with an builtin DuckDB shell you can run like this:

```bash
faceberg user/mycatalog quack
```

```sql
SELECT label, substr(text, 1, 100) as preview
FROM faceberg.stanfordnlp.imdb
LIMIT 10;
```

Alternatively DuckDB shell is also available in the catalog's web interface:

<div class="flex justify-center">
    <img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-faceberg-space-imdb-sql-min.png"/>
</div>

### More information

Find more information on `faceberg` and the PyIceberg integration with the Hugging Face Hub in the [documentation](./datasets-pyiceberg).


## Auto-converted Parquet files

You can query auto-converted Parquet files using the @~parquet branch, which corresponds to the `refs/convert/parquet` revision. For more details, refer to the documentation at https://huggingface.co/docs/datasets-server/en/parquet#conversion-to-parquet:


<div class="flex justify-center">
    <img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/duckdb_hf_url.png"/>
</div>

To reference the `refs/convert/parquet` revision of a dataset, use the following syntax:

```plaintext
hf://datasets/{my-username}/{my-dataset}@~parquet/{path_to_file} 
```

Here is a sample URL following the above syntax for the [fka/prompts.chat](https://huggingface.co/datasets/fka/prompts.chat) dataset to a file in its [Parquet branch](https://huggingface.co/datasets/fka/prompts.chat/tree/refs%2Fconvert%2Fparquet):

```plaintext
hf://datasets/fka/prompts.chat@~parquet/default/train/0000.parquet
```

In the following sections, we will cover more complex operations you can perform with DuckDB on Hugging Face datasets.

## Use-cases and examples

Find more use-cases and examples with Hugging Face Datasets here:

* [Query datasets](./datasets-duckdb-select.md)
* [Perform SQL operations](./datasets-duckdb-sql)
* [Combine datasets and export](./datasets-duckdb-combine-and-export.md)
* [Perform vector similarity search](./datasets-duckdb-vector-similarity-search.md)
