# Pricing and Billing

Access 200+ models from leading AI inference providers with centralized, transparent, pay-as-you-go pricing. No infrastructure management required—just pay for what you use, with no markup from Hugging Face.

## Free Credits to Get Started

Every Hugging Face user receives monthly credits to experiment with Inference Providers:

| Account Type                 | Monthly Credits | Value    |
| ---------------------------- | --------------- | -------- |
| Free Users                   | Limited credits | ~$0.10   |
| PRO Users                    | Full access     | **$2.00** |
| Enterprise Hub Organizations | Per-seat access | **$2.00 per seat** |

<Tip>

Your monthly credits automatically apply when you route requests through Hugging Face. For Enterprise organizations, credits are shared among all members.

</Tip>

## How Billing Works: Choose Your Approach

Inference Providers offers flexibility in how you're billed. Understanding these options upfront helps you choose the best approach for your needs:

| Feature | **Routed by Hugging Face** | **Custom Provider Key** | **Direct Calls** |
| :--- | :--- | :--- | :--- |
| **How it Works** | Your request routes through HF to the provider | You set a custom provider key in HF settings | You provide the provider key directly in your code |
| **Billing** | Pay-as-you-go on your HF account | Billed directly by the provider | Billed directly by the provider |
| **Monthly Credits** | **✅ Yes** - Credits apply to eligible providers | **❌ No** - Credits don't apply | **❌ No** - Credits don't apply |
| **Provider Account Needed** | **❌ No** - We handle everything | **✅ Yes** - You need provider accounts | **✅ Yes** - You need provider accounts |
| **Best For** | Simplicity, experimentation, consolidated billing | More billing control, using non-integrated providers | Full control, bypassing HF routing |
| **Integration** | SDKs, Playground, widgets, Data AI Studio | SDKs, Playground, widgets, Data AI Studio | SDKs only |

### Which Option Should I Choose?

- **Start with Routed by Hugging Face** if you want simplicity and to use your monthly credits
- **Use Custom Provider Key** if you need specific provider features or you're consistently using the same provider
- **Use Direct Calls** if you want to bypass Hugging Face routing entirely

## Pay-as-you-Go Details

To benefit from Enterprise Hub included credits, you need to explicitly specify the organization to be billed when performing the inference requests.
See the [Organization Billing section](#organization-billing) below for more details.

**PRO users and Enterprise Hub organizations** can continue using the API after exhausting their monthly credits. This ensures uninterrupted access to models for production workloads.


If you have remaining credits, we estimate costs for providers that aren’t fully integrated with our billing system. These estimates are usually higher than the actual cost to prevent abuse, which is why PAYG is currently disabled for those providers.

<Tip>

Hugging Face charges you the same rates as the provider, with no additional fees. We just pass through the provider costs directly.

</Tip>

You can track your spending anytime on your [billing page](https://huggingface.co/settings/billing).

## Routed Requests vs Direct Calls (Detailed Comparison)

The documentation above assumes you are making routed requests to external providers. In practice, there are 3 different ways to run inference, each with unique billing implications:

- **Routed Request**: This is the default method for using Inference Providers. Simply use the JavaScript or Python `InferenceClient`, or make raw HTTP requests with your Hugging Face User Access Token. Your request is automatically routed through Hugging Face to the provider's platform. No separate provider account is required, and billing is managed directly by Hugging Face. This approach lets you seamlessly switch between providers without additional setup.

- **Routed Request with Custom Key**: In your [settings page](https://huggingface.co/settings/inference-providers) on the Hub, you can configure a custom key for each provider. To use this option, you'll need to create an account on the provider's platform, and billing will be handled directly by that provider. Hugging Face won't charge you for the call. This method gives you more control over billing when experimenting with models on the Hub. When making a routed request with a custom key, your code remains unchanged—you'll still pass your Hugging Face User Access Token. Hugging Face will automatically swap the authentication when routing the request.

- **Direct Calls**: If you provide a custom key when using the JavaScript or Python `InferenceClient`, the call will be made directly to the provider's platform. Billing is managed by the provider, and Hugging Face is not notified of the request. This option is ideal if you want to use the unified `InferenceClient` interface without routing through Hugging Face.

Here is a table that sums up what we've seen so far:

|                                    | HF routing | Billed by    | Free-tier included | Pay-as-you-go                                   | Integration                               |
| ---------------------------------- | ---------- | ------------ | ------------------ | ----------------------------------------------- | ----------------------------------------- |
| **Routed request**                 | Yes        | Hugging Face | Yes                | Only for PRO users and for integrated providers | SDKs, Playground, widgets, Data AI Studio |
| **Routed request with custom key** | Yes        | Provider     | No                 | Yes                                             | SDKs, Playground, widgets, Data AI Studio |
| **Direct call**                    | No         | Provider     | No                 | Yes                                             | SDKs only                                 |

## HF-Inference cost

As you may have noticed, you can select to work with `"hf-inference"` provider. This service used to be called "Inference API (serverless)" prior to Inference Providers. From a user point of view, working with HF Inference is the same as with any other provider. Past the free-tier credits, you get charged for every inference request based on the compute time x price of the underlying hardware.

For instance, a request to [black-forest-labs/FLUX.1-dev](https://huggingface.co/black-forest-labs/FLUX.1-dev) that takes 10 seconds to complete on a GPU machine that costs $0.00012 per second to run, will be billed $0.0012.

The `"hf-inference"` provider is currently the default provider when working with the JavaScript and Python SDKs. Note that this default might change in the future.

## Billing forEnterprise Hub organizations

For Enterprise Hub organizations, it is possible to centralize billing for all of your users. Each user still uses their own User Access Token but the requests are billed to your organization. This can be done by passing `"X-HF-Bill-To: my-org-name"` as a header in your HTTP requests.

Enterprise Hub organizations receive a pool of free usage credits based on the number of seats in the subscription. Inference Providers usage can be tracked on the organization's billing page. Enterprise Hub organization administrators can also set a spending limit and disable a set of Inference Providers from the organization's settings.

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/enterprise-org-settings-light.png"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/enterprise-org-settings-dark.png"/>
</div>

If you are using the JavaScript `InferenceClient`, you can set the `billTo` attribute at a client level:

```js
import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient("hf_token", { billTo: "my-org-name" });

const image = await client.textToImage({
	model: "black-forest-labs/FLUX.1-schnell",
	inputs: "A majestic lion in a fantasy forest",
	provider: "fal-ai",
});
/// Use the generated image (it's a Blob)
```

And similarly in Python:

```py
from huggingface_hub import InferenceClient
client = InferenceClient(provider="fal-ai", bill_to="my-org-name")
image = client.text_to_image(
    "A majestic lion in a fantasy forest",
    model="black-forest-labs/FLUX.1-schnell",
)
image.save("lion.png")
```

