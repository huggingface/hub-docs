# Livebook on Spaces

**Livebook** is an open-source tool for writing interactive code notebooks in [Elixir](https://elixir-lang.org/). It's part of a growing collection of Elixir tools for [numerical computing](https://github.com/elixir-nx/nx), [data science](https://github.com/elixir-nx/explorer), and [Machine Learning](https://github.com/elixir-nx/bumblebee).

Some of Livebook's most exciting features are:

- **Reproducible workflows**: Livebook runs your code in a predictable order, all the way down to package management
- **Smart cells**: perform complex tasks, such as data manipulation and running machine learning models, with a few clicks using Livebook's extensible notebook cells
- **Elixir powered**: use the power of the Elixir programming language to write concurrent and distributed notebooks that scale beyond your machine

To learn more about it, watch this [15-minute video](https://www.youtube.com/watch?v=EhSNXWkji6o). Or visit [Livebook's website](https://livebook.dev/). Or follow its [Twitter](https://twitter.com/livebookdev) and [blog](https://news.livebook.dev/) to keep up with new features and updates.

## Your first Livebook Space

You can get Livebook up and running in a Space with just a few clicks. Click the button below to start creating a new Space using Livebook's Docker template:

<a href="http://huggingface.co/new-space?template=livebook-dev/livebook" target="_blank">
    <img src="https://huggingface.co/datasets/huggingface/badges/raw/main/deploy-to-spaces-lg.svg" alt="">
</a>

Then:

1. Give your Space a name
2. Set its visibility to public
3. Create your Space

![Creating a Livebok Space ](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-livebook-new-space.png)

This will start building your Space using Livebook's Docker image.

The visibility of the Space must be set to public for the Smart cells feature in Livebook to function properly. However, your Livebook instance will still be protected by Livebook authentication, which we will set up now.

<Tip>
[Smart cell](https://news.livebook.dev/v0.6-automate-and-learn-with-smart-cells-mxJJe) is a type of Livebook cell that provides a UI component for accomplishing a specific task. The code for the task is generated automatically based on the user's interactions with the UI, allowing for faster completion of high-level tasks without writing code from scratch.
</Tip>

To set the password of your Livebook, go to the Settings page of your Space and create a secret called `LIVEBOOK_PASSWORD` with the desired password as its value:

![Configuring your Livebook's password](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-livebook-password.png)

Inside the Settings page, restart your Space:

![Restart Space](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-livebook-restart-space.png)

Once the app build is finished, go to the "App" tab in your Space and log in to your Livebook using the password you previously set:

![Livebook authentication](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-livebook-authentication.png)

That's it! Now you can start using Livebook inside your Space.

If this is your first time using Livebook, you can learn how to use it with its interactive notebooks within Livebook itself:

![Livebook's learn notebooks](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-livebook-learn-section.png)


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

![Factory reboot a Space](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-livebook-factory-reboot.png)

## Caveats

The following caveats apply to running Livebook inside a Space:

- The Space's visibility setting must be public. Otherwise, Smart cells won't work. That said, your Livebook instance will still be behind Livebook authentication since you've set the `LIVEBOOK_PASSWORD` secret.
- Livebook global configurations will be lost once the Space restarts. Consider using the [desktop app](https://livebook.dev/#install) if you find yourself in need of persisting configuration across deployments.

## Feedback and support

If you have improvement suggestions or need specific support, please join the [Livebook community on GitHub](https://github.com/livebook-dev/livebook/discussions).