# Uploading models

To upload models to the Hub, you'll need to create an account at [Hugging Face](https://huggingface.co/join). Models on the Hub are [Git-based repositories](./repositories), which give you versioning, branches, discoverability and sharing features, integration with over a dozen libraries, and more! You have control over what you want to upload to your repository, which could include checkpoints, configs, and any other files.

You can link repositories with an individual, such as [osanseviero/fashion_brands_patterns](https://huggingface.co/osanseviero/fashion_brands_patterns), or with an organization, such as [facebook/bart-large-xsum](https://huggingface.co/facebook/bart-large-xsum). Organizations can collect models related to a company, community, or library! If you choose an organization, the model will be featured on the organization’s page, and every member of the organization will have the ability to contribute to the repository. You can create a new organization [here](https://huggingface.co/organizations/new).

There are several ways to upload models to the Hub, described below. We suggest adding a [Model Card](./models-cards) to to your repo to document your model.

## Using the web interface

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
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/explore_history.gif"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/explore_history-dark.gif"/>
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

Read more about model tags [here](./models-cards#model-card-metadata).

6. Add TensorBoard traces

Any repository that contains TensorBoard traces (filenames that contain `tfevents`) is categorized with the [`TensorBoard` tag](https://huggingface.co/models?filter=tensorboard). As a convention, we suggest that you save traces under the `runs/` subfolder. The "Training metrics" tab then makes it easy to review charts of the logged variables, like the loss or the accuracy.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/tensorboard.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/tensorboard-dark.png"/>
</div>

Models trained with 🤗 Transformers will generate [TensorBoard traces](https://huggingface.co/transformers/main_classes/callback.html?highlight=tensorboard#transformers.integrations.TensorBoardCallback) by default if [`tensorboard`](https://pypi.org/project/tensorboard/) is installed.

## Using Git

Since model repos are just Git repositories, you can use Git to push your model files to the Hub. Follow the guide on [Getting Started with Repositories](repositories-getting-started) to learn about using the `git` CLI to commit and push your models.

## Using the `huggingface_hub` client library

The rich feature set in the `huggingface_hub` library allows you to manage repositories, including creating repos and uploading models to the Model Hub. Visit [the client library's documentation](https://huggingface.co/docs/huggingface_hub/index) to learn more.
