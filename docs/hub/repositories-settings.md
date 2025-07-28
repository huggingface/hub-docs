# Repository Settings 

## Private repositories

You can choose a repository's visibility when you create it, and any repository that you own can have its visibility toggled between *public* and *private* in the **Settings** tab. Unless your repository is owned by an [organization](./organizations), you are the only user that can make changes to your repo or upload any code. Setting your visibility to *private* will:

 - Ensure your repo does not show up in other users' search results.
 - Other users who visit the URL of your private repo will receive a `404 - Repo not found` error. 
 - Other users will not be able to clone your repo.

## Renaming or transferring a repo

If you own a repository, you will be able to visit the **Settings** tab to manage its name and transfer ownership. Transferring or renaming a repo will automatically redirect the old URL to the new location, and will preserve download counts and likes. There are limitations that depend on [your access level permissions](./organizations-security).

Moving can be used in these use cases ✅ 
- Renaming a repository within the same user.
- Renaming a repository within the same organization. You must have "write" or "admin" rights in the organization.
- Transferring repository from user to an organization. You must be a member of the organization and have "contributor" rights, at least.
- Transferring a repository from an organization to yourself. You must have "admin" rights in the organization.
- Transferring a repository from a source organization to another target organization. You must have "admin" rights in the source organization **and** at least "contributor" rights in the target organization. 

Moving does not work in the following cases ❌
- Transferring a repository from an organization to another user who is not yourself.
- Transferring a repository from a source organization to another target organization if the user does not have both "admin" rights in the source organization **and** at least "contributor" rights in the target organization.
- Transferring a repository from user A to user B.

If these are use cases you need help with, please send us an email at **website at huggingface.co**.

## Disabling Discussions / Pull Requests

You can disable all discussions and Pull Requests. Once disabled, all community and contribution features won't be available anymore. This action can be reverted without losing any previous discussions or Pull Requests.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/discussions-settings-disable.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/discussions-settings-disable-dark.png"/>
</div>
