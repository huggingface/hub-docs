---
title: Repositories
---

<h1>Repositories</h1>


## What is a repository?

Models, Spaces, and datasets are hosted on the Hugging Face Hub as [Git repositories](https://git-scm.com/about), which means that version control and collaboration are core elements of the Hub. In a nutshell, a repository (also known as a **"repo"**) is a place where code and assets can be stored to back up your work and to (optionally) share it with the community. There are specific sections in these docs detailing how **models, spaces, and datasets** can each be managed, but in this document we will go over the basics of getting started with Git and interacting with repositories on the Hub. Once you have the hang of it, you can explore the best practices and next steps that we've compiled for effective repository usage.


## Getting started

### Requirements

If you do not yet have `git` available as a CLI command, you will first need to [install Git for your platform](https://git-scm.com/downloads). You will also need to [install Git LFS](https://git-lfs.github.com/), which will be used to handle large files such as images and model weights.

We also recommend you create a [Hugging Face account](https://huggingface.co/join), which you'll be able to use to create and manage repositories on the Hub.


### Creating a repository

Using the Hub's web interface you can easily create repositories, add files (even large ones!), explore models, visualize diffs, and much more. There are three kinds of repositories on the Hub, and in this guide we'll be creating a **model repository**.

1. To create a new repository, visit [huggingface.co/new](http://huggingface.co/new):

![/docs/assets/hub/new_repo.png](/docs/assets/hub/new_repo.png)

2. First, specify the owner of the repository: this can be either you or any of the organizations you’re affiliated with. 

3. Next, enter your model’s name. This will also be the name of the repository. Finally, you can specify whether you want your model to be public or private.

You can leave the *License* field blank for now. To learn about licenses, visit the **Licenses** (TODO: LINK TO LICENSES) section of this document.

After creating your model repository, you should see a page like this:

![/docs/assets/hub/empty_repo.png](/docs/assets/hub/empty_repo.png)

Note that the Hub prompts you to create a *Model Card*, which you can learn about in the **Model Cards documentation**. Including a Model Card in your model repo is best practice, but since we're only making a test repo at the moment we can skip this.


### Cloning repositories

Downloading repositories to your local machine is called "cloning". You can use the following commands to load the repo and navigate to it:
```bash
git clone https://huggingface.co/<your-username>/<your-model-id>
cd <your-model-id>
```

Then, within the local repo, run the following to set up Git LFS:
```bash
git lfs install
```

### Adding files to a repository

Now's the time 🔥 You can add any files you want to the repository!

You can do this with the usual Git workflow:

```bash
# Create any files you like! Then...
git add .
git commit -m "First model version"  # You can choose any descriptive message
git push
```

And we're done! You can check your repository on Hugging Face with all the recently added files. For example, in the screenshot below the user added a number of files. Note that one of the files in this example has a size of `413.3 MB`, so the repo would use Git LFS to track it.

![/docs/assets/hub/repo_with_files.png](/docs/assets/hub/repo_with_files.png)

Every time you go through the `add`-`commit`-`push` cycle, the repo will keep track of every change you've made to your files. The UI allows you to explore the model files and commits and to see the difference (also known as *diff*) introduced by each commit:

![/docs/assets/hub/explore_history.gif](/docs/assets/hub/explore_history.gif)

### Cloning from a specific revision

### Syncing changes from the Hub

### Renaming or transferring a repo

### Delete repositories

### Dealing with large files

Do you have files larger than 10MB? Those files should be tracked with `git-lfs`. When you use Hugging Face to create a repository, we automatically provide a list of common file extensions for these sfiles in `.gitattributes`, which `git-lfs` uses to efficiently track changes to your large files. However, you might need to add new extensions if your file types are not already handled. You can do so with `git lfs track "*.your_extension"`.


## Best practices

### Private Repositories

### Security tips for repositories (GPG keys, etc.)

### Licenses

You are able to add a license to any repo that you create on the Hugging Face Hub to let other users know about the permissions that you want to attribute to your code. Likewise, remember to seek out and respect a project's license if you're considering using their code.

A **full list of the available licenses** is available in these docs.

## Next steps

This section collects additional information that you may find useful to make the most out of the features that the Git repositories on Hugging Face have to offer. You can continue learning about Git 

### How to use branches

https://learngitbranching.js.org/

### Using tags

### How to check history

### How to duplicate a repo

### How can I fork or rebase a repository with LFS pointers?

When you want to fork or [rebase](https://git-scm.com/docs/git-rebase) a repository with [LFS](https://git-lfs.github.com/) files you cannot use the usual Git approach since you need to be careful to not break the LFS pointers. Forking can take time depending on your bandwidth, because you will have to fetch an re-upload all the LFS files in your fork.

For example, say you have an upstream repository, **upstream**, and you just created your own repository on the Hub which is **myfork** in this example.

1. Create a destination repository (e.g. **myfork**) in https://huggingface.co 

2. Clone your fork repository

```
git lfs clone https://huggingface.co/me/myfork.git
```

3. Fetch non LFS files

```
cd myfork
git lfs install --skip-smudge --local # affects only this clone
git remote add upstream https://huggingface.co/friend/upstream.git
git fetch upstream
```

4. Fetch large files. This can take some time depending on your download bandwidth

```
git lfs fetch --all upstream # this can take time depending on your download bandwidth
```

4.a. If you want to override completely the fork history (which should only have an initial commit), run:

```
git reset --hard upstream/main
```

4.b. If you want to rebase instead of overriding, run the following command and solve any conflicts

```
git rebase upstream/main
```

5. Prepare your LFS files to push

```
git lfs install --force --local # this reinstalls the LFS hooks
huggingface-cli lfs-enable-largefiles . # needed if some files are bigger than 5Gb
```

6. And finally push

```
git push --force origin main # this can take time depending on your upload bandwidth
```

Now you have your own fork or rebased repo in the Hub!


### How to programmatically manage repositories

