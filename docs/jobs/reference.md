# Reference

# Jobs Command Line Interface (CLI)

The `huggingface_hub` Python package comes with a built-in CLI called `hf`. This tool allows you to interact with the Hugging Face Hub directly from a terminal. For example, you can log in to your account, create a repository, upload and download files, etc. It also comes with handy features to configure your machine or manage your cache, and start and manage Jobs.

Find the `hf jobs` installation steps, guides and reference in the `huggingface_hub` documentation here:

* [Installation](https://huggingface.co/docs/huggingface_hub/en/guides/cli#getting-started)
* [Run and manage Jobs](https://huggingface.co/docs/huggingface_hub/en/guides/cli#hf-jobs)
* [CLI reference for Jobs](https://huggingface.co/docs/huggingface_hub/en/package_reference/cli#hf-jobs)

## Python client

The `huggingface_hub` Python package comes with a client called `HfApi`. This client allows you to interact with the Hugging Face Hub directly in Python. For example, you can log in to your account, create a repository, upload and download files, etc. It also comes with handy features to configure your machine or manage your cache, and start and manage Jobs.

Find the installation steps and guides in the `huggingface_hub` documentation:

* [Installation](https://huggingface.co/docs/huggingface_hub/en/installation)
* [Run and manage Jobs](https://huggingface.co/docs/huggingface_hub/en/guides/jobs)

## HTTP API

The Jobs HTTP API Endpoints are available under `https://huggingface.co/api/jobs`.

Authenticate using a Hugging face token with the permission to start and manage Jobs under your namespace (your account or organization).
Pass the token as a Bearer token with the header: `"Authorization: Bearer {token}"`.

Here is a list of available endpoints and arguments:

* [View Jobs OpenAPI](https://huggingface-openapi.hf.space/#tag/jobs)
