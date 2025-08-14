# Libraries

The Datasets Hub has support for several libraries in the Open Source ecosystem.
Thanks to the [huggingface_hub Python library](/docs/huggingface_hub), it's easy to enable sharing your datasets on the Hub.
We're happy to welcome to the Hub a set of Open Source libraries that are pushing Machine Learning forward.

The table below summarizes the supported libraries and their level of integration.

| Library                             | Description                                                                                                                    | Download from Hub | Push to Hub |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ----------------- | ----------- |
| [Argilla](./datasets-argilla)       | Collaboration tool for AI engineers and domain experts that value high quality data.                                           | ✅                | ✅          |
| [Dask](./datasets-dask)             | Parallel and distributed computing library that scales the existing Python and PyData ecosystem.                               | ✅                | ✅          |
| [Datasets](./datasets-usage)        | 🤗 Datasets is a library for accessing and sharing datasets for Audio, Computer Vision, and Natural Language Processing (NLP). | ✅                | ✅          |
| [Distilabel](./datasets-distilabel) | The framework for synthetic data generation and AI feedback.                                                                   | ✅                | ✅          |
| [DuckDB](./datasets-duckdb)         | In-process SQL OLAP database management system.                                                                                | ✅                | ✅          |
| [Embedding Atlas](./datasets-embedding-atlas) | Interactive visualization and exploration tool for large embeddings.                                                     | ✅                | ❌          |
| [FiftyOne](./datasets-fiftyone)     | FiftyOne is a library for curation and visualization of image, video, and 3D data.                                             | ✅                | ✅          |
| [Pandas](./datasets-pandas)         | Python data analysis toolkit.                                                                                                  | ✅                | ✅          |
| [Polars](./datasets-polars)         | A DataFrame library on top of an OLAP query engine.                                                                            | ✅                | ✅          |
| [PyArrow](./datasets-pyarrow)       | Apache Arrow is a columnar format and a toolbox for fast data interchange and in-memory analytics.                             | ✅                | ✅          |
| [Spark](./datasets-spark)           | Real-time, large-scale data processing tool in a distributed environment.                                                      | ✅                | ✅          |
| [WebDataset](./datasets-webdataset) | Library to write I/O pipelines for large datasets.                                                                             | ✅                | ❌          |

## Integrating data libraries and tools with the Hub

This guide is designed for developers and maintainers of data libraries and tools who want to integrate with the Hugging Face Hub. Whether you're building a data processing library, analysis tool, or any software that needs to interact with datasets, this documentation will help you implement a Hub integration.

The guide covers:

- Possible approaches to loading data from the Hub into your library/tool
- Possible approaches to uploading data from your library/tool to the Hub

### Loading data from the Hub

If you have a library for working with data, it can be helpful for your users to load data from the Hub.

In general, we suggest relying on an existing library like `datasets`, `pandas` or `polars` to do this unless you have a specific reason to implement your own. If you require more control over the loading process, you can use the `huggingface_hub` library, which will allow you, for example, to download a specific subset of files from a repository.

