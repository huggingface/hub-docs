---
title: Model Cards
---

<h1>Model Cards</h1>

## What are Model Cards?

Mdoel cards are markdown files that accompany the models and provide very useful information. They are extremely important for discoverability, reproducibility and sharing! They are the `README.md` file in any model repo.

The model card should describe:
- the model
- its intended uses & potential limitations, including bias and ethical considerations as detailed in [Mitchell, 2018](https://arxiv.org/abs/1810.03993)
- the training params and experimental info (you can embed or link to an experiment tracking platform for reference)
- which datasets did you train on and your eval results

## Model Card metadata

You can add a YAML section to the model cards (that `README.md` file) by adding three `---` to the top of your model card, including all of the metadata, and enclosing it with another group of `---` such as the example below:

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
---
```

You can find the detailed specification [here](https://github.com/huggingface/hub-docs/blame/main/modelcard.md).


Some useful information on them:
* All the tags can be used to filter the list of models on https://huggingface.co/models.
* License identifiers are the keywords listed in the right column of [this table](#list-of-license-identifiers).
* Dataset, metric, and language identifiers are those listed on the [Datasets](https://huggingface.co/datasets), [Metrics](https://huggingface.co/metrics) and [Languages](https://huggingface.co/languages) pages and in the [`datasets`](https://github.com/huggingface/datasets) repository.

You can even specify your **model's eval results** in a structured way, which will allow the Hub to parse, display, and even link them to Papers With Code leaderboards. See how to format this data [in the metadata spec](https://github.com/huggingface/hub-docs/blame/main/modelcard.md).


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

![/docs/assets/hub/eval-results.jpg](/docs/assets/hub/eval-results.jpg)

### CO<sub>2</sub> Emissions
Among other details, the Model Card is also a great place to store information about the CO<sub>2</sub> impact of your model. Visit our [guide on tracking and reporting CO<sub>2</sub> emissions](./models-cards-co2) to learn more.

## FAQ

### How are model tags determined?

Each model page lists all the model's tags in the page header, below the model name.

Those are primarily computed from the model card metadata, except that we also add some of them automatically, as described in [How is a model's type of inference API and widget determined?](./models-widgets).

### Can I specify which framework supports my model?

Yes!🔥 You can specify the framework in the model card metadata section:

```yaml
tags:
- flair
```

Find more about our supported libraries [here](./models-the-hub#libraries)!

### How can I link a model to a dataset?

You can specify the dataset in the metadata:

```yaml
datasets:
- wmt19
```

### Can I write LaTeX in my model card?

Yes, we use the [KaTeX](https://katex.org/) math typesetting library to render math formulas server-side, before parsing the markdown.

You have to use the following delimiters:
- `$$ ... $$` for display mode
- `\\` `(` `...` `\\` `)` for inline mode (no space between the slashes and the parenthesis).

Then you'll be able to write:

$$
\LaTeX
$$

$$
\mathrm{MSE} = \left(\frac{1}{n}\right)\sum_{i=1}^{n}(y_{i} - x_{i})^{2}
$$

$$ E=mc^2 $$