# Managed SSO

> [!WARNING]
> This feature is part of the <a href="https://huggingface.co/contact/sales?from=enterprise" target="_blank">Enterprise Plus</a> plan.

Managed SSO **replaces the Hugging Face login entirely**. Your Identity Provider becomes the sole authentication method for your organization's members across the entire Hugging Face platform. The organization controls the full user lifecycle — from account creation to deactivation.

For a comparison with Basic SSO, see the [SSO overview](./enterprise-sso).

## How it works

> [!NOTE]
> **Managed SSO replaces the Hugging Face login.** Your IdP is the only way for managed users to authenticate on Hugging Face — there is no separate Hugging Face login. Unlike Basic SSO, members do not need a pre-existing Hugging Face account. When a user authenticates through your IdP for the first time, an account is automatically created for them.

Your IdP is the mandatory authentication route for all your organization's members interacting with any part of the Hugging Face platform. Members are required to authenticate via your IdP for all Hugging Face services, not just when accessing private or organizational repositories.

When a user is deactivated in your IdP, their Hugging Face account is deactivated as well. This gives your organization complete control over identity, access, and data governance.

## Getting started

Managed SSO cannot be self-configured. To enable Managed SSO for your organization, please <a href="https://huggingface.co/contact/sales?from=enterprise" target="_blank">contact the Hugging Face team</a>. The setup is done in collaboration with our technical team to ensure a smooth transition for your organization.

Both SAML 2.0 and OIDC protocols are supported and can be integrated with popular identity providers such as Okta, Microsoft Entra ID (Azure AD), and Google Workspace.

## User provisioning

Managed SSO introduces automated user provisioning through [SCIM](./enterprise-scim), which manages the entire user lifecycle on Hugging Face. SCIM allows your IdP to communicate user identity information to Hugging Face, enabling automatic creation, updates (e.g., name changes, role changes), and deactivation of user accounts as changes occur in your IdP.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/scim-flow-chart.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/scim-flow-chart-dark.png"/>
</div>

Learn more about how to set up and manage SCIM in our [dedicated guide](./enterprise-scim).

## SSO features

Managed SSO supports [role mapping, resource group mapping, session timeout, and external collaborators](./security-sso-features). These features are configurable from your organization's settings.

## Restrictions on managed accounts

> [!WARNING]
> Important considerations for managed accounts.

To ensure organizational control and data governance, managed user accounts have specific restrictions:

*   **No personal content creation**: Managed users cannot create any content (models, datasets, or Spaces) in their personal user namespace. All content must be created within the organization.
*   **Organization-bound collaboration**: Managed users are restricted to collaborating solely within their managing organization. They cannot join other organizations or contribute to repositories outside of their managing organization.
*   **Content visibility**: Content created by managed users resides within the organization. While the managed users cannot create public content in their personal profile, they can **create public content within the organization** if the organization's settings permit it.

These restrictions maintain your enterprise's security boundaries. For personal projects or broader collaboration outside your organization, members should use a separate, unmanaged Hugging Face account.
