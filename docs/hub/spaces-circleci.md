# Managing Spaces with CircleCI Workflows

You can keep your app in sync with your GitHub repository with a **CircleCI workflow**. 

[CircleCI](https://circleci.com) is a continuous integration and continuous delivery (CI/CD) platform that helps automate the software development process. A [CircleCI workflow](https://circleci.com/docs/workflows/) is a set of automated tasks defined in a configuration file, orchestrated by CircleCI, to streamline the process of building, testing, and deploying software applications.

*Note: For files larger than 10MB, Spaces requires Git-LFS. If you don't want to use Git-LFS, you may need to review your files and check your history. Use a tool like [BFG Repo-Cleaner](https://rtyley.github.io/bfg-repo-cleaner/) to remove any large files from your history. BFG Repo-Cleaner will keep a local copy of your repository as a backup.*

First, set up your GitHub repository and Spaces app together. Add your Spaces app as an additional remote to your existing Git repository.

```bash
git remote add space https://huggingface.co/spaces/HF_USERNAME/SPACE_NAME
```

Then force push to sync everything for the first time:

```bash
git push --force space main
```

Next, set up a [CircleCI workflow](https://circleci.com/docs/workflows/) to push your `main` git branch to Spaces. 

In the example below:

* Replace `HF_USERNAME` with your username and `SPACE_NAME` with your Space name. 
* [Create a context in CircleCI](https://circleci.com/docs/contexts/) and add an env variable into it called *HF_PERSONAL_TOKEN* (you can give it any name, use the key you create in place of HF_PERSONAL_TOKEN) and the value as your Hugging Face API token. You can find your Hugging Face API token under **API Tokens** on [your Hugging Face profile](https://huggingface.co/settings/tokens).

```yaml
version: 2.1

workflows:
  main:
    jobs:
      - sync-to-huggingface:
          context:
            - HuggingFace
          filters:
            branches:
              only:
                - main

jobs:
  sync-to-huggingface:
    docker:
      - image: alpine
    resource_class: small
    steps:
      - run: 
          name: install git
          command: apk update && apk add openssh-client git
      - checkout
      - run:
          name: push to Huggingface hub
          command: |
                  git config user.email "<your-email@here>" 
                  git config user.name "<your-identifier>" 
                  git push -f https://HF_USERNAME:${HF_PERSONAL_TOKEN}@huggingface.co/spaces/HF_USERNAME/SPACE_NAME main
```