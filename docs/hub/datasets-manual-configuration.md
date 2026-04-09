# Manual Configuration

This guide will show you how to configure a custom structure for your dataset repository. The [companion collection of example datasets](https://huggingface.co/collections/datasets-examples/manual-configuration-655e293cea26da0acab95b87) showcases each section of the documentation.

A dataset with a supported structure and [file formats](./datasets-adding#file-formats) automatically has a Dataset Viewer on its dataset page on the Hub. You can use YAML to define the splits, subsets and builder parameters that are used by the Viewer.

It is also possible to define multiple subsets (also called "configurations") for the same dataset (e.g. if the dataset has various independent files).

## Splits

If you have multiple files and want to define which file goes into which split, you can use YAML at the top of your README.md.

For example, given a repository like this one:

```
my_dataset_repository/
├── README.md
├── data.csv
└── holdout.csv
```

You can define a subset for your splits by adding the `configs` field in the YAML block at the top of your README.md:

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

> [!WARNING]
> Note that `config_name` field is required even if you have a single subset.

## Multiple Subsets

Your dataset might have several subsets of data that you want to be able to use separately.
For example each subset has its own dropdown in the Dataset Viewer the Hugging Face Hub.

In that case you can define a list of subsets inside the `configs` field in YAML:

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

Note that the order of subsets shown in the viewer is the default one first, then alphabetical.

> [!TIP]
> You can set a default subset using `default: true`
>
> ```yaml
> - config_name: main_data
>   data_files: "main_data.csv"
>   default: true
> ```
>
> This is useful to set which subset the Dataset Viewer shows first, and which subset data libraries load by default.


## Data Directory

Instead of listing individual files with `data_files`, you can use `data_dir` to point to a directory. Files inside that directory are resolved automatically based on file extensions. This is especially useful when your data is organized in subdirectories:

For example in a case like this, you can simply use `data_dir` since each subset's data lives in its own directory:

```
my_dataset_repository/
├── README.md
├── main/
│   ├── train.csv
│   └── test.csv
└── extra/
    ├── train.csv
    └── test.csv
```

```yaml
---
configs:
- config_name: main
  data_dir: "main"
- config_name: extra
  data_dir: "extra"
---
```

When `data_dir` is set, the builder resolves files relative to that directory. If the directory contains files matching the default split naming pattern (e.g. `train.csv`, `test.csv`), splits are assigned automatically without needing explicit `data_files`.

You can also combine `data_dir` with `data_files` for more control:

```yaml
---
configs:
- config_name: default
  data_dir: "data"
  data_files:
  - split: train
    path: "training_*.csv"
  - split: test
    path: "eval_*.csv"
---
```

In this case, the `path` patterns in `data_files` are resolved relative to the `data_dir`.

## Builder parameters

Not only `data_files`, but other builder-specific parameters can be passed via YAML, allowing for more flexibility on how to load the data while not requiring any custom code. For example, define which separator to use in which subset to load your `csv` files:

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

Refer to the [specific builders' documentation](/docs/datasets/package_reference/builder_classes) to see what parameters they have.
