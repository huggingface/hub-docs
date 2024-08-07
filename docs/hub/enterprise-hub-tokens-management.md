# Tokens Management

<Tip warning={true}>
This feature is part of the <a href="https://huggingface.co/enterprise" target="_blank">Enterprise Hub</a>.
</Tip>

Tokens Management allows organization administrators to control access tokens within their organization, ensuring that only authorized users have access to organization resources.


## Viewing and Managing Access Tokens

The token listing feature provides a view of all access tokens within your organization. Administrators can:

- Monitor token usage and identify or prevent potential security risks:
  - unauthorized access to private resources ("leak")
  - scopes of access that are too wide
  - improvable token hygienics (tokens that have not been rotated in a long time, for example) 
- Identify inactive or unused tokens that can be revoked

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/tokens-management-list.png" />
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/tokens-management-list-dark.png" />
</div>


Fine-grained tokens can be reviewed to see their permissions:

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/tokens-management-detail.png" />
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/tokens-management-detail-dark.png" />
</div>


## Token policy

With Tokens Management, Enterprise org admins can decide which of the following policies they want to enforce:

| **Policy** | **Unscoped (Read/Write) Access Tokens** | **Fine-Grained Tokens** |
| --- | --- | --- |
| **Allow access via User Access Tokens (default)** | Authorized | Authorized |
| **Only access via fine-grained tokens** | Unauthorized | Authorized |
| **Do not require administrator approval** | Unauthorized | Authorized |
| **Require administrator approval** | Unauthorized | Unauthorized without an approval (except for admin-created) |


<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/tokens-management-policy.png" />
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/tokens-management-policy.png" />
</div>


## Reviewing Token Authorization

When your token policy is set to "Require administrator approval", organization administrators can view the details of all fine-grained tokens with access to resources owned by the organization. They can also revoke access to those tokens. Organization administrators will receive an email when an authorization is requested for a fine-grained token.

When a token is revoked or denied, the user who created the token will receive an email notification.

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/tokens-management-review.png" />
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/tokens-management-review.png" />
</div>
