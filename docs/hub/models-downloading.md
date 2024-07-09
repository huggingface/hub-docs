# Downloading models

## Integrated libraries

If a model on the Hub is tied to a [supported library](./models-libraries), loading the model can be done in just a few lines. For information on accessing the model, you can click on the "Use in _Library_" button on the model page to see how to do so. For example, `distilbert/distilgpt2` shows how to do so with 🤗 Transformers below.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/models-usage.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/models-usage-dark.png"/>
</div>

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/models-usage-modal.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/models-usage-modal-dark.png"/>
</div>

## Using the Hugging Face Client Library

You can use the [`huggingface_hub`](https://github.com/huggingface/huggingface_hub) library to create, delete, update and retrieve information from repos. You can also download files from repos or integrate them into your library! For example, you can quickly load a Scikit-learn model with a few lines.

```py
from huggingface_hub import hf_hub_download
import joblib

REPO_ID = "YOUR_REPO_ID"
FILENAME = "sklearn_model.joblib"

model = joblib.load(
    hf_hub_download(repo_id=REPO_ID, filename=FILENAME)
)
```

## Using Git

Since all models on the Model Hub are Git repositories, you can clone the models locally by running:

```bash
git lfs install
git clone git@hf.co:<MODEL ID> # example: git clone git@hf.co:bigscience/bloom
```

If you have write-access to the particular model repo, you'll also have the ability to commit and push revisions to the model.

Add your SSH public key to [your user settings](https://huggingface.co/settings/keys) to push changes and/or access private repos.

## Faster downloads

If you are running on a machine with high bandwidth,
you can increase your download speed with [`hf_transfer`](https://github.com/huggingface/hf_transfer),
a Rust-based library developed to speed up file transfers with the Hub.

```bash
pip install huggingface_hub[hf_transfer]
HF_HUB_ENABLE_HF_TRANSFER=1 huggingface-cli download ...
```

<Tip warning={true}>

`hf_transfer` is a power user tool!
It is tested and production-ready,
but it lacks user-friendly features like advanced error handling or proxies.
For more details, please take a look at this [guide](https://huggingface.co/docs/huggingface_hub/hf_transfer).

</Tip>


