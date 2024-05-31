# FiftyOne

FiftyOne is the leading open-source toolkit for curating, visualizing, and
managing unstructured visual data. The library streamlines data-centric
workflows, from finding low-confidence predictions to identifying poor-quality
samples and uncovering hidden patterns in your data. The library supports all
sorts of visual data, from images and videos to PDFs, point clouds, and meshes.

Whereas tabular data formats like a pandas DataFrame or a Parquet file consist
of rows and columns, FiftyOne datasets are considerably more flexible,
accomodating object detections, keypoints, polylines, etc. and custom schemas.

FiftyOne is integrated with the Hugging Face Hub, so you can load and share
FiftyOne datasets directly from the Hub.

## Prerequisites

First [login with your Hugging Face account](../huggingface_hub/quick-start#login):

```bash
huggingface-cli login
```

Make sure you have `fiftyone>=0.24.0` installed:

```bash
pip install -U fiftyone
```

## Loading Visual Datasets from the Hub

With `load_from_hub()` from FiftyOne's Hugging Face utils, you can load:

- Any FiftyOne dataset uploaded to the hub
- Most image-based datasets stored in Parquet files (which is the standard for datasets uploaded to the hub via the `datasets` library)

### Loading FiftyOne datasets from the Hub

Any dataset pushed to the hub in one of FiftyOne’s [supported common formats](https://docs.voxel51.com/user_guide/dataset_creation/datasets.html#supported-import-formats)
should have all of the necessary configuration info in its dataset repo on the
hub, so you can load the dataset by specifying its `repo_id`. As an example, to
load the [VisDrone detection dataset](https://huggingface.co/datasets/Voxel51/VisDrone2019-DET),
all you need is:

```python
import fiftyone as fo
from fiftyone.utils import load_from_hub

## load from the hub
dataset = load_from_hub("Voxel51/VisDrone2019-DET")

## visualize in app
session = fo.launch_app(dataset)
```

![FiftyOne VisDrone dataset](https://cdn-uploads.huggingface.co/production/uploads/63127e2495407887cb79c5ea/0eKxe_GSsBjt8wMjT9qaI.jpeg)

You can [customize the download process](https://docs.voxel51.com/integrations/huggingface.html#configuring-the-download-process), including the number of samples to
download, the name of the created dataset object, whether or not it is persisted
to disk, and more!

You can list all the available FiftyOne datasets on the Hub using:

```python
from huggingface_hub import HfApi
api = HfApi()
api.list_datasets(tags="fiftyone")
```

### Loading Parquet Datasets from the Hub with FiftyOne

You can also use the `load_from_hub()` function to load datasets from Parquet
files. Type conversions are handled for you and images are downloaded from URLs
if necessary.

With this functionality, [you can load](https://docs.voxel51.com/integrations/huggingface.html#basic-examples):

- Image classification datasets like [Food101](https://huggingface.co/datasets/food101) and [ImageNet-Sketch](https://huggingface.co/datasets/imagenet_sketch)
- Object detection datasets like [CPPE-5](https://huggingface.co/datasets/cppe-5) and [WIDER FACE](https://huggingface.co/datasets/wider_face)
- Segmentation datasets like [SceneParse150](https://huggingface.co/datasets/scene_parse_150) and [Sidewalk Semantic](https://huggingface.co/datasets/segments/sidewalk-semantic)
- Image captioning datasets like [COYO-700M](https://huggingface.co/datasets/kakaobrain/coyo-700m) and [New Yorker Caption Contest](https://huggingface.co/datasets/jmhessel/newyorker_caption_contest)
- Visual question-answering datasets like [TextVQA](https://huggingface.co/datasets/textvqa) and [ScienceQA](https://huggingface.co/datasets/derek-thomas/ScienceQA)
  And many more!

As a simple example, we can load the first 1,000 samples from the
[WikiArt dataset](https://huggingface.co/datasets/huggan/wikiart) into FiftyOne with:

```py
import fiftyone as fo
from fiftyone.utils.huggingface import load_from_hub

dataset = load_from_hub(
    "huggan/wikiart",  ## repo_id
    format="parquet",  ## for Parquet format
    classification_fields=["artist", "style", "genre"], ## columns to treat as classification labels
    max_samples=1000,  # number of samples to load
    name="wikiart",  # name of the dataset in FiftyOne
)
```

![WikiArt Dataset](https://cdn-uploads.huggingface.co/production/uploads/63127e2495407887cb79c5ea/PCqCvTlNTG5SLtcK5fwuQ.jpeg)

## Pushing FiftyOne Datasets to the Hub

Pushing a dataset to the hub is as simple as:

```py
import fiftyone as fo
import fiftyone.zoo as foz
from fiftyone.utils.huggingface import push_to_hub

## load example dataset
dataset = foz.load_zoo_dataset("quickstart")

## push to hub
push_to_hub(dataset, "my-hf-dataset")
```

When you call `push_to_hub()`, the dataset will be uploaded to the repo
with the specified repo name under your username, and the repo will be created
if necessary. A [Dataset Card](./datasets-cards) will automatically be generated and populated with instructions for loading the dataset from the hub. You can even upload a thumbnail image/gif to appear on the Dataset Card with the `preview_path` argument.

You can also upload datasets to the Hugging Face Hub:

```python
my_new_dataset.push_to_hub("username/my_new_dataset")
```

This creates a dataset repository `username/my_new_dataset` containing your Dataset in Parquet format, that you can reload later.

For more information about using 🤗 Datasets, check out the [tutorials](https://huggingface.co/docs/datasets/tutorial) and [how-to guides](https://huggingface.co/docs/datasets/how_to) available in the 🤗 Datasets documentation.

Here’s an example using many of these arguments, which would upload the dataset to the private repo `username/my-action-recognition-dataset` with tags, an MIT license, a description, and a preview image:

```py
dataset = foz.load_from_zoo("quickstart-video", max_samples=3)

push_to_hub(
    dataset,
    "my-action-recognition-dataset",
    tags=["video", "tracking"],
    license="mit",
    description="A dataset of videos for action recognition tasks",
    private=True,
    preview_path="<path/to/preview.png>"
)
```

## 📚 Resources

- [🗺️ User Guide for FiftyOne Datasets](https://docs.voxel51.com/user_guide/using_datasets.html#)
- [🤗 FiftyOne 🤝 Hub Integration Docs](https://docs.voxel51.com/integrations/huggingface.html#huggingface-hub)
- [🤗 FiftyOne 🤝 Transformers Integration Docs](https://docs.voxel51.com/integrations/huggingface.html#transformers-library)
- [🧩 FiftyOne Hugging Face Hub Plugin](https://github.com/voxel51/fiftyone-huggingface-plugins)
