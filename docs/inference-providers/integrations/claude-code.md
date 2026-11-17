# Claude Code

[Claude Code](https://docs.anthropic.com/en/docs/claude-code) is Anthropic's agentic coding tool that lives in your terminal. It can understand your codebase, edit files, run commands, and handle complex development tasks. By pointing it at Hugging Face Inference Providers, you can use any of [the latest open models available](https://huggingface.co/models?inference_provider=all) as your backing LLM.

## Overview

Claude Code supports custom API endpoints via environment variables. By setting `ANTHROPIC_BASE_URL` to the Hugging Face router and providing your HF token, all Claude Code requests are routed through Inference Providers, giving you access to a wide range of open models. The router accepts Claude Code's [Anthropic-format requests](../guides/messages-api) for every chat model so any open model can back Claude Code.

## Prerequisites

- Claude Code CLI installed ([installation guide](https://docs.anthropic.com/en/docs/claude-code/setup))
- A Hugging Face account with [API token](https://huggingface.co/settings/tokens/new?ownUserPermissions=inference.serverless.write&tokenType=fineGrained) (needs "Make calls to Inference Providers" permission)

## Configuration

### Option 1: Using the `hf-claude` Extension (Recommended)

The [`hf-claude`](https://github.com/huggingface/hf-claude) extension for the `hf` CLI provides an interactive model and provider picker that launches Claude Code with the right environment variables preconfigured.

1. Make sure you have `HF_TOKEN` set:

```bash
export HF_TOKEN="hf_..."
```

2. Install the extension:

```bash
hf extensions install hf-claude
```

3. Launch Claude Code through `hf`:

```bash
hf claude
```

The extension will present an interactive picker where you can select a model from the available Inference Providers models, and optionally choose a specific provider. It then launches Claude Code with all the necessary environment variables set.

You can also forward any extra arguments to Claude Code:

```bash
hf claude --help
```

### Option 2: A Dedicated Settings File

Claude Code can load an extra settings file for a single launch with `--settings`. Keeping the Hugging Face configuration in a file of its own means that a plain `claude` still uses your usual login and settings.

1. Make sure you have `HF_TOKEN` set:

```bash
export HF_TOKEN="hf_..."
```

2. Create `~/.claude/huggingface.json`:

```json
{
  "apiKeyHelper": "printenv HF_TOKEN",
  "env": {
    "ANTHROPIC_BASE_URL": "https://router.huggingface.co",
    "ANTHROPIC_MODEL": "deepseek-ai/DeepSeek-V4.1-Flash",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "deepseek-ai/DeepSeek-V4.1-Flash"
  }
}
```

3. Launch Claude Code with it:

```bash
claude --settings ~/.claude/huggingface.json
```

`apiKeyHelper` reads your token from the environment, so the token is not written to the file. `ANTHROPIC_MODEL` is the model Claude Code works with, sub-agents included, and `ANTHROPIC_DEFAULT_HAIKU_MODEL` is the one it uses for its small background requests.

Replace `deepseek-ai/DeepSeek-V4.1-Flash` with any model available on [Inference Providers](https://huggingface.co/inference/models). You can also append a provider suffix to pin a specific provider (e.g. `deepseek-ai/DeepSeek-V4.1-Flash:novita`). Setting an explicit provider gives you deterministic routing, while omitting it (e.g. `deepseek-ai/DeepSeek-V4.1-Flash`) uses the [default routing](../routing#default-routing), which balances price, speed and reliability, and automatically fails over if a provider becomes unavailable.

The `:cheapest` or `:fastest` provider policies are also available; use one of these suffixes to prefer cheaper or faster providers (e.g. `deepseek-ai/DeepSeek-V4.1-Flash:cheapest`).

> [!TIP]
> You can assign different models to Claude Code's model slots (Fable, Opus, Sonnet, Haiku) to balance capability and speed: add `ANTHROPIC_DEFAULT_FABLE_MODEL`, `ANTHROPIC_DEFAULT_OPUS_MODEL` and `ANTHROPIC_DEFAULT_SONNET_MODEL` to the `env` block for the `fable`, `opus` and `sonnet` aliases of the `/model` command, and `CLAUDE_CODE_SUBAGENT_MODEL` to give sub-agents a model of their own.

For a one-off run without a settings file, set the two variables on the command line instead. The router reads the token from the `Authorization` header, which is what `ANTHROPIC_AUTH_TOKEN` sets (`ANTHROPIC_API_KEY` alone is not enough):

```bash
ANTHROPIC_BASE_URL="https://router.huggingface.co" ANTHROPIC_AUTH_TOKEN="$HF_TOKEN" claude --model deepseek-ai/DeepSeek-V4.1-Flash
```

### Billing to an Organization

To bill inference usage to a Hugging Face organization instead of your personal account, you have several options depending on your setup.

**With the `hf-claude` extension**, pass the `--bill-to` flag:

```bash
hf extensions install hf-claude --force # reinstall to get the latest version of the extension
hf claude --bill-to your-org-name
```

You can also set the `HF_BILL_TO` environment variable instead:

```bash
export HF_BILL_TO="your-org-name"
hf claude
```

**With a settings file**, add `ANTHROPIC_CUSTOM_HEADERS` with the `X-HF-Bill-To` header to its `env` block:

```json
{
  "apiKeyHelper": "printenv HF_TOKEN",
  "env": {
    "ANTHROPIC_BASE_URL": "https://router.huggingface.co",
    "ANTHROPIC_MODEL": "deepseek-ai/DeepSeek-V4.1-Flash",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "deepseek-ai/DeepSeek-V4.1-Flash",
    "ANTHROPIC_CUSTOM_HEADERS": "X-HF-Bill-To: your-org-name"
  }
}
```

Replace `your-org-name` with the name of the organization you want to bill to. The org must be a Team or Enterprise org that you're a member of.

## Resources

- [Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code)
- [`hf-claude` Extension](https://github.com/huggingface/hf-claude)
- [Available models on Inference Providers](https://huggingface.co/inference/models)
