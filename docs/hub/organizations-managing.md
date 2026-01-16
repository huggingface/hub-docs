# Managing organizations

## Creating an organization

Visit the [New Organization](https://hf.co/organizations/new) form to create an organization.

## Managing members

New members can be added to an organization by visiting the **Organization settings** and clicking on the **Members** tab. There, you'll be able to generate an invite link, add members individually, or send out email invitations in bulk. If the **Allow requests to join from the organization page** setting is enabled, you'll also be able to approve or reject any pending requests on the **Members** page.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/organizations-members.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/organizations-members-dark.png"/>
</div>

You can also revoke a user's membership or change their role on this page.

### Inviting members with SSO

If SSO is enabled on your organization, a direct join link can be copied and shared with new members. This SSO join link is available in both the **SSO** and **Members** settings tabs. Since organizations with SSO enabled cannot use classic invite links, the SSO join link is the primary method for inviting teammates to your organization. Simply click the copy button to copy the link to your clipboard and share it with the members you want to invite. When recipients click the shared link, they will be able to authenticate via SSO and directly join your organization.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso-join-link.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso-join-link-dark.png"/>
</div>

## Organization domain name

Under the **Account** tab in the Organization settings, you can set an **Organization email domain**. Specifying a domain will allow any user with a matching email address on the Hugging Face Hub to join your organization.

## Leaving an organization

Users can leave an organization visiting their [organization settings](https://huggingface.co/settings/organizations) and clicking **Leave Organization** next to the organization they want to leave. Organization administrators can always remove users as explained above.
