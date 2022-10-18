# Dataset Cards

Each dataset may be documented by the `README.md` file in the repository. This file is called a **dataset card**, and the Hugging Face Hub will render its contents on the dataset's main page. To inform users about how to responsibly use the data, it's a good idea to include information about any potential biases within the dataset. Generally, dataset cards help users understand the contents of the dataset and give context for how the dataset should be used.

You can also add dataset metadata to your card. The metadata describes important information about a dataset such as its license, language, and size. It also contains tags to help users discover a dataset on the Hub. Tags are defined in a YAML metadata section at the top of the `README.md` file. Supported tags include:

```yaml
tags: List[str]
annotations_creators: List[str]
language_creators: List[str]
language: List[str]
language_details: Optional[str]
license: Union[str, List[str]]
license_details: str
pretty_name: str
size_categories: List[str]
source_datasets: List[str]
task_categories: List[str]
task_ids: List[str]
paperswithcode_id: Optional[str]
train-eval-index: List[Dict]
configs: List[str]
extra_gated_fields: Dict
extra_gated_prompt: str
```

Use the [Dataset Metadata Creator](https://huggingface.co/spaces/huggingface/datasets-tagging) to help you generate the appropriate metadata. For a step-by-step guide on creating a dataset card, check out the [Create a dataset card](https://huggingface.co/docs/datasets/dataset_card) guide.

Reading through existing dataset cards, such as the [ELI5 dataset card](https://github.com/huggingface/datasets/blob/main/datasets/eli5/README.md), is a great way to familiarize yourself with the common conventions.
