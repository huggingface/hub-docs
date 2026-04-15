# Managing Spaces with Github Actions

You can keep your Space in sync with your GitHub repository using the official [`huggingface/hub-sync`](https://github.com/marketplace/actions/sync-github-to-hugging-face-hub) GitHub Action.

<Tip>

`hub-sync` also works for Models and Datasets. See [GitHub Actions](./repositories-github-actions) for general usage.

</Tip>

## Setup

1. Create a [GitHub secret](https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-an-environment) called `HF_TOKEN` with a Hugging Face [access token](https://huggingface.co/settings/tokens).
2. Add a workflow file (e.g. `.github/workflows/sync-to-hub.yml`) to your repository:

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
          huggingface_repo_id: username/my-space
          hf_token: ${{ secrets.HF_TOKEN }}
```

You can configure the Space SDK with `space_sdk` (defaults to `gradio`). See [all parameters](./repositories-github-actions#parameters).

## How it works

The action mirrors your files to the Hub using the `hf` CLI (`hf repo create` + `hf upload`). It is not a git-to-git sync — it uploads the file contents and automatically excludes `.github/` and `.git/` directories. Files removed from your GitHub repository will also be removed from the Hub.

For more complex workflows (e.g. build steps, custom logic), you can install and use the [`hf` CLI](https://huggingface.co/docs/huggingface_hub/en/guides/cli) directly in your workflow instead.

## File size considerations

For files larger than 10MB, Spaces requires [Git-LFS](./repositories-getting-started#terminal). Make sure large files in your GitHub repository are tracked with LFS before syncing.

## Alternative: manual git push

If you prefer a direct git-to-git sync instead of file mirroring, you can push to your Space's git remote directly:

```yaml
name: Sync to Hugging Face hub
on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  sync-to-hub:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0
          lfs: true
      - name: Push to hub
        env:
          HF_TOKEN: ${{ secrets.HF_TOKEN }}
        run: git push https://HF_USERNAME:$HF_TOKEN@huggingface.co/spaces/HF_USERNAME/SPACE_NAME main
```

Replace `HF_USERNAME` with your username and `SPACE_NAME` with your Space name.
