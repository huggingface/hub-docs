# Audit Logs

> [!WARNING]
> This feature is part of the <a href="https://huggingface.co/enterprise">Team & Enterprise</a> plans.

Audit Logs enable organization admins to easily review actions taken by members, including organization membership, repository settings and billing changes.

<div class="flex justify-center" style="max-width: 550px">
  <img
    class="block dark:hidden m-0!"
    src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/enterprise/audit-logs.png"
    alt="screenshot of Hugging Face Audit Logs feature"
  />
  <img
    class="hidden dark:block m-0!"
    src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/enterprise/dark-audit-logs.png"
    alt="screenshot of Hugging Face Audit Logs feature"
  />
</div>

## Accessing Audit Logs

Audit Logs are accessible through your organization settings. Each log entry includes:

- Who performed the action
- What type of action was taken
- A description of the change
- Location and anonymized IP address
- Date and time of the action

You can also download the complete audit log as a JSON file for further analysis.

### Export via API

Programmatic export is available at:

```
GET https://huggingface.co/api/organizations/{org}/audit-log/export
```

Authenticate with a user access token or service-account token that has the **Export the audit log** permission (`org.auditLog.write`) for the organization. The response is a JSON array of log entries, identical to the file downloaded from the settings page. Like the manual export, the API call is recorded as `org.audit_log.export`.

The endpoint is also documented in the <a href="https://huggingface.co/spaces/huggingface/openapi#tag/orgs/GET/api/organizations/%7Bname%7D/audit-log/export">OpenAPI reference</a>.

## What Events Are Tracked?

Each action has an **event name** in `scope.action` format (e.g. `repo.create`, `collection.delete`). This is the `type` field in each log entry and in the exported JSON—use it when searching or filtering logs.

### Organization Management & Security

  > [!TIP]
  > The **Settings changes** events below are only available for actions taken after June 16th, 2026. Events before that date use a unique `org.update_settings` event type. Any integration that filters or parses the event `type` field for orgs created before June 16th, 2026, should handle both.

- **Core organization changes** — Creation, deletion, restoration, and renaming.
  - **Events:** `org.create`, `org.delete`, `org.restore`, `org.rename`
- **Settings changes** — Updates to organization settings are recorded as granular `org.settings.*` events, so you can pinpoint exactly which setting changed.
  - General settings — Profile, storage regions, resource groups, and publisher gating.
  - **Events:** `org.settings.profile`, `org.settings.regions`, `org.settings.resource_groups`, `org.settings.publisher_gating`
  - Inference providers — Provider configuration, API key add/remove, and usage settings.
  - **Events:** `org.settings.inference_providers`, `org.settings.inference_providers.keys.add`, `org.settings.inference_providers.keys.remove`, `org.settings.inference_providers.usage`
  - SSO — SSO configuration updates, and enabling or disabling SSO.
  - **Events:** `org.settings.sso`, `org.settings.sso.enable`, `org.settings.sso.disable`
  - Security — Default repository visibility, and enabling or disabling 2FA enforcement, automatic join, and member privacy.
  - **Events:** `org.settings.security.repo_visibility`, `org.settings.security.2fa.enable`, `org.settings.security.2fa.disable`, `org.settings.security.auto_join.enable`, `org.settings.security.auto_join.disable`, `org.settings.security.members_privacy.enable`, `org.settings.security.members_privacy.disable`
  - Network — Network configuration updates, and enabling or disabling IP access restriction and authentication enforcement.
  - **Events:** `org.settings.network`, `org.settings.network.ip_restriction.enable`, `org.settings.network.ip_restriction.disable`, `org.settings.network.auth_enforcement.enable`, `org.settings.network.auth_enforcement.disable`


- **Security management**
  - Organization API token rotation.
  - **Event:** `org.rotate_token`
  - Token approval system — Enabling or disabling the policy, authorization requests, approvals, denials, and revocations.
  - **Events:** `org.token_approval.enabled`, `org.token_approval.disabled`, `org.token_approval.authorization_request`, `org.token_approval.authorization_request.authorized`, `org.token_approval.authorization_request.revoked`, `org.token_approval.authorization_request.denied`
  - SSO — Logins and joins via SSO.
  - **Events:** `org.sso_login`, `org.sso_join`
- **Join settings** — Domain-based access and automatic join configuration.
  - **Event:** `org.update_join_settings`

### Membership and Access Control

- **Member lifecycle** — Adding and removing members, role changes, and members leaving the organization.
  - **Events:** `org.add_user`, `org.remove_user`, `org.change_role`, `org.leave`
