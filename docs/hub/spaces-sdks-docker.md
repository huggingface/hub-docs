# Docker Spaces

Spaces accommodate custom [Docker containers](https://docs.docker.com/get-started/) for apps that go outside the scope of Streamlit and Gradio. Docker Spaces give freedom to users to go beyond the limits of what was previously possible with the standard sdks. From FastAPI and Go endpoints to Phoenix apps and ML Ops tools, Docker Spaces can help in many different setups.

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


## Secret Management

In Docker Spaces, the secrets management is different for security reasons. Once you create a secret in the [Settings tab](./spaces-overview#managing-secrets), you can expose the secret by adding the following line in your Dockerfile.

```Dockerfile
RUN --mount=type=secret,id=EXAMPLE,required=true cat /run/secrets/EXAMPLE > /example
```

Where `EXAMPLE` is the name of the secret. Afterwards, you can access the secret as an environment variable. For example, in Python you would do `os.environ.get("EXAMPLE")`. Check out this [example](https://huggingface.co/spaces/DockerTemplates/secret-example) of a Docker Space that uses secrets.

## Permissions

The container runs with user ID 1000. If you face permission issues, you might need to use `chmod` in your `Dockerfile` to grant the right permissions. For example, if you want to use the directory `/data`, you can do:

```Dockerfile
RUN mkdir -p /data
RUN chmod 777 /data
```

Alternatively, you can create a user and set the `WORKDIR` to the user's home directory. This way, you can avoid user permission issues.

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

# Copy the current directory contents into the container at $HOME/app setting the owner to the user
COPY --chown=user . $HOME/app
```

## Read More

* [Full Docker demo example](spaces-sdks-docker-first-demo)
* [List of Docker Spaces examples](spaces-sdks-docker-examples)