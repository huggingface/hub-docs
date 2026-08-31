# Advanced Access Control in Organizations with Resource Groups

> [!WARNING]
> This feature is part of the <a href="https://huggingface.co/enterprise">Team & Enterprise</a> plans.

In your Hugging Face organization, you can use Resource Groups to control which members have access to specific repositories.

## How does it work?

Resource Groups allow organization administrators to **group related repositories together**, allowing different teams in your organization to work on independent sets of repositories.

- **Resources**: the group's repositories and collections. Each resource can belong to **only one** Resource Group, and can be moved between groups by members with the appropriate permissions.
- **Members**: organization members **need to be added** to a Resource Group to access its repositories. A member can belong to **several Resource Groups**.

Members are assigned a **role** in each Resource Group that determines their permissions for the group's repositories. Four distinct roles exist for Resource Groups:

- `read`: Grants **read access** to repositories within the Resource Group.
- `contributor`: Provides **write rights limited to the repositories created by the user** (i.e., users can create repos and then modify only those repos). Similar to the 'Write' role, but limited to repos created by the user.
- `write`: Offers **write access to all repositories** in the Resource Group. Users can create, delete, or rename any repository in the Resource Group.
- `admin`: In addition to write permissions on repositories, admin members can **administer the Resource Group**: add, remove, and alter the roles of other members. They can also manage already existing repositories in a Resource Group.

In addition, Organization admins can manage **all resource groups** inside the organization. This includes moving repositories in and out of any Resource Group.

Resource Groups also affect the visibility of private repositories inside the organization:

- A **private** repository that is part of a Resource Group is only visible to **members of that Resource Group**.
- **Public** repositories are visible to **anyone**, inside and outside the organization.
- The same visibility rules apply to private **collections** that belong to a Resource Group.

## Getting started

Head to your Organization's settings, then navigate to the "Resource Groups" entry in the left menu. The page is split in two tabs: **Resource Groups**, where the groups themselves are listed and managed, and **Access settings**, where org admins configure who can create Resource Groups and which members can use specific organization features.

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/org-resource-groups-page.png" alt="The Resource Groups settings page in light mode: the Resource Groups tab is active, with the New Resource Group card and the list of groups in the left sidebar, and the explainer text with role chips on the right"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/org-resource-groups-page-dark.png" alt="The Resource Groups settings page in dark mode: the Resource Groups tab is active, with the New Resource Group card and the list of groups in the left sidebar, and the explainer text with role chips on the right"/>
</div>

Organization admins can create and manage Resource Groups from that page. Depending on the organization's settings, members with lower roles may also be allowed to create Resource Groups (see [Who can create Resource Groups](#who-can-create-resource-groups) below).

After creating a Resource Group and giving it a meaningful name, you land on the group's page. It is organized in four tabs:

- **Overview**: a summary of the group (repository types, member roles, auto-include state and spend limit) along with a preview of its resources and users.
- **Resources**: the full list of the group's repositories and collections, as well as the Jobs billed to the group, with search, sorting and pagination. This is where you add resources to the group.
- **Users**: the group's members and their roles, with search and sorting. This is where you add users and manage their roles.
- **Settings**: the group's auto-include and spend limits configuration.

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/org-resource-group-overview.png" alt="The Overview tab of a Resource Group in light mode: the group name and description, the four tabs (Overview active, Resources, Users, Settings), the summary chips (repository type counts, member role counts, auto-include state, spend limit) and the Resources and Users preview cards with View all links"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/org-resource-group-overview-dark.png" alt="The Overview tab of a Resource Group in dark mode: the group name and description, the four tabs (Overview active, Resources, Users, Settings), the summary chips (repository type counts, member role counts, auto-include state, spend limit) and the Resources and Users preview cards with View all links"/>
</div>

You can start adding repositories and users to the group from the **Resources** and **Users** tabs.

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/org-resource-group-add-resources-modal.png" alt="The Add resources modal in light mode: the repository quick search and a staged repository chip ready to be added"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/org-resource-group-add-resources-modal-dark.png" alt="The Add resources modal in dark mode: the repository quick search and a staged repository chip ready to be added"/>
</div>

> [!TIP]
> When adding users to a Resource Group, you can search by email address if the user has an organization-specific email (e.g., `user@your-company.com`) matching your organization email domain.

