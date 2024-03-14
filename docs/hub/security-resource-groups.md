# Advanced Access Control in Organizations with Resource Groups

<Tip warning={true}>
This feature is part of the <a href="https://huggingface.co/enterprise" target="_blank">Enterprise Hub</a>.
</Tip>

In your Hugging Face organization, you can use Resource Groups to control which members have access to specific repositories.

## How does it work?

Resource Groups allow organizations administrators to group related repositories together, and manage access to those repos.

Resource Groups allow different teams to work on their respective repositories within the same organization.

A repository can belong to only one Resource Group.

Organizations members need to be added to the Resource Group to access its repositories. An Organization Member can belong to several Resource Groups.

Members are assigned a role in each Resource Group that determines their permissions for the group's repositories. Four distinct roles exist for Resource Groups:

- `read`: Grants read access to repositories within the Resource Group.
- `contributor`: Provides extra write rights to the subset of the Organization's repositories created by the user (i.e., users can create repos and then modify only those repos). Similar to the 'Write' role, but limited to repos created by the user.
- `write`: Offers write access to all repositories in the Resource Group. Users can create, delete, or rename any repository in the Resource Group.
- `admin`: In addition to write permissions on repositories, admin members can administer the Resource Group — add, remove, and alter the roles of other members. They can also transfer repositories in and out of the Resource Group.

In addition, Organization admins can manage all resource groups inside the organization.

Resource Groups also affect the visibility of private repositories inside the organization. A private repository that is part of a Resource Group will only be visible to members of that Resource Group. Public repositories, on the other hand, are visible to anyone, inside and outside the organization.

## Getting started

Head to your Organization's settings, then navigate to the "Resource Group" tab in the left menu.

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/org-resource-groups-page.png"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/org-resource-groups-page-dark.png"/>
</div>

If you are an admin of the organization, you can create and manage Resource Groups from that page.

After creating a resource group and giving it a meaningful name, you can start adding repositories and users to it.

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/org-resource-groups-manage-empty-page.png"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/org-resource-groups-manage-empty-page-dark.png"/>
</div>

Remember that a repository can be part of only one Resource Group. You'll be warned when trying to add a repository that already belongs to another Resource Group.

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/org-resource-groups-manage-move-repo.png"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/org-resource-groups-manage-move-repo-dark.png"/>
</div>

## Programmatic management (API)

Coming soon!

