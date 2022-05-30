# Using Keras at Hugging Face

`keras` is an open-source machine learning library that uses a consistent and simple API to build models leveraging TensorFlow and its ecosystem.

## Exploring Keras in the Hub

You can find over 200 `keras` models by filtering at the left of the [models page](https://huggingface.co/models?library=keras&sort=downloads).

All models on the Hub come up with useful feature:
1. An automatically generated model card with a description, a plot of the model, and more.
2. Metadata tags that help for discoverability and contain information such as license.
3. If provided by the model owner, TensorBoard logs are hosted on the Keras repositories.


## Using existing models

The `huggingface_hub` library is a lightweight Python client with utility functions to download models from the Hub.

```
pip install huggingface_hub["tensorflow"]
```

Once you have the library installed, you just need to use the `from_pretrained_keras` method. Read more about `from_pretrained_keras` [here](https://huggingface.co/docs/huggingface_hub/main/en/package_reference/mixins#huggingface_hub.from_pretrained_keras).

```py
from huggingface_hub import from_pretrained_keras

model = from_pretrained_keras("keras-io/mobile-vit-xxs")
prediction = model.predict(image)
prediction = tf.squeeze(tf.round(prediction))
print(f'The image is a {classes[(np.argmax(prediction))]}!')

# The image is a sunflower!
```

If you want to see how to load a specific model, you can click **Use in keras** and you will be given a working snippet that you can load it! 

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-keras_snippet1.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-keras_snippet1-dark.png"/>
</div>
<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-keras_snippet2.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-keras_snippet2-dark.png"/>
</div>

## Sharing your models

You can share your `keras` models by using the `push_to_hub_keras` method. This will generate a model card that includes your model’s hyperparameters, plot of your model and couple of sections related to the usage purpose of your model, model biases and limitations about putting the model in production. This saves the metrics of your model in a JSON file as well. Read more about `push_to_hub_keras` [here](https://huggingface.co/docs/huggingface_hub/main/en/package_reference/mixins#huggingface_hub.push_to_hub_keras).

```py
from huggingface_hub import push_to_hub_keras

push_to_hub_keras(model,
    "your-username/your-model-name",
    "your-tensorboard-log-directory",
    tags = ["object-detection", "some_other_tag"],
    **model_save_kwargs,
)
```
The repository will host your TensorBoard traces like below.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-keras_tensorboard.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-keras_tensorboard-dark.png"/>
</div>


## Additional resources

* Keras Developer [Guides](https://keras.io/guides/).
* Keras [examples](https://keras.io/examples/).
* Keras [examples on 🤗 Hub](https://huggingface.co/keras-io).
* For more capabilities of the Keras integration, check out [Putting Keras on 🤗 Hub for Collaborative Training and Reproducibility](https://merveenoyan.medium.com/putting-keras-on-hub-for-collaborative-training-and-reproducibility-9018301de877) tutorial.
