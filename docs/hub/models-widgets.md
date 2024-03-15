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

**You can always manually override your pipeline type with `pipeline_tag: xxx` in your [model card metadata](./model-cards#model-card-metadata).** (You can also use the metadata GUI editor to do this).

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

But even more convenient, if the file lives in the corresponding model repo, you can just use the filename or file path inside the repo:

```yaml
widget:
  - src: sample1.flac
    example_title: Custom Speech Sample 1
```

or if it was nested inside the repo:

```yaml
widget:
  - src: nested/directory/sample1.flac
```

We provide example inputs for some languages and most widget types in [default-widget-inputs.ts file](https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/default-widget-inputs.ts). If some examples are missing, we welcome PRs from the community to add them!

## Example outputs

As an extension to example inputs, for each widget example, you can also optionally describe the corresponding model output, directly in the `output` property.

This is useful when the model is not yet supported by the Inference API (for instance, the model library is not yet supported or the model is too large) so that the model page can still showcase how the model works and what results it gives.


For instance, for an [automatic-speech-recognition](./models-widgets-examples#automatic-speech-recognition) model:

```yaml
widget:
  - src: sample1.flac
    output:
      text: "Hello my name is Julien"
```

<div class="flex justify-center">
<img class="block dark:hidden" width="450" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/infrence-examples-asr-light.png"/>
<img class="hidden dark:block" width="450" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/infrence-examples-asr-dark.png"/>
</div>

The `output` property should be a YAML dictionary that represents the Inference API output.

For a model that outputs text, see the example above.

For a model that outputs labels (like a [text-classification](./models-widgets-examples#text-classification) model for instance), output should look like this:

```yaml
widget:
  - text: "I liked this movie"
    output:
      - label: POSITIVE
        score: 0.8
      - label: NEGATIVE
        score: 0.2
```

<div class="flex justify-center">
<img class="block dark:hidden" width="450" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/infrence-examples-textcls-light.png"/>
<img class="hidden dark:block" width="450" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/infrence-examples-textcls-dark.png"/>
</div>

Finally, for a model that outputs an image, audio, or any other kind of asset, the output should include a `url` property linking to either a file name or path inside the repo or a remote URL. For example, for a text-to-image model:

```yaml
widget:
  - text: "picture of a futuristic tiger, artstation"
    output:
      url: images/tiger.jpg
```

<div class="flex justify-center">
<img class="block dark:hidden" width="450" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/infrence-examples-text2img-light.png"/>
<img class="hidden dark:block" width="450" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/infrence-examples-text2img-dark.png"/>
</div>

We can also surface the example outputs in the Hugging Face UI, for instance, for a text-to-image model to display a gallery of cool image generations.

<div class="flex justify-center">
<img width="650" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/models-gallery.png"/>
</div>

## What are all the possible task/widget types?

You can find all the supported tasks in [pipelines.ts file](https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/pipelines.ts).

Here are some links to examples:

- `text-classification`, for instance [`FacebookAI/roberta-large-mnli`](https://huggingface.co/FacebookAI/roberta-large-mnli)
- `token-classification`, for instance [`dbmdz/bert-large-cased-finetuned-conll03-english`](https://huggingface.co/dbmdz/bert-large-cased-finetuned-conll03-english)
- `question-answering`, for instance [`distilbert/distilbert-base-uncased-distilled-squad`](https://huggingface.co/distilbert/distilbert-base-uncased-distilled-squad)
- `translation`, for instance [`google-t5/t5-base`](https://huggingface.co/google-t5/t5-base)
- `summarization`, for instance [`facebook/bart-large-cnn`](https://huggingface.co/facebook/bart-large-cnn)
- `conversational`, for instance [`facebook/blenderbot-400M-distill`](https://huggingface.co/facebook/blenderbot-400M-distill)
- `text-generation`, for instance [`openai-community/gpt2`](https://huggingface.co/openai-community/gpt2)
- `fill-mask`, for instance [`distilbert/distilroberta-base`](https://huggingface.co/distilbert/distilroberta-base)
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

The Inference API allows you to send HTTP requests to models in the Hugging Face Hub, and it's 2x to 10x faster than the widgets! ⚡⚡ Learn more about it by reading the [Inference API documentation](./models-inference). Finally, you can also deploy all those models to dedicated [Inference Endpoints](https://huggingface.co/docs/inference-endpoints).
