# Interacting with models on the hub

## Accessing models for local use

Since all models on the Model Hub are Git repositories, you can clone the models locally by running:

```bash
git lfs install
git clone <MODEL URL>
```

For detailed information on accessing the model, you can click on the "Use in Transformer" button on any model page.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/models-usage.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/models-usage-dark.png"/>
</div>

If the model is compatible with 🤗  Transformers, you'll even receive snippets to help you get started.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/models-usage-modal.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/models-usage-modal-dark.png"/>
</div>

### Can I access models programmatically?

You can use the [`huggingface_hub`](https://github.com/huggingface/huggingface_hub) library to create, delete, update and retrieve information from repos. You can also download files from repos or integrate them into your library! For example, you can quickly load a Scikit learn model with a few lines.

```py
from huggingface_hub import hf_hub_url, cached_download
import joblib

REPO_ID = "YOUR_REPO_ID"
FILENAME = "sklearn_model.joblib"

model = joblib.load(cached_download(
    hf_hub_url(REPO_ID, FILENAME)
))
```

## Uploading models

The first step is to create an account at [Hugging Face](https://huggingface.co/login). Models on the Hub are Git-based repositories, which give you versioning, branches, discoverability and sharing features, integration with over a dozen libraries, and more! You have control over what you want to upload to your repository, which could include checkpoints, configs, and any other files.

You can link repositories with an individual, such as [osanseviero/fashion_brands_patterns](https://huggingface.co/osanseviero/fashion_brands_patterns), or with an organization, such as [facebook/bart-large-xsum](https://huggingface.co/facebook/bart-large-xsum). Organizations can collect models related to a company, community, or library! If you choose an organization, the model will be featured on the organization’s page, and every member of the organization will have the ability to contribute to the repository. You can create a new organization [here](https://huggingface.co/organizations/new).

There are several ways to upload models to the Hub, described below.

### Using the web interface

To create a brand new model repository, visit [huggingface.co/new](http://huggingface.co/new). Then follow these steps:

1. In the "Files and versions" tab, select "Add File" and specify "Upload File":

<div class="flex justify-center">
<img class="block dark:hidden" width="300" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/add-file.png"/>
<img class="hidden dark:block" width="300" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/add-file-dark.png"/>
</div>

2. From there, select a file from your computer to upload and leave a helpful commit message to know what you are uploading:

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/commit-file.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/commit-file-dark.png"/>
</div>

3. Afterwards, click **Commit changes** to upload your model to the Hub!

4. Inspect files and history

You can check your repository with all the recently added files!

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/repo_with_files.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/repo_with_files-dark.png"/>
</div>

The UI allows you to explore the model files and commits and to see the diff introduced by each commit:

<div class="flex justify-center">
<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/explore_history.gif"/>
</div>

5. Add metadata

You can add metadata to your model card. You can specify:
* the type of task this model is for, enabling widgets and the Inference API.
* the used library (`transformers`, `spaCy`, etc.)
* the language
* the dataset
* metrics
* license
* a lot more!

Read more about model tags [here](/docs/hub/model-repos#model-card-metadata).

6. Add TensorBoard traces

Any repository that contains TensorBoard traces (filenames that contain `tfevents`) is categorized with the [`TensorBoard` tag](https://huggingface.co/models?filter=tensorboard). As a convention, we suggest that you save traces under the `runs/` subfolder. The "Training metrics" tab then makes it easy to review charts of the logged variables, like the loss or the accuracy.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/tensorboard.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/tensorboard-dark.png"/>
</div>

Models trained with 🤗 Transformers will generate [TensorBoard traces](https://huggingface.co/transformers/main_classes/callback.html?highlight=tensorboard#transformers.integrations.TensorBoardCallback) by default if [`tensorboard`](https://pypi.org/project/tensorboard/) is installed.


### Using Git

Since model repos are just Git repositories, you can use Git to push your model files to the Hub. Follow the guide on [Getting Started with Repositories](repositories-getting-started.md) to learn about using the `git` CLI to commit and push your models.


### Using the `huggingface_hub` client library

The rich feature set in the `huggingface_hub` library allows you to manage repositories, including creating repos and uploading models to the Model Hub. Visit [the client library's documentation](https://huggingface.co/docs/huggingface_hub/index) to learn more.
