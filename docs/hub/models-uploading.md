# Uploading models

To upload models to the Hub, you'll need to create an account at [Hugging Face](https://huggingface.co/join). Models on the Hub are [Git-based repositories](./repositories), which give you versioning, branches, discoverability and sharing features, integration with dozens of libraries, and more! You have control over what you want to upload to your repository, which could include checkpoints, configs, and any other files.

You can link repositories with an individual user, such as [osanseviero/fashion_brands_patterns](https://huggingface.co/osanseviero/fashion_brands_patterns), or with an organization, such as [facebook/bart-large-xsum](https://huggingface.co/facebook/bart-large-xsum). Organizations can collect models related to a company, community, or library! If you choose an organization, the model will be featured on the organization’s page, and every member of the organization will have the ability to contribute to the repository. You can create a new organization [here](https://huggingface.co/organizations/new).

> **_NOTE:_** Models do NOT need to be compatible with the Transformers/Diffusers libraries to get download metrics. Any custom model is supported. Read more below!

There are several ways to upload models for them to be nicely integrated into the Hub and get [download metrics](models-download-stats), described below.

- In case your model is designed for a library that has [built-in support](#upload-from-a-library-with-built-in-support), you can use the methods provided by the library. Custom models that use `trust_remote_code=True` can also leverage these methods.
- In case your model is a custom PyTorch model, one can leverage the [`PyTorchModelHubMixin` class](#upload-a-pytorch-model-using-huggingfacehub) as it allows to add `from_pretrained`, `push_to_hub` to any `nn.Module` class, just like models in the Transformers, Diffusers and Timm libraries.
- In addition to programmatic uploads, you can always use the [web interface](#using-the-web-interface) or [the git command line](#using-git).

Once your model is uploaded, we suggest adding a [Model Card](./model-cards) to your repo to document your model and make it more discoverable.

<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/example_repository.png"
alt="drawing" width="600"/>

<small> Example [repository](https://huggingface.co/LiheYoung/depth_anything_vitl14) that leverages [PyTorchModelHubMixin](#upload-a-pytorch-model-using-huggingfacehub). Downloads are shown on the right.</small>

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

Read more about model tags [here](./model-cards#model-card-metadata).

6. Add TensorBoard traces

Any repository that contains TensorBoard traces (filenames that contain `tfevents`) is categorized with the [`TensorBoard` tag](https://huggingface.co/models?filter=tensorboard). As a convention, we suggest that you save traces under the `runs/` subfolder. The "Training metrics" tab then makes it easy to review charts of the logged variables, like the loss or the accuracy.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/tensorboard.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/tensorboard-dark.png"/>
</div>

Models trained with 🤗 Transformers will generate [TensorBoard traces](https://huggingface.co/docs/transformers/main_classes/callback#transformers.integrations.TensorBoardCallback) by default if [`tensorboard`](https://pypi.org/project/tensorboard/) is installed.


## Upload from a library with built-in support

First check if your model is from a library that has built-in support to push to/load from the Hub, like Transformers, Diffusers, Timm, Asteroid, etc.: https://huggingface.co/docs/hub/models-libraries. Below we'll show how easy this is for a library like Transformers:

```python
from transformers import BertConfig, BertModel

config = BertConfig()
model = BertModel(config)

model.push_to_hub("nielsr/my-awesome-bert-model")

# reload
model = BertModel.from_pretrained("nielsr/my-awesome-bert-model")
```

Some libraries, like Transformers, support loading [code from the Hub](https://huggingface.co/docs/transformers/custom_models). This is a way to make your model work with Transformers using the `trust_remote_code=True` flag. You may want to consider this option instead of a full-fledged library integration.

## Upload a PyTorch model using huggingface_hub

In case your model is a (custom) PyTorch model, you can leverage the `PyTorchModelHubMixin` [class](https://huggingface.co/docs/huggingface_hub/package_reference/mixins#huggingface_hub.PyTorchModelHubMixin) available in the [huggingface_hub](https://github.com/huggingface/huggingface_hub) Python library. It is a minimal class which adds `from_pretrained` and `push_to_hub` capabilities to any `nn.Module`, along with download metrics.

Here is how to use it (assuming you have run `pip install huggingface_hub`):

```python
import torch
import torch.nn as nn
from huggingface_hub import PyTorchModelHubMixin


class MyModel(
    nn.Module,
    PyTorchModelHubMixin, 
    # optionally, you can add metadata which gets pushed to the model card
    repo_url="your-repo-url",
    pipeline_tag="text-to-image",
    license="mit",
):
    def __init__(self, num_channels: int, hidden_size: int, num_classes: int):
        super().__init__()
        self.param = nn.Parameter(torch.rand(num_channels, hidden_size))
        self.linear = nn.Linear(hidden_size, num_classes)

    def forward(self, x):
        return self.linear(x + self.param)

# create model
config = {"num_channels": 3, "hidden_size": 32, "num_classes": 10}
model = MyModel(**config)

# save locally
model.save_pretrained("my-awesome-model")

# push to the hub
model.push_to_hub("your-hf-username/my-awesome-model")

# reload
model = MyModel.from_pretrained("your-hf-username/my-awesome-model")
```

As you can see, the only requirement is that your model inherits from `PyTorchModelHubMixin`. All instance attributes will be automatically serialized to a `config.json` file. Note that the `init` method can only take arguments which are JSON serializable. Python dataclasses are supported.

This comes with automated download metrics, meaning that you'll be able to see how many times the model is downloaded, the same way they are available for models integrated natively in the Transformers, Diffusers or Timm libraries. With this mixin class, each separate checkpoint is stored on the Hub in a single repository consisting of 2 files:

- a `pytorch_model.bin` or `model.safetensors` file containing the weights
- a `config.json` file which is a serialized version of the model configuration. This class is used for counting download metrics: everytime a user calls `from_pretrained` to load a `config.json`, the count goes up by one. See [this guide](https://huggingface.co/docs/hub/models-download-stats) regarding automated download metrics.

It's recommended to add a model card to each checkpoint so that people can read what the model is about, have a link to the paper, etc.

Visit [the huggingface_hub's documentation](https://huggingface.co/docs/huggingface_hub/guides/integrations) to learn more.

Alternatively, one can also simply programmatically upload files or folders to the hub: https://huggingface.co/docs/huggingface_hub/guides/upload.

## Using Git

Finally, since model repos are just Git repositories, you can also use Git to push your model files to the Hub. Follow the guide on [Getting Started with Repositories](repositories-getting-started#adding-files-to-a-repository-terminalterminal) to learn about using the `git` CLI to commit and push your models.