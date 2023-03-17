# Aim on Spaces

**Aim** is an easy-to-use & supercharged open-source experiment tracker. Aim logs your training runs, enables a beautiful UI to compare them and an API to query them programmatically.

Visit the [Aim docs](https://aimstack.readthedocs.io/en/latest/) to learn more about features. If you have an idea for a new feature or have noticed a bug, feel free to [open a feature request or report a bug](https://aimstack.readthedocs.io/en/latest/). 

In the following sections, you'll learn how to deploy your own Aim app to the Hub that will allow you to store detailed logs of model training alongside the actual models, all shown in an intuitive UI. This Aim app is a **self-contained application completely hosted on the Hub using Docker**.

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

## Demo your experiments with Aim on Spaces
Let’s use Aim on Spaces to demo a simple CNN built with Pytorch and trained on the MNIST dataset. We’ll use the example notebook found in the Aim repo, [check it out](https://github.com/aimhubio/aim/blob/main/examples/pytorch_track.py) for the end-to-end example.

```python
from aim import Run
from aim.pytorch import track_gradients_dists, track_params_dists

# Initialize a new Run
aim_run = Run()
...
items = {'accuracy': acc, 'loss': loss}
aim_run.track(items, epoch=epoch, context={'subset': 'train'})

# Track weights and gradients distributions
track_params_dists(model, aim_run)
track_gradients_dists(model, aim_run)
```

When you track an experiment with Aim, the logs will be stored in an .aim folder. To display the logs with the Aim UI in your HF space, you need to compress this folder to a tar.gz file and upload it to your Space either using git or the Files and Versions sections of your space. Here's a bash command for that:

```bash
tar -czf fastspeech_logs.tar.gz .aim
```
This will compress the .aim directory to fastspeech_logs.tar.gz. All that’s left then is to specify the compressed file name in the space’s Dockerfile. For this example, we use the Dockerfile from the Aim [text2speech](https://huggingface.co/spaces/aimstack/text2speech/tree/main) demo space. 

```Dockerfile
...
# Change the name from fastspeech_logs.tar.gz to your filename
COPY fastspeech_logs.tar.gz .
RUN tar xvzf fastspeech_logs.tar.gz
```
That’s it! Now when you go to the App section of your space, you’ll see the Aim UI with your logs.

![image](https://user-images.githubusercontent.com/67782184/224995208-692afbea-dfe0-4d2a-89ac-4ba552e49a98.png)

You can also use Aim’s Pythonic search functionality to easily filter your runs based on metrics and hyparparameters. This allows for much more in-depth demos of model experiments. In the screenshot below, we filter to only include runs where the accuracy on the last epoch was ≥ 90.

![image](https://user-images.githubusercontent.com/67782184/224995427-db0d8a2b-1d48-46d1-b519-78a2d4d5d0aa.png)

## Track your Transformers runs with Aim

As we saw in the previous section, tracking Pytorch experiments with Aim and displaying the results on Spaces is very straightforward. To make your life even easier, Aim has explicit integration with Transformers since v2.2.0! 
To get started with Aim for your Transformers experiments, all you need to do is include the appropriate AimCallback in your training arguments and Aim will handle all the rest! Here's a code snippet showcasing just that:

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

The Aim callback will automatically open an Aim Session and close it when the trainer is done. When trainer.train(), trainer.evaluate() or trainer.predict() is called, aim_callback will automatically log the hyper-params and respective metrics. The rest of the process is exactly the same as in the MNIST example above!
While getting started with Aim with Transformers is as simple as that, you can also find a much more in-depth example on fine-tuning Transformers models on the GLUE benchmark [here](https://github.com/aimhubio/aim/blob/main/examples/hugging_face_track.py). You can also check out this [blogpost](https://medium.com/aimstack/aim-v2-2-0-hugging-face-integration-57efa2eec104) for a detailed look at using Aim and Aim UI with Transformers.
## More on HF Spaces

- [HF Docker spaces](https://github.com/huggingface/hub-docs/blob/main/docs/hub/spaces-sdks-docker.md)
- [HF Docker space examples](https://github.com/huggingface/hub-docs/blob/main/docs/hub/spaces-sdks-docker.md)

## Feedback and Support

If you have improvement suggestions or need support, please join the [Aim](https://github.com/aimhubio) community on GitHub.

