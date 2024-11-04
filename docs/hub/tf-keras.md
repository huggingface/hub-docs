## TF-Keras (legacy)

`tf-keras` is the name given to Keras 2.x version. It is now hosted as a separate GitHub repo [here](https://github.com/keras-team/tf-keras). Though it's a legacy framework, there are still [4.5k+ models](https://huggingface.co/models?library=tf-keras&sort=trending) hosted on the Hub. These models can be loaded using the `huggingface_hub` library. You **must** have either `tf-keras` or `keras<3.x` installed on your machine.

If you are interested in Keras 3.x support, check out [this guide](./keras).

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

- [GitHub repo](https://github.com/keras-team/tf-keras)
* Blog post [Putting Keras on 🤗 Hub for Collaborative Training and Reproducibility](https://merveenoyan.medium.com/putting-keras-on-hub-for-collaborative-training-and-reproducibility-9018301de877) (April 2022)
