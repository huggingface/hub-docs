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

For this guide, we will take Okta as SSO provider using the OpenID Connect protocol as our preferred identity protocol. 

### Create an application in your provider
In order to configure SSO with OIDC or SAML with your organization, you should navigate to the SSO configuration section.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-navigation-settings.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-navigation-settings-dark.png"/>
</div>

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-settings.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-settings-dark.png"/>
</div>

Open a new tab/window in your browser and sign in to your Okta account. We will need to create a new Application that will hold the settings we need.

Navigate to "Admin/Applications" and click the "Create App Integration" button.

<div class="flex justify-center">
<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-okta-guide-1.png"/>
</div>

Then choose an “OIDC - OpenID Connect” application, select the application type "Web Application" and click "Create".


<div class="flex justify-center">
<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-okta-guide-2.png"/>
</div>

After that, you need to configure your new OIDC app, and set the Sign-in redirect URI to:

https://huggingface.co/organizations/[organizationIdentifier]/sso/oidc/consume (this URI is available )

You can leave the optional Sign-out redirect URIs to blank.

<div class="flex justify-center">
<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-okta-guide-3.png"/>
</div>


Save your new application and you will get the required details you need to configure the Hub side of things:


<div class="flex justify-center">
<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-okta-guide-4.png"/>
</div>

Navigate to your organizaton settings then to SSO configuration section and insert the details (Issuer URL, Client Id, Client Secret) in the SSO configuration form then click on "Save and Test OIDC Configuration". For Okta, Issuer URL is generally a URL like this `https://tenantId.okta.com`, you can refer to their [guide](https://support.okta.com/help/s/article/What-is-theIssuerlocated-under-the-OpenID-Connect-ID-Token-app-settings-used-for?language=en_US).

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-okta-guide-5.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-okta-guide-5-dark.png"/>
</div>

After clicking, you should have been redirected to our SSO provider login prompting after completing the login from your SSO provider, you should have been redirected to the settings page confirming that the test is successful.


<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-okta-guide-6.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-okta-guide-6-dark.png"/>
</div>

After this step, SSO is not globally enabled in your organization, you need to click on "Enable" to force other organization members to complete the SSO flow described in [How does it work?](#how-does-it-work)


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