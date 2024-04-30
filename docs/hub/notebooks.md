# Jupyter Notebooks on the Hugging Face Hub

[Jupyter notebooks](https://jupyter.org/) are a very popular format for sharing code and data analysis for machine learning and data science. They are interactive documents that can contain code, visualizations, and text.

## Rendering Jupyter notebooks on the Hub

Under the hood, Jupyter Notebook files (usually shared with a `.ipynb` extension) are JSON files. While viewing these files directly is possible, it's not a format intended to be read by humans. The Hub has rendering support for notebooks hosted on the Hub. This means that notebooks are displayed in a human-readable format.

![Before and after notebook rendering](https://huggingface.co/blog/assets/135_notebooks-hub/before_after_notebook_rendering.png)

Notebooks will be rendered when included in any type of repository on the Hub. This includes models, datasets, and Spaces.

## Launch in Google Colab

[Google Colab](https://colab.google/) is a free Jupyter Notebook environment that requires no setup and runs entirely in the cloud. It's a great way to run Jupyter Notebooks without having to install anything on your local machine. Notebooks hosted on the Hub are automatically given a launch in [Google Colab](https://colab.research.google.com/) button. This allows you to open the notebook in Colab with a single click.