# Model Card components

**Model Card Components** are special elements that you can inject directly into your Model Card markdown to display powerful custom components in your model page. These components are authored by us, feel free to share ideas about new Model Card component in [this discussion](https://huggingface.co/spaces/huggingchat/chat-ui/discussions/312).

## The Gallery component

Add the `<Gallery />` component to your text-to-image model card to showcase your images generation.

For example, 
```md

<Gallery />

## Model description

TintinIA is fine-tuned version of Stable-Diffusion-xl trained on 125 comics panels from Tintin album. 

```


<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/models-gallery.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/models-gallery-dark.png"/>
</div>

The `<Gallery/>` component will use your Model Card [widget metadata](/docs/hub/models-widgets-examples#text-to-image) to display the images with each associated prompt. 

```yaml
widget:
- text: "drawing of tintin in a shop"
  output:
    url: "images/shop.png"
- text: "drawing of tintin watching rugby"
  output:
    url: "images/rugby.png"
  parameters:
    negative_prompt: "blurry"
- text: "tintin working at the office"
  output:
    url: "images/office.png"
```

> Hint: Support of Card Components through the GUI editor coming soon... 
