# Hub API Endpoints

We have open endpoints that you can use to retrieve information from the Hub as well as perform certain actions such as creating model, dataset or Space repos. We offer a wrapper Python library, [`huggingface_hub`](https://github.com/huggingface/huggingface_hub), that allows easy access to these endpoints. We also provide [webhooks](./webhooks) to receive real-time incremental info about repos. Enjoy!

The base URL for those endpoints below is `https://huggingface.co`. For example, to construct the `/api/models` call below, one can call the URL [https://huggingface.co/api/models](https://huggingface.co/api/models)

## GET /api/models

Get information from all models in the Hub. The response is paginated, use the [`Link` header](https://docs.github.com/en/rest/guides/using-pagination-in-the-rest-api?apiVersion=2022-11-28#link-header) to get the following pages. You can specify additional parameters to have more specific results.
- `search`: Filter based on substrings for repos and their usernames, such as `resnet` or `microsoft`
- `author`: Filter models by an author or organization, such as `huggingface` or `microsoft`
- `filter`: Filter based on tags, such as `text-classification` or `spacy`.
- `sort`: Property to use when sorting, such as `downloads` or `author`.
- `direction`: Direction in which to sort, such as `-1` for descending, and anything else for ascending.
- `limit`: Limit the number of models fetched.
- `full`: Whether to fetch most model data, such as all tags, the files, etc.
- `config`: Whether to also fetch the repo config.

Payload:

```js
params = {
    "search":"search",
    "author":"author",
    "filter":"filter",
    "sort":"sort",
    "direction":"direction",
    "limit":"limit",
    "full":"full",
    "config":"config"
}
```

This is equivalent to `huggingface_hub.list_models()`.

## GET /api/models/(repo_id) or /api/models/(repo_id)/revision/(revision)

Get all information for a specific model.

This is equivalent to `huggingface_hub.model_info(repo_id, revision)`.

## GET /api/models-tags-by-type

Gets all the available model tags hosted in the Hub.

This is equivalent to `huggingface_hub.get_model_tags()`.

## GET /api/datasets

Get information from all datasets in the Hub. The response is paginated, use the [`Link` header](https://docs.github.com/en/rest/guides/using-pagination-in-the-rest-api?apiVersion=2022-11-28#link-header) to get the following pages. You can specify additional parameters to have more specific results.
- `search`: Filter based on substrings for repos and their usernames, such as `pets` or `microsoft`
- `author`: Filter datasets by an author or organization, such as `huggingface` or `microsoft`
- `filter`: Filter based on tags, such as `task_categories:text-classification` or `languages:en`.
- `sort`: Property to use when sorting, such as `downloads` or `author`.
- `direction`: Direction in which to sort, such as `-1` for descending, and anything else for ascending.
- `limit`: Limit the number of datasets fetched.
- `full`: Whether to fetch most dataset data, such as all tags, the files, etc.

Payload:

```js
params = {
    "search":"search",
    "author":"author",
    "filter":"filter",
    "sort":"sort",
    "direction":"direction",
    "limit":"limit",
    "full":"full",
    "config":"config"
}
```

This is equivalent to `huggingface_hub.list_datasets()`.

## GET /api/datasets/(repo_id) or /api/datasets/(repo_id)/revision/(revision)

Get all information for a specific dataset.

- `full`: Whether to fetch most dataset data, such as all tags, the files, etc.

Payload:

```js
params = {"full": "full"}
```

This is equivalent to `huggingface_hub.dataset_info(repo_id, revision)`.

## GET /api/datasets/(repo_id)/parquet

Get the list of auto-converted parquet files.

## GET /api/datasets/(repo_id)/parquet/(config)/(split)/(n).parquet

Get the nth shard of the auto-converted parquet files.

## GET /api/datasets-tags-by-type

Gets all the available dataset tags hosted in the Hub

This is equivalent to `huggingface_hub.get_dataset_tags()`.

## GET /api/spaces

Get information from all Spaces in the Hub. The response is paginated, use the [`Link` header](https://docs.github.com/en/rest/guides/using-pagination-in-the-rest-api?apiVersion=2022-11-28#link-header) to get the following pages. You can specify additional parameters to have more specific results.
- `search`: Filter based on substrings for repos and their usernames, such as `resnet` or `microsoft`
- `author`: Filter models by an author or organization, such as `huggingface` or `microsoft`
- `filter`: Filter based on tags, such as `text-classification` or `spacy`.
- `sort`: Property to use when sorting, such as `downloads` or `author`.
- `direction`: Direction in which to sort, such as `-1` for descending, and anything else for ascending.
- `limit`: Limit the number of models fetched.
- `full`: Whether to fetch most model data, such as all tags, the files, etc.
- `config`: Whether to also fetch the repo config.

Payload:

```js
params = {
    "search":"search",
    "author":"author",
    "filter":"filter",
    "sort":"sort",
    "direction":"direction",
    "limit":"limit",
    "full":"full",
    "config":"config"
}
```

This is equivalent to `huggingface_hub.list_spaces()`.

## GET /api/spaces/(repo_id) or /api/spaces/(repo_id)/revision/(revision)
Get all information for a specific model.

This is equivalent to `huggingface_hub.space_info(repo_id, revision)`.

## GET /api/metrics

Get information from all metrics in the Hub.

This is equivalent to `huggingface_hub.list_metrics()`.

## POST /api/repos/create

Create a repository. It's a model repo by default.

Parameters:
- `type`: Type of repo (dataset or space; model by default).
- `name`: Name of repo.
- `organization`: Name of organization (optional).
- `private`: Whether the repo is private.

Payload:

```js
payload = {
    "type":"type",
    "name":"name",
    "organization": "organization",
    "private":"private"
}
```

This is equivalent to `huggingface_hub.create_repo()`.

## DELETE /api/repos/delete

Delete a repository. It's a model repo by default.

Parameters:
- `type`: Type of repo (dataset or space; model by default).
- `name`: Name of repo.
- `organization`: Name of organization (optional).

Payload:

```js
payload = {
    "type": "type",
    "name": "name",
    "organization": "organization",
}
```

This is equivalent to `huggingface_hub.delete_repo()`.

## PUT /api/repos/(type)/(repo_id)/settings

Update repo visibility.

Payload:

```js
payload = {
    "private": "private",
}
```

This is equivalent to `huggingface_hub.update_repo_visibility()`.

## POST /api/repos/move

Move a repository (rename within the same namespace or transfer from user to organization).

Payload:

```js
payload = {
    "fromRepo" : "namespace/repo_name",
    "toRepo" : "namespace2/repo_name2"
}
```

This is equivalent to `huggingface_hub.move_repo()`.

## GET /api/whoami-v2

Get username and organizations the user belongs to.

Payload:

```js
headers = { "authorization" :  "Bearer $token" }
```

This is equivalent to `huggingface_hub.whoami()`.