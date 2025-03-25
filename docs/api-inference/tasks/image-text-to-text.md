<!---
This markdown file has been generated from a script. Please do not edit it directly.
For more details, check out:
- the `generate.ts` script: https://github.com/huggingface/hub-docs/blob/main/scripts/api-inference/scripts/generate.ts
- the task template defining the sections in the page: https://github.com/huggingface/hub-docs/tree/main/scripts/api-inference/templates/task/image-text-to-text.handlebars
- the input jsonschema specifications used to generate the input markdown table: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/tasks/image-text-to-text/spec/input.json
- the output jsonschema specifications used to generate the output markdown table: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/tasks/image-text-to-text/spec/output.json
- the snippets used to generate the example:
  - curl: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/snippets/curl.ts
  - python: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/snippets/python.ts
  - javascript: https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/snippets/js.ts
- the "tasks" content for recommended models: https://huggingface.co/api/tasks
--->

## Image-Text to Text

Image-text-to-text models take in an image and text prompt and output text. These models are also called vision-language models, or VLMs. The difference from image-to-text models is that these models take an additional text input, not restricting the model to certain use cases like image captioning, and may also be trained to accept a conversation as input.

<Tip>

For more details about the `image-text-to-text` task, check out its [dedicated page](https://huggingface.co/tasks/image-text-to-text)! You will find examples and related materials.

</Tip>

### Recommended models


Explore all available models and find the one that suits you best [here](https://huggingface.co/models?inference=warm&pipeline_tag=image-text-to-text&sort=trending).

### Using the API


<inferencesnippet>


<snippet provider="hf-inference" language="python" client="huggingface_hub">

```python
from huggingface_hub import InferenceClient

client = InferenceClient(
    provider="hf-inference",
    api_key="hf_***",
)

completion = client.chat.completions.create(
    model="google/gemma-3-27b-it",
    messages=[
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": "Describe this image in one sentence."
                },
                {
                    "type": "image_url",
                    "image_url": {
                        "url": "https://cdn.britannica.com/61/93061-050-99147DCE/Statue-of-Liberty-Island-New-York-Bay.jpg"
                    }
                }
            ]
        }
    ],
    max_tokens=500,
)

print(completion.choices[0].message)
```

</snippet>

To use the Python `InferenceClient`, see the [package reference](https://huggingface.co/docs/huggingface_hub/package_reference/inference_client#huggingface_hub.InferenceClient.).

<snippet provider="hf-inference" language="python" client="requests">

```python
import requests

API_URL = "https://router.huggingface.co/hf-inference/models/google/gemma-3-27b-it/v1/chat/completions"
headers = {"Authorization": "Bearer hf_***"}

def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()

response = query({
    "messages": [
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": "Describe this image in one sentence."
                },
                {
                    "type": "image_url",
                    "image_url": {
                        "url": "https://cdn.britannica.com/61/93061-050-99147DCE/Statue-of-Liberty-Island-New-York-Bay.jpg"
                    }
                }
            ]
        }
    ],
    "max_tokens": 500,
    "model": "google/gemma-3-27b-it"
})

print(response["choices"][0]["message"])
```

</snippet>


<snippet provider="hf-inference" language="python" client="openai">

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://router.huggingface.co/hf-inference/models/google/gemma-3-27b-it/v1",
    api_key="hf_***"
)

completion = client.chat.completions.create(
    model="google/gemma-3-27b-it",
    messages=[
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": "Describe this image in one sentence."
                },
                {
                    "type": "image_url",
                    "image_url": {
                        "url": "https://cdn.britannica.com/61/93061-050-99147DCE/Statue-of-Liberty-Island-New-York-Bay.jpg"
                    }
                }
            ]
        }
    ],
    max_tokens=500,
)

print(completion.choices[0].message)
```

</snippet>


<snippet provider="hf-inference" language="js" client="huggingface.js">

```js
import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient("hf_***");

const chatCompletion = await client.chatCompletion({
    provider: "hf-inference",
    model: "google/gemma-3-27b-it",
    messages: [
        {
            role: "user",
            content: [
                {
                    type: "text",
                    text: "Describe this image in one sentence.",
                },
                {
                    type: "image_url",
                    image_url: {
                        url: "https://cdn.britannica.com/61/93061-050-99147DCE/Statue-of-Liberty-Island-New-York-Bay.jpg",
                    },
                },
            ],
        },
    ],
    max_tokens: 500,
});

console.log(chatCompletion.choices[0].message);
```

</snippet>

To use the JavaScript `InferenceClient`, see `huggingface.js`'s [package reference](https://huggingface.co/docs/huggingface.js/inference/classes/InferenceClient#).

<snippet provider="hf-inference" language="js" client="openai">

```js
import { OpenAI } from "openai";

const client = new OpenAI({
	baseURL: "https://router.huggingface.co/hf-inference/models/google/gemma-3-27b-it/v1",
	apiKey: "hf_***",
});

const chatCompletion = await client.chat.completions.create({
	model: "google/gemma-3-27b-it",
    messages: [
        {
            role: "user",
            content: [
                {
                    type: "text",
                    text: "Describe this image in one sentence.",
                },
                {
                    type: "image_url",
                    image_url: {
                        url: "https://cdn.britannica.com/61/93061-050-99147DCE/Statue-of-Liberty-Island-New-York-Bay.jpg",
                    },
                },
            ],
        },
    ],
    max_tokens: 500,
});

