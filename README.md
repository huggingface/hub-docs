# hub-docs

This repository regroups documentation and information that is hosted on the Hugging Face website.

You can access the Hugging Face Hub documentation in the `docs` folder at [hf.co/docs/hub](https://hf.co/docs/hub).

For some related components, check out [Hugging Face Hub](https://github.com/huggingface/huggingface.js)
- Hub Code: [huggingface/huggingface.js/packages/hub](https://github.com/huggingface/huggingface.js/tree/main/packages/hub)
- Hub Widgets: [huggingface/huggingface.js/packages/widgets](https://github.com/huggingface/huggingface.js/tree/main/packages/widgets)
- Hub Tasks (as visible on the page [hf.co/tasks](https://hf.co/tasks)):  [huggingface/huggingface.js/packages/tasks](https://github.com/huggingface/huggingface.js/tree/main/packages/tasks)

### How to contribute to the docs

Just add/edit the Markdown files, commit them, and create a PR.
Then the CI bot will build the preview page and provide a url for you to look at the result!

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
