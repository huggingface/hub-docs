# Advanced Access Control in Organizations with Resource Groups

> [!WARNING]
> This feature is part of the <a href="https://huggingface.co/enterprise">Team & Enterprise</a> plans.

In your Hugging Face organization, you can use Resource Groups to control which members have access to specific repositories.

## How does it work?

Resource Groups allow organization administrators to group related repositories together, allowing different teams in your organization to work on independent sets of repositories.

A repository can belong to only one Resource Group.

Organizations members need to be added to the Resource Group to access its repositories. An Organization Member can belong to several Resource Groups.

Members are assigned a role in each Resource Group that determines their permissions for the group's repositories. Four distinct roles exist for Resource Groups:

- `read`: Grants read access to repositories within the Resource Group.
- `contributor`: Provides extra write rights to the subset of the Organization's repositories created by the user (i.e., users can create repos and then modify only those repos). Similar to the 'Write' role, but limited to repos created by the user.
- `write`: Offers write access to all repositories in the Resource Group. Users can create, delete, or rename any repository in the Resource Group.
- `admin`: In addition to write permissions on repositories, admin members can administer the Resource Group — add, remove, and alter the roles of other members. They can also manage already existing repositories in a Resource Group.

In addition, Organization admins can manage all resource groups inside the organization. This includes moving repositories in and out of any Resource Group.

Resource Groups also affect the visibility of private repositories inside the organization. A private repository that is part of a Resource Group will only be visible to members of that Resource Group. Public repositories, on the other hand, are visible to anyone, inside and outside the organization.

## Getting started

Head to your Organization's settings, then navigate to the "Resource Group" tab in the left menu.

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/org-resource-groups-page.png"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/org-resource-groups-page-dark.png"/>
</div>

Organization admins can create and manage Resource Groups from that page. Depending on the organization's settings, members with lower roles may also be allowed to create Resource Groups (see [Who can create Resource Groups](#who-can-create-resource-groups) below).

After creating a Resource Group and giving it a meaningful name, you can start adding repositories and users to it.

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/org-resource-groups-manage-empty-page.png"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/org-resource-groups-manage-empty-page-dark.png"/>
</div>

> [!TIP]
> When adding users to a Resource Group, you can search by email address if the user has an organization-specific email (e.g., `user@your-company.com`) matching your organization email domain.

Remember that a repository can be part of only one Resource Group. You'll be warned when trying to add a repository that already belongs to another Resource Group.

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/org-resource-groups-manage-move-repo.png"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/org-resource-groups-manage-move-repo-dark.png"/>
</div>

## Auto-join

Auto-join automatically adds **every org member** to a Resource Group at a specified role — both members who are already in the org when auto-join is enabled, and any new members who join in the future.

This is useful for Resource Groups that should be accessible to your entire organization without requiring manual membership management.

### Enabling auto-join

**Via the UI**: Open the Resource Group's settings page and check the **Include all org members** option, then select the role to assign.

**Via the API**: See [Configure auto-join via API](./programmatic-user-access-control#configure-auto-join-via-api).

When auto-join is enabled on an existing Resource Group, all current org members are **immediately added** to the group at the configured role (backfill).

### Auto-join and SCIM

Auto-join and SCIM management are **mutually exclusive** on the same Resource Group. Auto-join adds every org member automatically; SCIM management means only the IdP controls membership. These two behaviors conflict, so:

- You cannot enable auto-join on a Resource Group that is linked to a SCIM group.
- You cannot link a SCIM group to a Resource Group that has auto-join enabled.

To switch a Resource Group from auto-join to SCIM-managed (or vice versa), disable the current setting first.

## Who can create Resource Groups

By default, only organization admins can create new Resource Groups. Org admins can change this by setting the **minimum member role required to create Resource Groups** on the Resource Groups settings page.

The available options are:
- **Admins only** (default) — only org admins can create Resource Groups.
- **Write** — members with Write or Admin role can create Resource Groups.
- **Contributor** — members with Contributor, Write, or Admin role can create Resource Groups.
- **Read+** — any org member can create Resource Groups.

When a non-admin member creates a Resource Group through the UI, they are automatically added as an **admin** of that newly created group. Through the API, this does not happen automatically, since API callers may be creating groups on behalf of others. Non-admin API callers must include at least one user with the admin role in the group's initial member list.

## Resource Groups API

You can list resource groups and add users to them (or change a member's org role and resource group assignments) via the Hub API. For the full reference, examples, and batch workflows, see the [Programmatic User Access Control Management](./programmatic-user-access-control) guide.
