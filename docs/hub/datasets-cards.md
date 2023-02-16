# Dataset Cards

## What are Dataset Cards?

Each dataset may be documented by the `README.md` file in the repository. This file is called a **dataset card**, and the Hugging Face Hub will render its contents on the dataset's main page. To inform users about how to responsibly use the data, it's a good idea to include information about any potential biases within the dataset. Generally, dataset cards help users understand the contents of the dataset and give context for how the dataset should be used.

You can also add dataset metadata to your card. The metadata describes important information about a dataset such as its license, language, and size. It also contains tags to help users discover a dataset on the Hub. Tags are defined in a YAML metadata section at the top of the `README.md` file.

## Dataset card metadata

A dataset repo will render its README.md as a dataset card. To control how the Hub displays the card, you should create a YAML section in the README file to define some metadata. Start by adding three --- at the top, then include all of the relevant metadata, and close the section with another group of --- like the example below:

```yaml
language: 
- "List of ISO 639-1 code for your language"
- lang1
- lang2
pretty_name: "Pretty Name of the Dataset"
tags:
- tag1
- tag2
license: "any valid license identifier"
task_categories:
- task1
- task2
```

The metadata that you add to the dataset card enables certain interactions on the Hub. For example:

* Allow users to filter and discover datasets at https://huggingface.co/datasets.
* If you choose a license using the keywords listed in the right column of [this table](./repositories-licenses), the license will be displayed on the dataset page.

See the detailed dataset card metadata specification [here]((https://github.com/huggingface/hub-docs/blob/main/datasetcard.md?plain=1)).

Use the [Dataset Metadata Creator](https://huggingface.co/spaces/huggingface/datasets-tagging) to help you generate the appropriate metadata. For a step-by-step guide on creating a dataset card, check out the [Create a dataset card](https://huggingface.co/docs/datasets/dataset_card) guide.

Reading through existing dataset cards, such as the [ELI5 dataset card](https://huggingface.co/datasets/eli5/blob/main/README.md), is a great way to familiarize yourself with the common conventions.
