# Spaces Dev Mode: Seamless development in Spaces

> [!WARNING]
> This feature is still in Beta stage.

> [!WARNING]
> The Spaces Dev Mode is part of <a href="https://huggingface.co/pro">PRO</a> or <a href="https://huggingface.co/enterprise">Team & Enterprise</a> plans.

## Spaces Dev Mode

Spaces Dev Mode is a feature that eases the debugging of your application and makes iterating on Spaces faster.

Whenever your commit some changes to your Space repo, the underlying Docker image gets rebuilt, and then a new virtual machine is provisioned to host the new container.

The Dev Mode allows you to update your Space much quicker by overriding the Docker image.

The Dev Mode Docker image starts your application as a sub-process, allowing you to restart it without stopping the Space container itself. It also starts a VS Code server and a SSH server in the background for you to connect to the Space.

The ability to connect to the running Space unlocks several use cases:

    - You can make changes to the app code without the Space rebuilding everytime
    - You can debug a running application and monitor resources live

Overall it makes developing and experimenting with Spaces much faster by skipping the Docker image rebuild phase.

## Interface

Once the Dev Mode is enabled on your Space, you should see a modal like the following.

<div class="flex justify-center" style="max-width: 550px">
<img class="block dark:hidden m-0!" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-dev-mode/dev-mode-controls.png" alt="screenshot of the dev mode controls interface."/>
<img class="hidden dark:block m-0!" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-dev-mode/dev-mode-controls-dark.png" alt="screenshot of the dev mode controls interface."/>
</div>

The application does not restart automatically when you change the code. For your changes to appear in the Space, you need to use the `Refresh` button that will restart the app.

<div class="alert alert-warning">
  If you're using the Gradio SDK, or if your application is Python-based, note that requirements are not installed automatically.
  You will need to manually run `pip install` from VS Code or SSH.
</div>

### SSH connection and VS Code

The Dev Mode allows you to connect to your Space's docker container using SSH.

Instructions to connect are listed in the Dev Mode controls modal.

You will need to add your machine's SSH public key to [your user account](https://huggingface.co/settings/keys) to be able to connect to the Space using SSH.
Check out the [Git over SSH](./security-git-ssh#add-a-ssh-key-to-your-account) documentation for more detailed instructions.

You can also use a local install of VS Code to connect to the Space container. To do so, you will need to install the [SSH Remote](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) extension.

### Persisting changes

<div class="alert alert-warning">
The changes you make when Dev Mode is enabled are not persisted to the Space repo automatically.
By default, they will be discarded when Dev Mode is disabled or when the Space goes to sleep.
</div>
If you wish to persist changes made while Dev Mode is enabled, you need to use `git` from inside the Space container (using VS Code or SSH). For example:

```shell
# Add changes and commit them
git add .
git commit -m "Persist changes from Dev Mode"

# Push the commit to persist them in the repo
git push
```

The modal will display a warning if you have uncommitted or unpushed changes in the Space:


<div class="flex justify-center" style="max-width: 550px">
<img class="block dark:hidden m-0!" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-dev-mode/dev-mode-controls-uncommitted.png" alt="screenshot of the dev mode controls interface."/>
<img class="hidden dark:block m-0!" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-dev-mode/dev-mode-controls-uncommitted-dark.png" alt="screenshot of the dev mode controls interface."/>
</div>

## Enabling Dev Mode

You can enable the Dev Mode on your Space from the web interface.

<div class="flex justify-center" style="max-width: 550px">
<img class="block dark:hidden m-0!" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-dev-mode/dev-mode-enable-contextual.png" alt="screenshot of the dev mode toggle from the contextual menu."/>
<img class="hidden dark:block m-0!" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-dev-mode/dev-mode-enable-contextual-dark.png" alt="screenshot of the dev mode toggle from the contextual menu."/>
</div>

<div class="flex justify-center" style="max-width: 550px">
<img class="block dark:hidden m-0!" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-dev-mode/dev-mode-enable-settings.png" alt="screenshot of the dev mode toggle from the Space settings."/>
<img class="hidden dark:block m-0!" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-dev-mode/dev-mode-enable-settings-dark.png" alt="screenshot of the dev mode toggle from the Space settings."/>
</div>

<div class="flex justify-center" style="max-width: 550px">
<img class="block dark:hidden m-0!" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-dev-mode/dev-mode-enable-logs.png" alt="screenshot of the dev mode toggle from the Space logs."/>
<img class="hidden dark:block m-0!" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-dev-mode/dev-mode-enable-logs-dark.png" alt="screenshot of the dev mode toggle from the Space logs."/>
</div>

You can also create a Space with the dev mode enabled:

<div class="flex justify-center" style="max-width: 550px">
<img class="block dark:hidden m-0!" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-dev-mode/dev-mode-creation-enable.png" alt="screenshot of the dev mode toggle from the Space creation page."/>
<img class="hidden dark:block m-0!" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-dev-mode/dev-mode-creation-enable-dark.png" alt="screenshot of the dev mode toggle from the Space creation page."/>
</div>


## Limitations

Dev Mode is currently not available for static Spaces. Docker Spaces also have some additional requirements.

### Docker Spaces

Dev Mode is supported for Docker Spaces. However, your Space needs to comply with the following rules for Dev Mode to work properly.

1. The following packages must be installed:

- `bash` (required to establish SSH connections)
- `curl`, `wget` and `procps` (required by the VS Code server process)
- `git` and `git-lfs` to be able to commit and push changes from your Dev Mode environment

2. Your application code must be located in the `/app` folder for the Dev Mode daemon to be able to detect changes.

3. The `/app` folder must be owned by the user with uid `1000` to allow you to make changes to the code.

4. The Dockerfile must contain a `CMD` instruction for startup. Checkout [Docker's documentation](https://docs.docker.com/reference/dockerfile/#cmd) about the `CMD` instruction for more details.

Dev Mode works well when the base image is debian-based (eg, ubuntu).

More exotic linux distros (eg, alpine) are not tested and Dev Mode is not guaranteed to work on them.

### Example of compatible Dockerfiles

This is an example of a Dockerfile compatible with Spaces Dev Mode.

It installs the required packages with `apt-get`, along with a couple more for developer convenience (namely: `top`, `vim` and `nano`).
It then starts a NodeJS application from `/app`.

```Dockerfile
FROM node:19-slim

RUN apt-get update && \
    apt-get install -y \
      bash \
      git git-lfs \
      wget curl procps \
      htop vim nano && \
    rm -rf /var/lib/apt/lists/*


WORKDIR /app
COPY --link ./ /app
RUN  npm i 

RUN chown 1000 /app
USER 1000
CMD ["node", "index.js"]
```

There are several examples of Dev Mode compatible Docker Spaces in this organization.
Feel free to duplicate them in your namespace!

Example Python app (FastAPI HTTP server): https://huggingface.co/spaces/dev-mode-explorers/dev-mode-python

Example Javascript app (Express.js HTTP server): https://huggingface.co/spaces/dev-mode-explorers/dev-mode-javascript


## Feedback

You can share your feedback on Spaces Dev Mode directly on the HF Hub: https://huggingface.co/spaces/dev-mode-explorers/README/discussions
