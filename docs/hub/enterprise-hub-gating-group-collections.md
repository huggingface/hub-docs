# Gating Group Collections

<Tip warning={true}>
This feature is part of the <a href="https://huggingface.co/enterprise">Enterprise Hub</a>.
</Tip>

Gating Group collections allows organizations to configure gate all the repos in a collection, enabling **access requests** for all models or datasets in it.

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
        src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/collections/gating-group-disabled.webp"
        alt="Hugging Face gating group collection settings with gating disabled"
    />
    <img
        class="hidden dark:block !m-0"
        src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/collections/dark-gating-group-disabled.webp"
        alt="Hugging Face gating group collection settings with gating disabled"
    />
</div>

By default, access to the repos in the collection is automatically granted to the user when requesting it. This is referred to as **automatic approval**. In this mode, any user can access your repos once they’ve shared their personal information with you.

<div class="flex justify-center" style="max-width: 750px">
    <img
        class="block dark:hidden !m-0"
        src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/collections/gating-group-enabling.webp"
        alt="Hugging Face gating group collection settings with automatic mode selected"
    />
    <img
        class="hidden dark:block !m-0"
        src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/collections/dark-gating-group-enabling.webp"
        alt="Hugging Face gating group collection settings with gating with automatic mode selected"
    />
</div>

If you want to manually approve which users can access repos in your collection, you must set it to **manual approval**. When this is the case, you will notice a new option:

<div class="flex justify-center" style="max-width: 750px">
    <img
        class="block dark:hidden !m-0"
        src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/collections/gating-group-changes.webp"
        alt="Hugging Face gating group collection settings with manual review mode selected"
    />
    <img
        class="hidden dark:block !m-0"
        src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/collections/dark-gating-group-changes.webp"
        alt="Hugging Face gating group collection settings with manual review mode selected"

    />

</div>

**Notification frequency** lets you configure when to get notified if new users request access. It can be set to once a day or real-time. By default, emails are sent to the first 5 admins of the organization. You can also set a different email address in the **Notifications email** field.
