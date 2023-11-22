# Model Cards

<Tip>

[New! Try our experimental Model Card Creator App](https://huggingface.co/spaces/huggingface/Model_Cards_Writing_Tool)

</Tip>

## What are Model Cards?

Model cards are files that accompany the models and provide handy information. Under the hood, model cards are simple Markdown files with additional metadata. Model cards are essential for discoverability, reproducibility, and sharing! You can find a model card as the `README.md` file in any model repo.

The model card should describe:
- the model
- its intended uses & potential limitations, including biases and ethical considerations as detailed in [Mitchell, 2018](https://arxiv.org/abs/1810.03993)
- the training params and experimental info (you can embed or link to an experiment tracking platform for reference)
- which datasets were used to train your model
- your evaluation results

The model card template is available [here](https://github.com/huggingface/huggingface_hub/blob/main/src/huggingface_hub/templates/modelcard_template.md).

## Model card metadata

A model repo will render its `README.md` as a model card. The model card is a [Markdown](https://en.wikipedia.org/wiki/Markdown) file, with a [YAML](https://en.wikipedia.org/wiki/YAML) section at the top that contains metadata about the model. 

The metadata you add to the model card supports discovery and easier use of your model. For example:

* Allowing users to filter models at https://huggingface.co/models.
* Displaying the model's license.
* Adding datasets to the metadata will add a message reading `Datasets used to train:` to your model card and link the relevant datasets, if they're available on the Hub.

Dataset, metric, and language identifiers are those listed on the [Datasets](https://huggingface.co/datasets), [Metrics](https://huggingface.co/metrics) and [Languages](https://huggingface.co/languages) pages.


### Adding metadata to your model card

There are a few different ways to add metadata to your model card including:
- Using the metadata UI
- Directly editing the YAML section of the `README.md` file
- Via the [`huggingface_hub`](https://huggingface.co/docs/huggingface_hub) Python library, see the [docs](https://huggingface.co/docs/huggingface_hub/guides/model-cards#update-metadata) for more details.

Many libraries with [Hub integration](./models-libraries.md) will automatically add metadata to the model card when you upload a model. 

### Using the metadata UI

You can add metadata to your model card using the metadata UI. To access the metadata UI, go to the model page and click on the `Edit model card` button in the top right corner of the model card. This will open an editor showing the model card `README.md` file, as well as a UI for editing the metadata.


<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/548b926bfb572ec93b798548a64755e6e68a495a/hub/metadata-ui-editor.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/548b926bfb572ec93b798548a64755e6e68a495a/hub/metadata-ui-editor-dark.png"/>
</div>

This UI will allow you to add key metadata to your model card and many of the fields will autocomplete based on the information you provide. Using the UI is the easiest way to add metadata to your model card, but it doesn't support all of the metadata fields. If you want to add metadata that isn't supported by the UI, you can edit the YAML section of the `README.md` file directly.

### Editing the YAML section of the `README.md` file

You can also directly edit the YAML section of the `README.md` file. If the model card doesn't already have a YAML section, you can add one by adding three `---` at the top of the file, then include all of the relevant metadata, and close the section with another group of `---` like the example below:

```yaml
---
language: 
  - "List of ISO 639-1 code for your language"
  - lang1
  - lang2
thumbnail: "url to a thumbnail used in social sharing"
tags:
- tag1
- tag2
license: "any valid license identifier"
datasets:
- dataset1
- dataset2
metrics:
- metric1
- metric2
base_model: "base model Hub identifier"
---
```

You can find the detailed model card metadata specification [here](https://github.com/huggingface/hub-docs/blob/main/modelcard.md?plain=1).

### Specifying a library

You can specify the supported libraries in the model card metadata section. Find more about our supported libraries [here](./models-libraries). The library will be specified in the following order of priority:

1. Specifying `library_name` in the model card (recommended if your model is not a `transformers` model). This information can be added via the metadata UI or directly in the model card YAML section:

```yaml
library_name: flair
```

2. Having a tag with the name of a library that is supported

```yaml
tags:
- flair
```

If it's not specified, the Hub will try to automatically detect the library type. Unless your model is from `transformers`, this approach is discouraged and repo creators should use the explicit `library_name` as much as possible. 

1. By looking into the presence of files such as `*.nemo` or `*saved_model.pb*`, the Hub can determine if a model is from NeMo or Keras. 
2. If nothing is detected and there is a `config.json` file, it's assumed the library is `transformers`.

### Specifying a base model

If your model is a fine-tune or adapter of a base model, you can specify the base model in the model card metadata section:

```yaml
base_model: HuggingFaceH4/zephyr-7b-beta
```

This metadata will be used to display the base model on the model page. Users can also use this information to filter models by base model or find models that are fine-tuned from a specific base model.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/base-model-ui.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/base-model-ui-dark.png"/>
</div>

### Specifying a dataset

You can specify the datasets used to train your model in the model card metadata section. The datasets will be displayed on the model page and users will be able to filter models by dataset. You should use the Hub dataset identifier, which is the same as the dataset's repo name as the identifier:

```yaml
datasets:
- imdb
- HuggingFaceH4/no_robots
```

### Specifying a pipeline_tag

You can specify the pipeline tag in the model card metadata. The pipeline tag indicates the type of task the model is intended for. The pipeline tag will be displayed on the model page and users will be able to filter models by pipeline tag. This tag is also used to determine which [widget](./models-widgets.md#enabling-a-widget) to use for the model. 

For `transformers` models, the pipeline tag is automatically inferred from the model's `config.json` file but you can override it in the model card metadata if required. Editing this field in the metadata UI will ensure that the pipeline tag is valid. Some other libraries with Hub integration will also automatically add the pipeline tag to the model card metadata.

### Evaluation Results

You can even specify your **model's eval results** in a structured way, which will allow the Hub to parse, display, and even link them to Papers With Code leaderboards. See how to format this data [in the metadata spec](https://github.com/huggingface/hub-docs/blob/main/modelcard.md?plain=1).

Here is a partial example (omitting the eval results part):
```yaml
---
language:
- ru
- en
tags:
- translation
license: apache-2.0
datasets:
- wmt19
metrics:
- bleu
- sacrebleu
---
```

If a model includes valid eval results, they will be displayed like this:

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/eval-results.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/base-model-ui-dark.png"/>
</div>

### CO<sub>2</sub> Emissions

The model card is also a great place to show information about the CO<sub>2</sub> impact of your model. Visit our [guide on tracking and reporting CO<sub>2</sub> emissions](./model-cards-co2) to learn more.

### Linking a Paper

If the model card includes a link to a paper on arXiv, the Hugging Face Hub will extract the arXiv ID  and include it in the model tags with the format `arxiv:<PAPER ID>`. Clicking on the tag will let you:

* Visit the Paper page
* Filter for other models on the Hub that cite the same paper.

<div class="flex justify-center">
<img class="block dark:hidden" width="300" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/models-arxiv.png"/>
<img class="hidden dark:block" width="300" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/models-arxiv-dark.png"/>
</div>

Read more about Paper pages [here](./paper-pages).

## FAQ

### How are model tags determined?

Each model page lists all the model's tags in the page header, below the model name. These are primarily computed from the model card metadata, although some are added automatically, as described in [Creating a Widget](./models-widgets#creating-a-widget).

### Can I add custom tags to my model?

Yes, you can add custom tags to your model by adding them to the `tags` field in the model card metadata. The metadata UI will suggest some popular tags, but you can add any tag you want.

### Can I write LaTeX in my model card?

Yes! The Hub uses the [KaTeX](https://katex.org/) math typesetting library to render math formulas server-side before parsing the Markdown.

You have to use the following delimiters:
- `$$ ... $$` for display mode
- `&#92;&#92;(...\\)` for inline mode (no space between the slashes and the parenthesis).

Then you'll be able to write:

$$
\LaTeX
$$

$$
\mathrm{MSE} = \left(\frac{1}{n}\right)\sum_{i=1}^{n}(y_{i} - x_{i})^{2}
$$

$$ E=mc^2 $$


