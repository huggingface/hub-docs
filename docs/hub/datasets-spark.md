# Spark

Spark enables real-time, large-scale data processing in a distributed environment.

You can use `pyspark_huggingface` to access Hugging Face datasets repositories in PySpark via the "huggingface" Data Source.

Try out [Spark Notebooks](https://huggingface.co/spaces/Dataset-Tools/Spark-Notebooks) on Hugging Face Spaces to get Notebooks with PySpark and `pyspark_huggingface` pre-installed.

<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spark-notebooks-min.png">

## Set up

### Installation

To be able to read and write to Hugging Face Datasets, you need to install the `pyspark_huggingface` library:

```
pip install pyspark_huggingface
```

This will also install required dependencies like `huggingface_hub` for authentication, and `pyarrow` for reading and writing datasets.

### Authentication

You need to authenticate to Hugging Face to read private/gated dataset repositories or to write to your dataset repositories.

You can use the CLI for example:

```
hf auth login
```

It's also possible to provide your Hugging Face token with the `HF_TOKEN` environment variable or passing the `token` option to the reader.
For more details about authentication, check out [this guide](https://huggingface.co/docs/huggingface_hub/quick-start#authentication).

### Enable the "huggingface" Data Source

PySpark 4 came with a new Data Source API which allows to use datasets from custom sources.
If `pyspark_huggingface` is installed, PySpark auto-imports it and enables the "huggingface" Data Source.

The library also backports the Data Source API for the "huggingface" Data Source for PySpark 3.5, 3.4 and 3.3.
However in this case `pyspark_huggingface` should be imported explicitly to activate the backport and enable the "huggingface" Data Dource:

```python
>>> import pyspark_huggingface
huggingface datasource enabled for pyspark 3.x.x (backport from pyspark 4)
```

## Read

The "huggingface" Data Source allows to read datasets from Hugging Face, using `pyarrow` under the hood to stream Arrow data.
This is compatible with all the dataset in [supported format](https://huggingface.co/docs/hub/datasets-adding#file-formats) on Hugging Face, like Parquet datasets.

For example here is how to load the [stanfordnlp/imdb](https://huggingface.co/stanfordnlp/imdb) dataset:

```python
>>> import pyspark_huggingface
>>> from pyspark.sql import SparkSession
>>> spark = SparkSession.builder.appName("demo").getOrCreate()
>>> df = spark.read.format("huggingface").load("stanfordnlp/imdb")
```

Here is another example with the [BAAI/Infinity-Instruct](https://huggingface.co/datasets/BAAI/Infinity-Instruct) dataset.
It is a gated repository, users have to accept the terms of use before accessing it.
It also has multiple subsets, namely, "3M" and "7M". So we need to specify which one to load.


<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-spark-infinity-instruct-7M-min.png"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-spark-infinity-instruct-7M-dark-min.png"/>
</div>

We use the `.format()` function to use the "huggingface" Data Source, and `.load()` to load the dataset (more precisely the config or subset named "7M" containing 7M samples). Then we compute the number of dialogue per language and filter the dataset.

After logging-in to access the gated repository, we can run:

```python
>>> import pyspark_huggingface
>>> from pyspark.sql import SparkSession
>>> spark = SparkSession.builder.appName("demo").getOrCreate()
>>> df = spark.read.format("huggingface").option("config", "7M").load("BAAI/Infinity-Instruct")
>>> df.show()
+---+----------------------------+-----+----------+--------------------+        
| id|               conversations|label|langdetect|              source|
+---+----------------------------+-----+----------+--------------------+
|  0|        [{human, def exti...|     |        en|      code_exercises|
|  1|        [{human, See the ...|     |        en|                flan|
|  2|        [{human, This is ...|     |        en|                flan|
|  3|        [{human, If you d...|     |        en|                flan|
|  4|        [{human, In a Uni...|     |        en|                flan|
|  5|        [{human, Read the...|     |        en|                flan|
|  6|        [{human, You are ...|     |        en|          code_bagel|
|  7|        [{human, I want y...|     |        en|          Subjective|
|  8|        [{human, Given th...|     |        en|                flan|
|  9|[{human, 因果联系原则是法...|     |     zh-cn|          Subjective|
| 10|        [{human, Provide ...|     |        en|self-oss-instruct...|
| 11|        [{human, The univ...|     |        en|                flan|
| 12|        [{human, Q: I am ...|     |        en|                flan|
| 13|        [{human, What is ...|     |        en|      OpenHermes-2.5|
| 14|        [{human, In react...|     |        en|                flan|
| 15|        [{human, Write Py...|     |        en|      code_exercises|
| 16|        [{human, Find the...|     |        en|            MetaMath|
| 17|        [{human, Three of...|     |        en|            MetaMath|
| 18|        [{human, Chandra ...|     |        en|            MetaMath|
| 19|[{human, 用经济学知识分析...|     |     zh-cn|          Subjective|
+---+----------------------------+-----+----------+--------------------+
```

This loads the dataset in a streaming fashion, and the output DataFrame has one partition per data file in the dataset to enable efficient distributed processing.

To compute the number of dialogues per language we run this code that uses the `columns` option and a `groupBy()` operation.
The `columns` option is useful to only load the data we need, since PySpark doesn't enable predicate push-down with the Data Source API.
There is also a `filters` option to only load data with values within a certain range.

```python
>>> df_langdetect_only = (
...     spark.read.format("huggingface")
...     .option("config", "7M")
...     .option("columns", '["langdetect"]')
...     .load("BAAI/Infinity-Instruct")
... )
>>> df_langdetect_only.groupBy("langdetect").count().show()
+----------+-------+                                                            
|langdetect|  count|
+----------+-------+
|        en|6697793|
|     zh-cn| 751313|
+----------+-------+
```

To filter the dataset and only keep dialogues in Chinese:

```python
>>> df_chinese_only = (
...     spark.read.format("huggingface")
...     .option("config", "7M")
...     .option("filters", '[("langdetect", "=", "zh-cn")]')
...     .load("BAAI/Infinity-Instruct")
... )
>>> df_chinese_only.show()
+---+----------------------------+-----+----------+----------+                  
| id|               conversations|label|langdetect|    source|
+---+----------------------------+-----+----------+----------+
|  9|[{human, 因果联系原则是法...|     |     zh-cn|Subjective|
| 19|[{human, 用经济学知识分析...|     |     zh-cn|Subjective|
| 38| [{human, 某个考试共有A、...|     |     zh-cn|Subjective|
| 39|[{human, 撰写一篇关于斐波...|     |     zh-cn|Subjective|
| 57|[{human, 总结世界历史上的...|     |     zh-cn|Subjective|
| 61|[{human, 生成一则广告词。...|     |     zh-cn|Subjective|
| 66|[{human, 描述一个有效的团...|     |     zh-cn|Subjective|
| 94|[{human, 如果比利和蒂芙尼...|     |     zh-cn|Subjective|
|102|[{human, 生成一句英文名言...|     |     zh-cn|Subjective|
|106|[{human, 写一封感谢信，感...|     |     zh-cn|Subjective|
|118| [{human, 生成一个故事。}...|     |     zh-cn|Subjective|
|174|[{human, 高胆固醇水平的后...|     |     zh-cn|Subjective|
|180|[{human, 基于以下角色信息...|     |     zh-cn|Subjective|
|192|[{human, 请写一篇文章，概...|     |     zh-cn|Subjective|
|221|[{human, 以诗歌形式表达对...|     |     zh-cn|Subjective|
|228|[{human, 根据给定的指令，...|     |     zh-cn|Subjective|
|236|[{human, 打开一个新的生成...|     |     zh-cn|Subjective|
|260|[{human, 生成一个有关未来...|     |     zh-cn|Subjective|
|268|[{human, 如果有一定数量的...|     |     zh-cn|Subjective|
|273| [{human, 题目：小明有5个...|     |     zh-cn|Subjective|
+---+----------------------------+-----+----------+----------+
```

It is also possible to apply filters or remove columns on the loaded DataFrame, but it is more efficient to do it while loading, especially on Parquet datasets.
Indeed, Parquet contains metadata at the file and row group level, which allows to skip entire parts of the dataset that don't contain samples that satisfy the criteria. Columns in Parquet can also be loaded independently, whch allows to skip the excluded columns and avoid loading unnecessary data.

### Options

Here is the list of available options you can pass to `read..option()`:

* `config` (string): select a dataset subset/config
* `split` (string): select a dataset split (default is "train")
* `token` (string): your Hugging Face token

For Parquet datasets:
* `columns` (string): select a subset of columns to load, e.g. `'["id"]'`
* `filters` (string): to skip files and row groups that don't match a criteria, e.g. `'["source", "=", "code_exercises"]'`. Filters are passed to [pyarrow.parquet.ParquetDataset](https://arrow.apache.org/docs/python/generated/pyarrow.parquet.ParquetDataset.html).

Any other option is passed as an argument to [datasets.load_dataset] (https://huggingface.co/docs/datasets/en/package_reference/loading_methods#datasets.load_dataset)

### Run SQL queries

Once you have your PySpark Dataframe ready, you can run SQL queries using `spark.sql`:

```python
>>> import pyspark_huggingface
>>> from pyspark.sql import SparkSession
>>> spark = SparkSession.builder.appName("demo").getOrCreate()
>>> df = (
...     spark.read.format("huggingface")
...     .option("config", "7M")
...     .option("columns", '["source"]')
...     .load("BAAI/Infinity-Instruct")
... )
>>> spark.sql("SELECT source, count(*) AS total FROM {df} GROUP BY source ORDER BY total DESC", df=df).show()
+--------------------+-------+
|              source|  total|
+--------------------+-------+
|                flan|2435840|
|          Subjective|1342427|
|      OpenHermes-2.5| 855478|
|            MetaMath| 690138|
|      code_exercises| 590958|
|Orca-math-word-pr...| 398168|
|          code_bagel| 386649|
|        MathInstruct| 329254|
|python-code-datas...|  88632|
|instructional_cod...|  82920|
|        CodeFeedback|  79513|
|self-oss-instruct...|  50467|
|Evol-Instruct-Cod...|  43354|
|CodeExercise-Pyth...|  27159|
|code_instructions...|  23130|
|  Code-Instruct-700k|  10860|
|Glaive-code-assis...|   9281|
|python_code_instr...|   2581|
|Python-Code-23k-S...|   2297|
+--------------------+-------+
```

Again, specifying the `columns` option is not necessary, but is useful to avoid loading unnecessary data and make the query faster.

## Write

You can write a PySpark Dataframe to Hugging Face with the "huggingface" Data Source.
It uploads Parquet files in parallel in a distributed manner, and only commits the files once they're all uploaded.
It works like this:

```python
>>> import pyspark_huggingface
>>> df.write.format("huggingface").save("username/dataset_name")
```

Here is how we can use this function to write the filtered version of the [BAAI/Infinity-Instruct](https://huggingface.co/datasets/BAAI/Infinity-Instruct) dataset back to Hugging Face.

First you need to [create a dataset repository](https://huggingface.co/new-dataset), e.g. `username/Infinity-Instruct-Chinese-Only` (you can set it to private if you want).
Then, make sure you are authenticated and you can use the "huggingface" Data Source, set the `mode` to "overwrite" (or "append" if you want to extend an existing dataset), and push to Hugging Face with `.save()`:

```python
>>> df_chinese_only.write.format("huggingface").mode("overwrite").save("username/Infinity-Instruct-Chinese-Only")
```

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-spark-infinity-instruct-chinese-only-min.png"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-spark-infinity-instruct-chinese-only-dark-min.png"/>
</div>

### Mode

Two modes are available when pushing a dataset to Hugging Face:

* "overwrite": overwrite the dataset if it already exists
* "append": append the dataset to an existing dataset

### Options

Here is the list of available options you can pass to `write.option()`:

* `token` (string): your Hugging Face token

Contributions are welcome to add more options here, in particular `subset` and `split`.
