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

### Create a Session

Instantiate a fenic session with the default configuration (sufficient for reading datasets and other non-semantic operations):

```python
import fenic as fc

session = fc.Session.get_or_create(fc.SessionConfig())
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

session = fc.Session.get_or_create(fc.SessionConfig())

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

> **Note:** In fenic, a schema is the set of column names and their data types. When you enable `merge_schemas`, fenic tries to reconcile differences across files by filling missing columns with nulls and widening types where it can. Some layouts still cannot be merged—consult the fenic docs for [CSV schema merging limitations](https://docs.fenic.ai/latest/reference/fenic/?h=parquet#fenic.DataFrameReader.csv) and [Parquet schema merging limitations](https://docs.fenic.ai/latest/reference/fenic/?h=parquet#fenic.DataFrameReader.parquet).

### Authentication

To read private datasets, you need to set your Hugging Face token as an environment variable:

```shell
export HF_TOKEN="your_hugging_face_token_here"
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

session = fc.Session.get_or_create(fc.SessionConfig())

# Load IMDB dataset from Hugging Face
df = session.read.parquet("hf://datasets/imdb/plain_text/train-*.parquet")

# Filter and select
positive_reviews = df.filter(fc.col("label") == 1).select("text", "label")

# Group by and aggregate
label_counts = df.group_by("label").agg(
    fc.count("*").alias("count")
)
```

### AI-Powered Operations

To use semantic and embedding operations, configure language and embedding models in your SessionConfig. Once configured:

```python
import fenic as fc

# Requires OPENAI_API_KEY to be set for language and embedding calls
session = fc.Session.get_or_create(
    fc.SessionConfig(
        semantic=fc.SemanticConfig(
            language_models={
                "gpt-4o-mini": fc.OpenAILanguageModel(
                    model_name="gpt-4o-mini",
                    rpm=60,
                    tpm=60000,
                )
            },
            embedding_models={
                "text-embedding-3-small": fc.OpenAIEmbeddingModel(
                    model_name="text-embedding-3-small",
                    rpm=60,
                    tpm=60000,
                )
            },
        )
    )
)

# Load a text dataset from Hugging Face
df = session.read.parquet("hf://datasets/imdb/plain_text/train-00000-of-00001.parquet")

# Add embeddings to text columns
df_with_embeddings = df.select(
    "*",
    fc.semantic.embed(fc.col("text")).alias("embedding")
)

# Apply semantic functions for sentiment analysis
df_analyzed = df_with_embeddings.select(
    "*",
    fc.semantic.analyze_sentiment(
        fc.col("text"),
        model_alias="gpt-4o-mini",  # Optional: specify model
    ).alias("sentiment")
)
```

## Example: Analyzing MMLU Dataset

```python
import fenic as fc

# Requires OPENAI_API_KEY to be set for semantic calls
session = fc.Session.get_or_create(
    fc.SessionConfig(
        semantic=fc.SemanticConfig(
            language_models={
                "gpt-4o-mini": fc.OpenAILanguageModel(
                    model_name="gpt-4o-mini",
                    rpm=60,
                    tpm=60000,
                )
            },
        )
    )
)

# Load MMLU astronomy subset from Hugging Face
df = session.read.parquet("hf://datasets/cais/mmlu/astronomy/*.parquet")

# Process the data
processed_df = (df
    # Filter for specific criteria
    .filter(fc.col("subject") == "astronomy")
    # Select relevant columns
    .select("question", "choices", "answer")
    # Add difficulty analysis using semantic.map
    .select(
        "*",
        fc.semantic.map(
            "Rate the difficulty of this question from 1-5: {{question}}",
            question=fc.col("question"),
            model_alias="gpt-4o-mini"  # Optional: specify model
        ).alias("difficulty")
    )
)

# Show results
processed_df.show()
```

## Resources

- [fenic GitHub Repository](https://github.com/typedef-ai/fenic)
- [fenic Documentation](https://docs.fenic.ai/latest/)
