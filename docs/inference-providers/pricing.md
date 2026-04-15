# Pricing and Billing

Access 200+ models from leading AI inference providers with centralized, transparent, pay-as-you-go pricing. No infrastructure management required—just pay for what you use, with no markup from Hugging Face.

## Free Credits to Get Started

Every Hugging Face user receives monthly credits to experiment with Inference Providers:

| Account Type                     | Monthly Credits          | Extra usage (pay-as-you-go)     |
| -------------------------------- | ------------------------ | ------------------------------- |
| Free Users                       | $0.10, subject to change | yes (credits purchase required) |
| PRO Users                        | $2.00                    | yes                             |
| Team or Enterprise Organizations | $2.00 per seat           | yes                             |

> [!TIP]
> Your monthly credits automatically apply when you route requests through Hugging Face. For Team or Enterprise organizations, credits are shared among all members.

## How Billing Works: Choose Your Approach

Inference Providers offers flexibility in how you're billed. Understanding these options upfront helps you choose the best approach for your needs:

| Feature | **Routed by Hugging Face** | **Custom Provider Key** |
| :--- | :--- | :--- |
| **How it Works** | Your request routes through HF to the provider | You set a custom provider key in HF settings |
| **Billing** | Pay-as-you-go on your HF account | Billed directly by the provider |
| **Monthly Credits** | **✅ Yes** - Credits apply to eligible providers | **❌ No** - Credits don't apply |
| **Provider Account Needed** | **❌ No** - We handle everything | **✅ Yes** - You need provider accounts |
| **Best For** | Simplicity, experimentation, consolidated billing | More billing control, using non-integrated providers |
| **Integration** | SDKs, Playground, widgets, Data AI Studio | SDKs, Playground, widgets, Data AI Studio |

### Which Option Should I Choose?

- **Start with Routed by Hugging Face** if you want simplicity and to use your monthly credits
- **Use Custom Provider Key** if you need specific provider features or you're consistently using the same provider

## Pay-as-you-Go Details

