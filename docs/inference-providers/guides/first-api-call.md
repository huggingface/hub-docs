# Your First Inference Provider Call

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers-guides/first-api-call-thumbnail-light.png"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers-guides/first-api-call-thumbnail-dark.png"/>
</div>

In this guide we're going to help you make your first API call with Inference Providers.

Many developers avoid using open source AI models because they assume deployment is complex. This guide will show you how to use a state-of-the-art model in under five minutes, with no infrastructure setup required.

We're going to use the [FLUX.1-schnell](https://huggingface.co/black-forest-labs/FLUX.1-schnell) model, which is a powerful text-to-image model.

> [!TIP]
> This guide assumes you have a Hugging Face account. If you don't have one, you can create one for free at [huggingface.co](https://huggingface.co).

## Step 1: Find a Model on the Hub

Visit the [Hugging Face Hub](https://huggingface.co/models?pipeline_tag=text-to-image&inference_provider=all&sort=trending) and look for models with the "Inference Providers" filter, you can select the provider that you want. We'll go with `fal`. 

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

> [!WARNING]
> You'll need a Hugging Face account (free at [huggingface.co](https://huggingface.co)) and remaining credits to use the model.

## Step 3: From Clicks to Code

Now let's replicate this with Python. Click the **"View Code Snippets"** button in the widget to see the [generated code snippets](https://huggingface.co/black-forest-labs/FLUX.1-dev?inference_api=true&language=python&inference_provider=auto).

![code snippets image](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers-guides/code-snippets.png)

You will need to populate this snippet with a valid Hugging Face User Access Token. You can find your User Access Token in your [settings page](https://huggingface.co/settings/tokens).

Set your token as an environment variable:

```bash
export HF_TOKEN="your_token_here"
```

> [!TIP]
> You can add this line to your `.bash_profile` or similar file for all your terminal environments to automatically source the token.

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

## Dive Deeper: Provider Selection

You might have noticed the `provider="auto"` parameter in the code examples above. This is a key feature of Inference Providers that gives you control over which infrastructure provider handles your request.

`auto` is powerful because:

1. It makes it easy to switch between providers, and to test different providers' performance for your use case. 
2. It also gives a fallback mechanism in case a provider is unavailable.

But if you want to be more specific, you can also specify a provider. Let's see how.

### Understanding Provider Selection

When you use `provider="auto"` (which is the default), the system automatically selects the first available provider for your chosen model based on your preference order in your [Inference Provider settings](https://hf.co/settings/inference-providers). This provides:

- **Automatic failover**: If one provider is unavailable, the system tries the next one
- **Simplified setup**: No need to research which providers support your model
- **Optimal routing**: The system handles provider selection for you

### Specifying a Specific Provider

Alternatively, you can explicitly choose a provider if you have specific requirements:

<hfoptions id="provider-selection-examples">

<hfoption id="python">

```python
import os
from huggingface_hub import InferenceClient

client = InferenceClient(api_key=os.environ["HF_TOKEN"])

# Using automatic provider selection (default)
image_auto = client.text_to_image(
    "Astronaut riding a horse",
    model="black-forest-labs/FLUX.1-schnell",
    provider="auto"  # This is the default
)

# Using a specific provider
image_fal = client.text_to_image(
    "Astronaut riding a horse", 
    model="black-forest-labs/FLUX.1-schnell",
    provider="fal-ai"  # Explicitly use Fal AI
)

# Using another specific provider
image_replicate = client.text_to_image(
    "Astronaut riding a horse",
    model="black-forest-labs/FLUX.1-schnell", 
    provider="replicate"  # Explicitly use Replicate
)
```

</hfoption>

<hfoption id="typescript">

```typescript
import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient(process.env.HF_TOKEN);

// Using automatic provider selection (default)
const imageAuto = await client.textToImage({
    model: "black-forest-labs/FLUX.1-schnell",
    inputs: "Astronaut riding a horse",
    provider: "auto", // This is the default
    parameters: { num_inference_steps: 5 },
});

// Using a specific provider
const imageFal = await client.textToImage({
    model: "black-forest-labs/FLUX.1-schnell",
    inputs: "Astronaut riding a horse",
    provider: "fal-ai", // Explicitly use Fal AI
    parameters: { num_inference_steps: 5 },
});

// Using another specific provider
const imageReplicate = await client.textToImage({
    model: "black-forest-labs/FLUX.1-schnell",
    inputs: "Astronaut riding a horse",
    provider: "replicate", // Explicitly use Replicate
    parameters: { num_inference_steps: 5 },
});
```

</hfoption>

</hfoptions>

### When to Use Each Approach

**Use `provider="auto"` when:**
- You're just getting started with Inference Providers
- You want the simplest setup and maximum reliability
- You don't have specific infrastructure requirements
- You want automatic failover if a provider is unavailable

**Use a specific provider when:**
- You need consistent performance characteristics
- You have specific billing or cost requirements
- You want to test different providers' performance for your use case

## Next Steps

Now that you've seen how easy it is to use AI models, you might wonder:
- What was that "provider" system doing behind the scenes?
- How does billing work?
- What other models can you use?

Continue to the next guide to understand the provider ecosystem and make informed choices about authentication and billing. 
