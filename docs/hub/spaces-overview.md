# Spaces Overview

Hugging Face Spaces make it easy for you to create and deploy ML-powered demos in minutes. Watch the following video for a quick introduction to Spaces:

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/3bSVKNKb_PY" title="Spaces intro" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

In the following sections, you'll learn the basics of creating a Space, configuring it, and deploying your code to it.

## Creating a new Space

**To make a new Space**, visit the [Spaces main page](https://huggingface.co/spaces) and click on **Create new Space**. Along with choosing a name for your Space, selecting an optional license, and setting your Space's visibility, you'll be prompted to choose the **SDK** for your Space. The Hub offers three SDK options: Gradio, Streamlit, and static HTML. If you select "Gradio" as your SDK, you'll be navigated to a new repo showing the following page:

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-blank-space.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-blank-space-dark.png"/>
</div>

Under the hood, Spaces stores your code inside a git repository, just like the model and dataset repositories. Thanks to this, the same tools we use for all the [other repositories on the Hub](./repositories) (`git` and `git-lfs`) also work for Spaces. Follow the same flow as in [Getting Started with Repositories](./repositories-getting-started) to add files to your Space. Each time a new commit is pushed, the Space will automatically rebuild and restart.

For step-by-step tutorials to creating your first Space, see the guides below:
* [Creating a Gradio Space](./spaces-sdks-gradio)
* [Creating a Streamlit Space](./spaces-sdks-streamlit)

## Hardware resources

Each Spaces environment is limited to 16GB RAM and 8 CPU cores by default, which you can use free of charge. You can upgrade to better hardware, including a variety of GPU accelerators, for a [competitive price](https://huggingface.co/pricing#spaces). To request an upgrade, please click the _Settings_ button in your Space and select your preferred hardware environment.

You can also request a community GPU grant if you are building something cool as a side project. Drop us a note using the link in the _Settings_ tab of your Space!

## Managing secrets

If your app requires secret keys or tokens, don't hard-code them inside your app! Instead, go to the **Settings** page of your Space repository and enter your secrets there. The secrets will be exposed to your app with [Streamlit Secrets Management](https://blog.streamlit.io/secrets-in-sharing-apps/) if you use Streamlit, and as environment variables in other cases. 

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/secrets.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/secrets-dark.png"/>
</div>

## Networking

If your Space needs to make any network requests, you can make requests through the standard HTTP and HTTPS ports (80 and 443) along with port 8080. Any requests going to other ports will be blocked.