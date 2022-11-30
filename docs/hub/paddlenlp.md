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

Similar to `transformer` models, the `PaddleNLP` library provides a simple one-liner to load models! Depending on how you want to use them, you can use the high-level API using the `Taskflow` function or you can use `AutoModel` and `AutoTokenizer` for more control.

```py
# Taskflow provides a simple end-to-end capability and a more optimized experience for inference
from paddlenlp.transformers import Taskflow
taskflow = Taskflow("fill-mask", task_path="PaddlePaddle/ernie-1.0-base-zh", from_hf_hub=True)

# If you want more control, you will need to define the tokenizer and model.
from paddlenlp.transformers import AutoTokenizer, AutoModelForMaskedLM
tokenizer = AutoTokenizer.from_pretrained("PaddlePaddle/ernie-1.0-base-zh", from_hf_hub=True)
model = AutoModelForMaskedLM.from_pretrained("PaddlePaddle/ernie-1.0-base-zh", from_hf_hub=True)
```

TODO: 
If you want to see how to load a specific model, you can click `Use in paddlenlp` and you will be given a working snippet that you can load it! 

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-fastai_snippet1.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-fastai_snippet1-dark.png"/>
</div>
<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-fastai_snippet2.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-fastai_snippet2-dark.png"/>
</div>

## Sharing your models

TODO: 
You can share your `PaddleNLP` models by using the `push_to_hub_fastai` method.

```py
from huggingface_hub import push_to_hub_fastai

push_to_hub_fastai(learner=learn, repo_id="espejelomar/identify-my-cat")
```


## Additional resources

* PaddlePaddle Installation [guide](https://www.paddlepaddle.org.cn/en/install).
* PaddleNLP [GitHub Repo](https://github.com/PaddlePaddle/PaddleNLP).
