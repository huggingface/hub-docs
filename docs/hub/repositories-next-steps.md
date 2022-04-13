---
title: Next Steps
---

<h1>Next steps</h1>

These next sections highlight features and additional information that you may find useful to make the most out of the Git repositories on the Hugging Face Hub.

## Learning more about Git

A good place to visit if you want to continue learning about Git is [this Git tutorial](https://learngitbranching.js.org/). For even more background on Git, you can take a look at [GitHub's Git Guides](https://github.com/git-guides). 

## How to use branches

To effectively use Git repos collaboratively and to work on features without releasing premature code you can use **branches**. Branches allow you to separate your "work in progress" code from your "production-ready" code, with the additional benefit of letting multiple people work on a project without frequently conflicting with each others' contributions. You can use branches to isolate experiments in their own branch, and even [adopt team-wide practices for managing branches](https://ericmjl.github.io/essays-on-data-science/workflow/gitflow/).

To learn about Git branching, you can try out the [Learn Git Branching interactive tutorial](https://learngitbranching.js.org/).

## Using tags

Git allows you to *tag* commits so that you can easily note milestones in your project. As such, you can use tags to mark commits in your Hub repos! To learn about using tags, you can visit [this DevConnected post](https://devconnected.com/how-to-create-git-tags/).

Beyond making it easy to identify important commits in your repo's history, using Git tags also allows you to [clone a repository at a specific tag](https://www.techiedelight.com/clone-specific-tag-with-git/). The `huggingface_hub` library also supports working with tags, such as [downloading files from a specific tagged commit](https://huggingface.co/docs/huggingface_hub/main/en/how-to-downstream#hfhuburl).

## How to duplicate or fork a repo (including LFS pointers)

If you'd like to copy a repository, depending on whether you want to preserve the Git history there are two options.

### Duplicating without Git history

In many scenarios, if you want your own copy of a particular codebase you might not be concerned about the previous Git history. In this case, you can quickly duplicate a repo with the handy [Repo Duplicator](https://huggingface.co/spaces/osanseviero/repo_duplicator)! You'll have to create a User Access Token, which you can read more about in the [security documentation](TODO).

### Duplicating with the Git history (Fork)

A duplicate of a repository with the commit history preserved is called a *fork*. You may choose to fork one of your own repos, but it also common to fork other people's projects if you would like to tinker with them.

**Note that you will need to [install Git LFS](https://git-lfs.github.com/) and the [`huggingface_hub` CLI](https://huggingface.co/docs/huggingface_hub/index) to follow this process**. When you want to fork or [rebase](https://git-scm.com/docs/git-rebase) a repository with LFS files you cannot use the usual Git approach that you might be familiar with since you need to be careful to not break the LFS pointers. Forking can take time depending on your bandwidth because you will have to fetch and re-upload all the LFS files in your fork.

For example, say you have an upstream repository, **upstream**, and you just created your own repository on the Hub which is **myfork** in this example.

1. Create a destination repository (e.g. **myfork**) in https://huggingface.co 

2. Clone your fork repository:

```
git lfs clone https://huggingface.co/me/myfork.git
```

3. Fetch non LFS files:

```
cd myfork
git lfs install --skip-smudge --local # affects only this clone
git remote add upstream https://huggingface.co/friend/upstream.git
git fetch upstream
```

4. Fetch large files. This can take some time depending on your download bandwidth:

```
git lfs fetch --all upstream # this can take time depending on your download bandwidth
```

4.a. If you want to completely override the fork history (which should only have an initial commit), run:

```
git reset --hard upstream/main
```

4.b. If you want to rebase instead of overriding, run the following command and resolve any conflicts:

```
git rebase upstream/main
```

5. Prepare your LFS files to push:

```
git lfs install --force --local # this reinstalls the LFS hooks
huggingface-cli lfs-enable-largefiles . # needed if some files are bigger than 5Gb
```

6. And finally push:

```
git push --force origin main # this can take time depending on your upload bandwidth
```

Now you have your own fork or rebased repo in the Hub!


## How to programmatically manage repositories

So far, we've looked at using the Git CLI and the Hugging Face Hub to work with our repos. But Hugging Face also supports accessing repos with Python via the [`huggingface_hub` library](https://huggingface.co/docs/huggingface_hub/index). The operations that we've explored such as downloading repositories and uploading files are available through the library, as well as other useful functions!