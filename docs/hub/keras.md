# Using Keras at Hugging Face

Keras is an open-source multi-backend deep learning framework, with support for JAX, TensorFlow, and PyTorch. You can find more details about it on [keras.io](https://keras.io/).

## Exploring Keras in the Hub

You can find over 200 `keras` models by filtering at the left of the [models page](https://huggingface.co/models?library=keras&sort=downloads).

Keras models on the Hub come up with useful features:
1. A generated model card with a description, a plot of the model, and more.
2. A download count to monitor the popularity of a model.
3. A code snippet to quickly get started with the model.


## Using existing models

Keras is deeply integrated with the Hugging Face Hub. This means you can load and save models on the Hub directly from the library. To do that, you need to install a recent version of Keras and `huggingface_hub`. The `huggingface_hub` library is a lightweight Python client used by Keras to interact with the Hub.

```
pip install -U keras huggingface_hub
```

Once you have the library installed, you just need to use the regular `keras.saving.load_model` method by passing as argument an HF path. An HF path is a `repo_id` prefixed by `hf://` e.g. `"hf://keras-io/weather-prediction"`. Read more about `load_model` in [Keras documentation](https://keras.io/api/models/model_saving_apis/model_saving_and_loading/#load_model-function).

```py
import keras

model = keras.saving.load_model("hf://Wauplin/mnist_example")
```

If you want to see how to load a specific model, you can click **Use this model** on the model page to get a working code snippet! 

## Sharing your models

Similarly to `load_model`, you can save and share a `keras` model on the Hub using `model.save()` with an HF path. If the repository does not exist on the Hub, it will be created for you. The upload model will contain a model card, a plot of the model, the `metadata.json` and `config.json` files, and a `model.weights.h5` file containing the model weights.


```py
model = ...
model.save("hf://your-username/your-model-name")
```

By default, the repository will contain a minimal model card. Check out the [Model Card guide](https://huggingface.co/docs/hub/model-cards) to learn more about model cards and how to complete them. You can also programmatically update model cards using `huggingface_hub.ModelCard` (see [guide](https://huggingface.co/docs/huggingface_hub/guides/model-cards)).

## TF-Keras (legacy)

`tf-keras` is the name given to Keras 2.x version. It is now hosted as a separate GitHub repo [here](https://github.com/keras-team/tf-keras). Though it's a legacy framework, there are still [4.5k+ models](https://huggingface.co/models?library=tf-keras&sort=trending) hosted on the Hub. These models can be loaded using the `huggingface_hub` library. You **must** have either `tf-keras` or `keras<3.x` installed on your machine.

Once installed, you just need to use the `from_pretrained_keras` method to load a model from the Hub. Read more about `from_pretrained_keras` [here](https://huggingface.co/docs/huggingface_hub/main/en/package_reference/mixins#huggingface_hub.from_pretrained_keras).

```py
from huggingface_hub import from_pretrained_keras

model = from_pretrained_keras("keras-io/mobile-vit-xxs")
prediction = model.predict(image)
prediction = tf.squeeze(tf.round(prediction))
print(f'The image is a {classes[(np.argmax(prediction))]}!')

# The image is a sunflower!
```

You can also host your `tf-keras` model on the Hub. However, keep in mind that `tf-keras` is a legacy framework. To reach a maximum number of users, we recommend to create your model using Keras 3.x and share it natively as described above. For more details about uploading `tf-keras` models, check out [`push_to_hub_keras` documentation](https://huggingface.co/docs/huggingface_hub/main/en/package_reference/mixins#huggingface_hub.push_to_hub_keras).

```py
from huggingface_hub import push_to_hub_keras

push_to_hub_keras(model,
    "your-username/your-model-name",
    "your-tensorboard-log-directory",
    tags = ["object-detection", "some_other_tag"],
    **model_save_kwargs,
)
```

## Additional resources

* Keras Developer [Guides](https://keras.io/guides/).
* Keras [examples](https://keras.io/examples/).
* Keras [examples](https://keras.io/examples/).

<!-- Resources below are outdated -->
<!-- * Keras [examples on 🤗 Hub](https://huggingface.co/keras-io). -->
<!-- * For more capabilities of the Keras integration, check out [Putting Keras on 🤗 Hub for Collaborative Training and Reproducibility](https://merveenoyan.medium.com/putting-keras-on-hub-for-collaborative-training-and-reproducibility-9018301de877) tutorial. -->