You can find more information about loading data from the Hub [here](https://huggingface.co/docs/hub/datasets-downloading).

#### Integrating via the Dataset Viewer and Parquet Files

The Hub's dataset viewer and Parquet conversion system provide a standardized way to integrate with datasets, regardless of their original format. This infrastructure is a reliable integration layer between the Hub and external libraries.

If the dataset is not already in Parquet, the Hub automatically converts the first 5GB of every dataset to Parquet format to power the dataset viewer and provide consistent access patterns. This standardization offers several benefits for library integrations:

- Consistent data access patterns regardless of original format
- Built-in dataset preview and exploration through the Hub's dataset viewer. The dataset viewer can also be embedded as an iframe in your applications, making it easy to provide rich dataset previews. For more information about embedding the viewer, see the [dataset viewer embedding documentation](https://huggingface.co/docs/hub/en/datasets-viewer-embed).
- Efficient columnar storage optimized for querying. For example, you could use a tool like [DuckDB](https://duckdb.org/) to query or filter for a specific subset of data.
- Parquet is well supported across the machine learning and data science ecosystem.

For more details on working with the Dataset Viewer API, see the [Dataset Viewer API documentation](https://huggingface.co/docs/dataset-viewer/index)

### Uploading data to the Hub

This section covers possible approaches for adding the ability to upload data to the Hub in your library, i.e. how to implement a `push_to_hub` method.

This guide will cover three primary ways to upload data to the Hub:

- using the `datasets` library and the `push_to_hub` method
- using `pandas` to write to the Hub
- using the `huggingface_hub` library and the `hf_hub_download` method
- directly using the API or Git LFS

#### Use the `datasets` library

The most straightforward approach to pushing data to the Hub is to rely on the existing [`push_to_hub`](https://huggingface.co/docs/datasets/v3.2.0/en/package_reference/main_classes#datasets.Dataset.push_to_hub) method from the `datasets` library. The `push_to_hub` method will automatically handle:

- the creation of the repository
- the conversion of the dataset to Parquet
- chunking the dataset into suitable parts
- uploading the data

For example, if you have a synthetic data generation library that returns a list of dictionaries, you could simply do the following:

```python
from datasets import Dataset

data = [{"prompt": "Write a cake recipe", "response": "Measure 1 cup ..."}]
ds = Dataset.from_list(data)
ds.push_to_hub("USERNAME_OR_ORG/repo_ID")
```

Examples of this kind of integration:

- [Distilabel](https://github.com/argilla-io/distilabel/blob/8ad48387dfa4d7bd5639065661f1975dcb44c16a/src/distilabel/distiset.py#L77)

#### Rely on an existing libraries integration with the Hub

Polars, Pandas, Dask, Spark and DuckDB all can write to a Hugging Face Hub repository. See [datasets libraries](https://huggingface.co/docs/hub/datasets-libraries) for more details.

If you are already using one of these libraries in your code, adding the ability to push to the Hub is straightforward. For example, if you have a synthetic data generation library that can return a Pandas DataFrame, here is the code you would need to write to the Hub:

```python
from huggingface_hub import HfApi

# Initialize the Hub API
hf_api = HfApi(token=os.getenv("HF_TOKEN"))

# Create a repository (if it doesn't exist)
hf_api.create_repo(repo_id="username/my-dataset", repo_type="dataset")

# Convert your data to a DataFrame and save directly to the Hub
df.to_parquet("hf://datasets/username/my-dataset/data.parquet")
```

#### Using the huggingface_hub Python library

The `huggingface_hub` Python library offers a more flexible approach to uploading data to the Hub. The library allows you to upload specific files or subsets of files to a repository. This is useful if you have a large dataset that you don't want to convert to Parquet, want to upload a specific subset of files, or want more control over the repo structure.

Depending on your use case, you can upload a file or folder at a specific point in your code, i.e., export annotations from a tool to the Hub when a user clicks "push to Hub". For example,

```python
from huggingface_hub import HfApi
api = HfApi(token=HF_TOKEN)

api.upload_folder(
    folder_path="/my-cool-library/data-folder",
    repo_id="username/my-cool-space",
    repo_type="dataset",
    commit_message="Push annotations to Hub"
    allow_patterns="*.jsonl",
)
```

You can find more information about ways to upload data to the Hub [here](https://huggingface.co/docs/huggingface_hub/main/en/guides/upload).

Alternatively, there are situations where you may want to upload data in the background, for example, synthetic data being generated every 10 minutes. In this case you can use the `scheduled_uploads` feature of the `huggingface_hub` library. For more details, see the [scheduled uploads documentation](https://huggingface.co/docs/huggingface_hub/main/en/guides/upload#scheduled-uploads).

You can see an example of using this approach to upload data to the Hub in

- The [fastdata](https://github.com/AnswerDotAI/fastdata/blob/main/nbs/00_core.ipynb) library
- This [magpie](https://huggingface.co/spaces/davanstrien/magpie/blob/fc79672c740b8d3d098378dca37c0f191c208de0/app.py#L67) Demo Space

## More support

For technical questions about integration, feel free to contact the datasets team at datasets@huggingface.co.
