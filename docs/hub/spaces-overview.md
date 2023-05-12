# Spaces Overview

Hugging Face Spaces make it easy for you to create and deploy ML-powered demos in minutes. Watch the following video for a quick introduction to Spaces:

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/3bSVKNKb_PY" title="Spaces intro" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

In the following sections, you'll learn the basics of creating a Space, configuring it, and deploying your code to it.

## Creating a new Space

**To make a new Space**, visit the [Spaces main page](https://huggingface.co/spaces) and click on **Create new Space**. Along with choosing a name for your Space, selecting an optional license, and setting your Space's visibility, you'll be prompted to choose the **SDK** for your Space. The Hub offers four SDK options: Gradio, Streamlit, Docker and static HTML. If you select "Gradio" as your SDK, you'll be navigated to a new repo showing the following page:

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-blank-space.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-blank-space-dark.png"/>
</div>

Under the hood, Spaces stores your code inside a git repository, just like the model and dataset repositories. Thanks to this, the same tools we use for all the [other repositories on the Hub](./repositories) (`git` and `git-lfs`) also work for Spaces. Follow the same flow as in [Getting Started with Repositories](./repositories-getting-started) to add files to your Space. Each time a new commit is pushed, the Space will automatically rebuild and restart.

For step-by-step tutorials to creating your first Space, see the guides below:
* [Creating a Gradio Space](./spaces-sdks-gradio)
* [Creating a Streamlit Space](./spaces-sdks-streamlit)
* [Creating a Docker Space](./spaces-sdks-docker-first-demo)

## Hardware resources

Each Spaces environment is limited to 16GB RAM, 2 CPU cores and 50Gb of (not persistent) disk space by default, which you can use free of charge. You can upgrade to better hardware, including a variety of GPU accelerators, for a [competitive price](https://huggingface.co/pricing#spaces). To request an upgrade, please click the _Settings_ button in your Space and select your preferred hardware environment.

| **Hardware**        	| **CPU** 	| **Memory** 	| **Disk** 	| **Hourly Price** 	|
|---------------------	|---------	|------------	|----------	|------------------	|
| CPU Basic           	| 2 vCPU  	| 16 GB      	| 50 GB    	| Free!            	|
| CPU Upgrade         	| 8 vCPU  	| 32 GB      	| 50 GB    	| $0.03            	|
| Nvidia T4 - small   	| 4 vCPU  	| 15 GB      	| 50 GB    	| $0.06            	|
| Nvidia T4 - medium  	| 8 vCPU  	| 30 GB      	| 100 GB   	| $0.09            	|
| Nvidia A10G - small 	| 4 vCPU  	| 15 GB      	| 110 GB   	| $1.05            	|
| Nvidia A10G - large 	| 12 vCPU 	| 46 GB      	| 200 GB   	| $3.15            	|
| Nvidia A100 - large 	| 12 vCPU 	| 142 GB     	| 1000 GB  	| $4.13            	|
 
Do you have an awesome Space but need help covering the GPU hardware upgrade costs? We love helping out those with an innovative Space so please feel free to apply for a community GPU grant using the link in the _Settings_ tab of your Space and see if yours makes the cut!

Read more in [Spaces GPU Upgrades](./spaces-gpus).

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-gpu-settings.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-gpu-settings-dark.png"/>
</div>

## Managing secrets

If your app requires secret keys or tokens, don't hard-code them inside your app! Instead, go to the **Settings** page of your Space repository and enter your secrets there. The secrets will be exposed to your app with [Streamlit Secrets Management](https://blog.streamlit.io/secrets-in-sharing-apps/) if you use Streamlit, and as environment variables in other cases. For Docker Spaces, please check out [secret management with Docker](./spaces-sdks-docker#secret-management). Users are warned when `Spaces Secrets Scanner` [finds hard-coded secrets](./spaces-secrets-scanner).

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/secrets.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/secrets-dark.png"/>
</div>

## Duplicating a Space

Duplicating a Space can be useful if you want to build a new demo using another demo as an initial template. Duplicated Spaces can also be useful if you want to have an individual Upgraded Space for your use with fast inference.

If you want to duplicate a Space, you can click the three dots at the top right of the space and click **Duplicate this Space**. Once you do this, you will be able to change the following attributes:

* Owner: The duplicated Space can be under your account or any organization in which you have write access
* Space name
* Visiblity: The Space is private by default. Read more about private repositories [here](./repositories-settings#private-repositories). 

Some Spaces might have environment variables that you might need to setup up. In those cases, the duplicate workflow will give you a warning about them. The duplicated Space will use a free CPU by default, but you can later upgrade it if needed.


## Networking

If your Space needs to make any network requests, you can make requests through the standard HTTP and HTTPS ports (80 and 443) along with port 8080. Any requests going to other ports will be blocked.

## Lifecycle management

On free hardware, your Space will "go to sleep" and stop executing after a period of time if unused. If you wish for your Space to run indefinitely, consider [upgrading to a paid hardware](./spaces-gpus). You can also manually pause your Space from the **Settings** tab. A paused Space stops executing until manually restarted by its owner.
Paused time is not billed.

## Helper environment variables

In some cases, you might be interested in having programmatic access to the Space author or repository name. This feature is particularly useful when you expect users to duplicate your Space. To help with this, Spaces exposes different environment variables at runtime. Given a Space [`osanseviero/i-like-flan`](https://huggingface.co/spaces/osanseviero/i-like-flan):

* `SPACE_AUTHOR_NAME`: osanseviero
* `SPACE_REPO_NAME`: i-like-flan
* `SPACE_TITLE`: I Like Flan (specified in the README file)
* `SPACE_ID`: `osanseviero/i-like-flan`
