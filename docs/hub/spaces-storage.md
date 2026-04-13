# Disk usage on Spaces

Every Space comes with a small amount of disk storage. This disk space is ephemeral, meaning its content will be lost if your Space restarts or is stopped.
If you need to persist data with a longer lifetime than the Space itself, you can attach one (or more) Storage Buckets.

## Attached Volumes

Spaces can mount [Storage Buckets](./storage-buckets) and Hugging Face repositories (models, datasets, other Spaces) as volumes. These volumes are mounted into the Space container at the paths specified during configuration, making their contents available as local files at runtime.

Storage Buckets are the recommended way to persist data. You can attach a bucket when creating a Space or from the Space settings later.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-attach-bucket.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-attach-bucket-dark.png"/>
</div>

See the [Storage Buckets documentation](./storage-buckets) for full details on creating and using buckets.

### Viewing attached volumes

The Space page displays attached volumes in the actions dropdown. Each volume shows its source repository or bucket, its mount path inside the container, and whether it is mounted as read-only or read-write.

<div class="flex justify-center" style="max-width: 350px">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-attached-volumes-light.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-attached-volumes-dark.png"/>
</div>

When a volume references a private repository, users without access will still see the volume listed (with its mount path and access mode), but the source will be masked as `****/******` with a "(private)" label.
