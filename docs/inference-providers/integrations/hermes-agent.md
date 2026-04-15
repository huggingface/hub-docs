# Hermes Agent

[Hermes Agent](https://github.com/NousResearch/hermes-agent) is an open-source AI agent CLI by [Nous Research](https://nousresearch.com/) for coding, research, and development tasks in the terminal.

## Overview

Hermes Agent natively supports Hugging Face Inference Providers, giving you access to 100s of open models from 17+ providers through a single interface.

## Prerequisites

- Hermes Agent installed ([installation guide](https://github.com/NousResearch/hermes-agent#quick-install))
- A Hugging Face account with [API token](https://huggingface.co/settings/tokens/new?ownUserPermissions=inference.serverless.write&tokenType=fineGrained) (needs "Make calls to Inference Providers" permission)

## Configuration

Add your token to `~/.hermes/.env`:

```
HF_TOKEN=hf_...
```

Then select Hugging Face as your provider via `hermes model`, or pass it directly:

```bash
hermes chat --provider hf
```

For full configuration options including routing suffixes and permanent config, see the [Hermes Agent HF configuration guide](https://hermes-agent.nousresearch.com/docs/user-guide/configuration/#hugging-face-inference-providers).

## Resources

- [Hermes Agent Documentation](https://hermes-agent.nousresearch.com)
- [HF Configuration Guide](https://hermes-agent.nousresearch.com/docs/user-guide/configuration/#hugging-face-inference-providers)
- [GitHub](https://github.com/NousResearch/hermes-agent)
