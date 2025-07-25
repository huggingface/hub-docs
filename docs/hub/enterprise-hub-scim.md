# User Provisioning (SCIM)

<Tip warning={true}>
This feature is part of the <a href="https://huggingface.co/contact/sales?from=enterprise" target="_blank">Enterprise Plus</a> plan.
</Tip>

SCIM, or System for Cross-domain Identity Management, is a standard for automating user provisioning. It allows you to connect your Identity Provider (IdP) to Hugging Face to automatically manage your organization's members.

With SCIM, you can:
- **Provision users**: Automatically create user accounts in your Hugging Face organization when they are assigned the application in your IdP.
- **Update user attributes**: Changes made to user profiles in your IdP (like name or email) are automatically synced to Hugging Face.
- **Provision groups**: Create groups in your Hugging Face organization based on groups in your IdP.
- **Deprovision users**: Automatically deactivate user accounts in your Hugging Face organization when they are unassigned from the application or deactivated in your IdP.

This ensures that your Hugging Face organization's member list is always in sync with your IdP, streamlining user lifecycle management and improving security.

## How to enable SCIM

To enable SCIM, go to your organization's settings, navigate to the **SSO** tab, and then select the **SCIM** sub-tab.

You will find the **SCIM Tenant URL** and a button to generate an **access token**. You will need both of these to configure your IdP. The SCIM token is a secret and should be stored securely in your IdP's configuration.

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/scim-settings.png"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/scim-settings-dark.png"/>
</div>

Once SCIM is enabled in your IdP, users and groups provisioned will appear in the "Users Management" and "SCIM" tabs respectively.

## Supported Identity Providers

We support SCIM with any IdP that implements the SCIM 2.0 protocol. We have specific guides for some of the most popular providers:
- [How to configure SCIM with Microsoft Entra ID](./security-sso-entra-id-scim)