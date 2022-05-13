---
title: Spaces SDKs
---

<h1>Spaces SDKs</h1>

Hugging Face Spaces officially supports three different SDKs: Gradio, Streamlit, and static HTML. This section gives a brief overview of the three methods for creating a Space.

Gradio and Streamlit make it easy to quickly build apps using Python, and we recommend you try both out because they're really awesome! For in-depth information about using them, you can refer to their respective documentation.

## Gradio

**Gradio** provides an easy and intuitive interface for running a model from a list of inputs and displaying the outputs. For more details, take a look at the [Getting started](https://gradio.app/getting_started/) guide from the Gradio team.

Selecting **Gradio** as the SDK when [creating a new Space](https://huggingface.co/new-space) will initialize your Space with the latest version of Gradio by setting the `sdk` property to `gradio` in your `README.md` file's YAML block. If you'd like to change the Gradio version, you can edit the `sdk_version` property.

Visit the [Gradio documentation](https://gradio.app/docs/) to learn all about its features and check out the [Gradio Guides](https://gradio.app/guides/) for some handy tutorials to help you get started!

### Managing long queue times

Since it's possible that many users could use your Space concurrently, we recommend using [Gradio's `enable_queue`](https://gradio.app/getting_started/#queuing-to-manage-long-inference-times) parameter to prevent any timeouts.

## Streamlit

**Streamlit** gives users more freedom to build a full-featured web app with Python in a *reactive* way. Your code is rerun each time the state of the app changes. Streamlit is also great for data visualization and supports several charting libraries such as Bokeh, Plotly, and Altair. Read our [blog post](https://huggingface.co/blog/streamlit-spaces) about building and hosting Streamlit apps in Spaces.

To use Streamlit in a Space, select **Streamlit** as the SDK when you create a Space through the [**New Space** form](https://huggingface.co/new-space). This will create a repository with a `README.md` that contains the following properties in the YAML configuration block:

```yaml
sdk: streamlit
sdk_version: 1.2.0 # The latest supported version
```

As shown here, the Streamlit version is not configured in the **requirements.txt** file but rather in the `YAML` settings through the `sdk_version` setting. You can edit the `sdk_version`, but note that issues may occur when you use an unsupported Streamlit version. Not all Streamlit versions are supported, so please refer to the [reference section](./spaces-reference) to see which versions are available.

If you want to learn more about Streamlit, refer to the [Streamlit documentation](https://docs.streamlit.io/).

## Static HTML

Spaces also accommodate custom HTML for your app instead of using Streamlit or Gradio. Set `sdk: static` inside the `YAML` block at the top of your Spaces **README.md** file. Then you can place your HTML code within an **index.html** file.

Here are some examples of Spaces using custom HTML:

* [Smarter NPC](https://huggingface.co/spaces/mishig/smarter_npc): Display a PlayCanvas project with an iframe in Spaces.
* [Huggingfab](https://huggingface.co/spaces/pierreant-p/huggingfab): Display a Sketchfab model in Spaces.

## Custom Python Spaces

While not an official workflow, you are able to run your own Python + interface stack in Spaces by selecting Gradio as your SDK and serving a frontend on port `7680`. See the [templates](https://huggingface.co/templates#spaces) for examples.

Spaces are served in iframes, which by default restrict links from opening in the parent page. The simplest solution is to open them in a new window:

```HTML
<a href="https://hf.space" rel="noopener" target="_blank">Spaces</a>
```

Usually, the height of Spaces is automatically adjusted when using the Gradio library interface. However, if you provide your own frontend in the Gradio SDK and the content height is larger than the viewport, you'll need to add an [iFrame Resizer script](https://cdnjs.com/libraries/iframe-resizer), so the content is scrollable in the iframe:

```HTML
<script src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.2/iframeResizer.contentWindow.min.js"></script>
```
As an example, here is the same Space with and without the script:
- https://huggingface.co/spaces/ronvolutional/http-server
- https://huggingface.co/spaces/ronvolutional/iframe-test

## Other stacks

💌 Feel free to contact us at **website at huggingface.co** if you are interested in building custom apps without Streamlit or Gradio. Our team is working on creating mechanisms for running custom apps with Python server code with a unified set of frontend JS code and serving Docker images.