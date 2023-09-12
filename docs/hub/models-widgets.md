# Widgets

## What's a widget?

Many model repos have a widget that allows anyone to run inferences directly in the browser!

Here are some examples:
* [Named Entity Recognition](https://huggingface.co/spacy/en_core_web_sm?text=My+name+is+Sarah+and+I+live+in+London) using [spaCy](https://spacy.io/).
* [Image Classification](https://huggingface.co/google/vit-base-patch16-224) using [🤗 Transformers](https://github.com/huggingface/transformers)
* [Text to Speech](https://huggingface.co/julien-c/ljspeech_tts_train_tacotron2_raw_phn_tacotron_g2p_en_no_space_train) using [ESPnet](https://github.com/espnet/espnet).
* [Sentence Similarity](https://huggingface.co/osanseviero/full-sentence-distillroberta3) using [Sentence Transformers](https://github.com/UKPLab/sentence-transformers).

You can try out all the widgets [here](https://huggingface-widgets.netlify.app/).

## Enabling a widget

A widget is automatically created for your model when you upload it to the Hub. To determine which pipeline and widget to display (`text-classification`, `token-classification`, `translation`, etc.), we analyze information in the repo, such as the metadata provided in the model card and configuration files. This information is mapped to a single `pipeline_tag`. We choose to expose **only one** widget per model for simplicity.

For most use cases, we determine the model type from the tags. For example, if there is `tag: text-classification` in the [model card metadata](./model-cards), the inferred `pipeline_tag` will be `text-classification`.

For some libraries, such as 🤗  `Transformers`, the model type should be inferred automatically based from configuration files (`config.json`). The architecture can determine the type: for example, `AutoModelForTokenClassification` corresponds to `token-classification`. If you're interested in this, you can see pseudo-code in [this gist](https://gist.github.com/julien-c/857ba86a6c6a895ecd90e7f7cab48046).

**You can always manually override your pipeline type with `pipeline_tag: xxx` in your [model card metadata](./model-cards#model-card-metadata).**

### How can I control my model's widget example input?

You can specify the widget input in the model card metadata section:

```yaml
widget:
- text: "Jens Peter Hansen kommer fra Danmark"
```

You can provide more than one example input. In the examples dropdown menu of the widget, they will appear as `Example 1`, `Example 2`, etc. Optionally, you can supply `example_title` as well.

<div class="flex justify-center">
<img class="block dark:hidden" width="500" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/widget_input_examples.gif"/>
<img class="hidden dark:block" width="500" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/widget_input_examples-dark.gif"/>
</div>

```yaml
widget:
- text: "Is this review positive or negative? Review: Best cast iron skillet you will ever buy."
  example_title: "Sentiment analysis"
- text: "Barack Obama nominated Hilary Clinton as his secretary of state on Monday. He chose her because she had ..."
  example_title: "Coreference resolution"
- text: "On a shelf, there are five books: a gray book, a red book, a purple book, a blue book, and a black book ..."
  example_title: "Logic puzzles"
- text: "The two men running to become New York City's next mayor will face off in their first debate Wednesday night ..."
  example_title: "Reading comprehension"
```

Moreover, you can specify non-text example inputs in the model card metadata. Refer [here](./models-widgets-examples) for a complete list of sample input formats for all widget types. For vision & audio widget types, provide example inputs with `src` rather than `text`. 

For example, allow users to choose from two sample audio files for automatic speech recognition tasks by:

```yaml
widget:
- src: https://example.org/somewhere/speech_samples/sample1.flac
  example_title: Speech sample 1
- src: https://example.org/somewhere/speech_samples/sample2.flac
  example_title: Speech sample 2
```

Note that you can also include example files in your model repository and use
them as:

```yaml
widget:
- src: https://huggingface.co/username/model_repo/resolve/main/sample1.flac
  example_title: Custom Speech Sample 1
```

We provide example inputs for some languages and most widget types in [the DefaultWidget.ts file](https://github.com/huggingface/hub-docs/blob/main/js/src/lib/interfaces/DefaultWidget.ts). If some examples are missing, we welcome PRs from the community to add them!


## What are all the possible task/widget types?

You can find all the supported tasks [here](https://github.com/huggingface/hub-docs/blob/main/js/src/lib/interfaces/Types.ts).

Here are some links to examples:

- `text-classification`, for instance [`roberta-large-mnli`](https://huggingface.co/roberta-large-mnli)
- `token-classification`, for instance [`dbmdz/bert-large-cased-finetuned-conll03-english`](https://huggingface.co/dbmdz/bert-large-cased-finetuned-conll03-english)
- `question-answering`, for instance [`distilbert-base-uncased-distilled-squad`](https://huggingface.co/distilbert-base-uncased-distilled-squad)
- `translation`, for instance [`t5-base`](https://huggingface.co/t5-base)
- `summarization`, for instance [`facebook/bart-large-cnn`](https://huggingface.co/facebook/bart-large-cnn)
- `conversational`, for instance [`facebook/blenderbot-400M-distill`](https://huggingface.co/facebook/blenderbot-400M-distill)
- `text-generation`, for instance [`gpt2`](https://huggingface.co/gpt2)
- `fill-mask`, for instance [`distilroberta-base`](https://huggingface.co/distilroberta-base)
- `zero-shot-classification` (implemented on top of a nli `text-classification` model), for instance [`facebook/bart-large-mnli`](https://huggingface.co/facebook/bart-large-mnli)
- `table-question-answering`, for instance [`google/tapas-base-finetuned-wtq`](https://huggingface.co/google/tapas-base-finetuned-wtq)
- `sentence-similarity`, for instance [`osanseviero/full-sentence-distillroberta2`](/osanseviero/full-sentence-distillroberta2)

## How can I control my model's widget Inference API parameters?

Generally, the Inference API for a model uses the default pipeline settings associated with each task. But if you'd like to change the pipeline's default settings and specify additional inference parameters, you can configure the parameters directly through the model card metadata. Refer [here](https://huggingface.co/docs/api-inference/detailed_parameters) for some of the most commonly used parameters associated with each task.

For example, if you want to specify an aggregation strategy for a NER task in the widget:

```yaml
inference:
  parameters:
    aggregation_strategy: "none"
```

Or if you'd like to change the temperature for a summarization task in the widget:

```yaml
inference:
  parameters:
    temperature: 0.7
``` 

The Inference API allows you to send HTTP requests to models in the Hugging Face Hub, and it's 2x to 10x faster than the widgets! ⚡⚡ Learn more about it by reading the [Inference API documentation](./models-inference).