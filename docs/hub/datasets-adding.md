# Adding new datasets

Any Hugging Face user can create a dataset! You can start by [creating your dataset repository](https://huggingface.co/new-dataset) and choosing one of the following methods to upload your dataset:

* [Add files manually to the repository through the UI](https://huggingface.co/docs/datasets/upload_dataset#upload-your-files)
* [Push files with the `push_to_hub` method from 🤗 Datasets](https://huggingface.co/docs/datasets/upload_dataset#upload-from-python)
* [Use Git to commit and push your dataset files](https://huggingface.co/docs/datasets/share#clone-the-repository)

While in many cases it's possible to just add raw data to your dataset repo in any supported formats (JSON, CSV, Parquet, text, images, audio files, …), for some large datasets you may want to [create a loading script](https://huggingface.co/docs/datasets/dataset_script#create-a-dataset-loading-script). This script defines the different configurations and splits of your dataset, as well as how to download and process the data.

## Datasets outside a namespace

Datasets outside a namespace are maintained by the Hugging Face team. Unlike the naming convention used for community datasets (`username/dataset_name` or `org/dataset_name`), datasets outside a namespace can be referenced directly by their name (e.g. [`glue`](https://huggingface.co/datasets/glue)). If you find that an improvement is needed, use their "Community" tab to open a discussion or submit a PR on the Hub to propose edits.