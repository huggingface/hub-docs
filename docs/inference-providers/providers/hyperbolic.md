<!---
WARNING

This markdown file has been generated from a script. Please do not edit it directly.

### Template

If you want to update the content related to hyperbolic's description, please edit the template file under `https://github.com/huggingface/hub-docs/tree/main/scripts/inference-providers/templates/providers/hyperbolic.handlebars`.

### Logos

If you want to update hyperbolic's logo, upload a file by opening a PR on https://huggingface.co/datasets/huggingface/documentation-images/tree/main/inference-providers/logos. Ping @wauplin and @celinah on the PR to let them know you uploaded a new logo.
Logos must be in .png format and be named `hyperbolic-light.png` and `hyperbolic-dark.png`. Visit https://huggingface.co/settings/theme to switch between light and dark mode and check that the logos are displayed correctly.

### Generation script

For more details, check out the `generate.ts` script: https://github.com/huggingface/hub-docs/blob/main/scripts/inference-providers/scripts/generate.ts.
--->

# Hyperbolic: The On-Demand AI Cloud

<Tip>

All supported Hyperbolic models can be found [here](https://huggingface.co/models?inference_provider=hyperbolic&sort=trending)

</Tip>

<div class="flex justify-center">
    <a href="https://hyperbolic.xyz/" target="_blank">
        <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/logos/hyperbolic-light.png"/>
        <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/logos/hyperbolic-dark.png"/>
    </a>
</div>

<div class="flex">
    <a href="https://huggingface.co/Hyperbolic" target="_blank">
        <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/badges/resolve/main/follow-us-on-hf-lg.svg"/>
        <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/badges/resolve/main/follow-us-on-hf-lg-dark.svg"/>
    </a>
</div>

## Join 165,000+ developers building with on-demand GPUs and running inference on the latest models — at 75% less than legacy clouds.

Hyperbolic is the infrastructure powering the world’s leading AI projects. Trusted by Hugging Face, Vercel, Google, Quora, Chatbot Arena, Open Router, Black Forest Labs, Reve.art, Stanford, UC Berkeley and more.

---

## Products and Services

### **GPU Marketplace**
Hyperbolic provides a global network of compute to unlock on-demand GPU rentals at the lowest prices. Start in seconds, and keep running.

### **Bulk Rentals**
Reserve dedicated GPUs with guaranteed uptime and discounted prepaid pricing — perfect for 24/7 inference, LLM tooling, training, and scaling production workloads without peak-time shortages.

### **Serverless Inference**
Run the latest models while staying fully API-compatible with OpenAI and many other ecosystems.

### **Dedicated Hosting**
Run LLMs, VLMs, or diffusion models on single-tenant GPUs with private endpoints. Bring your own weights or use open models. Full control, hourly pricing. Ideal for 24/7 inference or 100K+ tokens/min workloads.

---

## Pricing

- Rent GPUs starting at **$0.16/gpu/hr**
- Access inference at **3–10x cheaper** than competitors

For the latest pricing, visit our [pricing page](https://hyperbolic.xyz/pricing?utm_source=hf_docs).

---

## Resources

- **Launch App**: [app.hyperbolic.xyz](https://hyperbolic.xyz/?utm_source=hf_docs)
- **Website**: [hyperbolic.xyz](https://hyperbolic.xyz/?utm_source=hf_doc)
- **X (Twitter)**: [@hyperbolic_labs](https://x.com/hyperbolic_labs)
- **LinkedIn**: [Hyperbolic Labs](https://www.linkedin.com/company/hyperbolic-labs/)
- **Discord**: [Join our community](https://discord.com/invite/hyperbolic)
- **YouTube**: [@hyperbolic-labs](https://www.youtube.com/@hyperbolic-labs)

## Supported tasks


### Chat Completion (LLM)

Find out more about Chat Completion (LLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=text-generation
    providersMapping={ {"hyperbolic":{"modelId":"Qwen/Qwen3-Next-80B-A3B-Instruct","providerModelId":"Qwen/Qwen3-Next-80B-A3B-Instruct"} } }
conversational />


### Chat Completion (VLM)

Find out more about Chat Completion (VLM) [here](../tasks/chat-completion).

<InferenceSnippet
    pipeline=image-text-to-text
    providersMapping={ {"hyperbolic":{"modelId":"Qwen/Qwen2.5-VL-7B-Instruct","providerModelId":"Qwen/Qwen2.5-VL-7B-Instruct"} } }
conversational />


