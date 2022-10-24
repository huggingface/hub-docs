# Using timm at Hugging Face

`timm`, also known as [pytorch-image-models](https://github.com/rwightman/pytorch-image-models), is an open-source collection of state-of-the-art PyTorch image models, pretrained weights, and utility scripts for training, inference, and validation.

This documentation focuses on `timm` functionality in the Hugging Face Hub instead of the `timm` library itself. For detailed information about the `timm` library, visit [its documentation](https://huggingface.co/docs/timm).

You can find a number of `timm` models on the Hub using the filters on the left of the [models page](https://huggingface.co/models?library=timm&sort=downloads).

All models on the Hub come with several useful features:
1. An automatically generated model card, which model authors can complete with [information about their model](./model-cards).
2. Metadata tags help users discover the relevant `timm` models.
3. An [interactive widget](./models-widgets) you can use to play with the model directly in the browser.
4. An [Inference API](./models-inference) that allows users to make inference requests.

## Using existing models from the Hub

Any `timm` model from the Hugging Face Hub can be loaded with a single line of code as long as you have `timm` installed! Once you've selected a model from the Hub, pass the model's ID prefixed with `hf-hub:` to `timm`'s `create_model` method to download and instantiate the model. 

```py
import timm

# Loading https://huggingface.co/timm/eca_nfnet_l0
model = timm.create_model("hf-hub:timm/eca_nfnet_l0", pretrained=True)
```

If you want to see how to load a specific model, you can click **Use in timm** and you will be given a working snippet to load it! 

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-timm_snippet1.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-timm_snippet1-dark.png"/>
</div>
<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-timm_snippet2.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-timm_snippet2-dark.png"/>
</div>

### Inference

The snippet below shows how you can perform inference on a `timm` model loaded from the Hub:

```py
import timm
import torch
from PIL import Image
from timm.data import resolve_data_config
from timm.data.transforms_factory import create_transform

# Load from Hub 🔥
model = timm.create_model(
    'hf-hub:nateraw/resnet50-oxford-iiit-pet',
    pretrained=True
)

# Set model to eval mode for inference
model.eval()

# Create Transform
transform = create_transform(**resolve_data_config(model.pretrained_cfg, model=model))

# Get the labels from the model config
labels = model.pretrained_cfg['labels']
top_k = min(len(labels), 5)

# Use your own image file here...
image = Image.open('boxer.jpg').convert('RGB')

# Process PIL image with transforms and add a batch dimension
x = transform(image).unsqueeze(0)

# Pass inputs to model forward function to get outputs
out = model(x)

# Apply softmax to get predicted probabilities for each class
probabilities = torch.nn.functional.softmax(out[0], dim=0)

# Grab the values and indices of top 5 predicted classes
values, indices = torch.topk(probabilities, top_k)

# Prepare a nice dict of top k predictions
predictions = [
    {"label": labels[i], "score": v.item()}
    for i, v in zip(indices, values)
]
print(predictions)
```

This should leave you with a list of predictions, like this:

```py
[
    {'label': 'american_pit_bull_terrier', 'score': 0.9999998807907104},
    {'label': 'staffordshire_bull_terrier', 'score': 1.0000000149011612e-07},
    {'label': 'miniature_pinscher', 'score': 1.0000000149011612e-07},
    {'label': 'chihuahua', 'score': 1.0000000149011612e-07},
    {'label': 'beagle', 'score': 1.0000000149011612e-07}
]
```

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

###########################
# [Fine tune your model...]
###########################

# Push it to the 🤗 Hub
timm.models.hub.push_to_hf_hub(
    model,
    'resnet18-random-classifier',
    model_config={'labels': ['a', 'b', 'c', 'd']}
)

# Load your model from the Hub
model_reloaded = timm.create_model(
    'hf-hub:<your-username>/resnet18-random-classifier',
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

## Additional resources

* timm (pytorch-image-models) [GitHub Repo](https://github.com/rwightman/pytorch-image-models).
* timm [documentation](https://huggingface.co/docs/timm).
* Additional documentation at [timmdocs](https://timm.fast.ai) by [Aman Arora](https://github.com/amaarora).
* [Getting Started with PyTorch Image Models (timm): A Practitioner’s Guide](https://towardsdatascience.com/getting-started-with-pytorch-image-models-timm-a-practitioners-guide-4e77b4bf9055) by [Chris Hughes](https://github.com/Chris-hughes10).
