# Configure the Dataset Viewer

The Dataset Viewer supports many data files formats, from text to tabular and from image to audio formats.
It also separates the train/validation/test splits based on file and folder names.

To configure the Dataset Viewer for your dataset, make sure your dataset is in a supported data format and structured the right way.

## Supported data formats

The dataset viewer supports multiple file formats:

- CSV (.csv, .tsv)
- JSON Lines, JSON (.jsonl, .json)
- Text (.txt)
- Images (.png, .jpg, etc.)
- Audio (.wav, .mp3, etc.)
- Parquet (.parquet)

Parquet is often a good option: it is a column-oriented format designed for data storage and retrieval.
Parquet files are smaller than CSV files, and they also support nested data structures which makes them ideal for storing complex data.
Parquet key features are:

- Efficient compression: Parquet’s columnar storage format enables efficient data compression, reducing storage costs and download/upload times.
- Fast query performance: Parquet’s columnar storage format allows to only load or scan the data you need, which enables faster query performance.
- Compatible with many data tools: Parquet is compatible with a wide range of data analysis and manipulation tools like Pandas and DuckDB, and also with big data processing frameworks including Apache Spark and Dask.

The dataset viewer also supports files compressed using ZIP (.zip), GZIP (.gz), ZSTD (.zst), BZ2 (.bz2), LZ4 (.lz4) and LZMA (.xz).

## Define the dataset splits

You can name the data files or their folder after their split names (train/validation/test).
If there are no split names, all the data files are considered part of the train split.

For more information, feel free to check out the documentation on  on [Automatic splits detection](https://huggingface.co/docs/datasets/repository_structure#automatic-splits-detection)

## Configure the dataset

It is also possible to customize your splits manually.
Indeed, you can use YAML to:

- List the data files per split
- Use custom split names
- Pass dataset building parameters (e.g. the separator used in your CSV files).
- Define multiple datasets configurations (e.g. if you dataset has multiple subsets or languages)

Check out the guide on [How to structure your dataset repository](https://huggingface.co/docs/datasets/repository_structure) for more details.

## Image and audio datasets

For image and audio classification datasets, you can also use directories to name the image and audio classes.
And if your images/audio files have metadata (e.g. captions, bounding boxes, transcriptions, etc.), you can have metadata files next to them.

Those two guides can be useful:

- [How to create an image dataset](https://huggingface.co/docs/datasets/image_dataset)
- [How to create an audio dataset](https://huggingface.co/docs/datasets/audio_dataset)

## Disable the viewer

The dataset viewer can be disabled. To do this, add a YAML section to the dataset's `README.md` file (create one if it does not already exist) and add a `viewer` property with the value `false`.

```
---
viewer: false
---
```

Note that the viewer is always disabled on the private datasets.
