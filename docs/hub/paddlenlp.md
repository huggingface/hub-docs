# Using PaddleNLP at Hugging Face

Leveraging the [PaddlePaddle](https://github.com/PaddlePaddle/Paddle) framework, [`PaddleNLP`](https://github.com/PaddlePaddle/PaddleNLP) is an easy-to-use and powerful NLP library with awesome pre-trained model zoo, supporting wide-range of NLP tasks from research to industrial applications.

## Exploring fastai in the Hub

You can find `PaddleNLP` models by filtering at the left of the [models page](https://huggingface.co/models?library=paddlenlp&sort=downloads).

All models on the Hub come up with the following features:
1. An automatically generated model card with a brief description and metadata tags that help for discoverability.
2. An interactive widget you can use to play out with the model directly in the browser 
3. An Inference API that allows to make inference requests


## Installation

You can follow [PaddlePaddle Quick Start](https://www.paddlepaddle.org.cn/en/install) to intall the PaddlePaddle Framework with your favorite OS, Package Manager and Compute Platform.

`PaddleNLP` offers a quick one-line install through pip

```
pip install paddlenlp
```

## Using existing models

All `transformer` models are a line away from being used! Depending on how you want to use them, you can use the high-level API using the `pipeline` function or you can use `AutoModel` for more control.

```py
# With pipeline, just specify the task and the model id from the Hub.
from transformers import pipeline
pipe = pipeline("text-generation", model="distilgpt2")

# If you want more control, you will need to define the tokenizer and model.
from transformers import AutoTokenizer, AutoModelForCausalLM
tokenizer = AutoTokenizer.from_pretrained("distilgpt2")
model = AutoModelForCausalLM.from_pretrained("distilgpt2")
```

You can also load a model from a specific version (based on commit hash, tag name, or branch) as follows:

```py
model = AutoModel.from_pretrained(
    "julien-c/EsperBERTo-small", revision="v2.0.1"  # tag name, or branch name, or commit hash
)
```

If you want to see how to load a specific model, you can click `Use in Transformers` and you will be given a working snippet that you can load it! If you need further information about the model architecture, you can also click the "Read model documentation" at the bottom of the snippet.


If you want to see how to load a specific model, you can click `Use in fastai` and you will be given a working snippet that you can load it! 

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-fastai_snippet1.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-fastai_snippet1-dark.png"/>
</div>
<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-fastai_snippet2.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-fastai_snippet2-dark.png"/>
</div>

## Sharing your models

You can share your `fastai` models by using the `push_to_hub_fastai` method.

```py
from huggingface_hub import push_to_hub_fastai

push_to_hub_fastai(learner=learn, repo_id="espejelomar/identify-my-cat")
```


## Additional resources

* fastai [course](https://course.fast.ai/).
* fastai [website](https://www.fast.ai/).
* Integration with Hub [docs](https://docs.fast.ai/huggingface.html).
* Integration with Hub [announcement](https://huggingface.co/blog/fastai).
