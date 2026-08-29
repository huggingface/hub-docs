# Service Accounts

> [!WARNING]
> This feature is part of the <a href="https://huggingface.co/enterprise">Enterprise</a> and <a href="https://huggingface.co/contact/sales?from=enterprise" target="_blank">Enterprise Plus</a> plans.

Service accounts are organization-owned identities designed for programmatic access to your organization's resources, such as CI/CD pipelines, automation scripts, and backend integrations. Unlike a personal member account, a service account is not tied to an individual person: it belongs to the organization and is managed by its administrators.

Because a service account is decoupled from any individual, it keeps automated workflows running even as people join or leave the organization, and it lets you scope and rotate credentials without affecting any member's personal tokens.

## Creating a Service Account

As an organization administrator, go to the **Service Accounts** section of your organization settings to create and manage service accounts.

<div class="flex justify-center">
  <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/enterprise/service-account-create.png" alt="Creating a new service account from the organization settings."/>
  <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/enterprise/dark-service-account-create.png" alt="Creating a new service account from the organization settings."/>
</div>

When creating a service account, you provide:

- A **name** to identify the service account.
- An optional **description** to document what the service account is used for.

Service accounts do not have a password and cannot sign in interactively — they are accessed exclusively through the access tokens you issue for them. Unlike regular users, they also don't have an HF profile page, aren't part of the organization's member list, and are managed only through the **Service Accounts** settings.

## Managing Access Tokens

A service account's access to your organization is defined entirely by the fine-grained access tokens you issue to it. For each token, you choose a name and a set of fine-grained permissions, so you can grant only the access a given workflow needs.

Permissions can be granted at two levels:

- **Organization-wide** — apply a permission (for example, read or write access to repository contents) across all repositories in the organization.
- **Per-repository** — scope read or write access to specific repositories only. Search for and select the repositories the token should apply to, then choose the permissions to grant. Selected repositories must be owned by the organization or be public.

This lets you issue narrowly scoped tokens — for example, a token that can only read a single model repository — rather than granting access to the entire organization.

<div class="flex justify-center">
  <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/enterprise/service-account-create-token.png" alt="Creating a new access token with fine-grained permissions for a service account."/>
  <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/enterprise/dark-service-account-create-token.png" alt="Creating a new access token with fine-grained permissions for a service account."/>
</div>

From the service account's page, administrators can:

- **Create** a new access token with a chosen name and fine-grained permissions.
- **Update** an existing token's name or permissions.
- **Rotate** a token to replace it with a new value. The previous token stops working immediately, which is useful if a credential may have been exposed.
- **Delete** a token to permanently revoke its access.

> [!WARNING]
> An access token is only displayed once, at the time it is created or rotated. Store it securely — it cannot be retrieved later. If you lose it, rotate the token to generate a new value.

### Network Security exemption

> [!WARNING]
> This option is part of the <a href="https://huggingface.co/contact/sales?from=enterprise" target="_blank">Enterprise Plus</a> plan.

If your organization uses [Network Security](./enterprise-network-security) settings, service account tokens are subject to them like any other credential: they only work from your organization's IP ranges, and the Content Access Policy applies to what they can reach.

Some automated workflows run outside your corporate network — for example, a CI job hosted by a cloud provider. For those cases, you can exempt an individual token from your organization's Network Security enforcement with the **Bypass IP restrictions and the Content Access Policy** option in the token form.

When enabled:

- The token works from any IP address, even when **Restrict organization access to your IP ranges only** is on.
- The token can reach content that your organization's Content Access Policy would otherwise block.
- The exemption only applies to your own organization's Network Security settings. It never bypasses another organization's policy.
- The token is listed with a **No IP restrictions** badge on the service account's page.
- Rotating the token preserves the exemption.

Only organization admins can enable the exemption or rotate a token that is already exempt. If you automate this through the API, the token also needs the `org.networkSecurity.write` permission.

Because an exempt token is no longer protected by your network perimeter, the token itself becomes the only credential guarding the resources it can reach. We recommend scoping it to the smallest possible set of repositories, granting read-only permissions where that is sufficient, and rotating it regularly.

## Billing

Service accounts are not counted as billable members of your organization, so creating them does not consume a paid seat in your plan.
