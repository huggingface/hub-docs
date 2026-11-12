# Routing and Providers

Every request goes through the Hugging Face router, which handles authentication and billing. For language models, OpenRouter picks a provider serving the model and retries on another one if it fails.

## Default routing

Without a suffix, chat requests use [OpenRouter's default routing](https://openrouter.ai/blog/announcements/how-we-rebuilt-provider-routing/). For each request, it compares the cost of a good answer from each provider serving the model:

- **Effective price**: what the provider actually charges, with its real cache hit rate and the model's usual mix of input and output tokens, not just the list price.
- **Speed**: throughput and time to first token, so a faster provider can win the request even at a higher price.
- **Reliability**: how often the provider fails, returns malformed tool calls, or turns requests away because it's out of capacity.

The measures are updated in real time: when a provider slows down or fails, requests move away from it until it recovers.

## Pick a policy with a suffix

Append a suffix to the model id. It works in every client, including tools that only let you set a model name.

| Model id | Routes to |
| --- | --- |
| `deepseek-ai/DeepSeek-V4.1-Flash` | [Default routing](#default-routing): the best mix of price, speed and reliability |
| `deepseek-ai/DeepSeek-V4.1-Flash:fastest` | Highest throughput, in tokens per second |
| `deepseek-ai/DeepSeek-V4.1-Flash:cheapest` | Lowest price |
| `deepseek-ai/DeepSeek-V4.1-Flash:novita` | Only Novita, or an error if it doesn't serve the model. Each provider's suffix is listed in [Providers](./providers) |

## Turn providers on and off

In your [Inference Providers settings](https://hf.co/settings/inference-providers), you can turn off the providers you don't want. The router never sends your requests to them, and pinning one with a suffix returns an error. Requests [billed to an organization](./pricing#billing-for-team-and-enterprise-organizations) follow the organization's settings instead of yours.

## Failover

If a provider fails, OpenRouter retries the request on another provider serving the model. A pinned provider (`:novita`) is never replaced.
