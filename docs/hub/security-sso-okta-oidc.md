# How to configure Okta with OIDC in the Hub

In this guide, we will use Okta as the SSO provider and with the OpenID Connect protocol (OIDC) as our preferred identity protocol. 

### Create an application in your provider
To configure SSO with OIDC, you should navigate to the SSO configuration section in your organization settings.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-navigation-settings.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-navigation-settings-dark.png"/>
</div>

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-settings.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-settings-dark.png"/>
</div>

Open a new tab/window in your browser and sign in to your Okta account. You will need to create an Application that will hold the settings we need.

Navigate to "Admin/Applications" and click the "Create App Integration" button.

<div class="flex justify-center">
<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-okta-guide-1.png"/>
</div>

Then choose an “OIDC - OpenID Connect” application, select the application type "Web Application" and click "Create".


<div class="flex justify-center">
<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-okta-guide-2.png"/>
</div>

Now you're ready to configure your new OIDC app. Set the Sign-in redirect URI to:
* https://huggingface.co/organizations/[organizationIdentifier]/oidc/consume (this URI is also available in your org's SSO settings page)


You can leave the optional Sign-out redirect URIs blank.

<div class="flex justify-center">
<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-okta-guide-3.png"/>
</div>


Save your new application and you will get the required details we need to configure SSO:


<div class="flex justify-center">
<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-okta-guide-4.png"/>
</div>

### Configure SSO Organization settings

Navigate to your organization settings and select SSO. In the SSO configuration form, insert the following details: Issuer URL, Client Id, Client Secret. Click "Save and Test OIDC Configuration". The Okta Issuer URL is generally a URL like `https://tenantId.okta.com`; you can refer to their [guide](https://support.okta.com/help/s/article/What-is-theIssuerlocated-under-the-OpenID-Connect-ID-Token-app-settings-used-for?language=en_US) for more details.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-okta-guide-5.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-okta-guide-5-dark.png"/>
</div>

After clicking, you should be redirected to our SSO provider login prompt after completing the login from your SSO provider. Then you'll be redirected to the settings page confirming that the test is successful.


<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-okta-guide-6.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-okta-guide-6-dark.png"/>
</div>

### Enable SSO to organization members

After this step, SSO is not globally enabled in your organization, you need to click on "Enable" to force other organization members to complete the SSO flow described in [How does it work?](./security-sso.md#how-does-it-work)


