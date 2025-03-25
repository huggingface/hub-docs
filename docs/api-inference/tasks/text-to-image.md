<!---
This markdown file has been generated from a script. Please do not edit it directly.
For more details, check out:
- the `generate.ts` script: https://github.com/huggingface/hub-docs/blob/main/scripts/api-inference/scripts/generate.ts
- the task template defining the sections in the page: https://github.com/huggingface/hub-docs/tree/main/scripts/api-inference/templates/task/text-to-image.handlebars
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


Explore all available models and find the one that suits you best [here](https://huggingface.co/models?inference=warm&pipeline_tag=text-to-image&sort=trending).

### Using the API


<inferencesnippet>


<snippet provider="fal-ai" language="python" client="huggingface_hub">

```python
from huggingface_hub import InferenceClient

client = InferenceClient(
    provider="fal-ai",
    api_key="hf_***",
)

# output is a PIL.Image object
image = client.text_to_image(
    "Astronaut riding a horse",
    model="black-forest-labs/FLUX.1-dev",
)
```

</snippet>

To use the Python `InferenceClient`, see the [package reference](https://huggingface.co/docs/huggingface_hub/package_reference/inference_client#huggingface_hub.InferenceClient.).

<snippet provider="fal-ai" language="python" client="fal_client">

```python
import fal_client

result = fal_client.subscribe(
    "fal-ai/flux/dev",
    arguments={
        "prompt": "Astronaut riding a horse",
    },
)
print(result)
```

</snippet>


<snippet provider="fal-ai" language="js" client="fetch">

```js
async function query(data) {
	const response = await fetch(
		"https://router.huggingface.co/fal-ai/fal-ai/flux/dev",
		{
			headers: {
				Authorization: "Bearer hf_***",
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.blob();
	return result;
}

query({ inputs: "Astronaut riding a horse" }).then((response) => {
    // Use image
});
```

</snippet>


<snippet provider="fal-ai" language="js" client="huggingface.js">

```js
import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient("hf_***");

const image = await client.textToImage({
    provider: "fal-ai",
    model: "black-forest-labs/FLUX.1-dev",
	inputs: "Astronaut riding a horse",
	parameters: { num_inference_steps: 5 },
});
/// Use the generated image (it's a Blob)
```

</snippet>

To use the JavaScript `InferenceClient`, see `huggingface.js`'s [package reference](https://huggingface.co/docs/huggingface.js/inference/classes/InferenceClient#).

<snippet provider="hf-inference" language="python" client="huggingface_hub">

```python
from huggingface_hub import InferenceClient

client = InferenceClient(
    provider="hf-inference",
    api_key="hf_***",
)

# output is a PIL.Image object
image = client.text_to_image(
    "Astronaut riding a horse",
    model="black-forest-labs/FLUX.1-dev",
)
```

</snippet>

To use the Python `InferenceClient`, see the [package reference](https://huggingface.co/docs/huggingface_hub/package_reference/inference_client#huggingface_hub.InferenceClient.).

<snippet provider="hf-inference" language="python" client="requests">

```python
import requests

API_URL = "https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-dev"
headers = {"Authorization": "Bearer hf_***"}

def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.content

image_bytes = query({
    "inputs": "Astronaut riding a horse",
})

# You can access the image with PIL.Image for example
import io
from PIL import Image
image = Image.open(io.BytesIO(image_bytes))
```

</snippet>


<snippet provider="hf-inference" language="js" client="fetch">

```js
async function query(data) {
	const response = await fetch(
		"https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-dev",
		{
			headers: {
				Authorization: "Bearer hf_***",
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.blob();
	return result;
}

query({ inputs: "Astronaut riding a horse" }).then((response) => {
    // Use image
});
```

</snippet>


<snippet provider="hf-inference" language="js" client="huggingface.js">

```js
import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient("hf_***");

const image = await client.textToImage({
    provider: "hf-inference",
    model: "black-forest-labs/FLUX.1-dev",
	inputs: "Astronaut riding a horse",
	parameters: { num_inference_steps: 5 },
});
/// Use the generated image (it's a Blob)
```

</snippet>

To use the JavaScript `InferenceClient`, see `huggingface.js`'s [package reference](https://huggingface.co/docs/huggingface.js/inference/classes/InferenceClient#).

<snippet provider="nebius" language="python" client="huggingface_hub">

```python
from huggingface_hub import InferenceClient

client = InferenceClient(
    provider="nebius",
    api_key="hf_***",
)

# output is a PIL.Image object
image = client.text_to_image(
    "Astronaut riding a horse",
    model="black-forest-labs/FLUX.1-dev",
)
```

</snippet>

To use the Python `InferenceClient`, see the [package reference](https://huggingface.co/docs/huggingface_hub/package_reference/inference_client#huggingface_hub.InferenceClient.).

<snippet provider="nebius" language="js" client="fetch">

```js
async function query(data) {
	const response = await fetch(
		"https://router.huggingface.co/nebius/v1/images/generations",
		{
			headers: {
				Authorization: "Bearer hf_***",
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.blob();
	return result;
}

query({ inputs: "Astronaut riding a horse" }).then((response) => {
    // Use image
});
```

</snippet>


<snippet provider="nebius" language="js" client="huggingface.js">

```js
import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient("hf_***");

const image = await client.textToImage({
    provider: "nebius",
    model: "black-forest-labs/FLUX.1-dev",
	inputs: "Astronaut riding a horse",
	parameters: { num_inference_steps: 5 },
});
/// Use the generated image (it's a Blob)
```

</snippet>

To use the JavaScript `InferenceClient`, see `huggingface.js`'s [package reference](https://huggingface.co/docs/huggingface.js/inference/classes/InferenceClient#).

<snippet provider="replicate" language="python" client="huggingface_hub">

```python
from huggingface_hub import InferenceClient

client = InferenceClient(
    provider="replicate",
    api_key="hf_***",
)

# output is a PIL.Image object
image = client.text_to_image(
    "Astronaut riding a horse",
    model="black-forest-labs/FLUX.1-dev",
)
```

</snippet>

To use the Python `InferenceClient`, see the [package reference](https://huggingface.co/docs/huggingface_hub/package_reference/inference_client#huggingface_hub.InferenceClient.).

<snippet provider="replicate" language="js" client="fetch">

```js
async function query(data) {
	const response = await fetch(
		"https://router.huggingface.co/replicate/v1/models/black-forest-labs/flux-dev/predictions",
		{
			headers: {
				Authorization: "Bearer hf_***",
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.blob();
	return result;
}

query({ inputs:  }).then((response) => {
    // Use image
});
```

</snippet>


<snippet provider="replicate" language="js" client="huggingface.js">

```js
import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient("hf_***");

const image = await client.textToImage({
    provider: "replicate",
    model: "black-forest-labs/FLUX.1-dev",
	inputs: "Astronaut riding a horse",
	parameters: { num_inference_steps: 5 },
});
/// Use the generated image (it's a Blob)
```

</snippet>

To use the JavaScript `InferenceClient`, see `huggingface.js`'s [package reference](https://huggingface.co/docs/huggingface.js/inference/classes/InferenceClient#).

<snippet provider="together" language="python" client="huggingface_hub">

```python
from huggingface_hub import InferenceClient

client = InferenceClient(
    provider="together",
    api_key="hf_***",
)

# output is a PIL.Image object
image = client.text_to_image(
    "Astronaut riding a horse",
    model="black-forest-labs/FLUX.1-dev",
)
```

</snippet>

To use the Python `InferenceClient`, see the [package reference](https://huggingface.co/docs/huggingface_hub/package_reference/inference_client#huggingface_hub.InferenceClient.).

<snippet provider="together" language="js" client="fetch">

```js
async function query(data) {
	const response = await fetch(
		"https://router.huggingface.co/together/v1/images/generations",
		{
			headers: {
				Authorization: "Bearer hf_***",
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.blob();
	return result;
}

query({ inputs: "Astronaut riding a horse" }).then((response) => {
    // Use image
});
```

</snippet>


<snippet provider="together" language="js" client="huggingface.js">

```js
import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient("hf_***");

const image = await client.textToImage({
    provider: "together",
    model: "black-forest-labs/FLUX.1-dev",
	inputs: "Astronaut riding a horse",
	parameters: { num_inference_steps: 5 },
});
/// Use the generated image (it's a Blob)
```

</snippet>

To use the JavaScript `InferenceClient`, see `huggingface.js`'s [package reference](https://huggingface.co/docs/huggingface.js/inference/classes/InferenceClient#).

</inferencesnippet>



### API specification

#### Request

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
| **image** | _unknown_ | The generated image returned as raw bytes in the payload. |

