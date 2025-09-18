# fenic

[fenic](https://github.com/typedef-ai/fenic) is a PySpark-inspired DataFrame framework designed for building production AI and agentic applications. fenic provides support for reading datasets directly from the Hugging Face Hub.

<div class="flex justify-center">
<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/fenic_hf.png"/>
</div>

## Getting Started

To get started, pip install `fenic`:

```bash
pip install fenic
```

## Overview

fenic is an opinionated data processing framework that combines:
- **DataFrame API**: PySpark-inspired operations for familiar data manipulation
- **Semantic Operations**: Built-in AI/LLM operations including semantic functions, embeddings, and clustering
- **Model Integration**: Native support for AI providers (Anthropic, OpenAI, Cohere, Google)
- **Query Optimization**: Automatic optimization through logical plan transformations

## Read from Hugging Face Hub

fenic can read datasets directly from the Hugging Face Hub using the `hf://` protocol. This functionality is built into fenic's DataFrameReader interface.

### Supported Formats

fenic supports reading the following formats from Hugging Face:
- **Parquet files** (`.parquet`)
- **CSV files** (`.csv`)

### Reading Datasets

To read a dataset from the Hugging Face Hub:

```python
import fenic as fc

# Assuming session is already created
# Read a CSV file from a public dataset
df = session.read.csv("hf://datasets/datasets-examples/doc-formats-csv-1/data.csv")

# Read Parquet files using glob patterns
df = session.read.parquet("hf://datasets/cais/mmlu/astronomy/*.parquet")

# Read from a specific dataset revision
df = session.read.parquet("hf://datasets/datasets-examples/doc-formats-csv-1@~parquet/**/*.parquet")
```

### Reading with Schema Management

```python
# Read multiple CSV files with schema merging
df = session.read.csv("hf://datasets/username/dataset_name/*.csv", merge_schemas=True)

# Read multiple Parquet files with schema merging
df = session.read.parquet("hf://datasets/username/dataset_name/*.parquet", merge_schemas=True)
```

### Authentication

To read private datasets, you need to set your Hugging Face token as an environment variable:

```python
import os
os.environ["HF_TOKEN"] = "your_hugging_face_token_here"
```

### Path Format

The Hugging Face path format in fenic follows this structure:
```
hf://{repo_type}/{repo_id}/{path_to_file}
```

You can also specify dataset revisions or versions:
```
hf://{repo_type}/{repo_id}@{revision}/{path_to_file}
```

Features:
- Supports glob patterns (`*`, `**`)
- Dataset revisions/versions using `@` notation:
  - Specific commit: `@d50d8923b5934dc8e74b66e6e4b0e2cd85e9142e`
  - Branch: `@refs/convert/parquet`
  - Branch alias: `@~parquet`
- Requires `HF_TOKEN` environment variable for private datasets

### Mixing Data Sources

fenic allows you to combine multiple data sources in a single read operation, including mixing different protocols:

```python
# Mix HF and local files in one read call
df = session.read.parquet([
    "hf://datasets/cais/mmlu/astronomy/*.parquet",
    "file:///local/data/*.parquet",
    "./relative/path/data.parquet"
])
```

This flexibility allows you to seamlessly combine data from Hugging Face Hub and local files in your data processing pipeline.

## Processing Data from Hugging Face

Once loaded from Hugging Face, you can use fenic's full DataFrame API:

### Basic DataFrame Operations

```python
import fenic as fc

# Load IMDB dataset from Hugging Face
df = session.read.parquet("hf://datasets/imdb/plain_text/train-*.parquet")

# Filter and select
positive_reviews = df.filter(fc.api.functions.col("label") == 1).select("text", "label")

# Group by and aggregate  
label_counts = df.group_by("label").agg(
    fc.api.functions.count().alias("count")
)
```

### AI-Powered Operations

To use semantic and embedding operations, configure language and embedding models in your SessionConfig. Once configured:

```python
import fenic as fc

# Load a text dataset from Hugging Face
df = session.read.parquet("hf://datasets/imdb/plain_text/train-00000-of-00001.parquet")

# Add embeddings to text columns
df_with_embeddings = df.with_column(
    "embedding", 
    fc.api.functions.embedding("text")
)

# Apply semantic functions for sentiment analysis
df_analyzed = df.with_column(
    "sentiment_score",
    fc.api.functions.semantic("Rate the sentiment from 1-10: {text}")
)
```

## Example: Analyzing MMLU Dataset

```python
import fenic as fc
import os

# Set HF token if accessing private datasets
os.environ["HF_TOKEN"] = "your_token_here"

# Load MMLU astronomy subset from Hugging Face
df = session.read.parquet("hf://datasets/cais/mmlu/astronomy/*.parquet")

# Process the data
processed_df = (df
    # Filter for specific criteria
    .filter(fc.api.functions.col("subject") == "astronomy")
    # Select relevant columns
    .select("question", "choices", "answer")
    # Add difficulty analysis (requires semantic configuration)
    .with_column("difficulty",
                 fc.api.functions.semantic("Rate difficulty 1-5: {question}"))
)

# Show results
processed_df.show()
```

## Limitations

- **Writing to Hugging Face Hub**: Currently not supported. fenic can only read from the Hub.
- **Supported Read Formats**: Limited to CSV and Parquet formats when reading from the Hub.
- **Semantic Operations**: Require configuring language/embedding models in SessionConfig.

## Resources

- [fenic GitHub Repository](https://github.com/typedef-ai/fenic)
- [fenic Documentation](https://docs.fenic.ai/latest/)