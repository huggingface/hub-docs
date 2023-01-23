# Webhook guide: Setup an automatic system to re-train a model when a dataset changes

This guide will help walk you through the set up of an automatic training pipeline on the HuggingFace platform
using HF Webhooks, Spaces and AutoTrain.

We will build a Webhook that listens to changes on an image classification dataset and triggers a fine-tuning
of [microsoft/resnet-50](https://huggingface.co/microsoft/resnet-50) using [AutoTrain](https://huggingface.co/autotrain).



## Prerequisite: Upload your dataset to the Hub

We will use a [simple image classification dataset](https://huggingface.co/datasets/huggingface-projects/auto-retrain-input-dataset) for the sake
of the example. Learn more about uploading your data to the Hub here: https://huggingface.co/docs/datasets/upload_dataset.

![dataset](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/webhooks-guides/002-auto-retrain/dataset.png)

## Create a webhook to react to the dataset's changes

First, let's create a webhook from your settings: https://huggingface.co/settings/webhooks.

- Select your dataset as the target repository. We will target [huggingface-projects/input-dataset](https://huggingface.co/datasets/huggingface-projects/input-dataset) in this example.
- You can put a dummy Webhook URL for now. Defining your webhook will let you take a look at the events that are going to be sent to it. You can also replay them, which will be useful for debugging!
- Input a secret to make it more secure.
- Subscribe to "Repo update" events as we want to react to data changes

Your webhook will look like this:

![webhook-creation](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/webhooks-guides/002-auto-retrain/webhook-creation.png)

## Create a Space to react to your webhook

We now need a way to react to your webhook events. An easy way to do this is to use a [Space](https://huggingface.co/docs/hub/spaces-overview)!

You can find an example Space [here](https://huggingface.co/spaces/huggingface-projects/auto-retrain/tree/main).

This Space uses Docker, Python, [FastAPI](https://fastapi.tiangolo.com/) and [uvicorn](https://www.uvicorn.org) to run a simple HTTP server. Read more about Docker Spaces [here](https://huggingface.co/docs/hub/spaces-sdks-docker).


The entry point is [src/main.py](https://huggingface.co/spaces/huggingface-projects/auto-retrain/blob/main/src/main.py). Let's walk through this file and detail what it does:

1. It spawns a FastAPI app that will listen to HTTP `POST` requests on `/webhook`:

```python
from fastapi import FastAPI

# [...]
@app.post("/webhook)
async def post_webhook(
	# ...
):
	# ...
```

2. This route checks that the `X-Webhook-Secret` header is present, and that its value is the same as the one you set in your webhook's settings. The `WEBHOOK_SECRET` secret must be set in the Space's settings, and be the same as the secret set in your webhook.

```python
# [...]

WEBHOOK_SECRET = os.getenv("WEBHOOK_SECRET")

# [...]

@app.post("/webhook")
async def post_webhook(
	# [...]
	x_webhook_secret:  Optional[str] = Header(default=None),
	# ^ checks for the X-Webhook-Secret HTTP header
):
	if x_webhook_secret is None:
		raise HTTPException(401)
	if x_webhook_secret != WEBHOOK_SECRET:
		raise HTTPException(403)
	# [...]
```

3. The event's payload is encoded as JSON. Here, we'll be using pydantic models to parse the event payload. We also specify that we will run our webhook only when:
- the event concerns the input dataset
- the event is an update on the repo's content, i.e. there has been a new commit


```python
# defined in src/models.py
class WebhookPayloadEvent(BaseModel):
	action: Literal["create", "update", "delete"]
	scope: str

class WebhookPayloadRepo(BaseModel):
	type: Literal["dataset", "model", "space"]
	name: str
	id: str
	private: bool
	headSha: str

class WebhookPayload(BaseModel):
	event: WebhookPayloadEvent
	repo: WebhookPayloadRepo

# [...]

@app.post("/webhook)
async def post_webhook(
	# [...]
	payload: WebhookPayload,
	# ^ Pydantic model defining the payload format
):
	# [...]
	if not (
		payload.event.action == "update"
		and payload.event.scope.startswith("repo.content")
		and payload.repo.name == config.input_dataset
		and payload.repo.type == "dataset"
	):
		# no-op if the payload does not match our expectations
		return {"processed": False}
	#[...]
```

4. If the payload is valid, the next step is to create a project on AutoTrain, schedule a fine tuning of the input model (`microsoft/resnet-50` in our example) on the input dataset, and create a discussion on the dataset when it's done!

```python
def schedule_retrain(payload: WebhookPayload):
	# Create the autotrain project
	try:
		project = AutoTrain.create_project(payload)
		AutoTrain.add_data(project_id=project["id"])
		AutoTrain.start_processing(project_id=project["id"])
	except requests.HTTPError as err:
		print("ERROR while requesting AutoTrain API:")
		print(f"  code: {err.response.status_code}")
		print(f"  {err.response.json()}")
		raise
	# Notify in the community tab
	notify_success(project["id"])
```

Visit the link inside the comment to review the training cost estimate, and start fine-tuning the model!

![community tab notification](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/webhooks-guides/002-auto-retrain/notification.png)


In this example, we used HuggingFace AutoTrain to quickly fine-tune our model, but you can of course plug in your own training infrastructure!

Feel free to duplicate the Space to your personal namespace and play with it.
You will need to provide two secrets:
- `WEBHOOK_SECRET` : the secret from your webhook.
- `HF_ACCESS_TOKEN` : a User Access Token with `write` rights. You can create one [from your settings](https://huggingface.co/settings/tokens).

You will also need to tweak the [`config.json` file](https://huggingface.co/spaces/huggingface-projects/auto-retrain/blob/main/config.json) to use the dataset and model of you choice:

```json
{
	"target_namespace": "the namespace where the trained model should end up",
	"input_dataset": "the dataset on which the model will be trained",
	"input_model": "the base model to re-train",
	"autotrain_project_prefix": "A prefix for the AutoTrain project"
}
```

![duplicate-space](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/webhooks-guides/002-auto-retrain/duplicate-space.png)


## Configure your webhook to send events to your Space

Last but not least, you'll need to configure your webhook to send POST requests to your Space.

Let's first grab our Space's "direct URL" from the contextual menu. Click on "Embed this Space" and copy the "Direct URL".

![embed this Space](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/webhooks-guides/002-auto-retrain/duplicate-space.png)
![direct URL](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/webhooks-guides/002-auto-retrain/direct-url.png)

Update your webhook to send requests to that URL:

![webhook settings](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/webhooks-guides/002-auto-retrain/update-webhook.png)

And that's it! Now every commit to the input dataset will trigger a fine-tuning of ResNet-50 with AutoTrain 🎉
