# Using Stanza at Hugging Face

`stanza` is a collection of accurate and efficient tools for the linguistic analysis of many human languages. Starting from raw text to syntactic analysis and entity recognition, Stanza brings state-of-the-art NLP models to languages of your choosing.

## Exploring Stanza in the Hub

You can find `stanza` models by filtering at the left of the [models page](https://huggingface.co/models?library=stanza&sort=downloads). You can find over 70 models for different languages!

All models on the Hub come up with the following features:
1. An automatically generated model card with a brief description and metadata tags that help for discoverability.
2. An interactive widget you can use to play out with the model directly in the browser (for named entity recognition and part of speech).
3. An Inference API that allows to make inference requests (for named entity recognition and part of speech).


## Using existing models

The `stanza` library automatically downloads models from the Hub. You can use `stanza.Pipeline` to download the model from the Hub and do inference.

```python
import stanza

nlp = stanza.Pipeline('en') # download th English model and initialize an English neural pipeline
doc = nlp("Barack Obama was born in Hawaii.") # run annotation over a sentence
```


## Sharing your models

To add new official Stanza models, you can follow the process to [add a new language](https://stanfordnlp.github.io/stanza/new_language.html) and then [share your models with the Stanza team](https://stanfordnlp.github.io/stanza/new_language.html#contributing-back-to-stanza). You can also find the official script to upload models to the Hub [here](https://github.com/stanfordnlp/huggingface-models/blob/main/hugging_stanza.py).

## Additional resources

* `stanza` [docs](https://stanfordnlp.github.io/stanza/).