# Shiny on Spaces

[Shiny](https://shiny.posit.co/) is an open-source framework for building simple, beautiful, and performant data applications. 
The goal when developing Shiny was to build something simple enough to teach someone in an afternoon but extensible enough to power large, mission-critical applications. 
You can create a useful Shiny app in a few minutes, but if the scope of your project grows, you can be sure that Shiny can accommodate that application.

The main feature that differentiates Shiny from other frameworks is its reactive execution model. 
When you write a Shiny app, the framework infers the relationship between inputs, outputs, and intermediary calculations and uses those relationships to render only the things that need to change as a result of a user's action. 
The result is that users can easily develop efficient, extensible applications without explicitly caching data or writing callback functions.

## Shiny for Python

[Shiny for Python](https://shiny.rstudio.com/py/) is a pure Python implementation of Shiny. 
This gives you access to all of the great features of Shiny like reactivity, complex layouts, and modules without needing to use R. 
Shiny for Python is ideal for Hugging Face applications because it integrates smoothly with other Hugging Face tools.

To get started deploying a Space, click this button to select your hardware and specify if you want a public or private Space.
The Space template will populate a few files to get your app started.

<a  href="https://huggingface.co/new-space?template=posit/shiny-for-python-template"> <img src="https://huggingface.co/datasets/huggingface/badges/resolve/main/deploy-to-spaces-lg.svg"/> </a>


_app.py_

This file defines your app's logic. To learn more about how to modify this file, see [the Shiny for Python documentation](https://shiny.rstudio.com/py/docs/overview.html). 
As your app gets more complex, it's a good idea to break your application logic up into [modules](https://shiny.rstudio.com/py/docs/workflow-modules.html).

_Dockerfile_

The Dockerfile for a Shiny for Python app is very minimal because the library doesn't have many system dependencies, but you may need to modify this file if your application has additional system dependencies. 
The one essential feature of this file is that it exposes and runs the app on the port specified in the space README file (which is 7860 by default).

__requirements.txt__

The Space will automatically install dependencies listed in the requirements.txt file. 
Note that you must include shiny in this file.

## Shiny for R

[Shiny for R](https://shiny.rstudio.com/) is a popular and well-established application framework in the R community and is a great choice if you want to host an R app on Hugging Face infrastructure or make use of some of the great [Shiny R extensions](https://github.com/nanxstats/awesome-shiny-extensions). 
To integrate Hugging Face tools into an R app, you can either use [httr2](https://httr2.r-lib.org/) to call Hugging Face APIs, or [reticulate](https://rstudio.github.io/reticulate/) to call one of the Hugging Face Python SDKs.

To deploy an R Shiny Space, click this button and fill out the space metadata. 
This will populate the Space with all the files you need to get started.

<a  href="https://huggingface.co/new-space?template=posit/shiny-for-r-template"> <img src="https://huggingface.co/datasets/huggingface/badges/resolve/main/deploy-to-spaces-lg.svg"/> </a>


_app.R_
This file contains all of your application logic. If you prefer, you can break this file up into `ui.R` and `server.R`.

_Dockerfile_

The Dockerfile builds off of the the [rocker shiny](https://hub.docker.com/r/rocker/shiny) image. You'll need to modify this file to use additional packages. 
If you are using a lot of tidyverse packages we recommend switching the base image to [rocker/shinyverse](https://hub.docker.com/r/rocker/shiny-verse).
You can install additional R packages by adding them under the `RUN install2.r` section of the dockerfile, and github packages can be installed by adding the repository under `RUN installGithub.r`.

There are two main requirements for this Dockerfile:

-   First, the file must expose the port that you have listed in the README. The default is 7860 and we recommend not changing this port unless you have a reason to.

-   Second, for the moment you must use the development version of [httpuv](https://github.com/rstudio/httpuv) which resolves an issue with app timeouts on Hugging Face.
