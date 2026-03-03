# Basic SSO

> [!WARNING]
> This feature is part of the <a href="https://huggingface.co/enterprise">Team & Enterprise</a> plans.

Basic SSO adds an access-control layer on top of the standard Hugging Face login. It allows you to enforce authentication through your Identity Provider (IdP) when members access resources under your organization's namespace, such as private models, datasets, and Spaces.

For a comparison with Managed SSO, see the [SSO overview](./enterprise-sso).

## How it works

> [!NOTE]
> **Basic SSO does not replace the Hugging Face login.** Your members will still need to sign in to Hugging Face with their own credentials (email/password, Google, or GitHub) before being prompted to complete SSO authentication to access your organization's resources. This is by design: Basic SSO secures access to your organization without taking over the user's Hugging Face identity.

When Single Sign-On is enabled, the members of your organization must authenticate through your Identity Provider (IdP) to access any content under the organization's namespace. Public content will still be available to users who are not members of the organization.

**We use email addresses to identify SSO users. As a user, make sure that your organizational email address (e.g. your company email) has been added to [your user account](https://huggingface.co/settings/account).**

When users log in, they will be prompted to complete the Single Sign-On authentication flow with a banner similar to the following:

<div class="flex justify-center">
	<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/security-sso-prompt.png"/>
	<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/security-sso-prompt-dark.png"/>
</div>

Single Sign-On only applies to your organization. Members may belong to other organizations on Hugging Face.

## Getting started

Basic SSO can be configured directly from your organization's settings. Hugging Face Hub can work with any OIDC-compliant or SAML Identity Provider, including Okta, OneLogin, and Microsoft Entra ID (Azure AD).

See our [Configuration Guides](./security-sso-configuration-guides) for step-by-step setup instructions.

## User provisioning

Once SSO is enabled on your organization, a direct join link can be copied and shared with new members. This SSO join link is available in both the **SSO** and **Members** settings tabs. Since organizations with SSO enabled cannot use classic invite links, the SSO join link is the primary method for inviting teammates to your organization. Simply click the copy button to copy the link to your clipboard and share it with the members you want to invite. When recipients click the shared link, they will be able to authenticate via SSO and directly join your organization.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso-join-link.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso-join-link-dark.png"/>
</div>

Organizations on the Enterprise plan can also use [SCIM](./enterprise-scim) to automate invitation-based provisioning from your Identity Provider. See the [SCIM guide](./enterprise-scim) for more details.

## SSO features

Basic SSO supports [role mapping, resource group mapping, session timeout, matching email domains, and external collaborators](./security-sso-user-management). These features are configurable from your organization's settings.
