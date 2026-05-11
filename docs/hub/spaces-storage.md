# Disk usage on Spaces

Every Space comes with a small amount of disk storage. This disk space is ephemeral, meaning its content will be lost if your Space restarts or is stopped.
If you need to persist data with a longer lifetime than the Space itself, you can attach one or more [Storage Buckets](./storage-buckets) as volumes.

## Attached Volumes

[Storage Buckets](./storage-buckets) are the recommended way to persist data in your Space. Attached buckets are mounted into the Space container at the path you specify, making their contents available as local files at runtime.

Buckets can be attached when creating a Space, from the Space settings UI, or programmatically via the [`huggingface_hub`](/docs/huggingface_hub/guides/manage-spaces#mount-volumes-in-your-space) Python API. They can be mounted read-write (the default) or read-only.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-attach-bucket.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-attach-bucket-dark.png"/>
</div>

See the [Storage Buckets documentation](./storage-buckets) for full details on creating and using buckets.

### Viewing attached volumes

The Space page displays attached volumes in the actions dropdown. Each volume shows its source bucket, its mount path inside the container, and whether it is mounted as read-only or read-write.

<div class="flex justify-center" style="max-width: 350px; margin: 0 auto">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-attached-volumes-light.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-attached-volumes-dark.png"/>
</div>

## Mounting models, datasets, and other Spaces

Models, datasets, and other Spaces can be attached as volumes through the [`huggingface_hub`](/docs/huggingface_hub/guides/manage-spaces#mount-volumes-in-your-space) Python API. They are always mounted as read-only.

Once attached, repo volumes appear in the Space actions dropdown alongside buckets and can be viewed or unmounted from the UI.

When a volume references a private repository, users without access will still see the volume listed (with its mount path and access mode), but the source will be masked as `****/******` with a "(private)" label.
