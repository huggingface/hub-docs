---
title: Repositories
---

<h1>Repositories</h1>


## What is a repository?

Models, Spaces, and datasets are hosted on the Hugging Face Hub as [Git repositories](https://git-scm.com/about), which means that version control and collaboration are core elements of the Hub. In a nutshell, a repository (also known as a **repo**) is a place where code and assets can be stored to back up your work, share it with the community, and work in a team. 

In this document, we will go over the basics of getting started with Git and interacting with repositories on the Hub. Once you get the hang of it, you can explore the best practices and next steps that we've compiled for effective repository usage.


## Getting started

### Requirements

If you do not have `git` available as a CLI command yet, you will need to [install Git](https://git-scm.com/downloads) for your platform. You will also need to [install Git LFS](https://git-lfs.github.com/), which will be used to handle large files such as images and model weights.

To be able to push your code to the Hub, you'll need to authenticate somehow. The easiest way to do this is by installing the [`huggingface_hub` CLI](https://huggingface.co/docs/huggingface_hub/index) and running the login command:

```bash
python -m pip install huggingface_hub
huggingface-cli login
```

The content in the **Getting Started** section of this document is also available as a video!

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/rkCly_cbMBk" title="Managing a repo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Creating a repository

Using the Hub's web interface you can easily create repositories, add files (even large ones!), explore models, visualize diffs, and much more. There are three kinds of repositories on the Hub, and in this guide we'll be creating a **model repository** for demonstration purposes. For information on creating and managing models, datasets, and Spaces, refer to their respective documentation.

1. To create a new repository, visit [huggingface.co/new](http://huggingface.co/new):

![/docs/assets/hub/new_repo.png](/docs/assets/hub/new_repo.png)

2. First, specify the owner of the repository: this can be either you or any of the organizations you’re affiliated with. 

3. Next, enter your model’s name. This will also be the name of the repository. Finally, you can specify whether you want your model to be public or private.

You can leave the *License* field blank for now. To learn about licenses, visit the **Licenses** (TODO: LINK TO LICENSES) section of this document.

After creating your model repository, you should see a page like this:

![/docs/assets/hub/empty_repo.png](/docs/assets/hub/empty_repo.png)

Note that the Hub prompts you to create a *Model Card*, which you can learn about in the **Model Cards documentation** (TODO: LINK). Including a Model Card in your model repo is best practice, but since we're only making a test repo at the moment we can skip this.


### Cloning repositories

Downloading repositories to your local machine is called *cloning*. You can use the following commands to load the repo that we made and navigate to it:
```bash
git clone https://huggingface.co/<your-username>/<your-model-id>
cd <your-model-id>
```

### Adding files to a repository

Now's the time, you can add any files you want to the repository! 🔥


Do you have files larger than 10MB? Those files should be tracked with `git-lfs`, which you can initialize with:

```bash
git lfs install
```

When you use Hugging Face to create a repository, we automatically provide a list of common file extensions for these files in the `.gitattributes` file, which `git-lfs` uses to efficiently track changes to your large files. However, you might need to add new extensions if your file types are not already handled. You can do so with `git lfs track "*.your_extension"`.


You can use Git to save new files and any changes to already existing files as a bundle of changes called a *commit*, which can be though of as a "revision" to your project. To create a commit, we have to `add` the files to let Git know that we're planning on saving the changes and then `commit` those changes. In order to sync the new commit with the Hugging Face Hub, we then `push` the commit to the Hub.

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


### Renaming or transferring a repo


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


## Best practices

### Private Repositories

You can choose a repository's visibility when you create it, and any repository that you own can have its visibility toggled between *public* and *private* in the **Settings** tab. Unless your repository is owned by an organization (more about that [**here!**](TODO)), you are the only user that can make changes to your repo or upload any code. Setting your visibility to *private* will:

 - Ensure your repo is not discoverable by other users by searching the Hub,
 - Other users who visit the URL of your private repo will receive a `404 - Repo not found` error. 
 - Other users will not be able to clone your repo.

### Security for repositories

`git` has an authentication layer to control who can push commits to a repo, but it does not authenticate the actual commit authors.

In other words, you can commit changes as `Elon Musk <elon@tesla.com>`, push them to your preferred `git` host (for instance github.com) and your commit will link to Elon's GitHub profile. (Try it! But don't blame us if Elon gets mad at you for impersonating him)

See this post by Ale Segala for more context: [How (and why) to sign `git` commits](https://withblue.ink/2020/05/17/how-and-why-to-sign-git-commits.html)

You can prove a commit was authored by you, using GNU Privacy Guard (GPG) and a key server. GPG is a cryptographic tool used to verify the authenticity of a message's origin. To learn about setting up signed commits verification with GPG, visit the [**Security**](TODO) section of our docs!

### Licenses

You are able to add a license to any repo that you create on the Hugging Face Hub to let other users know about the permissions that you want to attribute to your code. Likewise, remember to seek out and respect a project's license if you're considering using their code.

A [**full list of the available licenses**](TODO) is available in these docs.

## Next steps

A good place to visit if you want to continue learning about Git is [GitHub's "Using Git" tutorial](https://docs.github.com/en/get-started/using-git/about-git). These next sections highlight features and additional information that you may find useful to make the most out of the Git repositories on the Hugging Face Hub.

### How to use branches

To effectively use Git repos collaboratively and to work on features without releasing premature code you can use **branches**. Branches allow you to separate your "work in progress" code from your "production-ready" code, with the additional benefit of letting multiple people work on a project without frequently conflicting with each others' contributions. To learn about Git branching, you can try out the [Learn Git Branching interactive tutorial](https://learngitbranching.js.org/).

### Using tags

Git allows you to *tag* commits so that you can easily note milestones in your project. As such, you can use tags to mark commits in your Hub repos! To learn about using tags, you can visit [this DevConnected post](https://devconnected.com/how-to-create-git-tags/).

Beyond making it easy to identify important commits in your repo's history, using Git tags also allows you to [clone a repository at a specific tag](https://www.techiedelight.com/clone-specific-tag-with-git/). The `huggingface_hub` library also supports working with tags, such as [downloading files from a specific tagged commit](https://huggingface.co/docs/huggingface_hub/main/en/how-to-downstream#hfhuburl).

### How to duplicate/fork a repo (including LFS pointers)

A duplicate of a repository is called a *fork*. You may choose to fork one of your own repos, but it also common to fork other people's projects if you would like to tinker with them.

When you want to fork or [rebase](https://git-scm.com/docs/git-rebase) a repository with [LFS](https://git-lfs.github.com/) files you cannot use the usual Git approach that you might be familiar with since you need to be careful to not break the LFS pointers. Forking can take time depending on your bandwidth because you will have to fetch and re-upload all the LFS files in your fork.

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

4.a. If you want to completely override the fork history (which should only have an initial commit), run:

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

So far in these docs we've looked at using the Git CLI and the Hugging Face Hub to work with our repos, but Hugging Face also supports accessing repos with Python via the [`huggingface_hub` library](https://huggingface.co/docs/huggingface_hub/index). The operations that we've explored such as downloading repositories and uploading files are available through the library, as well as other useful functionality!