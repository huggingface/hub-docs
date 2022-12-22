# Managing Spaces with Github Actions

You can keep your app in sync with your GitHub repository with **Github Actions**. Remember that for files larger than 10MB, Spaces requires Git-LFS. If you don't want to use Git-LFS, you may need to review your files and check your history. Use a tool like [BFG Repo-Cleaner](https://rtyley.github.io/bfg-repo-cleaner/) to remove any large files from your history. BFG Repo-Cleaner will keep a local copy of your repository as a backup.

First, you should set up your GitHub repository and Spaces app together. Add your Spaces app as an additional remote to your existing Git repository.

```bash
git remote add space https://huggingface.co/spaces/HF_USERNAME/SPACE_NAME
```

Then force push to sync everything for the first time:

```bash
git push --force space main
```

Next, set up a GitHub Action to push your main branch to Spaces. In the example below:

* Replace `HF_USERNAME` with your username and `SPACE_NAME` with your Space name. 
* Create a [Github secret](https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-an-environment) with your `HF_TOKEN`. You can find your Hugging Face API token under **API Tokens** on your Hugging Face profile.

```yaml
name: Sync to Hugging Face hub
on:
  push:
    branches: [main]

  # to run this workflow manually from the Actions tab
  workflow_dispatch:

jobs:
  sync-to-hub:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0
      - name: Push to hub
        env:
          HF_TOKEN: ${{ secrets.HF_TOKEN }}
        run: git push https://HF_USERNAME:$HF_TOKEN@huggingface.co/spaces/HF_USERNAME/SPACE_NAME main
```

Finally, create an Action that automatically checks the file size of any new pull request:


```yaml
name: Check file size
on:               # or directly `on: [push]` to run the action on every push on any branch
  pull_request:
    branches: [main]

  # to run this workflow manually from the Actions tab
  workflow_dispatch:

jobs:
  sync-to-hub:
    runs-on: ubuntu-latest
    steps:
      - name: Check large files
        uses: ActionsDesk/lfs-warning@v2.0
        with:
          filesizelimit: 10485760 # this is 10MB so we can sync to HF Spaces
```
