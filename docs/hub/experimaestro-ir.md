# Using experimaestro-IR at Hugging Face

`experimaestro-IR` is an open-source toolkit for neural information retrieval models. It allows using and building experiments around those models, with a focus on reusable components. More up-to-date documentation can be found on the [experimaestro-IR pre-trained model documentation page](https://experimaestro-ir.readthedocs.io/en/latest/pretrained.html).

## Exploring experimaestro-IR in the Hub

You can find `experimaestro-IR` models by filtering at the left of the [models page](https://huggingface.co/models?library=xpmir).

All models on the Hub come up with useful features:
1. An automatically generated model card with a description and metrics on IR datasets;
2. Metadata tags that help for discoverability.


## Install the library
To install the `experimaestro-IR` library, you can use pip:

```sh
pip install experimaestro-ir
```

## Using existing models

You can simply download a model from the Hub using `xpmir.models.AutoModel`. 
Thanks to the [experimaestro framework](https://github.com/experimaestro/experimaestro-python), 
you can either use models in your own experiments or in pure inference mode.

### As experimental models

In this mode, you can reuse the model in your experiments -- e.g. to compare this model
with your own, or using it in a complex IR pipeline (e.g. distillation). Please
refer to the [experimaestro-IR documentation](https://experimaestro-ir.readthedocs.io/)
for more details.

```py
from xpmir.models import AutoModel

# Model that can be re-used in experiments
model = AutoModel.load_from_hf_hub("xpmir/monobert")
```

### Pure inference mode

In this mode, the model can be used right away to score documents

```py
from xpmir.models import AutoModel

# Use this if you want to actually use the model
model = AutoModel.load_from_hf_hub("xpmir/monobert", as_instance=True)
model.initialize(None)
model.rsv("walgreens store sales average", "The average Walgreens salary ranges...")
```


## Sharing your models

You can easily upload your models using `AutoModel.push_to_hf_hub`:

```
from xpmir.models import AutoModel

AutoModel.push_to_hf_hub(model, readme=readme_md)
```

## Additional resources

* Experimaestro-IR [documentation](https://experimaestro-ir.readthedocs.io/en/latest/pretrained.html)
* Experimaestro-IR [huggingface integration documentation](https://experimaestro-ir.readthedocs.io/en/latest/pretrained.html)
