# Single sign-on (SSO)

With Hugging Face Hub, you have the option to implement mandatory Single Sign-On (SSO) for members of your organization. You can activate your SSO provider for a particular email domain (e.g., @example.com). Users with an email address that matches the domain must log in on huggingface.co using your SSO provider to access your organization.

<Tip warning={true}>
This feature is available for Enterprise Hub. <a href="mailto:sales@huggingface.co" target="_blank">For more information, please contact our sales team</a>.
</Tip>


## Requirements

To successfully activate Single Sign-On (SSO) in Hugging Face Hub, we will need to set up an OIDC application in your IdP. We will give you a callback URL pointing to the `huggingface.co` domain. After the creation of the app, we will need these informations in order to make your SSO implementation work:

- Client ID
- Client Secret
- Issuer URL


## How it works?

Once SSO is setup up for your organization, your members will see a banner prompting them to authenticate through your chosen IdP to access your org's content.

[Screenshot]



## Supported SSO Partners
You can easily integrate Hugging Face Hub with a variety of SSO providers, and we have listed a few examples below:

1. Okta
2. OneLogin
3. Azure Active Directory (Azure AD)

These are just some of the popular examples, but Hugging Face Hub can work with any OIDC-compliant SSO system, giving you the freedom to choose the SSO partner that best suits your organization's needs and existing infrastructure.