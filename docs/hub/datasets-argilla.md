# Argilla

Argilla is a collaboration tool for AI engineers and domain experts who need high-quality outputs, full data ownership, and overall efficiency in their work.

![image](https://github.com/user-attachments/assets/0e6ce1d8-65ca-4211-b4ba-5182f88168a0)

Whether you are working on monitoring and improving complex generative tasks involving LLM pipelines with RAG, or you are working on a predictive task for things like AB-testing of span- and text-classification models. Our versatile tool helps you ensure your data work pays off. We help you improve your AI output quality through data quality, take control of your data and models, and improve efficiency by quickly iterating on the right data and models.

## What do people build with Argilla?

Our community uses Argilla to create amazing open-source [datasets](https://huggingface.co/datasets?other=argilla) and [models](https://huggingface.co/models?other=distilabel). 

### Open-source datasets and models

**We love contributions to open-source** ourselves too.

- Our [cleaned UltraFeedback dataset](https://huggingface.co/datasets/argilla/ultrafeedback-binarized-preferences-cleaned) and the [Notus](https://huggingface.co/argilla/notus-7b-v1) and [Notux](https://huggingface.co/argilla/notux-8x7b-v1) models, where we improved benchmark and empirical human judgment for the Mistral and Mixtral models with cleaner data using **human feedback**.
- Our [distilabeled Intel Orca DPO dataset](https://huggingface.co/datasets/argilla/distilabel-intel-orca-dpo-pairs) and the [improved OpenHermes model](https://huggingface.co/argilla/distilabeled-OpenHermes-2.5-Mistral-7B), show how we improve model performance by filtering out 50% of the original dataset through **human and AI feedback**.

### Internal Use cases

AI teams from companies like [the Red Cross](https://510.global/), [Loris.ai](https://loris.ai/) and [Prolific](https://www.prolific.com/) use Argilla to **improve the quality and efficiency of AI** projects. They shared their experiences in our [AI community meetup](https://lu.ma/embed-checkout/evt-IQtRiSuXZCIW6FB).

- AI for good: [the Red Cross presentation](https://youtu.be/ZsCqrAhzkFU?feature=shared) showcases **how their experts and AI team collaborate** by classifying and redirecting requests from refugees of the Ukrainian crisis to streamline the support processes of the Red Cross.
- Customer support: during [the Loris meetup](https://youtu.be/jWrtgf2w4VU?feature=shared) they showed how their AI team uses unsupervised and few-shot contrastive learning to help them **quickly validate and gain labelled samples for a huge amount of multi-label classifiers**.
- Research studies: [the showcase from Prolific](https://youtu.be/ePDlhIxnuAs?feature=shared) announced their integration with our platform. They use it to actively **distribute data collection projects** among their annotating workforce. This allows them to quickly and **efficiently collect high-quality data** for their research studies.

## Importing and exporting datasets and records

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

### With or without records
    
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

The `rg.Dataset.from_hub` method loads the configuration and records from the dataset repo. If you only want to load records, you can pass a `datasets.Dataset` object to the `rg.Dataset.log` method. This enables you to configure your own dataset and reuse existing Hub datasets. 

### With or without records

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

- [🚀 Argilla Docs](https://argilla-io.github.io/argilla/)
- [🚀 Argilla Docs - import export guides](https://argilla-io.github.io/argilla/latest/how_to_guides/import_export/)
