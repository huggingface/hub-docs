# Data files Configuration

There are no constraints on how to structure dataset repositories.

However, if you want the Dataset Viewer to show certain data files, or to separate your dataset in train/validation/test splits, you need to structure your dataset accordingly.
Often it is as simple as naming your data files according to their split names, e.g. `train.csv` and `test.csv`.

## What are splits and configurations?

Machine learning datasets typically have splits and may also have configurations. A _split_ is a subset of the dataset, like `train` and `test`, that are used during different stages of training and evaluating a model. A _configuration_ is a sub-dataset contained within a larger dataset. Configurations are especially common in multilingual speech datasets where there may be a different configuration for each language. If you're interested in learning more about splits and configurations, check out the [conceptual guide on "Splits and configurations"](https://huggingface.co/docs/datasets-server/configs_and_splits)!

![split-configs-server](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/split-configs-server.gif)

## File names and splits

To structure your dataset by naming your data files or directories according to their split names, see the [File names and splits](./datasets-file-names-and-splits) documentation.

## Manual configuration

You can choose the data files to show in the Dataset Viewer for your dataset using YAML.
It is useful if you want to specify which file goes into which split manually.

You can also define multiple configurations (or subsets) for your dataset, and pass dataset building parameters (e.g. the separator to use for CSV files).

See the documentation on [Manual configuration](./datasets-manual-configuration) for more information.

## Image and Audio datasets

For image and audio classification datasets, you can also use directories to name the image and audio classes.
And if your images/audio files have metadata (e.g. captions, bounding boxes, transcriptions, etc.), you can have metadata files next to them.

We provide two guides that you can check out:

- [How to create an image dataset](./datasets-image)
- [How to create an audio dataset](https://huggingface.co/docs/datasets/audio_dataset)
