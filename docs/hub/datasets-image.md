# Image Dataset

This guide will show you how to configure your dataset repository with image files. You can find accompanying examples of repositories in this [Image datasets examples collection](https://huggingface.co/collections/datasets-examples/image-dataset-6568e7cf28639db76eb92d65).

A dataset with a supported structure and [file formats](./datasets-adding#file-formats) automatically has a Dataset Viewer on its page on the Hub.

Additional information about your images - such as captions or bounding boxes for object detection - is automatically loaded as long as you include this information in a metadata file (`metadata.csv`/`metadata.jsonl`).

Alternatively, images can be in Parquet files or in TAR archives following the [WebDataset](https://github.com/webdataset/webdataset) format.


## Only images

If your dataset only consists of one column with images, you can simply store your image files at the root:

```
my_dataset_repository/
├── 1.jpg
├── 2.jpg
├── 3.jpg
└── 4.jpg
```

or in a subdirectory:

```
my_dataset_repository/
└── images
    ├── 1.jpg
    ├── 2.jpg
    ├── 3.jpg
    └── 4.jpg
```

Multiple [formats](./datasets-adding#file-formats) are supported at the same time, including PNG, JPEG, TIFF and WebP.

```
my_dataset_repository/
└── images
    ├── 1.jpg
    ├── 2.png
    ├── 3.tiff
    └── 4.webp
```

If you have several splits, you can put your images into directories named accordingly: 

```
my_dataset_repository/
├── train
│   ├── 1.jpg
│   └── 2.jpg
└── test
    ├── 3.jpg
    └── 4.jpg
```

See [File names and splits](./datasets-file-names-and-splits) for more information and other ways to organize data by splits.

## Additional columns

If there is additional information you'd like to include about your dataset, like text captions or bounding boxes, add it as a `metadata.csv` file in your repository. This lets you quickly create datasets for different computer vision tasks like text captioning or object detection.

```
my_dataset_repository/
└── train
    ├── 1.jpg
    ├── 2.jpg
    ├── 3.jpg
    ├── 4.jpg
    └── metadata.csv
```

Your `metadata.csv` file must have a `file_name` column which links image files with their metadata:

```csv
file_name,text
1.jpg,a drawing of a green pokemon with red eyes
2.jpg,a green and yellow toy with a red nose
3.jpg,a red and white ball with an angry look on its face
4.jpg,a cartoon ball with a smile on it's face
```

You can also use a [JSONL](https://jsonlines.org/) file `metadata.jsonl`:

```jsonl
{"file_name": "1.jpg","text": "a drawing of a green pokemon with red eyes"}
{"file_name": "2.jpg","text": "a green and yellow toy with a red nose"}
{"file_name": "3.jpg","text": "a red and white ball with an angry look on its face"}
{"file_name": "4.jpg","text": "a cartoon ball with a smile on it's face"}
```

## Relative paths

Metadata file must be located either in the same directory with the images it is linked to, or in any parent directory, like in this example: 

```
my_dataset_repository/
└── train
    ├── images
    │   ├── 1.jpg
    │   ├── 2.jpg
    │   ├── 3.jpg
    │   └── 4.jpg
    └── metadata.csv
```

In this case, the `file_name` column must be a full relative path to the images, not just the filename:

```csv
file_name,text
images/1.jpg,a drawing of a green pokemon with red eyes
images/2.jpg,a green and yellow toy with a red nose
images/3.jpg,a red and white ball with an angry look on its face
images/4.jpg,a cartoon ball with a smile on it's face
```

Metadata file cannot be put in subdirectories of a directory with the images.

## Image classification

For image classification datasets, you can also use a simple setup: use directories to name the image classes. Store your image files in a directory structure like:

```
my_dataset_repository/
├── green
│   ├── 1.jpg
│   └── 2.jpg
└── red
    ├── 3.jpg
    └── 4.jpg
```

The dataset created with this structure contains two columns: `image` and `label` (with values `green` and `red`).

You can also provide multiple splits. To do so, your dataset directory should have the following structure (see [File names and splits](./datasets-file-names-and-splits) for more information):

```
my_dataset_repository/
├── test
│   ├── green
│   │   └── 2.jpg
│   └── red
│       └── 4.jpg
└── train
    ├── green
    │   └── 1.jpg
    └── red
        └── 3.jpg
```

You can disable this automatic addition of the `label` column in the [YAML configuration](./datasets-manual-configuration). If your directory names have no special meaning, set `drop_labels: true` in the README header:

```yaml
configs:
  - config_name: default
    drop_labels: true
```

## Large scale datasets

### WebDataset format

The [WebDataset](https://github.com/webdataset/webdataset) format is well suited for large scale image datasets (see [timm/imagenet-12k-wds](https://huggingface.co/datasets/timm/imagenet-12k-wds) for example). It consists of TAR archives containing images and their metadata and is optimized for streaming. It is useful if you have a large number of images and to get streaming data loaders for large scale training.

```
my_dataset_repository/
├── train-0000.tar
├── train-0001.tar
├── ...
└── train-1023.tar
```

Note that for user convenience and to enable the [Dataset Viewer](./datasets-viewer), every dataset hosted in the Hub is automatically converted to Parquet format up to 5GB. Read more about it in the [Parquet format](./datasets-viewer#access-the-parquet-files) documentation.

### Parquet format

Instead of uploading the images and metadata as individual files, you can embed everything inside a [Parquet](https://parquet.apache.org/) file. This is useful if you have a large number of images, if you want to embed multiple image columns, or if you want to store additional information about the images in the same file. Parquet is also useful for storing data such as raw bytes, which is not supported by JSON/CSV.

```
my_dataset_repository/
└── train.parquet
```

Image columns are of type _struct_, with a binary field `"bytes"` for the image data and a string field `"path"` for the image file name or path.
You can specify the feature types of the columns directly in YAML in the README header, for example:

```yaml
dataset_info:
  features:
  - name: image
    dtype: image
  - name: caption
    dtype: string
```

Alternatively, Parquet files with Image data can be created using the `datasets` library by setting the column type to `Image()` and using the `.to_parquet(...)` method or `.push_to_hub(...)`. You can find a guide on loading image datasets in `datasets` [here](../datasets/image_load).
