# Gradio Spaces

**Gradio** provides an easy and intuitive interface for running a model from a list of inputs and displaying the outputs in formats such as images, audio, 3D objects, and more. Gradio now even has a [Plot output component](https://gradio.app/docs/#o_plot) for creating data visualizations with Matplotlib, Bokeh, and Plotly! For more details, take a look at the [Getting started](https://gradio.app/getting_started/) guide from the Gradio team.

Selecting **Gradio** as the SDK when [creating a new Space](https://huggingface.co/new-space) will initialize your Space with the latest version of Gradio by setting the `sdk` property to `gradio` in your `README.md` file's YAML block. If you'd like to change the Gradio version, you can edit the `sdk_version` property.

Visit the [Gradio documentation](https://gradio.app/docs/) to learn all about its features and check out the [Gradio Guides](https://gradio.app/guides/) for some handy tutorials to help you get started!

## Your First Gradio Space: Hot Dog Classifier

In the following sections, you'll learn the basics of creating a Space, configuring it, and deploying your code to it. We'll create a **Hot Dog Classifier** Space with Gradio that'll be used to demo the [julien-c/hotdog-not-hotdog](https://huggingface.co/julien-c/hotdog-not-hotdog) model, which can detect whether a given picture contains a hot dog 🌭

You can find a completed version of this hosted at [NimaBoscarino/hotdog-gradio](https://huggingface.co/spaces/NimaBoscarino/hotdog-gradio).

## Create a new Gradio Space

We'll start by [creating a brand new Space](https://huggingface.co/new-space) and choosing **Gradio** as our SDK. Hugging Face Spaces are Git repositories, meaning that you can work on your Space incrementally (and collaboratively) by pushing commits. Take a look at the [Getting Started with Repositories](./repositories-getting-started) guide to learn about how you can create and edit files before continuing.

## Add the dependencies

For the **Hot Dog Classifier** we'll be using a [🤗 Transformers pipeline](https://huggingface.co/docs/transformers/pipeline_tutorial) to use the model, so we need to start by installing a few dependencies. This can be done by creating a **requirements.txt** file in our repository, and adding the following dependencies to it:

```
transformers
torch
```

The Spaces runtime will handle installing the dependencies!

## Create the Gradio interface

To create the Gradio app, make a new file in the repository called **app.py**, and add the following code:

```python
import gradio as gr
from transformers import pipeline

pipeline = pipeline(task="image-classification", model="julien-c/hotdog-not-hotdog")

def predict(image):
  predictions = pipeline(image)
  return {p["label"]: p["score"] for p in predictions}

gr.Interface(
    predict,
    inputs=gr.inputs.Image(label="Upload hot dog candidate", type="filepath"),
    outputs=gr.outputs.Label(num_top_classes=2),
    title="Hot Dog? Or Not?",
).launch()
```

This Python script uses a [🤗 Transformers pipeline](https://huggingface.co/docs/transformers/pipeline_tutorial) to load the [julien-c/hotdog-not-hotdog](https://huggingface.co/julien-c/hotdog-not-hotdog) model, which is used by the Gradio interface. The Gradio app will expect you to upload an image, which it'll then classify as *hot dog* or *not hot dog*. Once you've saved the code to the **app.py** file, visit the **App** tab to see your app in action!

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-hot-dog-gradio.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-hot-dog-gradio-dark.png"/>
</div>
