# Removing Sensitive Data from a Repository

If you committed a secret, private data, or any file you don't want on the Hub, deleting it in a new commit is not enough: older commits still contain it, and URLs such as `/resolve/<old_sha>/<path>`, `/blob/<old_sha>/<path>` or `/commit/<old_sha>` keep serving it. To fully remove a file, remove it from every ref that can reach it: branches, tags, and pull requests.

> [!WARNING]
> If the file contains a secret (token, API key, password), revoke or rotate it first and treat it as compromised. Anyone who already cloned or downloaded the file keeps their copy. For Hugging Face tokens, see [Revoking a leaked token](./security-tokens#revoking-a-leaked-token).

## Overview

| Action | Removes | Leaves |
|---|---|---|
| Delete the file in a new commit | The file from the latest revision | All previous commits |
| [List LFS files](#lfs-and-xet-files) → delete with "rewrite history" | LFS/Xet file content, and its pointer from all branches, tags and PR refs | File path, sha256 and size at old commit URLs until they are cleaned up |
| [`git filter-repo`](#regular-git-files) + force-push | The file from every branch and tag you push | Refs you don't push, PR refs |
| [`super_squash_history`](#regular-git-files) | The history of one branch | Other branches, tags, PR refs |
| [Delete a PR ref](#pull-requests) | The PR's commits from the repository | An archived copy so the PR diff stays viewable |

Once old commits are no longer reachable from any ref, the Hub cleans them up: LFS and Xet files within minutes, regular git objects later. Until then, old commit URLs may keep working, and public regular git files may also be served from a CDN cache for some time.

All of these operations are irreversible and change commit SHAs, so collaborators need to re-clone the repository.

## Recommended order

1. Revoke or rotate any leaked secret.
2. Remove [LFS and Xet files](#lfs-and-xet-files) with "rewrite history".
3. Remove [regular git files](#regular-git-files) from every branch and tag.
4. Close [pull requests](#pull-requests) that contain the file and delete their refs.
5. Clean up [duplicated repositories](#duplicated-repositories) you own.
6. [Contact us](#when-to-contact-us) if needed.

## LFS and Xet files

If the file appears in your repository's "List LFS files" (this includes Xet-backed files):

1. Go to your repository's Settings page.
2. Click on "List LFS files" in the "Storage" section.
3. Delete the file, keeping "rewrite history" checked (the default).

This strips the file's pointer from every branch, tag and PR ref, which changes the SHA of every commit after the first one containing the file, and deletes the stored file. See [Storage Limits](./storage-limits#deleting-individual-lfs-files) for more details.

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

Any pull request opened after the file was committed keeps that commit reachable, even once you rewrite or squash `main`, and even if the PR was merged. Close the PR and [delete its ref](./storage-limits#deleting-pull-request-refs).

The Hub keeps an archived copy of deleted PR refs so the PR diff stays viewable. If the file was ever in a pull request, [contact us](#when-to-contact-us) to have it fully removed.

## Duplicated repositories

[Duplicated repositories](./repositories-next-steps#how-to-duplicate-a-repo) are independent, so clean up the ones you own the same way. Space duplicates keep the full history, while model and dataset duplicates only contain the files of the revision they were duplicated from.

## When to contact us

Email website@huggingface.co if:
- the file was ever in a pull request
- you need old commit URLs guaranteed to return 404
- you need cached downloads invalidated
- you need derived copies reset, such as Data Studio Parquet conversions (`refs/convert/*`) or Space builds
