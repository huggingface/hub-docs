# Authentication

In order to access private or gated datasets, you need to authenticate first. Authentication works by providing an access token which will be used to authenticate and authorize your access to gated and private datasets. The first step is to create an access token for your account. This can be done by visiting [Hugging Face Settings - Tokens](https://huggingface.co/settings/tokens).

There are two ways to provide the token: setting an environment variable and passing a parameter to the reader.

## Environment variable

If you set the environment variable `HF_TOKEN`, Polars will automatically use it when requesting datasets from Hugging Face.

```bash
export HF_TOKEN="hf_xxxxxxxxxxxxx"
```

## Parameters

You can also explicitly provide the access token to the reader (e.g. `read_parquet`) through the `storage_options` parameter. For a full overview of all the parameters, check out the [API reference guide](https://docs.pola.rs/api/python/stable/reference/api/polars.read_parquet.html).

```python
pl.read_parquet(
    "hf://datasets/roneneldan/TinyStories/data/train-*.parquet",
    storage_options={"token": ACCESS_TOKEN},
)
```

If both the environment variable and the parameter are provided, the parameter will take precedence.
