# Using _Adapters_ at Hugging Face

[_Adapters_](https://github.com/adapter-hub/adapters) is an add-on library to 🤗 `transformers` for efficiently fine-tuning pre-trained language models using adapters and other parameter-efficient methods.
_Adapters_ also provides various methods for composition of adapter modules during training and inference.
You can learn more about this in the [_Adapters_ paper](https://arxiv.org/abs/2311.11077).

## Exploring _Adapters_ on the Hub

You can find _Adapters_ models by filtering at the left of the [models page](https://huggingface.co/models?library=adapter-transformers&sort=downloads). Some adapter models can be found in the Adapter Hub [repository](https://github.com/adapter-hub/hub). Models from both sources are aggregated on the [AdapterHub website](https://adapterhub.ml/explore/).

## Installation

To get started, you can refer to the [AdapterHub installation guide](https://docs.adapterhub.ml/installation.html). You can also use the following one-line install through pip:

```
pip install adapters
```

## Using existing models

For a full guide on loading pre-trained adapters, we recommend checking out the [official guide](https://docs.adapterhub.ml/loading.html). 

As a brief summary, a full setup consists of three steps:

1. Load a base `transformers` model with the `AutoAdapterModel` class provided by _Adapters_.
2. Use the `load_adapter()` method to load and add an adapter.
3. Activate the adapter via `active_adapters` (for inference) or activate and set it as trainable via `train_adapter()` (for training). Make sure to also check out [composition of adapters](https://docs.adapterhub.ml/adapter_composition.html).

```py
from adapters import AutoAdapterModel

# 1.
model = AutoAdapterModel.from_pretrained("roberta-base")
# 2.
adapter_name = model.load_adapter("AdapterHub/roberta-base-pf-imdb")
# 3.
model.active_adapters = adapter_name
# or model.train_adapter(adapter_name)
```

You can also use `list_adapters` to find all Adapter Models programmatically:

```py
from adapters import list_adapters

# source can be "ah" (AdapterHub), "hf" (hf.co) or None (for both, default)
adapter_infos = list_adapters(source="hf", model_name="roberta-base")
```

If you want to see how to load a specific model, you can click `Use in Adapter Transformers` and you will be given a working snippet that you can load it! 

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-adapter_transformers_snippet1.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-adapter_transformers-snippet1-dark.png"/>
</div>

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-adapter_transformers_snippet2.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-adapter_transformers-snippet2-dark.png"/>
</div>

## Sharing your models

For a full guide on sharing models with _Adapters_, we recommend checking out the [official guide](https://docs.adapterhub.ml/huggingface_hub.html#uploading-to-the-hub). 

You can share your adapter by using the `push_adapter_to_hub` method from a model that already contains an adapter.

```py
model.push_adapter_to_hub(
    "my-awesome-adapter",
    "awesome_adapter",
    adapterhub_tag="sentiment/imdb",
    datasets_tag="imdb"
)
```

This command creates a repository with an automatically generated model card and all necessary metadata.


## Additional resources

* _Adapters_ [repository](https://github.com/adapter-hub/adapters)
* _Adapters_ [docs](https://docs.adapterhub.ml)
* _Adapters_ [paper](https://arxiv.org/abs/2311.11077)
* Integration with Hub [docs](https://docs.adapterhub.ml/huggingface_hub.html)
