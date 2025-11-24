# Dash on Spaces

With Dash Open Source, you can create data apps on your laptop in pure Python, no JavaScript required.

Get familiar with Dash by building a [sample app](https://dash.plotly.com/tutorial) with open source. Scale up with [Dash Enterprise](https://plotly.com/dash/) when your Dash app is ready for department or company-wide consumption. Or, launch your initiative with Dash Enterprise from the start to unlock developer productivity gains and hands-on acceleration from Plotly's team.

## Deploy Dash on Spaces

To get started with Dash on Spaces, click the button below:

<a href="http://huggingface.co/new-space?template=plotly/dash-app-template" target="_blank">
    <img src="https://huggingface.co/datasets/huggingface/badges/resolve/main/deploy-to-spaces-lg.svg" alt="">
</a>

This will start building your Space using Plotly's Dash Docker template. If successful, you should see a similar application to the [Dash template app](https://huggingface.co/spaces/dash/dash-app-template).

## Customizing your Dash app

If you have never built with Dash before, we recommend getting started with our [Dash in 20 minutes tutorial](https://dash.plotly.com/tutorial).

When you create a Dash Space, you'll get a few key files to help you get started:

### 1. app.py

This is the main app file that defines the core logic of your project. Dash apps are often structured as modules, and you can optionally separate your layout, callbacks, and data into other files, like `layout.py`, etc.

Inside of `app.py` you will see:

1. `from dash import Dash, html`
   We import the `Dash` object to define our app, and the `html` library, which gives us building blocks to assemble our project.

2. `app = Dash()`
   Here, we define our app. Layout, server, and callbacks are _bound_ to the `app` object.

3. `server = app.server`
   Here, we define our server variable, which is used to run the app in production.

4. `app.layout = `
   The starter app layout is defined as a list of Dash components, an individual Dash component, or a function that returns either.

   The `app.layout` is your initial layout that will be updated as a single-page application by callbacks and other logic in your project.

5. `if __name__ == '__main__': app.run(debug=True)`
   If you are running your project locally with `python app.py`, `app.run(...)` will execute and start up a development server to work on your project, with features including hot reloading, the callback graph, and more.

   In production, we recommend `gunicorn`, which is a production-grade server. Debug features will not be enabled when running your project with `gunicorn`, so this line will never be reached.

### 2. Dockerfile

The Dockerfile for a Dash app is minimal since Dash has few system dependencies. The key requirements are:

- It installs the dependencies listed in `requirements.txt` (using `uv`)
- It creates a non-root user for security
- It runs the app with `gunicorn` using `gunicorn app:server --workers 4`

You may need to modify this file if your application requires additional system dependencies, permissions, or other CLI flags.

### 3. requirements.txt

The Space will automatically install dependencies listed in the `requirements.txt` file. At minimum, you must include `dash` and `gunicorn` in this file. You will want to add any other required packages your app needs.

The Dash Space template provides a basic setup that you can extend based on your needs.

## Additional Resources and Support

- [Dash documentation](https://dash.plotly.com)
- [Dash GitHub repository](https://github.com/plotly/dash)
- [Dash Community Forums](https://community.plotly.com)
- [Dash Enterprise](https://plotly.com/dash)
- [Dash template Space](https://huggingface.co/spaces/plotly/dash-app-template)

## Troubleshooting

If you encounter issues:

1. Make sure your notebook runs locally in app mode using `python app.py`
2. Check that all required packages are listed in `requirements.txt`
3. Verify the port configuration matches (7860 is the default for Spaces)
4. Check Space logs for any Python errors

For more help, visit the [Plotly Community Forums](https://community.plotly.com) or [open an issue](https://github.com/plotly/dash/issues).
