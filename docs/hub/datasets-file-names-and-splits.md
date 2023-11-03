# File names and splits

To host and share your dataset, create a dataset repository on the Hugging Face Hub and upload your data files.

This guide will show you how to name your files and directories in your dataset repository when you upload it and enable all the Dataset Hub features like the Dataset Viewer.
A dataset with a supported structure and file format (`.txt`, `.csv`, `.parquet`, `.jsonl`, `.mp3`, `.jpg`, `.zip` etc.) automatically has a dataset viewer on its dataset page on the Hub.

Note that you can also define your own custom structure, see the documentation on [Manual Configuration](./datasets-manual-configuration) for more information

## Basic use-case

If your dataset isn't split into [train/validation/test splits](https://en.wikipedia.org/wiki/Training,_validation,_and_test_data_sets), the simplest dataset structure is to have one file: `data.csv` (this works with any supported file format and any file name).

Your repository will also contain a `README.md` file, the [dataset card](./dataset-cards) displayed on your dataset page.

```
my_dataset_repository/
├── README.md
└── data.csv
```

## Splits

Certain patterns in the dataset repository can be used to assign certain files to train/validation/test splits.

### File name


You can name your data files after the `train`, `test`, and `validation` splits:

```
my_dataset_repository/
├── README.md
├── train.csv
├── test.csv
└── validation.csv
```

If you don't have any non-traditional splits, then you can place the split name anywhere in the data file. The only rule is that the split name must be delimited by non-word characters, like `test-file.csv` for example instead of `testfile.csv`. Supported delimiters include underscores, dashes, spaces, dots, and numbers.

For example, the following file names are all acceptable:

- train split: `train.csv`, `my_train_file.csv`, `train1.csv`
- validation split: `validation.csv`, `my_validation_file.csv`, `validation1.csv`
- test split: `test.csv`, `my_test_file.csv`, `test1.csv`

### Directory name

You can place your data files into different directories named `train`, `test`, and `validation` where each directory contains the data files for that split:

```
my_dataset_repository/
├── README.md
└── data/
    ├── train/
    │   └── data.csv
    ├── test/
    │   └── more_data.csv
    └── validation/
        └── even_more_data.csv
```

### Keywords

There are several ways to refer to train/validation/test splits. Validation splits are sometimes called "dev", and test splits may be referred to as "eval".
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

### Multiple files per split

Splits can span several files, for example:

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
You can even add a prefix or suffix to `train` in the file name (like `my_train_file_00001.csv` for example).

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
