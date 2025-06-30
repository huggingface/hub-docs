# Your First Inference Provider Call

In this guide we're going to help you make your first API call with Inference Providers.

Many developers avoid using open source AI models because they assume deployment is complex. This guide will show you how to use a state-of-the-art model in under five minutes, with no infrastructure setup required.

We're going to use the [FLUX.1-schnell](https://huggingface.co/black-forest-labs/FLUX.1-schnell) model, which is a powerful text-to-image model.

<Tip>

This guide assumes you have a Hugging Face account. If you don't have one, you can create one for free at [huggingface.co](https://huggingface.co).

</Tip>

## Step 1: Find a Model on the Hub

Visit the [Hugging Face Hub](https://huggingface.co/models?pipeline_tag=text-to-image&inference_provider=fal-ai,hf-inference,nebius,nscale,replicate,together&sort=trending) and look for models with the "Inference Providers" filter, you can select the provider that you want. We'll go with `fal`. 

![search image](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers-guides/search.png)

For this example, we'll use [FLUX.1-schnell](https://huggingface.co/black-forest-labs/FLUX.1-schnell), a powerful text-to-image model. Next, navigate to the model page and scroll down to find the inference widget on the right side. 

## Step 2: Try the Interactive Widget

Before writing any code, try the widget directly on the [model page](https://huggingface.co/black-forest-labs/FLUX.1-dev?inference_provider=fal-ai):  

![widget image](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers-guides/widget.png)

Here, you can test the model directly in the browser from any of the available providers. You can also copy relevant code snippets to use in your own projects.

1. Enter a prompt like "A serene mountain landscape at sunset"
2. Click **"Generate"**
3. Watch as the model creates an image in seconds

This widget uses the same endpoint you're about to implement in code.

<Tip warning={true}>

You'll need a Hugging Face account (free at [huggingface.co](https://huggingface.co)) and remaining credits to use the model.

</Tip>

## Step 3: From Clicks to Code

Now let's replicate this with Python. Click the **"View Code Snippets"** button in the widget to see the [generated code snippets](https://huggingface.co/black-forest-labs/FLUX.1-dev?inference_api=true&language=python&inference_provider=auto).

![code snippets image](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers-guides/code-snippets.png)

You will need to populate this snippet with a valid Hugging Face User Access Token. You can find your User Access Token in your [settings page](https://huggingface.co/settings/tokens).

Set your token as an environment variable:

```bash
export HF_TOKEN="your_token_here"
```

The Python or TypeScript code snippet will use the token from the environment variable.

<hfoptions id="python-code-snippet">

<hfoption id="python">

Install the required package:

```bash
pip install huggingface_hub
```

You can now use the code snippet to generate an image in your app.

```python
import os
from huggingface_hub import InferenceClient

client = InferenceClient(
    provider="auto",
    api_key=os.environ["HF_TOKEN"],
)

# output is a PIL.Image object
image = client.text_to_image(
    "Astronaut riding a horse",
    model="black-forest-labs/FLUX.1-schnell",
)
```

</hfoption>

<hfoption id="typescript">

Install the required package:

```bash
npm install @huggingface/inference
```

Then, you can use the code snippet to generate an image in your app.

```typescript
import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient(process.env.HF_TOKEN);

const image = await client.textToImage({
    provider: "auto",
    model: "black-forest-labs/FLUX.1-schnell",
	inputs: "Astronaut riding a horse",
	parameters: { num_inference_steps: 5 },
});
/// Use the generated image (it's a Blob)
```

</hfoption>

</hfoptions>

## What Just Happened?

Nice work! You've successfully used a production-grade AI model without any complex setup. In just a few lines of code, you:

- Connected to a powerful text-to-image model
- Generated a custom image from text
- Saved the result locally

The model you just used runs on professional infrastructure, handling scaling, optimization, and reliability automatically.

## Next Steps

Now that you've seen how easy it is to use AI models, you might wonder:
- What was that "provider" system doing behind the scenes?
- How does billing work?
- What other models can you use?

Continue to the next guide to understand the provider ecosystem and make informed choices about authentication and billing. 