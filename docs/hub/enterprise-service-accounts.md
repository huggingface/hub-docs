# Service Accounts

> [!WARNING]
> This feature is part of the <a href="https://huggingface.co/enterprise">Team & Enterprise</a> plans.

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

Service accounts do not have a password and cannot sign in interactively — they are accessed exclusively through the access tokens you issue for them. They are also hidden from the organization's public member list and are managed only from the **Service Accounts** settings, not from the **Members** settings.

## Managing Access Tokens

A service account's access to your organization is defined entirely by the fine-grained access tokens you issue to it. For each token, you choose a name and a set of fine-grained permissions, so you can grant only the access a given workflow needs.

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

## Billing

Service accounts are not counted as billable members of your organization, so creating them does not consume a paid seat in your subscription.
