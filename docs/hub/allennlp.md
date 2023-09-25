# Using AllenNLP at Hugging Face

`allennlp` is a NLP library for developing state-of-the-art models on different linguistic tasks. It provides high-level abstractions and APIs for common components and models in modern NLP. It also provides an extensible framework that makes it easy to run and manage NLP experiments.

## Exploring allennlp in the Hub

You can find `allennlp` models on the Hub by filtering at the left of the [models page](https://huggingface.co/models?library=allennlp).

All models on the Hub come up with useful features
1. A training metrics tab with automatically hosted TensorBoard traces.
2. Metadata tags that help for discoverability.
3. An interactive widget you can use to play out with the model directly in the browser.
4. An Inference API that allows to make inference requests.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-allennlp_widget.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-allennlp_widget-dark.png"/>
</div>

## Using existing models

You can use the `Predictor` class to load existing models on the Hub. To achieve this, use the `from_path` method and use the `"hf://"` prefix with the repository id. Here is an end-to-end example.

```py
import allennlp_models
from allennlp.predictors.predictor import Predictor

predictor = Predictor.from_path("hf://allenai/bidaf-elmo")
predictor_input = {
    "passage": "My name is Wolfgang and I live in Berlin", 
    "question": "Where do I live?"
}
predictions = predictor.predict_json(predictor_input)
```

To get a snippet such as this, you can click `Use in AllenNLP` at the top right,

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-allennlp_snippet.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-allennlp_snippet-dark.png"/>
</div>

## Sharing your models

The first step is to save the model locally. For example, you can use the [`archive_model`](https://docs.allennlp.org/main/api/models/archival/#archive_model) method to save the model as a `model.tar.gz` file. You can then push the zipped model to the Hub. When you train a model with `allennlp`, the model is automatically serialized so you can use that as a preferred option.

### Using the AllenNLP CLI

To push with the CLI, you can use the `allennlp push_to_hf` command as seen below.

```bash
allennlp push_to_hf --repo_name test_allennlp --archive_path model 
```

| Argument                    	| Type         	| Description                                                                                                                   	|
|-----------------------------	|--------------	|-------------------------------------------------------------------------------------------------------------------------------	|
| `--repo_name`, `-n`         	| str / `Path` 	| Name of the repository on the Hub.                                                                                            	|
| `--organization`, `-o`      	| str          	| Optional name of organization to which the pipeline should be uploaded.                                                       	|
| `--serialization-dir`, `-s` 	| str / `Path` 	| Path to directory with the serialized model.                                                                                  	|
| `--archive-path`, `-a`      	| str / `Path` 	| If instead of a serialization path you're using a zipped model (e.g. model/model.tar.gz), you can use this flag.              	|
| `--local-repo-path`, `-l`   	| str / `Path` 	| Local path to the model repository (will be created if it doesn't exist). Defaults to `hub` in the current working directory. 	|
| `--commit-message`, `-c`    	| str          	| Commit message to use for update. Defaults to `"update repository"`.                                                          	|

### From a Python script

The `push_to_hf` function has the same parameters as the bash script.

```py
from allennlp.common.push_to_hf import push_to_hf

serialization_dir = "path/to/serialization/directory"
push_to_hf(
    repo_name="my_repo_name",
    serialization_dir=serialization_dir,
    local_repo_path=self.local_repo_path
)
```

In just a minute, you can get your model in the Hub, try it out directly in the browser, and share it with the rest of the community. All the required metadata will be uploaded for you!


## Additional resources

* AllenNLP [website](https://allenai.org/allennlp).
* AllenNLP [repository](https://github.com/allenai/allennlp).