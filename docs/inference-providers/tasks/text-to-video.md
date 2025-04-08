<!---
This markdown file has been generated from a script. Please do not edit it directly.
For more details, check out:
- the `generate.ts` script: https://github.com/huggingface/hub-docs/blob/main/scripts/inference-providers/scripts/generate.ts
- the task template defining the sections in the page: https://github.com/huggingface/hub-docs/tree/main/scripts/inference-providers/templates/task/text-to-video.handlebars
- the input jsonschema specifications used to generate the input markdown table: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/tasks/text-to-video/spec/input.json
- the output jsonschema specifications used to generate the output markdown table: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/tasks/text-to-video/spec/output.json
- the snippets used to generate the example:
  - curl: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/snippets/curl.ts
  - python: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/snippets/python.ts
  - javascript: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/snippets/js.ts
- the "tasks" content for recommended models: https://huggingface.co/api/tasks
--->

## Text to Video

Generate an video based on a given text prompt.

<Tip>

For more details about the `text-to-video` task, check out its [dedicated page](https://huggingface.co/tasks/text-to-video)! You will find examples and related materials.

</Tip>

### Recommended models

- [tencent/HunyuanVideo](https://huggingface.co/tencent/HunyuanVideo): A strong model for consistent video generation.
- [Lightricks/LTX-Video](https://huggingface.co/Lightricks/LTX-Video): A text-to-video model with high fidelity motion and strong prompt adherence.
- [Wan-AI/Wan2.1-T2V-1.3B](https://huggingface.co/Wan-AI/Wan2.1-T2V-1.3B): A robust model for video generation.

Explore all available models and find the one that suits you best [here](https://huggingface.co/models?inference=warm&pipeline_tag=text-to-video&sort=trending).

### Using the API


<InferenceSnippet
    pipeline=text-to-video
    providersMapping={ {"fal-ai":{"modelId":"Wan-AI/Wan2.1-T2V-14B","providerModelId":"fal-ai/wan-t2v"},"hf-inference":{"modelId":"AdamLucek/Wan2.1-T2V-14B-OldBookIllustrations","providerModelId":"black-forest-labs/FLUX.1-dev"},"novita":{"modelId":"Wan-AI/Wan2.1-T2V-14B","providerModelId":"wan-t2v"},"replicate":{"modelId":"Wan-AI/Wan2.1-T2V-14B","providerModelId":"wavespeedai/wan-2.1-t2v-480p"}} }
/>



### API specification

#### Request

| Payload |  |  |
| :--- | :--- | :--- |
| **inputs*** | _string_ | The input text data (sometimes called "prompt") |
| **parameters** | _object_ |  |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;num_frames** | _number_ | The num_frames parameter determines how many video frames are generated. |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;guidance_scale** | _number_ | A higher guidance scale value encourages the model to generate videos closely linked to the text prompt, but values too high may cause saturation and other artifacts. |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;negative_prompt** | _string[]_ | One or several prompt to guide what NOT to include in video generation. |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;num_inference_steps** | _integer_ | The number of denoising steps. More denoising steps usually lead to a higher quality video at the expense of slower inference. |
| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;seed** | _integer_ | Seed for the random number generator. |


Some options can be configured by passing headers to the Inference API. Here are the available headers:

| Headers |   |    |
| :--- | :--- | :--- |
| **authorization** | _string_ | Authentication header in the form `'Bearer: hf_****'` when `hf_****` is a personal user access token with Inference API permission. You can generate one from [your settings page](https://huggingface.co/settings/tokens). |
| **x-use-cache** | _boolean, default to `true`_ | There is a cache layer on the inference API to speed up requests we have already seen. Most models can use those results as they are deterministic (meaning the outputs will be the same anyway). However, if you use a nondeterministic model, you can set this parameter to prevent the caching mechanism from being used, resulting in a real new query. Read more about caching [here](../parameters#caching]). |
| **x-wait-for-model** | _boolean, default to `false`_ | If the model is not ready, wait for it instead of receiving 503. It limits the number of requests required to get your inference done. It is advised to only set this flag to true after receiving a 503 error, as it will limit hanging in your application to known places. Read more about model availability [here](../overview#eligibility]). |

For more information about Inference API headers, check out the parameters [guide](../parameters).

#### Response

| Body |  |
| :--- | :--- | :--- |
| **video** | _unknown_ | The generated video returned as raw bytes in the payload. |

