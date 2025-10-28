<!---
WARNING

This markdown file has been generated from a script. Please do not edit it directly.

### Template

If you want to update the content related to wavespeed's description, please edit the template file under `https://github.com/huggingface/hub-docs/tree/main/scripts/inference-providers/templates/providers/wavespeed.handlebars`.

### Logos

If you want to update wavespeed's logo, upload a file by opening a PR on https://huggingface.co/datasets/huggingface/documentation-images/tree/main/inference-providers/logos. Ping @wauplin and @celinah on the PR to let them know you uploaded a new logo.
Logos must be in .png format and be named `wavespeed-light.png` and `wavespeed-dark.png`. Visit https://huggingface.co/settings/theme to switch between light and dark mode and check that the logos are displayed correctly.

### Generation script

For more details, check out the `generate.ts` script: https://github.com/huggingface/hub-docs/blob/main/scripts/inference-providers/scripts/generate.ts.
--->

# WaveSpeed

> [!TIP]
> All supported WaveSpeed models can be found [here](https://huggingface.co/models?inference_provider=wavespeed&sort=trending)

<div class="flex justify-center">
    <a href="https://wavespeed.ai/" target="_blank">
        <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/logos/wavespeed-light.png"/>
        <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/logos/wavespeed-dark.png"/>
    </a>
</div>

<div class="flex">
    <a href="https://huggingface.co/wavespeed" target="_blank">
        <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/badges/resolve/main/follow-us-on-hf-lg.svg"/>
        <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/badges/resolve/main/follow-us-on-hf-lg-dark.svg"/>
    </a>
</div>

WaveSpeed AI is a high-performance AI inference platform specializing in image and video generation. Built with cutting-edge infrastructure and optimization techniques, WaveSpeed provides fast, scalable, and cost-effective model serving for creative AI applications.

## Supported tasks


### Image To Image

Find out more about Image To Image [here](../tasks/image_to_image).

<InferenceSnippet
    pipeline=image-to-image
    providersMapping={ {"wavespeed":{"modelId":"example/model","providerModelId":"wavespeed/image-to-image"} } }
/>


### Text To Image

Find out more about Text To Image [here](../tasks/text_to_image).

<InferenceSnippet
    pipeline=text-to-image
    providersMapping={ {"wavespeed":{"modelId":"example/model","providerModelId":"wavespeed/text-to-image"} } }
/>


### Text To Video

Find out more about Text To Video [here](../tasks/text_to_video).

<InferenceSnippet
    pipeline=text-to-video
    providersMapping={ {"wavespeed":{"modelId":"example/model","providerModelId":"wavespeed/text-to-video"} } }
/>

