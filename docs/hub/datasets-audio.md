# Audio Dataset

This guide will show you how to configure your dataset repository with audio files. You can find accompanying examples of repositories in this [Audio datasets examples collection](https://huggingface.co/collections/datasets-examples/audio-dataset-66aca0b73e8f69e3d069e607).

A dataset with a supported structure and [file formats](./datasets-adding#file-formats) automatically has a Dataset Viewer on its page on the Hub.

---

Additional information about your images - such as captions or bounding boxes for object detection - is automatically loaded as long as you include this information in a metadata file (`metadata.csv`/`metadata.jsonl`).

Alternatively, images can be in Parquet files or in TAR archives following the [WebDataset](https://github.com/webdataset/webdataset) format.

## Only audio files

If your dataset only consists of one column with audio, you can simply store your audio files at the root:

```plaintext
my_dataset_repository/
├── 1.wav
├── 2.wav
├── 3.wav
└── 4.wav
```

or in a subdirectory:

```plaintext
my_dataset_repository/
└── audio
    ├── 1.wav
    ├── 2.wav
    ├── 3.wav
    └── 4.wav
```

Multiple [formats](./datasets-adding#file-formats) are supported at the same time, including AIFF, FLAC, MP3, OGG and WAV.

```plaintext
my_dataset_repository/
└── audio
    ├── 1.aiff
    ├── 2.ogg
    ├── 3.mp3
    └── 4.flac
```

If you have several splits, you can put your audio files into directories named accordingly:

```plaintext
my_dataset_repository/
├── train
│   ├── 1.wav
│   └── 2.wav
└── test
    ├── 3.wav
    └── 4.wav
```

See [File names and splits](./datasets-file-names-and-splits) for more information and other ways to organize data by splits.

## Additional columns

If there is additional information you'd like to include about your dataset, like the transcription, add it as a `metadata.csv` file in your repository. This lets you quickly create datasets for different audio tasks like [text-to-speech](https://huggingface.co/tasks/text-to-speech) or [automatic speech recognition](https://huggingface.co/tasks/automatic-speech-recognition).

```plaintext
my_dataset_repository/
├── 1.wav
├── 2.wav
├── 3.wav
├── 4.wav
└── metadata.csv
```

Your `metadata.csv` file must have a `file_name` column which links image files with their metadata:

```csv
file_name,animal
1.wav,cat
2.wav,cat
3.wav,dog
4.wav,dog
```

You can also use a [JSONL](https://jsonlines.org/) file `metadata.jsonl`:

```jsonl
{"file_name": "1.wav","text": "cat"}
{"file_name": "2.wav","text": "cat"}
{"file_name": "3.wav","text": "dog"}
{"file_name": "4.wav","text": "dog"}
```

## Relative paths

Metadata file must be located either in the same directory with the audio files it is linked to, or in any parent directory, like in this example:

```plaintext
my_dataset_repository/
└── test
    ├── audio
    │   ├── 1.wav
    │   ├── 2.wav
    │   ├── 3.wav
    │   └── 4.wav
    └── metadata.csv
```

In this case, the `file_name` column must be a full relative path to the audio files, not just the filename:

```csv
file_name,animal
audio/1.wav,cat
audio/2.wav,cat
audio/3.wav,dog
audio/4.wav,dog
```

Metadata file cannot be put in subdirectories of a directory with the audio files.

In this example, the `test` directory is used to setup the name of the training split. See [File names and splits](./datasets-file-names-and-splits) for more information.

## Audio classification

For audio classification datasets, you can also use a simple setup: use directories to name the audio classes. Store your audio files in a directory structure like:

```plaintext
my_dataset_repository/
├── cat
│   ├── 1.wav
│   └── 2.wav
└── dog
    ├── 3.wav
    └── 4.wav
```

The dataset created with this structure contains two columns: `audio` and `label` (with values `cat` and `dog`).

You can also provide multiple splits. To do so, your dataset directory should have the following structure (see [File names and splits](./datasets-file-names-and-splits) for more information):

```plaintext
my_dataset_repository/
├── test
│   ├── cat
│   │   └── 2.wav
│   └── dog
│       └── 4.wav
└── train
    ├── cat
    │   └── 1.wav
    └── dog
        └── 3.wav
```

You can disable this automatic addition of the `label` column in the [YAML configuration](./datasets-manual-configuration). If your directory names have no special meaning, set `drop_labels: true` in the README header:

```yaml
configs:
  - config_name: default  # Name of the dataset subset, if applicable.
    drop_labels: true
```

## Large scale datasets

### WebDataset format

The [WebDataset](./datasets-webdataset) format is well suited for large scale audio datasets (see [AlienKevin/sbs_cantonese](https://huggingface.co/datasets/AlienKevin/sbs_cantonese) for example).
It consists of TAR archives containing audio files and their metadata and is optimized for streaming. It is useful if you have a large number of audio files and to get streaming data loaders for large scale training.

```plaintext
my_dataset_repository/
├── train-0000.tar
├── train-0001.tar
├── ...
└── train-1023.tar
```

To make a WebDataset TAR archive, create a directory containing the audio files and metadata files to be archived and create the TAR archive using e.g. the `tar` command.
The usual size per archive is generally around 1GB.
Make sure each audio file and metadata pair share the same file prefix, for example:

```plaintext
train-0000/
├── 000.flac
├── 000.json
├── 001.flac
├── 001.json
├── ...
├── 999.flac
└── 999.json
```

Note that for user convenience and to enable the [Dataset Viewer](./datasets-viewer), every dataset hosted in the Hub is automatically converted to Parquet format up to 5GB.
Read more about it in the [Parquet format](./datasets-viewer#access-the-parquet-files) documentation.

### Parquet format

Instead of uploading the audio files and metadata as individual files, you can embed everything inside a [Parquet](https://parquet.apache.org/) file.
This is useful if you have a large number of audio files, if you want to embed multiple audio columns, or if you want to store additional information about the audio in the same file.
Parquet is also useful for storing data such as raw bytes, which is not supported by JSON/CSV.

```plaintext
my_dataset_repository/
└── train.parquet
```

Audio columns are of type _struct_, with a binary field `"bytes"` for the audio data and a string field `"path"` for the image file name or path.
You should specify the feature types of the columns directly in YAML in the README header, for example:

```yaml
dataset_info:
  features:
  - name: audio
    dtype: audio
  - name: caption
    dtype: string
```

Alternatively, Parquet files with Audio data can be created using the `datasets` library by setting the column type to `Audio()` and using the `.to_parquet(...)` method or `.push_to_hub(...)`. You can find a guide on loading audio datasets in `datasets` [here](../datasets/audio_load).
