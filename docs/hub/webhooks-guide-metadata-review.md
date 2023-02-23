# Webhook guide: Setup an automatic metadata quality review for models and datasets 

<Tip>

Webhooks are now publicly available!

</Tip>

This guide will walk you through creating a system that reacts to changes to a user's or organization's models or datasets on the Hub and creates a 'metadata review' for the changed repository. 

## What are we building and why?

Before we dive into the technical details involved in this particular workflow, we'll quickly outline what we're creating and why. 

[Model cards](https://huggingface.co/docs/hub/model-cards) and [dataset cards](https://huggingface.co/docs/hub/datasets-cards) are essential tools for documenting machine learning models and datasets. The Hugging Face Hub uses a `README.md` file containing a [YAML](https://en.wikipedia.org/wiki/YAML) header block to generate model and dataset cards. This `YAML` section defines metadata relating to the model or dataset. For example: 

```yaml
---
language: 
  - "List of ISO 639-1 code for your language"
  - lang1
  - lang2
tags:
- tag1
- tag2
license: "any valid license identifier"
datasets:
- dataset1
---
```

This metadata contains essential information about your model or dataset for potential users. The license, for example, defines the terms under which a model or dataset can be used. Hub users can also use the fields defined in the `YAML` metadata as filters for identifying models or datasets that fit specific criteria. 

Since the metadata defined in this block is essential for potential users of our models and datasets, it is important that we complete this section. In a team or organization setting, users pushing models and datasets to the Hub may have differing familiarity with the importance of this YAML metadata block. While someone in a team could take on the responsibility of reviewing this metadata, there may instead be some automation we can do to help us with this problem. The result will be a metadata review report automatically posted or updated when a repository on the Hub changes. For our metadata quality, this system works similarly to [CI/CD](https://en.wikipedia.org/wiki/CI/CD).

![Metadata review](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/webhooks-guides/003-metadata-review/metadata-report-screenshot.png)

You can also find an example review [here](https://huggingface.co/datasets/davanstrien/test_webhook/discussions/1#63d932fe19aa7b8ed2718b3f). 


## Using the Hub Client Library to create a model review card 

The `huggingface_hub` is a Python library that allows you to interact with the Hub. We can use this library to [download model and dataset cards](https://huggingface.co/docs/huggingface_hub/how-to-model-cards) from the Hub using the `DatasetCard.load` or `ModelCard.load` methods. In particular, we'll use these methods to load a Python dictionary, which contains the metadata defined in the `YAML` of our model or dataset card. We'll create a small Python function to wrap these methods and do some exception handling. 

```python
from huggingface_hub import DatasetCard, ModelCard
from huggingface_hub.utils import EntryNotFoundError 

def load_repo_card_metadata(repo_type, repo_name):
    if repo_type == "dataset":
        try:
            return DatasetCard.load(repo_name).data.to_dict()
        except EntryNotFoundError:
            return {}
    if repo_type == "model":
        try:
            return ModelCard.load(repo_name).data.to_dict()
        except EntryNotFoundError:
            return {}
```

This function will return a Python dictionary containing the metadata associated with the repository (or an empty dictionary if there is no metadata).

```python
{'license': 'afl-3.0'}
```

## Creating our metadata review report

Once we have a Python dictionary containing the metadata associated with a repository, we'll create a 'report card' for our metadata review. In this particular instance, we'll review our metadata by defining some metadata fields for which we want values. For example, we may want to ensure that the `license` field has always been completed. To rate our metadata, we'll count which metadata fields are present out of our desired fields and return a percentage score based on the coverage of the required metadata fields we want to see values.

Since we have a Python dictionary containing our metadata, we can loop through this dictionary to check if our desired keys are there. If a desired metadata field (a key in our dictionary) is missing, we'll assign the value as `None`.

```python
def create_metadata_key_dict(card_data, repo_type: str):
    shared_keys = ["tags", "license"]
    if repo_type == "model":
        model_keys = ["library_name", "datasets", "metrics", "co2", "pipeline_tag"]
        shared_keys.extend(model_keys)
        keys = shared_keys
        return {key: card_data.get(key) for key in keys}
    if repo_type == "dataset":
        # [...]
```

This function will return a dictionary containing keys representing the metadata fields we require for our model or dataset. The dictionary values will either include the metadata entered for that field or `None` if that metadata field is missing in the `YAML`. 

```python
{'tags': None,
 'license': 'afl-3.0',
 'library_name': None,
 'datasets': None,
 'metrics': None,
 'co2': None,
 'pipeline_tag': None}
```

Once we have this dictionary, we can create our metadata report. In the interest of brevity, we won't include the complete code here, but the Hugging Face Spaces [repository](https://huggingface.co/spaces/librarian-bot/webhook_metadata_reviewer/blob/main/main.py) for this Webhook contains the full code.

We create one function which creates a markdown table that produces a prettier version of the data we have in our metadata coverage dictionary. 

```python
def create_metadata_breakdown_table(desired_metadata_dictionary):
    # [...]
    return tabulate(
        table_data, tablefmt="github", headers=("Metadata Field", "Provided Value")
    )
```

We also have a Python function that generates a score (representing the percentage of the desired metadata fields present)

```python
def calculate_grade(desired_metadata_dictionary):
    # [...]
    return round(score, 2)
```

and a Python function that creates a markdown report for our metadata review. This report contains both the score and metadata table, along with some explanation of what the report contains.


```python
def create_markdown_report(
    desired_metadata_dictionary, repo_name, repo_type, score, update: bool = False
):
    # [...]
    return report
```


## How to post the review automatically?

We now have a markdown formatted metadata review report. We'll use the `huggingface_hub` library to post this review. We define a function that takes back the Webhook data received from the Hub, parses the data, and creates the metadata report. Depending on whether a report has previously been created, the function creates a new report or posts a new issue to an existing metadata review thread.

```python
def create_or_update_report(data):
    if parsed_post := parse_webhook_post(data):
        repo_type, repo_name = parsed_post
    else:
        return Response("Unable to parse webhook data", status_code=400)
    # [...]
    return True
```

<Tip>
    `:=` is the Python Syntax for an assignment expression operator added to the Python language in version 3.8 (colloquially known as the walrus operator). People have mixed opinions on this syntax, and it doesn't change how Python evaluates the code if you don't use this. You can read more about this operator in this [Real Python article](https://realpython.com/python-walrus-operator/).
</Tip>

## Creating a Webhook to respond to changes on the Hub

We've now got the core functionality for creating a metadata review report for a model or dataset. The next step is to use Webhooks to respond to changes automatically. 

## Create a Webhook in your user profile

First, create your Webhook by going to https://huggingface.co/settings/webhooks.

- Input a few target repositories that your Webhook will listen to (you will likely want to limit this to your own repositories or the repositories of the organization you belong to).
- Input a secret to make your Webhook more secure (if you don't know what to choose for this, you may want to use a [password generator](https://1password.com/password-generator/) to generate a sufficiently long random string for your secret).
- We can pass a dummy URL for the `Webhook URL` parameter for now. 

Your Webhook will look like this:

![webhook settings](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/webhooks-guides/003-metadata-review/webhook-settings.png)


## Create a new Bot user profile

This guide creates a separate user account that will post the metadata reviews. 

![Bot user account](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/webhooks-guides/003-metadata-review/librarian-bot-profile.png)

<Tip>
	When creating a bot that will interact with other users on the Hub, we ask that you clearly label the account as a "Bot" (see profile screenshot).
</Tip>


## Create a Webhook listener

We now need some way of listening to Webhook events. There are many possible tools you can use to listen to Webhook events. Many existing services, such as [Zapier](https://zapier.com/) and [IFTTT](https://ifttt.com), can use Webhooks to trigger actions (for example, they could post a tweet every time a model is updated). In this case, we'll implement our Webhook listener using  [FastAPI](https://fastapi.tiangolo.com/). 

[FastAPI](https://fastapi.tiangolo.com/) is a Python web framework. We'll use FastAPI to create a Webhook listener. In particular, we need to implement a route that accepts `POST` requests on `/webhook`. For authentication, we'll compare the `X-Webhook-Secret` header with a `WEBHOOK_SECRET` secret that can be passed to our [Docker container at runtime](./spaces-sdks-docker#runtime).


```python
from fastapi import FastAPI, Request, Response
import os

KEY = os.environ.get("WEBHOOK_SECRET")

app = FastAPI()

@app.post("/webhook")
async def webhook(request: Request):
    if request.method == "POST":
        if request.headers.get("X-Webhook-Secret") != KEY:
            return Response("Invalid secret", status_code=401)
        data = await request.json()
        result = create_or_update_report(data)
        return "Webhook received!" if result else result
```

The above function will receive Webhook events and creates or updates the metadata review report for the changed repository.

## Use Spaces to deploy our Webhook app 

Our [main.py](https://huggingface.co/spaces/librarian-bot/webhook_metadata_reviewer/blob/main/main.py) file contains all the code we need for our Webhook app. To deploy it, we'll use a [Space](./spaces-overview). 

For our Space, we'll use Docker to run our app. The [Dockerfile](https://huggingface.co/spaces/librarian-bot/webhook_metadata_reviewer/blob/main/Dockerfile) copies our app file, installs the required dependencies, and runs the application. To populate the `KEY` variable, we'll also set a `WEBHOOK_SECRET` secret for our Space with the secret we generated earlier. You can read more about Docker Spaces [here](./spaces-sdks-docker).

Finally, we need to update the URL in our Webhook settings to the URL of our Space. We can get our Space’s “direct URL” from the contextual menu. Click on “Embed this Space” and copy the “Direct URL”.

![direct url](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/webhooks-guides/003-metadata-review/direct-url.png)

Once we have this URL, we can pass this to the `Webhook URL` parameter in our Webhook settings. Our bot should now start posting reviews when monitored repositories change! 

## Conclusion and next steps

We now have an automatic metadata review bot! Here are some ideas for how you could build on this guide:

- The metadata review done by our bot was relatively crude; you could add more complex rules for reviewing metadata.
- You could use the full `README.md` file for doing the review.
- You may want to define 'rules' which are particularly important for your organization and use a webhook to check these are followed.

If you build a metadata quality app using Webhooks, please tag me @davanstrien; I would love to know about it! 

