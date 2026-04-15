# Pi

[Pi](https://github.com/badlogic/pi-mono) is a minimalist, extensible terminal-based coding assistant designed to adapt to your workflows rather than the other way around.

## Overview

Pi natively supports Hugging Face Inference Providers, giving you access to open models from 17+ providers through a single interface.

## Prerequisites

- Pi installed (`npm install -g @mariozechner/pi-coding-agent`)
- A Hugging Face account with [API token](https://huggingface.co/settings/tokens/new?ownUserPermissions=inference.serverless.write&tokenType=fineGrained) (needs "Make calls to Inference Providers" permission)

## Configuration

### Quick Setup

1. Create a Hugging Face token with Inference Providers permissions at [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens/new?ownUserPermissions=inference.serverless.write&tokenType=fineGrained)

2. Set your token as an environment variable:

```bash
export HF_TOKEN=hf_...
```

Alternatively, store it in `~/.pi/agent/auth.json`:

```json
{
  "huggingface": {
    "type": "api_key",
    "key": "hf_..."
  }
}
```

3. Set Hugging Face as your default provider in `~/.pi/agent/settings.json`:

```json
{
  "defaultProvider": "huggingface",
  "defaultModel": "moonshotai/Kimi-K2.5"
}
```

4. Start pi and run the `/model` command (or press **Ctrl+L**) to open the interactive model selector. You can also press **Ctrl+P** to cycle through your scoped models.

### Billing to an Organization

To bill inference usage to a Hugging Face organization instead of your personal account, add the `X-HF-Bill-To` header in your provider configuration (`~/.pi/agent/models.json`):

```json
{
  "providers": {
    "huggingface": {
      "headers": {
        "X-HF-Bill-To": "your-org-name"
      }
    }
  }
}
```

Replace `"your-org-name"` with the name of the organization you want to bill to.

## Resources

- [Pi Documentation](https://github.com/badlogic/pi-mono)
- [Available models on Inference Providers](https://huggingface.co/models?pipeline_tag=text-generation&inference_provider=all&sort=trending)
