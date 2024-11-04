# marimo on Spaces

[marimo](https://github.com/marimo-team/marimo) is a reactive notebook for Python that models notebooks as dataflow graphs. When you run a cell or interact with a UI element, marimo automatically runs affected cells (or marks them as stale), keeping code and outputs consistent and preventing bugs before they happen. Every marimo notebook is stored as pure Python, executable as a script, and deployable as an app.

Key features:

- ⚡️ **reactive:** run a cell, and marimo reactively runs all dependent cells or marks them as stale
- 🖐️ **interactive:** bind sliders, tables, plots, and more to Python — no callbacks required
- 🔬 **reproducible:** no hidden state, deterministic execution, built-in package management
- 🏃 **executable:** execute as a Python script, parametrized by CLI args
- 🛜 **shareable:** deploy as an interactive web app or slides, run in the browser via WASM
- 🛢️ **designed for data:** query dataframes and databases with SQL, filter and search dataframes

## Deploying marimo apps on Spaces

To get started with marimo on Spaces, click the button below:

<a href="http://huggingface.co/new-space?template=marimo-team/marimo-app-template" target="_blank">
    <img src="https://huggingface.co/datasets/huggingface/badges/raw/main/deploy-to-spaces-lg.svg" alt="">
</a>

This will start building your Space using marimo's Docker template. If successful, you should see a similar application to the [marimo introduction notebook](https://huggingface.co/spaces/marimo-team/marimo-app-template).

## Customizing your marimo app

When you create a marimo Space, you'll get a few key files to help you get started:

### 1. app.py

This is your main marimo notebook file that defines your app's logic. marimo notebooks are pure Python files that use the `@app.cell` decorator to define cells. To learn more about building notebooks and apps, see [the marimo documentation](https://docs.marimo.io). As your app grows, you can organize your code into modules and import them into your main notebook.

### 2. Dockerfile

The Dockerfile for a marimo app is minimal since marimo has few system dependencies. The key requirements are:

- It installs the dependencies listed in `requirements.txt` (using `uv`)
- It creates a non-root user for security
- It runs the app using `marimo run app.py`

You may need to modify this file if your application requires additional system dependencies, permissions, or other CLI flags.

### 3. requirements.txt

The Space will automatically install dependencies listed in the `requirements.txt` file. At minimum, you must include `marimo` in this file. You will want to add any other required packages your app needs.

The marimo Space template provides a basic setup that you can extend based on your needs. When deployed, your notebook will run in "app mode" which hides the code cells and only shows the interactive outputs - perfect for sharing with end users. You can opt to include the code cells in your app by setting adding `--include-code` to the `marimo run` command in the Dockerfile.

## Additional Resources and Support

- [marimo documentation](https://docs.marimo.io)
- [marimo GitHub repository](https://github.com/marimo-team/marimo)
- [marimo Discord](https://marimo.io/discord)
- [marimo template Space](https://huggingface.co/spaces/marimo-team/marimo-app-template)

## Troubleshooting

If you encounter issues:

1. Make sure your notebook runs locally in app mode using `marimo run app.py`
2. Check that all required packages are listed in `requirements.txt`
3. Verify the port configuration matches (7860 is the default for Spaces)
4. Check Space logs for any Python errors

For more help, visit the [marimo Discord](https://marimo.io/discord) or [open an issue](https://github.com/marimo-team/marimo/issues).
