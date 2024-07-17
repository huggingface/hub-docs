# Argilla

Argilla is a collaboration platform for AI engineers and domain experts that require high-quality outputs, full data ownership, and overall efficiency.

# Importing and exporting datasets and records

This guide provides an overview of how to import and export your dataset or its records to the Hugging Face Hub.

In Argilla, you can import/export two main components of a dataset:
- The dataset's complete configuration defined in `rg.Settings`. This is useful if your want to share your feedback task or restore it later in Argilla.
- The records stored in the dataset, including `Metadata`, `Vectors`, `Suggestions`, and `Responses`. This is useful if you want to use your dataset's records outside of Argilla.

🚀 Try the Argilla 🤝 Hugging Face [deployment integration on Spaces](https://huggingface.co/docs/hub/en/spaces-sdks-docker-argilla)!

## Prerequisites

First [login with your Hugging Face account](../huggingface_hub/quick-start#login):

```bash
huggingface-cli login
```

Make sure you have `argilla>=2.0.0` installed:

```bash
pip install -U argilla
```

## Push an Argilla dataset to the Hugging Face Hub

You can push a dataset from Argilla to the Hugging Face Hub. This is useful if you want to share your dataset with the community or version control it. You can push the dataset to the Hugging Face Hub using the `rg.Dataset.to_hub` method.

```python
import argilla as rg

client = rg.Argilla(api_url="<api_url>", api_key="<api_key>")
dataset = client.datasets(name="my_dataset")
dataset.to_hub(repo_id="<repo_id>")
```

!!! note "With or without records"
    The example above will push the dataset's `Settings` and records to the hub. If you only want to push the dataset's configuration, you can set the `with_records` parameter to `False`. This is useful if you're just interested in a specific dataset template or you want to make changes in the dataset settings and/or records.

    ```python
    dataset.to_hub(repo_id="<repo_id>", with_records=False)
    ```

## Pull an Argilla dataset from the Hugging Face Hub

You can pull a dataset from the Hugging Face Hub to Argilla. This is useful if you want to restore a dataset and its configuration. You can pull the dataset from the Hugging Face Hub using the `rg.Dataset.from_hub` method.

```python

import argilla as rg

client = rg.Argilla(api_url="<api_url>", api_key="<api_key>")
dataset = rg.Dataset.from_hub(repo_id="<repo_id>")
```

The `rg.Dataset.from_hub` method loads the configuration and records from the dataset repo. If you only want to load records, you can pass a `datasets.Dataset` object to the `rg.Dataset.log` method. This enables you to configure your own dataset and reuse existing Hub datasets. See the [guide on records](record.md) for more information.

!!! note "With or without records"

    The example above will pull the dataset's `Settings` and records from the hub. If you only want to pull the dataset's configuration, you can set the `with_records` parameter to `False`. This is useful if you're just interested in a specific dataset template or you want to make changes in the dataset settings and/or records.

    ```python
    dataset = rg.Dataset.from_hub(repo_id="<repo_id>", with_records=False)
    ```

    With the dataset's configuration you could then make changes to the dataset. For example, you could adapt the dataset's settings for a different task:

    ```python
    dataset.settings.questions = [rg.TextQuestion(name="answer")]
    ```

    You could then log the dataset's records using the `load_dataset` method of the `datasets` package and pass the dataset to the `rg.Dataset.log` method.

    ```python
    hf_dataset = load_dataset("<repo_id>")
    dataset.log(hf_dataset)
    ```

## 📚 Resources

- [🚀 Argilla Docs](https://argilla-io.github.io/argilla/dev/)