- **Account type** — Converting a member into an [external collaborator](./security-sso-user-management#external-collaborators), or back into a member.
  - **Event:** `org.change_account_type`
- **Invitations** — Sending invites, invitation links by email, and users accepting invites.
  - **Events:** `org.invite_user`, `org.invite.accept`, `org.invite.email`
- **Automatic joins** — Joins via verified email domain or “request access”.
  - **Events:** `org.join.from_domain`, `org.join.automatic`

### Service Accounts

- **Service account lifecycle**: Creation and deletion of service accounts.
  - **Events:** `org.service_account.create`, `org.service_account.delete`
- **Service account tokens**: Token creation, deletion, rotation, and updates (name, permissions, network security exemption), plus generation and revocation of the S3 credentials paired with a token.
  - **Events:** `org.service_account.token.create`, `org.service_account.token.delete`, `org.service_account.token.rotate`, `org.service_account.token.update`, `org.service_account.token.s3_credential.create`, `org.service_account.token.s3_credential.delete`

### OAuth Apps

- **OAuth app management** — Creation, updates (name, URLs, scopes, or token expiration), and deletion of [OAuth apps](./oauth#organization-owned-oauth-apps) owned by the organization, including its [Token Exchange app](./oauth#token-exchange-for-organizations-rfc-8693), and transfers of a member's personal app to the organization. Logo changes are not recorded.
  - **Events:** `oauth.app.create`, `oauth.app.update`, `oauth.app.delete`, `oauth.app.move`
- **Client secret** — Rotating the client secret (or adding one to a public app), removing it, and expiration of the secret by Hugging Face.
  - **Events:** `oauth.app.secret.rotate`, `oauth.app.secret.delete`, `oauth.app.secret.expire`
- **Token issuance** — Tokens issued to members through the organization's [Token Exchange](./oauth#token-exchange-for-organizations-rfc-8693) app.
  - **Event:** `oauth.token`

### Content and Resource Management

- **Repository administration** — Creation, deletion, moving, disabling/re-enabling, duplication settings, DOI removal, resource group assignment, and general repo settings (visibility, gating, discussions, etc.). Also LFS file deletion.
  - **Events:** `repo.create`, `repo.delete`, `repo.move`, `repo.disable`, `repo.removeDisable`, `repo.duplication`, `repo.delete_doi`, `repo.update_resource_group`, `repo.update_settings`, `repo.delete_lfs_file`
- **Collections** — Creation and deletion of collections.
  - **Events:** `collection.create`, `collection.delete`
- **Repository security** — Secrets and variables (individual and bulk add/update/remove).
  - **Events (secrets):** `repo.add_secret`, `repo.update_secret`, `repo.remove_secret`, `repo.add_secrets`, `repo.remove_secrets`
  - **Events (variables):** `repo.add_variable`, `repo.update_variable`, `repo.remove_variable`, `repo.add_variables`, `repo.remove_variables`
- **Spaces configuration** — Storage tier changes, hardware (flavor) updates, and sleep time adjustments.
  - **Events:** `spaces.add_storage`, `spaces.remove_storage`, `spaces.update_hardware`, `spaces.update_sleep_time`

### Resource Groups

- **Resource group administration** — Creation, deletion, and settings changes.
  - **Events:** `resource_group.create`, `resource_group.delete`, `resource_group.settings`
- **Resource group members** — Adding and removing users, and role changes.
  - **Events:** `resource_group.add_users`, `resource_group.remove_users`, `resource_group.change_role`
- **Resource group invitations** — Inviting users from outside the organization into a resource group, and revoking those invitations.
  - **Events:** `resource_group.invite_user`, `resource_group.invite.revoke`

### Jobs and Scheduled Jobs

- **Jobs** — Job creation (e.g. on a Space) and cancellation.
  - **Events:** `jobs.create`, `jobs.cancel`
- **Scheduled jobs** — Creating, deleting, resuming, suspending, and triggering runs.
  - **Events:** `scheduled_job.create`, `scheduled_job.delete`, `scheduled_job.resume`, `scheduled_job.suspend`, `scheduled_job.run`

### Billing and Cloud Integration

- **Payment and customers** — Payment method updates, attachment, and removal; customer account creation.
  - **Events:** `billing.update_payment_method`, `billing.create_customer`, `billing.remove_payment_method`
- **Cloud marketplaces** — AWS and GCP marketplace linking/unlinking and marketplace approval.
  - **Events:** `billing.aws_add`, `billing.aws_remove`, `billing.gcp_add`, `billing.gcp_remove`, `billing.marketplace_approve`
- **Subscriptions** — Starting, renewing, cancelling, reactivating, and updating subscriptions (including plan and contract details).
  - **Events:** `billing.start_subscription`, `billing.renew_subscription`, `billing.cancel_subscription`, `billing.un_cancel_subscription`, `billing.update_subscription`, `billing.update_subscription_plan`, `billing.update_subscription_contract_details`

## Event reference

The list above covers every event type shown in the audit log UI and export. Event names follow the `scope.action` pattern; scopes include `org`, `repo`, `collection`, `spaces`, `resource_group`, `jobs`, `scheduled_job`, `oauth`, and `billing`. The export action itself is recorded as `org.audit_log.export` but that event is not included in the default audit log view.
