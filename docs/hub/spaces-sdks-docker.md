# Docker Spaces

Spaces accommodate custom Docker containers for apps that go outside the scope of Streamlit and Gradio. Docker Spaces give freedom to users to go beyond the limits of what was previously possible with the standard sdks. From FastAPI to Go endpoints, Phoenix apps and ML Ops tools, Docker Spaces can help in many different setups.

## Setting up Docker Spaces

Selecting **Docker** as the SDK when [creating a new Space](https://huggingface.co/new-space) will initialize your Space by setting the `sdk` property to `docker` in your `README.md` file's YAML block. Alternatively, given an existing Space repository, set `sdk: docker` inside the `YAML` block at the top of your Spaces **README.md** file. Afterwards, you can create a usual `Dockerfile`.

Some important considerations
* 


## Secret Management

## Permissions

## Debugging Docker Spaces

## Environment Variables

S