console.log(chatCompletion.choices[0].message);
```

</snippet>


<snippet provider="hf-inference" language="sh" client="curl">

```sh
curl https://router.huggingface.co/hf-inference/models/google/gemma-3-27b-it/v1/chat/completions \
    -H 'Authorization: Bearer hf_***' \
    -H 'Content-Type: application/json' \
    -d '{
        "messages": [
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": "Describe this image in one sentence."
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": "https://cdn.britannica.com/61/93061-050-99147DCE/Statue-of-Liberty-Island-New-York-Bay.jpg"
                        }
                    }
                ]
            }
        ],
        "max_tokens": 500,
        "model": "google/gemma-3-27b-it",
        "stream": false
    }'
```

</snippet>


<snippet provider="hyperbolic" language="python" client="huggingface_hub">

```python
from huggingface_hub import InferenceClient

client = InferenceClient(
    provider="hyperbolic",
    api_key="hf_***",
)

completion = client.chat.completions.create(
    model="Qwen/Qwen2.5-VL-7B-Instruct",
    messages=[
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": "Describe this image in one sentence."
                },
                {
                    "type": "image_url",
                    "image_url": {
                        "url": "https://cdn.britannica.com/61/93061-050-99147DCE/Statue-of-Liberty-Island-New-York-Bay.jpg"
                    }
                }
            ]
        }
    ],
    max_tokens=500,
)

print(completion.choices[0].message)
```

</snippet>

To use the Python `InferenceClient`, see the [package reference](https://huggingface.co/docs/huggingface_hub/package_reference/inference_client#huggingface_hub.InferenceClient.).

<snippet provider="hyperbolic" language="python" client="requests">

```python
import requests

API_URL = "https://router.huggingface.co/hyperbolic/v1/chat/completions"
headers = {"Authorization": "Bearer hf_***"}

def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()

response = query({
    "messages": [
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": "Describe this image in one sentence."
                },
                {
                    "type": "image_url",
                    "image_url": {
                        "url": "https://cdn.britannica.com/61/93061-050-99147DCE/Statue-of-Liberty-Island-New-York-Bay.jpg"
                    }
                }
            ]
        }
    ],
    "max_tokens": 500,
    "model": "Qwen/Qwen2.5-VL-7B-Instruct"
})

print(response["choices"][0]["message"])
```

</snippet>


<snippet provider="hyperbolic" language="python" client="openai">

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://router.huggingface.co/hyperbolic/v1",
    api_key="hf_***"
)

completion = client.chat.completions.create(
    model="Qwen/Qwen2.5-VL-7B-Instruct",
    messages=[
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": "Describe this image in one sentence."
                },
                {
                    "type": "image_url",
                    "image_url": {
                        "url": "https://cdn.britannica.com/61/93061-050-99147DCE/Statue-of-Liberty-Island-New-York-Bay.jpg"
                    }
                }
            ]
        }
    ],
    max_tokens=500,
)

print(completion.choices[0].message)
```

</snippet>


<snippet provider="hyperbolic" language="js" client="huggingface.js">

```js
import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient("hf_***");

const chatCompletion = await client.chatCompletion({
    provider: "hyperbolic",
    model: "Qwen/Qwen2.5-VL-7B-Instruct",
    messages: [
        {
            role: "user",
            content: [
                {
                    type: "text",
                    text: "Describe this image in one sentence.",
                },
                {
                    type: "image_url",
                    image_url: {
                        url: "https://cdn.britannica.com/61/93061-050-99147DCE/Statue-of-Liberty-Island-New-York-Bay.jpg",
                    },
                },
            ],
        },
    ],
    max_tokens: 500,
});

console.log(chatCompletion.choices[0].message);
```

</snippet>

To use the JavaScript `InferenceClient`, see `huggingface.js`'s [package reference](https://huggingface.co/docs/huggingface.js/inference/classes/InferenceClient#).

<snippet provider="hyperbolic" language="js" client="openai">

```js
import { OpenAI } from "openai";

const client = new OpenAI({
	baseURL: "https://router.huggingface.co/hyperbolic/v1",
	apiKey: "hf_***",
});

const chatCompletion = await client.chat.completions.create({
	model: "Qwen/Qwen2.5-VL-7B-Instruct",
    messages: [
        {
            role: "user",
            content: [
                {
                    type: "text",
                    text: "Describe this image in one sentence.",
                },
                {
                    type: "image_url",
                    image_url: {
                        url: "https://cdn.britannica.com/61/93061-050-99147DCE/Statue-of-Liberty-Island-New-York-Bay.jpg",
                    },
                },
            ],
        },
    ],
    max_tokens: 500,
});

console.log(chatCompletion.choices[0].message);
```

</snippet>


<snippet provider="hyperbolic" language="sh" client="curl">

```sh
curl https://router.huggingface.co/hyperbolic/v1/chat/completions \
    -H 'Authorization: Bearer hf_***' \
    -H 'Content-Type: application/json' \
    -d '{
        "messages": [
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": "Describe this image in one sentence."
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": "https://cdn.britannica.com/61/93061-050-99147DCE/Statue-of-Liberty-Island-New-York-Bay.jpg"
                        }
                    }
                ]
            }
        ],
        "max_tokens": 500,
        "model": "Qwen/Qwen2.5-VL-7B-Instruct",
        "stream": false
    }'
```

</snippet>


</inferencesnippet>



### API specification

For the API specification of conversational image-text-to-text models, please refer to the [Chat Completion API documentation](https://huggingface.co/docs/api-inference/tasks/chat-completion#api-specification).


