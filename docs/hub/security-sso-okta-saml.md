# How to configure Okta with SAML in the Hub

For this guide, we will take Okta as SSO provider using the SAML protocol as our preferred identity protocol. 
We only support SAML SP-initiated, it means we can't connect to the Hub from your IdP dashboard.

### Create an application in your provider
In order to configure SSO with SAML with your organization, you should navigate to the SSO configuration section.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-navigation-settings.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-navigation-settings-dark.png"/>
</div>

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-settings-saml.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-settings-saml-dark.png"/>
</div>

Open a new tab/window in your browser and sign in to your Okta account. We will need to create a new Application that will hold the settings we need.

Navigate to "Admin/Applications" and click the "Create App Integration" button.

<div class="flex justify-center">
<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-okta-guide-1.png"/>
</div>

Then choose an "SAML 2.0" application and click "Create".


<div class="flex justify-center">
<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-okta-guide-saml-1.png"/>
</div>

After that, you need to configure your new SAML app:

* Set the Single sing-on URL to: https://huggingface.co/organizations/[organizationIdentifier]/saml/consume (this URL is available in SSO settings page)
* Set Audience URI (SP Entity Id) to the matching one in Hub's SSO settings page
* Set Name ID format to EmailAddress
* Under "Show Advanced Settings", verify that Response and Assertions Signature are set to Signed


<div class="flex justify-center">
<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-okta-guide-saml-2.png"/>
</div>


Save your new application and under "Sign On/Settings/More details" you will get the required details you need to configure the Hub side of things:


<div class="flex justify-center">
<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-okta-guide-saml-4.png"/>
</div>

### Configure SSO Organization settings

Navigate to your organization settings then to SSO configuration section and insert the details (Sign On URL, Public Certificate, Issuer, SP Entity ID) in the SSO configuration form then click on "Save and Test SAML Configuration".

Public certificate should follow the following format: 

```
-----BEGIN CERTIFICATE-----
{certificate}
-----END CERTIFICATE-----
```

Issuer is optional

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-okta-guide-saml-5.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-okta-guide-saml-5-dark.png"/>
</div>

After clicking, you should have been redirected to our SSO provider login prompting after completing the login from your SSO provider, you should have been redirected to the settings page confirming that the test is successful.


<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-okta-guide-saml-6.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-okta-guide-saml-6-dark.png"/>
</div>

### Enable SSO to your organization members

After this step, SSO is not globally enabled in your organization, you need to click on "Enable" to force other organization members to complete the SSO flow described in [How does it work?](./security-sso.md#how-does-it-work)


