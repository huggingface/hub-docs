# Streamlit Spaces

**Streamlit** gives users more freedom to build a full-featured web app with Python in a *reactive* way. Your code is rerun each time the state of the app changes. Streamlit is also great for data visualization and supports several charting libraries such as Bokeh, Plotly, and Altair. Read this [blog post](https://huggingface.co/blog/streamlit-spaces) about building and hosting Streamlit apps in Spaces.

Selecting **Streamlit** as the SDK when [creating a new Space](https://huggingface.co/new-space) will initialize your Space with the latest version of Streamlit by setting the `sdk` property to `streamlit` in your `README.md` file's YAML block. If you'd like to change the Streamlit version, you can edit the `sdk_version` property.

To use Streamlit in a Space, select **Streamlit** as the SDK when you create a Space through the [**New Space** form](https://huggingface.co/new-space). This will create a repository with a `README.md` that contains the following properties in the YAML configuration block:

```yaml
sdk: streamlit
sdk_version: 1.10.0 # The latest supported version
```

You can edit the `sdk_version`, but note that issues may occur when you use an unsupported Streamlit version. Not all Streamlit versions are supported, so please refer to the [reference section](./spaces-config-reference) to see which versions are available.

For in-depth information about Streamlit, refer to the [Streamlit documentation](https://docs.streamlit.io/).

## Your First Streamlit Space: Hot Dog Classifier

In the following sections, you'll learn the basics of creating a Space, configuring it, and deploying your code to it. We'll create a **Hot Dog Classifier** Space with Streamlit that'll be used to demo the [julien-c/hotdog-not-hotdog](https://huggingface.co/julien-c/hotdog-not-hotdog) model, which can detect whether a given picture contains a hot dog 🌭

You can find a completed version of this hosted at [NimaBoscarino/hotdog-streamlit](https://huggingface.co/spaces/NimaBoscarino/hotdog-streamlit).

## Create a new Streamlit Space

We'll start by [creating a brand new Space](https://huggingface.co/new-space) and choosing **Streamlit** as our SDK. Hugging Face Spaces are Git repositories, meaning that you can work on your Space incrementally (and collaboratively) by pushing commits. Take a look at the [Getting Started with Repositories](./repositories-getting-started) guide to learn about how you can create and edit files before continuing.

## Add the dependencies

For the **Hot Dog Classifier** we'll be using a [🤗 Transformers pipeline](https://huggingface.co/docs/transformers/pipeline_tutorial) to use the model, so we need to start by installing a few dependencies. This can be done by creating a **requirements.txt** file in our repository, and adding the following dependencies to it:

```
transformers
torch
```

The Spaces runtime will handle installing the dependencies!

## Create the Streamlit app

To create the Streamlit app, make a new file in the repository called **app.py**, and add the following code:

```python
import streamlit as st
from transformers import pipeline
from PIL import Image

pipeline = pipeline(task="image-classification", model="julien-c/hotdog-not-hotdog")

st.title("Hot Dog? Or Not?")

file_name = st.file_uploader("Upload a hot dog candidate image")

if file_name is not None:
  col1, col2 = st.columns(2)

  image = Image.open(file_name)
  col1.image(image, use_column_width=True)
  predictions = pipeline(image)

  col2.header("Probabilities")
  for p in predictions:
    col2.subheader(f"{ p['label'] }: { round(p['score'] * 100, 1)}%")
```

This Python script uses a [🤗 Transformers pipeline](https://huggingface.co/docs/transformers/pipeline_tutorial) to load the [julien-c/hotdog-not-hotdog](https://huggingface.co/julien-c/hotdog-not-hotdog) model, which is used by the Streamlit interface. The Streamlit app will expect you to upload an image, which it'll then classify as *hot dog* or *not hot dog*. Once you've saved the code to the **app.py** file, visit the **App** tab to see your app in action!

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-hot-dog-streamlit.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-hot-dog-streamlit-dark.png"/>
</div>

<Tip>
You can use the HTML `<iframe>` tag to embed a Streamlit Space as an inline frame on other webpages. Simply include the name of your Space in the URL, delimited with a dash between the user/org and Space name, followed by the `.hf.space` suffix. For example, the demo above is embedded in these docs with the following tag `<iframe src="https://NimaBoscarino-hotdog-gradio.hf.space" title="My awesome Streamlit Space"></iframe>`.
</Tip>

<iframe src="https://NimaBoscarino-hotdog-gradio.hf.space" title="My awesome Streamlit Space"></iframe>