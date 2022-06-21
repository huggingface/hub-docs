# Pull requests and Discussions

We just enabled **community contributions to repos**, a feature called 'Hub Pull requests and Discussions'. Pull requests and discussions work the same for all the repo types.

At a high level, the aim is to build a simpler version of other git hosts' (like GitHub's) PRs and Issues:
- no forks are involved: contributors push to a special `ref` branch directly on the source repo.
- there's no hard distinction between discussions and PRs: they are essentially the same so they are displayed in the same lists.
- they are streamlined for ML (i.e. models/datasets/spaces repos), not arbitrary repos.

## List

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/discussions-list.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/discussions-list-dark.png"/>
</div>

## View

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/discussions-view.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/discussions-view-dark.png"/>
</div>

## Editing a disucssion / pull request title

If you opened a PR or discussion, or are the author of the repository, you can edit the discussion title by clicking on the pencil button.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/discussions-edit-title.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/discussions-edit-title-dark.png"/>
</div>


## Comment edition and moderation

If you wrote a comment or are the author of the repository, You can edit the content of the comment from the contextual menu in the top-right corner of the comment box.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/discussions-comment-menu.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/discussions-comment-menu-dark.png"/>
</div>

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/discussions-comment-menu-edit.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/discussions-comment-menu-edit-dark.png"/>
</div>

You can also hide that comment. Hiding a comment is irreversible, and nobody will be able to see its content nor edit it anymore.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/discussions-comment-hidden.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/discussions-comment-hidden-dark.png"/>
</div>



## How do I manage Pull requests locally?

Let's assume your PR number is 42. 

```bash
git fetch origin refs/pr/42:pr/42
git checkout pr/42
# Do your changes
git add .
git commit -m "Add your change"
git push origin pr/42:refs/pr/42
```

## Programmatic access

Coming soon in https://github.com/huggingface/huggingface_hub 🔥🔥

# Pull requests advanced usage

## Where in the git repo are changes stored?

Our Pull requests do not use forks and branches, but instead custom "branches" called `refs` that are stored directly on the source repo.

[Git References](https://git-scm.com/book/en/v2/Git-Internals-Git-References) are the internal machinery of git which already stores tags and branches.

The advantage of using custom refs (like `refs/pr/42` for instance) instead of branches is that they're not fetched (by default) by people (including the repo "owner") cloning the repo, but they can still be fetched on demand.


## Fetching all Pull requests: for git magicians 🧙‍♀️

You can tweak your local **refspec** to fetch all Pull requests:

1. Add this refspec to your .git/config:

```bash
[remote "origin"]
	fetch = +refs/pr/*:refs/remotes/origin/pr/*
```

2. Fetch

```bash
git fetch
```

3. create a local branch tracking the ref

```bash
git checkout pr/:num
```

4. IF you make local changes, to push to the PR ref:

```bash
git push origin pr/42:refs/pr/42
```