Remember that a repository can be part of only one Resource Group. You'll be warned when trying to add a repository that already belongs to another Resource Group.


## Auto-join

Auto-join automatically adds **org members** to a Resource Group at a specified role: both members who are already in the org when auto-join is enabled, and any new members who join in the future.

This is useful for Resource Groups that should be accessible to your entire organization without requiring manual membership management.

### Enabling auto-join

- **Via the UI**: Open the Resource Group's **Settings** tab and check the **Automatically include all org members** option in the **Auto-include org members** section, then select the role to assign. The Users tab also links there, showing whether auto-include is on or off.
- **Via the API**: See [Configure auto-join via API](./programmatic-user-access-control#configure-auto-join-via-api).

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/org-resource-group-auto-include.png" alt="The Auto-include org members section of a Resource Group Settings tab in light mode: the Automatically include all org members checkbox enabled, the Include no_access members option, the default role selector set to read, and the Save button"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/org-resource-group-auto-include-dark.png" alt="The Auto-include org members section of a Resource Group Settings tab in dark mode: the Automatically include all org members checkbox enabled, the Include no_access members option, the default role selector set to read, and the Save button"/>
</div>

When auto-join is enabled on an existing Resource Group, current org members matching the selected scope are **immediately added** to the group at the configured role (backfill).

### Auto-join scope

Auto-join can apply to:

- **All org members**: check **Include no_access members** to include every member, including members with the `no_access` organization role.
- **Read+ members only** (default): leave **Include no_access members** unchecked to exclude members with the `no_access` organization role.

Use **Read+ members only** when `no_access` members should keep access only to the specific Resource Groups where they are added manually or through another provisioning flow.

### Auto-join and SCIM

Auto-join and SCIM management are **mutually exclusive** on the same Resource Group. Auto-join adds org members automatically, while SCIM management means only the IdP controls membership. These two behaviors conflict, so:

- You cannot enable auto-join on a Resource Group that is linked to a SCIM group.
- You cannot link a SCIM group to a Resource Group that has auto-join enabled.

To switch a Resource Group from auto-join to SCIM-managed (or vice versa), disable the current setting first.

## Who can create Resource Groups

By default, only organization admins can create new Resource Groups. Org admins can change this by setting the **minimum member role required to create Resource Groups** in the **Access settings** tab of the Resource Groups settings page.

The available options are:
- **Admins only** (default): only org admins can create Resource Groups.
- **Write+**: members with Write or Admin role can create Resource Groups.
- **Contributor+**: members with Contributor, Write, or Admin role can create Resource Groups.
- **Read+**: any org member can create Resource Groups, except members with the `no_access` organization role.

When a non-admin member creates a Resource Group through the UI, they are automatically added as an **admin** of that newly created group. Through the API, this does not happen automatically, since API callers may be creating groups on behalf of others. Non-admin API callers must include at least one user with the admin role in the group's initial member list.

## Granular feature access

> [!WARNING]
> This feature is part of the <a href="https://huggingface.co/enterprise">Enterprise</a> plan and above.

Org admins can also control who's allowed to use a given organization feature, separately from repository access. The setting lives on the **Access settings** tab of the Resource Groups settings page.

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/feature-access.png" alt="The Granular feature access table in light mode: rounded card with Feature and Who has access columns, one row per feature (Blog, Inference Providers, Inference Endpoints, Jobs, Collections) with an Everyone tag and an edit button at the end of each row"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/dark-feature-access.png" alt="The Granular feature access table in dark mode: rounded card with Feature and Who has access columns, one row per feature (Blog, Inference Providers, Inference Endpoints, Jobs, Collections) with an Everyone tag and an edit button at the end of each row"/>
</div>

The following features can be restricted:

- **Blog**: writing and publishing organization [blog articles](./enterprise-blog-articles).
- **Collections**: creating and editing organization [collections](./collections).
- **Jobs**: running and viewing [Jobs](./jobs) billed to the organization.
- **Inference Endpoints**: creating, managing, and calling Inference Endpoints owned by the organization.
- **Inference Providers**: [Inference Providers](/docs/inference-providers) requests billed to the organization.


For each one, you can pick who has access:

- **Everyone** (default): every member of the organization depending on their organization role.
- **Org admins only**: only organization admins keep access.
- **Specific resource groups**: only members of the selected Resource Groups depending on their role in the group.

Organization admins always keep access to every feature, whichever option is selected. If a feature is restricted to specific resource groups, only members of those groups (and org admins) keep the feature's permission in the organization. For those members the permission applies org-wide, including on resources at the organization's top level, as long as their organization role grants it.

Members without access can no longer use the feature in the organization's context, from the API as well as the UI. API requests return an authorization error. Nothing changes for them under their personal account or in another org.

## Cost attribution

> [!WARNING]
> This feature is part of the <a href="https://huggingface.co/enterprise">Enterprise</a> plan and above.

Resource Groups also serve as a cost attribution unit for compute services. When compute is billed to a resource group, costs are tracked separately per group, making it easier to understand spending across teams.

- **Spaces**: cost is automatically attributed to the resource group the Space belongs to.
- **Jobs**: pass the resource group's ID as the `resourceGroupId` field when creating a job. See [Bill to a resource group](./jobs-pricing#bill-to-a-resource-group).
- **Inference Providers**: pass the resource group's ID via the `X-HF-Bill-To` header (or `bill_to` parameter in the SDK). See [Billing for Team and Enterprise organizations](/docs/inference-providers/pricing#billing-for-team-and-enterprise-organizations).
- **Inference Endpoints**: cost is automatically attributed to the resource group the model repository belongs to. Endpoints instantiated directly from the built-in Inference Endpoints catalog aren't supported at this time.

You can use the <a href="https://huggingface.co/spaces/huggingface/openapi#tag/orgs/GET/api/organizations/&#123;name&#125;/billing/usage-by-resource-group">dedicated API endpoint</a> to retrieve cost attribution data for resource groups.

## Spend limits

> [!WARNING]
> This feature is part of the <a href="https://huggingface.co/enterprise">Enterprise</a> plan and above.

On top of tracking costs, you can cap them. Organization admins and resource group admins can set monthly spending limits in the group's **Settings** tab, under **Spend limits**.

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/org-resource-group-spend-limits.png" alt="The Spend limits section of a Resource Group's Settings tab in light mode: the Total (all products) input with a dollar prefix, the description text, the four per-product inputs (Inference Providers, Spaces, Jobs, Inference Endpoints) and the Save button"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/org-resource-group-spend-limits-dark.png" alt="The Spend limits section of a Resource Group's Settings tab in dark mode: the Total (all products) input with a dollar prefix, the description text, the four per-product inputs (Inference Providers, Spaces, Jobs, Inference Endpoints) and the Save button"/>
</div>

Two kinds of limits are available, both expressed in USD:

- **Total (all products)**: caps the group's combined compute spend.
- A per-product limit for **Inference Providers**, **Spaces**, **Jobs** and **Inference Endpoints**, on top of the total.

Leave a field empty for no limit. When a total limit and a per-product limit both apply, the stricter of the two wins.

Limits apply to the spend attributed to the group for the current calendar month, so a group that hit its limit is unblocked at the beginning of the next month, or as soon as an admin raises the limit.

### What happens when a limit is reached

New usage billed to the resource group is refused with an authorization error:

- **Inference Providers**: requests billed to the group are rejected.
- **Jobs**: creating, resubmitting or resuming a job in the group is rejected, scheduled jobs included.
- **Spaces**: upgrading a Space in the group to paid hardware is rejected.
- **Inference Endpoints**: requests to endpoints that incur cost for the group are rejected.

Workloads that are already running in the group are stopped as well, shortly after the limit is reached:

- Paid **Spaces** are paused. Spaces on free hardware are left alone, and so are Spaces running on a [hardware grant](./spaces-gpus).
- **Jobs** are cancelled, with `Resource group spend limit reached` as their stop reason.

Raising the limit, or the start of a new month, lets members start new workloads again. Spaces and Jobs that were stopped are not restarted automatically.

You can also set spend limits programmatically, see [Set spend limits via API](./programmatic-user-access-control#set-spend-limits-via-api).

## Resource Groups API

You can list resource groups and add users to them (or change a member's org role and resource group assignments) via the Hub API. For the full reference, examples, and batch workflows, see the [Programmatic User Access Control Management](./programmatic-user-access-control) guide.
