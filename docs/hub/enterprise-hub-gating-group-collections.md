# Gating Group Collections

<Tip warning={true}>
This feature is part of the <a href="https://huggingface.co/enterprise">Enterprise Hub</a>.
</Tip>

Gating Group Collections allow organizations to configure gated access to all the repos in a collection, enabling **a single access request** for all the models and datasets in it.

To enable gating group in a collection:

- collection owner must be an organization
- organization must be subscribed to Enterprise Hub
- all models and datasets in the collection must be owned by the same organization as the collection
- all models and datasets in the collection can only be in one gating group collection at once

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

By default, access to the repos in the collection is automatically granted to the user when requesting it. This is referred to as **automatic approval**. In this mode, any user can access your repos once they’ve shared their personal information with you.

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

If you want to manually approve which users can access repos in your collection, you must set it to **manual approval**. When this is the case, you will notice a new option:

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

Once access requests are enabled, you have full control of who can access repos in your gating group collection or not, whether the approval mode is manual or automatic. You can review and manage requests either from the UI or via the API.

**Approving a request for a repo in a gating group collection will automatically approve access to all repos in that collection.**

#### From the UI

You can review who has access to the repos in your gating group collection from the settings page of one of the repos of the collection by clicking on the **Review access requests** button:

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

- **pending**: the list of users waiting for approval to access your dataset. This list is empty unless you’ve selected **manual approval**. You can either **Accept** or **Reject** the demand. If the demand is rejected, the user cannot access your dataset and cannot request access again.
- **accepted**: the complete list of users with access to your dataset. You can choose to **Reject** access at any time for any user, whether the approval mode is manual or automatic. You can also **Cancel** the approval, which will move the user to the **pending** list.
- **rejected**: the list of users you’ve manually rejected. Those users cannot access your datasets. If they go to your dataset repository, they will see a message _Your request to access this repo has been rejected by the repo’s authors_.

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

Automating the approval of access requests by using the API works the same as gated models or repos.

Visit our [gated models](https://huggingface.co/docs/hub/models-gated#via-the-api) or [gated datasets](https://huggingface.co/docs/hub/datasets-gated#via-the-api) documentation to know more about it.

#### Download access report

Access report download for repos in gating group collection works the same as gated models or repos.

Visit our [gated models](https://huggingface.co/docs/hub/models-gated#download-access-report) or [gated datasets](https://huggingface.co/docs/hub/datasets-gated#download-access-report) documentation to know more about it.

#### Customize requested information

Customized information requests for repos in gating group collection works the same way as gated models or repos.

Visit our [gated models](https://huggingface.co/docs/hub/models-gated#customize-requested-information) or [gated datasets](https://huggingface.co/docs/hub/datasets-gated#customize-requested-information) documentation to know more about it.

## Access gated repos in a gating group as a user

As a user, if you want to use a gated repo in a gating group collection, you will need to request access to it. This means that you must be logged in to a Hugging Face user account.

To know if a collection has gating group enabled, an icon will be shown next to its name:

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

Visit our [gated models](https://huggingface.co/docs/hub/models-gated#access-gated-models-as-a-user) or [gated datasets](https://huggingface.co/docs/hub/datasets-gated#access-gated-datasets-as-a-user) documentation to know more about it.
