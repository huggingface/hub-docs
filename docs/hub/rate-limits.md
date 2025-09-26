# Hub Rate limits

To protect our platform's integrity and ensure availability to as many AI community members as possible, we enforce rate limits on all requests made to the Hugging Face Hub.

We define different rate limits for distinct classes of requests. We distinguish three main buckets:

- **Hub APIs**
  - e.g. model or dataset search, repo creation, user management, etc. All endpoints that belong to this bucket are documented in [Hub API Endpoints](./api).
- **Resolvers**
  - They're all the URLs that contain a `/resolve/` segment in their path, which serve user-generated content from the Hub. Concretely, those are the URLs that are constructed by open source libraries (transformers, datasets, vLLM, llama.cpp, …) or AI applications (LM Studio, Jan, ollama, …) to download model/dataset files from HF.
  - Specifically, this is the ["Resolve a file" endpoint](https://lnkd.in/eesDKirG) documented in our OpenAPI spec.
  - Resolve requests are heavily used by the community, and since we optimize our infrastructure to serve them with maximum efficiency, the rate limits for Resolvers are the highest.
- **Pages**
  - All the Web pages we host on huggingface.co.
  - Usually Web browsing requests are made by humans, hence rate limits don't need to be as high as the above mentioned programmatic endpoints.

> [!TIP]
> All values are defined over 5-minute windows, which allows for some level of "burstiness" from an application or developer's point of view.

If you, your organization, or your application need higher rate limits, we encourage you to upgrade your account to PRO, Team, or Enterprise. We prioritize support requests from PRO, Team, and Enterprise customers – see built-in limits in [Rate limit Tiers](#rate-limit-tiers).

## Billing dashboard

At any point, you can check your rate limit status on your (or your org’s) Billing page: https://huggingface.co/settings/billing

![dashboard for rate limits](https://cdn-uploads.huggingface.co/production/uploads/5dd96eb166059660ed1ee413/0pzQQyuVG3c9tWjCqrX9Y.png)

On the right side, you will see three gauges, one for each bucket of Requests.

Each bucket presents the number of current (last 5 minutes) requests, and the number of allowed requests based on your user account or organization plan.

Whenever you exceed the limit in the past 5 minutes (the view is updated in real-time), the bar will turn red.

Note: You can use the context switcher to easily switch between your user account and your orgs.

## HTTP Headers

Whenever you or your organization hits a rate limit, you will receive a **429** `Too Many Requests` HTTP error.

We implement the mechanism described in the [IETF draft (Version 9)](https://datatracker.ietf.org/doc/draft-ietf-httpapi-ratelimit-headers/) titled “RateLimit HTTP header fields for HTTP” (also known as `draft-ietf-httpapi-ratelimit-headers`).

The goal is to define standardized HTTP headers that servers can use to advertise quota / rate-limit policies and communicate current usage / limits to clients so that they can avoid being throttled.

Precisely, we implement the following headers:

| Header                 | Purpose / Meaning                                                                                                                       |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **`RateLimit`**        | The total allowed rate limit for the current window. “How many requests (of this type) you’re allowed to perform.”                      |
| **`RateLimit-Policy`** | Carries the rate limit policy itself (e.g. “100 requests per 5 minutes”). It’s informative; shows what policy the client is subject to. |

A set of examples is as follows:

| Header                 | Example                                                                                               |
| ---------------------- | ----------------------------------------------------------------------------------------------------- |
| **`RateLimit`**        | `"api\|pages\|resolvers";r=[remaining];t=[seconds remaining until reset]`                             |
| **`RateLimit-Policy`** | `"fixed window";"api\|\pages\|resolvers";q=[total allowed for window];w=[window duration in seconds]` |

## Rate limit Tiers

Here are the current rate limits (in September '25) based on your plan:

| Plan                                                                      | API      | Resolvers | Pages  |
| ------------------------------------------------------------------------- | -------- | --------- | ------ |
| Anonymous user (per IP address)                                           | 500 \*   | 3,000 \*  | 100 \* |
| Free user                                                                 | 1,000 \* | 5,000 \*  | 200 \* |
| PRO user                                                                  | 2,500    | 12,000    | 400    |
| Team organization                                                         | 3,000    | 20,000    | 400    |
| Enterprise organization                                                   | 6,000    | 50,000    | 600    |
| Enterprise Plus organization                                              | 10,000   | 100,000   | 1,000  |
| Enterprise Plus organization <br> When Organization IP Ranges are defined | 100,000  | 500,000   | 10,000 |
| Academia Hub organization                                                 | 2,500    | 12,000    | 400    |

\* Anonymous and Free users are subject to change over time depending on platform health 🤞

> [!NOTE]
> All quotas are calculated over 5-minute fixed windows.

Note: For organizations, rate limits are applied individually to each member, not shared among members.

## What if I get rate-limited

First, make sure you always pass a `HF_TOKEN`, and it is passed downstream to all libraries or applications that download _stuff_ from the Hub.

This is the number one reason users get rate limited and is a very easy fix.

Despite passing `HF_TOKEN` if you are still rate limited, you can:

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
