# How to configure OIDC SSO with Azure

In this guide, we will use Azure as the SSO provider and with the Open ID Connect (OIDC) protocol as our preferred identity protocol. 


<Tip warning={true}>
	This feature is part of the <a href="https://huggingface.co/enterprise" target="_blank">Enterprise Hub</a>.
</Tip>


### Step 1: Create a new application in your Identity Provider

Open a new tab/window in your browser and sign in to the Azure portal of your organization.

Navigate to the Microsoft Entra ID admin center, and click on "Enterprise applications"

<div class="flex justify-center">
<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/b134c56c2d4748be0a161ed13211407228f34553/hub/sso/sso-azure-oidc-guide-1.png"/>
</div>

You'll be redirected to this page, click on "New application" at the top, then "Create your own application".

<div class="flex justify-center">
<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/b134c56c2d4748be0a161ed13211407228f34553/hub/sso/sso-azure-oidc-guide-2.png"/>
</div>

Input a name for your application (for example, Hugging Face SSO), then select "Register an application to integrate with Microsoft Entra ID (App you're developping)".

<div class="flex justify-center">
<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/b134c56c2d4748be0a161ed13211407228f34553/hub/sso/sso-azure-oidc-guide-3.png"/>
</div>

### Step 2: Configure your application on Azure

Open a new tab/window in your browser and navigate to the SSO section of your organization's settings. Select the OIDC protocol.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-navigation-settings.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-navigation-settings-dark.png"/>
</div>

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-settings.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-settings-dark.png"/>
</div>


Copy the "Redirection URI" from the organization's settings on Hugging Face, and paste it in the "Redirect URI" field on Azure Entra ID. Make sure you selected "Web" in the dropdown menu.
The URL looks like this: `https://huggingface.co/organizations/[organizationIdentifier]/oidc/consume`.

<div class="flex justify-center">
<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/b134c56c2d4748be0a161ed13211407228f34553/hub/sso/sso-azure-oidc-guide-4.png"/>
</div>

Save your new application.

### Step 3: Finalize configuration on Hugging Face

We will need to collect the following information to finalize the setup on Hugging Face:
- The Client ID of the OIDC app
- A Client secret of the OIDC app
- The Issuer URL of the OIDC app

In Microsoft Entra ID, navigate to Enterprise applications, and click on your newly created application in the list.

<div class="flex justify-center">
<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/b134c56c2d4748be0a161ed13211407228f34553/hub/sso/sso-azure-oidc-guide-5.png"/>
</div>

In the application overview, click on "Single sign-on", then "Go to application"

<div class="flex justify-center">
<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/b134c56c2d4748be0a161ed13211407228f34553/hub/sso/sso-azure-oidc-guide-6.png"/>
</div>

In the OIDC app overview, you will fnd a copiable field named "Application (client) ID".
Copy that ID to your clipboard and paste it in the "Client ID" field on Huggingface.

<div class="flex justify-center">
<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/b134c56c2d4748be0a161ed13211407228f34553/hub/sso/sso-azure-oidc-guide-7.png"/>
</div>

Next, in Microsoft Entra, click on "Endpoints" in the top menu.
Copy the value in the "OpenID connect metadata document" field, and paste it in the "Issue URL" field in Hugging Face.

<div class="flex justify-center">
<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/b134c56c2d4748be0a161ed13211407228f34553/hub/sso/sso-azure-oidc-guide-8.png"/>
</div>

Back in Microsoft Entra, navigate to "Certificates & secrets", and generate a new secret by clicking "New client secret".

<div class="flex justify-center">
<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/b134c56c2d4748be0a161ed13211407228f34553/hub/sso/sso-azure-oidc-guide-9.png"/>
</div>

Once you have created the secret, copy the secret value and paste it in the "Client secret" field on Hugging Face.

<div class="flex justify-center">
<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/b134c56c2d4748be0a161ed13211407228f34553/hub/sso/sso-azure-oidc-guide-10.png"/>
</div>


You can now click on "Update and Test OIDC configuration" to save the settings.

You should be redirected to your SSO provider (IdP) login prompt. Once logged in, you'll be redirected to your organization's settings page.

A green check mark near the OIDC selector will attest that the test was successful.


<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-okta-guide-6.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-okta-guide-6-dark.png"/>
</div>

### Step 4: Enable SSO in your organization

Now that Single Sign-On is configured and tested, you can enable it for members of your organization by clicking on the "Enable" button.

Once enabled, members of your organization must complete the SSO authentication flow described in [How does it work?](./security-sso#how-does-it-work).
