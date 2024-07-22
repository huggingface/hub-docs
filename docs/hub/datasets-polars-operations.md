# Transforming your dataset

On this page we'll guide you through some of the most common operations used when doing data analysis. This is only a small subset of what's possible in Polars. For more information, please visit the [Documentation](https://docs.pola.rs/).

For the example we will use the [Common Crawl statistics](https://huggingface.co/datasets/commoncrawl/statistics) dataset. These statistics include: number of pages, distribution of top-level domains, crawl overlaps, etc. For more detailed information and graphs please visit their [official statistics page](https://commoncrawl.github.io/cc-crawl-statistics/plots/tlds).

## Reading

```python
import polars as pl

df = pl.read_csv(
    "hf://datasets/commoncrawl/statistics/tlds.csv",
    try_parse_dates=True,
)
df.head(3)
```

```bash
┌─────┬────────┬───────────────────┬────────────┬───┬───────┬──────┬───────┬─────────┐
│     ┆ suffix ┆ crawl             ┆ date       ┆ … ┆ pages ┆ urls ┆ hosts ┆ domains │
│ --- ┆ ---    ┆ ---               ┆ ---        ┆   ┆ ---   ┆ ---  ┆ ---   ┆ ---     │
│ i64 ┆ str    ┆ str               ┆ date       ┆   ┆ i64   ┆ i64  ┆ f64   ┆ f64     │
╞═════╪════════╪═══════════════════╪════════════╪═══╪═══════╪══════╪═══════╪═════════╡
│ 0   ┆ a.se   ┆ CC-MAIN-2008-2009 ┆ 2009-01-12 ┆ … ┆ 18    ┆ 18   ┆ 1.0   ┆ 1.0     │
│ 1   ┆ a.se   ┆ CC-MAIN-2009-2010 ┆ 2010-09-25 ┆ … ┆ 3462  ┆ 3259 ┆ 166.0 ┆ 151.0   │
│ 2   ┆ a.se   ┆ CC-MAIN-2012      ┆ 2012-11-02 ┆ … ┆ 6957  ┆ 6794 ┆ 172.0 ┆ 150.0   │
└─────┴────────┴───────────────────┴────────────┴───┴───────┴──────┴───────┴─────────┘
```

## Selecting columns

The dataset contains some columns we don't need. To remove them, we will use the `select` method:

```python
df = df.select("suffix", "date", "tld", "pages", "domains")
df.head(3)
```

```bash
┌────────┬───────────────────┬────────────┬─────┬───────┬─────────┐
│ suffix ┆ crawl             ┆ date       ┆ tld ┆ pages ┆ domains │
│ ---    ┆ ---               ┆ ---        ┆ --- ┆ ---   ┆ ---     │
│ str    ┆ str               ┆ date       ┆ str ┆ i64   ┆ f64     │
╞════════╪═══════════════════╪════════════╪═════╪═══════╪═════════╡
│ a.se   ┆ CC-MAIN-2008-2009 ┆ 2009-01-12 ┆ se  ┆ 18    ┆ 1.0     │
│ a.se   ┆ CC-MAIN-2009-2010 ┆ 2010-09-25 ┆ se  ┆ 3462  ┆ 151.0   │
│ a.se   ┆ CC-MAIN-2012      ┆ 2012-11-02 ┆ se  ┆ 6957  ┆ 150.0   │
└────────┴───────────────────┴────────────┴─────┴───────┴─────────┘
```

## Filtering

We can filter the dataset using the `filter` method. This method accepts complex expressions, but let's start simple by filtering based on the crawl date:

```python
import datetime

df = df.filter(pl.col("date") >= datetime.date(2020, 1, 1))
```

You can combine multiple predicates with `&` or `|` operators:

```python
df = df.filter(
    (pl.col("date") >= datetime.date(2020, 1, 1)) |
    pl.col("crawl").str.contains("CC")
)
```

## Transforming

In order to add new columns to the dataset, use `with_columns`. In the example below we calculate the total number of pages per domain and add a new column `pages_per_domain` using the `alias` method. The entire statement within `with_columns` is called an expression. Read more about expressions and how to use them in the [Polars user guide](https://docs.pola.rs/user-guide/expressions/)

```python
df = df.with_columns(
    (pl.col("pages") / pl.col("domains")).alias("pages_per_domain")
)
df.sample(3)
```

```bash
┌────────┬─────────────────┬────────────┬─────┬───────┬─────────┬──────────────────┐
│ suffix ┆ crawl           ┆ date       ┆ tld ┆ pages ┆ domains ┆ pages_per_domain │
│ ---    ┆ ---             ┆ ---        ┆ --- ┆ ---   ┆ ---     ┆ ---              │
│ str    ┆ str             ┆ date       ┆ str ┆ i64   ┆ f64     ┆ f64              │
╞════════╪═════════════════╪════════════╪═════╪═══════╪═════════╪══════════════════╡
│ net.bt ┆ CC-MAIN-2014-41 ┆ 2014-10-06 ┆ bt  ┆ 4     ┆ 1.0     ┆ 4.0              │
│ org.mk ┆ CC-MAIN-2016-44 ┆ 2016-10-31 ┆ mk  ┆ 1445  ┆ 430.0   ┆ 3.360465         │
│ com.lc ┆ CC-MAIN-2016-44 ┆ 2016-10-31 ┆ lc  ┆ 1     ┆ 1.0     ┆ 1.0              │
└────────┴─────────────────┴────────────┴─────┴───────┴─────────┴──────────────────┘
```

## Aggregation & Sorting

In order to aggregate data together you can use the `group_by`, `agg` and `sort` methods. Within the aggregation context you can combine expressions to create powerful statements which are still easy to read.

First, we aggregate all the data to the top-level domain `tld` per scraped date:

```python
df = df.group_by("tld", "date").agg(
    pl.col("pages").sum(),
    pl.col("domains").sum(),
)
```

Now we can calculate several statistics per top level domain:

- Number of unique scrape dates
- Average number of domains in the scraped period
- Average growth rate in terms of number of pages

```python
df = df.group_by("tld").agg(
    pl.col("date").unique().count().alias("number_of_scrapes"),
    pl.col("domains").mean().alias("avg_number_of_domains"),
    pl.col("pages").sort_by("date").pct_change().mean().alias("avg_page_growth_rate"),
)
df = df.sort("avg_number_of_domains", descending=True)
df.head(10)
```

```bash
┌─────┬───────────────────┬───────────────────────┬─────────────────────────────────┐
│ tld ┆ number_of_scrapes ┆ avg_number_of_domains ┆ avg_percent_change_in_number_o… │
│ --- ┆ ---               ┆ ---                   ┆ ---                             │
│ str ┆ u32               ┆ f64                   ┆ f64                             │
╞═════╪═══════════════════╪═══════════════════════╪═════════════════════════════════╡
│ com ┆ 101               ┆ 1.9571e7              ┆ 0.022182                        │
│ de  ┆ 101               ┆ 1.8633e6              ┆ 0.5232                          │
│ org ┆ 101               ┆ 1.5049e6              ┆ 0.019604                        │
│ net ┆ 101               ┆ 1.5020e6              ┆ 0.021002                        │
│ cn  ┆ 101               ┆ 1.1101e6              ┆ 0.281726                        │
│ ru  ┆ 101               ┆ 1.0561e6              ┆ 0.416303                        │
│ uk  ┆ 101               ┆ 827453.732673         ┆ 0.065299                        │
│ nl  ┆ 101               ┆ 710492.623762         ┆ 1.040096                        │
│ fr  ┆ 101               ┆ 615471.594059         ┆ 0.419181                        │
│ jp  ┆ 101               ┆ 615391.455446         ┆ 0.246162                        │
└─────┴───────────────────┴───────────────────────┴─────────────────────────────────┘
```
