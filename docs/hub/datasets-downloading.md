# Downloading datasets

## Integrated libraries

If a dataset on the Hub is tied to a [supported library](./datasets-libraries), loading the dataset can be done in just a few lines. For information on accessing the dataset, you can click on the "Use in _Library_" button on the dataset page to see how to do so. For example, `samsum` shows how to do so with 🤗 Datasets below. 

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-usage.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-usage-dark.png"/>
</div>

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-usage-modal.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-usage-modal-dark.png"/>
</div>

## Using the Hugging Face Client Library

You can use the [`huggingface_hub`](https://github.com/huggingface/huggingface_hub) library to create, delete, update and retrieve information from repos. You can also download files from repos or integrate them into your library! For example, you can quickly load a CSV dataset with a few lines using Pandas.

```py
from huggingface_hub import hf_hub_download
import pandas as pd

REPO_ID = "YOUR_REPO_ID"
FILENAME = "data.csv"

dataset = pd.read_csv(
    hf_hub_download(repo_id=REPO_ID, filename=FILENAME)
)
```

## Using Git

Since all datasets on the dataset Hub are Git repositories, you can clone the datasets locally by running:

```bash
git lfs install
git clone git@hf.co:datasets/<dataset ID> # example: git clone git@hf.co:datasets/allenai/c4
```

If you have write-access to the particular dataset repo, you'll also have the ability to commit and push revisions to the dataset.

Add your SSH public key to [your user settings](https://huggingface.co/settings/keys) to push changes and/or access private repos.
