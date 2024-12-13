# Gating Group Collections

<Tip warning={true}>
This feature is part of the <a href="https://huggingface.co/enterprise">Enterprise Hub</a>.
</Tip>

Gating Group Collections allow organizations to grant (or reject) access to all the models and datasets in a collection at once rather than repo per repo. Users will only have to go through **a single access request**.

To enable gating group in a collection:

- collection owner must be an organization
- organization must be subscribed to Enterprise Hub
- all models and datasets in the collection must be owned by the same organization as the collection
- all models and datasets in the collection can only be in one Gating Group Collection at once

<Tip>
Gating only applies to models and datasets; any other resource part of the collection (such as a Space or a Paper) won't be affected.
</Tip>

## Manage gating group as an organization admin

To enable access requests, go to the collection page and click on **Gating group** in the bottom-right corner.

<div class="flex justify-center" style="max-width: 750px">
    <img
        class="block dark:hidden !m-0"
        src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/collections/gating-group-collection-disabled.webp"
        alt="Hugging Face collection page with gating group collection feature disabled"
    />
    <img
        class="hidden dark:block !m-0"
        src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/collections/dark-gating-group-collection-disabled.webp"
        alt="Hugging Face collection page with gating group collection feature disabled"
    />
</div>

By default, gating group is disabled: click on **Configure Access Requests** to open the settings

<div class="flex justify-center" style="max-width: 750px">
    <img
        class="block dark:hidden !m-0"
        src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/collections/gating-group-modal-disabled.webp"
        alt="Hugging Face gating group collection settings with gating disabled"
    />
    <img
        class="hidden dark:block !m-0"
        src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/collections/dark-gating-group-modal-disabled.webp"
        alt="Hugging Face gating group collection settings with gating disabled"
    />
</div>

By default, access to the repos in the collection is automatically granted to the user when requesting it. This is referred to as **automatic approval**. In this mode, any user can access your repos once they’ve shared their contact information with you.

<div class="flex justify-center" style="max-width: 750px">
    <img
        class="block dark:hidden !m-0"
        src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/collections/gating-group-modal-enabling.webp"
        alt="Hugging Face gating group collection settings with automatic mode selected"
    />
    <img
        class="hidden dark:block !m-0"
        src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/collections/dark-gating-group-modal-enabling.webp"
        alt="Hugging Face gating group collection settings with automatic mode selected"  
    />
</div>

If you want to manually approve which users can access repos in your collection, you must set it to **Manual Review**. When this is the case, you will notice a new option:

**Notification frequency** lets you configure when to get notified about new users requesting access. It can be set to once a day or real-time. By default, emails are sent to the first 5 admins of the organization. You can also set a different email address in the **Notifications email** field.

<div class="flex justify-center" style="max-width: 750px">
    <img
        class="block dark:hidden !m-0"
        src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/collections/gating-group-modal-manual.webp"
        alt="Hugging Face gating group collection settings with manual review mode selected"
    />
    <img
        class="hidden dark:block !m-0"
        src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/collections/dark-gating-group-modal-manual.webp"
        alt="Hugging Face gating group collection settings with manual review mode selected"
    />
</div>

### Review access requests

Once access requests are enabled, you have full control of who can access repos in your gating group collection, whether the approval mode is manual or automatic. You can review and manage requests either from the UI or via the API.

**Approving a request for a repo in a gating group collection will automatically approve access to all repos in that collection.**

#### From the UI

You can review who has access to the repos in your Gating Group Collection from the settings page of any of the repos of the collection by clicking on the **Review access requests** button:

<div class="flex justify-center" style="max-width: 750px">
    <img
        class="block dark:hidden !m-0"
        src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/collections/gating-group-repo-settings.webp"
        alt="Hugging Face repo access settings when repo is in a gating group collection"
    />
    <img
        class="hidden dark:block !m-0"
        src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/collections/dark-gating-group-repo-settings.webp"
        alt="Hugging Face repo access settings when repo is in a gating group collection"
    />
</div>

This will open a modal with 3 lists of users:

- **pending**: the list of users waiting for approval to access your repository. This list is empty unless you’ve selected **Manual Review**. You can either **Accept** or **Reject** the demand. If the demand is rejected, the user cannot access your repository and cannot request access again.
- **accepted**: the complete list of users with access to your repository. You can choose to **Reject** access at any time for any user, whether the approval mode is manual or automatic. You can also **Cancel** the approval, which will move the user to the **pending** list.
- **rejected**: the list of users you’ve manually rejected. Those users cannot access your repositories. If they go to your repository, they will see a message _Your request to access this repo has been rejected by the repo’s authors_.

<div class="flex justify-center" style="max-width: 750px">
    <img 
        class="block dark:hidden"
        src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/models-gated-enabled-pending-users.png"
        alt="Manage access requests modal for a repo in a gating group collection"
    />
    <img
        class="hidden dark:block"
        src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/models-gated-enabled-pending-users-dark.png"
        alt="Manage access requests modal for a repo in a gating group collection"
    />

</div>

#### Via the API

You can programmatically manage access requests in a Gated Group Collection through the API of any of its models or datasets.

Visit our [gated models](https://huggingface.co/docs/hub/models-gated#via-the-api) or [gated datasets](https://huggingface.co/docs/hub/datasets-gated#via-the-api) documentation to know more about it.

#### Download access report

You can download access reports for the Gated Group Collection through the settings page of any of its models or datasets.

Visit our [gated models](https://huggingface.co/docs/hub/models-gated#download-access-report) or [gated datasets](https://huggingface.co/docs/hub/datasets-gated#download-access-report) documentation to know more about it.

#### Customize requested information

<Tip warning={true}>
There is currently no way to customize the gate parameters and requested information in a centralized way. If you want to collect the same data no matter which collection's repository a user requests access throughout, you need to add the same gate parameters in the metadata of all the models and datasets of the collection, and keep it synced.
</Tip>

Visit our [gated models](https://huggingface.co/docs/hub/models-gated#customize-requested-information) or [gated datasets](https://huggingface.co/docs/hub/datasets-gated#customize-requested-information) documentation to know more about customizing the requested information for a given repository.

## Access gated repos in a Gating Group Collection as a user

A Gated Group Collection shows a specific icon before its name:

<div class="flex justify-center" style="max-width: 750px">
    <img
        class="block dark:hidden !m-0"
        src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/collections/gating-group-collection-enabled.webp"
        alt="Hugging Face collection page with gating group collection feature enabled"
    />
    <img
        class="hidden dark:block !m-0"
        src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/collections/dark-gating-group-collection-enabled.webp"
        alt="Hugging Face collection page with gating group collection feature enabled"
    />
</div>

To get access to the models and datasets in a Gated Group Collection, a single access request on the page of any of those repositories is needed. Once your request is approved, you will be able to access all the other repositories in the collection, including future ones.

Visit our [gated models](https://huggingface.co/docs/hub/models-gated#access-gated-models-as-a-user) or [gated datasets](https://huggingface.co/docs/hub/datasets-gated#access-gated-datasets-as-a-user) documentation to know more requesting access to a repository.
