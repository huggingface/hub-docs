# NeMo Data Designer

[DataDesigner](https://github.com/NVIDIA-NeMo/DataDesigner) is NVIDIA NeMo's framework for generating high-quality synthetic datasets using LLMs. It enables you to create diverse data using statistical samplers, LLMs, or existing seed datasets while maintaining control over field relationships and data quality.

## Overview

DataDesigner supports OpenAI-compatible endpoints, making it easy to use any model available through Hugging Face Inference Providers for synthetic data generation.

## Prerequisites

- DataDesigner installed (`pip install data-designer`)
- A Hugging Face account with [API token](https://huggingface.co/settings/tokens/new?ownUserPermissions=inference.serverless.write&tokenType=fineGrained) (needs "Make calls to Inference Providers" permission)

## Configuration

### 1. Set your HF token

```bash
export HF_TOKEN="hf_your_token_here"
```

### 2. Configure HF as a provider

```python
from data_designer.essentials import (
    CategorySamplerParams,
    DataDesigner,
    DataDesignerConfigBuilder,
    LLMTextColumnConfig,
    ModelConfig,
    ModelProvider,
    SamplerColumnConfig,
    SamplerType,
)

# Define HF Inference Provider (OpenAI-compatible)
hf_provider = ModelProvider(
    name="huggingface",
    endpoint="https://router.huggingface.co/v1",
    provider_type="openai",
    api_key="HF_TOKEN",  # Reads from environment variable
)

# Define a model available via HF Inference Providers
hf_model = ModelConfig(
    alias="hf-gpt-oss",
    model="openai/gpt-oss-120b",
    provider="huggingface",
)

# Create DataDesigner with HF provider
data_designer = DataDesigner(model_providers=[hf_provider])
config_builder = DataDesignerConfigBuilder(model_configs=[hf_model])
```

### 3. Generate synthetic data

```python
# Add a sampler column
config_builder.add_column(
    SamplerColumnConfig(
        name="category",
        sampler_type=SamplerType.CATEGORY,
        params=CategorySamplerParams(
            values=["Electronics", "Books", "Clothing"],
        ),
    )
)

# Add an LLM-generated column
config_builder.add_column(
    LLMTextColumnConfig(
        name="product_name",
        model_alias="hf-gpt-oss",
        prompt="Generate a creative product name for a {{ category }} item.",
    )
)

# Preview the generated data
preview = data_designer.preview(config_builder=config_builder, num_records=5)
preview.display_sample_record()

# Access the DataFrame
df = preview.dataset
print(df)
```

## Using Different Models

You can use any model available through [Inference Providers](https://huggingface.co/models?inference_provider=all). Simply update the `model` field:

```python
# Use a different model
hf_model = ModelConfig(
    alias="hf-olmo",
    model="allenai/OLMo-3-7B-Instruct",
    provider="huggingface",
)
```

## Push to Hub

Once you've generated your dataset, push it directly to the Hugging Face Hub:

```python
# Generate full dataset
results = data_designer.create(config_builder, num_records=1000, dataset_name="my-dataset")

# Push to Hub
url = results.push_to_hub(
    repo_id="username/my-synthetic-dataset",
    private=False,
)
```

For loading Hub datasets as seed data and more details on Hub integration, see the [Data Designer Hub datasets guide](https://huggingface.co/docs/hub/en/datasets-data-designer).

## Resources

- [DataDesigner Documentation](https://nvidia-nemo.github.io/DataDesigner/)
- [GitHub Repository](https://github.com/NVIDIA-NeMo/DataDesigner)
- [Available Models on Inference Providers](https://huggingface.co/models?inference_provider=all&pipeline_tag=text-generation)
- [Using Data Designer with Hub Datasets](https://huggingface.co/docs/hub/en/datasets-data-designer)
