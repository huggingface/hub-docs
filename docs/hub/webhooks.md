# Webhooks

Webhooks allow you to know when new changes happen on specific repos or repos belonging to specific users / organizations (not just your repos, but any repo!).

You can configure the webhooks in your [settings](https://huggingface.co/settings/webhooks).

You can watch repo changes or community events. If you watch all repos belonging to a user or an organization, you can also receive events for repo creation.

## Webhook payloads

After registering a webhook, you will be notified of events via an `HTTP POST` call on the specified URL. The payload is encoded in JSON.

To determine the nature of the event, you can look at the `event` and `domain` fields in the payload.

You can check the last payloads sent in the activity tab of the webhook page, as well as replay webhooks.

### Event & Domain

The top-level properties `event` and `domain` are always specified and used to determine the nature of the event.

`event` can take one of the following values: 

- `"create"`
- `"delete"`
- `"update"`
- `"move"`

`domain` specifies the domain of the event. It can be one of the following values:


- `["repo"]` - Global events on repos: create, delete, move
- `["repo", "content"]` - Events on the content of the repo, like new commits or tags. Triggers on new pull requests as well due to the newly created reference / commit.
- `["repo", "config"]` - Events on the config: update space secrets, update settings, update DOIs, disabled or not, ...
- `["community", "discussion"]` - Creating a discussion or pull request, updating the title or status
- `["community", "discussion", "comment"]` - Creating, updating, hiding a comment

⚠️ **You should consider that any event on a more granular domain is an `"update"` on the encompassing domains.** ⚠️

For example, any event on `["community", "discussion", "..."]` is an `"update"` on `["community", "discussion"]`.

This is important in case more granularity is added to the domains by Hugging Face. For example if the domain domain `["repo", "config", "doi"]` is added, it would be accompanied by an `"add"` event when DOIs are created. 

If you follow the rule above, your application will treat any event on `["repo", "config", "doi"]` as an `"update"` on `["repo", "config"]`, and will not break if Hugging Face adds more granularity to its domains.

### Repo

In the current version of webhooks, the top level property `repo` is always specified, as events can always be associated to a repo. Sample payload:

```json
"repo": {
	"type": "model",
	"name": "some-user/some-repo",
	"gitalyUid": "583c43bd0009f32d976f788446d5010ed6ea4af0c6d0235358378cb56d312f2b",
	"id": "6366c000a2abcdf2fd69a080",
	"private": false,
	"url": {
		"web": "http://huggingface.co/some-user/some-repo",
		"api": "http://huggingface.co/api/models/some-user/some-repo"
	},
	"headSha": "c379e821c9c95d613899e8c4343e4bfee2b0c600",
	"tags": [
		"license:other",
		"has_space"
	],
	"author": {
		"id": "61d2000c3c2083e1c08af22d"
	}
}
```

`headSha` is only sent when the domain starts with `"repo"`, it's not sent on community events.

### Discussion

The top level property `discussion` is specified on community events. Its `isPullRequest` property is a boolean indicating if the discussion is also a pull request. Sample payload:

```json
"discussion": {
	"id": "639885d811ae2bad2b7ba461",
	"title": "Hello!",
	"url": {
		"web": "https://huggingface.co/some-user/some-repo/discussions/3",
		"api": "https://huggingface.co/api/models/some-user/some-repo/discussions/3"
	},
	"status": "open",
	"author": {
		"id": "61d2000c3c2083e1c08af22d"
	},
	"isPullRequest": true,
	"changes": {
		"base": "refs/heads/main"
	}
	"num": 3
}
```

### Comment

The top level property `comment` is specified when a comment is created, including on discussion creation, or updated. Sample payload:

```json
"comment": {
	"id": "6398872887bfcfb93a306f18",
	"author": {
		"id": "61d2000c3c2083e1c08af22d"
	},
	"content": "This adds an env key",
	"hidden": false,
	"url": {
		"web": "http://huggingface.co/some-user/some-repo/discussions/4#6398872887bfcfb93a306f18"
	}
}
```

## Webhook secret

You can associate a secret to your webhook in two ways:

- Updating the url of the webhook to add your secret as a query parameter.
- Setting the secret on the webhook. It will be sent as a `X-Webhook-Secret` HTTP header on every request.