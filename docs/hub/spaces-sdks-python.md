# Custom Python Spaces

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
