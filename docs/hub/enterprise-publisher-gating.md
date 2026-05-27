# Publisher Gating

> [!WARNING]
> This feature is part of the <a href="https://huggingface.co/contact/sales?from=enterprise" target="_blank">Enterprise Plus</a> plan.

Publisher Gating lets organization admins automatically reject gated repository access requests based on the requester's country. This is useful for organizations that need to enforce compliance requirements (for example, export controls or sanctions) across all of their [gated models](./models-gated) and [gated datasets](./datasets-gated).

## How it works

When Publisher Gating is enabled with one or more blocked countries:

- **Existing pending requests** from a blocked country are automatically rejected when the country is added to the block list.
- **New requests** originating from a blocked country are automatically rejected at the moment they are submitted.

Rejections triggered by Publisher Gating are recorded as rejected access requests, and the requester is informed that their request was rejected due to the organization's publisher gating policy.

Publisher Gating applies to all gated models and datasets owned by the organization, including repositories belonging to any [Gating Group Collections](./enterprise-gating-group-collections) the organization owns. It complements per-repo controls such as [manual approval](./models-gated#manage-gated-models-as-a-model-author) and [`extra_gated_eu_disallowed`](./models-gated#restricting-access-for-eu-users): both layers can be combined.

## Configure Publisher Gating

To configure Publisher Gating, navigate to your organization's settings and open the **Publisher settings** page, then select the **Gating** tab.

From there, you can:

- Add countries to the list of blocked countries.
- Preview how many of your organization's currently pending access requests would be auto-rejected before you save.
- Remove countries from the block list. Removing a country does not retroactively restore previously rejected requests.

Saving changes takes effect immediately for both pending and future requests.

> [!TIP]
> Country detection is based on the requester's location at the time of the access request. Users are not prompted to declare their country; it is determined automatically from the request.
