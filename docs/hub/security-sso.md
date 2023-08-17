# Single Sign-On (SSO)

The Hugging Face Hub gives you the ability to implement mandatory Single Sign-On (SSO) for members of your organization. You can enable your SSO provider for a specific email domain (for example, @example.com). When enabled, users with an email address that matches the domain must log in to huggingface.co using your SSO provider to access your organization.

<Tip warning={true}>
This feature is available for Enterprise Hub. <a href="mailto:sales@huggingface.co" target="_blank">For more information, please contact our sales team</a>.
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

## Configuring SSO

To successfully enable SSO on the Hugging Face Hub for your organization, you need to set up an OIDC application in your IdP. We will provide a callback URL pointing to the `huggingface.co` domain. Once you create the application, you will need to provide us with the following information:

- Client ID
- Client Secret
- Issuer URL

## Supported Identity Providers

You can easily integrate Hugging Face Hub with a variety of Identity Providers, such as Okta, OneLogin or Azure Active Directory (Azure AD). Hugging Face Hub can work with any OIDC-compliant Identity Provider.