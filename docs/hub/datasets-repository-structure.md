# Dataset Repository Structure

There are no constrains in how to structure dataset repositories.

However certain features of the Hub expect certain structures.
For example if you want the Dataset Viewer to show certain data files or to separate your dataset in train/validation/test splits, you need to structure your dataset accordingly.
Often it is as simple as naming your data files according to their split names, e.g. `train.csv` and `test.csv`.

## Define splits and subsets

To structure your dataset by naming your data files or directories according to their split names, see the [Basic Repository Structure](./datasets-basic-structure) documentation.

Alternatively you can define the a custom structure for your dataset using YAML.
It is useful if you want to specify which file goes in which split manually, and also to define multiple configurations (or subsets) for your dataset.
It is also possible to pass dataset building parameters (e.g. the separator to use for CSV files).

See the documentation on datasets [Custom Structure](./datasets-custom-structure) for more information.

## Image and Audio datasets

For image and audio classification datasets, you can also use directories to name the image and audio classes.
And if your images/audio files have metadata (e.g. captions, bounding boxes, transcriptions, etc.), you can have metadata files next to them.

We provide two guides that you can check out:

- [How to create an image dataset](https://huggingface.co/docs/datasets/image_dataset)
- [How to create an audio dataset](https://huggingface.co/docs/datasets/audio_dataset)
