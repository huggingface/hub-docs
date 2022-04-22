---
title: Asteroid
---

# Using Asteroid at Hugging Face

`asteroid` is a Pytorch toolkit for audio source separation. It enables fast experimentation on common datasets with support for a large range of datasets and recipes to reproduce papers.

## Exploring Asteroid in the Hub

You can find `asteroid` models by filtering at the left of the [models page](https://huggingface.co/models?filter=asteroid). 

All models on the Hub come up with useful features
1. An automatically generated model card with a description, a training configuration, metrics and more.
2. Metadata tags that help for discoverability and contain information such as license and datasets.
3. An interactive widget you can use to play out with the model directly in the browser.
4. An Inference API that allows to make inference requests.
5. A training metrics tab with automatically hosted TensorBoard traces if you upload them.

![widget](/docs/assets/hub/asteroid_widget.png)


## Using existing models

For a full guide on loading pre-trained models, we recommend checking out the [official guide](https://github.com/asteroid-team/asteroid/blob/master/docs/source/readmes/pretrained_models.md). 

All model classes (`BaseModel`, `ConvTasNet`, etc) have a `from_pretrained` method that allows to load models from the Hub.

```py
from asteroid.models import ConvTasNet
model = ConvTasNet.from_pretrained('mpariente/ConvTasNet_WHAM_sepclean')
```

If you want to see how to load a specific model, you can click `Use in Adapter Transformers` and you will be given a working snippet that you can load it! 

![snippet](/docs/assets/hub/asteroid_snippet.png)


## Sharing your models

At the moment there is no automatic method to upload your models to the Hub, but the process to upload them is documented in the [official guide](https://github.com/asteroid-team/asteroid/blob/master/docs/source/readmes/pretrained_models.md#share-your-models).

All the recipes create all the needed files to upload a model to the Hub. The process usually involves
1. Creating a model repository.
2. Cloning the repository locally.
3. Moving files from the recipe output to the repository (model card, model filte, TensorBoard traces).
4. Push the files (`git add` + `git commit` + `git push`).

Once you do this, you can try out your model directly in the browser and share it with the rest of the community.


## Additional resources

* Asteroid [website](https://asteroid-team.github.io/).
* Asteroid [library](https://github.com/asteroid-team/asteroid).
* Integration [docs](https://github.com/asteroid-team/asteroid/blob/master/docs/source/readmes/pretrained_models.md).
