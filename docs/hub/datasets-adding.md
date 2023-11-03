# Adding a new dataset

The [Hub](https://huggingface.co/datasets) is home to an extensive collection of community-curated and popular research datasets. We encourage you to share your dataset to the Hub to help grow the ML community and accelerate progress for everyone. All contributions are welcome; adding a dataset is just a drag and drop away!

Start by [creating a Hugging Face Hub account](https://huggingface.co/join) if you don't have one yet.

## Upload with the Hub UI

The Hub's web-based interface allows users without any developer experience to upload a dataset.

### Create a repository

A repository hosts all your dataset files, including the revision history, making storing more than one dataset version possible.

1. Click on your profile and select **New Dataset** to create a [new dataset repository](https://huggingface.co/new-dataset). 
2. Pick a name for your dataset, and choose whether it is a public or private dataset. A public dataset is visible to anyone, whereas a private dataset can only be viewed by you or members of your organization.

<div class="flex justify-center">
    <img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/datasets/create_repo.png"/>
</div>

### Upload dataset

1. Once you've created a repository, navigate to the **Files and versions** tab to add a file. Select **Add file** to upload your dataset files. We support many text, audio, and image data extensions such as `.csv`, `.mp3`, and `.jpg` among many others.

<div class="flex justify-center">
    <img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/datasets/upload_files.png"/>
</div>

2. Drag and drop your dataset files.

<div class="flex justify-center">
    <img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/datasets/commit_files.png"/>
</div>

3. After uploading your dataset files, they are stored in your dataset repository.

<div class="flex justify-center">
    <img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/datasets/files_stored.png"/>
</div>

### Create a Dataset card

Adding a Dataset card is super valuable for helping users find your dataset and understand how to use it responsibly.

1. Click on **Create Dataset Card** to create a Dataset card. This button creates a `README.md` file in your repository.

<div class="flex justify-center">
    <img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/datasets/dataset_card.png"/>
</div>

2. At the top, you'll see the **Metadata UI** with several fields to select from such as license, language, and task categories. These are the most important tags for helping users discover your dataset on the Hub (when applicable). When you select an option for a field, it will be automatically added to the top of the dataset card.

    You can also look at the [Dataset Card specifications](https://github.com/huggingface/hub-docs/blob/main/datasetcard.md?plain=1), which has a complete set of (but not required) tag options like `annotations_creators`, to help you choose the appropriate tags.

<div class="flex justify-center">
    <img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/datasets/metadata_ui.png"/>
</div>

3. Write your dataset documentation in the Dataset Card to introduce your dataset to the community and help users understand how to use it.

    You can click on the **Import dataset card template** link at the top of the editor to automatically create a dataset card template. For a detailed example of what a good Dataset card should look like, take a look at the [CNN DailyMail Dataset card](https://huggingface.co/datasets/cnn_dailymail).

### Dataset Viewer

The [Dataset Viewer](./datasets-viewer) is crucial to know what the data actually look like.
It is generally enabled by default for any dataset, depending on the dataset structure.

Make sure the Dataset Viewer correctly shows your data, or [Configure the Dataset Viewer](./datasets-viewer-configure).

## Using the `huggingface_hub` client library

The rich features set in the `huggingface_hub` library allows you to manage repositories, including creating repos and uploading datasets to the Model Hub. Visit [the client library's documentation](https://huggingface.co/docs/huggingface_hub/index) to learn more.

## Using other libraries

Some libraries [🤗 Datasets](https://huggingface.co/docs/datasets/index), [Pandas](https://pandas.pydata.org/), [Dask](https://www.dask.org/) or [DuckDB](https://duckdb.org/) can upload files to the Hub.
See the list of [Libraries supported by the Datasets Hub](./datasets-libraries.md) for more information.

## Using Git

Since dataset repos are just Git repositories, you can use Git to push your data files to the Hub. Follow the guide on [Getting Started with Repositories](repositories-getting-started) to learn about using the `git` CLI to commit and push your datasets.
