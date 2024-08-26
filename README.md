# Hub Documentation

Welcome to the documentation repository for Hugging Face Hub. This repository contains the documentation and information hosted on the Hugging Face website.

## Accessing Documentation

You can find the Hugging Face Hub documentation in the `docs` folder. For direct access, visit: [hf.co/docs/hub](https://huggingface.co/docs/hub/index).

## Related Components

Explore these related components for more utilities and features:

- **Hugging Face Hub JS Repository:**
  - [Utilities to Interact with the Hub](https://github.com/huggingface/huggingface.js/tree/main/packages/hub): Contains utilities to interact with the Hugging Face Hub.
  - [Hub Widgets](https://github.com/huggingface/huggingface.js/tree/main/packages/widgets): Includes widgets for the Hub.
  - [Hub Tasks](https://github.com/huggingface/huggingface.js/tree/main/packages/tasks): Provides information on tasks visible on [hf.co/tasks](https://huggingface.co/tasks).

## Contributing to the Documentation

To contribute:

1. **Edit/Add Markdown Files:** Make changes directly to the Markdown files in this repository.
2. **Commit Changes:** Commit your changes and create a Pull Request (PR).
3. **CI Bot Preview:** After creating a PR, the CI bot will build a preview of your changes. You will receive a URL to review the result.

For straightforward edits, you do not need a local build environment.

## Previewing Documentation Locally

To preview the documentation changes on your local machine, follow these steps:

1. **Install Doc-Builder:**
   ```bash
   pip install hf-doc-builder
   ```

2. **Install Additional Dependencies (if needed):**
   ```bash
   pip install black watchdog
   ```

3. **Run the Preview Command:**
   ```bash
   doc-builder preview hub {YOUR_PATH}/hub-docs/docs/hub/ --not_python_module
   ```

Replace `{YOUR_PATH}` with the path to the cloned repository on your local machine.
