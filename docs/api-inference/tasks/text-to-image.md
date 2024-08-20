## Text-to-image

Generates images from input text. These models can be used to generate and modify images based on text prompts.

<Tip>

For more details about the `text-to-image` task, check out its [dedicated page](https://huggingface.co/tasks/text-to-image)! You will find examples and related materials.

</Tip>

### Recommended models

- [black-forest-labs/FLUX.1-dev](https://huggingface.co/black-forest-labs/FLUX.1-dev): one of the most powerful image generation models that can generate realistic outputs.
- [latent-consistency/lcm-lora-sdxl](https://huggingface.co/latent-consistency/lcm-lora-sdxl): a powerful yet fast image generation model.
- [Kwai-Kolors/Kolors](https://huggingface.co/Kwai-Kolors/Kolors): text-to-image model for photorealistic generation.
- [stabilityai/stable-diffusion-3-medium-diffusers](https://huggingface.co/stabilityai/stable-diffusion-3-medium-diffusers): a powerful text-to-image model.

### API specification

#### Inputs

| Payload |   |    |
| :--- | :--- | :--- |
| **inputs** | _string, required_ | The input text data (sometimes called "prompt"). |
| **parameters.guidance_scale** | _number, optional_ | For diffusion models. A higher guidance scale value encourages the model to generate images closely linked to the text prompt at the expense of lower image quality. |
| **parameters.negative_prompt[]** | _string, optional_ | FOne or several prompt to guide what NOT to include in image generation. |
| **parameters.num_inference_steps** | _integer, optional_ | For diffusion models. The number of denoising steps. More denoising steps usually lead to a higher quality image at the expense of slower inference. |
| **parameters.target_size.width** | _integer, optional_ | The size in pixel of the output image. |
| **parameters.target_size.height** | _integer, optional_ | The size in pixel of the output image. |
| **parameters.scheduler** | _string_, optional_ | For diffusion models. Override the scheduler with a compatible one. |

| Headers |   |    |
| :--- | :--- | :--- |
| **authorization** | _string, optional_ | Authentication header in the form `'Bearer: hf_****'` when `hf_****` is a personal user access token with Inference API permission. You can generate one from [your settings page](https://huggingface.co/settings/tokens). |
| **x-use-cache** | _boolean, optional, default to `true`_ | There is a cache layer on the inference API to speedup requests we have already seen. Most models can use those results as is as models are deterministic (meaning the results will be the same anyway). However if you use a non deterministic model, you can set this parameter to prevent the caching mechanism from being used resulting in a real new query. |
| **x-wait-for-model** | _boolean, optional, default to `false`_ | If the model is not ready, wait for it instead of receiving 503. It limits the number of requests required to get your inference done. It is advised to only set this flag to true after receiving a 503 error as it will limit hanging in your application to known places. |

#### Output

| Response |   |
| :--- | :--- |
| **image**       | The generated image. |

### Examples

#### Python

```py
>>> from huggingface_hub import InferenceClient
>>> client = InferenceClient(model="black-forest-labs/FLUX.1-dev")

>>> image = client.text_to_image("A city above clouds, pastel colors, Victorian style")
>>> image.save("output.png")
```

See [package reference](https://huggingface.co/docs/huggingface_hub/package_reference/inference_client#huggingface_hub.InferenceClient.text_to_image) for more details.

#### JavaScript

????

See [package reference](https://huggingface.co/docs/huggingface.js/inference/classes/HfInference#texttoimage) for more details.