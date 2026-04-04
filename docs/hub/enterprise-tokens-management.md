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

Revoked tokens are hidden from the listing by default. If any tokens have been revoked, a **Show revoked tokens** toggle appears above the list to include them in the view.

Token status badges (**PENDING**, **APPROVED**, **DENIED**, **REVOKED**) are shown for any token that has an authorization record — even in organizations not using the "Require administrator approval" policy (for example, a token that has been revoked will show its status regardless of the current policy).

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

When token policy is set to "Require administrator approval", organization administrators can review details of all fine-grained tokens accessing organization-owned resources and approve or deny access. When a new token enters the pending state, up to 5 organization administrators with confirmed email addresses receive a notification with a direct link to the token review page. No notification is sent when a token is auto-approved (e.g., because the creator is an org admin).

- **Pending** tokens are awaiting an administrator decision
- **Approved** tokens have been authorized and are active
- **Denied** tokens have been blocked from accessing organization resources

When a token is approved or denied, the token owner receives an email notification.

Denial is not permanent: a denied token can later be approved by an administrator, restoring its access. Likewise, an already-approved token can be denied at any time, which removes its approval-based access immediately.

> [!NOTE]
> Tokens created or updated by organization administrators are automatically approved and skip the review queue. This is determined by the creator's org role at the time of creation or permission change — if a member later creates a token with the same scope, it will enter the pending state as normal.

> [!NOTE]
> Token names are only visible to administrators when the "Require administrator approval" policy is enabled.

### What members see when blocked

Members whose tokens are pending or denied receive a `403` error when accessing organization resources:

> *"Due to the organization token policy, your token needs to be approved by the organization before you can access this resource."*

The error message is the same for both pending and denied states — members are not told specifically that their token was denied. To see the actual status, members must navigate to the individual token's edit page (the token list page does not show authorization status).

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/tokens-management-review.png" />
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/tokens-management-review-dark.png" />
</div>

## Deny vs. Revoke

Administrators have two ways to remove a token's access to an organization:

| | **Deny** | **Revoke** |
|---|---|---|
| **Plan** | Team & Enterprise | Enterprise plan and above |
| **Scope** | Operates within the approval workflow | Independent of the token policy |
| **Effect** | Blocks or removes approval-based access | Forcefully removes access regardless of policy or token state |
| **Reversible?** | Yes — a denied token can later be approved | No — revoked status persists even if the policy changes |
| **Token elsewhere** | No effect outside the org | No effect outside the org |

Use **deny** when managing access within the approval workflow (the token transitions to a `denied` state and can be re-approved later). Use **revoke** when you need to permanently cut off a token's access to the organization — for example, when a token has leaked or an employee has left.

## Revoking Tokens

> [!WARNING]
> This feature is part of the <a href="https://huggingface.co/enterprise">Enterprise</a> plan and above.

Organization administrators can revoke any member's access token from the token detail page. Revocation is available regardless of whether the organization uses the "Require administrator approval" policy. A revoked token can no longer access the organization's resources, but continues to work elsewhere. The token owner receives an email notification upon revocation.

Revoked tokens remain revoked even if the organization's token policy is later changed or disabled. Revocation is permanent at the organization level — there is no un-revoke action. If a member needs access restored, they must delete the revoked token and create a new one. If the organization uses the "Require administrator approval" policy, the new token will start in the pending state and require admin approval.

Revocation blocks access to all of the organization's resources — repositories, datasets, spaces, models, and inference endpoints. The token continues to work normally outside of that organization.

The `403` error message a member sees depends on whether the organization uses the "Require administrator approval" policy:

- **Without approval policy:** Members see the revoked-specific message: *"Your token has been revoked by the organization administrator, you can no longer access organization resources. Please contact them for more information."*
- **With approval policy:** The revoked state is caught by the approval check first, so members see the same message as pending or denied tokens: *"Due to the organization token policy, your token needs to be approved by the organization before you can access this resource."* Revocation and denial are not distinguished in this message.

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
