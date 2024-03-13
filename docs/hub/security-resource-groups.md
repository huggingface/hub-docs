# Advanced Access Control in Organizations with Resource Groups

<Tip warning={true}>
This feature is part of the <a href="https://huggingface.co/enterprise" target="_blank">Enterprise Hub</a>.
</Tip>

You can define Resource Groups inside your Hugging Face organization to control which member has access to which repos.

## How does it work?

Resource Groups allow organizations administrators to group related repositories together, and manage access to those repos in a differentiated manner.

Resource Groups allow different teams to work on their own repositories within the same organization without interfering with the work of others.

A repository can belong to only one Resource Group.

Organizations members need to be added to the Resource Group to access its repositories. An Organization Member can belong to several Resource Groups.

Organization members in a resource group are assigned a role that defines their permissions on the repositories of the Resource Group.

There are 4 different roles in Resource Groups:

- `read`: grants read access to repositories inside the Resource Group.
- `contributor`: additional write rights to the subset of the Organization's repos that were created by the user. i.e., users can create repos and _then_ modify only those repos. This is similar to the `write` role, but scoped to repos _created_ by the user.
- `write`: write rights to all repositories in the Resource Group. Users can create, delete or rename any repo in the Resource Group.
- `admin`: in addition to write rights on repos, admin members can manage the Resource Group: add, remove and change the role of other members. They can also move repositories in and out of the Resource Groups they are admin of.

In addition, Organization admins can manage all resource groups inside the organization.

Resource Groups also affect the visibility of private repositories inside the organization. A private repository that is part of a Resource Group will only be visible to members of that Resource Group. Public repositories, on the other 

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

