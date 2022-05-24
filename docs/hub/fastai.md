---
title: Fastai
---

# Using FastAI at Hugging Face

`fastai` is an open-source Deep Learning library that leverages PyTorch and Python to provide high-level components to train fast and accurate neural networks with state-of-the-art outputs on text, vision, and tabular data. 

## Exploring fastai in the Hub

You can find `fastai` models by filtering at the left of the [models page](https://huggingface.co/models?library=fastai&sort=downloads). All models on the Hub come up with useful features such as an automatically generated model card and metadata tags that help for discoverability.


## Using existing models

The `huggingface_hub` library is a lightweight Python client with utlity functions to download models from the Hub.

```
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


![snippet](/docs/assets/hub/fastai_snippet1.png)
![snippet](/docs/assets/hub/fastai_snippet2.png)


## Sharing your models

You can share your `fastai` models by using the `push_to_hub_fastai` method.

```py
from huggingface_hub import push_to_hub_fastai

push_to_hub_fastai(learner=learn, repo_id="espejelomar/identify-my-cat")
```


## Additional resources

* [fastai](https://course.fast.ai/) course.
* [fastai](https://www.fast.ai/) website.
* [Integration with Hub](https://huggingface.co/blog/fastai) announcement.
