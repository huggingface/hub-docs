# Hub API Endpoints

We have open endpoints that you can use to retrieve information from the Hub as well as perform certain actions such as creating model, dataset or Space repos. We offer a wrapper Python library, [`huggingface_hub`](https://github.com/huggingface/huggingface_hub), that allows easy access to these endpoints. We also provide [webhooks](./webhooks) to receive real-time incremental info about repos. Enjoy!

The base URL for those endpoints below is `https://huggingface.co`. For example, to construct the `/api/models` call below, one can call the URL [https://huggingface.co/api/models](https://huggingface.co/api/models)

## The Hub API Playground

Want to try out our API?
Try it out now on our [Playground](https://huggingface.co/spaces/enzostvs/hub-api-playground)!

<div class="flex justify-center">
<img class="w-full object-contain" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/hub-api-playground.png"/>
</div>

## Repo listing API

The following endpoints help get information about models, datasets, Spaces, and metrics stored on the Hub.

<Tip>
When making API calls to retrieve information about repositories, the `createdAt` attribute indicates the time when the respective repository was created. It's important to note that there is a unique value, '2022-03-02T23:29:04.000Z,' assigned to all repositories that were created before we began storing creation dates.
</Tip>

### GET /api/models

Get information from all models in the Hub. The response is paginated, use the [`Link` header](https://docs.github.com/en/rest/guides/using-pagination-in-the-rest-api?apiVersion=2022-11-28#link-header) to get the next pages. You can specify additional parameters to have more specific results.
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

### GET /api/models/{repo_id} or /api/models/{repo_id}/revision/{revision}

Get all information for a specific model.

This is equivalent to `huggingface_hub.model_info(repo_id, revision)`.

### GET /api/models-tags-by-type

Gets all the available model tags hosted in the Hub.

This is equivalent to `huggingface_hub.get_model_tags()`.

### GET /api/datasets

Get information from all datasets in the Hub. The response is paginated, use the [`Link` header](https://docs.github.com/en/rest/guides/using-pagination-in-the-rest-api?apiVersion=2022-11-28#link-header) to get the next pages. You can specify additional parameters to have more specific results.
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

### GET /api/datasets/{repo_id} or /api/datasets/{repo_id}/revision/{revision}

Get all information for a specific dataset.

- `full`: Whether to fetch most dataset data, such as all tags, the files, etc.

Payload:

```js
params = {"full": "full"}
```

This is equivalent to `huggingface_hub.dataset_info(repo_id, revision)`.

### GET /api/datasets/{repo_id}/parquet

Get the list of auto-converted parquet files.

### GET /api/datasets/{repo_id}/parquet/{config}/{split}/{n}.parquet

Get the nth shard of the auto-converted parquet files.

### GET /api/datasets-tags-by-type

Gets all the available dataset tags hosted in the Hub.

This is equivalent to `huggingface_hub.get_dataset_tags()`.

### GET /api/spaces

Get information from all Spaces in the Hub. The response is paginated, use the [`Link` header](https://docs.github.com/en/rest/guides/using-pagination-in-the-rest-api?apiVersion=2022-11-28#link-header) to get the next pages. You can specify additional parameters to have more specific results.
- `search`: Filter based on substrings for repos and their usernames, such as `resnet` or `microsoft`
- `author`: Filter models by an author or organization, such as `huggingface` or `microsoft`
- `filter`: Filter based on tags, such as `text-classification` or `spacy`.
- `sort`: Property to use when sorting, such as `downloads` or `author`.
- `direction`: Direction in which to sort, such as `-1` for descending, and anything else for ascending.
- `limit`: Limit the number of models fetched.
- `full`: Whether to fetch most model data, such as all tags, the files, etc.

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

### GET /api/spaces/{repo_id} or /api/spaces/{repo_id}/revision/{revision}
Get all information for a specific model.

This is equivalent to `huggingface_hub.space_info(repo_id, revision)`.


## Repo API

The following endpoints manage repository settings like creating and deleting a repository.
### POST /api/repos/create

Create a repository. It's a model repo by default.

Parameters:
- `type`: Type of repo (dataset or space; model by default).
- `name`: Name of repo.
- `organization`: Name of organization (optional).
- `private`: Whether the repo is private.
- `sdk`: When the type is `space` (streamlit, gradio, docker or static)

Payload:

```js
payload = {
    "type":"type",
    "name":"name",
    "organization": "organization",
    "private":"private",
    "sdk": "sdk"
}
```

This is equivalent to `huggingface_hub.create_repo()`.

### DELETE /api/repos/delete

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

### PUT /api/repos/{repo_type}/{repo_id}/settings

Update repo visibility.

Payload:

```js
payload = {
    "private": "private",
}
```

This is equivalent to `huggingface_hub.update_repo_visibility()`.

### POST /api/repos/move

Move a repository (rename within the same namespace or transfer from user to organization).

Payload:

```js
payload = {
    "fromRepo" : "namespace/repo_name",
    "toRepo" : "namespace2/repo_name2"
}
```

This is equivalent to `huggingface_hub.move_repo()`.

## User API

The following endpoint gets information about a user.

### GET /api/whoami-v2

Get username and organizations the user belongs to.

Payload:

```js
headers = { "authorization" :  "Bearer $token" }
```

This is equivalent to `huggingface_hub.whoami()`.

## Collections API

Use Collections to group repositories from the Hub (Models, Datasets, Spaces and Papers) on a dedicated page.

You can learn more about it in the Collections [guide](./collections.md). Collections can also be managed using the Python client (see [guide](https://huggingface.co/docs/huggingface_hub/main/en/guides/collections)).

### POST /api/collections

Create a new collection on the Hub with a title, a description (optional) and a first item (optional). An item is defined by a type (`model`, `dataset`, `space` or `paper`) and an id (repo_id or paper_id on the Hub).

Payload:

```js
payload = {
    "title": "My cool models",
    "namespace": "username_or_org",
    "description": "Here is a shortlist of models I've trained.",
    "item" : {
        "type": "model",
        "id": "username/cool-model",
    }
    "private": false,

}
```

This is equivalent to `huggingface_hub.create_collection()`.

### GET /api/collections/{namespace}/{slug}-{id}

Return information about a collection.

This is equivalent to `huggingface_hub.get_collection()`.

### PATCH /api/collections/{namespace}/{slug}-{id}

Update the metadata of a collection on the Hub. You can't add or modify the items of the collection with this method. All fields of the payload are optional.

Payload:

```js
payload = {
    "title": "My cool models",
    "description": "Here is a shortlist of models I've trained.",
    "private": false,
    "position": 0, // position of the collection on your profile
    "theme": "green",
}
```

This is equivalent to `huggingface_hub.update_collection_metadata()`.

### DELETE /api/collections/{namespace}/{slug}-{id}

Return a collection. This is a non-revertible operation. A deleted collection cannot be restored.

This is equivalent to `huggingface_hub.delete_collection()`.

### POST /api/collections/{namespace}/{slug}-{id}/item

Add an item to a collection. An item is defined by a type (`model`, `dataset`, `space` or `paper`) and an id (repo_id or paper_id on the Hub). A note can also be attached to the item (optional).

Payload:

```js
payload = {
    "item" : {
        "type": "model",
        "id": "username/cool-model",
    }
    "note": "Here is the model I trained on ...",
}
```

This is equivalent to `huggingface_hub.add_collection_item()`.

### PATCH /api/collections/{namespace}/{slug}-{id}/items/{item_id}

Update an item in a collection. You must know the item object id which is different from the repo_id/paper_id provided when adding the item to the collection. The `item_id` can be retrieved by fetching the collection.

You can update the note attached to the item or the position of the item in the collection. Both fields are optional.

```js
payload = {
    "position": 0,
    "note": "Here is the model I trained on ...",
}
```

This is equivalent to `huggingface_hub.update_collection_item()`.

### DELETE /api/collections/{namespace}/{slug}-{id}/items/{item_id}

Remove an item from a collection. You must know the item object id which is different from the repo_id/paper_id provided when adding the item to the collection. The `item_id` can be retrieved by fetching the collection.

This is equivalent to `huggingface_hub.delete_collection_item()`.
