# Using Timm at Hugging Face

`timm`, also known as [pytorch-image-models](https://github.com/rwightman/pytorch-image-models), is an open-source collection of state-of-the-art PyTorch image models, pretrained weights, and utility scripts for training, inference, and validation.

## Exploring Keras in the Hub

You can find a number of `timm` models by filtering at the left of the [models page](https://huggingface.co/models?library=timm&sort=downloads).

All models on the Hub come up with useful feature:
1. An automatically generated model card, which model authors can complete with [information about their model](./models-cards).
2. Metadata tags that help for discoverability, allowing users to find the model when searching for `timm` models.
3. An [interactive widget](./models-widgets) you can use to play out with the model directly in the browser
4. An [Inference API](./models-inference) that allows users to make inference requests

## Using existing models

Any `timm` model from the Hugging Face Hub can be loaded with a single line of code as long as you have `timm` installed! Once you've selected a model from the Hub, pass the model's ID prefixed with `hf_hub:` to `timm`'s `create_model` method to download and instantiate the model. 

```py
import timm

# Loading https://huggingface.co/sgugger/resnet50d
model = timm.create_model("hf_hub:sgugger/resnet50d", pretrained=True)
```

If you want to see how to load a specific model, you can click **Use in keras** and you will be given a working snippet that you can load it! 

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-timm_snippet1.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-timm_snippet1-dark.png"/>
</div>
<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-timm_snippet2.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-timm_snippet2-dark.png"/>
</div>

### TODO: -- Inference --


## Sharing your models

You can share your `timm` models directly to the Hugging Face Hub. This will publish a new version of your model to the Hugging Face Hub, creating a model repo for you if it doesn't already exist.

Before pushing a model, make sure that you've logged in to Hugging Face:

```sh
python -m pip install huggingface_hub
huggingface-cli login
```

Alternatively, if you prefer working from a Jupyter or Colaboratory notebook, once you've installed `huggingface_hub` you can log in with:

```py
from huggingface_hub import notebook_login
notebook_login()
```

Then, push your model using the `push_to_hf_hub` method:

```py
import timm

# Build or load a model, e.g. timm's pretrained resnet18
model = timm.create_model('resnet18', pretrained=True, num_classes=4)

# Push it to the 🤗 Hub
timm.models.hub.push_to_hf_hub(
    model,
    'resnet18-random-classifier',
    model_config={'labels': ['a', 'b', 'c', 'd']}
)

# Load your model from the Hub
model_reloaded = timm.create_model(
    'hf_hub:<your-username>/resnet18-random-classifier',
    pretrained=True
)
```

## Inference Widget and API

All `timm` models on the Hub are automatically equipped with an [inference widget](./models-widgets), pictured below for [nateraw/timm-resnet50-beans](https://huggingface.co/nateraw/timm-resnet50-beans). Additionally, `timm` models are available through the [Inference API](./models-inference), which you can access through HTTP with cURL, Python's `requests` library, or your preferred method for making network requests. 

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-timm_widget.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-timm_widget-dark.png"/>
</div>

```sh
curl https://api-inference.huggingface.co/models/nateraw/timm-resnet50-beans \
        -X POST \
        --data-binary '@beans.jpeg' \
        -H "Authorization: Bearer {$HF_API_TOKEN}"
# [{"label":"angular_leaf_spot","score":0.9845947027206421},{"label":"bean_rust","score":0.01368315052241087},{"label":"healthy","score":0.001722085871733725}]
```

## Additional resources (TODO)
