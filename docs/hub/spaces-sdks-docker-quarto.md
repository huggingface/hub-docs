# Quarto on Spaces

[Quarto](https://quarto.org/) is a powerful tool for creating reproducible scientific and technical documents.
With Quarto, you can interleave markdown and code chunks to generate pdfs, websites, presentations, and more.

### Getting Started with Quarto on Spaces

1. Create the Quarto space, and clone it locally

<a  href="https://huggingface.co/new-space?template=posit/quarto-template"> <img src="https://huggingface.co/datasets/huggingface/badges/raw/main/deploy-to-spaces-lg.svg"/> </a>

2. **Install Quarto**: In order to render your Quarto site without Docker, we recommend installing Quarto by following the instructions on the [official Quarto website](https://quarto.org/docs/get-started/).

3. **Install Quarto VS Code extension** the [Quarto VS Code Extention](https://quarto.org/docs/tools/vscode.html) includes a number of productivity tools, including YAML Autocomplete, a preview button, and a visual editor. Quarto works great with VS Code, but the extension does make it easier to get the most out of Quarto.

4. **Edit the site** The website files are contained in the `src` directory, and the site navigation is defined in `src/_quarto.yml`, try editing these files and either clicking the "Preview" button in VS Code or calling `quarto preview src` from the command line.

5. **Learn more about Quarto** You can do a lot of things with Quarto, and they are all documented on the [Quarto Website](https://quarto.org/guide/). In particular, you may be interested in:

   - All about building [websites](https://quarto.org/docs/websites/)
   - Building Static [Dashboards](https://quarto.org/docs/dashboards/)
   - How to write [books](https://quarto.org/docs/books/index.html) and [manuscripts](https://quarto.org/docs/manuscripts/)
   - Reproducible [presentations](https://quarto.org/docs/manuscripts/)
   - Including [Observable](https://quarto.org/docs/interactive/ojs/) or [Shiny](https://quarto.org/docs/interactive/shiny/) applications in your Quarto site
