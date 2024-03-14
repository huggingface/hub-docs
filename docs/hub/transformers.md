# Using 🤗 `transformers` at Hugging Face

🤗 `transformers` is a library maintained by Hugging Face and the community, for state-of-the-art Machine Learning for Pytorch, TensorFlow and JAX. It provides thousands of pretrained models to perform tasks on different modalities such as text, vision, and audio. We are a bit biased, but we really like 🤗 `transformers`!

## Exploring 🤗 transformers in the Hub

There are over 25,000 `transformers` models in the Hub which you can find by filtering at the left of [the models page](https://huggingface.co/models?library=transformers&sort=downloads). 

You can find models for many different tasks:

* Extracting the answer from a context ([question-answering](https://huggingface.co/models?library=transformers&pipeline_tag=question-answering&sort=downloads)).
* Creating summaries from a large text ([summarization](https://huggingface.co/models?library=transformers&pipeline_tag=summarization&sort=downloads)).
* Classify text (e.g. as spam or not spam, [text-classification](https://huggingface.co/models?library=transformers&pipeline_tag=text-classification&sort=downloads)).
* Generate a new text with models such as GPT ([text-generation](https://huggingface.co/models?library=transformers&pipeline_tag=text-generation&sort=downloads)).
* Identify parts of speech (verb, subject, etc.) or entities (country, organization, etc.) in a sentence ([token-classification](https://huggingface.co/models?library=transformers&pipeline_tag=token-classification&sort=downloads)).
* Transcribe audio files to text ([automatic-speech-recognition](https://huggingface.co/models?library=transformers&pipeline_tag=automatic-speech-recognition&sort=downloads)).
* Classify the speaker or language in an audio file ([audio-classification](https://huggingface.co/models?library=transformers&pipeline_tag=audio-classification&sort=downloads)).
* Detect objects in an image ([object-detection](https://huggingface.co/models?library=transformers&pipeline_tag=object-detection&sort=downloads)).
* Segment an image ([image-segmentation](https://huggingface.co/models?library=transformers&pipeline_tag=image-segmentation&sort=downloads)).
* Do Reinforcement Learning ([reinforcement-learning](https://huggingface.co/models?library=transformers&pipeline_tag=reinforcement-learning&sort=downloads))!

You can try out the models directly in the browser if you want to test them out without downloading them thanks to the in-browser widgets! 

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-transformers_widget.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-transformers_widget-dark.png"/>
</div>

## Using existing models

All `transformer` models are a line away from being used! Depending on how you want to use them, you can use the high-level API using the `pipeline` function or you can use `AutoModel` for more control.

```py
# With pipeline, just specify the task and the model id from the Hub.
from transformers import pipeline
pipe = pipeline("text-generation", model="distilbert/distilgpt2")

# If you want more control, you will need to define the tokenizer and model.
from transformers import AutoTokenizer, AutoModelForCausalLM
tokenizer = AutoTokenizer.from_pretrained("distilbert/distilgpt2")
model = AutoModelForCausalLM.from_pretrained("distilbert/distilgpt2")
```

You can also load a model from a specific version (based on commit hash, tag name, or branch) as follows:

```py
model = AutoModel.from_pretrained(
    "julien-c/EsperBERTo-small", revision="v2.0.1"  # tag name, or branch name, or commit hash
)
```

If you want to see how to load a specific model, you can click `Use in Transformers` and you will be given a working snippet that you can load it! If you need further information about the model architecture, you can also click the "Read model documentation" at the bottom of the snippet.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-transformers_snippet.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-transformers_snippet-dark.png"/>
</div>

## Sharing your models

To read all about sharing models with `transformers`, please head out to the [Share a model](https://huggingface.co/docs/transformers/model_sharing) guide in the official documentation.

Many classes in `transformers`, such as the models and tokenizers, have a `push_to_hub` method that allows to easily upload the files to a repository.

```py
# Pushing model to your own account
model.push_to_hub("my-awesome-model")

# Pushing your tokenizer
tokenizer.push_to_hub("my-awesome-model")

# Pushing all things after training
trainer.push_to_hub()
```

There is much more you can do, so we suggest to review the [Share a model](https://huggingface.co/docs/transformers/model_sharing) guide.

## Additional resources

* Transformers [library](https://github.com/huggingface/transformers).
* Transformers [docs](https://huggingface.co/docs/transformers/index).
* Share a model [guide](https://huggingface.co/docs/transformers/model_sharing).
