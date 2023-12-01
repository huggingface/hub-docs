# Using SetFit with Hugging Face

SetFit is an efficient and prompt-free framework for few-shot fine-tuning of [Sentence Transformers](https://sbert.net/). It achieves high accuracy with little labeled data - for instance, with only 8 labeled examples per class on the Customer Reviews sentiment dataset, SetFit is competitive with fine-tuning RoBERTa Large on the full training set of 3k examples 🤯!

Compared to other few-shot learning methods, SetFit has several unique features:

* 🗣 **No prompts or verbalisers:** Current techniques for few-shot fine-tuning require handcrafted prompts or verbalisers to convert examples into a format that's suitable for the underlying language model. SetFit dispenses with prompts altogether by generating rich embeddings directly from text examples.
* 🏎 **Fast to train:** SetFit doesn't require large-scale models like T0 or GPT-3 to achieve high accuracy. As a result, it is typically an order of magnitude (or more) faster to train and run inference with.
* 🌎 **Multilingual support**: SetFit can be used with any [Sentence Transformer](https://huggingface.co/models?library=sentence-transformers&sort=downloads) on the Hub, which means you can classify text in multiple languages by simply fine-tuning a multilingual checkpoint.

## Exploring SetFit on the Hub

You can find SetFit models by filtering at the left of the [models page](https://huggingface.co/models?library=setfit).

All models on the Hub come with these useful features:
1. An automatically generated model card with a brief description.
2. An interactive widget you can use to play with the model directly in the browser.
3. An Inference API that allows you to make inference requests.

## Installation

To get started, you can follow the [SetFit installation guide](https://huggingface.co/docs/setfit/installation). You can also use the following one-line install through pip:

```
pip install -U setfit
```

## Using existing models

All `setfit` models can easily be loaded from the Hub.

```py
from setfit import SetFitModel

model = SetFitModel.from_pretrained("tomaarsen/setfit-paraphrase-mpnet-base-v2-sst2-8-shot")
```

Once loaded, you can use [`SetFitModel.predict`](https://huggingface.co/docs/setfit/reference/main#setfit.SetFitModel.predict) to perform inference.

```py
model.predict("Amelia Earhart flew her single engine Lockheed Vega 5B across the Atlantic to Paris.")
```
```py
['positive', 'negative']
```

If you want to load a specific SpanMarker model, you can click `Use in SetFit` and you will be given a working snippet!

## Additional resources

* SetFit [repository](https://github.com/huggingface/setfit)
* SetFit [docs](https://huggingface.co/docs/setfit)
* SetFit [paper](https://arxiv.org/abs/2209.11055)
