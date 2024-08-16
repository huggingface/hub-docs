# Query datasets

Querying datasets is a fundamental step in data analysis. Here, we'll guide you through querying datasets using various methods.

There are [several ways](https://duckdb.org/docs/data/parquet/overview.html) to select your data.

Using the `FROM` syntax:
```bash
FROM 'hf://datasets/jamescalam/world-cities-geo/train.jsonl' SELECT city, country, region LIMIT 3;

┌────────────────┬─────────────┬───────────────┐
│      city      │   country   │    region     │
│    varchar     │   varchar   │    varchar    │
├────────────────┼─────────────┼───────────────┤
│ Kabul          │ Afghanistan │ Southern Asia │
│ Kandahar       │ Afghanistan │ Southern Asia │
│ Mazar-e Sharif │ Afghanistan │ Southern Asia │
└────────────────┴─────────────┴───────────────┘

```

Using the `SELECT` and `FROM` syntax:

```bash
SELECT city, country, region FROM 'hf://datasets/jamescalam/world-cities-geo/train.jsonl' USING SAMPLE 3;

┌──────────┬─────────┬────────────────┐
│   city   │ country │     region     │
│ varchar  │ varchar │    varchar     │
├──────────┼─────────┼────────────────┤
│ Wenzhou  │ China   │ Eastern Asia   │
│ Valdez   │ Ecuador │ South America  │
│ Aplahoue │ Benin   │ Western Africa │
└──────────┴─────────┴────────────────┘

```

Count all JSONL files matching a glob pattern:

```bash
SELECT COUNT(*) FROM 'hf://datasets/jamescalam/world-cities-geo/*.jsonl';

┌──────────────┐
│ count_star() │
│    int64     │
├──────────────┤
│         9083 │
└──────────────┘

```

You can also query Parquet files using the `read_parquet` function (or its alias `parquet_scan`). This function, along with other [parameters](https://duckdb.org/docs/data/parquet/overview.html#parameters), provides flexibility in handling Parquet files specially if they dont have a `.parquet` extension. Let's explore these functions using the auto-converted Parquet files from the same dataset.

Select using [read_parquet](https://duckdb.org/docs/guides/file_formats/query_parquet.html) function:

```bash
SELECT * FROM read_parquet('hf://datasets/jamescalam/world-cities-geo@~parquet/default/**/*.parquet') LIMIT 3;

┌────────────────┬─────────────┬───────────────┬───────────┬────────────┬────────────┬────────────────────┬───────────────────┬────────────────────┐
│      city      │   country   │    region     │ continent │  latitude  │ longitude  │         x          │         y         │         z          │
│    varchar     │   varchar   │    varchar    │  varchar  │   double   │   double   │       double       │      double       │       double       │
├────────────────┼─────────────┼───────────────┼───────────┼────────────┼────────────┼────────────────────┼───────────────────┼────────────────────┤
│ Kabul          │ Afghanistan │ Southern Asia │ Asia      │ 34.5166667 │ 69.1833344 │  1865.546409629258 │ 4906.785732164055 │ 3610.1012966606136 │
│ Kandahar       │ Afghanistan │ Southern Asia │ Asia      │      31.61 │ 65.6999969 │  2232.782351694877 │ 4945.064042683584 │  3339.261233224765 │
│ Mazar-e Sharif │ Afghanistan │ Southern Asia │ Asia      │ 36.7069444 │ 67.1122208 │ 1986.5057687360124 │  4705.51748048584 │  3808.088900172991 │
└────────────────┴─────────────┴───────────────┴───────────┴────────────┴────────────┴────────────────────┴───────────────────┴────────────────────┘

```

Read all files that match a glob pattern and include a filename column specifying which file each row came from:

```bash
SELECT city, country, filename FROM read_parquet('hf://datasets/jamescalam/world-cities-geo@~parquet/default/**/*.parquet', filename = true) LIMIT 3;

┌────────────────┬─────────────┬───────────────────────────────────────────────────────────────────────────────┐
│      city      │   country   │                                   filename                                    │
│    varchar     │   varchar   │                                    varchar                                    │
├────────────────┼─────────────┼───────────────────────────────────────────────────────────────────────────────┤
│ Kabul          │ Afghanistan │ hf://datasets/jamescalam/world-cities-geo@~parquet/default/train/0000.parquet │
│ Kandahar       │ Afghanistan │ hf://datasets/jamescalam/world-cities-geo@~parquet/default/train/0000.parquet │
│ Mazar-e Sharif │ Afghanistan │ hf://datasets/jamescalam/world-cities-geo@~parquet/default/train/0000.parquet │
└────────────────┴─────────────┴───────────────────────────────────────────────────────────────────────────────┘

```

## Get metadata and schema

The [parquet_metadata](https://duckdb.org/docs/data/parquet/metadata.html) function can be used to query the metadata contained within a Parquet file.

```bash
SELECT * FROM parquet_metadata('hf://datasets/jamescalam/world-cities-geo@~parquet/default/train/0000.parquet');

┌───────────────────────────────────────────────────────────────────────────────┬──────────────┬────────────────────┬─────────────┐
│                                   file_name                                   │ row_group_id │ row_group_num_rows │ compression │
│                                    varchar                                    │    int64     │       int64        │   varchar   │
├───────────────────────────────────────────────────────────────────────────────┼──────────────┼────────────────────┼─────────────┤
│ hf://datasets/jamescalam/world-cities-geo@~parquet/default/train/0000.parquet │            0 │               1000 │ SNAPPY      │
│ hf://datasets/jamescalam/world-cities-geo@~parquet/default/train/0000.parquet │            0 │               1000 │ SNAPPY      │
│ hf://datasets/jamescalam/world-cities-geo@~parquet/default/train/0000.parquet │            0 │               1000 │ SNAPPY      │
└───────────────────────────────────────────────────────────────────────────────┴──────────────┴────────────────────┴─────────────┘

```

Fetch the column names and column types:

```bash
DESCRIBE SELECT * FROM 'hf://datasets/jamescalam/world-cities-geo@~parquet/default/train/0000.parquet';

┌─────────────┬─────────────┬─────────┬─────────┬─────────┬─────────┐
│ column_name │ column_type │  null   │   key   │ default │  extra  │
│   varchar   │   varchar   │ varchar │ varchar │ varchar │ varchar │
├─────────────┼─────────────┼─────────┼─────────┼─────────┼─────────┤
│ city        │ VARCHAR     │ YES     │         │         │         │
│ country     │ VARCHAR     │ YES     │         │         │         │
│ region      │ VARCHAR     │ YES     │         │         │         │
│ continent   │ VARCHAR     │ YES     │         │         │         │
│ latitude    │ DOUBLE      │ YES     │         │         │         │
│ longitude   │ DOUBLE      │ YES     │         │         │         │
│ x           │ DOUBLE      │ YES     │         │         │         │
│ y           │ DOUBLE      │ YES     │         │         │         │
│ z           │ DOUBLE      │ YES     │         │         │         │
└─────────────┴─────────────┴─────────┴─────────┴─────────┴─────────┘

```

Fetch the internal schema (excluding the file name):

```bash
SELECT * EXCLUDE (file_name) FROM parquet_schema('hf://datasets/jamescalam/world-cities-geo@~parquet/default/train/0000.parquet');

┌───────────┬────────────┬─────────────┬─────────────────┬──────────────┬────────────────┬───────┬───────────┬──────────┬──────────────┐
│   name    │    type    │ type_length │ repetition_type │ num_children │ converted_type │ scale │ precision │ field_id │ logical_type │
│  varchar  │  varchar   │   varchar   │     varchar     │    int64     │    varchar     │ int64 │   int64   │  int64   │   varchar    │
├───────────┼────────────┼─────────────┼─────────────────┼──────────────┼────────────────┼───────┼───────────┼──────────┼──────────────┤
│ schema    │            │             │ REQUIRED        │            9 │                │       │           │          │              │
│ city      │ BYTE_ARRAY │             │ OPTIONAL        │              │ UTF8           │       │           │          │ StringType() │
│ country   │ BYTE_ARRAY │             │ OPTIONAL        │              │ UTF8           │       │           │          │ StringType() │
│ region    │ BYTE_ARRAY │             │ OPTIONAL        │              │ UTF8           │       │           │          │ StringType() │
│ continent │ BYTE_ARRAY │             │ OPTIONAL        │              │ UTF8           │       │           │          │ StringType() │
│ latitude  │ DOUBLE     │             │ OPTIONAL        │              │                │       │           │          │              │
│ longitude │ DOUBLE     │             │ OPTIONAL        │              │                │       │           │          │              │
│ x         │ DOUBLE     │             │ OPTIONAL        │              │                │       │           │          │              │
│ y         │ DOUBLE     │             │ OPTIONAL        │              │                │       │           │          │              │
│ z         │ DOUBLE     │             │ OPTIONAL        │              │                │       │           │          │              │
├───────────┴────────────┴─────────────┴─────────────────┴──────────────┴────────────────┴───────┴───────────┴──────────┴──────────────┤

```

## Get statistics

The `SUMMARIZE` command can be used to get various aggregates over a query (min, max, approx_unique, avg, std, q25, q50, q75, count). It returns these statistics along with the column name, column type, and the percentage of NULL values.

```bash
SUMMARIZE SELECT latitude, longitude FROM 'hf://datasets/jamescalam/world-cities-geo@~parquet/default/train/0000.parquet';

┌─────────────┬─────────────┬──────────────┬─────────────┬───────────────┬────────────────────┬────────────────────┬────────────────────┬────────────────────┬────────────────────┬───────┬─────────────────┐
│ column_name │ column_type │     min      │     max     │ approx_unique │        avg         │        std         │        q25         │        q50         │        q75         │ count │ null_percentage │
│   varchar   │   varchar   │   varchar    │   varchar   │     int64     │      varchar       │      varchar       │      varchar       │      varchar       │      varchar       │ int64 │  decimal(9,2)   │
├─────────────┼─────────────┼──────────────┼─────────────┼───────────────┼────────────────────┼────────────────────┼────────────────────┼────────────────────┼────────────────────┼───────┼─────────────────┤
│ latitude    │ DOUBLE      │ -54.8        │ 67.8557214  │          7324 │ 22.5004568364307   │ 26.770454684690925 │ 6.089858461951687  │ 29.321258648324747 │ 44.90191158328915  │  9083 │            0.00 │
│ longitude   │ DOUBLE      │ -175.2166595 │ 179.3833313 │          7802 │ 14.699333721953098 │ 63.93672742608224  │ -6.877990418604821 │ 19.12963979385393  │ 43.873513093419966 │  9083 │            0.00 │
└─────────────┴─────────────┴──────────────┴─────────────┴───────────────┴────────────────────┴────────────────────┴────────────────────┴────────────────────┴────────────────────┴───────┴─────────────────┘

```
