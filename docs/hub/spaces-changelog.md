# Spaces Changelog

## [2023-07-28] - Upstream Streamlit frontend for `>=1.23.0`

- Streamlit SDK uses the upstream packages published on PyPI for `>=1.23.0`, so the newly released versions are available from the day of release.

## [2023-05-30] - Add support for Streamlit 1.23.x and 1.24.0

- Added support for Streamlit `1.23.0`, `1.23.1`, and `1.24.0`.
- Since `1.23.0`, the Streamlit frontend has been changed to the upstream version from the HF-customized one.

## [2023-05-30] - Add support for Streamlit 1.22.0

- Added support for Streamlit `1.22.0`.

## [2023-05-15] - The default Streamlit version
- The default Streamlit version is set as `1.21.0`.

## [2023-04-12] - Add support for Streamlit up to 1.19.0
- Support for `1.16.0`, `1.17.0`, `1.18.1`, and `1.19.0` is added and the default SDK version is set as `1.19.0`.

## [2023-03-28] - Bug fix
- Fixed a bug causing inability to scroll on iframe-embedded or directly accessed Streamlit apps, which was reported at https://discuss.huggingface.co/t/how-to-add-scroll-bars-to-a-streamlit-app-using-space-direct-embed-url/34101. The patch has been applied to Streamlit>=1.18.1.

## [2022-12-15] - Spaces supports Docker Containers

- Read more doc about: [Docker Spaces](./spaces-sdks-docker)

## [2022-12-14] - Ability to set a custom `sleep` time

- Read more doc here: [Spaces sleep time](./spaces-gpus#sleep-time)

## [2022-12-07] - Add support for Streamlit 1.15

- Announcement : https://twitter.com/osanseviero/status/1600881584214638592.

## [2022-06-07] - Add support for Streamlit 1.10.0

- The new multipage apps feature is working out-of-the-box on Spaces.
- Streamlit blogpost : https://blog.streamlit.io/introducing-multipage-apps.

## [2022-05-23] - Spaces speedup and reactive system theme

- All Spaces using Gradio 3+ and Streamlit 1.x.x have a significant speedup in loading.
- System theme is now reactive inside the app. If the user changes to dark mode, it automatically changes.

## [2022-05-21] - Default Debian packages and Factory Reboot

- Spaces environments now come with pre-installed popular packages (`ffmpeg`, `libsndfile1`, etc.).
    - This way, most of the time, you don't need to specify any additional package for your Space to work properly.
    - The `packages.txt` file can still be used if needed.
- Added factory reboot button to Spaces, which allows users to do a full restart avoiding cached requirements and freeing GPU memory.

## [2022-05-17] - Add support for Streamlit 1.9.0

- All `1.x.0` versions are now supported (up to `1.9.0`).

## [2022-05-16] - Gradio 3 is out!

- This is the default version when creating a new Space, don't hesitate to [check it out](https://huggingface.co/blog/gradio-blocks).

## [2022-03-04] - SDK version lock

- The `sdk_version` field is now automatically pre-filled at Space creation time.
    - It ensures that your Space stays on the same SDK version after an updatE.

## [2022-03-02] - Gradio version pinning

- The `sdk_version` configuration field now works with the Gradio SDK.

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
