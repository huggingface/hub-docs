# Aim on Spaces

**Aim** is an easy-to-use & supercharged open-source experiment tracker. Aim logs your training runs and enables a beautiful UI to compare them and an API to query them programmatically.
ML engineers and researchers use Aim explorers to compare 1000s of training runs in a few clicks.

Check out the [Aim docs](https://aimstack.readthedocs.io/en/latest/) to learn more about Aim. 
If you have an idea for a new feature or have noticed a bug, feel free to [open a feature request or report a bug](https://github.com/aimhubio/aim/issues/new/choose). 

In the following sections, you'll learn how to deploy Aim on the Hugging Face Hub Spaces and explore your training runs directly from the Hub. 

## Deploy Aim on Spaces

You can deploy Aim on Spaces with just a few clicks:

<a  href="https://huggingface.co/new-space?template=argilla/argilla-template-space">
    <img src="https://huggingface.co/datasets/huggingface/badges/raw/main/deploy-to-spaces-lg.svg" />
</a>

All you need to do is:
1. Define the owner (your personal account or organization)
2. Name your Space
3. Choose the **Aim** Docker template
4. Set the visibility

Once you have created the Space, you'll see the `Building` status, and once it becomes `Running,` your Space is ready to go!

### TODO: change screenshot once the Aim template is available
![Creating an Aim Space ](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-livebook-new-space.png)

Now, when you navigate to the **App** section of your space, you'll be able to access the Aim UI.

## Compare your experiments with Aim on Spaces
Let's use a quick example of a PyTorch CNN trained on MNIST to demonstrate end-to-end Aim on Spaces deployment. 
The full example in the [Aim repo examples folder](https://github.com/aimhubio/aim/blob/main/examples/pytorch_track.py).

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

The experiments tracked bdy Aim are stored in the `.aim` folder. **To display the logs with the Aim UI in your HF space, you need to compress the `.aim` folder to a `tar.gz` file and upload it to your Space either using `git` or the Files and Versions sections of your space.** 
Here's a bash command for that:

```bash
tar -czf cnn_mnist_runs_hf.tar.gz .aim
```
This command will compress the `.aim` directory to `cnn_mnist_runs_hf.tar.gz`. 

The final step is to edit the compressed file name in the space’s Dockerfile. 

```Dockerfile
...
# Note: Change the name from fastspeech_logs.tar.gz to your filename
COPY fastspeech_logs.tar.gz .
RUN tar xvzf fastspeech_logs.tar.gz
```
That’s it! Now open the App section of your space and the Aim UI is available with your logs.
Here is what to expect: 

![Aim UI on HF Hub Spaces](https://user-images.githubusercontent.com/67782184/224995208-692afbea-dfe0-4d2a-89ac-4ba552e49a98.png)

Filter your runs using Aim’s Pythonic search. You can write pythonic [queries against](https://aimstack.readthedocs.io/en/latest/using/search.html) EVERYTHING you have tracked - metrics, hyperparams etc.
In the screenshot below, we query all the `accuracy` metrics where the last tracked value is `≥ 90`.

![image](https://user-images.githubusercontent.com/67782184/224995427-db0d8a2b-1d48-46d1-b519-78a2d4d5d0aa.png)

Check out a [text2speech example ](https://huggingface.co/spaces/aimstack/text2speech/tree/main) on HF Hub Spaces.

**_Note_** that if your logs are in tensorboard format, you can easily convert [them to Aim with one command](https://aimstack.readthedocs.io/en/latest/quick_start/convert_data.html#show-tensorboard-logs-in-aim) and use the many advanced and high-performant training run comparison features available.

## Track your Transformers runs with Aim

As we saw in the previous section, tracking Pytorch experiments with Aim and displaying the results on Spaces is straightforward. To make your life even easier, Aim has out-of-the-box integration with Transformers! 
To get started with Aim for your Transformers experiments, include the appropriate `AimCallback` in your training arguments and Aim will handle all the rest! Here's a code snippet showcasing just that:

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

The Aim callback will automatically open an Aim Session and close it when the trainer is done. 
When trainer.train(), trainer.evaluate() or trainer.predict() is called, aim_callback will automatically log the hyper-params and respective metrics. The rest of the process is exactly the same as in the MNIST example above!

You can also find more in-depth examples on fine-tuning Transformers models on the GLUE benchmark [here](https://github.com/aimhubio/aim/blob/main/examples/hugging_face_track.py). You can also check out this [blogpost](https://medium.com/aimstack/aim-v2-2-0-hugging-face-integration-57efa2eec104) for a detailed look at using Aim and Aim UI with Transformers.

## More on HF Spaces

- [HF Docker spaces](https://github.com/huggingface/hub-docs/blob/main/docs/hub/spaces-sdks-docker.md)
- [HF Docker space examples](https://github.com/huggingface/hub-docs/blob/main/docs/hub/spaces-sdks-docker.md)

## Feedback and Support

If you have improvement suggestions or need support, please open an issue on [Aim GitHub repo](https://github.com/aimhubio/aim). 

The [Aim community Discord](https://github.com/aimhubio/aim#-community) is also available for community discussions.

