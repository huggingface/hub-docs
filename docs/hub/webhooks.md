# Webhooks

<Tip warning={true}>

**Join the [webhooks-explorers](https://huggingface.co/webhooks-explorers) organization to beta-test webhooks!**

</Tip>

Webhooks are a foundation for MLOps related features. You can use them to auto-convert models, build community bots, or build CI/CD for your models, datasets, and Spaces.

They allow you to listen for new changes on specific repos or to all repos belonging to particular users/organizations (not just your repos, but any repo).

The documentation for webhooks is below – or you can also browse our **guides** showcasing a few possible use cases of Webhooks:
- [to automatically fine-tune a new model whenever a dataset gets updated](./webhooks-guide-auto-retrain)
- [to create a discussion bot on the Hub, using a LLM API](./webhooks-guide-discussion-bot)
- and more to come…

## Create your webhook

You can create new webhooks and edit existing ones in your webhooks [settings](https://huggingface.co/settings/webhooks):

![Settings of an individual webhook](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/webhook-settings.png)

Webhooks can watch for repos updates, Pull requests, discussions, and new comments. It's even possible to create a Space to react to your webhooks!

## Webhook Payloads

After registering a webhook, you will be notified of new events via an `HTTP POST` call on the specified target URL. The payload is encoded in JSON.

You can view the history of payloads sent in the activity tab of the webhook settings page, it's also possible to replay past webhooks for easier debugging:


![image.png](https://s3.amazonaws.com/moonup/production/uploads/1671034300077-61d2f90c3c2083e1c08af22d.png)

As an example, here is the full payload when a Pull request is opened:

```json
{
  "event": {
    "action": "create",
    "scope": "discussion"
  },
  "repo": {
    "type": "model",
    "name": "gpt2",
    "id": "621ffdc036468d709f17434d",
    "private": false,
    "url": {
      "web": "https://hugginface.co/gpt2",
      "api": "https://hugginface.co/api/models/gpt2"
    },
    "owner": {
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

`event.scope` will be one of the following values:

- `"repo"` - Global events on repos. Possible values for the associated `action`: `"create"`, `"delete"`, `"update"`, `"move"`.
- `"repo.content"` - Events on the repo's content, such as new commits or tags. It triggers on new Pull requests as well due to the newly created reference/commit. The associated `action` is always `"update"`.
- `"repo.config"` - Events on the config: update Space secrets, update settings, update DOIs, disabled or not, etc. The associated `action` is always `"update"`.
- `"discussion"` - Creating a discussion or Pull request, updating the title or status, and merging.  Possible values for the associated `action`: `"create"`, `"delete"`, `"update"`.
- `"discussion.comment"` - Creating, updating, and hiding a comment. Possible values for the associated `action`: `"create"`, `"update"`.

More scopes can be added in the future. To handle unknown events, your webhook handler can consider any action on a narrowed scope to be an `"update"` action on the broader scope.

For example, if the `"repo.config.dois"` scope is added in the future, any event with that scope can be considered by your webhook handler as an `"update"` action on the `"repo.config"` scope.

### Repo

In the current version of webhooks, the top level property `repo` is always specified, as events can always be associated to a repo. For example, consider the following value:

```json
"repo": {
	"type": "model",
	"name": "some-user/some-repo",
	"id": "6366c000a2abcdf2fd69a080",
	"private": false,
	"url": {
		"web": "https://huggingface.co/some-user/some-repo",
		"api": "https://huggingface.co/api/models/some-user/some-repo"
	},
	"headSha": "c379e821c9c95d613899e8c4343e4bfee2b0c600",
	"tags": [
		"license:other",
		"has_space"
	],
	"owner": {
		"id": "61d2000c3c2083e1c08af22d"
	}
}
```

`repo.headSha` is the sha of the latest commit on the repo's `main` branch. It is only sent when `event.scope` starts with `"repo"`, not on community events like discussions and comments.

### Discussion and Pull Requests

The top-level property `discussion` is specified on community events (discussions and Pull requests). The `discussion.isPullRequest` property is a boolean indicating if the discussion is also a Pull request (on the Hub, a PR is a special type of discussion). Here is an example value:

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
		"web": "https://huggingface.co/some-user/some-repo/discussions/4#6398872887bfcfb93a306f18"
	}
}
```

## Webhook secret

Setting a webhook secret is useful to make sure payloads sent to your webhook handler URL are actually from Hugging Face.

If you set a secret for your webhook, it will be sent along as an `X-Webhook-Secret` HTTP header on every request. Only ASCII characters are supported.

<Tip>
It's also possible to add the secret directly in the handler URL. For example, setting it as a query parameter: https://example.com/webhook?secret=XXX.

This can be helpful if accessing the HTTP headers of the request is complicated for your webhook handler.
</Tip>

## Rate limiting

Each webhook is limited to 1,000 triggers per 24 hours. You can view your usage in the Webhook settings page in the "Activity" tab.

If you need to increase the number of triggers for your webhook, contact us at website@huggingface.co.

## Developing your webhooks

In case you do not have an HTTPS endpoint/URL to use, you can try out public tools for webhook testing. These tools act as catch-all (captures all requests) sent to them and gives 20 OK. [Beeceptor](https://beeceptor.com/) is one such tool that you can use to create a temporary HTTP endpoint and review the incoming payload. Another such tool is [Webhook.site](https://webhook.site/).

Additionally, if you have your webhook code running locally on your machine but you need to expose it to the Internet to be able to use it, you can use [ngrok](https://ngrok.com/) or [localtunnel](https://theboroer.github.io/localtunnel-www/).

## Debugging webhooks

You can easily find recently generated events for your webhooks. Open the activity tab for your webhook, there you will see the list of recent events.

 ![image.png](https://s3.amazonaws.com/moonup/production/uploads/1671035382840-61d2f90c3c2083e1c08af22d.png)
 
Here you can review the HTTP status code and the payload of the generated events. Additionally, you can replay these events by clicking on the `replay` button! 

Note: When changing the target URL or secret of a webhook, replaying an event will send the payload to the updated URL.

## FAQ

##### Can I define webhooks on my organization vs my user account?

No, this is not currently supported.

##### How can I subscribe to events on all repos (or across a whole repo type, like on all models)?

This is not currently exposed to end users but we can toggle this for you if you send an email to website@huggingface.co.
