# How to configure OIDC SSO with Okta

In this guide, we will use Okta as the SSO provider and with the Open ID Connect (OIDC) protocol as our preferred identity protocol. 

<Tip warning={true}>
	This feature is part of the <a href="https://huggingface.co/enterprise" target="_blank">Enterprise Hub</a>.
</Tip>

### Step 1: Create a new application in your Identity Provider

Open a new tab/window in your browser and sign in to your Okta account.

Navigate to "Admin/Applications" and click the "Create App Integration" button.

<div class="flex justify-center">
<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-okta-guide-1.png"/>
</div>

Then choose an “OIDC - OpenID Connect” application, select the application type "Web Application" and click "Create".

<div class="flex justify-center">
<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-okta-guide-2.png"/>
</div>

### Step 2: Configure your application in Okta

Open a new tab/window in your browser and navigate to the SSO section of your organization's settings. Select the OIDC protocol.


<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-navigation-settings.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-navigation-settings-dark.png"/>
</div>

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-settings.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-settings-dark.png"/>
</div>

Copy the "Redirection URI" from the organization's settings on Hugging Face, and paste it in the "Sign-in redirect URI" field on Okta.
The URL looks like this: `https://huggingface.co/organizations/[organizationIdentifier]/saml/consume`.

You can leave the optional Sign-out redirect URIs blank.

<div class="flex justify-center">
<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-okta-guide-3.png"/>
</div>


Save your new application.

### Step 3: Finalize configuration on Hugging Face

In your Okta application, under "General", find the following fields:
- Client ID
- Client secret
- Issuer URL
You will need these to finalize the SSO setup on Hugging Face.


The Okta Issuer URL is generally a URL like `https://tenantId.okta.com`; you can refer to their [guide](https://support.okta.com/help/s/article/What-is-theIssuerlocated-under-the-OpenID-Connect-ID-Token-app-settings-used-for?language=en_US) for more details.


<div class="flex justify-center">
<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-okta-guide-4.png"/>
</div>


In the SSO section of your organization's settings on Hugging Face, copy-paste these values from Okta:

- Sign-on URL
- SP Entity ID
- Public certificate

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-okta-guide-5.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-okta-guide-5-dark.png"/>
</div>

You can now click on "Update and Test OIDC configuration" to save the settings.

You should be redirected to your SSO provider (IdP) login prompt. Once logged in, you'll be redirected to your organization's settings page.

A green check mark near the SAML selector will attest that the test was successful.


<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-okta-guide-6.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-okta-guide-6-dark.png"/>
</div>

### Step 4: Enable SSO in your organization

Now that Single Sign-On is configured and tested, you can enable it for members of your organization by clicking on the "Enable" button.

Once enabled, members of your organization must complete the SSO authentication flow described in the [How does it work?](./security-sso#how-does-it-work) section.
