# Pandas

[Pandas](https://github.com/pandas-dev/pandas) is a widely used Python data analysis toolkit.
Since it uses [fsspec](https://filesystem-spec.readthedocs.io) to read and write remote data, you can use the Hugging Face paths ([`hf://`](/docs/huggingface_hub/guides/hf_file_system#integrations)) to read and write data on the Hub.

## Load a DataFrame

You can load data from local files or from remote storage like Hugging Face Datasets. Pandas supports many formats including CSV, JSON and Paequet:

```python
>>> import pandas as pd
>>> df = pd.read_csv("path/to/data.csv")
```

To load a file from Hugging Face, the path needs to start with `hf://`. For example, the path to the [stanfordnlp/imdb](https://huggingface.co/datasets/stanfordnlp/imdb) dataset repository is `hf://datasets/stanfordnlp/imdb`. The dataset on Hugging Face contains multiple Parquet files. The Parquet file format is designed to make reading and writing data frames efficient, and to make sharing data across data analysis languages easy. Here is how to load the file `plain_text/train-00000-of-00001.parquet`:

```python
>>> import pandas as pd
>>> df = pd.read_parquet("hf://datasets/stanfordnlp/imdb/plain_text/train-00000-of-00001.parquet")
>>> df
                                                    text  label
0      I rented I AM CURIOUS-YELLOW from my video sto...      0
1      "I Am Curious: Yellow" is a risible and preten...      0
2      If only to avoid making this type of film in t...      0
3      This film was probably inspired by Godard's Ma...      0
4      Oh, brother...after hearing about this ridicul...      0
...                                                  ...    ...
24995  A hit at the time but now better categorised a...      1
24996  I love this movie like no other. Another time ...      1
24997  This film and it's sequel Barry Mckenzie holds...      1
24998  'The Adventures Of Barry McKenzie' started lif...      1
24999  The story centers around Barry McKenzie who mu...      1
```

To have more information on the Hugging Face paths and how they are implemented, please refer to the [the client library's documentation on the HfFileSystem](/docs/huggingface_hub/guides/hf_file_system).

## Save a DataFrame

You can save a pandas DataFrame using `to_csv/to_json/to_parquet` to a local file or to Hugging Face directly.

To save the DataFrame on Hugging Face, you first need to [Login with your Hugging Face account](/docs/huggingface_hub/quick-start#login), for example using:

```
huggingface-cli login
```

Then you can [Create a dataset repository](/docs/huggingface_hub/quick-start#create-a-repository), for example using:

```python
from huggingface_hub import HfApi

HfApi().create_repo(repo_id="username/my_dataset", repo_type="dataset")
```

Finally, you can use [Hugging Face paths](/docs/huggingface_hub/guides/hf_file_system#integrations) in Pandas:

```python
import pandas as pd

df.to_parquet("hf://datasets/username/my_dataset/imdb.parquet")

# or write in separate files if the dataset has train/validation/test splits
df_train.to_parquet("hf://datasets/username/my_dataset/train.parquet")
df_valid.to_parquet("hf://datasets/username/my_dataset/validation.parquet")
df_test .to_parquet("hf://datasets/username/my_dataset/test.parquet")
```

## Use Images

From a folder with a metadata file containing a "file_name" field for the names or paths to the images:

```
Example 1:            Example 2:
folder/               folder/
├── metadata.csv      ├── metadata.csv
├── img000.png        └── images
├── img001.png            ├── img000.png
...                       ...
└── imgNNN.png            └── imgNNN.png
```

```python
import pandas as pd

folder_path = "path/to/folder/"
df = pd.read_csv(folder_path + "metadata.csv")
for image_path in (folder_path + df["file_name"]):
    ...
```

Since the dataset is in a supported structure, you can save this dataset to Hugging Face and the Dataset Viewer shows both the metadata and images on Hugging Face.

```python
from huggingface_hub import HfApi
api = HfApi()

api.upload_folder(
    folder_path=folder_path,
    repo_id="username/my_image_dataset",
    repo_type="dataset",
)
```

### Image methods and Parquet

Using [pandas-image-methods](https://github.com/lhoestq/pandas-image-methods) you enable `PIL.Image` methods on an image column. It also enables saving the dataset as one single Parquet file containing both the images and the metadata:

```python
import pandas as pd
from pandas_image_methods import PILMethods

pd.api.extensions.register_series_accessor("pil")(PILMethods)

df["image"] = (folder_path + df["file_name"]).pil.open()
df.to_parquet("data.parquet")
```

All the `PIL.Image` methods are available, e.g.

```python
df["image"] = df["image"].pil.rotate(90)
```

## Use Audios

From a folder with a metadata file containing a "file_name" field for the names or paths to the audios:

```
Example 1:            Example 2:
folder/               folder/
├── metadata.csv      ├── metadata.csv
├── rec000.wav        └── audios
├── rec001.wav            ├── rec000.wav
...                       ...
└── recNNN.wav            └── recNNN.wav
```

```python
import pandas as pd

folder_path = "path/to/folder/"
df = pd.read_csv(folder_path + "metadata.csv")
for audio_path in (folder_path + df["file_name"]):
    ...
```

Since the dataset is in a supported structure, you can save this dataset to Hugging Face and the Dataset Viewer shows both the metadata and audios on Hugging Face.

```python
from huggingface_hub import HfApi
api = HfApi()

api.upload_folder(
    folder_path=folder_path,
    repo_id="username/my_audio_dataset",
    repo_type="dataset",
)
```

### Audio methods and Parquet

Using [pandas-audio-methods](https://github.com/lhoestq/pandas-audio-methods) you enable `soundfile` methods on an audio column. It also enables saving the dataset as one single Parquet file containing both the audios and the metadata:

```python
import pandas as pd
from pandas_image_methods import SFMethods

pd.api.extensions.register_series_accessor("sf")(SFMethods)

df["audio"] = (folder_path + df["file_name"]).sf.open()
df.to_parquet("data.parquet")
```

This makes it easy to use with `librosa` e.g. for resampling:

```python
df["audio"] = [librosa.load(audio, sr=16_000) for audio in df["audio"]]
df["audio"] = df["audio"].sf.write()
```

## Use Transformers

You can use `transformers` pipelines on pandas DataFrames to classify, generate text, images, etc.
This section shows a few examples.

### Text Classification

```python
from transformers import pipeline
from tqdm import tqdm

pipe = pipeline("text-classification", model="clapAI/modernBERT-base-multilingual-sentiment")

# Compute labels
df["label"] = [y["label"] for y in pipe(x for x in tqdm(df["text"]))]
# Compute labels and scores
df[["label", "score"]] = [(y["label"], y["score"]) for y in pipe(x for x in tqdm(df["text"]))]
```

### Text Generation

```python
from transformers import pipeline
from tqdm import tqdm

p = pipeline("text-generation", model="Qwen/Qwen2.5-1.5B-Instruct")
prompt = "What is the main topic of this sentence ? REPLY IN LESS THAN 3 WORDS. Sentence: '{}'"
df["output"] = [y["generated_text"][1]["content"] for y in pipe([{"role": "user", "content": prompt.format(x)}] for x in tqdm(df["text"]))]
```
