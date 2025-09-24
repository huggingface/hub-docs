# SQL Console: Query Hugging Face datasets in your browser

You can run SQL queries on the dataset in the browser using the SQL Console. The SQL Console is powered by [DuckDB](https://duckdb.org/) WASM and runs entirely in the browser. You can access the SQL Console from the Data Studio.

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sql-ai.png"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sql-ai-dark.png"/>
</div>

<p class="text-sm text-center italic">
    To learn more about the SQL Console, see the <a href="https://huggingface.co/blog/sql-console" target="_blank" rel="noopener noreferrer">SQL Console blog post</a>.
</p>


Through the SQL Console, you can:

- Run [DuckDB SQL queries](https://duckdb.org/docs/sql/query_syntax/select) on the dataset (_checkout [SQL Snippets](https://huggingface.co/spaces/cfahlgren1/sql-snippets) for useful queries_) 
- Share results of the query with others via a link (_check out [this example](https://huggingface.co/datasets/gretelai/synthetic-gsm8k-reflection-405b?sql_console=true&sql=FROM+histogram%28%0A++train%2C%0A++topic%2C%0A++bin_count+%3A%3D+10%0A%29)_) 
- Download the results of the query to a Parquet or CSV file 
- Embed the results of the query in your own webpage using an iframe 
- Query datasets with natural language

> [!TIP]
> You can also use the DuckDB locally through the CLI to query the dataset via the `hf://` protocol. See the <a href="https://huggingface.co/docs/hub/en/datasets-duckdb" target="_blank" rel="noopener noreferrer">DuckDB Datasets documentation</a> for more information. The SQL Console provides a convenient `Copy to DuckDB CLI` button that generates the SQL query for creating views and executing your query in the DuckDB CLI.


## Examples

### Filtering

The SQL Console makes filtering datasets really easy. For example, if you want to filter the `SkunkworksAI/reasoning-0.01` dataset for instructions and responses with a reasoning length of at least 10, you can use the following query:

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datastudio-filtering.png"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datastudio-filtering-dark.png"/>
</div>

Here's the SQL to sort by length of the reasoning
```sql
SELECT *
FROM train
WHERE LENGTH(reasoning_chains) > 10;
```

### Histogram

Many dataset authors choose to include statistics about the distribution of the data in the dataset. Using the DuckDB `histogram` function, we can plot a histogram of a column's values.

For example, to plot a histogram of the `Rating` column in the [Lichess/chess-puzzles](https://huggingface.co/datasets/Lichess/chess-puzzles) dataset, you can use the following query:

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datastudio-histogram.png"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datastudio-histogram-dark.png"/>
</div>
<p class="text-sm text-center italic">
    Learn more about the `histogram` function and parameters <a href="https://cfahlgren1-sql-snippets.hf.space/histogram" target="_blank" rel="noopener noreferrer">here</a>.
</p>

```sql
from histogram(train, Rating)
```

### Regex Matching

One of the most powerful features of DuckDB is the deep support for regular expressions. You can use the `regexp` function to match patterns in your data.

 Using the [regexp_matches](https://duckdb.org/docs/sql/functions/char.html#regexp_matchesstring-pattern) function, we can filter the [GeneralReasoning/GeneralThought-195k](https://huggingface.co/datasets/GeneralReasoning/GeneralThought-195K) dataset for instructions that contain markdown code blocks.

 <div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datastudio-regex.png"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datastudio-regex-dark.png"/>
</div>
<p class="text-sm text-center italic">
    Learn more about the DuckDB regex functions <a href="https://duckdb.org/docs/sql/functions/regular_expressions.html" target="_blank" rel="noopener noreferrer">here</a>.
</p>


```sql
SELECT *
FROM train
WHERE regexp_matches(model_answer, '```')
LIMIT 10;
```


### Leakage Detection

Leakage detection is the process of identifying whether data in a dataset is present in multiple splits, for example, whether the test set is present in the training set.

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datastudio-leakage.png"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datastudio-leakage-dark.png"/>
</div>

<p class="text-sm text-center italic">
    Learn more about leakage detection <a href="https://huggingface.co/blog/lbourdois/lle">here</a>.
</p>

```sql
WITH
    overlapping_rows AS (
        SELECT COALESCE(
            (SELECT COUNT(*) AS overlap_count
             FROM train
             INTERSECT
             SELECT COUNT(*) AS overlap_count
             FROM test),
            0
        ) AS overlap_count
    ),
    total_unique_rows AS (
        SELECT COUNT(*) AS total_count
        FROM (
            SELECT * FROM train
            UNION
            SELECT * FROM test
        ) combined
    )
SELECT
    overlap_count,
    total_count,
    CASE 
        WHEN total_count > 0 THEN (overlap_count * 100.0 / total_count)
        ELSE 0
    END AS overlap_percentage
FROM overlapping_rows, total_unique_rows;
```
