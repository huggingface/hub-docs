# Using Keras at Hugging Face

Keras is an open-source multi-backend deep learning framework, with support for JAX, TensorFlow, and PyTorch. You can find more details about it on [keras.io](https://keras.io/).

## Exploring Keras in the Hub

You can list `keras` models on the Hub by filtering by library name on the [models page](https://huggingface.co/models?library=keras&sort=downloads).

Keras models on the Hub come up with useful features when uploaded directly from the Keras library:
1. A generated model card with a description, a plot of the model, and more.
2. A download count to monitor the popularity of a model.
3. A code snippet to quickly get started with the model.


## Using existing models

Keras is deeply integrated with the Hugging Face Hub. This means you can load and save models on the Hub directly from the library. To do that, you need to install a recent version of Keras and `huggingface_hub`. The `huggingface_hub` library is a lightweight Python client used by Keras to interact with the Hub.

```
pip install -U keras huggingface_hub
```

Once you have the library installed, you just need to use the regular `keras.saving.load_model` method by passing as argument a Hugging Face path. An HF path is a `repo_id` prefixed by `hf://` e.g. `"hf://keras-io/weather-prediction"`. Read more about `load_model` in [Keras documentation](https://keras.io/api/models/model_saving_apis/model_saving_and_loading/#load_model-function).

```py
import keras

model = keras.saving.load_model("hf://Wauplin/mnist_example")
```

If you want to see how to load a specific model, you can click **Use this model** on the model page to get a working code snippet! 

## Sharing your models

Similarly to `load_model`, you can save and share a `keras` model on the Hub using `model.save()` with an HF path:


```py
model = ...
model.save("hf://your-username/your-model-name")
```

If the repository does not exist on the Hub, it will be created for you. The uploaded model contains a model card, a plot of the model, the `metadata.json` and `config.json` files, and a `model.weights.h5` file containing the model weights.

By default, the repository will contain a minimal model card. Check out the [Model Card guide](https://huggingface.co/docs/hub/model-cards) to learn more about model cards and how to complete them. You can also programmatically update model cards using `huggingface_hub.ModelCard` (see [guide](https://huggingface.co/docs/huggingface_hub/guides/model-cards)).

<Tip>

You might be already familiar with `.keras` files. In fact, a `.keras` file is simply a zip file containing the `.json` and `model.weights.h5` files. When pushed to the Hub, the model is saved as an unzipped folder in order to let you navigate through the files. Note that if you manually upload a `.keras` file to a model repository on the Hub, the repository will automatically be tagged as `keras` but you won't be able to load it using `keras.saving.load_model`.

</Tip>

## Additional resources

* Keras Developer [Guides](https://keras.io/guides/).
* Keras [examples](https://keras.io/examples/).
