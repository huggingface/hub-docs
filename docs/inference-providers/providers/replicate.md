<!---
WARNING

This markdown file has been generated from a script. Please do not edit it directly.

### Template

If you want to update the content related to replicate's description, please edit the template file under `https://github.com/huggingface/hub-docs/tree/main/scripts/inference-providers/templates/providers/replicate.handlebars`.

### Logos

If you want to update replicate's logo, upload a file by opening a PR on https://huggingface.co/datasets/huggingface/documentation-images/tree/main/inference-providers/logos. Ping @wauplin and @celinah on the PR to let them know you uploaded a new logo.
Logos must be in .png format and be named `replicate-light.png` and `replicate-dark.png`. Visit https://huggingface.co/settings/theme to switch between light and dark mode and check that the logos are displayed correctly.

### Generation script

For more details, check out the `generate.ts` script: https://github.com/huggingface/hub-docs/blob/main/scripts/inference-providers/scripts/generate.ts.
--->

# Replicate

> [!TIP]
> All supported Replicate models can be found [here](https://huggingface.co/models?inference_provider=replicate&sort=trending)

<div class="flex justify-center">
    <a href="https://replicate.com/" target="_blank">
        <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/logos/replicate-light.png"/>
        <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/logos/replicate-dark.png"/>
    </a>
</div>

<div class="flex">
    <a href="https://huggingface.co/replicate" target="_blank">
        <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/badges/resolve/main/follow-us-on-hf-lg.svg"/>
        <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/badges/resolve/main/follow-us-on-hf-lg-dark.svg"/>
    </a>
</div>

Replicate is building tools so all software engineers can use AI as if it were normal software. You should be able to import an image generator the same way you import an npm package. You should be able to customize a model as easily as you can fork something on GitHub.

## Supported tasks


### Automatic Speech Recognition

Find out more about Automatic Speech Recognition [here](../tasks/automatic-speech-recognition).

<InferenceSnippet
    pipeline=automatic-speech-recognition
    providersMapping={ {"replicate":{"modelId":"openai/whisper-large-v3","providerModelId":"openai/whisper:8099696689d249cf8b122d833c36ac3f75505c666a395ca40ef26f68e7d3d16e"} } }
/>


### Image To Image

Find out more about Image To Image [here](../tasks/image-to-image).

<InferenceSnippet
    pipeline=image-to-image
    providersMapping={ {"replicate":{"modelId":"black-forest-labs/FLUX.2-dev","providerModelId":"black-forest-labs/flux-2-dev"} } }
/>


### Text To Image

Find out more about Text To Image [here](../tasks/text-to-image).

<InferenceSnippet
    pipeline=text-to-image
    providersMapping={ {"replicate":{"modelId":"Tongyi-MAI/Z-Image-Turbo","providerModelId":"prunaai/z-image-turbo:7ea16386290ff5977c7812e66e462d7ec3954d8e007a8cd18ded3e7d41f5d7cf"} } }
/>


### Text To Video

Find out more about Text To Video [here](../tasks/text-to-video).

<InferenceSnippet
    pipeline=text-to-video
    providersMapping={ {"replicate":{"modelId":"Wan-AI/Wan2.2-TI2V-5B","providerModelId":"wan-video/wan-2.2-5b-fast"} } }
/>

