# Claude Code

[Claude Code](https://docs.anthropic.com/en/docs/claude-code) is Anthropic's agentic coding tool that lives in your terminal. It can understand your codebase, edit files, run commands, and handle complex development tasks. By pointing it at Hugging Face Inference Providers, you can use any of [the latest open models available](https://huggingface.co/models?inference_provider=all) as your backing LLM.

## Overview

Claude Code supports custom API endpoints via environment variables. By setting `ANTHROPIC_BASE_URL` to the Hugging Face router and providing your HF token, all Claude Code requests are routed through Inference Providers, giving you access to a wide range of open models.

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

### Option 2: Manual Environment Variables

Set the following environment variables before launching Claude Code:

```bash
export ANTHROPIC_BASE_URL="https://router.huggingface.co"
export ANTHROPIC_AUTH_TOKEN="${HF_TOKEN}"
export ANTHROPIC_API_KEY="${HF_TOKEN}"
export ANTHROPIC_DEFAULT_OPUS_MODEL="zai-org/GLM-5.1"
export ANTHROPIC_DEFAULT_SONNET_MODEL="zai-org/GLM-5.1"
export ANTHROPIC_DEFAULT_HAIKU_MODEL="zai-org/GLM-5.1"
export CLAUDE_CODE_SUBAGENT_MODEL="zai-org/GLM-5.1"
```

Then start Claude Code:

```bash
claude
```

Replace `zai-org/GLM-5.1` with any model available on [Inference Providers](https://huggingface.co/inference/models). You can also append a provider suffix to pin a specific provider (e.g. `MiniMaxAI/MiniMax-M2.7:fireworks-ai`). Setting an explicit provider gives you deterministic routing, while omitting it (e.g. `MiniMaxAI/MiniMax-M2.7`) uses the default `:fastest` policy. With this policy, the router picks the provider with the highest throughput, and automatically fails over if it becomes unavailable.

Available policies are `:cheapest`, `:fastest`, or `:preferred`; use one of these suffixes to prefer cheaper, faster, or your preferred-order providers (e.g. `MiniMaxAI/MiniMax-M2.7:cheapest`).

> [!TIP]
> The `ANTHROPIC_DEFAULT_*_MODEL` variables map to Claude Code's internal model slots (Opus, Sonnet, Haiku), from the most powerful to the quickest. You can assign different models to each slot to balance capability and speed e.g. `zai-org/GLM-5.1` for Opus, `google/gemma-4-31B-it:together` for Sonnet, and `openai/gpt-oss-120b:cerebras` for Haiku. `CLAUDE_CODE_SUBAGENT_MODEL` controls which model is used for sub-agents.

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

**With manual environment variables**, set `ANTHROPIC_CUSTOM_HEADERS` to include the `X-HF-Bill-To` header:

```bash
export ANTHROPIC_CUSTOM_HEADERS="X-HF-Bill-To: your-org-name"
claude
```

Replace `your-org-name` with the name of the organization you want to bill to. The org must be a Team or Enterprise org that you're a member of.

## Resources

- [Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code)
- [`hf-claude` Extension](https://github.com/huggingface/hf-claude)
- [Available models on Inference Providers](https://huggingface.co/inference/models)
