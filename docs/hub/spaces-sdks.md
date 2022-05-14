---
title: Spaces SDKs
---

<h1>Spaces SDKs</h1>

Hugging Face Spaces officially supports three different SDKs: Gradio, Streamlit, and static HTML.

## Gradio and Streamlit

Gradio and Streamlit make it easy to quickly build apps using Python, and we recommend you try both out because they're really awesome!

* [Learn more about Gradio Spaces](./spaces-sdks-gradio)
* [Learn more about Streamlit Spaces](./spaces-sdks-streamlit)

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