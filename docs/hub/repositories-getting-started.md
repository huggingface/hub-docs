---
title: Getting Started with Repositories
---

<h1>Getting Started with Repositories</h1>

This beginner-friendly guide will help you get the basic skills you need to create and manage your repository on the Hub. Each section builds on the previous one, so feel free to choose where to start!

## Requirements

If you do not have `git` available as a CLI command yet, you will need to [install Git](https://git-scm.com/downloads) for your platform. You will also need to [install Git LFS](https://git-lfs.github.com/), which will be used to handle large files such as images and model weights.

To be able to push your code to the Hub, you'll need to authenticate somehow. The easiest way to do this is by installing the [`huggingface_hub` CLI](https://huggingface.co/docs/huggingface_hub/index) and running the login command:

```bash
python -m pip install huggingface_hub
huggingface-cli login
```

The content in the **Getting Started** section of this document is also available as a video!

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/rkCly_cbMBk" title="Managing a repo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Creating a repository

Using the Hub's web interface you can easily create repositories, add files (even large ones!), explore models, visualize diffs, and much more. There are three kinds of repositories on the Hub, and in this guide we'll be creating a **model repository** for demonstration purposes. For information on creating and managing models, datasets, and Spaces, refer to their respective documentation.

1. To create a new repository, visit [huggingface.co/new](http://huggingface.co/new):

![/docs/assets/hub/new_repo.png](/docs/assets/hub/new_repo.png)

2. First, specify the owner of the repository: this can be either you or any of the organizations you’re affiliated with. 

3. Next, enter your model’s name. This will also be the name of the repository. Finally, you can specify whether you want your model to be public or private.

You can leave the *License* field blank for now. To learn about licenses, visit the **Licenses** (TODO: LINK TO LICENSES) section of this document.

After creating your model repository, you should see a page like this:

![/docs/assets/hub/empty_repo.png](/docs/assets/hub/empty_repo.png)

Note that the Hub prompts you to create a *Model Card*, which you can learn about in the **Model Cards documentation** (TODO: LINK). Including a Model Card in your model repo is best practice, but since we're only making a test repo at the moment we can skip this.


## Cloning repositories

Downloading repositories to your local machine is called *cloning*. You can use the following commands to load the repo that we made and navigate to it:
```bash
git clone https://huggingface.co/<your-username>/<your-model-id>
cd <your-model-id>
```

## Adding files to a repository

Now's the time, you can add any files you want to the repository! 🔥


Do you have files larger than 10MB? Those files should be tracked with `git-lfs`, which you can initialize with:

```bash
git lfs install
```

Note that if your files are larger than **5GB** you'll also need to run:

```bash
huggingface-cli lfs-enable-largefiles
```

When you use Hugging Face to create a repository, we automatically provide a list of common file extensions for these files in the `.gitattributes` file, which `git-lfs` uses to efficiently track changes to your large files. However, you might need to add new extensions if your file types are not already handled. You can do so with `git lfs track "*.your_extension"`.


You can use Git to save new files and any changes to already existing files as a bundle of changes called a *commit*, which can be thought of as a "revision" to your project. To create a commit, we have to `add` the files to let Git know that we're planning on saving the changes and then `commit` those changes. In order to sync the new commit with the Hugging Face Hub, we then `push` the commit to the Hub.

```bash
# Create any files you like! Then...
git add .
git commit -m "First model version"  # You can choose any descriptive message
git push
```

And we're done! You can check your repository on Hugging Face with all the recently added files. For example, in the screenshot below the user added a number of files. Note that one of the files in this example has a size of `413 MB`, so the repo uses Git LFS to track it.

![/docs/assets/hub/repo_with_files.png](/docs/assets/hub/repo_with_files.png)


## Viewing a repo's history
Every time you go through the `add`-`commit`-`push` cycle, the repo will keep track of every change you've made to your files. The UI allows you to explore the model files and commits and to see the difference (also known as *diff*) introduced by each commit. To see the history, you can click on the **History: X commits** link.

![/docs/assets/hub/repo_history.png](/docs/assets/hub/repo_history.png)

You can click on an individual commit to see what changes that commit introduced:

![/docs/assets/hub/explore_history.gif](/docs/assets/hub/explore_history.gif)


## Renaming or transferring a repo


If you own a repository, you will be able to visit the **Settings** tab to manage the name and ownership. Note that there are certain limitations in terms of use cases.

Moving can be used in these use cases ✅ 
- Renaming a repository within same user.
- Renaming a repository within same organization. The user must be part of the organization and have "write" or "admin" rights in the organization.
- Transferring repository from user to an organization. The user must be part of the organization and have "write" or "admin" rights in the organization.
- Transferring a repository from an organization to yourself. You must be part of the organization, and have "admin" rights in the organization.
- Transferring a repository from a source organization to another target organization. The user must have "admin" rights in the source organization **and** either "write" or "admin" rights in the target organization. 

Moving does not work for ❌
- Transferring a repository from an organization to another user who is not yourself.
- Transferring a repository from a source organization to another target organization if the user does not have both "admin" rights in the source organization **and** either "write" or "admin" rights in the target organization.
- Transferring a repository from user A to user B.

If these are use cases you need help with, please send us an email at **website at huggingface.co**.
