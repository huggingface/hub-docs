# Image Dataset

This guide will show you how to configure your dataset repository with image files.

A dataset with a supported structure and [file formats](./datasets-adding#file-formats) automatically has a Dataset Viewer on its dataset page on the Hub. Any additional information about your dataset - such as captioning or object detection - is automatically loaded as long as you include this information in a metadata file (`metadata.csv`/`metadata.jsonl`).

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
├── images/1.jpg
├── images/2.jpg
├── images/3.jpg
└── images/4.jpg
```

Multiple [formats](./datasets-adding#file-formats) are supported at the same time, including PNG, JPEG, TIFF and WebP.

```
my_dataset_repository/
├── images/1.jpg
├── images/2.png
├── images/3.tiff
└── images/4.webp
```

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

Note that the metadata files must be stored inside directories that provide the split name (e.g. `train/` or `test/`). See [File names and splits](./datasets-file-names-and-splits) for more information.

## Relative paths

You can also locate the images in a different subdirectory of the split:

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

To access the image, the `file_name` column should be a full relative path to the file, not just the filename:

```csv
file_name,text
images/1.jpg,a drawing of a green pokemon with red eyes
images/2.jpg,a green and yellow toy with a red nose
images/3.jpg,a red and white ball with an angry look on its face
images/4.jpg,a cartoon ball with a smile on it's face
```

## Image classification

For image classification datasets, you can also use a simple setup: use directories to name the image classes. Store your image files in a directory structure like:

```
.
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
.
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

You can disable this automatic behavior in the [YAML configuration](./datasets-manual-configuration.md). If your directory names have no special meaning, set `drop_labels: true` in the README header:

```yaml
configs:
  - config_name: default
    drop_labels: true
```

## Parquet format

Instead of uploading the images and metadata as individual files, you can embed everything inside a [Parquet](https://parquet.apache.org/) file. This is useful if you have a large number of images, if you want to embed multiple image columns, or if you want to store additional information about the images in the same file. Parquet is also useful for storing data such as raw bytes, which is not supported by JSON/CSV.

```
.
└── train.parquet
```

Note that for the users convenience, every dataset hosted in the Hub is automatically converted to Parquet format. Read more about it in the [Parquet format](./datasets-viewer#access-the-parquet-files) documentation.
