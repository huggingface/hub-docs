# Disk usage on Spaces

Every Space comes with a small amount of disk storage. This disk space is ephemeral, meaning its content will be lost if your Space restarts.
If you need to persist data with a longer lifetime than the Space itself, you can:
- [Subscribe to a persistent storage upgrade](#persistent-storage)
- [Use a dataset as a data store](#dataset-storage)

## Persistent storage

You can upgrade your Space to have access to persistent disk space from the **Settings** tab.


<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-storage-settings.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-storage-settings-dark.png"/>
</div>

You can choose the storage tier of your choice access disk space that persists across restarts of your Space.

Persistent storage acts like traditional disk storage mounted on `/data`.

That means you can `read` and `write to` this storage from your Space as you would with a traditional hard drive or SSD.

Persistent disk space can be upgraded to a larger tier at will, though it cannot be downgraded to a smaller tier. If you wish to use a smaller persistent storage tier, you must delete your current (larger) storage first.

If you are using Hugging Face open source libraries, you can make your Space restart faster by setting the environment variable `HF_HOME` to `/data/.huggingface`.
`transformers`, `diffusers`, `datasets` and others use that path to cache any assets downloaded from the Hugging Face hub. Visit the libraries' documentations for more details.

<Tip warning={true}>
	WARNING: all data stored in the storage is lost when you delete it.
</Tip>

### Persistent storage specs

Here are the specifications for each of the different upgrade options:

| **Tier**        	| **Disk space** 	| **Persistent** 	| **Monthly Price** 	|
|------------------	|------------------	|------------------	|----------------------	|
| Free tier        	| 50GB            	| No (ephemeral)  	| Free!                	|
| Small           	| 20GB             	| Yes           	| $5                	|
| Medium         	| 150 GB           	| Yes           	| $25                	|
| Large         	| 1TB              	| Yes           	| $100                	|


### Billing

Billing of Spaces is based on hardware usage and is computed by the minute: you get charged for every minute the Space runs on the requested hardware, regardless of whether the Space is used.

Persistent storage upgrades are billed until deleted, even when the Space is not running and regardless of Space status or running state.

Additional information about billing can be found in the [dedicated Hub-wide section](./billing).

## Dataset storage

If you need to persist data that lives longer than your Space, you could use a [dataset repo](./datasets).

You can find an example of persistence [here](https://huggingface.co/spaces/julien-c/persistent-data), which uses the [`huggingface_hub` library](https://huggingface.co/docs/huggingface_hub/index) for programmatically uploading files to a dataset repository.

Visit the [`datasets` library](https://huggingface.co/docs/datasets/index) documentation and the [`huggingface_hub` client library](https://huggingface.co/docs/huggingface_hub/index) 
documentation for more information on how to programmatically interact with dataset repos.
