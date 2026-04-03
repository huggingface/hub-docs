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

### Linking a SCIM group to a Resource Group

To link a SCIM group, go to your organization's **SSO → SCIM** tab. Provisioned groups are listed in a table. In the **Resource Groups** column, each group shows either a **Link resource groups** button (if no links exist yet) or the number of currently linked resource groups (e.g. "2 resource groups"). Clicking either opens a modal where you can add one or more Resource Groups, each with its own role assignment. You can also change or remove existing links from the same modal.

Before linking, make sure the following conditions are met:

- The Resource Group must have **no existing members**. Linking to a non-empty Resource Group is not allowed.
- The Resource Group must **not have auto-join enabled**. Auto-join (which automatically adds every new org member to the RG) is mutually exclusive with SCIM management. Disable auto-join on the RG before linking.

A SCIM group can be linked to multiple Resource Groups, each with its own role.

### What happens after linking

Once a SCIM group is linked to a Resource Group:

- **Backfill**: Any members already in the SCIM group are immediately added to the Resource Group at the configured role.
- **Ongoing sync**: Membership changes in your IdP are automatically reflected:
  - When a user is **added** to the group in your IdP, they are added to all linked Resource Groups.
  - When a user is **removed** from the group in your IdP, they are removed from all linked Resource Groups, except those the user is linked to through other SCIM groups. For those, the user's role will be updated to the “highest” role granted by the other SCIM groups.
  - When a SCIM group is **deleted** in your IdP, all its members are removed from the linked Resource Groups, except for users who belong to those Resource Groups through other SCIM groups. For each of those Resource Groups, users’ roles are updated to the “highest” role granted by the other SCIM groups.
- **Role changes**: If you update the role on a link, all current group members' roles in that Resource Group are updated immediately.

### SCIM-managed Resource Groups

A Resource Group linked to a SCIM group is considered **SCIM-managed**. The IdP is the sole source of truth for its membership. As a result:

- Manual membership changes via the Hub UI or API are **blocked** — any attempt to add, remove, or change a member's role on a SCIM-managed Resource Group will return a `403` error.
- Auto-join **cannot be enabled** on a SCIM-managed Resource Group. To re-enable auto-join, first remove the SCIM link.

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