# Webhooks

Webhooks are a foundation for MLOps related features. You can use this to auto-convert models, build community bots, or build CI/CD for your datasets or Spaces…

They allow you to react when new changes happen on specific repos or repos belonging to specific users / organizations (not just your repos, but any repo!).

You can configure the webhooks in your [settings](https://huggingface.co/settings/webhooks):

![Settings of an individual webhook](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/webhook-settings.png)

You can watch repo changes and discussions / pull requests / comments. You can even use a Space to react to webhooks!

<!-- Todo: add a link to a guide with a real example -->

## Webhook Payloads

After registering a webhook, you will be notified of events via an `HTTP POST` call on the specified URL. The payload is encoded in JSON.

You can check the last payloads sent in the activity tab of the webhook page, as well as replay webhooks:


![image.png](https://s3.amazonaws.com/moonup/production/uploads/1671034300077-61d2f90c3c2083e1c08af22d.png)

As an example, here is the full payload when a pull request is opened:

```json
{
  "event": {
    "action": "create",
    "scope": "discussion"
  },
  "repo": {
    "type": "model",
    "name": "gpt2",
    "gitalyUid": "aed40ec4b80dfaffc3f076570c546561e00e5e2a95de8166bea95dd930b76387",
    "id": "621ffdc036468d709f17434d",
    "private": false,
    "url": {
      "web": "https://hugginface.co/gpt2",
      "api": "https://hugginface.co/api/models/gpt2"
    },
    "author": {
      "id": "628b753283ef59b5be89e937"
    }
  },
  "discussion": {
    "id": "6399f58518721fdd27fc9ca9",
    "title": "Update co2 emissions",
    "url": {
      "web": "https://hugginface.co/gpt2/discussions/19",
      "api": "https://hugginface.co/api/models/gpt2/discussions/19"
    },
    "status": "open",
    "author": {
      "id": "61d2f90c3c2083e1c08af22d"
    },
    "num": 19,
    "isPullRequest": true,
    "changes": {
      "base": "refs/heads/main"
    }
  },
  "comment": {
    "id": "6399f58518721fdd27fc9caa",
    "author": {
      "id": "61d2f90c3c2083e1c08af22d"
    },
    "content": "Add co2 emissions information to the model card",
    "hidden": false,
    "url": {
      "web": "https://hugginface.co/gpt2/discussions/19#6399f58518721fdd27fc9caa"
    }
  },
  "webhook": {
    "id": "6390e855e30d9209411de93b",
    "version": 3
  }
}
```

### Event

The top-level properties `event` is always specified and used to determine the nature of the event.

It has two sub-properties: `event.action` and `event.scope`.

`event.scope` can take one of the following values:

- `"repo"` - Global events on repos. Possible values for the associated `action`: `"create"`, `"delete"`, `"update"`, `"move"`.
- `"repo.content"` - Events on the content of the repo, like new commits or tags. Triggers on new pull requests as well due to the newly created reference / commit. The associated `action` is always `"update"`.
- `"repo.config"` - Events on the config: update space secrets, update settings, update DOIs, disabled or not, ... The associated `action` is always `"update"`.
- `"discussion"` - Creating a discussion or pull request, updating the title or status (including merging).  Possible values for the associated `action`: `"create"`, `"delete"`, `"update"`.
- `"discussion.comment"` - Creating, updating, hiding a comment. Possible values for the associated `action`: `"create"`, `"update"`.

More scopes can be added in the future. To handle unknown events, your webhook handler can consider any action on a narrowed scope to be an `"update"` action on the broader scope.

For example, if the `"repo.config.dois"` scope is added in the future, any event with that scope can be considered by your webhook handler as an `"update"` action on the `"repo.config"` scope.

### Repo

In the current version of webhooks, the top level property `repo` is always specified, as events can always be associated to a repo. For example, consider the following value:

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

`repo.headSha` is the sha of the latest commit on the repo's `main` branch. It is only sent when `event.scope` starts with `"repo"`, not on community events like discussions and comments.

### Discussion

The top level property `discussion` is specified on community events. The `discussion.isPullRequest` property is a boolean indicating if the discussion is also a pull request (on HF, a PR is a special case of a Discussion). Here is an example value:

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

The top level property `comment` is specified when a comment is created (including on discussion creation) or updated. Here is an example value:

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

If you set a secret for your webhook, it will be sent along as an `X-Webhook-Secret` HTTP header on every request. Only ASCII characters are supported.

<Tip>
You can also change the URL of the webhook to add a secret to the URL. For example, setting it to `https://example.com/webhook?secret=XXX`.

This can be helpful if accessing the HTTP headers of the request is complicated for your webhook handler.
</Tip>

## Debugging webhooks

Go in the activity tab for your webhook, there you will see the list of recent events.

 ![image.png](https://s3.amazonaws.com/moonup/production/uploads/1671035382840-61d2f90c3c2083e1c08af22d.png)
 
You will see the HTTP status code and the payload of the events. You can replay events too by clicking on the `replay` button!

It is possible to change the url or secret of the webhook and then replay an event; it will send the payload to the updated URL.