---
title: Keras
---

# Using Keras at Hugging Face

`Keras` is an open-source machine learning library that leverages TensorFlow and Python to provide high-level components to train neural networks with state-of-the-art outputs on all modalities.

## Exploring Keras in the Hub

You can find `Keras` models by iltering at the left of the [models page](https://huggingface.co/models?library=keras&sort=downloads). All models on the Hub come up with useful features such as an automatically generated model card and metadata tags that help for discoverability. If provided by the model owner, TensorBoard logs are hosted on the Keras repositories as well.


## Using existing models

The `huggingface_hub` library is a lightweight Python client with utlity functions to download models from the Hub.

```
pip install huggingface_hub["tensorflow"]
```

Once you have the library installed, you just need to use the `from_pretrained_keras` method. 

```py
from huggingface_hub import from_pretrained_keras

model = from_pretrained_keras("keras-io/mobile-vit-xxs")
prediction = model.predict(image)
prediction = tf.squeeze(tf.round(prediction))
print(f'The image is a {classes[(np.argmax(prediction))]}!')

# The image is a sunflower!
```


If you want to see how to load a specific model, you can click `Use in keras` and you will be given a working snippet that you can load it! 

![snippet](docs/assets/hub/keras_snippet1.png)
![snippet](docs/assets/hub/keras_snippet2.png)

## Sharing your models

You can share your `keras` models by using the `push_to_hub_keras` method. This will generate a model card that includes your model’s hyperparameters, plot of your model and couple of sections related to the usage purpose of your model, biases the training data might have and limitations about putting your model to production, puts the metrics of your model in a JSON if model has a history. 

```py
from huggingface_hub import push_to_hub_keras

push_to_hub_keras(model,
    "your-username/your-model-name",
    "your-tensorboard-log-directory",
    tags = ["object-detection", "some_other_tag"],
    **model_save_kwargs,
)
```
The repository will host your tensorboard traces like below.
![TensorBoard](docs/assets/hub/keras_tensorboard.png)

## Additional resources

* [Keras Developer Guides](https://keras.io/guides/).
* [Keras examples](https://keras.io/examples/).
* [Keras examples on 🤗 Hub](https://huggingface.co/keras-io).
* For more capabilities of the Keras integration, check out [Putting Keras on 🤗 Hub for Collaborative Training and Reproducibility](https://merveenoyan.medium.com/putting-keras-on-hub-for-collaborative-training-and-reproducibility-9018301de877) tutorial.
