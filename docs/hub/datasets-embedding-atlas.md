# Embedding Atlas

[Embedding Atlas](https://apple.github.io/embedding-atlas/) is an interactive visualization tool for exploring large embedding spaces. It enables you to visualize, cross-filter, and search embeddings alongside associated metadata, helping you understand patterns and relationships in high-dimensional data. All computation happens in your computer, ensuring your data remains private and secure.

## Key Features

- **Interactive exploration**: Navigate through millions of embeddings with smooth, responsive visualization
- **Browser-based computation**: Compute embeddings and projections locally without sending data to external servers
- **Cross-filtering**: Link and filter data across multiple metadata columns
- **Search capabilities**: Find similar data points to a given query or existing item
- **Multiple integration options**: Use via command line, Jupyter widgets, or web interface

## Prerequisites

First, install Embedding Atlas:

```bash
pip install embedding-atlas
```

If you plan to load private datasets from the Hugging Face Hub, you'll also need to [login with your Hugging Face account](/docs/huggingface_hub/quick-start#login):

```bash
hf auth login
```

## Loading Datasets from the Hub

Embedding Atlas provides seamless integration with the Hugging Face Hub, allowing you to visualize embeddings from any dataset directly.

### Using the Command Line

The simplest way to visualize a Hugging Face dataset is through the command line interface. Try it with the IMDB dataset:

```bash
# Load the IMDB dataset from the Hub
embedding-atlas stanfordnlp/imdb

# Specify the text column for embedding computation
embedding-atlas stanfordnlp/imdb --text "text"

# Load only a sample for faster exploration
embedding-atlas stanfordnlp/imdb --text "text" --sample 5000
```

For your own datasets, use the same pattern:

```bash
# Load your dataset from the Hub
embedding-atlas username/dataset-name

# Load multiple splits
embedding-atlas username/dataset-name --split train --split test

# Specify custom text column
embedding-atlas username/dataset-name --text "content"
```

### Using Python and Jupyter

You can also use Embedding Atlas in Jupyter notebooks for interactive exploration:

```python
from embedding_atlas.widget import EmbeddingAtlasWidget
from datasets import load_dataset
import pandas as pd

# Load the IMDB dataset from Hugging Face Hub
dataset = load_dataset("stanfordnlp/imdb", split="train[:5000]")

# Convert to pandas DataFrame
df = dataset.to_pandas()

# Create interactive widget
widget = EmbeddingAtlasWidget(df)
widget
```

For your own datasets:

```python
from embedding_atlas.widget import EmbeddingAtlasWidget
from datasets import load_dataset
import pandas as pd

# Load your dataset from the Hub
dataset = load_dataset("username/dataset-name", split="train")
df = dataset.to_pandas()

# Create interactive widget
widget = EmbeddingAtlasWidget(df)
widget
```

### Working with Pre-computed Embeddings

If you have datasets with pre-computed embeddings, you can load them directly:

```bash
# Load dataset with pre-computed coordinates
embedding-atlas username/dataset-name \
    --x "embedding_x" \
    --y "embedding_y"

# Load with pre-computed nearest neighbors
embedding-atlas username/dataset-name \
    --neighbors "neighbors_column"
```

## Customizing Embeddings

Embedding Atlas uses [SentenceTransformers](https://huggingface.co/sentence-transformers) by default but supports custom embedding models:

```bash
# Use a specific embedding model
embedding-atlas stanfordnlp/imdb \
    --text "text" \
    --model "sentence-transformers/all-MiniLM-L6-v2"

# For models requiring remote code execution
embedding-atlas username/dataset-name \
    --model "custom/model" \
    --trust-remote-code
```

### UMAP Projection Parameters

Fine-tune the dimensionality reduction for your specific use case:

```bash
embedding-atlas stanfordnlp/imdb \
    --text "text" \
    --umap-n-neighbors 30 \
    --umap-min-dist 0.1 \
    --umap-metric "cosine"
```

## Use Cases

### Exploring Text Datasets

Visualize and explore text corpora to identify clusters, outliers, and patterns:

```python
from embedding_atlas.widget import EmbeddingAtlasWidget
from datasets import load_dataset
import pandas as pd

# Load a text classification dataset
dataset = load_dataset("stanfordnlp/imdb", split="train[:5000]")
df = dataset.to_pandas()

# Visualize with metadata
widget = EmbeddingAtlasWidget(df)
widget
```


## Additional Resources

- [Embedding Atlas GitHub Repository](https://github.com/apple/embedding-atlas)
- [Official Documentation](https://apple.github.io/embedding-atlas/)
- [Interactive Demo](https://apple.github.io/embedding-atlas/upload/)
- [Command Line Reference](https://apple.github.io/embedding-atlas/tool.html)
