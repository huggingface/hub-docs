# JupyterLab on Spaces

[JupyterLab](https://jupyter.org/) is a web-based interactive development environment for Jupyter notebooks, code, and data. It is a great tool for data science and machine learning, and it is widely used by the community. With Hugging Face Spaces, you can deploy your own JupyterLab instance and use it for development directly from the Hugging Face website.

## ⚡️ Deploy a JupyterLab instance on Spaces

You can deploy JupyterLab on Spaces with just a few clicks. First, go to [this link](https://huggingface.co/new-space?template=SpacesExamples/jupyterlab) or click the button below:

<a  href="https://huggingface.co/new-space?template=SpacesExamples/jupyterlab">
  <img src="https://huggingface.co/datasets/huggingface/badges/resolve/main/deploy-to-spaces-lg.svg" />
</a>

Spaces requires you to define:

* An **Owner**: either your personal account or an organization you're a
  part of. 

* A **Space name**: the name of the Space within the account
  you're creating the Space.

* The **Visibility**: _private_ if you want the
  Space to be visible only to you or your organization, or _public_ if you want
  it to be visible to other users. 

* The **Hardware**: the hardware you want to use for your JupyterLab instance. This goes from CPUs to H100s.

* You can optionally configure a `JUPYTER_TOKEN` password to protect your JupyterLab workspace. When unspecified, defaults to `huggingface`. We strongly recommend setting this up if your Space is public or if the Space is in an organization.

<Tip warning={true}}>

Storage in Hugging Face Spaces is ephemeral, and the data you store in the default configuration can be lost in a reboot or reset of the Space. We recommend to save your work to a remote location or to use persistent storage for your data.

</Tip>

### Setting up persistent storage

To set up persitent storage on the Space, you go to the Settings page of your Space and choose one of the options: `small`, `medium` and `large`. Once persisent storage is set up, it gets mounted in `/data`. In order to see the persistent folder in the JupyterLab UI, you can create a `symlink` for it in the JupyterLab Terminal.

```shell
ln -s /data persistent_folder
```

## Read more

- [HF Docker Spaces](https://huggingface.co/docs/hub/spaces-sdks-docker)

If you have any feedback or change requests, please don't hesitate to reach out to the owners on the [Feedback Discussion](https://huggingface.co/spaces/SpacesExamples/jupyterlab/discussions/3).

## Acknowledgments

This template was created by [camenduru](https://twitter.com/camenduru) and [nateraw](https://huggingface.co/nateraw), with contributions of [osanseviero](https://huggingface.co/osanseviero) and [azzr](https://huggingface.co/azzr).
