# Using Adapter Transformers at Hugging Face

`adapter-transformers` is a library that extends 🤗 `transformers` by allowing to integrate, train and use Adapters and other efficient fine-tuning methods. The library is fully compatible with `transformers`. Adapters are small learnt layers insrted within each layer of a pre-trained model. You can learn more about this in the [original paper](https://arxiv.org/abs/2007.07779). 

## Exploring `adapter-transformers` in the Hub

You can find over a hundred `adapter-transformer` models by filtering at the left of the [models page](https://huggingface.co/models?library=adapter-transformers&sort=download). Some adapter models can be found in the Adapter Hub [repository](https://github.com/adapter-hub/hub). Models from both sources are then aggregated in the [AdapterHub](https://adapterhub.ml/explore/).


## Using existing models

For a full guide on loading pre-trained adapters, we recommend checking out the [official guide](https://docs.adapterhub.ml/loading.html). 

As a brief summary, once you load a model with the usual `*Model` classes from `transformers`, you can use the `load_adapter` method to load and activate the Adapter (remember `adapter-transformers` extends `transformers`.).

```py
from transformers import AutoModelWithHeads

model = AutoModelWithHeads.from_pretrained("bert-base-uncased")
adapter_name = model.load_adapter("AdapterHub/bert-base-uncased-pf-imdb", source="hf")
model.active_adapters = adapter_name
```

You can also use `list_adapters` to find all Adapter Models programmatically

```py
from transformers import list_adapters

# source can be "ah" (AdapterHub), "hf" (huggingface.co) or None (for both, default)
adapter_infos = list_adapters(source="hf", model_name="bert-base-uncased")
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

For a full guide on sharing models with `adapter-transformers`, we recommend checking out the [official guide](https://docs.adapterhub.ml/huggingface_hub.html#uploading-to-the-hub). 

You can share your Adapter by using the `push_adapter_to_hub` method from a model that already contains an adapter.

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

* [Adapter Transformers](https://github.com/adapter-hub/adapter-transformers) library.
* [Adapter Transformers](https://docs.adapterhub.ml/index.html) docs.
* [Integration with Hub](https://docs.adapterhub.ml/huggingface_hub.html) docs.
