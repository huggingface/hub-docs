# Argilla

Argilla is a collaboration tool for AI engineers and domain experts who need to build high quality datasets for their projects.

![image](https://github.com/user-attachments/assets/0e6ce1d8-65ca-4211-b4ba-5182f88168a0)

Argilla can be used for collecting human feedback for a wide variety of AI projects like traditional NLP (text classification, NER, etc.), LLMs (RAG, preference tuning, etc.), or multimodal models (text to image, etc.). Argilla's programmatic approach lets you build workflows for continuous evaluation and model improvement. The goal of Argilla is to ensure your data work pays off by quickly iterating on the right data and models.

## What do people build with Argilla?

The community uses Argilla to create amazing open-source [datasets](https://huggingface.co/datasets?library=library:argilla&sort=trending) and [models](https://huggingface.co/models?other=distilabel). 

### Open-source datasets and models

Argilla contributed some models and datasets to open-source too.

- [Cleaned UltraFeedback dataset](https://huggingface.co/datasets/argilla/ultrafeedback-binarized-preferences-cleaned) used to fine tune the [Notus](https://huggingface.co/argilla/notus-7b-v1) and [Notux](https://huggingface.co/argilla/notux-8x7b-v1) models. The original UltraFeedback dataset was curated using Argilla UI filters to find and report a bug in the original data generation code. Based on this data curation process, Argilla built this new version of the UltraFeedback dataset and fine-tuned Notus, outperforming Zephyr on several benchmarks.
- [distilabeled Intel Orca DPO dataset](https://huggingface.co/datasets/argilla/distilabel-intel-orca-dpo-pairs) used to fine tune the [improved OpenHermes model](https://huggingface.co/argilla/distilabeled-OpenHermes-2.5-Mistral-7B). This dataset was built combining Argilla human curation with distilabel, leading to an improved version of the Intel Orca dataset and outperforming models fine tuned on the original dataset.

### Examples Use cases

AI teams from companies like [the Red Cross](https://510.global/), [Loris.ai](https://loris.ai/) and [Prolific](https://www.prolific.com/) use Argilla to improve the quality and efficiency of AI projects. They shared their experiences in our [AI community meetup](https://lu.ma/embed-checkout/evt-IQtRiSuXZCIW6FB).

- AI for good: [the Red Cross presentation](https://youtu.be/ZsCqrAhzkFU?feature=shared) showcases how the Red Cross domain experts and AI team collaborated by classifying and redirecting requests from refugees of the Ukrainian crisis to streamline the support processes of the Red Cross.
- Customer support: during [the Loris meetup](https://youtu.be/jWrtgf2w4VU?feature=shared) they showed how their AI team uses unsupervised and few-shot contrastive learning to help them quickly validate and gain labelled samples for a huge amount of multi-label classifiers.
- Research studies: [the showcase from Prolific](https://youtu.be/ePDlhIxnuAs?feature=shared) announced their integration with our platform. They use it to actively distribute data collection projects among their annotating workforce. This allows Prolific to quickly and efficiently collect high-quality data for research studies.

## Prerequisites

First [login with your Hugging Face account](../huggingface_hub/quick-start#login):

```bash
huggingface-cli login
```

Make sure you have `argilla>=2.0.0` installed:

```bash
pip install -U argilla
```

Lastly, you will need to deploy the Argilla server and UI, which can be done [easily on the Hugging Face Hub](https://argilla-io.github.io/argilla/latest/getting_started/quickstart/#run-the-argilla-server).

## Importing and exporting datasets and records

This guide shows how to import and export your dataset to the Hugging Face Hub.

In Argilla, you can import/export two main components of a dataset:
- The dataset's complete configuration defined in `rg.Settings`. This is useful if your want to share your feedback task or restore it later in Argilla.
- The records stored in the dataset, including `Metadata`, `Vectors`, `Suggestions`, and `Responses`. This is useful if you want to use your dataset's records outside of Argilla.

### Push an Argilla dataset to the Hugging Face Hub

You can push a dataset from Argilla to the Hugging Face Hub. This is useful if you want to share your dataset with the community or version control it. You can push the dataset to the Hugging Face Hub using the `rg.Dataset.to_hub` method.

```python
import argilla as rg

client = rg.Argilla(api_url="<api_url>", api_key="<api_key>")
dataset = client.datasets(name="my_dataset")
dataset.to_hub(repo_id="<repo_id>")
```

#### With or without records
    
The example above will push the dataset's `Settings` and records to the hub. If you only want to push the dataset's configuration, you can set the `with_records` parameter to `False`. This is useful if you're just interested in a specific dataset template or you want to make changes in the dataset settings and/or records.

```python
dataset.to_hub(repo_id="<repo_id>", with_records=False)
```

### Pull an Argilla dataset from the Hugging Face Hub

You can pull a dataset from the Hugging Face Hub to Argilla. This is useful if you want to restore a dataset and its configuration. You can pull the dataset from the Hugging Face Hub using the `rg.Dataset.from_hub` method.

```python

import argilla as rg

client = rg.Argilla(api_url="<api_url>", api_key="<api_key>")
dataset = rg.Dataset.from_hub(repo_id="<repo_id>")
```

The `rg.Dataset.from_hub` method loads the configuration and records from the dataset repo. If you only want to load records, you can pass a `datasets.Dataset` object to the `rg.Dataset.log` method. This enables you to configure your own dataset and reuse existing Hub datasets. 

#### With or without records

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
