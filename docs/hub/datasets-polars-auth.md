# Authentication

In order to access private or gated datasets, you need to authenticate first. Authentication works by providing an access token which will be used to authenticate and authorize your access to gated and private datasets. The first step is to create an access token for your account. This can be done by visiting [Hugging Face Settings - Tokens](https://huggingface.co/settings/tokens).

There are three ways to provide the token: setting an environment variable, passing a parameter to the reader or using the Hugging Face CLI.

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

## CLI

Alternatively, you can you use the [Hugging Face CLI](/docs/huggingface_hub/en/guides/cli) to  authenticate. After successfully logging in with `huggingface-cli login` an access token will be stored in the `HF_HOME` directory which defaults to `~/.cache/huggingface`. Polars will then use this token for authentication.

If multiple methods are specified, they are prioritized in the following order:

- Parameters (`storage_options`)
- Environment variable (`HF_TOKEN`)
- CLI
