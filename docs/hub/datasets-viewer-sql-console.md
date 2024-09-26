# SQL Console

You can run SQL queries on the dataset in the browser using the SQL Console. The SQL Console is powered by [DuckDB](https://duckdb.org/) WASM and runs entirely in the browser. You can access the SQL Console from the dataset page by clicking on the **SQL Console** badge.

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/sql_console/sql-console-histogram.png"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/sql_console/sql-console-histogram-dark.png"/>
</div>

<p class="text-sm text-center italic">
    To learn more about the SQL Console, see the <a href="https://huggingface.co/blog/sql-console" target="_blank" rel="noopener noreferrer">SQL Console blog post</a>.
</p>


Through the SQL Console, you can:

- Run [DuckDB SQL queries](https://duckdb.org/docs/sql/query_syntax/select) on the dataset (_checkout [SQL Snippets](https://huggingface.co/spaces/cfahlgren1/sql-snippets) for useful queries_) 
- Share results of the query with others via a link (_check out [this example](https://huggingface.co/datasets/gretelai/synthetic-gsm8k-reflection-405b?sql_console=true&sql=FROM+histogram%28%0A++train%2C%0A++topic%2C%0A++bin_count+%3A%3D+10%0A%29)_) 
- Download the results of the query to a parquet file 
- Embed the results of the query in your own webpage using an iframe 

<Tip>
You can also use a local DuckDB CLI to query the dataset via the `hf://` protocol. See the <a href="https://huggingface.co/docs/hub/en/datasets-duckdb" target="_blank" rel="noopener noreferrer">DuckDB CLI documentation</a> for more information.
</Tip>