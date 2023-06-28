# Single sign-on (SSO)

With Hugging Face Hub, you have the option to implement mandatory Single Sign-On (SSO) for members of your organization. You can activate your SSO provider for a particular email domain (e.g., @example.com). Users with an email address that matches the domain must log in on huggingface.co using your SSO provider to access your organization.

<Tip warning={true}>
This feature is available for Enterprise Hub. <a href="mailto:sales@huggingface.co" target="_blank">For more information, please contact our sales team</a>.
</Tip>


## Rules

Once SSO is enabled for the plan, the following rules apply to the end users:

- Your members will see a banner prompting them to authenticate through your chosen IdP to access your organization.


<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/security-sso-prompt.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/security-sso-prompt-dark.png"/>
</div>

- If an end-user is a member of any organization outside yours, they are still required to log in via SSO as soon as the feature is enabled to access public content of your organization. However, they will be able to access other teams.
- If you activate the role mapping feature, the admin from your organization won't be able to change their role it'll be determined by your IdP and your settings

## Configuring SSO

To successfully activate Single Sign-On (SSO) in Hugging Face Hub, we will need to set up an OIDC application in your IdP. We will give you a callback URL pointing to the `huggingface.co` domain. After the creation of the app, we will need this information in order to make your SSO implementation work:

- Client ID
- Client Secret
- Issuer URL

## Supported SSO Partners
You can easily integrate Hugging Face Hub with a variety of SSO providers, and we have listed a few examples below:

1. Okta
2. OneLogin
3. Azure Active Directory (Azure AD)

These are just some of the popular examples, but Hugging Face Hub can work with any OIDC-compliant SSO system.