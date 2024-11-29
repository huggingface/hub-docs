# Single Sign-On (SSO)

<Tip warning={true}>
This feature is part of the <a href="https://huggingface.co/enterprise">Enterprise Hub</a>.
</Tip>

Single sign-on (SSO) allows organizations to securely manage user authentication through their own identity provider (IdP). Both SAML 2.0 and OpenID Connect (OIDC) protocols are supported.

<div class="flex justify-center" style="max-width: 550px">
  <img
    class="block dark:hidden !m-0"
    src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/enterprise/SSO.png"
    alt="screenshot of Hugging Face Single Sign-On (SSO) feature"
  />
  <img
    class="hidden dark:block !m-0"
    src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/enterprise/dark-SSO.png"
    alt="screenshot of Hugging Face Single Sign-On (SSO) feature"
  />
</div>

This feature allows organizations to:

- Enforce mandatory authentication through your company's IdP
- Automatically manage user access and roles based on your IdP attributes
- Support popular providers like Okta, OneLogin, and Azure Active Directory
- Maintain security while allowing external collaborators when needed
- Control session timeouts and role mappings

This Enterprise Hub feature helps organizations maintain consistent security policies while giving their teams seamless access to Hugging Face resources.

[Getting started with SSO →](./security-sso)
