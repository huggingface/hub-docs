# OpenCode

<!--
<div class="flex justify-center">
    <a href="https://opencode.ai/" target="_blank">
        <img class="block dark:hidden" src="https://opencode.ai/_build/assets/preview-opencode-wordmark-light-nzmKQT2r.png" alt="OpenCode">
        <img class="hidden dark:block" src="https://opencode.ai/_build/assets/preview-opencode-wordmark-dark-tZ1Y3VXe.png" alt="OpenCode"/>
    </a>
</div> -->

[OpenCode](https://opencode.ai/) is an AI coding agent built for the terminal that helps with code review, refactoring, testing, and general development tasks.

## Overview

OpenCode natively supports Hugging Face Inference Providers, giving you access to open models from 17+ providers through a single interface.

## Prerequisites

- OpenCode installed ([installation guide](https://opencode.ai/docs))
- A Hugging Face account with [API token](https://huggingface.co/settings/tokens/new?ownUserPermissions=inference.serverless.write&tokenType=fineGrained) (needs "Make calls to Inference Providers" permission)

## Configuration

### Quick Setup

1. Create a Hugging Face token with Inference Providers permissions at [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens/new?ownUserPermissions=inference.serverless.write&tokenType=fineGrained)

2. Run `opencode auth login` and select **Hugging Face**:

```bash
$ opencode auth login

┌  Add credential
│
◆  Select provider
│  ● Hugging Face
│  ...
└
```

3. Enter your Hugging Face token when prompted:

```bash
┌  Add credential
│
◇  Select provider
│  Hugging Face
│
◇  Enter your API key
│  hf_...
└
```

4. Run the `/models` command in OpenCode to select a model.

Once configured, OpenCode will use your selected model for all operations. You can switch models anytime using the `/models` command in the OpenCode TUI (Terminal User Interface).

## GitHub Actions Integration

OpenCode can also be used to run open models in GitHub Actions via Inference Providers. See our [GitHub Actions guide](../guides/github-actions-code-review) for setting up automated PR reviews.

## Resources

- [OpenCode Documentation](https://opencode.ai/docs)
- [OpenCode Provider Configuration](https://opencode.ai/docs/providers/#hugging-face)
- [GitHub Actions Integration Guide](../guides/github-actions-code-review)
