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

2. Set your token as an environment variable:

```bash
export HF_TOKEN=hf_...
```

3. Start OpenCode on a model:

```bash
opencode -m huggingface/deepseek-ai/DeepSeek-V4.1-Flash
```

You can also run a one-off command non-interactively:

```bash
opencode run -m huggingface/deepseek-ai/DeepSeek-V4.1-Flash "Explain what this repository does."
```

Replace `deepseek-ai/DeepSeek-V4.1-Flash` with any model listed by `opencode models huggingface`. You can switch models anytime using the `/models` command in the OpenCode TUI (Terminal User Interface).

### Storing Your Token in OpenCode

If you would rather not export `HF_TOKEN`, run `opencode auth login` and select **Hugging Face**:

```bash
$ opencode auth login

┌  Add credential
│
◆  Select provider
│  ● Hugging Face
│  ...
└
```

Then enter your Hugging Face token when prompted:

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

### Using Other Models and Routing Suffixes

OpenCode only accepts the model ids of its own catalog. To use another model available on [Inference Providers](https://huggingface.co/models?pipeline_tag=text-generation&inference_provider=all&sort=trending), or to append a provider suffix (e.g. `:novita`) or a `:cheapest` or `:fastest` suffix to a model id, declare the id in your OpenCode config (`~/.config/opencode/opencode.json`):

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "huggingface": {
      "models": {
        "deepseek-ai/DeepSeek-V4.1-Flash:novita": {}
      }
    }
  }
}
```

Then start OpenCode on it:

```bash
opencode -m huggingface/deepseek-ai/DeepSeek-V4.1-Flash:novita
```

### Billing to an Organization

To bill inference usage to a Hugging Face organization instead of your personal account, add the `X-HF-Bill-To` header in your OpenCode config (`~/.config/opencode/opencode.json`):

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "huggingface": {
      "options": {
        "headers": {
          "X-HF-Bill-To": "your-org-name"
        }
      }
    }
  }
}
```

Replace `"your-org-name"` with the name of the organization you want to bill to.

## GitHub Actions Integration

OpenCode can also be used to run open models in GitHub Actions via Inference Providers. See our [GitHub Actions guide](../guides/github-actions-code-review) for setting up automated PR reviews.

## Resources

- [OpenCode Documentation](https://opencode.ai/docs)
- [OpenCode Provider Configuration](https://opencode.ai/docs/providers/#hugging-face)
- [GitHub Actions Integration Guide](../guides/github-actions-code-review)
