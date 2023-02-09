# Handling Spaces Dependencies

## Default dependencies

The default Spaces environment comes with several pre-installed dependencies:

* The [`huggingface_hub`](https://huggingface.co/docs/huggingface_hub/index) client library allows you to manage your repository and files on the Hub with Python and programmatically access the Inference API from your Space. If you choose to instantiate the model in your app with the Inference API, you can benefit from the built-in acceleration optimizations. This option also consumes less computing resources, which is always nice for the environment! 🌎 

  Refer to this [page](https://huggingface.co/docs/huggingface_hub/how-to-inference) for more information on how to programmatically access the Inference API.

* [`requests`](https://docs.python-requests.org/en/master/) is useful for calling third-party APIs from your app.

* [`datasets`](https://github.com/huggingface/datasets) allows you to fetch or display any dataset from the Hub inside your app.

* The SDK you specified, which could be either `streamlit` or `gradio`. The version is specified in the `README.md` file.

* Common Debian packages, such as `ffmpeg`, `cmake`, `libsm6`, and few others.

## Adding your own dependencies

If you need other Python packages to run your app, add them to a **requirements.txt** file at the root of the repository. The Spaces runtime engine will create a custom environment on-the-fly (you can also add a **pre-requirements.txt** file describing dependencies that will be installed before your main dependencies. It can be usefull if you need to update pip itself).

Debian dependencies are also supported. Add a **packages.txt** file at the root of your repository, and list all your dependencies in it. Each dependency should be on a separate line, and each line will be read and installed by `apt-get install`.
