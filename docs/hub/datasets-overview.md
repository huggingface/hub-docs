---
title: Datasets Overview
---

<h1>Datasets Overview</h1>

## Datasets on the Hub

In service of being the one-stop-shop for all your Machine Learning needs, the Hugging Face Hub hosts a [large number of community-curated datasets](https://huggingface.co/datasets) for a diverse range of tasks. Alongside the information contained in the [dataset card](./datasets-cards), many datasets, such as [Glue](https://huggingface.co/datasets/glue), include a Dataset Preview to showcase the data. There is also a handy [Datasets Viewer](https://huggingface.co/datasets/viewer/) for more in-depth exploration.

Each dataset is a [Git repository](./repositories-main), equipped with the necessary scripts to download the data and generate splits for training, evaluation, and testing. For information on how a dataset repository is structured, refer to the [🤗 Datasets guides](https://huggingface.co/docs/datasets/repository_structure).

## Searching for datasets

Like models and Spaces, you can search the Hub for datasets using the search bar in the top navigation, or on the [main datasets page](https://huggingface.co/datasets). There's a large number of languages, tasks, and licenses that you can use to filter your results to find a dataset that's right for you.

![Datasets search page on the Hugging Face Hub](/docs/assets/hub/datasets-main.png)

## Privacy

Since datasets are repositories, you can [toggle their visibility between private and public](./repositories-best-practices) through the Settings tab. If a dataset is owned by an [organization](TODO), the privacy settings will apply to all the members of the organization.

## Gated datasets

To give dataset creators more control over how their datasets are used, the Hub allows users to enable **User Access requests** through a dataset's **Settings** tab. Enabling this setting will ensure that users must perform an extra manual step and agree to share their contact information in order to access the dataset. Hugging Face will keep track of the users who access the dataset, which the dataset creators are able to download.

![A gated Dataset showing the User Access request dialog](/docs/assets/hub/datasets-gated.png)

The User Access request dialog can be modified to include additional text and checkbox fields in the prompt. To do this, add a YAML section to the dataset's `README.md` file (create one if it does not already exist) and add an `extra_gated_fields` property defining the extra field. Within that property, you'll be able to add as many custom fields as you like, labelling them as `text` or `checkbox` fields.

```
---
extra_gated_fields:
 Company: text
 Country: text
 I agree to use this model for non-commerical use ONLY: checkbox
---
```

The `README.md` file for a dataset is called a [Dataset Card](./datasets-cards). Visit the documentation to learn more about how to use it and to see the properties that you can configure.