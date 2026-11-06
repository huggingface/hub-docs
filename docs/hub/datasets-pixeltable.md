# Pixeltable

[Pixeltable](https://github.com/pixeltable/pixeltable) is an open-source Python library for multimodal data. Images, video, audio, and documents are typed table columns; model calls and other transformations are computed columns that run incrementally when rows are inserted; and embedding indexes keep similarity search in sync with the table. Hugging Face datasets can be loaded straight into a Pixeltable table, and Hugging Face models can run as computed columns.

## Getting Started

To get started, install `pixeltable` and `datasets`:

```bash
pip install pixeltable datasets
```

The model examples below run Hugging Face models locally and also need `transformers`, `sentence-transformers`, and `torch`:

```bash
pip install transformers sentence-transformers torch
```

## Load a dataset from the Hub

`pxt.create_table()` accepts a 🤗 Datasets `Dataset`, `DatasetDict`, `IterableDataset`, or `IterableDatasetDict` as its `source`. The table schema is inferred from the dataset features: for example, `Image`, `Audio`, and `Video` features become `pxt.Image`, `pxt.Audio`, and `pxt.Video` columns, and `ClassLabel` values are stored as their label names.

```python
import pixeltable as pxt
from datasets import load_dataset

ds = load_dataset("cornell-movie-review-data/rotten_tomatoes", split="train[:100]")
t = pxt.create_table("reviews", source=ds)
```

To import every split of a `DatasetDict` into one table, use `pxt.io.import_huggingface_dataset()` and name a column to hold the split:

```python
dd = load_dataset("cornell-movie-review-data/rotten_tomatoes")
t_all = pxt.io.import_huggingface_dataset("reviews_all", dd, column_name_for_split="split")
```

## Stream from the Hub

A streaming dataset (`IterableDataset`) can be used as the source as well, so rows are read from the Hub without downloading the full dataset first:

```python
stream = load_dataset("cornell-movie-review-data/rotten_tomatoes", split="train", streaming=True)
t_stream = pxt.create_table("reviews_stream", source=stream.take(50))
```

## Run Hugging Face models as computed columns

Functions in `pixeltable.functions.huggingface` run models from the Hub inside the table. A computed column is evaluated for the existing rows and then automatically for every new row, and its results are stored:

```python
from pixeltable.functions.huggingface import text_classification

t.add_computed_column(
    sentiment=text_classification(
        t.text, model_id="distilbert-base-uncased-finetuned-sst-2-english", top_k=2
    )
)
```

## Vector similarity search

An embedding index is declared on a column and maintained on insert, update, and delete. Here it uses a Sentence Transformers model from the Hub:

```python
from pixeltable.functions.huggingface import sentence_transformer

embed = sentence_transformer.using(model_id="sentence-transformers/all-MiniLM-L6-v2")
t.add_embedding_index("text", embedding=embed)

sim = t.text.similarity(string="a heartfelt family drama")
results = t.order_by(sim, asc=False).limit(5).select(t.text, t.label, score=sim).collect()
```

New rows are classified and indexed as they are inserted:

```python
t.insert([{"text": "A gorgeous, moving film.", "label": "pos"}])
```

Learn more in the [Pixeltable documentation](https://docs.pixeltable.com/), including the [Hugging Face integration guide](https://docs.pixeltable.com/howto/providers/working-with-hugging-face).
