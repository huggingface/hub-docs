# Streamlit Spaces

**Streamlit** gives users freedom to build a full-featured web app with Python in a *reactive* way. Your code is rerun each time the state of the app changes. Streamlit is also great for data visualization and supports several charting libraries such as Bokeh, Plotly, and Altair. Read this [blog post](https://huggingface.co/blog/streamlit-spaces) about building and hosting Streamlit apps in Spaces.

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

## Embed Streamlit Spaces on other webpages

You can use the HTML `<iframe>` tag to embed a Streamlit Space as an inline frame on other webpages. Simply include the URL of your Space, ending with the `.hf.space` suffix. To find the URL of your Space, you can use the "Embed this Space" button from the Spaces options.

For example, the demo above can be embedded in these docs with the following tag:

```
<iframe src="https://NimaBoscarino-hotdog-streamlit.hf.space" title="My awesome Streamlit Space"></iframe>
```

<iframe src="https://NimaBoscarino-hotdog-streamlit.hf.space" frameBorder="0" height="600" title="Streamlit app" class="container p-0 flex-grow space-iframe" allow="accelerometer; ambient-light-sensor; autoplay; battery; camera; document-domain; encrypted-media; fullscreen; geolocation; gyroscope; layout-animations; legacy-image-formats; magnetometer; microphone; midi; oversized-images; payment; picture-in-picture; publickey-credentials-get; sync-xhr; usb; vr ; wake-lock; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-downloads"></iframe>

## Embed Streamlit Spaces with auto-resizing IFrames

Streamlit has supported automatic iframe resizing since [1.17.0](https://docs.streamlit.io/library/changelog#version-1170) so that the size of the parent iframe is automatically adjusted to fit the content volume of the embedded Streamlit application.

It relies on the [`iFrame Resizer`](https://github.com/davidjbradshaw/iframe-resizer) library, which you need to add a few lines of code to use, as in the following example where

- `id` is set to `<iframe />` that is used to specify the auto-resize target.
- The `iFrame Resizer` is loaded via the `script` tag.
- The `iFrameResize()` function is called with the ID of the target `iframe` element, so that its size changes automatically.

We can pass options to the first argument of `iFrameResize()`. See [the document](https://github.com/davidjbradshaw/iframe-resizer/blob/master/docs/parent_page/options.md) for the details.

```html
<iframe
	id="your-iframe-id"
	src="https://<space-subdomain>.hf.space"
	frameborder="0"
	width="850"
	height="450"
></iframe>
<script src="https://cdn.jsdelivr.net/npm/iframe-resizer@4.3.4/js/iframeResizer.min.js"></script>
<script>
  iFrameResize({}, "#your-iframe-id")
</script>
```

Additionally, you can checkout [our documentation](./spaces-embed).
