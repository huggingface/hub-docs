---
title: Streamlit Spaces
---

<h1>Streamlit Spaces</h1>

**Streamlit** gives users more freedom to build a full-featured web app with Python in a *reactive* way. Your code is rerun each time the state of the app changes. Streamlit is also great for data visualization and supports several charting libraries such as Bokeh, Plotly, and Altair. Read our [blog post](https://huggingface.co/blog/streamlit-spaces) about building and hosting Streamlit apps in Spaces.

To use Streamlit in a Space, select **Streamlit** as the SDK when you create a Space through the [**New Space** form](https://huggingface.co/new-space). This will create a repository with a `README.md` that contains the following properties in the YAML configuration block:

```yaml
sdk: streamlit
sdk_version: 1.2.0 # The latest supported version
```

As shown here, the Streamlit version is not configured in the **requirements.txt** file but rather in the `YAML` settings through the `sdk_version` setting. You can edit the `sdk_version`, but note that issues may occur when you use an unsupported Streamlit version. Not all Streamlit versions are supported, so please refer to the [reference section](./spaces-config-reference) to see which versions are available.

If you want to learn more about Streamlit, refer to the [Streamlit documentation](https://docs.streamlit.io/).
