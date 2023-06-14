# Disk usage on Spaces

Every Space comes with some small amount of disk storage. This disk space is ephemeral, meaning its content will be lost if your Space restarts.
If you need to persist data with a longer lifetime than the Space itself, you can:
- [Subscribe to a persistent storage upgrade](#persistent-storage)
- [Use a dataset as a data store](#dataset-storage)

## Persistent storage

You can upgrade your Space to have access to a persistent disk space from the **Settings** tab.


<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-storage-settings.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-storage-settings-dark.png"/>
</div>

By upgrading your Space, you get access to some disk space that persists across restarts of your Space.

Persistent storage acts like a traditional disk storage, mounted on `/data`.

You can write to and read from this storage from your Space as you would do with a traditional hard-drive or SSD.

Persistent disk Space can be extended at will to a larger tier, but cannot be shrunk to a smaller tier. If you wish to use a smaller persistent storage tier, you must delete your current (larger) storage first.

<Tip warning={true}>
	WARNING: all data stored in the storage is lost when you delete it.
</Tip>

### Persitent storage specs

In the following table, you can see the Specs for the different upgrade options.

| **Tier**        	| **Disk space** 	| **Persistent** 	| **Monthly Price** 	|
|------------------	|------------------	|------------------	|----------------------	|
| Free tier        	| 50GB            	| No (ephemeral)  	| Free!                	|
| Small           	| 20GB             	| Yes           	| $5                	|
| Medium         	| 150 GB           	| Yes           	| $25                	|
| Large         	| 1TB              	| Yes           	| $100                	|


### Billing

Billing on Spaces is based on hardware usage and is computed by the minute: you get charged for every minute the Space runs on the requested hardware, regardless of whether the Space is used.

Because it requires resources even when the Space is not running, persistent storage upgrades are billed for all their lifetime until deleted, regardless of the Space status and running state.

Additional information about billing can be found in the [dedicated Hub-wide section](./billing).

## Dataset storage

If you do not want to pay for a persistent disk storage, but still need to persist data that lives longer than your Space, you can
use a [dataset repo](./datasets).

Visit the [`datasets` library](https://huggingface.co/docs/datasets/index) documentation and the [`huggingface_hub` client library](https://huggingface.co/docs/huggingface_hub/index) 
documentation for more information on how to programmatically interact with dataset repos.
