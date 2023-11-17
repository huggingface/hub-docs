# Models Frequently Asked Questions

## How can I see what dataset was used to train the model?

It's up to the person who uploaded the model to include the training information! You may find the information about the datasets that the model was trained on in the model card. If the datasets used for the model are on the Hub, the uploader may have included them in the [model card's metadata](https://huggingface.co/Jiva/xlm-roberta-large-it-mnli/blob/main/README.md#L7-L9). In that case, the datasets would be linked with a handy card on the right side of the model page:

<div class="flex justify-center">
<img class="block dark:hidden" width="350" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/models-linked-datasets.png"/>
<img class="hidden dark:block" width="350" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/models-linked-datasets-dark.png"/>
</div>

## How can I see an example of the model in action?

Models can have inference widgets that let you try out the model in the browser! Inference widgets are easy to configure, and there are many different options at your disposal. Visit the [Widgets documentation](models-widgets) to learn more.

The Hugging Face Hub is also home to Spaces, which are interactive demos used to showcase models. If a model has any Spaces associated with it, you'll find them linked on the model page like so:

<div class="flex justify-center">
<img class="block dark:hidden" width="350" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/models-linked-spaces.png"/>
<img class="hidden dark:block" width="350" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/models-linked-spaces-dark.png"/>
</div>

Spaces are a great way to show off a model you've made or explore new ways to use existing models! Visit the [Spaces documentation](./spaces) to learn how to make your own.

## How do I upload an update / new version of the model?

Releasing an update to a model that you've already published can be done by pushing a new commit to your model's repo. To do this, go through the same process that you followed to upload your initial model. Your previous model versions will remain in the repository's commit history, so you can still download previous model versions from a specific git commit or tag or revert to previous versions if needed.

## What if I have a different checkpoint of the model trained on a different dataset?

By convention, each model repo should contain a single checkpoint. You should upload any new checkpoints trained on different datasets to the Hub in a new model repo. You can link the models together by using a tag specified in the `tags` key in your [model card's metadata](./model-cards), by using [Collections](./collections) to group distinct related repositories together or by linking to them in the model cards. The [akiyamasho/AnimeBackgroundGAN-Shinkai](https://huggingface.co/akiyamasho/AnimeBackgroundGAN-Shinkai#other-pre-trained-model-versions) model, for example, references other checkpoints in the model card under *"Other pre-trained model versions"*.

## Can I link my model to a paper on arXiv?

If the model card includes a link to a paper on arXiv, the Hugging Face Hub will extract the arXiv ID  and include it in the model tags with the format `arxiv:<PAPER ID>`. Clicking on the tag will let you:

* Visit the paper page
* Filter for other models on the Hub that cite the same paper.

<div class="flex justify-center">
<img class="block dark:hidden" width="300" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-arxiv.png"/>
<img class="hidden dark:block" width="300" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-arxiv-dark.png"/>
</div>

Read more about paper pages [here](./paper-pages).

## How are download stats generated for models?

Counting the number of downloads for models is not a trivial task as a single model repository might contain multiple files, including multiple model files (e.g., with sharded models), and different formats depending on the library. To avoid double counting downloads (e.g., counting a single download of a model as multiple downloads), the Hub uses a set of query files that are employed for download counting. 

Every `GET` request to these files will be counted as a download. By default, when no library is specified, the Hub uses `config.json` as the default query file. Otherwise, the query file depends on each library, and the Hub might examine files such as `pytorch_model.bin` and `adapter_config.json`.
