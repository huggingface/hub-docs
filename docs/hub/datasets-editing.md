# Editing datasets

The [Hub](https://huggingface.co/datasets) enables collaborative curation of community and research datasets. We encourage you to explore the datasets available on the Hub and contribute to their improvement to help grow the ML community and accelerate progress for everyone. All contributions are welcome!

Start by [creating a Hugging Face Hub account](https://huggingface.co/join) if you don't have one yet.

## Edit using the Hub UI

> [!WARNING]
> This feature is only available for CSV datasets for now.

The Hub's web interface allows users without any developer experience to edit a dataset.

Open the dataset page and navigate to the **Data Studio** tab to begin editing.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-edit/data_studio_button-min.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-edit/data_studio_button_dark-min.png"/>
</div>

Click on **Toggle edit mode** to enable dataset editing.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-edit/toggle_edit_button-min.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-edit/toggle_edit_button_dark-min.png"/>
</div>

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-edit/edit_cell_button-min.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-edit/edit_cell_button_dark-min.png"/>
</div>

Edit as many cells as you want and finally click **Commit** to commit your changes and leave a commit message.


<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-edit/commit_button-min.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-edit/commit_button_dark-min.png"/>
</div>

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-edit/commit_message-min.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-edit/commit_message_dark-min.png"/>
</div>

## Using the `huggingface_hub` client library

The rich feature set in the `huggingface_hub` library allows you to manage repositories, including editing dataset files on the Hub. Visit [the client library's documentation](/docs/huggingface_hub/index) to learn more.

## Integrated libraries

If a dataset on the Hub is tied to a [supported library](./datasets-libraries), loading the dataset, editing, and pushing your changes can be done in just a few lines. For information on accessing the dataset, you can click on the "Use this dataset" button on the dataset page to see how to do so.

For example, [`samsum`](https://huggingface.co/datasets/knkarthick/samsum?library=datasets) shows how to do so with 🤗 Datasets below.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-usage.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-usage-dark.png"/>
</div>

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-usage-modal.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-usage-modal-dark.png"/>
</div>

### Only upload the new data

Hugging Face's storage is powered by [Xet](https://huggingface.co/docs/hub/en/xet), which uses chunk deduplication to make uploads more efficient.
Unlike regular cloud storage, Xet doesn't require files to be entirely reuploaded to commit changes.
Instead, it automatically detects which parts of the dataset have changed and instructs the client library only to upload the updated parts.
To do that, Xet uses a smart algorithm to find chunks of 64kB that already exist on Hugging Face.

Here is how it works with Pandas:

```python
import pandas as pd

# Load the dataset
df = pd.read_csv(f"hf://datasets/{repo_id}/data.csv")

# Edit the dataset
# df = df.apply(...)

# Commit the changes
df.to_csv(f"hf://datasets/{repo_id}/data.csv")
```

This code first loads a dataset and then edits it.
Once the edits are done, `to_csv()` materializes the file in memory, chunks it, asks Xet which chunks are already on Hugging Face and which chunks have changed, and then uploads only the new data.

### Optimized Parquet editing

Therefore the amount of data to reupload depends on the edits and the file structure.

The Parquet format is columnar and compressed at the page level (pages are around ~1MB).
We optimized Parquet for Xet with [Parquet Content Defined Chunking](https://huggingface.co/blog/parquet-cdc), which ensures unchanged data generally result in unchanged pages.

Check out if your library supports optimized Parquet in the [supported libraries](./datasets-libraries) page.

### Streaming

Libraries with dataset streaming features for end-to-end streaming pipelines are recommended for big datasets.
In this case, the dataset processing runs progressively as the old data arrives and the new data is uploaded to the Hub.

Check out if your library supports streaming in the [supported libraries](./datasets-libraries) page.
