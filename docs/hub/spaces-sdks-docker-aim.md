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

### TODO: insert screenshot here once the Aim template is available

Now, when you navigate to the **App** section of your space, you'll be able to use Aim UI just like you normally would. With Aim UI, you (and everyone else with access to the space) will be able to see detailed logs of model training, so that you get a better picture of the model you're using. 

Note that even if your logs are in tensorboard format, the Aim template will automatically convert them, no extra work needed on your end!

