# Widgets

## What's a widget?

Many model repos have a widget that allows anyone to run inferences directly in the browser. These widgets are powered by [Inference Providers](https://huggingface.co/docs/inference-providers), which provide developers streamlined, unified access to hundreds of machine learning models, backed by our serverless inference partners.

Here are some examples of current popular models:

- [DeepSeek V3](https://huggingface.co/deepseek-ai/DeepSeek-V3-0324) - State-of-the-art open-weights conversational model
- [Flux Kontext](https://huggingface.co/black-forest-labs/FLUX.1-Kontext-dev) - Open-weights transformer model for image editing
- [Falconsai's NSFW Detection](https://huggingface.co/Falconsai/nsfw_image_detection) - Image content moderation
- [ResembleAI's Chatterbox](https://huggingface.co/ResembleAI/chatterbox) - Production-grade open source text-to-speech model.

You can explore more models and their widgets on the [models page](https://huggingface.co/models?inference_provider=all&sort=trending) or try them interactively in the [Inference Playground](https://huggingface.co/playground).

## Enabling a widget

Widgets are displayed when the model is hosted by at least one Inference Provider, ensuring optimal performance and reliability for the model's inference. Providers autonomously chose and control what models they deploy.

The type of widget displayed (text-generation, text to image, etc) is inferred from the model's `pipeline_tag`, a special tag that the Hub tries to compute automatically for all models. The only exception is for the `conversational` widget which is shown on models with a `pipeline_tag` of either `text-generation` or `image-text-to-text`, as long as they’re also tagged as `conversational`. We choose to expose **only one** widget per model for simplicity.

For some libraries, such as `transformers`, the model type can be inferred automatically based from configuration files (`config.json`). The architecture can determine the type: for example, `AutoModelForTokenClassification` corresponds to `token-classification`. If you're interested in this, you can see pseudo-code in [this gist](https://gist.github.com/julien-c/857ba86a6c6a895ecd90e7f7cab48046).

For most other use cases, we use the model tags to determine the model task type. For example, if there is `tag: text-classification` in the [model card metadata](./model-cards), the inferred `pipeline_tag` will be `text-classification`.

**You can always manually override your pipeline type with `pipeline_tag: xxx` in your [model card metadata](./model-cards#model-card-metadata).** (You can also use the metadata GUI editor to do this).

### How can I control my model's widget example input?

You can specify the widget input in the model card metadata section:

```yaml
widget:
  - text: "This new restaurant has amazing food and great service!"
    example_title: "Positive Review"
  - text: "I'm really disappointed with this product. Poor quality and overpriced."
    example_title: "Negative Review"
  - text: "The weather is nice today."
    example_title: "Neutral Statement"
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

This is useful when the model is not yet supported by Inference Providers, so that the model page can still showcase how the model works and what results it gives.

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

The `output` property should be a YAML dictionary that represents the output format from Inference Providers.

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

## Widget Availability and Provider Support

Not all models have widgets available. Widget availability depends on:

1. **Task Support**: The model's task must be supported by at least one provider in the Inference Providers network
2. **Provider Availability**: At least one provider must be serving the specific model
3. **Model Configuration**: The model must have proper metadata and configuration files

To view the full list of supported tasks, check out [our dedicated documentation page](https://huggingface.co/docs/inference-providers/tasks/index).

The list of all providers and the tasks they support is available in [this documentation page](https://huggingface.co/docs/inference-providers/index#partners).

For models without provider support, you can still showcase functionality using [example outputs](#example-outputs) in your model card.

You can also click _Ask for provider support_ directly on the model page to encourage providers to serve the model, given there is enough community interest.

## Exploring Models with the Inference Playground

Before integrating models into your applications, you can test them interactively with the [Inference Playground](https://huggingface.co/playground). The playground allows you to:

- Test different [chat completion models](https://huggingface.co/models?inference_provider=all&sort=trending&other=conversational) with custom prompts
- Compare responses across different models
- Experiment with inference parameters like temperature, max tokens, and more
- Find the perfect model for your specific use case

The playground uses the same Inference Providers infrastructure that powers the widgets, so you can expect similar performance and capabilities when you integrate the models into your own applications.

<div class="flex justify-center">
<a href="https://huggingface.co/playground" target="_blank">
<img src="https://cdn-uploads.huggingface.co/production/uploads/5f17f0a0925b9863e28ad517/9_Tgf0Tv65srhBirZQMTp.png" alt="Inference Playground" style="max-width: 550px; width: 100%; border-radius: 8px;"/>
</a>
</div>
