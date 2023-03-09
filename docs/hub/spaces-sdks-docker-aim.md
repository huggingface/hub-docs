# Aim on Spaces

**Aim** is an easy-to-use & supercharged open-source experiment tracker. Aim logs your training runs, enables a beautiful UI to compare them and an API to query them programmatically.

Visit the [Aim docs](https://aimstack.readthedocs.io/en/latest/) to learn more about features. If you have an idea for a new feature or have noticed a bug, feel free to [open a feature request or report a bug](https://aimstack.readthedocs.io/en/latest/). 

In the following sections, you'll learn how to deploy your own Aim app to the Hub that will allow you to store detailed logs of model training alongside the actual models, all shown in an intuitive UI. This Aim app is a **self-contained application completely hosted on the Hub using Docker**.

## Track your Transformers runs with Aim

Tracking your Transformers experiments with Aim is very easy. 
All you need to do is include the appropriate AimCallback in your training arguments and Aim will handle all the rest! Here's a code snippet showcasing just that:

```python
from aim.hugging_face import AimCallback
from transformers import Trainer

aim_callback = AimCallback(repo='/log/dir/path', experiment='your_experiment_name')

trainer = Trainer(
       model=model,
       args=training_args,
       callbacks=[aim_callback]
    )
```

The Aim callback will automatically open an Aim Session and close it when the trainer is done. When trainer.train(), trainer.evaluate() or trainer.predict() is called, aim_callback will automatically log the hyper-params and respective metrics.

Find a full example [here](https://github.com/aimhubio/aim/blob/main/examples/hugging_face_track.py).

## Deploy Aim on Spaces

You can deploy Aim on Spaces with just a few clicks:

<a  href="https://huggingface.co/new-space?template=argilla/argilla-template-space">
    <img src="https://huggingface.co/datasets/huggingface/badges/raw/main/deploy-to-spaces-lg.svg" />
</a>

All you need to do is:
1. Define the owner (your personal account or organization)
2. Name your space
3. Choose the **Aim** Docker template
4. Set the visibility

Once you have created the space, you'll see the `Building` status and once it becomes `Running` your space is ready to go!

### TODO: change screenshot once the Aim template is available
![Creating an Aim Space ](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-livebook-new-space.png)

Now, when you navigate to the **App** section of your space, you'll be able to use Aim UI just like you normally would. With Aim UI, you (and everyone else with access to the space) will be able to see detailed logs of model training, so that you get a better picture of the model you're using. 

Note that even if your logs are in tensorboard format, the Aim template will automatically convert them, no extra work needed on your end!

## Uploading logs to your Aim Space

When you use Aim to track experiments, the logs will be stored in an .aim directory. When using an Aim Space for your model, you need to compress said directory to a tar.gz file and upload it alongside the other files. The Dockerfile will automatically extract the archive and use the logs from there.  

## More on HF Spaces

- [HF Docker spaces](https://github.com/huggingface/hub-docs/blob/main/docs/hub/spaces-sdks-docker.md)
- [HF Docker space examples](https://github.com/huggingface/hub-docs/blob/main/docs/hub/spaces-sdks-docker.md)

## Feedback and Support

If you have improvement suggestions or need support, please join the [Aim](https://github.com/aimhubio) community on GitHub.

