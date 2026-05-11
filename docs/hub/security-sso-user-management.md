# User Management

> [!WARNING]
> This feature is part of the <a href="https://huggingface.co/enterprise">Team & Enterprise</a> plans.

The following features are available to organizations with SSO enabled. See [Basic SSO](./security-sso-basic) and [Managed SSO](./enterprise-advanced-sso) for details on each mode.

<div class="flex justify-center">
	<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-settings-users.png"/>
	<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-settings-users-dark.png"/>
</div>

## Session Timeout

This value sets the duration of the session for members of your organization.

After this time, members will be prompted to re-authenticate with your Identity Provider to access the organization's resources.

The default value is 7 days.

## Role Mapping

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

If there is no match, the role is determined as follows:

- If the user was invited to the organization with a specific role, that invitation role is used as a fallback.
- Otherwise, the user is assigned the default role for your organization. The default role can be customized in the `Members` section of the organization's settings.

> [!NOTE]
> When inviting a user whose role will be controlled by SSO role mapping, the role selected in the invite modal only applies if the user does not yet have a role assigned in your SSO provider.

Role synchronization is performed on every login.

## Resource Group Mapping

When enabled, Resource Group Mapping allows you to dynamically assign members to [resource groups](./enterprise-resource-groups) in your organization, based on data provided by your Identity Provider.

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

## Matching email domains

> [!NOTE]
> This feature is only relevant for [Basic SSO](./security-sso-basic). With [Managed SSO](./enterprise-advanced-sso), user accounts are fully managed by the organization, so email domain matching does not apply.

When enabled, 'Matching email domains' only allows organization members to complete SSO if the email provided by your identity provider matches one of their emails on Hugging Face.

To add an email domain, fill out the 'Matching email domains' field, click enter on your keyboard, and save.

## External Collaborators

This enables certain users within your organization to access resources without completing the Single Sign-On (SSO) flow. This can be helpful when you work with external parties who aren't part of your organization's Identity Provider (IdP) but require access to specific resources.

To add a user as an "External Collaborator" visit the `SSO/Users Management` section in your organization's settings. Once added, these users won't need to go through the SSO process.

However, they will still be subject to your organization's access controls ([Resource Groups](./enterprise-resource-groups)).
It's crucial to manage their access carefully to maintain your organization's data security.
