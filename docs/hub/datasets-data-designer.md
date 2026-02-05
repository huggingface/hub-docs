# Data Designer

[Data Designer](https://github.com/NVIDIA-NeMo/DataDesigner) is NVIDIA NeMo's framework for generating high-quality synthetic datasets using LLMs. It enables you to create diverse data using statistical samplers, LLMs, or existing seed datasets.

## Prerequisites

```bash
pip install data-designer
```

## Download datasets from the Hub as seeds

Use `HuggingFaceSeedSource` to load datasets directly from the Hub as seed data for generation.

```python
import data_designer.config as dd
from data_designer.interface import DataDesigner

data_designer = DataDesigner()
config_builder = dd.DataDesignerConfigBuilder()

# Load seed data from HuggingFace
seed_source = dd.HuggingFaceSeedSource(
    path="datasets/gretelai/symptom_to_diagnosis/data/train.parquet",
    token="hf_...",  # Optional, for private datasets
)
config_builder.with_seed_dataset(seed_source)

# Reference seed columns in prompts
config_builder.add_column(
    dd.LLMTextColumnConfig(
        name="physician_notes",
        model_alias="openai-gpt-5",
        prompt="Write notes for a patient with {{ diagnosis }}. Symptoms: {{ patient_summary }}",
    )
)

preview = data_designer.preview(config_builder, num_records=5)
```

## Push generated datasets to the Hub

Use the built-in `push_to_hub` method to upload generated datasets.

```python
# Generate dataset
results = data_designer.create(config_builder, num_records=1000, dataset_name="my-dataset")

# Push to Hub
url = results.push_to_hub(
    repo_id="username/my-synthetic-dataset",
    description="Synthetic dataset generated with Data Designer.",
    tags=["medical", "notes"],
    private=False,
)
```

## Resources

- [Data Designer Documentation](https://nvidia-nemo.github.io/DataDesigner/)
- [GitHub Repository](https://github.com/NVIDIA-NeMo/DataDesigner)
- [Seed Datasets Guide](https://nvidia-nemo.github.io/DataDesigner/latest/concepts/seed-datasets/)
