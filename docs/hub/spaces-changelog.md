# Spaces Changelog

## [2022-05-21] - Default Debian pakcages
- Spaces environment now comes with pre-installed popular packages (`ffmpeg`, `libsndfile1`, etc.)
- This way, most of the time, you don't need to specify any additional package for your Space to work properly
- The `packages.txt` file can still be used if needed

## [2022-05-17] - Add support for Streamlit 1.9.0
- All `1.x.0` versions are now supported (up to `1.9.0`)

## [2022-05-16] - Gradio 3 is out !
- This is the default version when creating a new Space, don't hesitate to check it out
- https://huggingface.co/blog/gradio-blocks

## [2022-03-04] - SDK version lock
- The `sdk_version` field is now automatically pre-filled at Space creation time
- It ensures that your Space stays on the same SDK version after an update by default

## [2022-03-02] - Gradio version pinning
- The `sdk_version` configuration field now also works with the Gradio sdk

## [2022-02-21] - Python versions
- You can specify the version of Python that you want your Space to run on.
- Only Python 3 versions are supported.

## [2022-01-24] - Automatic model and dataset linking from Spaces
- We attempt to automatically extract model and dataset repo ids used in your code
- You can always manually define them with `models` and `datasets` in your YAML.

## [2021-10-20] - Add support for Streamlit 1.0
- We now support all versions between 0.79.0 and 1.0.0

## [2021-09-07] - Streamlit version pinning
- You can now choose which version of Streamlit will be installed within your Space

## [2021-09-06] - Upgrade Streamlit to `0.84.2`
- Supporting Session State API
- [Streamlit changelog](https://github.com/streamlit/streamlit/releases/tag/0.84.0)

## [2021-08-10] - Upgrade Streamlit to `0.83.0`
- [Streamlit changelog](https://github.com/streamlit/streamlit/releases/tag/0.83.0)

## [2021-08-04] - Debian packages
- You can now add your `apt-get` dependencies into a `packages.txt` file

## [2021-08-03] - Streamlit components
- Add support for [Streamlit components](https://streamlit.io/components)

## [2021-08-03] - Flax/Jax GPU improvements
- For GPU-activated Spaces, make sure Flax / Jax runs smoothly on GPU

## [2021-08-02] - Upgrade Streamlit to `0.82.0`
- [Streamlit changelog](https://github.com/streamlit/streamlit/releases/tag/0.82.0)

## [2021-08-01] - Raw logs available
- Add link to raw logs (build and container) from the space repository (viewable by users with write access to a Space)
