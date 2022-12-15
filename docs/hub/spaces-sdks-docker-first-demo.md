# Your First Docker Space: Text Generation with T5

In the following sections, you'll learn the basics of creating a Docker Space, configuring it, and deploying your code to it. We'll create a **Text Generation** Space with Docker that'll be used to demo the [google/flan-t5-small](https://huggingface.co/google/flan-t5-small) model, which can generate text given some input text, using FastAPI as the server.

You can find a completed version of this hosted [here](https://huggingface.co/spaces/DockerTemplates/fastapi_t5).

## Create a new Docker Space

We'll start by [creating a brand new Space](https://huggingface.co/new-space) and choosing **Docker** as our SDK. Hugging Face Spaces are Git repositories, meaning that you can work on your Space incrementally (and collaboratively) by pushing commits. Take a look at the [Getting Started with Repositories](./repositories-getting-started) guide to learn about how you can create and edit files before continuing. If you prefer to work with a UI, you can also do the work directly in the browser.

Selecting **Docker** as the SDK when [creating a new Space](https://huggingface.co/new-space) will initialize your Docker Space by setting the `sdk` property to `docker` in your `README.md` file's YAML block.


```yaml
sdk: docker
```

## Add the dependencies

For the **Text Generation** Space, we'll be building a FastAPI app that showcases a text generation model called Flan T5. For the model inference, we'll be using a [🤗 Transformers pipeline](https://huggingface.co/docs/transformers/pipeline_tutorial) to use the model. We need to start by installing a few dependencies. This can be done by creating a **requirements.txt** file in our repository, and adding the following dependencies to it:

```
fastapi==0.74.*
requests==2.27.*
sentencepiece==0.1.*
torch==1.11.*
transformers==4.*
uvicorn[standard]==0.17.*
```

The Spaces runtime will handle installing the dependencies!


## Create the app

Let's kick off the process with a dummy FastAPI app to see that we can get an endpoint working. The first step is to create an app file, in this case, we'll call it `main.py`.

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World!"}
```


## Create the Dockerfile

The main step for a Docker Space is creating a Dockerfile. You can read more about Dockerfiles [here](TODO). Although we're using FastAPI in this tutorial, Dockerfiles give great flexibility to users allowing you to build a new generation of ML demos. Let's write the Dockerfile for our application

```Dockerfile
FROM python:3.9

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY . .

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "7860"]

**Tip for power users (you can skip):** If you're developing locally, this is a good moment in which you can do `docker build` and `docker run` to debug locally, but it's even easier to push the changes to the Hub and see how it looks like!

```bash
docker build -t fastapi .
docker run  -it -p 7860:7860 fastapi
```

When the changes are saved, the Space will rebuild and your demo should be up after a couple of seconds! [Here](https://huggingface.co/spaces/DockerTemplates/fastapi_dummy) is an example result at this point.

TODO: Add Images from https://huggingface.co/spaces/DockerTemplates/fastapi_dummy 

## Adding some ML to our app

As mentioned before, the idea is to use a Flan T5 model for text generation. We'll want to add some HTML and CSS for an input field, so let's create a directory called static with `index.html`, `style.css`, and `script.js` files. At this moment, your file structure should look like this:

```
/static
/static/index.html
/static/script.js
/static/style.css
Dockerfile
main.py
README.md
requirements.txt
```

Let's go through all the steps to make this working. We'll skip some of the details of the CSS and HTML. You can find the whole code in the Files and versions tab of the [DockerTemplates/fastapi_t5](https://huggingface.co/spaces/DockerTemplates/fastapi_t5) Space.

1. Write the FastAPI endpoint to do inference

We'll use the `pipeline` from `transformers` to load the [google/flan-t5-small](https://huggingface.co/google/flan-t5-small) model. We'll set an endpoint called `infer_t5` that receives and input and outputs the result of the inference call

```python
from transformers import pipeline

pipe_flan = pipeline("text2text-generation", model="google/flan-t5-small")

@app.get("/infer_t5")
def t5(input):
    output = pipe_flan(input)
    return {"output": output[0]["generated_text"]}
```

2. Write the `index.html` to have a simple form containing the code of the page.

```html
<main>
    <section id="text-gen">
    <h2>Text generation using Flan T5</h2>
    <p>
        Model:
        <a
          href="https://huggingface.co/google/flan-t5-small"
          rel="noreferrer"
          target="_blank"
        >google/flan-t5-small
        </a>
    </p>
    <form class="text-gen-form">
        <label for="text-gen-input">Text prompt</label>
        <input
          id="text-gen-input"
          type="text"
          value="German: There are many ducks"
        />
        <button id="text-gen-submit">Submit</button>
        <p class="text-gen-output"></p>
    </form>
    </section>
</main>
```

3. In the `app.py` file, mount the static files and show the html file in the root route

```python
app.mount("/", StaticFiles(directory="static", html=True), name="static")

@app.get("/")
def index() -> FileResponse:
    return FileResponse(path="/app/static/index.html", media_type="text/html")
```

4. In the `script.js` file, make it handle the request

```javascript
const textGenForm = document.querySelector('.text-gen-form');

const translateText = async (text) => {
    const inferResponse = await fetch(`infer_t5?input=${text}`);
    const inferJson = await inferResponse.json();

    return inferJson.output;
};

textGenForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const textGenInput = document.getElementById('text-gen-input');
  const textGenParagraph = document.querySelector('.text-gen-output');

  textGenParagraph.textContent = await translateText(textGenInput.value);
});
```

5. Grant permissions to the right directories


As discussed in the [Permissions Section](./spaces-sdks-docker#permissions), the container runs with user ID 1000. That means that the Space might face permission issues. For example, `transformers` downloads and caches the models in the path under the `HUGGINGFACE_HUB_CACHE` path. We can specify this path and use `chmod` to grant the right permissions. Add the following lines to the `Dockerfile`.

```Dockerfile
RUN mkdir -p /data
RUN chmod 777 /data
ENV HUGGINGFACE_HUB_CACHE=/data
```

Success! Your app should be working now! Check out [DockerTemplates/fastapi_t5](https://huggingface.co/spaces/DockerTemplates/fastapi_t5) to see the final result.

TODO: Add screenshot

What a journey! Please remember that Docker Spaces give you lots of freedom, so you're not limited to use FastAPI. From a [Go Endpoint](https://huggingface.co/spaces/DockerTemplates/test-docker-go) to a [Shiny App](https://huggingface.co/spaces/DockerTemplates/shiny-with-python), the limit is the moon! Check out [some official examples](./spaces-sdks-docker-examples). You can also upgrade your Space to a GPU if needed 😃