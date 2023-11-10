# Model Card components

Model cards supports additionnal components you can place in your markdown. 

## The Gallery component

Add the `<Gallery />` component to your text-to-image model card to showcase your images generation.

For example, 
```md

<Gallery />

## Model description

TintinIA is fine-tuned version of Stable-Diffusion-xl trained on 125 comics panels from Tintin album. 

```

<div class="flex justify-center">
<img width="650" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/models-gallery.png"/>
</div>

The gallery uses the card's [widget metadata](/docs/hub/models-widgets-examples#text-to-image) to display the images and prompt.

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
