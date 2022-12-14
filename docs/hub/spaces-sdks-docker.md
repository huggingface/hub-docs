# Docker Spaces

Spaces accommodate custom Docker containers for apps that go outside the scope of Streamlit and Gradio. Docker Spaces give freedom to users to go beyond the limits of what was previously possible with the standard sdks. From FastAPI and Go endpoints to Phoenix apps and ML Ops tools, Docker Spaces can help in many different setups.

## Setting up Docker Spaces

Selecting **Docker** as the SDK when [creating a new Space](https://huggingface.co/new-space) will initialize your Space by setting the `sdk` property to `docker` in your `README.md` file's YAML block. Alternatively, given an existing Space repository, set `sdk: docker` inside the `YAML` block at the top of your Spaces **README.md** file. Afterwards, you can create a usual `Dockerfile`.


## Secret Management

In Docker Spaces, the secrets management is different for security reasons. Once you create a secret in the [Settings tab](./spaces-overview#managing-secrets), you can expose the secret by adding the following line in your Dockerfile.

```Dockerfile
RUN --mount=type=secret,id=EXAMPLE,required=true cat /run/secrets/EXAMPLE > /example
```

Where `EXAMPLE` is the name of the secret. Afterwards, you can access the secret as an environment variable. For example, in Python you would do `os.environ.get("EXAMPLE")`. Check out this [example](https://huggingface.co/spaces/DockerTemplates/secret-example) of a Docker Space that uses secrets.

## Permissions

The container runs with user ID 1000. If you face permission issues, you might need to use `chmod` in your `Dockerfile` to grant the right permissions. For example, if you want to use the directory `/data`, you can do:

```
RUN mkdir -p /data
RUN chmod 777 /data
```