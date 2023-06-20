# Pull requests and Discussions

Hub Pull requests and Discussions allow users to do community contributions to repositories. Pull requests and discussions work the same for all the repo types.

At a high level, the aim is to build a simpler version of other git hosts' (like GitHub's) PRs and Issues:
- no forks are involved: contributors push to a special `ref` branch directly on the source repo.
- there's no hard distinction between discussions and PRs: they are essentially the same so they are displayed in the same lists.
- they are streamlined for ML (i.e. models/datasets/spaces repos), not arbitrary repos.

_Note, Pull Requests and discussions can be enabled or disabled from the [repository settings](./repositories-settings#disabling-discussions-pull-requests)_

## List

By going to the community tab in any repository, you can see all Discussions and Pull requests. You can also filter to only see the ones that are open.


<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/discussions-list.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/discussions-list-dark.png"/>
</div>

## View

The Discussion page allows you to see the comments from different users. If it's a Pull Request, you can see all the changes by going to the Files changed tab.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/discussions-view.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/discussions-view-dark.png"/>
</div>

## Editing a Discussion / Pull request title

If you opened a PR or discussion, are the author of the repository, or have write access to it, you can edit the discussion title by clicking on the pencil button.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/discussions-edit-title.PNG"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/discussions-edit-title-dark.PNG"/>
</div>

## Pin a Discussion / Pull Request

If you have write access to a repository, you can pin discussions and Pull Requests. Pinned discussions appear at the top of all the discussions.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/discussions-pin.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/discussions-pin-dark.png"/>
</div>

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/discussions-pinned.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/discussions-pinned-dark.png"/>
</div>

## Lock a Discussion / Pull Request

If you have write access to a repository, you can lock discussions or Pull Requests. Once a discussion is locked, previous comments are still visible and users won't be able to add new comments.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/discussions-lock.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/discussions-lock-dark.png"/>
</div>

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/discussions-locked.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/discussions-locked-dark.png"/>
</div>

## Comment edition and moderation

If you wrote a comment or have write access to the repository, you can edit the content of the comment from the contextual menu in the top-right corner of the comment box.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/discussions-comment-menu.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/discussions-comment-menu-dark.png"/>
</div>

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/discussions-comment-menu-edit.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/discussions-comment-menu-edit-dark.png"/>
</div>

Once the comment has been edited, a new link will appear above the comment. This link shows the edit history. 

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/discussions-comment-edit-link.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/discussions-comment-edit-link-dark.png"/>
</div>

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/discussions-comment-edit-history.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/discussions-comment-edit-history-dark.png"/>
</div>

You can also hide a comment. Hiding a comment is irreversible, and nobody will be able to see its content nor edit it anymore.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/discussions-comment-hidden.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/discussions-comment-hidden-dark.png"/>
</div>

Read also [moderation](./moderation) to see how to report an abusive comment.



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

### Draft mode

Draft mode is the default status when opening a new Pull request from scratch in "Advanced mode". With this status, other contributors know that your Pull request is under work and it cannot be merged. When your branch is ready, just hit the "Publish" button to change the status of the Pull request to "Open". Note that once published you cannot go back to draft mode. 

## Pull requests advanced usage

### Where in the git repo are changes stored?

Our Pull requests do not use forks and branches, but instead custom "branches" called `refs` that are stored directly on the source repo.

[Git References](https://git-scm.com/book/en/v2/Git-Internals-Git-References) are the internal machinery of git which already stores tags and branches.

The advantage of using custom refs (like `refs/pr/42` for instance) instead of branches is that they're not fetched (by default) by people (including the repo "owner") cloning the repo, but they can still be fetched on demand.


### Fetching all Pull requests: for git magicians 🧙‍♀️

You can tweak your local **refspec** to fetch all Pull requests:

1. Fetch

```bash
git fetch origin refs/pr/*:refs/remotes/origin/pr/*
```

2. create a local branch tracking the ref

```bash
git checkout pr/{PR_NUMBER}
# for example: git checkout pr/42
```

3. IF you make local changes, to push to the PR ref:

```bash
git push origin pr/{PR_NUMBER}:refs/pr/{PR_NUMBER}
# for example: git push origin pr/42:refs/pr/42
```


