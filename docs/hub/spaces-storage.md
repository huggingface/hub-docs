# Disk usage on Spaces

Every Space comes with a small amount of disk storage. This disk space is ephemeral, meaning its content will be lost if your Space restarts or is stopped.
If you need to persist data with a longer lifetime than the Space itself, you can attach one or more volumes (Storage Buckets or Hugging Face repositories).

## Attached Volumes

Spaces can mount [Storage Buckets](./storage-buckets) and Hugging Face repositories (models, datasets, other Spaces) as volumes. These volumes are mounted into the Space container at the paths specified during configuration, making their contents available as local files at runtime.

Storage Buckets are the recommended way to persist data. How you attach a volume depends on the type:

- **Storage Buckets** can be attached when creating a Space, from the Space settings UI, or programmatically via the [`huggingface_hub`](/docs/huggingface_hub/guides/manage-spaces#mount-volumes-in-your-space) Python API.
- **Models, datasets, and other Spaces** can currently be attached as volumes through the [`huggingface_hub`](/docs/huggingface_hub/guides/manage-spaces#mount-volumes-in-your-space) Python API. Once attached, they appear in the Space settings alongside buckets, where you can view or unmount them.

Models, datasets, and Spaces are always mounted as read-only. Storage Buckets can be mounted read-write (the default) or read-only.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-attach-bucket.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-attach-bucket-dark.png"/>
</div>

See the [Storage Buckets documentation](./storage-buckets) for full details on creating and using buckets.

### Viewing attached volumes

The Space page displays attached volumes in the actions dropdown. Each volume shows its source repository or bucket, its mount path inside the container, and whether it is mounted as read-only or read-write.

<div class="flex justify-center" style="max-width: 350px; margin: 0 auto">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-attached-volumes-light.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-attached-volumes-dark.png"/>
</div>

When a volume references a private repository, users without access will still see the volume listed (with its mount path and access mode), but the source will be masked as `****/******` with a "(private)" label.
