# Migrating to Managed SSO

> [!WARNING]
> This feature is part of the <a href="https://huggingface.co/contact/sales?from=enterprise" target="_blank">Enterprise Plus</a> plan.

This guide is for organization admins who are converting an existing organization from a standard organization to a [Managed SSO](./enterprise-advanced-sso) organization.

The most important thing to understand before you start: **members' existing personal Hugging Face accounts are not converted into managed accounts**. Each member gets a brand-new managed account, provisioned by your Identity Provider (IdP). Before a member can be provisioned, they must free up their work email address on their personal account.

Throughout this guide, we use `my-org` as an example organization name.

## Prerequisites

[SSO](./security-sso-basic) must already be configured, tested and enabled on your organization. The migration reuses your existing OIDC or SAML application.

## Migration steps

1. **Prepare your members.** Go through the [pre-migration checklist](#before-you-migrate) with your members.
2. **Contact Hugging Face.** Get in touch with the Hugging Face team and confirm the switch. We convert the organization and send you the credentials for the `my-org:owner` break-glass account.
3. **Have members free up their work emails.** See [Freeing up work email addresses](#freeing-up-work-email-addresses). Do this before enabling provisioning: users already assigned to your SSO application are provisioned as soon as SCIM is turned on. The Hugging Face team can send you the list of members whose personal accounts still hold a work email address, so you can follow up with them.
4. **Set up SCIM in your IdP.** Use the SCIM Tenant URL and token from your organization's **SSO → SCIM** settings, in your existing OIDC or SAML application, then follow the guide for your IdP.
   - **Okta**: follow the [Okta guide](./security-sso-okta-scim), including [Step 3](./security-sso-okta-scim#step-3-check-your-saml-settings). The Name ID must be the Okta user ID.
   - **Microsoft Entra ID**: follow the [Entra ID guide](./security-sso-entra-id-scim). The `userName` must follow the [username rules](./security-sso-entra-id-scim#step-4-configure-attribute-mappings), so email-style values such as `jdoe@example.com` are rejected.
   - **Other IdPs**: see [User Provisioning (SCIM)](./enterprise-scim), with the same username rules.
5. **Assign users and groups in your IdP.** Managed accounts are created as users are provisioned.
6. **Remove leftover personal accounts from the organization.** This step is required for security: personal accounts keep their role and their access tokens keep working until they are removed. Removing them also removes them from the organization's Resource Groups.
7. **(Optional) Map groups to Resource Groups and roles.** [Link your SCIM groups to Resource Groups](./enterprise-scim#linking-a-scim-group-to-a-resource-group), and set up [Role Mapping](./security-sso-user-management#role-mapping) to assign organization roles from your IdP. A Resource Group can only be linked to a SCIM group if it has no members and auto-join is turned off. If auto-join is on, newly provisioned managed accounts are added to the group too, so turn it off before provisioning users, or remove any remaining members before linking.

## What changes

### What the conversion does

- **The conversion is done by the Hugging Face team.** There is no self-serve switch. Once you request it, the Hugging Face team switches your organization to managed mode.
- **Your organization's content and configuration stay as they are.** Repositories, settings, [Resource Groups](./enterprise-resource-groups) and your existing SSO configuration (OIDC or SAML app) are kept. You keep the same IdP application, though some settings may need adjusting for SCIM (see [step 4](#migration-steps)).
- **A break-glass admin account is created**, named `my-org:owner`. It logs in with a username and password (not through SSO) and is an admin of the organization. The Hugging Face team shares its credentials with you. Store them securely: this account lets you access your organization if your IdP is unavailable or misconfigured.
- **SSO can no longer be made optional.** It can still be disabled entirely.

> [!WARNING]
> Disabling SSO on a managed organization locks out every managed user, because managed accounts have no password.

### Managed accounts are new accounts

- Existing personal Hugging Face accounts are **not** converted, merged or linked into managed accounts. Each member gets a new account, created by your IdP through [SCIM](./enterprise-scim) when the user is assigned in the IdP.
- Managed usernames are prefixed with the organization name: `<org-name>:<username>`, for example `my-org:jdoe`.
- Managed users only log in through your IdP. They have no Hugging Face password, and "Forgot password" does not work for them.
- Managed accounts are subject to the [restrictions on managed accounts](./enterprise-advanced-sso#restrictions-on-managed-accounts).

### Membership

- Regular members can no longer be added by invitation. Internal members must be provisioned through SCIM.
- Invitations remain available for [external collaborators](./security-sso-user-management#external-collaborators) only.

### Existing personal accounts in the organization

Personal accounts that are still members of the organization after the conversion keep their role, and their access tokens keep working. They can't log in to the organization through SSO anymore:

- If the user is signed in with their personal account, or that account was already linked to your IdP, they see:
  `You cannot login with SSO with this account because it's not managed by this organization. Contact your organization administrators.`
- Otherwise, they see `User not found`.

Once their managed replacements are provisioned, [remove these personal accounts](#migration-steps) from the organization.

## Before you migrate

Go through this checklist with your members before requesting the conversion:

- **Personal repositories**: members who have repositories in their personal namespace that they want to keep accessing with their new managed account should [transfer them](./repositories-settings#renaming-or-transferring-a-repo) to the organization before the switch. Managed accounts can't own content in a personal namespace. Members will still be able to access any repositories under their personal namespace through their personal (non-managed) account.
- **Tokens and automation**: tokens from personal accounts keep their access to the organization until the account is removed from it. Migrate scripts, CI jobs and pipelines to [service accounts](./enterprise-service-accounts), or to tokens created from the managed accounts after the switch, then remove the old accounts.
- **Other organizations**: managed accounts can't join other organizations. Members who need to keep working in other organizations should keep a separate personal account (see [option 2](#option-2-keep-the-personal-account) below).
- **Work email addresses**: every member must free up their work email before they are provisioned. See [Freeing up work email addresses](#freeing-up-work-email-addresses).

## Freeing up work email addresses

An email address can only belong to one Hugging Face account. This applies to **all** of an account's email addresses, primary and secondary. Matching is case-insensitive.

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

Delete your personal account from your [account settings](https://huggingface.co/settings/account). This permanently deletes all repositories in your personal namespace and removes you from every organization, so you don't need to leave the organization first.

> [!WARNING]
> Deleting an account is permanent. Transfer any repositories you want to keep to the organization first.

Deletion is blocked if you are the only admin of another organization. Add another admin to that organization, or delete it, first. The organization being migrated is not a problem, since `my-org:owner` is also an admin.

### Option 2: Keep the personal account

1. In your [account settings](https://huggingface.co/settings/account), add a personal email address and verify it.
2. Make the personal email address your primary email.
3. **Remove the work email address completely.** Making it a secondary email is not enough.

You don't need to leave the organization with your personal account. Your admin removes it once your managed account is provisioned.

> [!NOTE]
> If your organization already has Managed SSO enabled and has a [verified email domain](./organizations-managing#organization-domain-name), logging in with an email address on that domain redirects you to the organization's SSO page. To log in to your personal account, use your username instead.

Once the work email is free, the admin can retry provisioning for that user in the IdP, or wait for the next sync to pick it up.

## After the migration

User lifecycle is managed from your IdP:

- **Deactivating** a user in your IdP removes them from the organization. If the same user is reactivated later, their existing managed account is reused.
- **Deleting** a user via SCIM permanently deletes their managed account. See [Deprovisioning](./enterprise-scim#deprovisioning).
