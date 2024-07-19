# Transforming your dataset

On this page we'll guide you through some of the most common operations used when doing data analysis. This is only a small subsection of what is possible in Polars, for more information please visit the [Documentation](https://docs.pola.rs/).

For the example we will use the [Danbooru](https://huggingface.co/datasets/KBlueLeaf/danbooru2023-metadata-database) dataset. Danbooru is a large-scale anime image dataset with over 5 million images contributed and annotated in detail by an enthusiast community. Image tags cover aspects like characters, scenes, copyrights, artists, etc with an average of 30 tags per image.

## Reading

```
df = pl.read_parquet("hf://datasets/KBlueLeaf/danbooru2023-metadata-database/parquet/post.parquet")
df.head(3)
```

```bash
┌─────┬────────────┬────────────┬────────────┬───┬────────────┬────────────┬───────────┬───────────┐
│ id  ┆ created_at ┆ uploader_i ┆ source     ┆ … ┆ file_url   ┆ large_file ┆ preview_f ┆ updated_a │
│ --- ┆ ---        ┆ d          ┆ ---        ┆   ┆ ---        ┆ _url       ┆ ile_url   ┆ t         │
│ i64 ┆ str        ┆ ---        ┆ str        ┆   ┆ str        ┆ ---        ┆ ---       ┆ ---       │
│     ┆            ┆ i64        ┆            ┆   ┆            ┆ str        ┆ str       ┆ str       │
╞═════╪════════════╪════════════╪════════════╪═══╪════════════╪════════════╪═══════════╪═══════════╡
│ 1   ┆ 2005-05-23 ┆ 1          ┆ http://www ┆ … ┆ https://cd ┆ https://cd ┆ https://c ┆ 2024-02-2 │
│     ┆ T23:35:31. ┆            ┆ .biwa.ne.j ┆   ┆ n.donmai.u ┆ n.donmai.u ┆ dn.donmai ┆ 3T23:16:2 │
│     ┆ 000-04:00  ┆            ┆ p/~kyogoku ┆   ┆ s/original ┆ s/original ┆ .us/180x1 ┆ 3.261-05: │
│     ┆            ┆            ┆ …          ┆   ┆ …          ┆ …          ┆ 80/…      ┆ 00        │
│ 2   ┆ 2005-05-23 ┆ 1          ┆ http://pag ┆ … ┆ https://cd ┆ https://cd ┆ https://c ┆ 2023-05-2 │
│     ┆ T23:37:30. ┆            ┆ e.freett.c ┆   ┆ n.donmai.u ┆ n.donmai.u ┆ dn.donmai ┆ 7T21:04:5 │
│     ┆ 000-04:00  ┆            ┆ om/tyuyan/ ┆   ┆ s/original ┆ s/original ┆ .us/180x1 ┆ 0.554-04: │
│     ┆            ┆            ┆ …          ┆   ┆ …          ┆ …          ┆ 80/…      ┆ 00        │
│ 3   ┆ 2005-05-23 ┆ 1          ┆ http://pag ┆ … ┆ https://cd ┆ https://cd ┆ https://c ┆ 2023-12-0 │
│     ┆ T23:38:05. ┆            ┆ e.freett.c ┆   ┆ n.donmai.u ┆ n.donmai.u ┆ dn.donmai ┆ 5T08:21:0 │
│     ┆ 000-04:00  ┆            ┆ om/tyuyan/ ┆   ┆ s/original ┆ s/original ┆ .us/180x1 ┆ 8.958-05: │
│     ┆            ┆            ┆ …          ┆   ┆ …          ┆ …          ┆ 80/…      ┆ 00        │
└─────┴────────────┴────────────┴────────────┴───┴────────────┴────────────┴───────────┴───────────┘
```

## Selecting columns

The dataset contains quite a number of columns in order to make the output more managable in the guide, we will select a number of columns:

```
df = df.select(["id","uploader_id","source","file_url","score"])
```

```bash
┌─────┬─────────────┬─────────────────────────────────┬─────────────────────────────────┬───────┐
│ id  ┆ uploader_id ┆ source                          ┆ file_url                        ┆ score │
│ --- ┆ ---         ┆ ---                             ┆ ---                             ┆ ---   │
│ i64 ┆ i64         ┆ str                             ┆ str                             ┆ i64   │
╞═════╪═════════════╪═════════════════════════════════╪═════════════════════════════════╪═══════╡
│ 1   ┆ 1           ┆ http://www.biwa.ne.jp/~kyogoku… ┆ https://cdn.donmai.us/original… ┆ 685   │
│ 2   ┆ 1           ┆ http://page.freett.com/tyuyan/… ┆ https://cdn.donmai.us/original… ┆ 13    │
│ 3   ┆ 1           ┆ http://page.freett.com/tyuyan/… ┆ https://cdn.donmai.us/original… ┆ 31    │
└─────┴─────────────┴─────────────────────────────────┴─────────────────────────────────┴───────┘
```

## Filtering

We can filter the dataset using `.filter(..)` within a filter you can put complex expressions but let us start of easy. To filter based on the source of the image use the following:

```python
df.filter(pl.col("source").str.contains("archive.org"))
```

You can combine multiple filters with `&` or '|' operators:

```python
df.filter(pl.col("source").str.contains("archive.org") | (pl.col("uploader_id") > 1000))
```

## Transforming

In order to add new columns to the dataset use `with_columns`. In the example below we look at the `source` column to determine if the traffic is encrypted and add a new column called `is_https_url` with the `alias` method. The entire statement within `with_columns` is called an expression. To read more about expressions and how to use them in the Polars [User Guide](https://docs.pola.rs/user-guide/expressions/)

```python
df.with_columns(pl.col("source").str.starts_with("https").alias("is_https_url"))
```

## Aggregation & Sorting

In order to aggregate data together you can use the `group_by`, `agg` and `sort` methods:

```python
df.group_by("uploader_id").agg(pl.len().alias("number_of_uploads")).sort("number_of_uploads",descending=True)
```

```bash
┌─────────────┬───────────────────┐
│ uploader_id ┆ number_of_uploads │
│ ---         ┆ ---               │
│ i64         ┆ u32               │
╞═════════════╪═══════════════════╡
│ 430030      ┆ 221689            │
│ 49091       ┆ 148006            │
│ 1           ┆ 136251            │
│ 30072       ┆ 114557            │
│ 483749      ┆ 95415             │
│ …           ┆ …                 │
│ 1028831     ┆ 1                 │
│ 1111802     ┆ 1                 │
│ 911109      ┆ 1                 │
│ 585897      ┆ 1                 │
│ 348393      ┆ 1                 │
└─────────────┴───────────────────┘
```

