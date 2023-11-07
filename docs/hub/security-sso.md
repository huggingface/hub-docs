<h1 class="flex items-center gap-3">
	<svg xmlns="http://www.w3.org/2000/svg" fill="none" aria-hidden="true" focusable="false" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 33 27"><path fill="currentColor" fill-rule="evenodd" d="M13.5.7a8.7 8.7 0 0 0-7.7 5.7L1 20.6c-1 3.1.9 5.7 4.1 5.7h15c3.3 0 6.8-2.6 7.8-5.7l4.6-14.2c1-3.1-.8-5.7-4-5.7h-15Zm1.1 5.7L9.8 20.3h9.8l1-3.1h-5.8l.8-2.5h4.8l1.1-3h-4.8l.8-2.3H23l1-3h-9.5Z" clip-rule="evenodd"></path></svg>
	Single Sign-On (SSO)
</h1>

The Hugging Face Hub gives you the ability to implement mandatory Single Sign-On (SSO) for your organization.

We support both SAML 2.0 and OpenID Connect (OIDC) protocols.

<Tip warning={true}>
This feature is part of the <a href="https://huggingface.co/enterprise" target="_blank">Enterprise Hub</a>.
</Tip>

## How does it work?

When Single Sign-On is enabled, the members of your organization must authenticate through your Identity Provider (IdP) to access any content under the organization's namespace. Public content will still be available to users who are not members of the organization.

**We use email addresses to identify SSO users. Make sure that your organizational email address (e.g. your company email) has been added to [your user account](https://huggingface.co/settings/account).**

When users log in, they will be prompted to complete the Single Sign-On authentication flow with a banner similar to the following:

<div class="flex justify-center">
	<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/security-sso-prompt.png"/>
	<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/security-sso-prompt-dark.png"/>
</div>

Single Sign-On only applies to your organization. Members may belong to other organizations on Hugging Face.

We support [role mapping](#role-mapping): you can automatically assign [roles](./organizations-security#access-control-in-organizations) to organization members based on attributes provided by your Identity Provider.

### Supported Identity Providers

You can easily integrate Hugging Face Hub with a variety of Identity Providers, such as Okta, OneLogin or Azure Active Directory (Azure AD). Hugging Face Hub can work with any OIDC-compliant or SAML Identity Provider.

## How to configure OIDC/SAML provider in the Hub

We have some guides available to help with configuring based on your chosen SSO provider, or to take inspiration from:

- [How to configure OIDC with Okta in the Hub](./security-sso-okta-oidc)
- [How to configure SAML with Okta in the Hub](./security-sso-okta-saml)

### Users Management

<div class="flex justify-center">
	<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-settings-users.png"/>
	<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-settings-users-dark.png"/>
</div>

#### Session Timeout

This value sets the duration of the session for members of your organization.

After this time, members will be prompted to re-authenticate with your Identity Provider to access the organization's resources.

The default value is 7 days.

#### Role Mapping

When enabled, Role Mapping allows you to dynamically assign [roles](./organizations-security#access-control-in-organizations) to organization members based on data provided by your Identity Provider.

This section allows you to define a mapping from your IdP's user profile data from your IdP to the assigned role in Hugging Face.

- IdP Role Attribute Mapping

  A JSON path to an attribute in your user's IdP profile data.

- Role Mapping

  A mapping from the IdP attribute value to the assigned role in the Hugging Face organization.

You must map at least one admin role.

If there is no match, a user will be assigned the default role for your organization. The default role can be customized in the `Members` section of the organization's settings.

Role synchronization is performed on login.
