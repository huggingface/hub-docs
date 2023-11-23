# Docker Spaces

Spaces accommodate custom [Docker containers](https://docs.docker.com/get-started/) for apps outside the scope of Streamlit and Gradio. Docker Spaces allow users to go beyond the limits of what was previously possible with the standard SDKs. From FastAPI and Go endpoints to Phoenix apps and ML Ops tools, Docker Spaces can help in many different setups.

## Setting up Docker Spaces

Selecting **Docker** as the SDK when [creating a new Space](https://huggingface.co/new-space) will initialize your Space by setting the `sdk` property to `docker` in your `README.md` file's YAML block. Alternatively, given an existing Space repository, set `sdk: docker` inside the `YAML` block at the top of your Spaces **README.md** file. You can also change the default exposed port `7860` by setting `app_port: 7860`. Afterwards, you can create a usual `Dockerfile`.

```Yaml
---
title: Basic Docker SDK Space
emoji: 🐳
colorFrom: purple
colorTo: gray
sdk: docker
app_port: 7860
---
```

Internally you could have as many open ports as you want. For instance, you can install Elasticsearch inside your Space and call it internally on its default port 9200.

If you want to expose apps served on multiple ports to the outside world, a workaround is to use a reverse proxy like Nginx to dispatch requests from the broader internet (on a single port) to different internal ports.

## Secrets and Variables Management
 <a id="secret-management"></a>

You can manage a Space's environment variables in the Space Settings. Read more [here](./spaces-overview#managing-secrets).

### Variables

#### Buildtime

Variables are passed as `build-arg`s when building your Docker Space. Read [Docker's dedicated documentation](https://docs.docker.com/engine/reference/builder/#arg) for a complete guide on how to use this in the Dockerfile.

```Dockerfile
	# Declare your environment variables with the ARG directive
	ARG MODEL_REPO_NAME

	FROM python:latest
	# [...]
	# You can use them like environment variables
	RUN predict.py $MODEL_REPO_NAME
```

#### Runtime

Variables are injected in the container's environment at runtime. 

### Secrets


#### Buildtime

In Docker Spaces, the secrets management is different for security reasons. Once you create a secret in the [Settings tab](./spaces-overview#managing-secrets), you can expose the secret by adding the following line in your Dockerfile:

For example, if `SECRET_EXAMPLE` is the name of the secret you created in the Settings tab, you can read it at build time by mounting it to a file, then reading it with `$(cat /run/secrets/SECRET_EXAMPLE)`.

See an example below:
```Dockerfile
# Expose the secret SECRET_EXAMPLE at buildtime and use its value as git remote URL
RUN --mount=type=secret,id=SECRET_EXAMPLE,mode=0444,required=true \
 git init && \
 git remote add origin $(cat /run/secrets/SECRET_EXAMPLE)
```

```Dockerfile
# Expose the secret SECRET_EXAMPLE at buildtime and use its value as a Bearer token for a curl request
RUN --mount=type=secret,id=SECRET_EXAMPLE,mode=0444,required=true \
	curl test -H 'Authorization: Bearer $(cat /run/secrets/SECRET_EXAMPLE)'
```

#### Runtime

Same as for public Variables, at runtime, you can access the secrets as environment variables. For example, in Python you would use `os.environ.get("SECRET_EXAMPLE")`. Check out this [example](https://huggingface.co/spaces/DockerTemplates/secret-example) of a Docker Space that uses secrets.

## Permissions

The container runs with user ID 1000. To avoid permission issues you should create a user and set its `WORKDIR` before any `COPY` or download.

```Dockerfile
# Set up a new user named "user" with user ID 1000
RUN useradd -m -u 1000 user

# Switch to the "user" user
USER user

# Set home to the user's home directory
ENV HOME=/home/user \
	PATH=/home/user/.local/bin:$PATH

# Set the working directory to the user's home directory
WORKDIR $HOME/app

# Try and run pip command after setting the user with `USER user` to avoid permission issues with Python
RUN pip install --no-cache-dir --upgrade pip

# Copy the current directory contents into the container at $HOME/app setting the owner to the user
COPY --chown=user . $HOME/app

# Download a checkpoint
RUN mkdir content
ADD --chown=user https://<SOME_ASSET_URL> content/<SOME_ASSET_NAME>
```

<Tip warning="{true}">
Always specify the `--chown=user` with `ADD` and `COPY` to ensure the new files are owned by your user.
</Tip>

If you still face permission issues, you might need to use `chmod` or `chown` in your `Dockerfile` to grant the right permissions. For example, if you want to use the directory `/data`, you can do:

```Dockerfile
RUN mkdir -p /data
RUN chmod 777 /data
```

You should always avoid superfluous chowns.
<Tip warning={true}>
Updating metadata for a file creates a new copy stored in the new layer. Therefore, a recursive chown can result in a very large image due to the duplication of all affected files.
</Tip>

Rather than fixing permission by running `chown`:
```
COPY checkpoint .
RUN chown -R user checkpoint
```
you should always do:
```
COPY --chown=user checkpoint .
```
(same goes for `ADD` command)


## Data Persistence

The data written on disk is lost whenever your Docker Space restarts, unless you opt-in for a [persistent storage](./spaces-storage) upgrade.

If you opt-in for a persistent storage upgrade, you can use the `/data` directory to store data. This directory is mounted on a persistent volume, which means that the data written in this directory will be persisted across restarts.

<Tip warning="{true}">

At the moment, `/data` volume is only available at runtime, i.e. you cannot use `/data` during the build step of your Dockerfile.

</Tip>

You can also use our Datasets Hub for specific cases, where you can store state and data in a git LFS repository. You can find an example of persistence [here](https://huggingface.co/spaces/Wauplin/space_to_dataset_saver), which uses the [`huggingface_hub` library](https://huggingface.co/docs/huggingface_hub/index) for programmatically uploading files to a dataset repository. This Space example along with [this guide](https://huggingface.co/docs/huggingface_hub/main/en/guides/upload#scheduled-uploads) will help you define which solution fits best your data type.

Finally, in some cases, you might want to use an external storage solution from your Space's code like an external hosted DB, S3, etc.

### Docker container with GPU

You can run Docker containers with GPU support by using one of our GPU-flavored [Spaces Hardware](./spaces-gpus).

We recommend using the [`nvidia/cuda`](https://hub.docker.com/r/nvidia/cuda) from Docker Hub as a base image, which comes with CUDA and cuDNN pre-installed.

<Tip warning="{true}">
During Docker buildtime, you don't have access to a GPU hardware. Therefore, you should not try to run any GPU-related command during the build step of your Dockerfile. For example, you can't run `nvidia-smi` or `torch.cuda.is_available()` building an image. Read more [here](https://github.com/NVIDIA/nvidia-docker/wiki/nvidia-docker#description).
</Tip>

## Read More

- [Full Docker demo example](spaces-sdks-docker-first-demo)
- [List of Docker Spaces examples](spaces-sdks-docker-examples)
- [Spaces Examples](https://huggingface.co/SpacesExamples)
