# Team & Enterprise plans

<!-- STRETCH TABLES -->

> [!TIP]
>
> <a href="https://huggingface.co/enterprise" target="_blank">Subscribe to a Team or Enterprise plan</a> to get access to advanced features for your organization.

Team & Enterprise organization plans add advanced capabilities to organizations, enabling safe, compliant and managed collaboration for companies and teams on Hugging Face.

<a href="https://huggingface.co/enterprise" class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/enterprise/enterprise-header.png" />
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/enterprise/dark-enterprise-header.png" />
</a>

## Compare our plans at a quick glance

### Core usage, storage, rate limits

| Feature                                               | Free        | Team                 | Enterprise            | Enterprise Plus        |
| ----------------------------------------------------- | ----------- | -------------------- | --------------------- | ---------------------- |
| Storage – Public repos                                | Best effort | 12TB base + 1TB/seat | 200TB base + 1TB/seat | 500TB base + 1TB/seat  |
| Storage – Private repos                               | 100GB       | 1TB/seat + PAYG      | 1TB/seat + PAYG       | 1TB/seat + PAYG        |
| [Extra storage](./storage-limits#pay-as-you-go-price) | ❌          | ✅ PAYG              | ✅ PAYG               | ✅ PAYG                |
| API requests / period\*                               | 1,000       | 3,000                | 6,000                 | 10,000 up to 100,000†  |
| Resolver requests / period\*                          | 5,000       | 20,000               | 50,000                | 100,000 up to 500,000† |
| Pages requests / period\*                             | 200         | 400                  | 600                   | 1,000 up to 10,000†    |

\* All quotas are calculated over 5-minute fixed windows

† When Organization IP Ranges are defined

### Inference & Hub credits

| Feature                                                                                                                | Free    | Team                              | Enterprise                        | Enterprise Plus                   |
| ---------------------------------------------------------------------------------------------------------------------- | ------- | --------------------------------- | --------------------------------- | --------------------------------- |
| Serve models with Inference Providers                                                                                  | ✅ <br>PAYG | ✅ <br>$2/seat/mo included + PAYG | ✅ <br>$2/seat/mo included + PAYG | ✅ <br>$2/seat/mo included + PAYG |
| [Usage & billing control](https://huggingface.co/docs/inference-providers/pricing#inference-providers-usage-breakdown) | ❌      | ✅                                | ✅                                | ✅                                |
| Scale deployment with Inference Endpoints                                                                              | ✅ PAYG | ✅ PAYG                           | ✅ PAYG                           | ✅ PAYG                           |
| Hub credits\* included in plan                                                                                         | ❌      | ❌ (bulk purchase available)      | $2k included                      | 5% of ACV included                |

\* Hub credits can be utilized for inference providers, inference endpoints, Jobs, Space upgrade

### Spaces & Jobs

| Feature                                | Free      | Team        | Enterprise  | Enterprise Plus |
| -------------------------------------- | --------- | ----------- | ----------- | --------------- |
| Spaces – CPU-based runtime             | 8 units\* | ✅ No limit | ✅ No limit | ✅ No limit     |
| Spaces – ZeroGPU usage tiers           | 3.5 min†  | 25 min      | 45 min      | 45 min          |
| Spaces – Upgraded hardware             | PAYG      | PAYG        | PAYG        | PAYG            |
| Dev Mode / Custom domain for Spaces    | ❌        | ✅          | ✅          | ✅              |
| Jobs & Scripts (train/fine-tune, eval) | ❌        | ✅          | ✅          | ✅              |

\* running at the same time

† daily quota

### Repo rules, access control, visibility

| Feature                                |                 Free                 |      Team       |   Enterprise    |      Enterprise Plus       |
| -------------------------------------- | :----------------------------------: | :-------------: | :-------------: | :------------------------: |
| Access control granularity             | [Standard](./organizations-security) | ✅ Fine-grained | ✅ Fine-grained | ✅ Fine-grained + policies |
| Org controls                           |                  ❌                  |       ✅        |       ✅        |             ✅             |
| Hub controls                           |                  ❌                  |       ❌        |       ❌        |             ✅             |
| Default private repos                  |                  ❌                  |       ✅        |       ✅        |             ✅             |
| Disable public repositories (org-wide) |                  ❌                  |       ✅        |       ✅        |             ✅             |
| [Data residency](./storage-regions)    |                  ❌                  |       ✅        |       ✅        |             ✅             |
| Data Studio (private datasets)         |                  ❌                  |       ✅        |       ✅        |             ✅             |
| Gating Group Collections               |                  ❌                  |       ✅        |       ✅        |             ✅             |

### Identity, authentication, org security

| Feature                                            | Free |     Team     |  Enterprise  | Enterprise Plus |
| -------------------------------------------------- | :--: | :----------: | :----------: | :-------------: |
| [SSO to private org](./enterprise-sso)             |  ❌  | ✅ Basic SSO | ✅ Basic SSO | ✅ Advanced SSO |
| [SSO to public Hub](./enterprise-advanced-sso) |  ❌  |      ❌      |      ❌      |       ✅        |
| [Enforce 2FA](./enterprise-advanced-security)  |  ❌  |      ✅      |      ✅      |       ✅        |
| [OAuth Token Exchange](./oauth#token-exchange-for-organizations-rfc-8693) |  ❌  |      ❌      |      ✅      |       ✅        |
| Disable personal public repos for users            |  ❌  |      ❌      |      ❌      |       ✅        |
| Disable joining other orgs for users               |  ❌  |      ❌      |      ❌      |       ✅        |
| Disable PRO subscription                           |  ❌  |      ❌      |      ❌      |       ✅        |
| Hide members list                                  |  ❌  |      ❌      |      ❌      |       ✅        |

### Governance, auditing, compliance

| Feature                                                                 | Free |    Team     | Enterprise  | Enterprise Plus |
| ----------------------------------------------------------------------- | :--: | :---------: | :---------: | :-------------: |
| RBAC                                                                    |  ✅  | ✅ Advanced | ✅ Advanced |   ✅ Advanced   |
| [Audit logs](./audit-logs)                                              |  ❌  |     ✅      |     ✅      |       ✅        |
| [Resource groups](./enterprise-advanced-security)                   |  ❌  |     ✅      |     ✅      |       ✅        |
| [Tokens admin / management](./enterprise-tokens-management)         |  ❌  |     ✅      |     ✅      |       ✅        |
| [Users Download analytics](./enterprise-network-security)           |  ❌  |     ❌      |     ❌      |       ✅        |
| [Content access / policy controls](./enterprise-network-security)   |  ❌  |     ❌      |     ❌      |       ✅        |
| [Network access controls](./enterprise-network-security)            |  ❌  |     ❌      |     ❌      |       ✅        |
| [Enforced authentication (advanced)](./enterprise-network-security) |  ❌  |     ❌      |     ❌      |       ✅        |

### User provisioning & admin

| Feature                |   Free    |     Team      |  Enterprise   | Enterprise Plus |
| ---------------------- | :-------: | :-----------: | :-----------: | :-------------: |
| Onboarding/Offboarding | ✅ manual | ✅ controlled | ✅ controlled |  ✅ automated   |
| SCIM provisioning      |    ❌     |      ❌       |      ❌       |   ✅ Included   |
| Managed users          |    ❌     |      ❌       |      ❌       |       ✅        |

### Support, billing, procurement

| Feature                                     |     Free     |          Team          |       Enterprise       |    Enterprise Plus     |
| ------------------------------------------- | :----------: | :--------------------: | :--------------------: | :--------------------: |
| Support                                     | Forum access |      Best effort       | Email support with SLA | Advanced Slack support |
| Billing                                     |              | Credit card self-serve |    Pay with Invoice    |    Pay with Invoice    |
| Contract (including Purchase Order)         |      ❌      |           ❌           |     ✅ HF template     |   ✅ customer paper    |
| Legal Review                                |      ❌      |           ❌           |           ❌           |           ✅           |
| Vendor onboarding & Security questionnaires |      ❌      |           ❌           |           ❌           |           ✅           |

### Community

| Feature                                                                                                   | Free | Team | Enterprise | Enterprise Plus |
| --------------------------------------------------------------------------------------------------------- | :--: | :--: | :--------: | :-------------: |
| Org Article                                                                                               |  ❌  |  ✅  |     ✅     |       ✅        |
| [Publisher Analytics Dashboard](./enterprise-analytics)                                               |  ❌  |  ✅  |     ✅     |       ✅        |
| [Set your primary org on your profile](https://huggingface.co/changelog/primary-organization-on-profiles) |  ❌  |  ✅  |     ✅     |       ✅        |

### Pricing

| Feature            | Free |    Team     |    Enterprise    | Enterprise Plus |
| ------------------ | :--: | :---------: | :--------------: | :-------------: |
| Pricing            |  -   | 20$/user/Mo | from 50$/user/Mo |     custom      |
| Pilot availability |  ❌  |     ❌      |        ❌        |       ✅        |

## Dive more

In the following sections we will document the following Team & Enterprise features:

- [Single Sign-On (SSO)](./enterprise-sso)
- [Advanced Single Sign-On (SSO)](./enterprise-advanced-sso)
- [User Provisioning (SCIM)](./enterprise-scim)
- [Audit Logs](./audit-logs)
- [Storage Regions](./storage-regions)
- [Data Studio for Private datasets](./enterprise-datasets)
- [Resource Groups](./security-resource-groups)
- [Advanced Compute Options](./advanced-compute-options)
- [Advanced Security](./enterprise-advanced-security)
- [Tokens Management](./enterprise-tokens-management)
- [OAuth Token Exchange](./oauth#token-exchange-for-organizations-rfc-8693)
- [Publisher Analytics](./enterprise-analytics)
- [Gating Group Collections](./enterprise-gating-group-collections)
- [Network Security](./enterprise-network-security)
- [Higher Rate limits](./rate-limits)
- [Blog Articles](./enterprise-blog-articles)

Finally, Team & Enterprise plans include vastly more [included public storage](./storage-limits), as well as 1TB of [private storage](./storage-limits) per seat in the subscription, i.e. if your organization has 40 members, then you have 40TB included storage for your private models and datasets.
