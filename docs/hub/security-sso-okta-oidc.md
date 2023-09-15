# How to configure Okta with OIDC in the Hub

For this guide, we will take Okta as SSO provider using the OpenID Connect protocol as our preferred identity protocol. 

### Create an application in your provider
In order to configure SSO with OIDC with your organization, you should navigate to the SSO configuration section.

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
* https://huggingface.co/organizations/[organizationIdentifier]/oidc/consume (this URI is available in SSO settings page)


You can leave the optional Sign-out redirect URIs to blank.

<div class="flex justify-center">
<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-okta-guide-3.png"/>
</div>


Save your new application and you will get the required details you need to configure the Hub side of things:


<div class="flex justify-center">
<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-okta-guide-4.png"/>
</div>

### Configure SSO Organization settings

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

### Enable SSO to your organization members

After this step, SSO is not globally enabled in your organization, you need to click on "Enable" to force other organization members to complete the SSO flow described in [How does it work?](#how-does-it-work)


