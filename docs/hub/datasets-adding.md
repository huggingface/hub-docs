---
title: Adding New Datasets
---

<h1>Adding New Datasets</h1>

There are two different kinds of datasets on the Hub: **community datasets** and **canonical datasets**.

## Community datasets

Any Hugging Face user can create a community dataset! You can start by [creating your dataset repository](https://huggingface.co/new-dataset). There are several ways to push to a dataset repository, so you can choose the method that works best for you:

* [Add files manually to the repository through the UI](https://huggingface.co/docs/datasets/upload_dataset#upload-your-files)
* [Push files with the `push_to_hub` method from 🤗 Datasets](https://huggingface.co/docs/datasets/upload_dataset#upload-from-python)
* [Use Git to commit and push your dataset files](https://huggingface.co/docs/datasets/share#clone-the-repository)

While it's possible to add raw data to your dataset repo in a number of formats (JSON, CSV, Parquet, text, and images), for large datasets you may want to [create a loading script](https://huggingface.co/docs/datasets/dataset_script#create-a-dataset-loading-script). This script defines the different configurations and splits of your dataset, as well as how to download and process the data.

## Canonical datasets

Canonical datasets are maintained by the Hugging Face team. Unlike the naming convention used for community datasets (`username/dataset_name` or `org/dataset_name`), canonical datasets can be referenced directly by their name (e.g. [`glue`](https://huggingface.co/datasets/glue)). If you find that an improvement is needed for a canonical dataset, refer to the [🤗 Datasets documentation] for an explanation on how to submit a PR on GitHub to propose edits.