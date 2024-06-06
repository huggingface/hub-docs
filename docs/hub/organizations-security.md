# Access control in organizations

<Tip>

You can set up [Single Sign-On (SSO)](./security-sso) to be able to map access control rules from your organization's Identity Provider.

</Tip>

<Tip>

Advanced and more fine-grained access control can be achieved with [Resource Groups](./security-resource-groups).

The Resource Group feature is part of the <a href="https://huggingface.co/enterprise" target="_blank">Enterprise Hub</a>.

</Tip>

Members of organizations can have four different roles: `read`, `contributor`, `write` or `admin`:

- `read`: read-only access to the Organization's repos and metadata/settings (eg, the Organization's profile, members list, API token, etc).

- `contributor`: additional write rights to the subset of the Organization's repos that were created by the user. I.e., users can create repos and _then_ modify only those repos. This is similar to the `write` role, but scoped to repos _created_ by the user.

- `write`: write rights to all the Organization's repos. Users can create, delete or rename any repo in the Organization namespace. A user can also edit and delete files from the browser editor and push content with `git`.

- `admin`: in addition to write rights on repos, admin members can update the Organization's profile, refresh the Organization's API token, and manage Organization members.

As an organization `admin`, go to the **Members** section of the org settings to manage roles for users.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/org-members-page.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/org-members-page-dark.png"/>
</div>


## Viewing members' email address

<Tip warning={true}>
This feature is part of the <a href="https://huggingface.co/enterprise" target="_blank">Enterprise Hub</a>.
</Tip>

You may be able to view the email addresses for members of your organization. The visibility of the email addresses depends on the organization's sso configuration.

- If you verify a domain for your organization, you can view members' email addresses for the verified domain. [Organization domain name](./organizations-managing#organization-domain-name)
- If SSO is configured for your organization, you can view the email address for each of your organization members by setting `Matching email domains` in SSO configuration  
