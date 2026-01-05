<!---
WARNING

This markdown file has been generated from a script. Please do not edit it directly.

### Template

If you want to update the content related to fal-ai's description, please edit the template file under `https://github.com/huggingface/hub-docs/tree/main/scripts/inference-providers/templates/providers/fal-ai.handlebars`.

### Logos

If you want to update fal-ai's logo, upload a file by opening a PR on https://huggingface.co/datasets/huggingface/documentation-images/tree/main/inference-providers/logos. Ping @wauplin and @celinah on the PR to let them know you uploaded a new logo.
Logos must be in .png format and be named `fal-ai-light.png` and `fal-ai-dark.png`. Visit https://huggingface.co/settings/theme to switch between light and dark mode and check that the logos are displayed correctly.

### Generation script

For more details, check out the `generate.ts` script: https://github.com/huggingface/hub-docs/blob/main/scripts/inference-providers/scripts/generate.ts.
--->

# Fal

> [!TIP]
> All supported Fal models can be found [here](https://huggingface.co/models?inference_provider=fal-ai&sort=trending)

<div class="flex justify-center">
    <a href="https://fal.ai/" target="_blank">
        <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/logos/fal-ai-light.png"/>
        <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/logos/fal-ai-dark.png"/>
    </a>
</div>

<div class="flex">
    <a href="https://huggingface.co/fal" target="_blank">
        <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/badges/resolve/main/follow-us-on-hf-lg.svg"/>
        <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/badges/resolve/main/follow-us-on-hf-lg-dark.svg"/>
    </a>
</div>

Founded in 2021 by [Burkay Gur](https://huggingface.co/burkaygur) and [Gorkem Yurtseven](https://huggingface.co/gorkemyurt), fal.ai was born out of a shared passion for AI and a desire to address the challenges in AI infrastructure observed during their tenures at Coinbase and Amazon.

## Supported tasks


### Automatic Speech Recognition

Find out more about Automatic Speech Recognition [here](../tasks/automatic-speech-recognition).

<InferenceSnippet
    pipeline=automatic-speech-recognition
    providersMapping={ {"fal-ai":{"modelId":"openai/whisper-large-v3","providerModelId":"fal-ai/whisper"} } }
/>


### Image Segmentation

Find out more about Image Segmentation [here](../tasks/image-segmentation).

<InferenceSnippet
    pipeline=image-segmentation
    providersMapping={ {"fal-ai":{"modelId":"briaai/RMBG-2.0","providerModelId":"fal-ai/bria/background/remove"} } }
/>


### Image To Image

Find out more about Image To Image [here](../tasks/image-to-image).

<InferenceSnippet
    pipeline=image-to-image
    providersMapping={ {"fal-ai":{"modelId":"Qwen/Qwen-Image-Edit-2511","providerModelId":"fal-ai/qwen-image-edit-plus"} } }
/>


### Text To Image

Find out more about Text To Image [here](../tasks/text-to-image).

<InferenceSnippet
    pipeline=text-to-image
    providersMapping={ {"fal-ai":{"modelId":"Tongyi-MAI/Z-Image-Turbo","providerModelId":"fal-ai/z-image/turbo"} } }
/>


### Text To Video

Find out more about Text To Video [here](../tasks/text-to-video).

<InferenceSnippet
    pipeline=text-to-video
    providersMapping={ {"fal-ai":{"modelId":"tencent/HunyuanVideo-1.5","providerModelId":"fal-ai/hunyuan-video-v1.5/text-to-video"} } }
/>

