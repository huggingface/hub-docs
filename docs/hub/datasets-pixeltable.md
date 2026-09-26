# Pixeltable

[Pixeltable](https://github.com/pixeltable/pixeltable) is an open-source declarative multimodal AI data engine for tables, computed columns, incremental computation, and vector search. Pixeltable provides built-in support for reading datasets from the Hugging Face Hub, integrating Hugging Face Transformers and Sentence Transformers directly as computed columns, and indexing embeddings for fast similarity search.

## Getting Started

To get started, install `pixeltable`:

```bash
pip install pixeltable
```

If you plan to run local Hugging Face transformer models or sentence transformers, install the optional dependencies:

```bash
pip install "pixeltable[transformers]" sentence-transformers
```

## Load Data from Hugging Face Hub

You can easily load datasets from the Hugging Face Hub using standard formats like Parquet and CSV into a Pixeltable table.

```python
import pixeltable as pxt
import pandas as pd

# Load a Parquet dataset from the Hub using pandas and the hf:// protocol
df = pd.read_parquet("hf://datasets/datasets-examples/doc-formats-parquet-1/train.parquet")

# Create a Pixeltable table
t = pxt.create_table("hf_dataset", df)
```

## Computed Columns with Hugging Face Models

One of Pixeltable's core capabilities is computed columns. Computed columns allow you to invoke Hugging Face models natively in table schema definitions:

```python
from pixeltable.functions.huggingface import sentence_transformer, pipeline

# 1. Automatic embedding generation with Sentence Transformers
embed = sentence_transformer.using(model_id="sentence-transformers/all-MiniLM-L6-v2")
t.add_computed_column(embedding=embed(t.text))

# 2. Text classification or sentiment analysis via Transformers pipeline
sentiment = pipeline.using(task="sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")
t.add_computed_column(sentiment_result=sentiment(t.text))
```

Whenever new rows are inserted, Pixeltable automatically computes the new values, caches results, and ensures transformations stay synchronized.

## Vector Similarity Search

Pixeltable features native embedding indexes for high-performance vector search:

```python
# Create an embedding index on the text column
t.add_embedding_index("text", string_embed=embed)

# Run semantic similarity queries
sim = t.text.similarity("machine learning multimodal databases")
results = t.order_by(sim, desc=True).limit(5).select(t.text, sim).collect()
```

## Multimodal Media Support

Pixeltable handles text, images, video, audio, and documents natively in tables:
- **Image & Video**: Store paths or URLs to media files, automatically extract video frames, and run vision models (CLIP, YOLO, ViT).
- **Audio**: Transcribe audio files automatically with Whisper models.
- **Documents**: Chunk documents and extract text for multimodal RAG pipelines.

Learn more at [docs.pixeltable.com](https://docs.pixeltable.com/).
