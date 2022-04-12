# Using SpaCy at Hugging Face

`spaCy` is a popular library for advanced Natural Language Processing used widely across industry. `spaCy` makes it easy to use and train pipelines for tasks like named entity recognition, text classification, part of speech tagging and more, and lets you build powerful applications to process and analyze large volumes of text.

## Exploring spaCy models in the Hub

The official models from `spaCy` 2.1 are in the `spaCy` [Organization Page](https://huggingface.co/spacy). Anyone in the community can also share their `spaCy` models, which you can find by filtering at the left of the [models page](https://huggingface.co/models?library=spacy).

All models on the Hub come up with useful features
1. An automatically generated model card with label scheme, metrics, components, and more.
2. An evaluation sections at top right where you can look at the metrics.
3. Metadata tags that help for discoverability and contain information such as license and language.
4. An interactive widget you can use to play out with the model directly in the browser

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-spacy_widget.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-spacy_widget-dark.png"/>
</div>


## Using existing models

All `spaCy` models from the Hub can be directly installed using pip install.

```bash
pip install https://huggingface.co/spacy/en_core_web_sm/resolve/main/en_core_web_sm-any-py3-none-any.whl
```

To find the link of interest, you can go to a repository with a `spaCy` model. When you open the repository, you can click `Use in spaCy` and you will be given a working snippet that you can use to install and load the model!

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-spacy_snippet.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-spacy_snippet-dark.png"/>
</div>
<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-spacy_snippet2.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-spacy_snippet2-dark.png"/>
</div>

Once installed, you can load the model as any spaCy pipeline.

```python
# Using spacy.load().
import spacy
nlp = spacy.load("en_core_web_sm")

# Importing as module.
import en_core_web_sm
nlp = en_core_web_sm.load()
```

## Sharing your models

### Using the spaCy CLI (recommended)

The `spacy-huggingface-hub` library extends `spaCy` native CLI so people can easily push their packaged models to the Hub.

You can install spacy-huggingface-hub from pip:

```bash
pip install spacy-huggingface-hub
```

You can then check if the command has been registered successfully

```bash
python -m spacy huggingface-hub --help
```

[TODO: Add some instructions about Git LFS. All libraries will need this, so it would be great if we could refactor that]

To push with the CLI, you can use the `huggingface-hub push` command as seen below.

```bash
python -m spacy huggingface-hub push [whl_path] [--org] [--msg] [--local-repo] [--verbose]
```

```bash
python -m spacy_huggingface_hub push [whl_path] [--org] [--msg] [--local-repo] [--verbose]
```

| Argument             | Type         | Description                                                                                                                   |
| -------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| `whl_path`           | str / `Path` | The path to the `.whl` file packaged with [`spacy package`](https://spacy.io/api/cli#package).                                |
| `--org`, `-o`        | str          | Optional name of organization to which the pipeline should be uploaded.                                                       |
| `--msg`, `-m`        | str          | Commit message to use for update. Defaults to `"Update spaCy pipeline"`.                                                      |
| `--local-repo`, `-l` | str / `Path` | Local path to the model repository (will be created if it doesn't exist). Defaults to `hub` in the current working directory. |
| `--verbose`, `-V`    | bool         | Output additional info for debugging, e.g. the full generated hub metadata.                                                   |


You can then upload any pipeline packaged with `[spacy package](https://spacy.io/api/cli#package)`. Make sure to set `--build wheel` to output a binary .whl file. The uploader will read all metadata from the pipeline package, including the auto-generated pretty `README.md` and the model details available in the `meta.json`.

```bash
huggingface-cli login
python -m spacy package ./en_ner_fashion ./output --build wheel
cd ./output/en_ner_fashion-0.0.0/dist
python -m spacy huggingface-hub push en_ner_fashion-0.0.0-py3-none-any.whl
```

In just a minute, you can get your packaged model in the Hub, try it out directly in the browser, and share it with the rest of the community. All the required metadata will be uploaded for you and you even get a cool model card.

The command will output two things:

* Where to find your repo in the Hub! For example, https://huggingface.co/spacy/en_core_web_sm
* And how to install the pipeline directly from the Hub!


### From a Python script

You can use the `push` function from Python. It returns a dictionary containing the `"url"` and "`whl_url`" of the published model and the wheel file, which you can later install with `pip install`.

```py
from spacy_huggingface_hub import push

result = push("./en_ner_fashion-0.0.0-py3-none-any.whl")
print(result["url"])
```

## Additional resources

* [spacy-huggingface-hub](https://github.com/explosion/spacy-huggingface-hub) library.
* [Launch blog post](https://huggingface.co/blog/spacy)
* [SpaCy v 3.1 Announcement](https://explosion.ai/blog/spacy-v3-1#huggingface-hub)
* [spaCy documentation](https://spacy.io/universe/project/spacy-huggingface-hub/)
