# Using FastAI at Hugging Face

`fastai` is an open-source Deep Learning library that leverages PyTorch and Python to provide high-level components to train fast and accurate neural networks with state-of-the-art outputs on text, vision, and tabular data. 

## Exploring fastai in the Hub

You can find `fastai` models by filtering at the left of the [models page](https://huggingface.co/models?library=fastai&sort=downloads). All models on the Hub come up with useful features such as an automatically generated model card, metadata tags that help for discoverability and Inference.

All models on the Hub come up with the following features:
1. An automatically generated model card with a brief description and metadata tags that help for discoverability.
2. An interactive widget you can use to play out with the model directly in the browser (for Image Classification)
3. An Inference API that allows to make inference requests (for Image Classification).


## Using existing models

The `huggingface_hub` library is a lightweight Python client with utlity functions to download models from the Hub.

```bash
pip install huggingface_hub["fastai"]
```

Once you have the library installed, you just need to use the `from_pretrained_fastai` method. This method not only loads the model, but also validates the `fastai` version when the model was saved, which is important for reproducibility.

```py
from huggingface_hub import from_pretrained_fastai

learner = from_pretrained_fastai("espejelomar/identify-my-cat")

_,_,probs = learner.predict(img)
print(f"Probability it's a cat: {100*probs[1].item():.2f}%")

# Probability it's a cat: 100.00%
```


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
