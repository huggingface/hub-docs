# Using SpanMarker at Hugging Face

[SpanMarker](https://github.com/tomaarsen/SpanMarkerNER) is a framework for training powerful Named Entity Recognition models using familiar encoders such as BERT, RoBERTa and DeBERTa. Tightly implemented on top of the 🤗 Transformers library, SpanMarker can take good advantage of it. As a result, SpanMarker will be intuitive to use for anyone familiar with Transformers.

## Exploring SpanMarker in the Hub

You can find `span_marker` models by filtering at the left of the [models page](https://huggingface.co/models?library=span-marker).

All models on the Hub come with these useful features:
1. An automatically generated model card with a brief description.
2. An interactive widget you can use to play with the model directly in the browser.
3. An Inference API that allows you to make inference requests.

## Installation

To get started, you can follow the [SpanMarker installation guide](https://tomaarsen.github.io/SpanMarkerNER/install.html). You can also use the following one-line install through pip:

```
pip install -U span_marker
```

## Using existing models

All `span_marker` models can easily be loaded from the Hub.

```py
from span_marker import SpanMarkerModel

model = SpanMarkerModel.from_pretrained("tomaarsen/span-marker-bert-base-fewnerd-fine-super")
```

Once loaded, you can use [`SpanMarkerModel.predict`](https://tomaarsen.github.io/SpanMarkerNER/api/span_marker.modeling.html#span_marker.modeling.SpanMarkerModel.predict) to perform inference.

```py
model.predict("Amelia Earhart flew her single engine Lockheed Vega 5B across the Atlantic to Paris.")
```
```json
[
    {"span": "Amelia Earhart", "label": "person-other", "score": 0.7629689574241638, "char_start_index": 0, "char_end_index": 14},
    {"span": "Lockheed Vega 5B", "label": "product-airplane", "score": 0.9833564758300781, "char_start_index": 38, "char_end_index": 54},
    {"span": "Atlantic", "label": "location-bodiesofwater", "score": 0.7621214389801025, "char_start_index": 66, "char_end_index": 74},
    {"span": "Paris", "label": "location-GPE", "score": 0.9807717204093933, "char_start_index": 78, "char_end_index": 83}
]
```

If you want to load a specific SpanMarker model, you can click `Use in SpanMarker` and you will be given a working snippet!

<!--
TODO: Add this, but then with SpanMarker
<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-speechbrain_snippet1.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-speechbrain_snippet1-dark.png"/>
</div>
<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-speechbrain_snippet2.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-speechbrain_snippet2-dark.png"/>
</div>
-->

## Additional resources

* SpanMarker [repository](https://github.com/tomaarsen/SpanMarkerNER)
* SpanMarker [docs](https://tomaarsen.github.io/SpanMarkerNER)
