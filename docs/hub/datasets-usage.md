# Using 🤗 Datasets

Once you've found an interesting dataset on the Hugging Face Hub, you can load the dataset using 🤗 Datasets. You can click on the **Use in dataset library** button to copy the code to load a dataset.

Some datasets on the Hub contain a [loading script](https://huggingface.co/docs/datasets/dataset_script), which allows you to easily [load the dataset when you need it](https://huggingface.co/docs/datasets/load_hub).

Many datasets however do not need to include a loading script, for instance when their data is stored directly in the repository in formats such as CSV, JSON and Parquet. 🤗 Datasets can [load those kinds of datasets](https://huggingface.co/docs/datasets/loading#hugging-face-hub) automatically without a loading script.

For more information about using 🤗 Datasets, check out the [tutorials](https://huggingface.co/docs/datasets/tutorial) and [how-to guides](https://huggingface.co/docs/datasets/how_to) available in the 🤗 Datasets documentation.