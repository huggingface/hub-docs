# Integrate your library with the Hub

The Hugging Face Hub aims to facilitate sharing machine learning models, checkpoints, and artifacts. This endeavor includes integrating the Hub into many of the amazing third-party libraries in the community. Some of the ones already integrated include [spaCy](https://spacy.io/usage/projects#huggingface_hub), [AllenNLP](https://allennlp.org/), and [timm](https://rwightman.github.io/pytorch-image-models/), among many others. Integration means users can download and upload files to the Hub directly from your library. We hope you will integrate your library and join us in democratizing artificial intelligence for everyone!

Integrating the Hub with your library provides many benefits, including:

- Free model hosting for you and your users.
- Built-in file versioning - even for huge files - made possible by [Git-LFS](https://git-lfs.github.com/).
- All public models are powered by the [Inference API](https://huggingface.co/docs/api-inference/index).
- In-browser widgets allow users to interact with your hosted models directly.

This tutorial will help you integrate the Hub into your library so your users can benefit from all the features offered by the Hub.

Before you begin, we recommend you create a [Hugging Face account](https://huggingface.co/join) from which you can manage your repositories and files. 

If you need help with the integration, feel free to open an [issue](https://github.com/huggingface/huggingface_hub/issues/new/choose), and we would be more than happy to help you!

## Installation

1. Install the `huggingface_hub` library with pip in your environment:

   ```bash
   python -m pip install huggingface_hub
   ```

2. Once you have successfully installed the `huggingface_hub` library, log in to your Hugging Face account:

   ```bash
   huggingface-cli login
   ```

   ```bash
        _|    _|  _|    _|    _|_|_|    _|_|_|  _|_|_|  _|      _|    _|_|_|      _|_|_|_|    _|_|      _|_|_|  _|_|_|_|
        _|    _|  _|    _|  _|        _|          _|    _|_|    _|  _|            _|        _|    _|  _|        _|
        _|_|_|_|  _|    _|  _|  _|_|  _|  _|_|    _|    _|  _|  _|  _|  _|_|      _|_|_|    _|_|_|_|  _|        _|_|_|
        _|    _|  _|    _|  _|    _|  _|    _|    _|    _|    _|_|  _|    _|      _|        _|    _|  _|        _|
        _|    _|    _|_|      _|_|_|    _|_|_|  _|_|_|  _|      _|    _|_|_|      _|        _|    _|    _|_|_|  _|_|_|_|

        
   Username: 
   Password:
   ```

3. Alternatively, if you prefer working from a Jupyter or Colaboratory notebook, login with `notebook_login`:

   ```python
   >>> from huggingface_hub import notebook_login
   >>> notebook_login()
   ```

   `notebook_login` will launch a widget in your notebook from which you can enter your Hugging Face credentials.

## Download files from the Hub

Integration allows users to download your hosted files directly from the Hub using your library. 

Use the `hf_hub_download` function to retrieve a URL and download files from your repository. Downloaded files are stored in your cache: `~/.cache/huggingface/hub`. You don't have to re-download the file the next time you use it, and for larger files, this can save a lot of time. Furthermore, if the repository is updated with a new version of the file, `huggingface_hub` will automatically download the latest version and store it in the cache for you. Users don't have to worry about updating their files.

For example, download the `config.json` file from the [lysandre/arxiv-nlp](https://huggingface.co/lysandre/arxiv-nlp) repository:

```python
>>> from huggingface_hub import hf_hub_download
>>> hf_hub_download(repo_id="lysandre/arxiv-nlp", filename="config.json")
```

Download a specific version of the file by specifying the `revision` parameter. The `revision` parameter can be a branch name, tag, or commit hash. 

The commit hash must be a full-length hash instead of the shorter 7-character commit hash:

```python
>>> from huggingface_hub import hf_hub_download
>>> hf_hub_download(repo_id="lysandre/arxiv-nlp", filename="config.json", revision="877b84a8f93f2d619faa2a6e514a32beef88ab0a")
```

Use the `cache_dir` parameter to change where a file is stored:

```python
>>> from huggingface_hub import hf_hub_download
>>> hf_hub_download(repo_id="lysandre/arxiv-nlp", filename="config.json", cache_dir="/home/lysandre/test")
```

### Code sample

We recommend adding a code snippet to explain how to use a model in your downstream library. 

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/code_snippet.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/code_snippet-dark.png"/>
</div>

First, register your library by editing [model-libaries.ts](https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/model-libraries.ts).

Then, add a code snippet by updating the [library-ui-elements](https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/library-ui-elements.ts) file with instructions for your model. For example, the [Asteroid](https://huggingface.co/asteroid-team) integration includes a brief code snippet for how to load and use an Asteroid model:

```typescript
const asteroid = (model: ModelData) =>
`from asteroid.models import BaseModel
  
model = BaseModel.from_pretrained("${model.id}")`;
```

Doing so will also add a tag to your model so users can quickly identify models from your library.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-tags.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-tags-dark.png"/>
</div>

## Upload files to the Hub

You might also want to provide a method for creating model repositories and uploading files to the Hub directly from your library. The `huggingface_hub` library offers two ways to assist you with creating repositories and uploading files:

- `create_repo` creates a repository on the Hub.
- `upload_file` directly uploads files to a repository on the Hub.

### `create_repo`

The `create_repo` method creates a repository on the Hub. Use the `name` parameter to provide a name for your repository:

```python
>>> from huggingface_hub import create_repo
>>> create_repo(repo_id="test-model")
'https://huggingface.co/lysandre/test-model'
```

When you check your Hugging Face account, you should now see a `test-model` repository under your namespace.

### `upload_file`

The `upload_file` method uploads files to the Hub. This method requires the following:

- A path to the file to upload.
- The final path in the repository.
- The repository you wish to push the files to.

For example:

```python
>>> from huggingface_hub import upload_file
>>> upload_file(
...    path_or_fileobj="/home/lysandre/dummy-test/README.md", 
...    path_in_repo="README.md", 
...    repo_id="lysandre/test-model"
... )
'https://huggingface.co/lysandre/test-model/blob/main/README.md'
```

If you need to upload more than one file, look at the [utilities offered by the `Repository` class](https://huggingface.co/docs/huggingface_hub/package_reference/repository).

Once again, if you check your Hugging Face account, you should see the file inside your repository.

Lastly, it is important to add a model card so users understand how to use your model. See [here](./model-cards) for more details about how to create a model card.

## Set up the Inference API

Our Inference API powers models uploaded to the Hub through your library.

### Create an Inference API Docker image 

All third-party libraries are Dockerized, so you can install the dependencies you'll need for your library to work correctly. Add your library to the existing Docker images by navigating to the [Docker images folder](https://github.com/huggingface/api-inference-community/tree/main/docker_images).

1. Copy the `common` folder and rename it with the name of your library (e.g. `docker/common` to `docker/your-awesome-library`).
2. There are four files you need to edit:
    * List the packages required for your library to work in `requirements.txt`.
    * Update `app/main.py` with the tasks supported by your model (see [here](https://github.com/huggingface/api-inference-community) for a complete list of available tasks). Look out for the `IMPLEMENT_THIS` flag to add your supported task.

       ```python
       ALLOWED_TASKS: Dict[str, Type[Pipeline]] = {
           "token-classification": TokenClassificationPipeline
       }
       ```

    * For each task your library supports, modify the `app/pipelines/task_name.py` files accordingly. We have also added an `IMPLEMENT_THIS` flag in the pipeline files to guide you. If there isn't a pipeline that supports your task, feel free to add one. Open an [issue](https://github.com/huggingface/huggingface.js/issues/new) here, and we will be happy to help you.
    * Add your model and task to the `tests/test_api.py` file. For example, if you have a text generation model:

       ```python
       TESTABLE_MODELS: Dict[str,str] = {
           "text-generation": "my-gpt2-model"
       }
       ```
3. Finally, run the following test to ensure everything works as expected:

    ```bash
    pytest -sv --rootdir docker_images/your-awesome-library/docker_images/your-awesome-library/
    ```

### Register your libraries supported tasks on the hub

To register the tasks supported by your library on the hub you'll need to add a mapping from your library name to its supported tasks in [library-to-tasks.ts file](https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/library-to-tasks.ts). This will ensure the inference API is registered for tasks supported by your model. This file is automatically generated as part of a [GitHub Action](https://github.com/huggingface/api-inference-community/actions/workflows/python-api-export-tasks.yaml) in the [
api-inference-community repository](https://github.com/huggingface/api-inference-community) repository. You can see an example of this [here](https://github.com/huggingface/api-inference-community/actions/runs/5126874210/jobs/9221890853#step:5:8).

With these simple but powerful methods, you brought the full functionality of the Hub into your library. Users can download files stored on the Hub from your library with `hf_hub_download`, create repositories with `create_repo`, and upload files with `upload_file`. You also set up Inference API with your library, allowing users to interact with your models on the Hub from inside a browser.

## Document your library

If you want, you can add your library to this documentation! Check for example the [Setfit PR](https://github.com/huggingface/hub-docs/pull/1150) that added [SetFit](./setfit) to the documentation.
