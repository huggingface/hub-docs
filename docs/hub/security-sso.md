# Single Sign-On (SSO)

> [!WARNING]
> This feature is part of the <a href="https://huggingface.co/enterprise">Team & Enterprise</a> plans.

Hugging Face supports Single Sign-On (SSO) to let organizations manage user authentication through their own Identity Provider (IdP). Both SAML 2.0 and OpenID Connect (OIDC) protocols are supported.

There are two SSO models available, depending on your plan and needs. For a detailed comparison, see the [SSO overview](./enterprise-sso).

- **[Basic SSO](./security-sso-basic)** — Available on Team & Enterprise plans. Adds an access-control layer on top of the standard Hugging Face login to secure your organization's resources.
- **[Managed SSO](./enterprise-advanced-sso)** — Available on the Enterprise Plus plan. Replaces the Hugging Face login entirely, giving your organization full control over user accounts and access. Requires setup with the Hugging Face team — <a href="https://huggingface.co/contact/sales?from=enterprise" target="_blank">contact us</a> to get started.

## Further reading

- [User Management](./security-sso-user-management) — Role mapping, resource group mapping, session timeout, and more
- [Configuration Guides](./security-sso-configuration-guides) — Step-by-step setup instructions for Okta, Microsoft Entra ID, and Google Workspace
- [User Provisioning (SCIM)](./enterprise-scim) — Automated user provisioning from your Identity Provider
