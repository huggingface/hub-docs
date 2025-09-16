<!---
This markdown file has been generated from a script. Please do not edit it directly.
For more details, check out:
- the `generate.ts` script: https://github.com/huggingface/hub-docs/blob/main/scripts/inference-providers/scripts/generate.ts
- the task template defining the sections in the page: https://github.com/huggingface/hub-docs/tree/main/scripts/inference-providers/templates/task/text-to-image.handlebars
- the input jsonschema specifications used to generate the input markdown table: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/tasks/text-to-image/spec/input.json
- the output jsonschema specifications used to generate the output markdown table: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/tasks/text-to-image/spec/output.json
- the snippets used to generate the example:
  - curl: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/snippets/curl.ts
  - python: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/snippets/python.ts
  - javascript: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/snippets/js.ts
- the "tasks" content for recommended models: https://huggingface.co/api/tasks
--->

## Text to Image

Generate an image based on a given text prompt.

<Tip>

For more details about the `text-to-image` task, check out its [dedicated page](https://huggingface.co/tasks/text-to-image)! You will find examples and related materials.

</Tip>

### Recommended models

- [black-forest-labs/FLUX.1-Krea-dev](https://huggingface.co/black-forest-labs/FLUX.1-Krea-dev): One of the most powerful image generation models that can generate realistic outputs.
- [Qwen/Qwen-Image](https://huggingface.co/Qwen/Qwen-Image): A powerful image generation model.
- [ByteDance/SDXL-Lightning](https://huggingface.co/ByteDance/SDXL-Lightning): Powerful and fast image generation model.
- [ByteDance/Hyper-SD](https://huggingface.co/ByteDance/Hyper-SD): A powerful text-to-image model.

Explore all available models and find the one that suits you best [here](https://huggingface.co/models?inference=warm&pipeline_tag=text-to-image&sort=trending).

### Using the API


<InferenceSnippet
    pipeline=text-to-image
    providersMapping={ {"fal-ai":{"modelId":"tencent/HunyuanImage-2.1","providerModelId":"fal-ai/hunyuan-image/v2.1/text-to-image"},"hf-inference":{"modelId":"black-forest-labs/FLUX.1-dev","providerModelId":"black-forest-labs/FLUX.1-dev"},"nebius":{"modelId":"black-forest-labs/FLUX.1-dev","providerModelId":"black-forest-labs/flux-dev"},"nscale":{"modelId":"stabilityai/stable-diffusion-xl-base-1.0","providerModelId":"stabilityai/stable-diffusion-xl-base-1.0"},"replicate":{"modelId":"tencent/HunyuanImage-2.1","providerModelId":"tencent/hunyuan-image-2.1"},"together":{"modelId":"black-forest-labs/FLUX.1-dev","providerModelId":"black-forest-labs/FLUX.1-dev"}} }
/>



### API specification

#### Request

| Headers |   |    |
| :--- | :--- | :--- |
| **authorization** | _string_ | Authentication header in the form `'Bearer: hf_****'` when `hf_****` is a personal user access token with "Inference Providers" permission. You can generate one from [your settings page](https://huggingface.co/settings/tokens/new?ownUserPermissions=inference.serverless.write&tokenType=fineGrained). |


| Payload |  |  |
| :--- | :--- | :--- |
| **inputs*** | _string_ | The input text data (sometimes called "prompt") |
| **parameters** | _object_ |  |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;guidance_scale** | _number_ | A higher guidance scale value encourages the model to generate images closely linked to the text prompt, but values too high may cause saturation and other artifacts. |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;negative_prompt** | _string_ | One prompt to guide what NOT to include in image generation. |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;num_inference_steps** | _integer_ | The number of denoising steps. More denoising steps usually lead to a higher quality image at the expense of slower inference. |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;width** | _integer_ | The width in pixels of the output image |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;height** | _integer_ | The height in pixels of the output image |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;scheduler** | _string_ | Override the scheduler with a compatible one. |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;seed** | _integer_ | Seed for the random number generator. |


#### Response

| Body |  |
| :--- | :--- | :--- |
| **image** | _unknown_ | The generated image returned as raw bytes in the payload. |

