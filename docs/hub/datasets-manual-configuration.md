# Manual Configuration

This guide will show you how to configure a custom structure for your dataset repository.

A dataset with a [supported structure and file format]((./datasets-viewer-configure#supported-data-formats)) automatically has a Dataset Viewer on its dataset page on the Hub. You can use YAML to configure the splits and builder parameters that are used by the Viewer.

It is even possible to define multiple configurations for the same dataset (e.g. if the dataset has various independent files).

## Define your splits and subsets in YAML

## Splits

If you have multiple files and want to define which file goes into which split, you can use YAML at the top of your README.md.

For example, given a repository like this one:

```
my_dataset_repository/
├── README.md
├── data.csv
└── holdout.csv
```

You can define a configuration for your splits by adding the `configs` field in the YAML block at the top of your README.md:

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

## Multiple Configurations

Your dataset might have several subsets of data that you want to be able to use separately.
For example each configuration has its own dropdown in the Dataset Viewer the Hugging Face Hub.

In that case you can define a list of configurations inside the `configs` field in YAML:

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

Refer to the [specific builders' documentation](../datasets/package_reference/builder_classes) to see what configuration parameters they have.

<Tip>

You can set a default configuration using `default: true`

```yaml
- config_name: main_data
  data_files: "main_data.csv"
  default: true
```

</Tip>
