# Authentication

In order to access private or gated datasets, you need to authenticate first. Authentication works by providing an access token which will be used to authenticate & authorize your access to gated & private datasets. The first step is to create an access token for your account. This can be done by visiting [Hugging Face Settings - Tokens](https://huggingface.co/settings/tokens).

There are two ways to provide the token

## Environment variable

If you set the environment variable `HF_TOKEN` then Polars will automatically use it when requesting datasets from Hugging Face.

```bash
export HF_TOKEN="hf_xxxxxxxxxxxxx"
```

## Parameters

You can also explicitly provide the access token into the reader (e.g. `read_parquet`) through the `storage_options` parameter. For a full overview on all the parameters you can visit the [API reference guide](https://docs.pola.rs/api/python/stable/reference/api/polars.read_parquet.html).

```python
pl.read_parquet("hf://datasets/roneneldan/TinyStories/data/train-*.parquet", storage_options = {'token' : ACCESS_TOKEN})
```

If both environment variable and the storage_options are provided the storage options access token will take precedence.
