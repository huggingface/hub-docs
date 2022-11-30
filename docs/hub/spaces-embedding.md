# Embedding your Space

Once you Space is up and running you might wish to embed it in a website or in your blog. 
Embedding or sharing your Space is a great way to allow your audience to interact with your work and demonstrations without requiring any setup on their side.

## Direct URL

A Space is assigned a unique URL that once the Space is `Running` you can use to share you Space or embed it in a website. 
This URL is of the form: `"https://<space-subdomain>.hf.space"`. For instance the space [NimaBoscarino/hotdog-gradio](https://huggingface.co/spaces/NimaBoscarino/hotdog-gradio) has corresponding URL of `"https://nimaboscarino-hotdog-gradio.hf.space"`.
The subdomain is unique and only changes if you move your Space or rename it.

You can find the Space URL along with examples snippets of how to embed your Space directly from the options on your Space page:

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-embed-option.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-embed-option-dark.png"/>
</div>

## Embedding with IFrames

The default embedding method for a Space is using IFrames. Add in the HTML location where you want to embed your Space the following element:

```html
<iframe
    src="https://<space-subdomain>.hf.space"
    frameborder="0"
    width="850"
    height="450"
></iframe>
```

For instance using the NimaBoscarino/hotdog-gradio Space:
<iframe src="https://nimaboscarino-hotdog-gradio.hf.space"frameborder="0"width="850"height="450" ></iframe>

## Embedding with WebComponents

If the Space you wish to embed is a Gradio based Space you can additionally use Web Components to embed your Space.

First off you need to import the Gradio JS library by adding the following script to your HTML.

```html
<script
	type="module"
	src="https://gradio.s3-us-west-2.amazonaws.com/3.1.7/gradio.js"
></script>
```

Then simply add a `gradio-app` element where you want to embed your Space.
```html
<gradio-app src="https://<space-subdomain>.hf.space"></gradio-app>
```
