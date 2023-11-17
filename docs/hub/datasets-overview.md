# Datasets Overview

## Datasets on the Hub

The Hugging Face Hub hosts a [large number of community-curated datasets](https://huggingface.co/datasets) for a diverse range of tasks such as translation, automatic speech recognition, and image classification. Alongside the information contained in the [dataset card](./datasets-cards), many datasets, such as [GLUE](https://huggingface.co/datasets/glue), include a [Dataset Viewer](./datasets-viewer) to showcase the data.

Each dataset is a [Git repository](./repositories), equipped with the necessary scripts to download the data and generate splits for training, evaluation, and testing. For information on how a dataset repository is structured, refer to the [Data files Configuration page](./datasets-data-files-configuration). Following the supported repo structure will ensure that the dataset page on the Hub will have a Viewer.

## Search for datasets

Like models and spaces, you can search the Hub for datasets using the search bar in the top navigation or on the [main datasets page](https://huggingface.co/datasets). There's a large number of languages, tasks, and licenses that you can use to filter your results to find a dataset that's right for you.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-main.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-main-dark.png"/>
</div>

## Privacy

Since datasets are repositories, you can [toggle their visibility between private and public](./repositories-settings#private-repositories) through the Settings tab. If a dataset is owned by an [organization](./organizations), the privacy settings apply to all the members of the organization.
