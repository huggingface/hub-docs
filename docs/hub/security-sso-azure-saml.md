# How to configure SAML SSO with Azure

In this guide, we will use Azure as the SSO provider and with the Security Assertion Markup Language (SAML) protocol as our preferred identity protocol. 

We currently support SP-initiated and IdP-initiated authentication. User provisioning is not yet supported at this time.

<Tip warning={true}>
	This feature is part of the <a href="https://huggingface.co/enterprise" target="_blank">Enterprise Hub</a>.
</Tip>

### Step 1: Create a new application in your Identity Provider

Open a new tab/window in your browser and sign in to the Azure portal of your organization.

Navigate to "Enterprise applications" and click the "New application" button.

<div class="flex justify-center">
<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-okta-guide-1.png"/>
</div>

You'll be redirected to this page, click on "Create your own application", fill the name of your application, and then "Create" the application.

<div class="flex justify-center">
<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-okta-guide-saml-1.png"/>
</div>


### Step 2: Configure your application on Azure

Open a new tab/window in your browser and navigate to the SSO section of your organization's settings. Select the SAML protocol.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-navigation-settings.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-navigation-settings-dark.png"/>
</div>

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-settings-saml.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-settings-saml-dark.png"/>
</div>

Copy the "Assertion Consumer Service URL" from the organization's settings on Hugging Face, and paste it in the "Reply URL" field on Azure (1).
Copy the "SP Entity Id" from the organization's settings on Hugging Face, and paste it in the "Identifier (Entity Id)" field on Azure (2).

The URL looks like this: `https://huggingface.co/organizations/[organizationIdentifier]/saml/consume`.

<div class="flex justify-center">
<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-okta-guide-saml-2.png"/>
</div>

Then under "SAML Certificates", verify that "Signin Option" is set to: Sign SAML response and assertion.

Save your new application.

### Step 3: Finalize configuration on Hugging Face

In your Azure application, under "Set up", find the following fields:
- Login Url
- Public certificate (Certificate (base64))
You will need them to finalize the SSO setup on Hugging Face.


<div class="flex justify-center">
<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-okta-guide-saml-4.png"/>
</div>

In the SSO section of your organization's settings, copy-paste these values from Azure:

- Sign-on URL
- Public certificate
- Tick "Signed Assertions"

The public certificate must have the following format:

```
-----BEGIN CERTIFICATE-----
{certificate}
-----END CERTIFICATE-----
```

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-okta-guide-saml-5.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-okta-guide-saml-5-dark.png"/>
</div>

You can now click on "Update and Test SAML configuration" to save the settings.

You should be redirected to your SSO provider (IdP) login prompt. Once logged in, you'll be redirected to your organization's settings page.

A green check mark near the SAML selector will attest that the test was successful.


<div class="flex justify-center">
	<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-okta-guide-saml-6.png"/>
	<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-okta-guide-saml-6-dark.png"/>
</div>

### Step 4: Enable SSO in your organization

Now that Single Sign-On is configured and tested, you can enable it for members of your organization by clicking on the "Enable" button.

Once enabled, members of your organization must complete the SSO authentication flow described in the [How does it work?](./security-sso#how-does-it-work) section.
