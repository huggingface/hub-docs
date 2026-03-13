# Tokens Management

> [!WARNING]
> This feature is part of the <a href="https://huggingface.co/enterprise">Team & Enterprise</a> plans.

Tokens Management enables organization administrators to oversee access tokens within their organization, ensuring secure access to organization resources.

## Viewing and Managing Access Tokens

The token listing feature displays all access tokens within your organization. Administrators can:

- Monitor token usage and identify or prevent potential security risks:
  - Unauthorized access to private resources ("leaks")
  - Overly broad access scopes
  - Suboptimal token hygiene (e.g., tokens that have not been rotated in a long time)
- Identify and revoke inactive or unused tokens

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/tokens-management-list.png" />
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/tokens-management-list-dark.png" />
</div>

Fine-grained tokens display their specific permissions:

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/tokens-management-detail.png" />
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/tokens-management-detail-dark.png" />
</div>

## Token Policy

Enterprise organization administrators can enforce the following policies:

| **Policy**                                        | **Unscoped (Read/Write) Access Tokens** | **Fine-Grained Tokens**                                     |
| ------------------------------------------------- | --------------------------------------- | ----------------------------------------------------------- |
| **Allow access via User Access Tokens (default)** | Authorized                              | Authorized                                                  |
| **Only access via fine-grained tokens**           | Unauthorized                            | Authorized                                                  |
| **Require administrator approval**                | Unauthorized                            | Unauthorized without an approval (except for admin-created) |

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/tokens-management-policy.png" />
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/tokens-management-policy-dark.png" />
</div>

## Reviewing Token Authorization

When token policy is set to "Require administrator approval", organization administrators can review details of all fine-grained tokens accessing organization-owned resources and approve or deny access. Administrators receive email notifications for token authorization requests.

- **Pending** tokens are awaiting an administrator decision
- **Approved** tokens have been authorized and are active
- **Denied** tokens were rejected before ever being granted access
- **Revoked** tokens were previously approved but have since had their access removed

When a token is denied or revoked, the user who created the token receives an email notification.

> [!NOTE]
> Token names are only visible to administrators when the "Require administrator approval" policy is enabled.

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/tokens-management-review.png" />
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/tokens-management-review-dark.png" />
</div>

## Revoking a Token via API

Organization administrators can revoke a member's access token programmatically by providing the raw token value. This is useful for automated workflows such as secrets scanning, where a leaked token is detected and needs to be revoked immediately.

```bash
# ORG_NAME should be your organization name and ADMIN_HF_TOKEN an admin's access token
# LEAKED_HF_TOKEN should contain the raw token value to revoke
curl -X POST "https://huggingface.co/api/organizations/${ORG_NAME}/settings/tokens/revoke" \
  -H "Authorization: Bearer ${ADMIN_HF_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{"token": "${LEAKED_HF_TOKEN}"}'
```

> [!TIP]
> To avoid leaking token values in shell history or logs, pass them via environment variables or files, and avoid pasting raw tokens directly into command lines.

Key behaviors:

- The token is not deleted — it is only revoked from accessing the organization's resources and will continue to work elsewhere
- The token owner receives an email notification upon revocation
- An administrator cannot revoke their own token (`LEAKED_HF_TOKEN` cannot have the same value as `ADMIN_HF_TOKEN` in the snippet above)
- This endpoint is available on Team & Enterprise plans

## Programmatic Token Issuance

For organizations that need to programmatically issue access tokens for their members (e.g., for internal platforms, CI/CD pipelines, or custom integrations), see [OAuth Token Exchange](./oauth#token-exchange-for-organizations-rfc-8693). This Enterprise plan feature allows your backend services to issue scoped tokens for organization members without requiring interactive user consent.
