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


### Image To Image

Find out more about Image To Image [here](../tasks/image_to_image).

<InferenceSnippet
    pipeline=image-to-image
    providersMapping={ {"replicate":{"modelId":"stepfun-ai/Step1X-Edit","providerModelId":"zsxkib/step1x-edit"} } }
/>


### Text To Image

Find out more about Text To Image [here](../tasks/text_to_image).

<InferenceSnippet
    pipeline=text-to-image
    providersMapping={ {"replicate":{"modelId":"black-forest-labs/FLUX.1-dev","providerModelId":"black-forest-labs/flux-dev"} } }
/>


### Text To Video

Find out more about Text To Video [here](../tasks/text_to_video).

<InferenceSnippet
    pipeline=text-to-video
    providersMapping={ {"replicate":{"modelId":"Wan-AI/Wan2.1-T2V-14B","providerModelId":"wavespeedai/wan-2.1-t2v-480p"} } }
/>

