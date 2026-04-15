# Tokens Management

> [!WARNING]
> This feature is part of the <a href="https://huggingface.co/enterprise">Team & Enterprise</a> plans.

Tokens Management enables organization administrators to oversee access tokens within their organization, ensuring secure access to organization resources.

> [!NOTE]
> For the member experience when token management policies are in effect — including how to check token status, what errors to expect, and how denial and revocation affect a token — see [Tokens in organizations with token management policies](./security-tokens#tokens-in-organizations-with-token-management-policies).

## Viewing and Managing Access Tokens

The token listing feature displays all access tokens within your organization. Administrators can:

- Monitor token usage and identify or prevent potential security risks:
  - Unauthorized access to private resources ("leaks")
  - Overly broad access scopes
  - Suboptimal token hygiene (e.g., tokens that have not been rotated in a long time)
- Identify inactive or unused tokens

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/tokens-management-list.png" />
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/tokens-management-list-dark.png" />
</div>

Fine-grained tokens display their specific permissions:

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/tokens-management-detail.png" />
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/tokens-management-detail-dark.png" />
</div>

Revoked tokens are hidden from the listing by default. Use the **Show revoked tokens** toggle above the list to include them in the view.

A **REVOKED** status badge is shown for any revoked token regardless of the organization's token policy. **PENDING**, **APPROVED**, and **DENIED** badges only appear in organizations with the "Require administrator approval" policy enabled, as those states are only created by the approval flow.

## Token Policy

Team & Enterprise organization administrators can enforce the following policies:

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

When token policy is set to "Require administrator approval", organization administrators can review details of all fine-grained tokens accessing organization-owned resources and approve or deny access. When a new token enters the pending state, up to 5 organization administrators with confirmed email addresses receive a notification with a direct link to the token review page. No notification is sent when a token is auto-approved (e.g., because the creator is an org admin).

- **Pending** tokens are awaiting an administrator decision
- **Approved** tokens have been authorized and are active
- **Denied** tokens have been blocked from accessing organization resources

When a token is approved or denied, the token owner receives an email notification.

Denial is not permanent: a denied token can later be approved by an administrator, restoring its access. Likewise, an already-approved token can be denied at any time, which removes its approval-based access immediately.

> [!NOTE]
> Token names are only visible to administrators when the "Require administrator approval" policy is enabled.

### What Members See When Blocked

Members whose tokens are pending or denied receive a `403` error when accessing organization resources: _"Due to the organization token policy, your token needs to be approved by the organization before you can access this resource."_

The error message is the same for both pending and denied states. To see the status, members can navigate to the individual token's edit page. The organization administrator token management settings page shows status badges for all member tokens.

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/tokens-management-review.png" />
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/tokens-management-review-dark.png" />
</div>

## Deny vs. Revoke

Administrators have two ways to remove a token's access to an organization:

| **Aspect**          | **Deny**                                   | **Revoke**                                                    |
| ------------------- | ------------------------------------------ | ------------------------------------------------------------- |
| **Plan**            | Team & Enterprise                          | Enterprise plan and above                                     |
| **Scope**           | Operates within the approval workflow      | Independent of the token policy                               |
| **Effect**          | Blocks or removes approval-based access    | Forcefully removes access regardless of policy or token state |
| **Reversible?**     | Yes — a denied token can later be approved | No — revoked status persists even if the policy changes       |
| **Token elsewhere** | No effect outside the org                  | No effect outside the org                                     |

Use **deny** when managing access within the approval workflow (the token transitions to a `denied` state and can be re-approved later). Use **revoke** when you need to permanently cut off a token's access to the organization.

## Revoking Tokens

> [!WARNING]
> This feature is part of the <a href="https://huggingface.co/enterprise">Enterprise</a> plan and above.

Organization administrators can revoke any member's access token from the token detail page. Revocation is available regardless of whether the organization uses the "Require administrator approval" policy. A revoked token can no longer access the organization's resources, but continues to work elsewhere. The token owner receives an email notification upon revocation.

Revoked tokens remain revoked even if the organization's token policy is later changed or disabled. Revocation is permanent at the organization level — there is no un-revoke action. If a member needs access restored, they must delete the revoked token and create a new one. If the organization uses the "Require administrator approval" policy, the new token will start in the pending state and require admin approval.

Members whose tokens have been revoked receive a `403` error with the message: _"Your token has been revoked by the organization administrator, you can no longer access organization resources. Please contact them for more information."_ This message is shown regardless of whether the organization uses the "Require administrator approval" policy.

### Revoking via API

Administrators can also revoke a token programmatically by providing the raw token value. This is useful for automated workflows such as secrets scanning, where a leaked token is detected and needs to be revoked immediately.

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

An administrator cannot revoke their own token (`LEAKED_HF_TOKEN` cannot have the same value as `ADMIN_HF_TOKEN` in the snippet above).

## Programmatic Token Issuance

For organizations that need to programmatically issue access tokens for their members (e.g., for internal platforms, CI/CD pipelines, or custom integrations), see [OAuth Token Exchange](./oauth#token-exchange-for-organizations-rfc-8693). This Enterprise plan feature allows your backend services to issue scoped tokens for organization members without requiring interactive user consent.
