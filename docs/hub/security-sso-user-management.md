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

If the attribute in the IdP response contains multiple values (e.g. a list of groups) that match several mappings, the user is assigned the **most privileged matching role**. The role hierarchy, from least to most privileged, is `read` < `contributor` < `write` < `admin`.

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

  A mapping from the IdP attribute value to a resource group in your Hugging Face organization. You can assign a specific role (`admin`, `write`, `contributor`, `read`) for each resource group mapping, or `inherit` to give users the same role as their organization role.

Unlike Role Mapping, **Resource Group Mapping is additive**. If a user matches multiple mappings (e.g. they belong to multiple groups in your IdP that are mapped to different Resource Groups), they will be added to **all** matched Resource Groups.

If there is no match, the user will not be assigned to any resource group.

> [!WARNING]
> Resource groups targeted by a mapping can still be edited manually from the Hub UI or API, but those edits are overwritten at the user's next SSO login: a role change is reverted to the mapped role, and a user who was manually removed is re-added. To change a mapped user's access permanently, update your IdP data or the mapping configuration.

## Matching email domains

> [!NOTE]
> This feature is only relevant for [Basic SSO](./security-sso-basic). With [Managed SSO](./enterprise-advanced-sso), user accounts are fully managed by the organization, so email domain matching does not apply.

When enabled, 'Matching email domains' only allows organization members to complete SSO if the email provided by your identity provider matches one of their emails on Hugging Face.

To add an email domain, fill out the 'Matching email domains' field, click enter on your keyboard, and save.

## External Collaborators

External collaborators are people outside your organization who need access to some of its resources without going through Single Sign-On (SSO). That usually means they aren't in your Identity Provider (IdP). They're available on paid plans, and show up with an "External collaborator" badge in your organization's member lists.

You can add them by:

- **Inviting them to the organization**: on the **Members** page of your organization's settings, check **External Collaborator** when you send the invite.
- **Converting an existing member**: on the **Members** page, open the member's menu and select **Convert to external collaborator**. Use **Convert to member** to switch them back. If your organization uses SSO, they'll need to sign in through it afterward to keep access. You can also do this [via the API](./programmatic-user-access-control#change-member-account-type-via-api).
- **Sharing a resource group or repository**: if [external invitations](./security-resource-groups#external-invitations) are enabled, resource group admins can invite outsiders straight into a Resource Group, including from **Share with external collaborators** on a repository's settings page. Those users join with the `no_access` organization role and only get that Resource Group.

External collaborators still go through your organization's access controls ([Resource Groups](./enterprise-resource-groups)).

> [!NOTE]
> With [Managed SSO](./enterprise-advanced-sso), internal members are provisioned through your identity provider (SCIM), so users invited to the organization can only be added as external collaborators.
