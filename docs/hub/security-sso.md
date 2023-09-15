# Single Sign-On (SSO)

The Hugging Face Hub gives you the ability to implement mandatory Single Sign-On (SSO) for your organization.

<Tip warning={true}>
This feature is part of the <a href="https://huggingface.co/enterprise" target="_blank">Enterprise Hub</a>.
</Tip>


## How does it work?

When SSO is enabled, the following applies:

- A banner prompting your org members to authenticate through your chosen Identity Provider (IdP) is shown if they're not authenticated already. Through your IdP settings, you have control over the session duration.


<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/security-sso-prompt.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/security-sso-prompt-dark.png"/>
</div>

- Org members logged in on hf.co must authenticate through SSO even to access public content from your org. Such content will still be accessible to anyone outside the org. SSO only applies to your org, meaning your org members can still belong to other orgs on hf.co.
- Role mapping is supported and determined by your IdP and your settings. Enabling role mapping means you can't assign roles manually in the org.

## Supported Identity Providers

You can easily integrate Hugging Face Hub with a variety of Identity Providers, such as Okta, OneLogin or Azure Active Directory (Azure AD). Hugging Face Hub can work with any OIDC-compliant or SAML (*SP Initiated*) Identity Provider.

## How to configure OIDC/SAML provider in the Hub

You can check your different guides to configure your SSO provider, if yours is not available you can consult one of them to give you an idea of how to do it.

- [How to configure OIDC with Okta in the Hub](./security-sso-okta-oidc)
- [How to configure SAML with Okta in the Hub](./security-sso-okta-saml)

## Users Management

This section enables you to configure some aspects of your organization's SSO


<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-settings-users.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-settings-users-dark.png"/>
</div>

### Session Timeout

It represents the delay when your organization members will be re-asked to complete the SSO flow, by default it is 7 days.

### IdP Role Mapping

* IdP Role Attribute Mapping

It represents a JSON path from your IdP response from which to read the groups to which the user belongs.

* Role Mapping

It's mapping table, the first input is the group value of your IdP and the dropdown corresponds to available roles in your organization.
You must at least specify one admin role, because we perform role syncing of the users when they log in