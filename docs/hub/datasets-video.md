# Video Dataset

This guide will show you how to configure your dataset repository with video files.

A dataset with a supported structure and [file formats](./datasets-adding#file-formats) automatically has a Dataset Viewer on its page on the Hub.

Additional information about your videos - such as captions or bounding boxes for object detection - is automatically loaded as long as you include this information in a metadata file (`metadata.csv`/`metadata.jsonl`/`metadata.parquet`).

Alternatively, videos can be in Parquet files or in TAR archives following the [WebDataset](https://github.com/webdataset/webdataset) format.


## Only videos

If your dataset only consists of one column with videos, you can simply store your video files at the root:

```
my_dataset_repository/
├── 1.mp4
├── 2.mp4
├── 3.mp4
└── 4.mp4
```

or in a subdirectory:

```
my_dataset_repository/
└── videos
    ├── 1.mp4
    ├── 2.mp4
    ├── 3.mp4
    └── 4.mp4
```

Multiple [formats](./datasets-adding#file-formats) are supported at the same time, including MP4, MOV and AVI.

```
my_dataset_repository/
└── videos
    ├── 1.mp4
    ├── 2.mov
    └── 3.avi
```

If you have several splits, you can put your videos into directories named accordingly: 

```
my_dataset_repository/
├── train
│   ├── 1.mp4
│   └── 2.mp4
└── test
    ├── 3.mp4
    └── 4.mp4
```

See [File names and splits](./datasets-file-names-and-splits) for more information and other ways to organize data by splits.

## Additional columns

If there is additional information you'd like to include about your dataset, like text captions or bounding boxes, add it as a `metadata.csv` file in your repository. This lets you quickly create datasets for different computer vision tasks like [video generation](https://huggingface.co/tasks/text-to-video) or [object detection](https://huggingface.co/tasks/object-detection).

```
my_dataset_repository/
└── train
    ├── 1.mp4
    ├── 2.mp4
    ├── 3.mp4
    ├── 4.mp4
    └── metadata.csv
```

Your `metadata.csv` file must have a `file_name` column which links video files with their metadata:

```csv
file_name,text
1.mp4,an animation of a green pokemon with red eyes
2.mp4,a short video of a green and yellow toy with a red nose
3.mp4,a red and white ball shows an angry look on its face
4.mp4,a cartoon ball is smiling
```

You can also use a [JSONL](https://jsonlines.org/) file `metadata.jsonl`:

```jsonl
{"file_name": "1.mp4","text": "an animation of a green pokemon with red eyes"}
{"file_name": "2.mp4","text": "a short video of a green and yellow toy with a red nose"}
{"file_name": "3.mp4","text": "a red and white ball shows an angry look on its face"}
{"file_name": "4.mp4","text": "a cartoon ball is smiling"}
```

And for bigger datasets or if you are interested in advanced data retrieval features, you can use a [Parquet](https://parquet.apache.org/) file `metadata.parquet`.

## Relative paths

Metadata file must be located either in the same directory with the videos it is linked to, or in any parent directory, like in this example: 

```
my_dataset_repository/
└── train
    ├── videos
    │   ├── 1.mp4
    │   ├── 2.mp4
    │   ├── 3.mp4
    │   └── 4.mp4
    └── metadata.csv
```

In this case, the `file_name` column must be a full relative path to the videos, not just the filename:

```csv
file_name,text
videos/1.mp4,an animation of a green pokemon with red eyes
videos/2.mp4,a short video of a green and yellow toy with a red nose
videos/3.mp4,a red and white ball shows an angry look on its face
videos/4.mp4,a cartoon ball is smiling
```

Metadata files cannot be put in subdirectories of a directory with the videos.

More generally, any column named `file_name` or `*_file_name` should contain the full relative path to the videos.

## Video classification

For video classification datasets, you can also use a simple setup: use directories to name the video classes. Store your video files in a directory structure like:

```
my_dataset_repository/
├── green
│   ├── 1.mp4
│   └── 2.mp4
└── red
    ├── 3.mp4
    └── 4.mp4
```

The dataset created with this structure contains two columns: `video` and `label` (with values `green` and `red`).

You can also provide multiple splits. To do so, your dataset directory should have the following structure (see [File names and splits](./datasets-file-names-and-splits) for more information):

```
my_dataset_repository/
├── test
│   ├── green
│   │   └── 2.mp4
│   └── red
│       └── 4.mp4
└── train
    ├── green
    │   └── 1.mp4
    └── red
        └── 3.mp4
```

You can disable this automatic addition of the `label` column in the [YAML configuration](./datasets-manual-configuration). If your directory names have no special meaning, set `drop_labels: true` in the README header:

```yaml
configs:
  - config_name: default  # Name of the dataset subset, if applicable.
    drop_labels: true
```

## Large scale datasets

### WebDataset format

The [WebDataset](./datasets-webdataset) format is well suited for large scale video datasets.
It consists of TAR archives containing videos and their metadata and is optimized for streaming. It is useful if you have a large number of videos and to get streaming data loaders for large scale training.

```
my_dataset_repository/
├── train-0000.tar
├── train-0001.tar
├── ...
└── train-1023.tar
```

To make a WebDataset TAR archive, create a directory containing the videos and metadata files to be archived and create the TAR archive using e.g. the `tar` command.
The usual size per archive is generally around 1GB.
Make sure each video and metadata pair share the same file prefix, for example:

```
train-0000/
├── 000.mp4
├── 000.json
├── 001.mp4
├── 001.json
├── ...
├── 999.mp4
└── 999.json
```

Note that for user convenience and to enable the [Dataset Viewer](./data-studio), every dataset hosted in the Hub is automatically converted to Parquet format up to 5GB. Since videos can be quite large, the URLs to the videos are stored in the converted Parquet data without the video bytes themselves. Read more about it in the [Parquet format](./data-studio#access-the-parquet-files) documentation.
