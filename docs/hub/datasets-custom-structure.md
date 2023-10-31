# Custom Structure

To host and share your dataset, create a dataset repository on the Hugging Face Hub and upload your data files.

This guide will show you how to configure a custom structure for your dataset repository.
A dataset with a supported structure and file format (`.txt`, `.csv`, `.parquet`, `.jsonl`, `.mp3`, `.jpg`, `.zip` etc.) automatically has a dataset viewer on its dataset page on the Hub.

## Define your splits and subsets in YAML

## Splits

If you have multiple files and want to define which file goes into which split, you can use the YAML `configs` field at the top of your README.md.

For example, given a repository like this one:

```
my_dataset_repository/
├── README.md
├── data.csv
└── holdout.csv
```

You can define your splits by adding the `configs` field in the YAML block at the top of your README.md:

```yaml
---
configs:
- config_name: default
  data_files:
  - split: train
    path: "data.csv"
  - split: test
    path: "holdout.csv"
---
```


You can select multiple files per split using a list of paths:

```
my_dataset_repository/
├── README.md
├── data/
│   ├── abc.csv
│   └── def.csv
└── holdout/
    └── ghi.csv
```

```yaml
---
configs:
- config_name: default
  data_files:
  - split: train
    path:
    - "data/abc.csv"
    - "data/def.csv"
  - split: test
    path: "holdout/ghi.csv"
---
```

Or you can use glob patterns to automatically list all the files you need:

```yaml
---
configs:
- config_name: default
  data_files:
  - split: train
    path: "data/*.csv"
  - split: test
    path: "holdout/*.csv"
---
```

<Tip warning={true}>

Note that `config_name` field is required even if you have a single configuration.

</Tip>

## Configurations

Your dataset might have several subsets of data that you want to be able to load separately. In that case you can define a list of configurations inside the `configs` field in YAML:

```
my_dataset_repository/
├── README.md
├── main_data.csv
└── additional_data.csv
```

```yaml
---
configs:
- config_name: main_data
  data_files: "main_data.csv"
- config_name: additional_data
  data_files: "additional_data.csv"
---
```

Each configuration is shown separately on the Hugging Face Hub, and can be loaded by passing its name as a second parameter:

```python
from datasets import load_dataset

main_data = load_dataset("my_dataset_repository", "main_data")
additional_data = load_dataset("my_dataset_repository", "additional_data")
```

## Builder parameters

Not only `data_files`, but other builder-specific parameters can be passed via YAML, allowing for more flexibility on how to load the data while not requiring any custom code. For example, define which separator to use in which configuration to load your `csv` files:

```yaml
---
configs:
- config_name: tab
  data_files: "main_data.csv"
  sep: "\t"
- config_name: comma
  data_files: "additional_data.csv"
  sep: ","
---
```

Refer to [specific builders' documentation](./package_reference/builder_classes) to see what configuration parameters they have.

<Tip>

You can set a default configuration using `default: true`, e.g. you can run `main_data = load_dataset("my_dataset_repository")` if you set 

```yaml
- config_name: main_data
  data_files: "main_data.csv"
  default: true
```

</Tip>
