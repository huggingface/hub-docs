# Repository Settings 

## Private repositories

You can choose a repository's visibility when you create it, and any repository that you own can have its visibility toggled between *public* and *private* in the **Settings** tab. Unless your repository is owned by an [organization](./organizations), you are the only user that can make changes to your repo or upload any code. Setting your visibility to *private* will:

 - Ensure your repo does not show up in other users' search results.
 - Other users who visit the URL of your private repo will receive a `404 - Repo not found` error. 
 - Other users will not be able to clone your repo.

## Renaming or transferring a repo

If you own a repository, you will be able to visit the **Settings** tab to manage the name and ownership. Note that there are certain limitations in terms of use cases.

Moving can be used in these use cases ✅ 
- Renaming a repository within same user.
- Renaming a repository within same organization. The user must be part of the organization and have "write" or "admin" rights in the organization.
- Transferring repository from user to an organization. The user must be part of the organization and have "write" or "admin" rights in the organization.
- Transferring a repository from an organization to yourself. You must be part of the organization, and have "admin" rights in the organization.
- Transferring a repository from a source organization to another target organization. The user must have "admin" rights in the source organization **and** either "write" or "admin" rights in the target organization. 

Moving does not work for ❌
- Transferring a repository from an organization to another user who is not yourself.
- Transferring a repository from a source organization to another target organization if the user does not have both "admin" rights in the source organization **and** either "write" or "admin" rights in the target organization.
- Transferring a repository from user A to user B.

If these are use cases you need help with, please send us an email at **website at huggingface.co**.
