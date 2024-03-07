# Quarto on Spaces

[Quarto](https://quarto.org/) is a powerful tool for creating reproducible scientific and technical documents.
With Quarto, you can interleave markdown and code chunks to generate pdfs, websites, presentations, and more.

## Getting Started with Quarto on Spaces

### Edit the site on Hugging Face

1. Create the Quarto space

Quarto spaces have very minimal compute requirements, so a small CPU space will be sufficient for most sites. You can create a space by clicking this button:

<a  href="https://huggingface.co/new-space?template=posit/quarto-template"> <img src="https://huggingface.co/datasets/huggingface/badges/raw/main/deploy-to-spaces-lg.svg"/> </a>

2. Edit in the browser

You can make changes to the quarto site directly in Hugging Face.
There are three main types of files which you will need to edit in order to make changes:

- The `src/_quarto.yml` file contains the site navigation, and is the best place to start if you want to change the structure of the site.
- The notebook and `.qmd` files in the `src` directory contain the actual content of the web pages.
- The `Dockerfile` contains the instructions for building the site. For example, if you want to change the version of Quarto which the site uses, you should update the Dockerfile.

3. Commit your changes and build the site

### Local development

Editing the site on Hugging Face is a convenient way to make small changes, but most of the time you will want to develop and preview the site locally before deploying.
This will allow you to view your changes more quickly, and to use the full power of the Quarto development environment.

1. Create the Quarto space as above

2. Clone the Repo

To clone the space locally run the following command, making sure to replace `<YOUR_HF_USER>` with your Hugging Face username and `quarto-template` with the name you chose for your space.

```
git clone https://huggingface.co/spaces/<YOUR_HF_USER>/quarto-template
```

3. Install Quarto

In order to render your Quarto site without Docker, we recommend installing Quarto by following the instructions on the [official Quarto website](https://quarto.org/docs/get-started/).

3. Install Quarto VS Code extension

The [Quarto VS Code Extention](https://quarto.org/docs/tools/vscode.html) includes a number of productivity tools, including YAML Autocomplete, a preview button, and a visual editor. Quarto works great without VS Code, but the extension does make it easier to get the most out of Quarto.

4. Edit the site
   The website files are contained in the `src` directory, and the site navigation is defined in `src/_quarto.yml`, try editing these files and either clicking the "Preview" button in VS Code or calling `quarto preview src` from the command line.

5. Commit your changes and push
   Your site will rebuild whenever you push new commits to the `main` branch of your space repository.

### Learn about Quarto

You can do a lot of things with Quarto, and they are all documented on the [Quarto Website](https://quarto.org/guide/). In particular, you may be interested in:

- All about building [websites](https://quarto.org/docs/websites/)
- Building Static [Dashboards](https://quarto.org/docs/dashboards/)
- How to write [books](https://quarto.org/docs/books/index.html) and [manuscripts](https://quarto.org/docs/manuscripts/)
- Reproducible [presentations](https://quarto.org/docs/manuscripts/)
- Including [Observable](https://quarto.org/docs/interactive/ojs/) or [Shiny](https://quarto.org/docs/interactive/shiny/) applications in your Quarto site
