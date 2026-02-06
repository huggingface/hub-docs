# Advanced Single Sign-On (SSO)

> [!WARNING]
> This feature is part of the <a href="https://huggingface.co/contact/sales?from=enterprise" target="_blank">Enterprise Plus</a> plan.

Advanced Single Sign-On (SSO) capabilities extend the standard [SSO features](./security-sso) available in the Enterprise Hub, offering enhanced control and automation for user management and access across the entire Hugging Face platform for your organization members.

## User Provisioning

Advanced SSO introduces automated user provisioning, which simplifies the onboarding and offboarding of users.

*   **Just-In-Time (JIT) Provisioning**: When a user from your organization attempts to log in to Hugging Face for the first time via SSO, an account can be automatically created for them if one doesn't already exist. Their profile information and role mappings can be populated based on attributes from your IdP.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/jit-flow-chart.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/jit-flow-chart-dark.png"/>
</div>

*   **System for Cross-domain Identity Management (SCIM)**: For more robust user lifecycle management, SCIM allows your IdP to communicate user identity information to Hugging Face. This enables automatic creation, updates (e.g., name changes, role changes), and deactivation of user accounts on Hugging Face as changes occur in your IdP. This ensures that user access is always up-to-date with their status in your organization.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/scim-flow-chart.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/scim-flow-chart-dark.png"/>
</div>

Learn more about how to set up and manage SCIM in our [dedicated guide](./enterprise-scim).

## Global SSO Enforcement 

Beyond gating access to specific organizational content, Advanced SSO can be configured to make your IdP the mandatory authentication route for all your organization's members interacting with any part of the Hugging Face platform. Your organization's members will be required to authenticate via your IdP for all Hugging Face services, not just when accessing private or organizational repositories.

This feature is particularly beneficial for organizations requiring a higher degree of control, security, and automation in managing their users on Hugging Face.

## Limitations on Managed User Accounts

> [!WARNING]
> Important Considerations for Managed Accounts.

To ensure organizational control and data governance, user accounts provisioned and managed via Advanced SSO ("managed user accounts") have specific limitations:

*   **No Personal Content Creation**: Managed users cannot create any content (models, datasets, or Spaces) in their personal user namespace. All content must be created within the Organization.
*   **Organization-Bound Collaboration**: Managed users are restricted to collaborating solely within their managing Organization. They cannot join other organizations or contribute to repositories outside of their managing Organization. 
*   **Content Visibility**: Content created by managed users resides within the Organization. While the managed users cannot create public content in their personal profile, they can **create public content within the Organization** if the Organization's settings permit it.

These restrictions maintain your enterprise's security boundaries. For personal projects or broader collaboration outside your organization, members should use a separate, unmanaged Hugging Face account.
