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
