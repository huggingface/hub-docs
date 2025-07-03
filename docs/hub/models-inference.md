# Inference Providers

Hugging Face's model pages have free inference for thousands of models, so you can try them all out right in the browser. It's also powered by Inference Providers.

Inference Providers give developers streamlined, unified access to hundreds of machine learning models, powered by the best serverless inference partners. 👉 **For complete documentation, visit the [Inference Providers Documentation](https://huggingface.co/docs/inference-providers)**.

## Inference Providers on the Hub

Inference Providers is deeply integrated with the Hugging Face Hub, and you can use it in a few different ways:

- **Interactive Widgets** - Test models directly on model pages with interactive widgets that use Inference Providers under the hood. Check out the [DeepSeek-R1-0528 model page](https://huggingface.co/models/deepseek-ai/DeepSeek-R1-0528) for an example.
- **Inference Playground** - Easily test and compare chat completion models with your prompts. Check out the [Inference Playground](https://huggingface.co/playground) to get started.
- **Search** - Filter models by inference provider on the [models page](https://huggingface.co/models?inference_provider=all) to find models available through specific providers.

## Build with Inference Providers

You can integrate Inference Providers into your own applications using our SDKs or HTTP clients. Here's a quick start with Python and JavaScript, for more details, check out the [Inference Providers Documentation](https://huggingface.co/docs/inference-providers).

<hfoptions id="inference-providers-quick-start">

<hfoption id="python">

```python
from huggingface_hub import InferenceClient

client = InferenceClient(provider="auto")  # Automatically selects best provider

# Chat completion
completion = client.chat.completions.create(
    model="deepseek-ai/DeepSeek-V3-0324",
    messages=[{"role": "user", "content": "Hello!"}]
)
```

</hfoption>

<hfoption id="javascript">

```javascript
import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient(process.env.HF_TOKEN);

const chatCompletion = await client.chatCompletion({
    provider: "auto",  // Automatically selects best provider  
    model: "deepseek-ai/DeepSeek-V3-0324",
    messages: [{ role: "user", content: "Hello!" }]
});
```

</hfoption>

</hfoptions>

You'll need a Hugging Face token with inference permissions. Create one at [Settings > Tokens](https://huggingface.co/settings/tokens/new?ownUserPermissions=inference.serverless.write&tokenType=fineGrained).

### How Inference Providers works

Hugging Face’s Inference Providers give developers unified access to hundreds of machine learning models, powered by our serverless inference partners. This new approach builds on our previous Serverless Inference API, offering more models, improved performance, and greater reliability thanks to world-class providers.

To dive deeper into Inference Providers, check out the [Inference Providers Documentation](https://huggingface.co/docs/inference-providers). Here are some key resources:

- **[Quick Start](https://huggingface.co/docs/inference-providers)** 
- **[Pricing & Billing Guide](https://huggingface.co/docs/inference-providers/pricing)**
- **[Hub Integration Details](https://huggingface.co/docs/inference-providers/hub-integration)**

### What was the HF-Inference API?

HF-Inference API is one of the providers available through Inference Providers. It was previously called "Inference API (serverless)" and is powered by [Inference Endpoints](https://huggingface.co/docs/inference-endpoints/index) under the hood.

For more details about the HF-Inference provider specifically, check out its [dedicated page](https://huggingface.co/docs/inference-providers/providers/hf-inference).
