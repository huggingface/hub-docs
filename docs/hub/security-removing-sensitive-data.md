# Removing Sensitive Data from a Repository

> [!NOTE]
> This page only applies to git-backed repositories (models, datasets, and Spaces). It does not apply to [Storage Buckets](./storage-buckets), which aren't git-backed.

If you committed a secret, private data, or any file you don't want on the Hub, deleting it in a new commit is not enough: older commits still contain it, and URLs such as `/resolve/<old_sha>/<path>`, `/blob/<old_sha>/<path>` or `/commit/<old_sha>` keep serving it. To fully remove a file, remove it from every ref that can reach it: branches, tags, and pull requests.

> [!WARNING]
> If the file contains a secret (token, API key, password), revoke or rotate it first and treat it as compromised: copies cached by the CDN or downloaded by users may outlive its removal. For Hugging Face tokens, see [Revoking a leaked token](./security-tokens#revoking-a-leaked-token).

## Overview

| Action | Removes | Leaves |
|---|---|---|
| Delete the file in a new commit | The file from the latest revision | All previous commits |
| [List Large Files](#lfs-and-xet-files) → delete with "rewrite history" | The file content (immediately), and its pointer from all branches, tags and PR refs | Old commits with the file's path, sha256 and size |
| [`git filter-repo`](#regular-git-files) + force-push | The file from every branch and tag you push | Refs you don't push, history pinned by pull requests |
| [`super_squash_history`](#regular-git-files) | The history of one branch | Other branches, tags, history pinned by pull requests |
| [Delete a PR ref](#pull-requests) | The PR ref | The PR's commits, archived for the PR page, including the file |

Old commits stay reachable by their SHA (in the web UI, the API, and with `git fetch <sha>`) until they're cleaned up. That's usually within the hour after a force-push or squash, but isn't guaranteed after deleting a large file with "rewrite history", and never happens for history pinned by a pull request. Deleted content may take up to 30 days to be fully purged from storage.

All of these operations are irreversible and change commit SHAs, so collaborators need to re-clone the repository.

## Recommended order

1. Revoke or rotate any leaked secret.
2. Remove [LFS and Xet files](#lfs-and-xet-files) with "rewrite history".
3. Remove [regular git files](#regular-git-files) from every branch and tag.
4. For regular git files, check for [pull requests](#pull-requests) opened after the file was committed.
5. Clean up [duplicated repositories](#duplicated-repositories) you own.
6. [Contact us](#when-to-contact-us) if needed.

## LFS and Xet files

If the file appears in your repository's "List Large Files" (this includes Xet-backed files):

1. Go to your repository's Settings page.
2. Click on "List Large Files" in the "Storage" section.
3. Delete the file, keeping "rewrite history" checked (the default).

This deletes the file content immediately and strips its pointer from every branch, tag and PR ref. This changes the SHA of the first commit containing the file and all its descendants, and drops commits left empty (e.g. one that only added the file). See [Storage Limits](./storage-limits#deleting-individual-lfs-files) for more details.

## Regular git files

**Option 1: rewrite history with [`git filter-repo`](https://github.com/newren/git-filter-repo)** and force-push every branch and tag that contains the file. Force-pushing is allowed for users with write access.

```bash
git clone https://huggingface.co/<namespace>/<repo>  # use /datasets/ or /spaces/ for those repo types
cd <repo>
git filter-repo --invert-paths --path path/to/file
git remote add origin https://huggingface.co/<namespace>/<repo>  # filter-repo removes the remote
git push --force --all origin
git push --force --tags origin
```

**Option 2: delete the file and squash the history** with [`super_squash_history`](https://huggingface.co/docs/huggingface_hub/main/en/package_reference/hf_api#huggingface_hub.HfApi.super_squash_history). Each call squashes a single branch into one commit, so repeat it for every affected branch and delete the branches and tags you don't need.

```python
from huggingface_hub import HfApi

api = HfApi()
api.delete_file("path/to/file", repo_id="<namespace>/<repo>")
api.super_squash_history(repo_id="<namespace>/<repo>", branch="main")
api.delete_tag(repo_id="<namespace>/<repo>", tag="v1.0")
```

## Pull requests

This only applies to regular git files: deleting a large file with "rewrite history" already rewrites pull requests.

Any pull request opened after the file was committed keeps that history reachable by SHA, even once you rewrite or squash `main`, and even if the PR was merged or closed. [Deleting the PR ref](./storage-limits#deleting-pull-request-refs) yourself doesn't remove that history, so [contact us](#when-to-contact-us).

## Duplicated repositories

[Duplicated repositories](./repositories-next-steps#how-to-duplicate-a-repo) are independent, so clean up the ones you own the same way. Model and dataset duplicates only contain the files of `main` at the time of duplication (as a single commit), while Space duplicates keep `main`'s full history. Other branches and tags are not copied.

## When to contact us

Email privacy@huggingface.co for personal data, or website@huggingface.co for leaked secrets and anything else, if:
- the file is a regular git file and any pull request was opened after it was committed
- you need old commit URLs guaranteed to return 404
- you need cached downloads invalidated
- you need derived copies reset, such as Data Studio Parquet conversions (`refs/convert/*`) or Space builds
