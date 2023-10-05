# Using 🧨 `diffusers` at Hugging Face

Diffusers is the go-to library for state-of-the-art pretrained diffusion models for generating images, audio, and even 3D structures of molecules. Whether you’re looking for a simple inference solution or want to train your own diffusion model, Diffusers is a modular toolbox that supports both. The library is designed with a focus on usability over performance, simple over easy, and customizability over abstractions.

## Exploring Diffusers in the Hub

There are over 10,000 `diffusers` compatible pipelines on the Hub which you can find by filtering at the left of [the models page](https://huggingface.co/models?library=diffusers&sort=downloads). Diffusion systems are typically composed of multiple components such as text encoder, UNet, VAE, and scheduler. Even though they are not standalone models, the pipeline abstraction makes it easy to use them for inference or training.

You can find diffusion pipelines for many different tasks:

* Generating images from natural language text prompts ([text-to-image](https://huggingface.co/models?library=diffusers&pipeline_tag=text-to-image&sort=downloads)).
* Transforming images using natural language text prompts ([image-to-image](https://huggingface.co/models?library=diffusers&pipeline_tag=image-to-image&sort=downloads)).
* Generating videos from natural language descriptions ([text-to-video](https://huggingface.co/models?library=diffusers&pipeline_tag=text-to-video&sort=downloads)).


You can try out the models directly in the browser if you want to test them out without downloading them, thanks to the in-browser widgets! 

<div class="flex justify-center">
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/refs%2Fpr%2F35/hub/libraries-diffusers_widget.png"/>
</div>

## Using existing pipelines

All `diffusers` pipelines are a line away from being used! To run generation we recommended to always start from the `DiffusionPipeline`: 

```py
from diffusers import DiffusionPipeline

pipeline = DiffusionPipeline.from_pretrained("stabilityai/stable-diffusion-xl-base-1.0")
```

If you want to load a specific pipeline component such as the UNet, you can do so by:

```py
from diffusers import UNet2DConditionModel

unet = UNet2DConditionModel.from_pretrained("stabilityai/stable-diffusion-xl-base-1.0", subfolder="unet")
```

## Sharing your pipelines and models

All the [pipeline classes](https://huggingface.co/docs/diffusers/main/api/pipelines/overview), [model classes](https://huggingface.co/docs/diffusers/main/api/models/overview), and [scheduler classes](https://huggingface.co/docs/diffusers/main/api/schedulers/overview) are fully compatible with the Hub. More specifically, they can be easily loaded from the Hub using the `from_pretrained()` method and can be shared with others using the `push_to_hub()` method.

For more details, please check out the [documentation](https://huggingface.co/docs/diffusers/main/en/using-diffusers/push_to_hub). 

## Additional resources

* Diffusers [library](https://github.com/huggingface/diffusers).
* Diffusers [docs](https://huggingface.co/docs/diffusers/index).
