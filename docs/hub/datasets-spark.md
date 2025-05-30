# Spark

Spark enables real-time, large-scale data processing in a distributed environment.

In particular you can use `pyspark_huggingface` to access Hugging Face datasets repositories in PySpark.

## Installation

To be able to read and write to Hugging Face Datasets, you need to install the `pyspark_huggingface` library:

```
pip install pyspark_huggingface
```

This will also install required dependencies like `huggingface_hub` for authentication, and `pyarrow` for reading and writing datasets.

## Authentication

You need to authenticate to Hugging Face to read private/gated dataset repositories or to write to your dataset repositories.

You can use the CLI for example:

```
huggingface-cli login
```

It's also possible to provide your Hugging Face token with the `HF_TOKEN` environment variable or passing the `token` option to the spark context builder.

For more details about authentication, check out [this guide](https://huggingface.co/docs/huggingface_hub/quick-start#authentication).

## Enable the "huggingface" Data Source

PySpark 4 came with a new Data Source API which allows to use datasets from custom sources.
If `pyspark_huggingface` is installed, PySpark auto-imports it and enables the "huggingface" Data Dource.

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
>>> from pyspark.sql import SparkSession
>>> spark = SparkSession.builder.appName("demo").getOrCreate()
>>> df = spark.read.format("huggingface").load("stanfordnlp/imdb")
```

Here is another example with the [BAAI/Infinity-Instruct](https://huggingface.co/datasets/BAAI/Infinity-Instruct) dataset.
It is a gated repository, users have to accept the terms of use before accessing it.
It also has multiple subsets, named "3M", "7M" etc. So wee need to specify which one to load.


<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-spark-infinity-instruct-7M-min.png"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-spark-infinity-instruct-7M-dark-min.png"/>
</div>

We use the `.format()` function to use the "huggingface" Data Source, and `.load()` to load the dataset (more precisely the config or subset named "7M" containing 7M samples). Then we compute the number of dialogue per language and filter the dataset.

After logging-in to access the gated repository, we can run:

```python
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
Indeed, Parquet contains metadata at the file and row group level, which allows to skip entire parts of the dataset that don't contain samples that satisfy the criteria. Columns in Parquet can also be loaded indepentently, whch allows to skip the excluded columns and avoid loading unnecessary data.

### Run SQL queries

Once you have your PySpark Dataframe ready, you can run SQL queries using `spark.sql`:

```python
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

We also provide a helper function to write datasets in a distributed manner to a Hugging Face repository.

You can write a PySpark Dataframe to Hugging Face using this `write_parquet` helper function based on the `huggingface_hub` API.
In particular it uses the `preupload_lfs_files` utility to upload Parquet files in parallel in a distributed manner, and only commits the files once they're all uploaded:


```python
import math
import pickle
import tempfile
from functools import partial
from typing import Iterator, Optional

import pyarrow as pa
import pyarrow.parquet as pq
from huggingface_hub import CommitOperationAdd, HfFileSystem
from pyspark.sql.dataframe import DataFrame
from pyspark.sql.pandas.types import from_arrow_schema, to_arrow_schema


def _preupload(iterator: Iterator[pa.RecordBatch], path: str, schema: pa.Schema, filesystem: HfFileSystem, row_group_size: Optional[int] = None, **kwargs) -> Iterator[pa.RecordBatch]:
    resolved_path = filesystem.resolve_path(path)
    with tempfile.NamedTemporaryFile(suffix=".parquet") as temp_file:
        with pq.ParquetWriter(temp_file.name, schema=schema, **kwargs) as writer:
            for batch in iterator:
                writer.write_batch(batch, row_group_size=row_group_size)
        addition = CommitOperationAdd(path_in_repo=temp_file.name, path_or_fileobj=temp_file.name)
        filesystem._api.preupload_lfs_files(repo_id=resolved_path.repo_id, additions=[addition], repo_type=resolved_path.repo_type, revision=resolved_path.revision)
    yield pa.record_batch({"addition": [pickle.dumps(addition)]}, schema=pa.schema({"addition": pa.binary()}))


def _commit(iterator: Iterator[pa.RecordBatch], path: str, filesystem: HfFileSystem, max_operations_per_commit=50) -> Iterator[pa.RecordBatch]:
    resolved_path = filesystem.resolve_path(path)
    additions: list[CommitOperationAdd] = [pickle.loads(addition) for addition in pa.Table.from_batches(iterator, schema=pa.schema({"addition": pa.binary()}))[0].to_pylist()]
    num_commits = math.ceil(len(additions) / max_operations_per_commit)
    for shard_idx, addition in enumerate(additions):
        addition.path_in_repo = resolved_path.path_in_repo.replace("{shard_idx:05d}", f"{shard_idx:05d}")
    for i in range(0, num_commits):
        operations = additions[i * max_operations_per_commit : (i + 1) * max_operations_per_commit]
        commit_message = "Upload using PySpark" + (f" (part {i:05d}-of-{num_commits:05d})" if num_commits > 1 else "")
        filesystem._api.create_commit(repo_id=resolved_path.repo_id, repo_type=resolved_path.repo_type, revision=resolved_path.revision, operations=operations, commit_message=commit_message)
        yield pa.record_batch({"path": [addition.path_in_repo for addition in operations]}, schema=pa.schema({"path": pa.string()}))


def write_parquet(df: DataFrame, path: str, **kwargs) -> None:
    """
    Write Parquet files to Hugging Face using PyArrow.

    It uploads Parquet files in a distributed manner in two steps:

    1. Preupload the Parquet files in parallel in a distributed banner
    2. Commit the preuploaded files

    Authenticate using `huggingface-cli login` or passing a token
    using the `storage_options` argument: `storage_options={"token": "hf_xxx"}`

    Parameters
    ----------
    path : str
        Path of the file or directory. Prefix with a protocol like `hf://` to read from Hugging Face.
        It writes Parquet files in the form "part-xxxxx.parquet", or to a single file if `path ends with ".parquet".

    **kwargs
        Any additional kwargs are passed to pyarrow.parquet.ParquetWriter.

    Returns
    -------
    DataFrame
        DataFrame based on parquet file.

    Examples
    --------
    >>> spark.createDataFrame(pd.DataFrame({"foo": range(5), "bar": range(5, 10)}))
    >>> # Save to one file
    >>> write_parquet(df, "hf://datasets/username/dataset/data.parquet")
    >>> # OR save to a directory (possibly in many files)
    >>> write_parquet(df, "hf://datasets/username/dataset")
    """
    filesystem: HfFileSystem = kwargs.pop("filesystem", HfFileSystem(**kwargs.pop("storage_options", {})))
    if path.endswith(".parquet") or path.endswith(".pq"):
        df = df.coalesce(1)
    else:
        path += "/part-{shard_idx:05d}.parquet"
    df.mapInArrow(
        partial(_preupload, path=path, schema=to_arrow_schema(df.schema), filesystem=filesystem, **kwargs),
        from_arrow_schema(pa.schema({"addition": pa.binary()})),
    ).repartition(1).mapInArrow(
        partial(_commit, path=path, filesystem=filesystem),
        from_arrow_schema(pa.schema({"path": pa.string()})),
    ).collect()
```

Here is how we can use this function to write the filtered version of the [BAAI/Infinity-Instruct](https://huggingface.co/datasets/BAAI/Infinity-Instruct) dataset back to Hugging Face.

First you need to [create a dataset repository](https://huggingface.co/new-dataset), e.g. `username/Infinity-Instruct-Chinese-Only` (you can set it to private if you want).
Then, make sure you are authenticated and you can run:

```python
>>> write_parquet(df_chinese_only, "hf://datasets/username/Infinity-Instruct-Chinese-Only")
tmph9jwu9py.parquet: 100%|██████████| 50.5M/50.5M [00:03<00:00, 14.6MB/s]
tmp0oqt99nc.parquet: 100%|██████████| 50.8M/50.8M [00:02<00:00, 17.9MB/s]
tmpgnizkwqp.parquet: 100%|██████████| 50.5M/50.5M [00:02<00:00, 19.6MB/s]
tmpanm04k4n.parquet: 100%|██████████| 51.4M/51.4M [00:02<00:00, 22.9MB/s]
tmp14uy9oqb.parquet: 100%|██████████| 50.4M/50.4M [00:02<00:00, 23.0MB/s]
tmpcp8t_qdl.parquet: 100%|██████████| 50.4M/50.4M [00:02<00:00, 23.5MB/s]
tmpjui5mns8.parquet: 100%|██████████| 50.3M/50.3M [00:02<00:00, 24.1MB/s]
tmpydqh6od1.parquet: 100%|██████████| 50.9M/50.9M [00:02<00:00, 23.8MB/s]
tmp52f2t8tu.parquet: 100%|██████████| 50.5M/50.5M [00:02<00:00, 23.7MB/s]
tmpg7egv3ye.parquet: 100%|██████████| 50.1M/50.1M [00:06<00:00, 7.68MB/s]
tmp2s0fq2hm.parquet: 100%|██████████| 50.8M/50.8M [00:02<00:00, 18.1MB/s]
tmpmj97ab30.parquet: 100%|██████████| 71.3M/71.3M [00:02<00:00, 23.9MB/s]
```

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-spark-infinity-instruct-chinese-only-min.png"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-spark-infinity-instruct-chinese-only-dark-min.png"/>
</div>

## Run in JupyterLab on Hugging Face Spaces

You can duplicate the [Spark on HF JupyterLab](https://huggingface.co/spaces/lhoestq/Spark-on-HF-JupyterLab) Space to get a Notebook with PySpark and those helper functions pre-installed.

Click on "Duplicate Space", choose a name for your Space, select your hardware and you are ready:

<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spark-on-hf-jupyterlab-screenshot-min.png">
