---
title: Spaces Overview
---

<h1>Spaces Overview</h1>

Hugging Face Spaces make it easy for you to create and deploy ML-powered demos in minutes. Watch the following video for a quick introduction to Spaces:

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/3bSVKNKb_PY" title="Spaces intro" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

In the following sections, you'll learn the basics of creating a Space, configuring it, and deploying your code to it.

## Creating a new Space

**To make a new Space**, visit the [Spaces main page](https://huggingface.co/spaces) and click on **Create new Space**. Along with choosing a name for your Space, selecting an optional license, and setting your Space's visibility, you'll be prompted to choose the **SDK** for your Space. The Hub offers three SDK options: Gradio, Streamlit, and static HTML. You can read more about these in the [SDK section of these docs](./spaces-sdks). If you select "Gradio" as your SDK, you'll be navigated to a new repo showing the following page:

![Viewing a brand new Hugging Face Space](/docs/assets/hub/spaces-blank-space.png)

Under the hood, Spaces stores your code inside a git repository, just like the model and dataset repositories. Thanks to this, the same tools we use for all the [other repositories on the Hub](./repositories-main) (`git` and `git-lfs`) also work for Spaces. Follow the same flow as in [Getting Started with Repositories](./repositories-getting-started) to add files to your Space. Each time a new commit is pushed, the Space will automatically rebuild and restart.

## Dependencies

### Default dependencies

The default Spaces environment comes with several pre-installed dependencies:

* The [`huggingface_hub`](https://huggingface.co/docs/huggingface_hub/index) client library allows you to manage your repository and files on the Hub with Python and programmatically access the Inference API from your Space. If you choose to instantiate the model in your app with our Inference API, you can benefit from the built-in acceleration optimizations. This option also consumes less computing resources, which is always nice for the environment! 🌎 

  Refer to this [page](https://huggingface.co/docs/huggingface_hub/how-to-inference) for more information on how to programmatically access the Inference API.

* [`requests`](https://docs.python-requests.org/en/master/) is useful for calling third-party APIs from your app.

* [`datasets`](https://github.com/huggingface/datasets) allows you to fetch or display any dataset from the Hub inside your app.

### Adding extra dependencies

We you need other Python packages to run your app, add them to a **requirements.txt** file at the root of your repository. The Spaces runtime engine will create a custom environment on-the-fly.

Debian dependencies are also supported. Add a **packages.txt** file at the root of your repository, and list all your dependencies in it. Each dependency should be on a separate line, and each line will be read and installed by `apt-get install`.


## Hardware resources

Each Spaces environment is limited to 16GB RAM and 8 CPU cores. Individuals and Organization [subscribers](https://huggingface.co/pricing) (Lab, Startup, and Enterprise) can access Spaces with one T4 GPU on a case-by-case basis. Please email us at **website at huggingface.co** to request a T4 GPU.

## Configuring Spaces settings

You can configure your Space's appearance and other settings inside the `YAML` block at the top of the **README.md** file at the root of the repository. For example, if you want to create a Space with Gradio named `Demo Space` with a yellow to orange gradient thumbnail:

```yaml
---
title: Demo Space
emoji: 🤗
colorFrom: yellow
colorTo: orange
sdk: gradio
app_file: app.py
pinned: false
---
```

For additional settings, refer to the [Reference](./spaces-reference) section.

## Managing secrets

If your app requires secret keys or tokens, don't hard-code them inside your app! Instead, go to the **Settings** page of your Space repository and enter your secrets there. The secrets will be exposed to your app with [Streamlit Secrets Management](https://blog.streamlit.io/secrets-in-sharing-apps/) if you use Streamlit, and as environment variables in other cases. 

![screenshot of secrets settings](/docs/assets/hub/secrets.png)
