# Automating Code Review with GitHub Actions

[OpenCode](https://opencode.ai) is an AI coding agent that runs in your terminal and can work with open models via Hugging Face Inference Providers.

You can also install OpenCode as a GitHub App to help automate GitHub workflows!

In less than 5 minutes, you can set it up to respond to issues and pull requests using powerful open source language models.

This guide shows you how to use Hugging Face Inference Providers with OpenCode to power GitHub automation. You'll be able to triage issues, implement features, and review code using models like DeepSeek, GLM-4.5, and Kimi K2.

> [!TIP]
> This guide assumes you have a Hugging Face account and a GitHub repository. You can create a free Hugging Face account at [huggingface.co](https://huggingface.co).

## What the OpenCode GitHub App Does

Once set up, OpenCode will respond to `/oc` or `/opencode` commands in GitHub issues and pull requests:

- **Triage and explain issues** - Ask OpenCode to analyze an issue and explain it
- **Implement features** - Request a fix or feature, and OpenCode creates a PR with the changes
- **Review and modify PRs** - Request changes on pull requests and OpenCode commits them

The entire workflow runs securely in your GitHub Actions runners, and you maintain full control over which repositories you install the OpenCode GitHub app on.

## Step 1: Install OpenCode

First, install OpenCode on your local machine see the [installation instructions](https://opencode.ai/docs/#install).

## Step 2: Configure OpenCode for GitHub

Navigate to your local clone of your GitHub repository and run the setup command:

```bash
cd your-repository
opencode github install
```

This interactive setup will guide you through:

1. **Installing the GitHub app** - Your browser opens to authorize OpenCode for your repositories. You can choose specific repositories or all repositories.
2. **Selecting a provider** - Choose **Hugging Face** from the list
3. **Choosing a model** - Select a model like **GLM-4.5-Air** or **Kimi-K2-Instruct**
4. **Creating the workflow** - Generates `.github/workflows/opencode.yml` automatically

Once the `.github/workflows/opencode.yml` file is created, you'll need to commit and push it to your repository:

```bash
git add .github/workflows/opencode.yml
git commit -m "Add OpenCode workflow"
git push
```

After the setup completes, you'll need to add your Hugging Face token as a repository secret:

1. Get a token from your [Hugging Face settings](https://huggingface.co/settings/tokens/new?ownUserPermissions=inference.serverless.write&tokenType=fineGrained). The token needs permissions to `Make calls to Inference Providers`.
2. In your GitHub repository, go to **Settings → Secrets and variables → Actions**
3. Click **New repository secret**
4. Name it `HF_TOKEN` and paste your token

> [!TIP]
> Make sure your Hugging Face token has Inference Providers permissions enabled. We recommend creating a separate token specifically for OpenCode usage.

## Step 3: Try It Out

Once your workflow is set up and your token is configured, test it by commenting on any issue:

```

/oc summarize

```

OpenCode will analyze the issue and provide a summary. Here are other commands you can try:

**Explain an issue:**

```

/opencode explain this issue

```

**Implement a fix:**

```

/oc fix this

```

OpenCode creates a new branch, implements the changes, and opens a pull request.

**Request changes on a PR:**

```

/oc please add error handling

```

> [!TIP]
> Use `/oc` (short) or `/opencode` (long) to trigger commands. OpenCode understands natural language, so feel free to be specific about what you need.

## Security Considerations

> [!WARNING]
> On public repositories, anyone can trigger the bot by commenting `/oc` or `/opencode`. This could lead to unexpected inference costs or unwanted PRs. Consider:
>
> - **Using a separate Hugging Face token** specifically for OpenCode (not your main token), so you can revoke it if needed without affecting other services
> - Monitoring your Hugging Face usage to track costs
> - Adding workflow conditions to restrict who can trigger the bot (e.g., only repository collaborators)
> - Starting with a private repository or test repo to control access

## Example Workflow in Action

Here's a real example from a [fork of the Hugging Face datasets repository](https://github.com/davanstrien/datasets). The issue requests adding `uv` installation support:

![Example Issue](./images/opencode-example-issue.png)

When someone comments `/oc fix this`, OpenCode analyzes the issue, creates a new branch, implements the changes, and opens a pull request:

![Bot Created PR](./images/opencode-bot-created-pr.png)

The PR includes all the necessary changes:

![PR Changes](./images/opencode-pr-diff.png)

## Switching Models

Different models offer different trade-offs between speed, cost, and capability. You can experiment with various models by editing the workflow file.

Edit `.github/workflows/opencode.yml` and update the `model` parameter:

```yaml
with:
  model: huggingface/deepseek-ai/DeepSeek-V3         # Powerful reasoning
  # or
  model: huggingface/zai-org/GLM-4.5-Air             # Balanced performance
```

Commit and push the changes:

```bash
git add .github/workflows/opencode.yml
git commit -m "Switch to the DeepSeek model"
git push
```

## Understanding the Workflow

The setup wizard generates `.github/workflows/opencode.yml`, which defines when and how OpenCode runs:

```yaml
name: opencode

on:
  issue_comment:
    types: [created] # Trigger on new comments

jobs:
  opencode:
    # Only run if comment contains /oc or /opencode
    if: |
      contains(github.event.comment.body, ' /oc') ||
      startsWith(github.event.comment.body, '/oc') ||
      contains(github.event.comment.body, ' /opencode') ||
      startsWith(github.event.comment.body, '/opencode')

    runs-on: ubuntu-latest

    permissions:
      id-token: write # Required for OpenCode authentication
      contents: read # Read repository contents
      pull-requests: read # Access PR information
      issues: read # Access issue information

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Run opencode
        uses: sst/opencode/github@latest
        env:
          HF_TOKEN: ${{ secrets.HF_TOKEN }} # Your Hugging Face token
        with:
          model: huggingface/zai-org/GLM-4.5-Air # The model to use
```

The workflow triggers whenever someone comments on an issue or PR with `/oc` or `/opencode`, checks out your repository code, and runs OpenCode with your chosen model from Hugging Face Inference Providers.

## Next Steps

- Explore the [OpenCode GitHub documentation](https://opencode.ai/docs/github/) for advanced configuration
- Browse [models available through Inference Providers](https://huggingface.co/models?pipeline_tag=text-generation&inference_provider=cerebras,together,fireworks-ai,nebius,novita,sambanova,groq,hyperbolic,nscale,fal-ai,cohere,replicate,scaleway&sort=trending) to find the best model for your needs
- Try OpenCode in a private repository first to test with controlled access
