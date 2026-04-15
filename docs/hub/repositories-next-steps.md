# Next Steps

These next sections highlight features and additional information that you may find useful to make the most out of the Git repositories on the Hugging Face Hub.

## How to programmatically manage repositories

Hugging Face supports accessing repos with Python via the [`huggingface_hub` library](https://huggingface.co/docs/huggingface_hub/index). The operations that we've explored, such as downloading repositories and uploading files, are available through the library, as well as other useful functions!

If you prefer to use git directly, please read the sections below.

## Learning more about Git

A good place to visit if you want to continue learning about Git is [this Git tutorial](https://learngitbranching.js.org/). For even more background on Git, you can take a look at [GitHub's Git Guides](https://github.com/git-guides). 

## How to use branches

To effectively use Git repos collaboratively and to work on features without releasing premature code you can use **branches**. Branches allow you to separate your "work in progress" code from your "production-ready" code, with the additional benefit of letting multiple people work on a project without frequently conflicting with each others' contributions. You can use branches to isolate experiments in their own branch, and even [adopt team-wide practices for managing branches](https://ericmjl.github.io/essays-on-data-science/workflow/gitflow/).

To learn about Git branching, you can try out the [Learn Git Branching interactive tutorial](https://learngitbranching.js.org/).

## Using tags

Git allows you to *tag* commits so that you can easily note milestones in your project. As such, you can use tags to mark commits in your Hub repos! To learn about using tags, you can visit [this DevConnected post](https://devconnected.com/how-to-create-git-tags/).

Beyond making it easy to identify important commits in your repo's history, using Git tags also allows you to do A/B testing, [clone a repository at a specific tag](https://www.techiedelight.com/clone-specific-tag-with-git/), and more! The `huggingface_hub` library also supports working with tags, such as [downloading files from a specific tagged commit](https://huggingface.co/docs/huggingface_hub/main/en/how-to-downstream#hfhuburl).

## How to duplicate a repo

There are several ways to duplicate a repository, depending on whether you need to preserve the Git history.

### Duplicating from the Hub

Click the three dots at the top right of any repository page, then select **Duplicate this model**, **Duplicate this dataset**, or **Duplicate this Space**. This operation is nearly instant, thanks to the use of [Xet deduplication technology](./xet/deduplication). You will be able to choose:

* **Owner**: Your account or any organization in which you have write access.
* **Repository name**: The name of the duplicated repository. By default it keeps the same name as the source, under your namespace (e.g. duplicating `bigscience/bloom-560m` creates `your-username/bloom-560m`).
* **Visibility**: You can choose to make the duplicated repo public or private. Read more about private repositories [here](./repositories-settings#private-repositories).

For models and datasets, the Git history is squashed into a single commit. For Spaces, the full Git history is preserved. Public variables are copied over for Spaces, but secrets must be re-entered manually.

#### Restrictions

Some repositories cannot be duplicated:
- **Gated repositories** (models or datasets with access requests enabled).
- Repositories where the author has **disabled duplication**.
- **Cross-region duplication** is not supported (e.g. a repository stored in the US region cannot be duplicated to an EU organization).

### Duplicating programmatically

You can also duplicate repositories using the `huggingface_hub` library or CLI. These use the same server-side API as the Hub button above (Git history is squashed for models and datasets, preserved for Spaces).

Using Python:

```python
from huggingface_hub import duplicate_repo

duplicate_repo("bigscience/bloom-560m", private=False)
duplicate_repo("openai/gdpval", repo_type="dataset")
duplicate_repo("multimodalart/dreambooth-training", repo_type="space", private=False)
```

Or using the CLI:

```bash
hf repos duplicate bigscience/bloom-560m
hf repos duplicate openai/gdpval --type dataset
```

For Spaces, you will still need to configure your own settings (hardware, sleep time, storage, variables and secrets). Check out the [Manage your Space](https://huggingface.co/docs/huggingface_hub/guides/manage-spaces) guide for more details.

Alternatively, if you want to keep a local copy of the repo, you can use `hf download` followed by `hf upload` to a different namespace. This won't preserve the Git history either.

### Forking manually with Git

If you need to preserve Git history for models/datasets, or want more control over the process (e.g. rebasing on top of your own changes), you can fork a repository manually using Git.

You will need [`git-xet`](https://huggingface.co/docs/hub/xet/using-xet-storage#git) installed. Forking can take time depending on your bandwidth because you will have to fetch and re-upload all the LFS files (though the re-upload will be fast thanks to Xet).

1. Create a destination repository (e.g. `me/myfork`) on https://huggingface.co

2. Clone it and add the source repo as a remote:

```bash
git clone git@hf.co:me/myfork
cd myfork
git xet install
git remote add upstream git@hf.co:friend/upstream
git fetch upstream
git lfs fetch --all upstream
```

3. Replace the fork contents with the upstream history:

```bash
git reset --hard upstream/main
```

4. Push:

```bash
git push --force origin main
```
