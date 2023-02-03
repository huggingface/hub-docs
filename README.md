# hub-docs

This repository regroups frontend components, documentation and information that is hosted on the Hugging Face website.

In the different folders, you will find:
- Widgets and other frontend components in the `js` folder.
- The tasks as visible on the following page: [hf.co/tasks](https://hf.co/tasks) in the `tasks` folder.
- In the `docs` folder, the Hugging Face Hub documentation as visible here: [hf.co/docs/hub](https://hf.co/docs/hub)

### How to contribute to the document
Just add/edit the Markdown files, commit them, and create a PR.
Then the CI bot will build the preview page.

For simple edits, you don't need a local build environment.

### Previewing locally

```bash
# install doc-builder (if not done already)
pip install hf-doc-builder

# you may also need to install some extra dependencies
pip install black watchdog

# run `doc-builder preview` cmd
doc-builder preview hub {YOUR_PATH}/hub-docs/docs/hub/ --not_python_module
```
