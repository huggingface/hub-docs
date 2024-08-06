# Tokens Management

<Tip warning={true}>
This feature is part of the <a href="https://huggingface.co/enterprise" target="_blank">Enterprise Hub</a>.
</Tip>

Tokens Management allows organization administrators to control access tokens within their organization, ensuring that only authorized users have access to organization resources.


## Viewing and Managing Access Tokens

The token listing feature provides a view of all access tokens within your organization. Administrators can:

* Monitor token usage and identify potential security risks
* Identify inactive or unused tokens that can be revoked

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/tokens-management-list.png" />
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/tokens-management-list-dark.png" />
</div>


Each fine-grained token can be reviewed to see their permissions

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/tokens-management-detail.png" />
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/tokens-management-detail-dark.png" />
</div>


## Token policy

| **Policy** | **Personal Access Tokens Status** | **Fine-Grained Tokens Status** |
| --- | --- | --- |
| **Allow access via User Access Tokens** | Authorized | Authorized |
| **Only access via fine-grained tokens** | Unauthorized | Authorized |
| **Do not require administrator approval** | Unauthorized | Authorized |
| **Require administrator approval** | Unauthorized | Unauthorized without an approval (except for admin-created) |


<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/tokens-management-policy.png" />
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/tokens-management-policy.png" />
</div>


## Reviewing Token Authorization

If your token policy requires an approval before accessing your resources, organization administrators can view all fine-grained tokens that can access resources owned by the organization. Organization owners can also revoke access by fine-grained personal access tokens. Organization administrators will receive an email when an authorization is requested.

When a token is revoked or denied, the user who created the token will receive an email notification.

Organization owners can only view and revoke fine-grained personal access tokens, not personal access tokens.


<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/tokens-management-review.png" />
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/tokens-management-review.png" />
</div>
