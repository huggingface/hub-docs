# Dataset Cards

Each dataset may be documented by the `README.md` file in the repository. This file is called a **dataset card**, and the Hugging Face Hub will render its contents on the dataset's main page. To inform users about how to responsibly use the data, it's a good idea to include information about any potential biases within the dataset. Generally, dataset cards help users understand the contents of the dataset and give context for how the dataset should be used. 

You can also add dataset tags to your card. Dataset tags describe important information about a dataset such as its license, language, and size. More importantly, the tags help users discover a dataset on the Hub. Tags are defined in a YAML section at the top of the `README.md` file. Supported tags include:

```yaml
annotations_creators: List[str]
language_creators: List[str]
language: List[str]
license: Union[str, List[str]]
license_details: str
multilinguality: List[str]
pretty_name: str
size_categories: List[str]
source_datasets: List[str]
task_categories: List[str]
task_ids: List[str]
paperswithcode_id: str
train-eval-index: List[Dict]
configs: List[str]
extra_gated_fields: Dict
extra_gated_prompt: str
```

Use the [Dataset Tagger](https://huggingface.co/spaces/huggingface/datasets-tagging) to help you create the appropriate tags.

The [Dataset Card Creation Guide](https://github.com/huggingface/datasets/blob/main/templates/README_guide.md) gives an overview of what components are found in a dataset card. The process for creating a new dataset card is outlined in the [Create a dataset card](https://huggingface.co/docs/datasets/dataset_card) guide. 

Reading through existing dataset cards, such as the [ELI5 dataset card](https://github.com/huggingface/datasets/blob/main/datasets/eli5/README.md), is a great way to familiarize yourself with the common conventions. There is also an [interactive dataset card builder](https://huggingface.co/datasets/card-creator/) that can guide you through creating your card.
