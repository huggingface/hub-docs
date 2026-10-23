# Migrating to Managed SSO

> [!WARNING]
> This feature is part of the <a href="https://huggingface.co/contact/sales?from=enterprise" target="_blank">Enterprise Plus</a> plan.

This guide is for organization admins who are converting an existing organization from a standard organization to a [Managed SSO](./enterprise-advanced-sso) organization.

The most important thing to understand before you start: **members' existing personal Hugging Face accounts are not converted into managed accounts**. Each member gets a brand-new managed account, provisioned by your Identity Provider (IdP). Before a member can be provisioned, they must free up their work email address on their personal account.

Throughout this guide, we use `my-org` as an example organization name.

## Migration steps

1. **Prepare your members.** Go through the [pre-migration checklist](#before-you-migrate) with your members.
2. **Contact Hugging Face.** <a href="https://huggingface.co/contact/sales?from=enterprise" target="_blank">Get in touch with the Hugging Face team</a> and confirm the switch. We convert the organization and send you the credentials for the `my-org:owner` break-glass account.
3. **Set up SCIM in your IdP.** Use the SCIM Tenant URL and token from your organization's **SSO → SCIM** settings. You can reuse your existing OIDC or SAML application. See [User Provisioning (SCIM)](./enterprise-scim) and the configuration guides for [Okta](./security-sso-okta-scim) and [Microsoft Entra ID](./security-sso-entra-id-scim).
4. **Have members free up their work emails.** See [Freeing up work email addresses](#freeing-up-work-email-addresses).
5. **Assign users and groups in your IdP.** Managed accounts are created as users are provisioned.
6. **Remove leftover personal accounts** from the organization. This also removes them from the organization's Resource Groups.
7. **(Optional) Map groups to Resource Groups and roles.** [Link your SCIM groups to Resource Groups](./enterprise-scim#linking-a-scim-group-to-a-resource-group), and set up [Role Mapping](./security-sso-user-management#role-mapping) to assign organization roles from your IdP. A SCIM group can only be linked to an empty Resource Group, which is why personal accounts are removed first.

## What changes

### What the conversion does

- **The conversion is done by the Hugging Face team.** There is no self-serve switch. Once you request it, the Hugging Face team switches your organization to managed mode.
- **Your organization's content and configuration stay as they are.** Repositories, settings, [Resource Groups](./enterprise-resource-groups) and your existing SSO configuration (OIDC or SAML app) are kept. You don't need to recreate your IdP application.
- **A break-glass admin account is created**, named `my-org:owner`. It logs in with a username and password (not through SSO) and is an admin of the organization. The Hugging Face team shares its credentials with you. Store them securely: this account lets you access your organization if your IdP is unavailable or misconfigured.
- **SSO enforcement can no longer be turned off.**

### Managed accounts are new accounts

- Existing personal Hugging Face accounts are **not** converted, merged or linked into managed accounts. Each member gets a new account, created by your IdP through [SCIM](./enterprise-scim) when the user is assigned in the IdP.
- Managed usernames are prefixed with the organization name: `<org-name>:<username>`, for example `my-org:jdoe`.
- Managed users only log in through your IdP. They have no Hugging Face password, and "Forgot password" does not work for them.
- Managed accounts are subject to the [restrictions on managed accounts](./enterprise-advanced-sso#restrictions-on-managed-accounts).

### Membership

- Regular members can no longer be added by invitation. Internal members must be provisioned through SCIM.
- Invitations remain available for [external collaborators](./security-sso-user-management#external-collaborators) only.

### Existing personal accounts in the organization

Personal accounts that are still members of the organization after the conversion lose access to it:

- They can't log in to the organization through SSO. They see the following error:
  `You cannot login with SSO with this account because it's not managed by this organization.`
- Access tokens created from personal accounts also lose access to the organization's resources.

Once their managed replacements are provisioned, remove these personal accounts from the organization.

## Before you migrate

Go through this checklist with your members before requesting the conversion:

- **Personal repositories**: members who want to keep repositories from their personal namespace should [transfer them](./repositories-settings#renaming-or-transferring-a-repo) to the organization before the switch. Managed accounts can't own content in a personal namespace.
- **Tokens and automation**: scripts, CI jobs and pipelines that use tokens from personal accounts will lose access to the organization. Move them to [service accounts](./enterprise-service-accounts), or to new tokens created from the managed accounts after the switch.
- **Other organizations**: managed accounts can't join other organizations. Members who need to keep working in other organizations should keep a separate personal account (see [option 2](#option-2-keep-the-personal-account) below).
- **Work email addresses**: every member must free up their work email before they are provisioned. See [Freeing up work email addresses](#freeing-up-work-email-addresses).

## Freeing up work email addresses

An email address can only belong to one Hugging Face account. This applies to **all** of an account's email addresses, primary and secondary, and matching is case-insensitive.

When SCIM tries to create a managed account with a work email that is already used by a personal account, provisioning fails with a `409` error:

```
The email address (jdoe@example.com) is already associated with another Hugging Face account. Please delete the account.
```

Your IdP shows this as a provisioning error for that user.

To avoid this, each member must free up their work email address **before** they are provisioned, using one of the two options below.

> [!TIP]
> **Which option should I choose?**
> - If you only use your Hugging Face account for work in this organization, choose **option 1**: delete the personal account.
> - If you also use it for open-source work, personal projects or other organizations, choose **option 2**: keep the personal account and remove the work email from it.

### Option 1: Delete the personal account

Delete your personal account from your [account settings](https://huggingface.co/settings/account).

> [!WARNING]
> Deleting an account is permanent. Transfer any repositories you want to keep to the organization first.

### Option 2: Keep the personal account

1. In your [account settings](https://huggingface.co/settings/account), add a personal email address and verify it.
2. Make the personal email address your primary email.
3. **Remove the work email address completely.** Making it a secondary email is not enough.
4. Leave the organization with your personal account.

Once the work email is free, the admin can retry provisioning for that user in the IdP, or wait for the next sync to pick it up.

## After the migration

User lifecycle is managed from your IdP:

- **Deactivating** a user in your IdP removes them from the organization. If the same user is reactivated later, their existing managed account is reused.
- **Deleting** a user via SCIM permanently deletes their managed account. See [Deprovisioning](./enterprise-scim#deprovisioning).
