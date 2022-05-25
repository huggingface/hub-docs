# Spaces Settings

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

For additional settings, refer to the [Reference](./spaces-config-reference) section.
