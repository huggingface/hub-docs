---
title: Spaces Advanced Usage
---

<h1>Spaces Advanced Usage</h1>

This section highlights some additional miscellaneous features that you can use to get the most out of Hugging Face Spaces.

## Using OpenCV in Spaces

In order to use OpenCV, you'll need to add it to both the `packages.txt` and `requirements.txt` files in your repository. If those files don't exist, you'll need to create them. For an example, [see this sample repository](https://huggingface.co/spaces/templates/gradio_opencv/tree/main).

## Using Spaces for Organization cards

Organization cards are a way to describe your organization to other users. They take the form of a `README.md` static file, inside a Space repo named `README`.

Please read more in the [dedicated doc section](TODO).

## Comparing different models

There is a Space that allows you to automatically create a Space to compare different Models and Spaces. Check the first example within [Model Comparator Space Builder](https://huggingface.co/spaces/farukozderim/Model-Comparator-Space-Builder) 🤗. 

## Duplicating a Space

The [Model Comparator Space Builder](https://huggingface.co/spaces/farukozderim/Model-Comparator-Space-Builder) also lets you duplicate Spaces, as shown in the second example.

## Creating a Space from a model

It is also possible to create a Space from a Model with [Model Comparator Space Builder](https://huggingface.co/spaces/farukozderim/Model-Comparator-Space-Builder) by providing a model name, as in the third example.

## Managing Spaces with Github Actions

Keep your app in sync with your Github repository with Github Actions. For files larger than 10MB, Spaces requires Git-LFS. If you don't want to use Git-LFS, you may need to review your files and check your history. Use a tool like [BFG Repo-Cleaner](https://rtyley.github.io/bfg-repo-cleaner/) to remove any large files from your history. BFG Repo-Cleaner will keep a local copy of your repository as a backup.

First, you should setup your GitHub repository and Spaces app together. Add your Spaces app as an additional remote to your existing Git repository.

```bash
git remote add space https://huggingface.co/spaces/FULL_SPACE_NAME
```

Then force push to sync everything for the first time:

```bash
git push --force space main
```

Next, setup a GitHub Action to push your main branch to Spaces. In the example below:

* Replace `HF_USERNAME` with your username and `FULL_SPACE_NAME` with your Space name. 
* Create a [Github secret](https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-an-environment) with your `HF_TOKEN`. You can find your Hugging Face API token under **API Tokens** on your Hugging Face profile.

```yaml
name: Sync to Hugging Face hub
on:
  push:
    branches: [main]

  # to run this workflow manually from the Actions tab
  workflow_dispatch:

jobs:
  sync-to-hub:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
        with:
          fetch-depth: 0
      - name: Push to hub
        env:
          HF_TOKEN: ${{ secrets.HF_TOKEN }}
        run: git push https://HF_USERNAME:$HF_TOKEN@huggingface.co/spaces/FULL_SPACE_NAME main
```

Finally, create an Action that automatically checks the file size of any new pull request:


```yaml
name: Check file size
on:               # or directly `on: [push]` to run the action on every push on any branch
  pull_request:
    branches: [main]

  # to run this workflow manually from the Actions tab
  workflow_dispatch:

jobs:
  sync-to-hub:
    runs-on: ubuntu-latest
    steps:
      - name: Check large files
        uses: ActionsDesk/lfs-warning@v2.0
        with:
          filesizelimit: 10485760 # this is 10MB so we can sync to HF Spaces
```