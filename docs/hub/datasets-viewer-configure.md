# Configure the Dataset Viewer

The Dataset Viewer supports many data files formats, from text to tabular and from image to audio formats.
It also separates the train/validation/test splits based on file and folder names.

To configure the Dataset Viewer for your dataset, make sure your dataset is in a supported data format and structured the right way.

## Supported data formats

The dataset viewer supports multiple file formats:

- CSV (.csv, .tsv)
- JSON Lines, JSON (.jsonl, .json)
- Parquet (.parquet)
- Text (.txt)
- Images (.png, .jpg, etc.)
- Audio (.wav, .mp3, etc.)

The dataset viewer also supports files compressed using ZIP (.zip), GZIP (.gz), ZSTD (.zst), BZ2 (.bz2), LZ4 (.lz4) and LZMA (.xz).

## Configure dropdowns for splits or subsets

In the Dataset Viewer you can view the train/validation/test splits of datasets, and sometimes additionally choose between multiple subsets (e.g. one per language).

To define those dropdowns, you can name the data files or their folder after their split names (train/validation/test).
It is also possible to customize your splits manually using YAML.

For more information, feel free to check out the documentation on [Data files Configuration](./datasets-data-files-configuration.md).

## Disable the viewer

The dataset viewer can be disabled. To do this, add a YAML section to the dataset's `README.md` file (create one if it does not already exist) and add a `viewer` property with the value `false`.

```
---
viewer: false
---
```

Note that the viewer is always disabled on the private datasets.
