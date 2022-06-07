# Pull requests advanced usage

## Advanced: for Pull requests, where in the git repo are changes stored?

Our Pull requests do not use forks and branches, but instead custom "branches" called `refs` that are stored directly on the source repo.

[Git References](https://git-scm.com/book/en/v2/Git-Internals-Git-References) are the internal machinery of git which already stores tags and branches.

The advantage of using custom refs (like `refs/pr/42` for instance) instead of branches is that they're not fetched (by default) by people (including the repo "owner") cloning the repo, but they can still be fetched on demand.

## Advanced: how do I locally check out a Pull request then?

Let's assume your PR number is 42:

```bash
git fetch origin refs/pr/42:pr/42
git checkout pr/42
git push origin pr/42:refs/pr/42
```

## Even more advanced: for git magicians 🧙‍♀️

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
git co pr/:num
```

4. IF you make local changes, to push to the PR ref:

```bash
git push origin pr/42:refs/pr/42
```
