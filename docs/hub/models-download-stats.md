# Models Download Stats

## How are download stats generated for models?

Counting the number of downloads for models is not a trivial task, as a single model repository might contain multiple files, including multiple model weight files (e.g., with sharded models) and different formats depending on the library (GGUF, PyTorch, TensorFlow, etc.). To avoid double counting downloads (e.g., counting a single download of a model as multiple downloads), the Hub uses a set of query files that are employed for download counting. No information is sent from the user, and no additional calls are made for this. The count is done server-side as the Hub serves files for downloads.

Every HTTP request to these files, including `GET` and `HEAD`, will be counted as a download. By default, when no library is specified, the Hub uses `config.json` as the default query file. Otherwise, the query file depends on each library, and the Hub might examine files such as `pytorch_model.bin` and `adapter_config.json`. 

## Which are the query files for different libraries?

By default, the Hub looks at `config.json`, `config.yaml`, `hyperparams.yaml`, and `meta.yaml`. Some libraries override these defaults by specifying their own filter (specifying `countDownloads`), which is open-source and can be found [here](https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/model-libraries.ts). For example, for the `nemo` library, all files with `nemo` extension are used to count downloads.

## How are `GGUF` files handled?

GGUF files are self-contained and are not tied to a single library, so all of them are counted for downloads. This will double count downloads in the case a user performs cloning of a whole repository, but most users and interfaces download a single GGUF file for a given repo.

## How is `diffusers` handled?

The `diffusers` library is an edge case and has its filter configured in the internal codebase. The filter ensures repos tagged as `diffusers` count both files loaded via the library as well as through UIs that require users to manually download the top-level safetensors.

```
filter: [
		{
			bool: {
				/// Include documents that match at least one of the following rules
				should: [
					/// Downloaded from diffusers lib
					{
						term: { path: "model_index.json" },
					},
					/// Direct downloads (LoRa, Auto1111 and others)
					/// Filter out nested safetensors and pickle weights to avoid double counting downloads from the diffusers lib
					{
						regexp: { path: "[^/]*\\.safetensors" },
					},
					{
						regexp: { path: "[^/]*\\.ckpt" },
					},
					{
						regexp: { path: "[^/]*\\.bin" },
					},
				],
				minimum_should_match: 1,
			},
		},
	]
}
```
