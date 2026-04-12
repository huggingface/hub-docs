# Disk usage on Spaces

Every Space comes with a small amount of disk storage. This disk space is ephemeral, meaning its content will be lost if your Space restarts or is stopped.
If you need to persist data with a longer lifetime than the Space itself, you can attach one (or more) Storage Buckets.

## Storage Buckets

[Storage Buckets](./storage-buckets) are the recommended way to persist data in your Space. You can attach a bucket when creating a Space or from the Space settings later. The bucket is mounted into your Space and can be used to store files that persist across restarts.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-attach-bucket.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-attach-bucket-dark.png"/>
</div>

See the [Storage Buckets documentation](./storage-buckets) for full details on creating and using buckets.

## Attached Volumes

Spaces can mount Hugging Face repositories (models, datasets, other Spaces) and [Storage Buckets](./storage-buckets) as volumes. These volumes are mounted into the Space container at the paths specified during configuration, making repository or bucket contents available as local files at runtime.

You can configure volumes from the Space settings under the **Storage** section, or using the [`huggingface_hub` Python client](https://huggingface.co/docs/huggingface_hub).

### Viewing attached volumes

The Space page displays attached volumes in the actions dropdown. Each volume shows its source repository or bucket, its mount path inside the container, and whether it is mounted as read-only or read-write.

[screenshot]

### Access-aware filtering

When a volume references a private repository, the source is only visible to users who have read access to that repository. Users without access will still see that a volume is attached (along with its mount path and access mode), but the source will be masked as `****/******` with a "(private)" label. This prevents private repository names from being leaked to unauthorized viewers.
