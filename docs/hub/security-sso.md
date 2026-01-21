# Single Sign-On (SSO)

The Hugging Face Hub gives you the ability to implement mandatory Single Sign-On (SSO) for your organization.

We support both SAML 2.0 and OpenID Connect (OIDC) protocols.

> [!WARNING]
> This feature is part of the <a href="https://huggingface.co/enterprise">Team & Enterprise</a> plans. For enhanced capabilities like automated user provisioning (JIT/SCIM) and global SSO enforcement, see our <a href="./enterprise-hub-advanced-sso">Advanced SSO documentation</a>

## How does it work?

When Single Sign-On is enabled, the members of your organization must authenticate through your Identity Provider (IdP) to access any content under the organization's namespace. Public content will still be available to users who are not members of the organization.

**We use email addresses to identify SSO users. As a user, make sure that your organizational email address (e.g. your company email) has been added to [your user account](https://huggingface.co/settings/account).**

When users log in, they will be prompted to complete the Single Sign-On authentication flow with a banner similar to the following:

<div class="flex justify-center">
	<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/security-sso-prompt.png"/>
	<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/security-sso-prompt-dark.png"/>
</div>

Single Sign-On only applies to your organization. Members may belong to other organizations on Hugging Face.

We support [role mapping](#role-mapping) and [resource group mapping](#resource-group-mapping). Based on attributes provided by your Identity Provider, you can dynamically assign [roles](./organizations-security#access-control-in-organizations) to organization members, or give them access to [resource groups](./enterprise-hub-resource-groups) defined in your organization.

### Supported Identity Providers

You can easily integrate Hugging Face Hub with a variety of Identity Providers, such as Okta, OneLogin or Azure Active Directory (Azure AD). Hugging Face Hub can work with any OIDC-compliant or SAML Identity Provider.

## How to configure OIDC/SAML provider in the Hub

We have some guides available to help with configuring based on your chosen SSO provider, or to take inspiration from:

- [How to configure SAML with Okta in the Hub](./security-sso-okta-saml)
- [How to configure OIDC with Okta in the Hub](./security-sso-okta-oidc)
- [How to configure SAML with Azure in the Hub](./security-sso-azure-saml)
- [How to configure OIDC with Azure in the Hub](./security-sso-azure-oidc)
- [How to configure SAML with Google Workspace in the Hub](./security-sso-google-saml)
- [How to configure OIDC with Google Workspace in the Hub](./security-sso-google-oidc)

### Users Management

<div class="flex justify-center">
	<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-settings-users.png"/>
	<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-settings-users-dark.png"/>
</div>

#### Inviting members with SSO

Once SSO is enabled on your organization, a direct join link can be copied and shared with new members. This SSO join link is available in both the **SSO** and **Members** settings tabs. Since organizations with SSO enabled cannot use classic invite links, the SSO join link is the primary method for inviting teammates to your organization. Simply click the copy button to copy the link to your clipboard and share it with the members you want to invite. When recipients click the shared link, they will be able to authenticate via SSO and directly join your organization.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso-join-link.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso-join-link-dark.png"/>
</div>

#### Session Timeout

This value sets the duration of the session for members of your organization.

After this time, members will be prompted to re-authenticate with your Identity Provider to access the organization's resources.

The default value is 7 days.

#### Role Mapping

When enabled, Role Mapping allows you to dynamically assign [roles](./organizations-security#access-control-in-organizations) to organization members based on data provided by your Identity Provider.

This section allows you to define a mapping from your IdP's user profile data to the assigned role in Hugging Face.

- **IdP Role Attribute Path**

  A JSON path to an attribute in your user's IdP profile data.
  It supports dot notation (e.g. `user.role` or `groups`).
  For SAML, this can be a URI (e.g. `http://schemas.microsoft.com/ws/2008/06/identity/claims/role`).

- **Role Mapping**

  A mapping from the IdP attribute value to the assigned role in the Hugging Face organization.
  
  Available roles are `admin`, `write`, `contributor`, and `read`. See [roles documentation](./organizations-security#access-control-in-organizations) for more details.

> [!WARNING]
> You must map at least one `admin` role in your configuration.

If the attribute in the IdP response contains multiple values (e.g. a list of groups), the **first matching mapping** will be used to determine the user's role.

If there is no match, a user will be assigned the default role for your organization. The default role can be customized in the `Members` section of the organization's settings.

Role synchronization is performed on every login.

#### Resource Group Mapping

When enabled, Resource Group Mapping allows you to dynamically assign members to [resource groups](./enterprise-hub-resource-groups) in your organization, based on data provided by your Identity Provider.

<div class="flex justify-center">
	<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/enterprise/resource-group-mapping.png"/>
	<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/enterprise/resource-group-mapping-dark.png"/>
</div>

- **IdP Attribute Path**

  A JSON path to an attribute in your user's IdP profile data. Similar to Role Mapping, this supports dot notation or URIs for SAML.

- **Resource Group Mapping**

  A mapping from the IdP attribute value to a resource group in your Hugging Face organization. You can assign a specific role (`admin`, `write`, `contributor`, `read`) for each resource group mapping.

Unlike Role Mapping, **Resource Group Mapping is additive**. If a user matches multiple mappings (e.g. they belong to multiple groups in your IdP that are mapped to different Resource Groups), they will be added to **all** matched Resource Groups.

If there is no match, the user will not be assigned to any resource group.

#### Matching email domains

When enabled, Matching email domains only allow organization members to complete SSO if the email provided by your identity provider matches one of their emails on Hugging Face.

To add an email domain, fill out the 'Matching email domains' field, click enter on your keyboard, and save. 

#### External Collaborators

This enables certain users within your organization to access resources without completing the Single Sign-On (SSO) flow described before. This can be helpful when you work with external parties who aren't part of your organization's Identity Provider (IdP) but require access to specific resources.

To add a user as an "External Collaborator" visit the `SSO/Users Management` section in your organization's settings. Once added, these users won't need to go through the SSO process.

However, they will still be subject to your organization's access controls ([Resource Groups](./security-resource-groups)).
It's crucial to manage their access carefully to maintain your organization's data security.
