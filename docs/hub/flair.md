# Using Flair at Hugging Face

[Flair](https://github.com/flairNLP/flair) is a very simple framework for state-of-the-art NLP.
Developed by [Humboldt University of Berlin](https://www.informatik.hu-berlin.de/en/forschung-en/gebiete/ml-en/) and friends.

## Exploring Flair in the Hub

You can find `flair` models by filtering at the left of the [models page](https://huggingface.co/models?library=flair).

All models on the Hub come with these useful features:

1. An automatically generated model card with a brief description.
2. An interactive widget you can use to play with the model directly in the browser.
3. An Inference API that allows you to make inference requests.

## Installation

To get started, you can follow the [Flair installation guide](https://github.com/flairNLP/flair?tab=readme-ov-file#requirements-and-installation).
You can also use the following one-line install through pip:

```
$ pip install -U flair
```

## Using existing models

All `flair` models can easily be loaded from the Hub:

```py
from flair.data import Sentence
from flair.models import SequenceTagger

# load tagger
tagger = SequenceTagger.load("flair/ner-multi")
```

Once loaded, you can use `predict()` to perform inference:

```py
sentence = Sentence("George Washington ging nach Washington.")
tagger.predict(sentence)

# print sentence
print(sentence)
```

It outputs the following:

```text
Sentence[6]: "George Washington ging nach Washington." → ["George Washington"/PER, "Washington"/LOC]
```

If you want to load a specific Flair model, you can click `Use in Flair` in the model card and you will be given a working snippet!

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-flair_snippet1.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-flair_snippet1-dark.png"/>
</div>
<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-flair_snippet2.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-flair_snippet2-dark.png"/>
</div>

## Additional resources

* Flair [repository](https://github.com/flairNLP/flair)
* Flair [docs](https://flairnlp.github.io/docs/intro)
* Official Flair [models](https://huggingface.co/flair) on the Hub (mainly trained by [@alanakbik](https://huggingface.co/alanakbik) and [@stefan-it](https://huggingface.co/stefan-it))