# Nightwatch

We're seeing more attacks that use AI agents to target inference infrastructure and providers of models or datasets. Attackers use public Hub repositories, as well as other collaboration platforms, as a pivot or attack vector.

We built Nightwatch, our **Proactive Agent Security** service, using what we learned from the July 2026 OpenAI/HF incident. Its security agent scans Hub activity logs in real time for signs of these attacks.

![Hub access logs, metrics, and external OSINT feed into the Nightwatch agent, which flags unusual activity for review.](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/enterprise/nightwatch/live-scan-sources-53c80514.png)

Nightwatch is a paid add-on available only to Enterprise customers. The price reflects the large volumes of tokens (both open and closed models) used for continuous scanning. [Contact our team](https://huggingface.co/contact/sales?from=enterprise) to explore Nightwatch for your organization.

## Implementation

![Illustrative Hub logs showing one account reading three repositories in the same second.](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/enterprise/nightwatch/log-excerpt.png)

When Nightwatch detects unusual activity, a Slack agent sends your team an alert. You can also route these alerts to your organization's security incident ingestion system.

### Example Slack alert

> Hello 👋 We detected unusual activity on the Hugging Face account of one of your organization members.
>
> Since October 29, 2026, we've seen requests from two suspicious IP addresses using their `xyz` access token. The token has the write role and was created on October 12, 2025.
>
> On October 29 and November 9, 2026, the token was used to read 60 of your organization's private repositories. Of those, 22 were cloned.
>
> The token has been revoked. We can share the full list of affected repositories and the timeline.
