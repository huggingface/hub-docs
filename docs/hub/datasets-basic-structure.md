# Basic Repository Structure

To host and share your dataset, create a dataset repository on the Hugging Face Hub and upload your data files.

This guide will show you how to structure your dataset repository when you upload it and enable all the Dataset Hub features like the Dataset Viewer.
A dataset with a supported structure and file format (`.txt`, `.csv`, `.parquet`, `.jsonl`, `.mp3`, `.jpg`, `.zip` etc.) automatically has a dataset viewer on its dataset page on the Hub.

Note that you can also define your own custom structure, see the documentation on [Custom Structure](./datasets-custom-structure) for more information

## Main use-case

The simplest dataset structure has two files: `train.csv` and `test.csv` (this works with any supported file format).

Your repository will also contain a `README.md` file, the [dataset card](dataset_card) displayed on your dataset page.

```
my_dataset_repository/
├── README.md
├── train.csv
└── test.csv
```

In this simple case, you'll get a dataset with two splits: `train` (containing examples from `train.csv`) and `test` (containing examples from `test.csv`).

## Splits

Certain patterns in the dataset repository can be used to assign certain files to train/validation/test splits.

### Directory name

You can place your data files into different directories named `train`, `test`, and `validation` where each directory contains the data files for that split:

```
my_dataset_repository/
├── README.md
└── data/
    ├── train/
    │   └── bees.csv
    ├── test/
    │   └── more_bees.csv
    └── validation/
        └── even_more_bees.csv
```

### File name

If you don't have any non-traditional splits, then you can place the split name anywhere in the data file and it is automatically inferred. The only rule is that the split name must be delimited by non-word characters, like `test-file.csv` for example instead of `testfile.csv`. Supported delimiters include underscores, dashes, spaces, dots, and numbers.

For example, the following file names are all acceptable:

- train split: `train.csv`, `my_train_file.csv`, `train1.csv`
- validation split: `validation.csv`, `my_validation_file.csv`, `validation1.csv`
- test split: `test.csv`, `my_test_file.csv`, `test1.csv`

Here is an example where all the files are placed into a directory named `data`:

```
my_dataset_repository/
├── README.md
└── data/
    ├── train.csv
    ├── test.csv
    └── validation.csv
```

### Keywords

There are several ways to name splits. Validation splits are sometimes called "dev", and test splits may be referred to as "eval".
These other split names are also supported, and the following keywords are equivalent:

- train, training
- validation, valid, val, dev
- test, testing, eval, evaluation

Therefore the structure below is a valid repository:

```
my_dataset_repository/
├── README.md
└── data/
    ├── training.csv
    ├── eval.csv
    └── valid.csv
```

### Custom split name

If your dataset splits have custom names that aren't `train`, `test`, or `validation`, then you can name your data files like `data/<split_name>-xxxxx-of-xxxxx.csv`.

Here is an example with three splits, `train`, `test`, and `random`:

```
my_dataset_repository/
├── README.md
└── data/
    ├── train-00000-of-00003.csv
    ├── train-00001-of-00003.csv
    ├── train-00002-of-00003.csv
    ├── test-00000-of-00001.csv
    ├── random-00000-of-00003.csv
    ├── random-00001-of-00003.csv
    └── random-00002-of-00003.csv
```

### Multiple files per split

If one of your splits comprises several files, 🤗 Datasets can still infer whether it is the train, validation, and test split from the file name.
For example, if your train and test splits span several files:

```
my_dataset_repository/
├── README.md
├── train_0.csv
├── train_1.csv
├── train_2.csv
├── train_3.csv
├── test_0.csv
└── test_1.csv
```

Make sure all the files of your `train` set have *train* in their names (same for test and validation).
Even if you add a prefix or suffix to `train` in the file name (like `my_train_file_00001.csv` for example),
🤗 Datasets can still infer the appropriate split.

For convenience, you can also place your data files into different directories.
In this case, the split name is inferred from the directory name.

```
my_dataset_repository/
├── README.md
└── data/
    ├── train/
    │   ├── shard_0.csv
    │   ├── shard_1.csv
    │   ├── shard_2.csv
    │   └── shard_3.csv
    └── test/
        ├── shard_0.csv
        └── shard_1.csv
```

### Single split

If you don't define splits using directory or file names, then it'll treat all the files as a single train split. If your dataset splits aren't loading as expected, it may be due to an incorrect pattern.
