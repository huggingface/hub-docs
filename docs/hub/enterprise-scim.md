# User Provisioning (SCIM)

> [!WARNING]
> This feature is part of the <a href="https://huggingface.co/enterprise">Enterprise</a> and <a href="https://huggingface.co/contact/sales?from=enterprise" target="_blank">Enterprise Plus</a> plans.

SCIM (System for Cross-domain Identity Management) is a standard for automating user provisioning. It allows you to connect your Identity Provider (IdP) to Hugging Face to manage your organization's members.

SCIM works differently depending on your SSO model. For a detailed comparison, see the [SSO overview](./enterprise-sso#user-provisioning-scim).

## Basic SSO: invitation-based provisioning

With [Basic SSO](./security-sso-basic) (Enterprise plan), SCIM automates the **invitation** of existing Hugging Face users to your organization.

- Users **must already have a Hugging Face account** before they can be provisioned via SCIM
- When your IdP provisions a user, Hugging Face sends them an **invitation email** to join the organization
- The user must **accept the invitation** to become a member — provisioning does not grant immediate access
- SCIM **cannot modify** user profile information (name, email, username) — the user retains full control of their Hugging Face account
- When a user is deprovisioned in your IdP, their invitation is deactivated and their access to the organization is revoked

## Managed SSO: full lifecycle provisioning

With [Managed SSO](./enterprise-advanced-sso) (Enterprise Plus plan), SCIM manages the **entire user lifecycle** on Hugging Face.

- SCIM **creates a new Hugging Face account** when a user is provisioned — no pre-existing account is needed
- The user is **immediately added** to the organization as a member, with no invitation step
- SCIM **can update** user profile information (name, email, username) as changes occur in your IdP
- When a user is deprovisioned in your IdP, their Hugging Face account is deactivated and their access is revoked

## How to enable SCIM

To enable SCIM, go to your organization's settings, navigate to the **SSO** tab, and then select the **SCIM** sub-tab.

You will find the **SCIM Tenant URL** and a button to generate a **SCIM token**. You will need both of these to configure your IdP. The SCIM token is a secret and should be stored securely in your IdP's configuration.

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/scim-settings.png"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/scim-settings-dark.png"/>
</div>

Once SCIM is enabled in your IdP, provisioned users will appear in the **Users Management** tab and provisioned groups will appear in the **SCIM** tab in your organization's settings.

## Group provisioning

In addition to user provisioning, SCIM supports **group provisioning**. Groups pushed from your IdP are stored as SCIM groups on Hugging Face and can be linked to [Resource Groups](./enterprise-resource-groups) from the **SCIM** tab in your organization's settings.

When a SCIM group is linked to a Resource Group, membership changes are **automatically synchronized**:

- When a user is **added** to a group in your IdP, they are automatically added to the linked Resource Groups with the configured role.
- When a user is **removed** from a group in your IdP, they are automatically removed from the linked Resource Groups.
- When a SCIM group is **deleted** in your IdP, all of its members are removed from the linked Resource Groups.

This allows you to manage Resource Group membership entirely from your Identity Provider, without manual configuration on Hugging Face.

Group provisioning works the same way for both Basic SSO and Managed SSO.

## Supported user attributes

The Hugging Face SCIM endpoint supports the following user attributes:

| Attribute | Description | Basic SSO | Managed SSO |
| --- | --- | --- | --- |
| `userName` | Hugging Face username | Read-only | Read/Write |
| `name.givenName` | First name | Read-only | Read/Write |
| `name.familyName` | Last name | Read-only | Read/Write |
| `emails[type eq "work"].value` | Email address | Read-only | Read/Write |
| `externalId` | IdP-assigned identifier | Read/Write | Read/Write |
| `active` | Whether the user is an active member | Read/Write | Read/Write |

With Basic SSO, only `active` and `externalId` can be modified via SCIM — all other attributes are controlled by the user on their Hugging Face account.

For group provisioning, the supported attributes are `displayName`, `members`, and `externalId`.

## Deprovisioning

Deprovisioning behavior depends on how the user is removed and which SSO model you use.

**Setting `active` to `false`** (soft deprovision):

- The user loses access to the organization
- With Basic SSO: the invitation is deactivated
- With Managed SSO: the user is removed from the organization but their account and content are preserved — this is **reversible** by setting `active` back to `true`

**Deleting the user via SCIM** (hard deprovision):

- With Basic SSO: the user is removed from the organization and all its resource groups. Their Hugging Face account and personal content are **not affected** — they simply lose membership in your organization.
- With Managed SSO: the user's Hugging Face account is **permanently deleted**, along with all content they created. This action is **irreversible**.

## Supported Identity Providers

We support SCIM with any IdP that implements the SCIM 2.0 protocol. We have specific guides for some of the most popular providers:
- [How to configure SCIM with Microsoft Entra ID](./security-sso-entra-id-scim)
- [How to configure SCIM with Okta](./security-sso-okta-scim)