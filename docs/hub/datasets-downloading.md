# Downloading datasets

## Integrated libraries

If a dataset on the Hub is tied to a [supported library](./datasets-libraries), loading the dataset can be done in just a few lines. For information on accessing the dataset, you can click on the "Use this dataset" button on the dataset page to see how to do so. For example, [`samsum`](https://huggingface.co/datasets/Samsung/samsum?library=datasets) shows how to do so with 🤗 Datasets below.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-usage.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-usage-dark.png"/>
</div>

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-usage-modal.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-usage-modal-dark.png"/>
</div>

## Using the Hugging Face Client Library

You can use the [`huggingface_hub`](/docs/huggingface_hub) library to create, delete, update and retrieve information from repos. For example, to download the `HuggingFaceH4/ultrachat_200k` dataset from the command line, run

```bash
huggingface-cli download HuggingFaceH4/ultrachat_200k --repo-type dataset
```

See the [huggingface-cli download documentation](https://huggingface.co/docs/huggingface_hub/en/guides/cli#download-a-dataset-or-a-space) for more information.

You can also integrate this into your own library! For example, you can quickly load a CSV dataset with a few lines using Pandas.
```py
from huggingface_hub import hf_hub_download
import pandas as pd

REPO_ID = "YOUR_REPO_ID"
FILENAME = "data.csv"

dataset = pd.read_csv(
    hf_hub_download(repo_id=REPO_ID, filename=FILENAME, repo_type="dataset")
)
```

## Using Git

Since all datasets on the Hub are Git repositories, you can clone the datasets locally by running:

```bash
git lfs install
git clone git@hf.co:datasets/<dataset ID> # example: git clone git@hf.co:datasets/allenai/c4
```

If you have write-access to the particular dataset repo, you'll also have the ability to commit and push revisions to the dataset.

Add your SSH public key to [your user settings](https://huggingface.co/settings/keys) to push changes and/or access private repos.
