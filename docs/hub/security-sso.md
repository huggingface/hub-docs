# Single sign-on (SSO)

Hugging Face Hub includes a robust Single Sign-On (SSO) feature that allows organizations to simplify user authentication and access control by utilizing a third-party identity provider (IdP). This SSO integration strengthens security and provides a unified login experience for all users of your organization.

<Tip warning={true}>
This feature is available for Enterprise Hub, <a href="mailto:sales@huggingface.co" target="_blank">For more information, please contact our sales team</a> 
</Tip>


## Setting up SSO

Integrating SSO into your Hugging Face Hub organization is a simple process. By leveraging a third-party IdP, you can enforce mandatory authentication through your chosen SSO provider for all users associated with your organization.

By specifying a specific email domain, such as @example.com, you can enable SSO and require users with the specified email addresses to sign in or join your organization on the Hugging Face platform through your chosen SSO provider. By doing this, you can be sure that nobody but authorized users with verified credentials will have access to your company's priceless resources on the Hugging Face Hub.


## Benefits of Using SSO with Huggingface Hub

Hugging Face Hub's Single Sign-On (SSO) integration offers several key advantages for your organization:

1. **Enhanced Security**: SSO enhances security measures by centralizing user authentication through a trusted identity provider (IdP). This eliminates the risk of password-related security breaches.

2. **Access Control**: With SSO, organizations have the power to control user access and permissions in a detailed manner. By setting up user roles and privileges through the SSO provider, these permissions are consistently enforced across all integrated applications and platforms. This centralized user access management guarantees that each user within your organization is given the appropriate level of access.

3. **Easy Onboarding and Offboarding**: Streamlining the user onboarding and offboarding processes is made possible through SSO. New employees can easily access the Hugging Face Hub by logging in with their SSO credentials. On the other hand, when an employee leaves, their access can be instantly revoked by disabling their account in the SSO provider. This ensures the security of sensitive data by reducing the risk of unauthorized access.

4. **Seamless Integration**: The Hugging Face Hub can easily connect with a variety of Single Sign-On (SSO) partners, enabling organizations to utilize their preferred authentication infrastructure. Whether you have an existing SSO system or are planning to implement one in the future, the Hugging Face Hub can integrate with various OIDC-compliant (OpenID Connect) login systems, ensuring a seamless integration process.

## Supported SSO Partners
You can easily integrate Hugging Face Hub with a variety of SSO partners, and we have listed a few examples below:

1. Okta
2. OneLogin
3. Azure Active Directory (Azure AD)

These are just some of the popular examples, but Hugging Face Hub can work with any OIDC-compliant SSO system, giving you the freedom to choose the SSO partner that best suits your organization's needs and existing infrastructure.