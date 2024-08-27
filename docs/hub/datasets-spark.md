# Spark

Spark enables real-time, large-scale data processing in a distributed environment.

In particular you can use `huggingface_hub` to access Hugging Face datasets repositories in PySpark

## Installation

To be able to read and write to Hugging Face URLs (e.g. `hf://datasets/username/dataset/data.parquet`), you need to install the `huggingface_hub` library:

```
pip install huggingface_hub
```

You also need to install `pyarrow` to read/write Parquet / JSON / CSV / etc. files using the filesystem API provided by `huggingFace_hub`:

```
pip install pyarrow
```

## Authentication

You need to authenticate to Hugging Face to read private/gated dataset repositories or to write to your dataset repositories.

You can use the CLI for example:

```
huggingface-cli login
```

It's also possible to provide your Hugging Face token with the `HF_TOKEN` environment variable or passing the `storage_options` parameter to helper functions below:

```python
storage_options = {"token": "hf_xxx"}
```

For more details about authentication, check out [this guide](https://huggingface.co/docs/huggingface_hub/quick-start#authentication).

## Read

PySpark doesn't have an official support for Hugging Face paths, so we provide a helper function to read datasets in a distributed manner.

For example you can read Parquet files from Hugging Face in an optimized way using PyArrow by defining this `read_parquet` helper function:

```python
from functools import partial
from typing import Iterator, Optional, Union

import pyarrow as pa
import pyarrow.parquet as pq
from huggingface_hub import HfFileSystem
from pyspark.sql.dataframe import DataFrame
from pyspark.sql.pandas.types import from_arrow_schema


def _read(iterator: Iterator[pa.RecordBatch], **kwargs) -> Iterator[pa.RecordBatch]:
    for batch in iterator:
        for path in batch[0].to_pylist():
            yield from pq.read_table(path, **kwargs).to_batches()


def read_parquet(
    path: str,
    columns: Optional[list[str]] = None,
    filters: Optional[Union[list[tuple], list[list[tuple]]]] = None,
    **kwargs,
) -> DataFrame:
    """
    Loads Parquet files from Hugging Face using PyArrow, returning a PySPark `DataFrame`.

    It reads Parquet files in a distributed manner.

    Access private or gated repositories using `huggingface-cli login` or passing a token
    using the `storage_options` argument: `storage_options={"token": "hf_xxx"}`

    Parameters
    ----------
    path : str
        Path to the file. Prefix with a protocol like `hf://` to read from Hugging Face.
        You can read from multiple files if you pass a globstring.
    columns : list, default None
        If not None, only these columns will be read from the file.
    filters : List[Tuple] or List[List[Tuple]], default None
        To filter out data.
        Filter syntax: [[(column, op, val), ...],...]
        where op is [==, =, >, >=, <, <=, !=, in, not in]
        The innermost tuples are transposed into a set of filters applied
        through an `AND` operation.
        The outer list combines these sets of filters through an `OR`
        operation.
        A single list of tuples can also be used, meaning that no `OR`
        operation between set of filters is to be conducted.

    **kwargs
        Any additional kwargs are passed to pyarrow.parquet.read_table.

    Returns
    -------
    DataFrame
        DataFrame based on parquet file.

    Examples
    --------
    >>> path = "hf://datasets/username/dataset/data.parquet"
    >>> pd.DataFrame({"foo": range(5), "bar": range(5, 10)}).to_parquet(path)
    >>> read_parquet(path).show()
    +---+---+
    |foo|bar|
    +---+---+
    |  0|  5|
    |  1|  6|
    |  2|  7|
    |  3|  8|
    |  4|  9|
    +---+---+
    >>> read_parquet(path, columns=["bar"]).show()
    +---+
    |bar|
    +---+
    |  5|
    |  6|
    |  7|
    |  8|
    |  9|
    +---+
    >>> sel = [("foo", ">", 2)]
    >>> read_parquet(path, filters=sel).show()
    +---+---+
    |foo|bar|
    +---+---+
    |  3|  8|
    |  4|  9|
    +---+---+
    """
    filesystem: HfFileSystem = kwargs.pop("filesystem") if "filesystem" in kwargs else HfFileSystem(**kwargs.pop("storage_options", {}))
    paths = filesystem.glob(path)
    if not paths:
        raise FileNotFoundError(f"Counldn't find any file at {path}")
    df = spark.createDataFrame([{"path": path} for path in paths])
    arrow_schema = pq.read_schema(filesystem.open(paths[0]))
    schema = pa.schema(
        [
            field for field in arrow_schema
            if (columns is None or field.name in columns)
        ],
        metadata=arrow_schema.metadata
    )
    return df.mapInArrow(
        partial(
            _read,
            columns=columns,
            filters=filters,
            filesystem=filesystem,
            schema=schema,
            **kwargs
        ),
        from_arrow_schema(schema)
    )
```

Here is how we can use this on the [BAAI/Infinity-Instruct](https://huggingface.co/datasets/BAAI/Infinity-Instruct) dataset.
It is a gated repository, users have to accept the terms of use before accessing it.


<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-spark-infinity-instruct-7M-min.png"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-spark-infinity-instruct-7M-dark-min.png"/>
</div>

We use the `read_parquet` function to read data from the dataset, compute the number of dialogue per language and filter the dataset.

After logging-in to access the gated repository, we can run:

```python
>>> from pyspark.sql import SparkSession
>>> spark = SparkSession.builder.appName("demo").getOrCreate()
>>> df = read_parquet("hf://datasets/BAAI/Infinity-Instruct/7M/*.parquet")
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

To compute the number of dialogues per language we run this code.
The `columns` argument is useful to only load the data we need, since PySpark doesn't enable predicate push-down in this case.
There is also a `filters` argument to only load data with values within a certain range.

```python
>>> df_langdetect_only = read_parquet("hf://datasets/BAAI/Infinity-Instruct/7M/*.parquet", columns=["langdetect"])
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
>>> criteria = [("langdetect", "=", "zh-cn")]
>>> df_chinese_only = read_parquet("hf://datasets/BAAI/Infinity-Instruct/7M/*.parquet", filters=criteria)
>>> df_chinese_only
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

## Write

We also provide a helper function to write datasets in a distributed manner to a Hugging Face repository.

You can write a PySpark Dataframe to Hugging Face using this `write_parquet` helper functions based on the `huggingface_hub` API.
In particular it uses the `preupload_lfs_files` utility to upload Parquet files in parallel in a distributed manner, and only commit the files once they're all uploaded:


```python
import math
import pickle
import tempfile
from functools import partial
from typing import Iterator, Optional
from uuid import uuid4

import pyarrow as pa
import pyarrow.parquet as pq
from huggingface_hub import CommitOperationAdd, CommitOperationCopy, CommitOperationDelete, HfFileSystem
from pyspark.sql.dataframe import DataFrame
from pyspark.sql.pandas.types import from_arrow_schema, to_arrow_schema


def _write_single(iterator: Iterator[pa.RecordBatch], path: str, schema: pa.Schema, filesystem: HfFileSystem, row_group_size: Optional[int] = None, **kwargs) -> Iterator[pa.RecordBatch]:
    resolved_path = filesystem.resolve_path(path)
    with tempfile.NamedTemporaryFile(suffix=".parquet") as temp_file:
        with pq.ParquetWriter(temp_file.name, schema=schema, **kwargs) as writer:
            for batch in iterator:
                writer.write_batch(batch, row_group_size=row_group_size)
        filesystem._api.upload_file(
                repo_id=resolved_path.repo_id,
                path_in_repo=resolved_path.path_in_repo,
                repo_type=resolved_path.repo_type,
                revision=resolved_path.revision,
                path_or_fileobj=temp_file.name
            )
    yield pa.record_batch(
        {
            "path": [path],
        },
        schema=pa.schema({"path": pa.string()})
    )


def _preupload(iterator: Iterator[pa.RecordBatch], path: str, schema: pa.Schema, filesystem: HfFileSystem, row_group_size: Optional[int] = None, **kwargs) -> Iterator[pa.RecordBatch]:
    resolved_path = filesystem.resolve_path(path)
    with tempfile.NamedTemporaryFile(suffix=".parquet") as temp_file:
        with pq.ParquetWriter(temp_file.name, schema=schema, **kwargs) as writer:
            for batch in iterator:
                writer.write_batch(batch, row_group_size=row_group_size)
        addition = CommitOperationAdd(path_in_repo=(resolved_path.path_in_repo + f"/.tmp/part-{uuid4()}.parquet"), path_or_fileobj=temp_file.name)
        filesystem._api.preupload_lfs_files(
                repo_id=resolved_path.repo_id,
                additions=[addition],
                repo_type=resolved_path.repo_type,
                revision=resolved_path.revision,
            )
    yield pa.record_batch(
        {
            "addition": [pickle.dumps(addition)],
        },
        schema=pa.schema({"addition": pa.binary()})
    )


def _commit(iterator: Iterator[pa.RecordBatch], path: str, filesystem: HfFileSystem, max_operations_per_commit=50) -> Iterator[pa.RecordBatch]:
    resolved_path = filesystem.resolve_path(path)
    additions: list[CommitOperationAdd] = [pickle.loads(addition) for addition in pa.Table.from_batches(iterator, schema=pa.schema({"addition": pa.binary()}))[0].to_pylist()]
    num_commits = math.ceil(len(additions) / max_operations_per_commit)
    for i in range(0, num_commits):
        operations = additions[i * max_operations_per_commit : (i + 1) * max_operations_per_commit]
        filesystem._api.create_commit(
            repo_id=resolved_path.repo_id,
            repo_type=resolved_path.repo_type,
            revision=resolved_path.revision,
            operations=operations,
            commit_message="Upload using PySpark" + (f" (part {i:05d}-of-{num_commits:05d})" if num_commits > 1 else "")
        )
        yield pa.record_batch(
            {
                "path": [addition.path_in_repo for addition in operations],
            },
            schema=pa.schema({"path": pa.string()})
        )


def _rename(iterator: Iterator[pa.RecordBatch], path: str, filesystem: HfFileSystem, max_operations_per_commit=50) ->  Iterator[pa.RecordBatch]:
    resolved_path = filesystem.resolve_path(path)
    paths: list[str] = pa.Table.from_batches(iterator, schema=pa.schema({"path": pa.string()}))[0].to_pylist()
    new_paths = {path: path.split(".tmp/")[0] + f"part-{i:05d}.parquet" for i, path in enumerate(paths)}
    num_commits = math.ceil(len(paths) / max_operations_per_commit)
    for i in range(0, num_commits):
        filesystem._api.create_commit(
            repo_id = resolved_path.repo_id,
            revision = resolved_path.revision,
            repo_type=resolved_path.repo_type,
            operations=[
                CommitOperationCopy(src_path_in_repo=path, path_in_repo=new_path)
                for path, new_path in new_paths.items()
            ] + [
                CommitOperationDelete(path_in_repo=path)
                for path in paths
            ],
            commit_message="Rename files" + (f" (part {i:05d}-of-{num_commits:05d})" if num_commits > 1 else "")
        )
        yield pa.record_batch(
                {
                    "path": list(new_paths.values()),
                },
                schema=pa.schema({"path": pa.string()})
            )


def write_parquet(df: DataFrame, path: str, **kwargs) -> None:
    """
    Write Parquet files to Hugging Face using PyArrow.

    It uploads Parquet files in a distributed manner in three steps:

    1. Preupload the Parquet files in parallel in a distributed banner
    2. Commit the preuploaded files
    3. Rename the files to their final names

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
        df.coalesce(1).mapInArrow(
            partial(_write_single, path=path, schema=to_arrow_schema(df.schema), filesystem=filesystem, **kwargs),
            from_arrow_schema(pa.schema({"path": pa.binary()})),
        ).collect()
    else:
        df.mapInArrow(
            partial(_preupload, path=path, schema=to_arrow_schema(df.schema), filesystem=filesystem, **kwargs),
            from_arrow_schema(pa.schema({"addition": pa.binary()})),
        ).coalesce(1).mapInArrow(
            partial(_commit, path=path, filesystem=filesystem),
            from_arrow_schema(pa.schema({"path": pa.string()})),
        ).coalesce(1).mapInArrow(
            partial(_rename, path=path, filesystem=filesystem),
            from_arrow_schema(pa.schema({"path": pa.string()})),
        ).collect()
```

Here is how we can use this function to write a the filtered version of the [BAAI/Infinity-Instruct](https://huggingface.co/datasets/BAAI/Infinity-Instruct) dataset back to Hugging Face.

First you need to [create a dataset repository](https://huggingface.co/new-dataset), e.g. `username/Infinity-Instruct-Chinese-Only` (you can set it to private if you want).
Then, make sure you are authenticated and you can run:

```python
write_parquet(df_chinese_only, "hf://datasets/username/Infinity-Instruct-Chinese-Only")
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
