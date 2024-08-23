## Image-to-image

Image-to-image is the task of transforming a source image to match the characteristics of a target image or a target image domain.
Any image manipulation and enhancement is possible with image to image models.

Use cases heavily depend on the model and the dataset it was trained on, but some common use cases include:
- Style transfer
- Image colorization
- Image super-resolution
- Image inpainting

<Tip>

For more details about the `image-to-image` task, check out its [dedicated page](https://huggingface.co/tasks/image-to-image)! You will find examples and related materials.

</Tip>

### Recommended models

- [fal/AuraSR-v2](https://huggingface.co/fal/AuraSR-v2): An image-to-image model to improve image resolution.
- [keras-io/super-resolution](https://huggingface.co/keras-io/super-resolution): A model that increases the resolution of an image.
- [lambdalabs/sd-image-variations-diffusers](https://huggingface.co/lambdalabs/sd-image-variations-diffusers): A model that creates a set of variations of the input image in the style of DALL-E using Stable Diffusion.
- [mfidabel/controlnet-segment-anything](https://huggingface.co/mfidabel/controlnet-segment-anything): A model that generates images based on segments in the input image and the text prompt.
- [timbrooks/instruct-pix2pix](https://huggingface.co/timbrooks/instruct-pix2pix): A model that takes an image and an instruction to edit the image.

This is only a subset of the supported models. Find the model that suits you best [here](https://huggingface.co/models?inference=warm&pipeline_tag=image-to-image&sort=trending).

### API specification

#### Request

| Payload |  |  |
| :--- | :--- | :--- |
| **inputs** | _object, required_ | The input image data |
| **▼parameters** | _object, optional_ | Additional inference parameters for Image To Image |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;guidance_scale** | _number, optional_ | For diffusion models. A higher guidance scale value encourages the model to generate images closely linked to the text prompt at the expense of lower image quality. |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;negative_prompt** | _array, optional_ | One or several prompt to guide what NOT to include in image generation. |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;num_inference_steps** | _integer, optional_ | For diffusion models. The number of denoising steps. More denoising steps usually lead to a higher quality image at the expense of slower inference. |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▼target_size** | _object, optional_ | The size in pixel of the output image |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;width** | _integer, required_ |  |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;height** | _integer, required_ |  |


| Headers |   |    |
| :--- | :--- | :--- |
| **authorization** | _string, optional_ | Authentication header in the form `'Bearer: hf_****'` when `hf_****` is a personal user access token with Inference API permission. You can generate one from [your settings page](https://huggingface.co/settings/tokens). |
| **x-use-cache** | _boolean, optional, default to `true`_ | There is a cache layer on the inference API to speedup requests we have already seen. Most models can use those results as is as models are deterministic (meaning the results will be the same anyway). However if you use a non deterministic model, you can set this parameter to prevent the caching mechanism from being used resulting in a real new query. |
| **x-wait-for-model** | _boolean, optional, default to `false`_ | If the model is not ready, wait for it instead of receiving 503. It limits the number of requests required to get your inference done. It is advised to only set this flag to true after receiving a 503 error as it will limit hanging in your application to known places. |

#### Response

| Payload | Description |
| :--- | :--- |
| **image** | The output image |


### Using the API

<inferencesnippet>

<curl>
```bash

```
</curl>

<python>
```py
import requests

API_URL = "https://api-inference.huggingface.co/models/fal/AuraSR-v2"
headers = {"Authorization": "Bearer hf_***"}


```

To use the Python client, see `huggingface_hub`'s [package reference](https://huggingface.co/docs/huggingface_hub/package_reference/inference_client#huggingface_hub.InferenceClient.image_to_image).
</python>

<js>
```js

```

To use the JavaScript client, see `huggingface.js`'s [package reference](https://huggingface.co/docs/huggingface.js/inference/classes/HfInference#imagetoimage).
</js>

</inferencesnippet>
