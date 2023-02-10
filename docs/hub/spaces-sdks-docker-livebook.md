# Livebook on Spaces

**Livebook** is an open-source tool for writing interactive code notebooks in [Elixir](https://elixir-lang.org/). It's part of a growing collection of Elixir tools for [numerical computing](https://github.com/elixir-nx/nx), [data science](https://github.com/elixir-nx/explorer), and [Machine Learning](https://github.com/elixir-nx/bumblebee).

To learn more about it, visit [Livebook's website](https://livebook.dev/). Or you can follow its [Twitter](https://twitter.com/livebookdev) and [blog](https://news.livebook.dev/) to keep up with new features and updates.

## Your first Livebook Space

You can get Livebook up and running in a Space with just a few clicks. Click the button below to start creating a new Space using Livebook's Docker template:

<a href="http://huggingface.co/new-space?template=livebook-dev/livebook" target="_blank">
    <img src="https://huggingface.co/datasets/huggingface/badges/raw/main/deploy-to-spaces-lg.svg" alt="">
</a>

Then:

1. Give your Space a name
2. Set its visibility to public
3. Create your Space

![](https://i.imgur.com/s4E9yDD.png)

This will start building your Space using Livebook's Docker image.

The visibility of the Space must be set to public for the Smart Cells feature in Livebook to function properly. However, your Livebook instance will still be protected by Livebook authentication, which we will set up now.

To set the password of your Livebook, go to the Settings page of your Space and create a secret called `LIVEBOOK_PASSWORD` with the desired password as its value:

![](https://i.imgur.com/J1y3Mv0.png)

Inside the Settings page, restart your Space:

![](https://i.imgur.com/ulRcsSU.png)

Once the app build is finished, go to the "App" tab in your Space and log in to your Livebook using the password you previously set:

![](https://i.imgur.com/vFHjcVG.png)

That's it! Now you can start using Livebook inside your Space.

If this is your first time using Livebook, you can learn how to use it with its interactive notebooks within Livebook itself:

![](https://i.imgur.com/kdZjTj8.png)


## Livebook integration with Hugging Face Models

Livebook has an [official integration with Hugging Face models](https://livebook.dev/integrations/hugging-face). With this feature, you can run various Machine Learning models within Livebook with just a few clicks.

Here's a quick video showing how to do that:

<Youtube id="IcR60pVKeGY"/>

## How to configure Livebook to use the GPU

If your Space Hardware is configured to use a GPU accelerator, you can configure Livebook to leverage it.

Go to the Settings page of your Space and create a secret called `XLA_TARGET` with the value `cuda118`.

Restart your Space and start using Livebook with a GPU.

## How to update Livebook's version

To update Livebook to its latest version, go to the Settings page of your Space and click on "Factory reboot this Space":

![](https://i.imgur.com/4vzqekK.png)

## Feedback and support

If you have improvement suggestions or need specific support, please join the [Livebook community on GitHub](https://github.com/livebook-dev/livebook/discussions).