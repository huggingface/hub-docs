# Spaces Overview

Hugging Face Spaces make it easy for you to create and deploy ML-powered demos in minutes. Watch the following video for a quick introduction to Spaces:

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/3bSVKNKb_PY" title="Spaces intro" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

In the following sections, you'll learn the basics of creating a Space, configuring it, and deploying your code to it.

## Creating a new Space

**To make a new Space**, visit the [Spaces main page](https://huggingface.co/spaces) and click on **Create new Space**. Along with choosing a name for your Space, selecting an optional license, and setting your Space's visibility, you'll be prompted to choose the **SDK** for your Space. The Hub offers three SDK options: Gradio, Docker and static HTML. If you select "Gradio" as your SDK, you'll be navigated to a new repo showing the following page:

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-blank-space.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-blank-space-dark.png"/>
</div>

Under the hood, Spaces stores your code inside a git repository, just like the model and dataset repositories. Thanks to this, the same tools we use for all the [other repositories on the Hub](./repositories) (`git` and `git-lfs`) also work for Spaces. Follow the same flow as in [Getting Started with Repositories](./repositories-getting-started) to add files to your Space. Each time a new commit is pushed, the Space will automatically rebuild and restart.

For step-by-step tutorials to creating your first Space, see the guides below:
* [Creating a Gradio Space](./spaces-sdks-gradio)
* [Creating a Docker Space](./spaces-sdks-docker-first-demo)

## Hardware resources

Each Spaces environment is limited to 16GB RAM, 2 CPU cores and 50GB of (not persistent) disk space by default, which you can use free of charge. You can upgrade to better hardware, including a variety of GPU accelerators and persistent storage, for a [competitive price](https://huggingface.co/pricing#spaces). To request an upgrade, please click the _Settings_ button in your Space and select your preferred hardware environment.

| **Hardware**        	| **GPU Memory** 	| **CPU** 	| **Memory** 	| **Disk** 	| **Hourly Price** 	|
|---------------------	|----------------	|----------	|------------	|----------	| ----------------	|
| CPU Basic           	| -             	| 2 vCPU  	| 16 GB     	| 50 GB    	| Free!            	|
| CPU Upgrade         	| -             	| 8 vCPU  	| 32 GB      	| 50 GB    	| $0.03            	|
| Nvidia T4 - small   	| 16GB          	| 4 vCPU  	| 15 GB      	| 50 GB    	| $0.60            	|
| Nvidia T4 - medium  	| 16GB          	| 8 vCPU  	| 30 GB      	| 100 GB   	| $0.90            	|
| Nvidia A10G - small 	| 24GB          	| 4 vCPU  	| 15 GB      	| 110 GB   	| $1.05            	|
| Nvidia A10G - large 	| 24GB          	| 12 vCPU 	| 46 GB      	| 200 GB   	| $3.15            	|
| 2x Nvidia A10G - large| 48GB          	| 24 vCPU 	| 92 GB      	| 1000 GB  	| $5.70            	|
| 4x Nvidia A10G - large| 96GB          	| 48 vCPU 	| 184 GB     	| 2000 GB  	| $10.80           	|
| Nvidia A100 - large 	| 40GB          	| 12 vCPU 	| 142 GB     	| 1000 GB  	| $4.13            	|

| **Storage tier**     	| **Size**             	| **Persistent** 	| **Monthly price** 	|
|---------------------	|----------------------	|------------------	| ---------------------	|
| Ephemeral (default) 	| 50GB                	| No               	| Free!                	|
| Small               	| Ephemeral + 20GB    	| Yes              	| $5                   	|
| Medium              	| Ephemeral + 150GB   	| Yes              	| $25                  	|
| Large               	| Ephemeral + 1TB     	| yes              	| $100                 	|

Note: Find more detailed and comprehensive pricing information on [our pricing page](https://huggingface.co/pricing).

Do you have an awesome Space but need help covering the hardware upgrade costs? We love helping out those with an innovative Space so please feel free to apply for a community GPU grant using the link in the _Settings_ tab of your Space and see if yours makes the cut!

Read more in our dedicated sections on [Spaces GPU Upgrades](./spaces-gpus) and [Spaces Storage Upgrades](./spaces-storage).

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-gpu-settings.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-gpu-settings-dark.png"/>
</div>

## Managing secrets and environment variables[[managing-secrets]]
<a id="managing-secrets"></a>

If your app requires environment variables (for instance, secret keys or tokens), do not hard-code them inside your app! Instead, go to the Settings page of your Space repository and add a new **variable** or **secret**. Use variables if you need to store non-sensitive configuration values and secrets for storing access tokens, API keys, or any sensitive value or credentials.

<div class="flex justify-center">
	<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/secrets-and-variables.png"/>
	<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/secrets-and-variables-dark.png"/>
</div>

You can use:

* **Variables** if you need to store non-sensitive configuration values. They are publicly accessible and viewable and will be automatically added to Spaces duplicated from yours.
* **Secrets** to store access tokens, API keys, or any sensitive values or credentials. They are private and their value cannot be read from the Space's settings page once set. They won't be added to Spaces duplicated from your repository.


Accessing secrets and variables is different depending on your Space SDK:

- For Static Spaces, both are available through client-side JavaScript in `window.huggingface.variables`
- For Docker Spaces, check out [environment management with Docker](./spaces-sdks-docker#secrets-and-variables-management)

For other Spaces, both are exposed to your app as environment variables. Here is a very simple example of accessing the previously declared `MODEL_REPO_ID` variable in Python (it would be the same for secrets):
```py
import os
print(os.getenv('MODEL_REPO_ID'))
```

Spaces owners are warned when our `Spaces Secrets Scanner` [finds hard-coded secrets](./security-secrets).

## Duplicating a Space

Duplicating a Space can be useful if you want to build a new demo using another demo as an initial template. Duplicated Spaces can also be useful if you want to have an individual Upgraded Space for your use with fast inference.

If you want to duplicate a Space, you can click the three dots at the top right of the space and click **Duplicate this Space**. Once you do this, you will be able to change the following attributes:

* Owner: The duplicated Space can be under your account or any organization in which you have write access
* Space name
* Visibility: The Space is private by default. Read more about private repositories [here](./repositories-settings#private-repositories).
* Hardware: You can choose the hardware on which the Space will be running. Read more about hardware upgrades [here](./spaces-gpus).
* Storage: If the original repo uses persistent storage, you will be prompted to choose a storage tier. Read more about persistent storage [here](./spaces-storage).
* Secrets and variables: If the original repo has set some secrets and variables, you'll be able to set them while duplicating the repo.

Some Spaces might have environment variables that you may need to set up. In these cases, the duplicate workflow will auto-populate the public Variables from the source Space, and give you a warning about setting up the Secrets. The duplicated Space will use a free CPU hardware by default, but you can later upgrade if needed.

## Networking

If your Space needs to make any network requests, you can make requests through the standard HTTP and HTTPS ports (80 and 443) along with port 8080. Any requests going to other ports will be blocked.

## Lifecycle management

On free hardware, your Space will "go to sleep" and stop executing after a period of time if unused. If you wish for your Space to run indefinitely, consider [upgrading to paid hardware](./spaces-gpus). You can also manually pause your Space from the **Settings** tab. A paused Space stops executing until manually restarted by its owner.
Paused time is not billed.

## Helper environment variables

In some cases, you might be interested in having programmatic access to the Space author or repository name. This feature is particularly useful when you expect users to duplicate your Space. To help with this, Spaces exposes different environment variables at runtime. Given a Space [`osanseviero/i-like-flan`](https://huggingface.co/spaces/osanseviero/i-like-flan):

* `CPU_CORES`: 4
* `MEMORY`: 15Gi
* `SPACE_AUTHOR_NAME`: osanseviero
* `SPACE_REPO_NAME`: i-like-flan
* `SPACE_TITLE`: I Like Flan (specified in the README file)
* `SPACE_ID`: `osanseviero/i-like-flan`
* `SPACE_HOST`: `osanseviero-i-like-flan.hf.space`
* `SPACE_CREATOR_USER_ID`: `6032802e1f993496bc14d9e3` - This is the ID of the user that originally created the Space. It's useful if the Space is under an organization. You can get the user information with an API call to `https://huggingface.co/api/users/{SPACE_CREATOR_USER_ID}/overview`.

In case [OAuth](./spaces-oauth) is enabled for your Space, the following variables will also be available:

* `OAUTH_CLIENT_ID`: the client ID of your OAuth app (public)
* `OAUTH_CLIENT_SECRET`: the client secret of your OAuth app
* `OAUTH_SCOPES`: scopes accessible by your OAuth app. Currently, this is always `"openid profile"`.
* `OPENID_PROVIDER_URL`: The URL of the OpenID provider. The OpenID metadata will be available at [`{OPENID_PROVIDER_URL}/.well-known/openid-configuration`](https://huggingface.co/.well-known/openid-configuration).

## Clone the Repository

You can easily clone your Space repo locally. Start by clicking on the dropdown menu in the top right of your Space page:

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/SpacesCloneRepo2.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/SpacesCloneRepo1.png"/>
</div>

Select "Clone repository", and then you'll be able to follow the instructions to clone the Space repo to your local machine using HTTPS or SSH.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/HttpsClone2.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/HttpsClone1.png"/>
</div>

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/SSHClone2.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/SSHClone1.png"/>
</div>

## Linking Models and Datasets on the Hub

You can showcase all the models and datasets that your Space links to by adding their identifier in your Space's README metadata. To do so, you can define them under the `models` and `datasets` keys. In addition to listing the artefacts in the README file, you can also record them in any `.py`, `.ini` or `.html` file as well. We'll parse it auto-magically!

Here's an example linking two models from a space:

```
title: My lovely space
emoji: 🤗
colorFrom: blue
colorTo: green
sdk: docker
pinned: false
models:
- reach-vb/musicgen-large-fp16-endpoint
- reach-vb/wav2vec2-large-xls-r-1B-common_voice7-lt-ft
```
