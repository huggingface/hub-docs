# Hub Rate limits

To protect our platform's integrity and make sure we are able to scale our service to as many AI community members as possible, we enforce rate limits on all requests made to the HF Hub.

We define different rate limits for distinct classes of requests. We distinguish three main buckets:

- **Hub APIs**
  - e.g. model or dataset search, repo creation, user management, etc. Note: all those endpoints are documented in [Hub API Endpoints](./api).
- **Resolvers**
  - They're all the URLs that contain a `/resolve/` segment in their path, which serve user-generated content from the Hub. Concretely, those are the URLs that are constructed by open source libraries (transformers, datasets, vLLM, llama.cpp, …) or AI applications (LM Studio, Jan, ollama, …) to download model/dataset files from HF.
  - Because they are very heavily used by the community, and because we optimize our infrastructure to serve them with high efficiency, rate limits for Resolvers are the highest ones.
- **Pages**
  - All the Web pages we host on huggingface.co. Usually Web browsing is browsing made by humans hence rate limits don't need to be as high as programmatic endpoints like the two former buckets.

> [!TIP]
> All values are defined over 5-minute windows, which allows for some level of "burstiness" from an application or developer's point of view.

If you, your organization, or your application need higher rate limits, we encourage you to upgrade your account to PRO, Team, or Enterprise. We prioritize support requests from PRO, Team, and Enterprise customers – see built-in limits in [Rate limit Tiers](#rate-limit-tiers).

## Billing dashboard

At any point in time, you can check your rate limit status on your (or your org)'s Billing page: https://huggingface.co/settings/billing

![dashboard for rate limits](https://cdn-uploads.huggingface.co/production/uploads/5dd96eb166059660ed1ee413/0pzQQyuVG3c9tWjCqrX9Y.png)

On the right side, you will see three gauges, one for each bucket of Rate limiting.

Each bucket presents the number of current (last 5 minutes) requests, and the number of allowed requests based on your user account or organization plan.

Note: You can use the context switcher to easily switch between your user account and your orgs.

## HTTP Headers

Whenever you or your organization hits a rate limit, you will receive a **429** `Too Many Requests` HTTP error.

We implement the mechanism described in the IETF draft titled “RateLimit HTTP header fields for HTTP” (also known as `draft-ietf-httpapi-ratelimit-headers`).

The goal is to define standardized HTTP headers that servers can use to advertise quota / rate-limit policies and communicate current usage / limits to clients so that they can avoid being throttled.

Precisely, we implement the following headers:

| Header                  | Purpose / Meaning                                                                                                                              |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| **RateLimit-Policy**    | Carries the rate limit policy itself (e.g. “100 requests per 5 minutes”). It’s informative; shows what policy the client is subject to.        |
| **RateLimit-Limit**     | The total allowed rate limit for the current window. “How many requests (of this type) you’re allowed.”                                        |
| **RateLimit-Remaining** | How many requests of this type you have left in the current window.                                                                            |
| **RateLimit-Reset**     | Number of seconds until the rate limit window resets (or until quota is refreshed). Uses a “delta-seconds” format to reduce clock sync issues. |

## Rate limit Tiers

Here are the current rate limiting values (in September '25) based on your plan:

| Plan                            | API    | Resolvers | Pages |
| ------------------------------- | ------ | --------- | ----- |
| Anonymous user (per IP address) | 500 \*   | 3,000 \*    | 100 \*  |
| Free user                       | 1,000 \* | 5,000 \*    | 200 \*  |
| PRO user                        | 2,500  | 12,000    | 400   |
| Team organization               | 3,000  | 15,000    | 400   |
| Enterprise organization         | 6,000  | 30,000    | 600   |
| Enterprise Plus organization    | 10,000 | 50,000    | 1,000 |
| Academia Hub organization       | 2,500  | 12,000    | 400   |

\* Subject to change over time depending on platform health 🤞

## What if I get rate-limited

First, make sure you are always passing a `HF_TOKEN`, and it gets passed downstream to all libraries or applications you might be using that downloads _stuff_ from the Hub. 

This is the number one reason users get rate limited and is a very easy fix.

If you're sure you're passing a `HF_TOKEN`, you can:
- spread out your requests over longer periods of time
- replace Hub API calls with Resolver calls, whenever possible (Resolver rate limits are much higher and much more optimized).
- upgrade to PRO, Team, or Enterprise.

## Granular user action Rate limits

In addition to those main classes of rate limits, we enforce limits on certain specific kinds of user actions, like:

- repo creation
- repo commits
- discussions and comments
- moderation actions
- etc.

We don't currently document the rate limits for those specific actions, given they tend to change over time more often. If you get quota errors, we encourage you to upgrade your account to PRO, Team, or Enterprise. 
Feel free to get in touch with us via the support team.
