# hub-docs

This repository regroups frontend components, documentation and information that is hosted on the Hugging Face website.

In the different folders, you will find:
- Widgets and other frontend components in the `js` folder.
- The tasks as visible on the following page: [hf.co/tasks](https://hf.co/tasks) in the `tasks` folder.
- In the `docs` folder, the Hugging Face Hub documentation as visible here: [hf.co/docs/hub](https://hf.co/docs/hub)

### Previewing locally

```
// install doc-builder (if not done already)
pip install hf-doc-builder

// run `doc-builder preview` cmd
doc-builder preview hub {YOUR_PATH}/hub-docs/docs/hub/ --not_python_module
```