To benefit from Team or Enterprise included credits, you need to explicitly specify the organization to be billed when performing the inference requests.
See the [Organization Billing section](#organization-billing) below for more details.

**All users** can continue using the API after exhausting their monthly credits by purchasing additional credits. This ensures uninterrupted access to models for production workloads.


> [!TIP]
> Hugging Face charges you the same rates as the provider, with no additional fees. We just pass through the provider costs directly.

You can track your spending anytime on your [billing page](https://huggingface.co/settings/billing).

## Inference Providers Usage Breakdown

View detailed usage information for Inference Providers directly from your settings. Visit your [Inference Providers Settings](https://huggingface.co/settings/inference-providers/overview) to see your usage for the past month, broken down by model and provider.

The same detailed view is available for organizations subscribed to a paid plan under the organization's settings.

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/ip-billing-light.png"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/ip-billing-dark.png"/>
</div>

## Hugging Face Billing vs Custom Provider Key (Detailed Comparison)

The documentation above assumes you are making routed requests to external providers. In practice, there are 2 different ways to run inference, each with unique billing implications:

- **Hugging Face Routed Requests**: This is the default method for using Inference Providers. Simply use the JavaScript or Python `InferenceClient`, or make raw HTTP requests with your Hugging Face User Access Token. Your request is automatically routed through Hugging Face to the provider's platform. No separate provider account is required, and billing is managed directly by Hugging Face. This approach lets you seamlessly switch between providers without additional setup.

- **Custom Provider Key**: You can bring your own provider key to use with the Inference Providers. This is useful if you already have an account with a provider and you want to use it with the Inference Providers. Hugging Face won't charge you for the call. 

Here is a table that sums up what we've seen so far:

|                                    | HF routing | Billed by    | Free-tier included | Pay-as-you-go                                   | Integration                               |
| ---------------------------------- | ---------- | ------------ | ------------------ | ----------------------------------------------- | ----------------------------------------- |
| **Routed Requests**                 | Yes        | Hugging Face | Yes                | Yes (credits purchase required)                 | SDKs, Playground, widgets, Data AI Studio |
| **Custom Provider Key** | Yes        | Provider     | No                 | Yes                                             | SDKs, Playground, widgets, Data AI Studio |

> [!TIP]
> You can set your custom provider key in the [settings page](https://huggingface.co/settings/inference-providers) on the Hub, or in the `InferenceClient` when using the JavaScript or Python SDKs. When making a routed request with a custom key, your code remains unchanged—you can still pass your Hugging Face User Access Token. Hugging Face will automatically swap the authentication when routing the request.

## HF-Inference cost

As you may have noticed, you can select to work with `"hf-inference"` provider. This service used to be called "Inference API (serverless)" prior to Inference Providers. From a user point of view, working with HF Inference is the same as with any other provider. Past the free-tier credits, you get charged for every inference request based on the compute time x price of the underlying hardware.

For instance, a request to [black-forest-labs/FLUX.1-dev](https://huggingface.co/black-forest-labs/FLUX.1-dev) that takes 10 seconds to complete on a GPU machine that costs $0.00012 per second to run, will be billed $0.0012.

As of July 2025, hf-inference focuses mostly on CPU inference (e.g. embedding, text-ranking, text-classification, or smaller LLMs that have historical importance like BERT or GPT-2).

## Billing for Team and Enterprise organizations

For Team & Enterprise organizations, it is possible to centralize billing for all of your users. Each user still uses their own User Access Token but the requests are billed to your organization. This can be done by passing `"X-HF-Bill-To: my-org-name"` as a header in your HTTP requests.

Team & Enterprise organizations receive a pool of free usage credits based on the number of seats in the subscription. Inference Providers usage can be tracked on the organization's billing page. Team & Enterprise organization administrators can also set a spending limit and disable a set of Inference Providers from the organization's settings.

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/enterprise-org-settings-light.png"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/enterprise-org-settings-dark.png"/>
</div>



<hfoptions id="python-clients">

<hfoption id="huggingface_hub">

To bill your organization, use the `bill_to` parameter when initializing the client.

```python
from huggingface_hub import InferenceClient

client = InferenceClient(bill_to="my-org-name")

completion = client.chat.completions.create(
    model="deepseek-ai/DeepSeek-V3-0324",
    messages=[
        {
            "role": "user",
            "content": "How many 'G's in 'huggingface'?"
        }
    ],
)

print(completion.choices[0].message)
```

</hfoption>

<hfoption id="openai">

To bill your organization when using OpenAI's Python client, set the `X-HF-Bill-To` header using `extra_headers` on the `completions.create` method call.

```python
import os
from openai import OpenAI

client = OpenAI(
    base_url="https://router.huggingface.co/v1",
    api_key=os.environ["HF_TOKEN"],
)

completion = client.chat.completions.create(
    model="deepseek-ai/DeepSeek-V3-0324",
    messages=[
        {
            "role": "user",
            "content": "How many 'G's in 'huggingface'?"
        }
    ],
    extra_headers={"X-HF-Bill-To": "my-org-name"},
)

print(completion.choices[0].message)
```

</hfoption>

<hfoption id="requests">

To bill your organization when making direct HTTP requests, include the `X-HF-Bill-To` header.

```python
import os
import requests

API_URL = "https://router.huggingface.co/v1/chat/completions"
headers = {"Authorization": f"Bearer {os.environ['HF_TOKEN']}", "X-HF-Bill-To": "my-org-name"}
payload = {
    "messages": [
        {
            "role": "user",
            "content": "How many 'G's in 'huggingface'?"
        }
    ],
    "model": "deepseek-ai/DeepSeek-V3-0324",
}

response = requests.post(API_URL, headers=headers, json=payload)
print(response.json()["choices"][0]["message"])
```

</hfoption>

</hfoptions>

Similarily in JavaScript:

<hfoptions id="javascript-clients">

<hfoption id="huggingface.js">

If you are using the JavaScript `InferenceClient`, you can set the `billTo` attribute at a client level to bill your organization.

```js
import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient(process.env.HF_TOKEN, { billTo: "my-org-name" });

const completion = await client.chat.completions.create({
  model: "deepseek-ai/DeepSeek-V3-0324",
  messages: [
    {
      role: "user",
      content: "How many 'G's in 'huggingface'?",
    },
  ],
});

console.log(completion.choices[0].message.content);
```

</hfoption>

<hfoption id="openai">

To bill your organization with the OpenAI JavaScript client, set the `X-HF-Bill-To` header using the `defaultHeaders` option on the `completions.create` method call.

```javascript
import OpenAI from "openai";

const client = new OpenAI({
	baseURL: "https://router.huggingface.co/v1",
	apiKey: process.env.HF_TOKEN,
});

const completion = await client.chat.completions.create(
	{
		model: "deepseek-ai/DeepSeek-V3-0324",
		messages: [
			{
				role: "user",
				content: "How many 'G's in 'huggingface'?",
			},
		],
	},
	{
		headers: {
			"X-HF-Bill-To": "my-org-name",
		},
	}
);

console.log(completion.choices[0].message.content);
```

</hfoption>

<hfoption id="fetch">

When using `fetch`, include the `X-HF-Bill-To` header to bill your organization.

```js
import fetch from "node-fetch";

const response = await fetch(
  "https://router.huggingface.co/v1/chat/completions",
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.HF_TOKEN}`,
      "Content-Type": "application/json",
      "X-HF-Bill-To": "my-org-name",
    },
    body: JSON.stringify({
      model: "deepseek-ai/DeepSeek-V3-0324",
      messages: [
        {
          role: "user",
          content: "How many 'G's in 'huggingface'?",
        },
      ],
    }),
  }
);
console.log(await response.json());
```
</hfoption>

</hfoptions>
