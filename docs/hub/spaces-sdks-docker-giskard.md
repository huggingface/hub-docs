# Giskard on Spaces

**Giskard** is an AI model quality testing toolkit for LLMs, tabular, and NLP models. It consists of an open-source Python 
library for scanning and testing AI models and an AI Model Quality Testing app, which can now be deployed using Hugging Face's 
Docker Spaces. Extending the features of the open-source library, the AI Model Quality Testing app enables you to:

- Debug tests to diagnose your issues

- Create domain-specific tests thanks to automatic model insights

- Compare models to decide which model to promote

- Collect business feedback of your model results

- Share your results with your colleagues for alignment

- Store all your QA objects (tests, data slices, evaluation criteria, etc.) in one place to work more efficiently

Visit [Giskard's documentation](https://docs.giskard.ai/) and [Quickstart Guides](https://docs.giskard.ai/en/latest/getting_started/quickstart/index.html) 
to learn how to use the full range of tools provided by Giskard.

In the next sections, you'll learn to deploy your own Giskard AI Model Quality Testing app and use it right from 
HuggingFace Spaces. This Giskard app is a **self-contained application completely hosted on Spaces using Docker**.

## Deploy Giskard on Spaces

You can deploy Giskard on Spaces with just a few clicks:

<a  href="https://huggingface.co/new-space?template=giskardai%2Fgiskard">
    <img src="https://huggingface.co/datasets/huggingface/badges/resolve/main/deploy-to-spaces-lg.svg" />
</a>


<Tip>
IMPORTANT NOTE ABOUT DATA PERSISTENCE:
You can use the Giskard Space as is for initial exploration and experimentation. For **longer use in 
small-scale projects, activate the paid persistent storage option**. This prevents data loss during Space restarts which 
occur every 24 hours.
</Tip>

You need to define the **Owner** (your personal account or an organization), a **Space name**, and the **Visibility**. 
If you don’t want to publicly share your models and quality tests, set your Space to **Private**.

<div class="flex justify-center">
<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-giskard-new-space.png"/>
</div>

Once you have created the Space, you'll see the `Building` status and once it becomes `Running` your space is ready to go. 
If you don't see a change in the screen, refresh the page.

## Request a free license

Once your Giskard Space is up and running, you'll need to request a free license to start using the app. 
You will then automatically receive an email with the license file. 

<div class="flex justify-center">
<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-giskard-free-license.png"/>
</div>

## Create a new Giskard project

Once inside the app, start by creating a new project from the welcome screen.

<div class="flex justify-center">
<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-giskard-create-project.png"/>
</div>

## Generate a Giskard API key

The Giskard API key is used to establish communication between the environment where your AI models are running and 
the Giskard app on HuggingFace Spaces. If you've set the **Visibility** of your Space to **Private**, you will need to provide a HuggingFace 
user access token to generate the Giskard API key and establish a communication. To do so, follow the instructions 
displayed in the settings page of the Giskard app.

<div class="flex justify-center">
<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-giskard-access-token.png"/>
</div>

## Start the ML worker

Giskard executes your model using a worker that runs the model directly in your Python environment, with all the 
dependencies required by your model. You can either execute the ML worker:

- From your local notebook within the kernel that contains all the dependencies of your model

- From Google Colab within the kernel that contains all the dependencies of your model

- Or from your terminal within the Python environment that contains all the dependencies of your model

Simply run the following command within the Python environment that contains all the dependencies of your model:

```bash
giskard worker start -d -k YOUR_KEY -u https://XXX.hf.space -t HF-TOKEN
```

## Upload your test suite, models and datasets

In order to start building quality tests for a project, you will need to upload model and dataset objects, and either create or 
upload a test suite from the Giskard Python library. 

<Tip>
For more information on how to create test suites from Giskard's Python library's automated model scanning tool, head 
over to Giskard's [Quickstart Guides](https://docs.giskard.ai/en/latest/getting_started/quickstart/index.html).
</Tip>

These actions will all require a connection between your Python environment and 
the Giskard Space. Achieve this by initializing a Giskard Client: simply copy the “Create a Giskard Client” snippet 
from the settings page of the Giskard app and run it within your Python environment. This will look something like this:

```python
from giskard import GiskardClient

url = "https://user_name-space_name.hf.space"
api_key = "gsk-xxx"
hf_token = "xxx"

# Create a giskard client to communicate with Giskard
client = GiskardClient(url, api_key, hf_token)
```

If you run into issues, head over to Giskard's [upload object documentation page](https://docs.giskard.ai/en/latest/giskard_hub/upload/index.html).

## Feedback and support

If you have suggestions or need specific support, please join [Giskard's Discord community](https://discord.com/invite/ABvfpbu69R) or reach out on [Giskard's GitHub repository](https://github.com/Giskard-AI/giskard).
