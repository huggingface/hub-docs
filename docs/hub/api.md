# Hub API Endpoints

We have open endpoints that you can use to retrieve information from the Hub as well as perform certain actions such as creating model, dataset or Space repos. We offer a wrapper Python client, [`huggingface_hub`](https://github.com/huggingface/huggingface_hub), and a JS client, [`huggingface.js`](https://github.com/huggingface/huggingface.js), that allow easy access to these endpoints. We also provide [webhooks](./webhooks) to receive real-time incremental info about repos. Enjoy!

The base URL for those endpoints below is `https://huggingface.co`. For example, to construct the `/api/models` call below, one can call the URL [https://huggingface.co/api/models](https://huggingface.co/api/models)

## The Hub API Playground

Want to try out our API?
Try it out now on our OpenAPI-based [Playground](https://huggingface.co/spaces/huggingface/openapi)!

You can also access the OpenAPI specification directly: [https://huggingface.co/.well-known/openapi.json](https://huggingface.co/.well-known/openapi.json)

<div class="flex justify-center">
<a href="https://huggingface.co/spaces/huggingface/openapi" target="_blank">
<img class="w-full object-contain" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/hub-api-playground.png"/>
</a>
</div>

All API calls are subject to the HF-wide [Rate limits](./rate-limits). Upgrade your account if you need elevated, large-scale access.

> [!NOTE]
> The rest of this page is a partial list of some of our API endpoints. But note that the exhaustive reference is our [OpenAPI documentation](https://huggingface.co/spaces/huggingface/openapi).
> It is much more complete and guaranteed to always be up-to-date.

## Repo listing API

The following endpoints help get information about models, datasets, and Spaces stored on the Hub.

> [!TIP]
> When making API calls to retrieve information about repositories, the <code>createdAt</code> attribute indicates the time when the respective repository was created. It's important to note that there is a unique value, <code>2022-03-02T23:29:04.000Z</code> assigned to all repositories that were created before we began storing creation dates.

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

Append the subset and the split to the URL to get the list of files for a specific subset and split:

- `GET /api/datasets/{repo_id}/parquet/{subset}`
- `GET /api/datasets/{repo_id}/parquet/{subset}/{split}`

### GET /api/datasets/{repo_id}/parquet/{subset}/{split}/{n}.parquet

Get the nth shard of the auto-converted parquet files, for a specific subset (also called "config") and split.

### GET /api/datasets/{repo_id}/croissant

Get the Croissant metadata. More details at https://huggingface.co/docs/datasets-server/croissant.

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
- `sdk`: When the type is `space` (gradio, docker or static)

Payload:

```js
payload = {
    "type":"model",
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
    "type": "model",
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

This is equivalent to `huggingface_hub.update_repo_settings()`.

### POST /api/repos/move

Move a repository (rename within the same namespace or transfer from user to organization).

Parameters:
- `fromRepo`: repo to rename.
- `toRepo`: new name of the repo.
- `type`: Type of repo (dataset or space; model by default).

Payload:

```js
payload = {
    "fromRepo" : "namespace/repo_name",
    "toRepo" : "namespace2/repo_name2",
    "type": "model",
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

## Organization API

The following endpoints handle organization like getting overview of an organization, listing members and followers.

### GET /api/organizations/{organization_name}/overview

Get the organization overview.

Payload:

```js
headers = { "authorization" :  "Bearer $token" }
```

This is equivalent to `huggingface_hub.get_organization_overview()`.


### GET /api/organizations/{organization_name}/members

Get the organization members.

Payload:

```js
headers = { "authorization" :  "Bearer $token" }
```

This is equivalent to `huggingface_hub.list_organization_members()`.

### GET /api/organizations/{organization_name}/followers

Get the organization followers.

Payload:

```js
headers = { "authorization" :  "Bearer $token" }
```

this is equivalent to `huggingface_hub.list_organization_followers()`.

## Resource Groups API

The following endpoints manage resource groups. Resource groups is an Enterprise feature.

### GET /api/organizations/{name}/resource-groups

Get all resource groups in an organization that the authenticated user has access to view.


### GET /api/organizations/{name}/resource-groups/{resourceGroupId}

Get detailed information about a specific resource group.


### POST /api/organizations/{name}/resource-groups

Create a new resource group in the organization.

Parameters:
- `name`: Name of the resource group (required)
- `description`: Description of the resource group (optional)
- `users`: List of users and their roles in the resource group (optional)
- `repos`: List of repositories (optional)
- `autoJoin`: Settings for automatic user joining (optional)

Payload:
```js
payload = {
    "name": "name",
    "description": "description",
    "users": [
        {
            "user": "username",
            "role": "admin" // or "write" or "read"
        }
    ],
    "repos": [
        {
            "type": "dataset",
            "name": "huggingface/repo"
        }
    ]
}
```


### PATCH /api/organizations/{name}/resource-groups/{resourceGroupId}

Update a resource group's metadata.

Parameters:
- `name`: New name for the resource group (optional)
- `description`: New description for the resource group (optional)

Payload:
```js
payload = {
    "name": "name",
    "description": "description"
}
```


### POST /api/organizations/{name}/resource-groups/{resourceGroupId}/settings

Update a resource group's settings.

Payload:
```js
payload = {
    "autoJoin": {
        "enabled": true,
        "role": "read" // or "write" or "admin"
    }
}
```


### DELETE /api/organizations/{name}/resource-groups/{resourceGroupId}

Delete a resource group.


### POST /api/organizations/{name}/resource-groups/{resourceGroupId}/users

Add users to a resource group.

Payload:
```js
payload = {
    "users": [
        {
            "user": "username",
            "role": "admin" // or "write" or "read"
        }
    ]
}
```


### DELETE /api/organizations/{name}/resource-groups/{resourceGroupId}/users/{username}

Remove a user from a resource group.


### PATCH /api/organizations/{name}/resource-groups/{resourceGroupId}/users/{username}

Update a user's role in a resource group.

Payload:
```js
payload = {
    "role": "admin" // or "write" or "read"
}
```

### POST /api/(models|spaces|datasets)/{namespace}/{repo}/resource-group

Update resource group's repository.

Payload:
```js
payload = {
    "resourceGroupId": "6771d4700000000000000000" // (allow `null` for removing the repo's resource group)
}
```

### GET /api/(models|spaces|datasets)/{namespace}/{repo}/resource-group

Get detailed repository's resource group


## Paper Pages API

The following endpoint gets information about a paper.

### GET /api/papers/{arxiv_id}

Get the API equivalent of the Paper page, i.e., metadata like authors, summary, and discussion comments.

### GET /api/arxiv/{arxiv_id}/repos

Get all the models, datasets, and Spaces that refer to a paper.

### GET /api/daily_papers

Get the daily papers curated by AK and the community. It's the equivalent of [https://huggingface.co/papers](https://huggingface.co/papers).

To filter on a particular date, simply pass the date like so: https://huggingface.co/api/daily_papers?date=2025-03-31.

## Collections API

Use Collections to group repositories from the Hub (Models, Datasets, Spaces and Papers) on a dedicated page.

You can learn more about it in the Collections [guide](./collections). Collections can also be managed using the Python client (see [guide](https://huggingface.co/docs/huggingface_hub/main/en/guides/collections)).

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

### GET /api/collections

List collections from the Hub, based on some criteria. The supported parameters are:
- `owner` (string): filter collections created by a specific user or organization.
- `item` (string): filter collections containing a specific item. Value must be the item_type and item_id concatenated. Example: `"models/teknium/OpenHermes-2.5-Mistral-7B"`, `"datasets/rajpurkar/squad"` or `"papers/2311.12983"`.
- `sort` (string): sort the returned collections. Supported values are `"lastModified"`, `"trending"` (default) and `"upvotes"`.
- `limit` (int): maximum number (100) of collections per page.
- `q` (string): filter based on substrings for titles & descriptions.

If no parameter is set, all collections are returned.

The response is paginated. To get all collections, you must follow the [`Link` header](https://docs.github.com/en/rest/guides/using-pagination-in-the-rest-api?apiVersion=2022-11-28#link-header).

> [!WARNING]
> When listing collections, the item list per collection is truncated to 4 items maximum. To retrieve all items from a collection, you need to make an additional call using its collection slug.

Payload:

```js
params = {
    "owner": "TheBloke",
    "item": "models/teknium/OpenHermes-2.5-Mistral-7B",
    "sort": "lastModified",
    "limit" : 1,
}
```

This is equivalent to `huggingface_hub.list_collections()`.

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
