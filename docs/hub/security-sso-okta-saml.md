# How to configure Okta with SAML in the Hub

In this guide, we will use Okta as the SSO provider and with the Security Assertion Markup Language (SAML) protocol as our preferred identity protocol. 
We currently support only SAML SP-initiated. SAML-IDP is not yet supported.

### Create an application in your provider
To configure SSO with SAML, you should navigate to the SSO configuration section in your organization settings.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-navigation-settings.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-navigation-settings-dark.png"/>
</div>

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-settings-saml.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-settings-saml-dark.png"/>
</div>

Open a new tab/window in your browser and sign in to your Okta account. You will need to create an Application that will hold the settings we need.

Navigate to "Admin/Applications" and click the "Create App Integration" button.

<div class="flex justify-center">
<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-okta-guide-1.png"/>
</div>

Then choose an "SAML 2.0" application and click "Create".


<div class="flex justify-center">
<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-okta-guide-saml-1.png"/>
</div>

After that, you'll need to configure your new SAML app:

* Set the Single sign-on URL to: https://huggingface.co/organizations/[organizationIdentifier]/saml/consume (this URL is also available in your org's SSO settings page)
* Set Audience URI (SP Entity Id) to the matching one in Hub's SSO settings page
* Set Name ID format to EmailAddress
* Under "Show Advanced Settings", verify that Response and Assertion Signature are set to: Signed


<div class="flex justify-center">
<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-okta-guide-saml-2.png"/>
</div>


Save your new application. Under "Sign On/Settings/More details" you will get the required details we need to configure SSO:


<div class="flex justify-center">
<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-okta-guide-saml-4.png"/>
</div>

### Configure SSO Organization settings

Navigate to your organization settings and select SSO. In the SSO configuration form, insert the following details: Sign On URL, Public Certificate, Issuer, SP Entity ID. Click "Save and Test SAML Configuration".

Note the public certificate should follow the following format: 

```
-----BEGIN CERTIFICATE-----
{certificate}
-----END CERTIFICATE-----
```

Issuer is optional.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-okta-guide-saml-5.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-okta-guide-saml-5-dark.png"/>
</div>

After clicking, you should be redirected to our SSO provider login prompt after completing the login from your SSO provider. Then you'll be redirected to the settings page confirming that the test is successful.


<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-okta-guide-saml-6.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-okta-guide-saml-6-dark.png"/>
</div>

### Enable SSO to organization members

After this step, SSO is not globally enabled in your organization, you need to click on "Enable" to force other organization members to complete the SSO flow described in [How does it work?](./security-sso.md#how-does-it-work)


