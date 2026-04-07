# GitHub Actions

You can use [GitHub Actions](https://docs.github.com/en/actions) to automatically sync your GitHub repository to the Hugging Face Hub. The official [`huggingface/hub-sync`](https://github.com/marketplace/actions/sync-github-to-hugging-face-hub) action supports syncing **Models**, **Datasets**, and **Spaces**.

## Setup

1. Create a Hugging Face [access token](https://huggingface.co/settings/tokens) with **write** permission to the target repo. For better security, use a [fine-grained token](https://huggingface.co/settings/tokens) scoped to only the repository you're syncing to.
2. Add the token as a [GitHub secret](https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-an-environment) called `HF_TOKEN` in your repository settings.
3. Add a workflow file (e.g. `.github/workflows/sync-to-hub.yml`) to your repository.

## Basic usage

```yaml
name: Sync to Hugging Face Hub
on:
  push:
    branches: [main]

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: huggingface/hub-sync@v0.1.0
        with:
          github_repo_id: ${{ github.repository }}
          huggingface_repo_id: username/repo-name
          hf_token: ${{ secrets.HF_TOKEN }}
```

By default, this syncs to a **Space**. To sync a model or dataset, set the `repo_type` parameter:

```yaml
      - uses: huggingface/hub-sync@v0.1.0
        with:
          github_repo_id: ${{ github.repository }}
          huggingface_repo_id: username/my-dataset
          hf_token: ${{ secrets.HF_TOKEN }}
          repo_type: dataset
```

## Parameters

| Parameter | Required | Default | Description |
|---|---|---|---|
| `github_repo_id` | Yes | — | GitHub repository (use `${{ github.repository }}`) |
| `huggingface_repo_id` | Yes | — | Target repo on the Hub (`username/repo-name`) |
| `hf_token` | Yes | — | Hugging Face access token |
| `repo_type` | No | `space` | `space`, `model`, or `dataset` |
| `space_sdk` | No | `gradio` | `gradio`, `streamlit`, `docker`, or `static` |
| `private` | No | `false` | Whether to create the repo as private |
| `subdirectory` | No | `.` | Sync a specific subdirectory (useful for monorepos) |

The action mirrors your files to the Hub using the `hf` CLI — it is not a git-to-git sync. It automatically excludes `.github/` and `.git/` directories and mirrors deletions (files removed from GitHub will be removed from the Hub).

For more complex workflows (e.g. build steps, custom upload logic), you can install and use the [`hf` CLI](https://huggingface.co/docs/huggingface_hub/en/guides/cli) directly in your workflow instead.

For Spaces-specific guidance (file size limits, LFS handling), see [Managing Spaces with GitHub Actions](./spaces-github-actions).
