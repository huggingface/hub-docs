# Single Sign-On (SSO)

> [!WARNING]
> This feature is part of the <a href="https://huggingface.co/enterprise">Team & Enterprise</a> plans.

Hugging Face offers two distinct SSO models, each designed for different organizational needs. Understanding the differences between these two approaches is key to choosing the right setup for your team.

## At a glance

|  | **Basic SSO** | **Managed SSO** |
| --- | --- | --- |
| **Plan** | <a href="https://huggingface.co/enterprise">Team & Enterprise</a> | <a href="https://huggingface.co/contact/sales?from=enterprise" target="_blank">Enterprise Plus</a> |
| **Scope** | Organization resources only | Entire Hugging Face platform |
| **Replaces the Hugging Face login** | No — users keep their existing Hugging Face credentials | Yes — your IdP becomes the only login method |
| **User accounts** | Users keep their personal Hugging Face account | Accounts are owned and managed by the organization |
| **Personal content** | Users can create content in their personal namespace | Users can only create content within the organization |
| **Multi-org membership** | Users can belong to multiple organizations | Users are restricted to their managing organization |
| **User provisioning** | Manual (SSO join link) — or invitation-based [SCIM](./enterprise-scim) on Enterprise | Full lifecycle ([SCIM](./enterprise-scim)) |
| **Setup** | Self-service from organization settings | Requires setup with the Hugging Face team |
| **External collaborators** | Yes | Yes |
| **Protocols** | SAML 2.0 and OIDC | SAML 2.0 and OIDC |
| **Role mapping** | Yes | Yes |
| **Resource group mapping** | Yes | Yes |

## Basic SSO

Basic SSO adds an access-control layer on top of the standard Hugging Face login. It does **not** replace the Hugging Face login — members keep their existing credentials and are prompted to complete SSO only when accessing your organization's resources.

This is well suited for teams that want to **secure access to their organizational resources while preserving the flexibility of individual Hugging Face accounts**. Setup is self-service from your organization's settings.

[Getting started with Basic SSO →](./security-sso-basic)

## Managed SSO

Managed SSO **replaces the Hugging Face login entirely**. Your Identity Provider becomes the sole authentication method across the entire Hugging Face platform. The organization controls the full user lifecycle — from account creation to deactivation.

This is designed for enterprises that require **complete control over identity, access, and data governance**. Managed accounts have [specific restrictions](./enterprise-advanced-sso#restrictions-on-managed-accounts) (no personal content, organization-bound collaboration). Setup requires coordination with the Hugging Face team.

[Getting started with Managed SSO →](./enterprise-advanced-sso)

## User Provisioning (SCIM)

Both SSO models support [SCIM](./enterprise-scim) (System for Cross-domain Identity Management) to automate user provisioning from your Identity Provider. The two models use SCIM differently, consistent with their respective philosophies:

- **Basic SSO** (Enterprise plan): SCIM automates the **invitation** of existing Hugging Face users to your organization. Users must accept the invitation to join.
- **Managed SSO** (Enterprise Plus plan): SCIM manages the **entire user lifecycle** — account creation, profile updates, and deactivation.

Learn more in the [User Provisioning (SCIM) guide](./enterprise-scim).

## Which model should you choose?

**Choose Basic SSO** if your team needs to secure access to organizational resources while allowing members to maintain their own Hugging Face accounts and participate in the broader community.

**Choose Managed SSO** if your enterprise requires centralized control over all user accounts, automated provisioning and deprovisioning, and strict data governance policies that prevent any content from being created outside the organization.

Both models support SAML 2.0 and OIDC protocols and can be integrated with popular identity providers such as Okta, Microsoft Entra ID (Azure AD), and Google Workspace.

## Further reading

- [SSO Features](./security-sso-features) — Role mapping, resource group mapping, session timeout, and more
- [Configuration Guides](./security-sso-configuration-guides) — Step-by-step setup instructions for Okta, Microsoft Entra ID, and Google Workspace
