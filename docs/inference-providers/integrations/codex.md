# Codex

[Codex](https://developers.openai.com/codex) is OpenAI's agentic coding CLI that runs in your terminal, reads and edits your codebase, runs commands, and handles multi-step development tasks. By pointing it at Hugging Face Inference Providers, you can use any of [the latest open models available](https://huggingface.co/models?inference_provider=all) as your backing model.

## Overview

Codex lets you define custom model providers in its configuration file. By adding the Hugging Face router as a provider, all Codex requests are routed through Inference Providers, giving you access to a wide range of open models behind an OpenAI-compatible API.

## Prerequisites

- Codex CLI installed ([installation guide](https://developers.openai.com/codex))
- A Hugging Face account with [API token](https://huggingface.co/settings/tokens/new?ownUserPermissions=inference.serverless.write&tokenType=fineGrained) (needs "Make calls to Inference Providers" permission)

## Configuration

### Quick Setup

1. Create a Hugging Face token with Inference Providers permissions at [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens/new?ownUserPermissions=inference.serverless.write&tokenType=fineGrained)

2. Set your token as an environment variable:

```bash
export HF_TOKEN=hf_...
```

3. Add Hugging Face as a model provider in `~/.codex/config.toml`:

```toml
[model_providers.huggingface]
name = "Hugging Face"
base_url = "https://router.huggingface.co/v1"
env_key = "HF_TOKEN"
wire_api = "responses"
```

4. Create a profile in its own file at `~/.codex/huggingface.config.toml` that selects this provider and a model:

```toml
model_provider = "huggingface"
model = "openai/gpt-oss-120b"
```

> [!NOTE]
> For Codex versions before 0.134.0, you have to define profiles in a `[profiles.<name>]` table inside `config.toml`.

5. Launch Codex with the Hugging Face profile:

```bash
codex --profile huggingface
```

You can also run a one-off command non-interactively:

```bash
codex exec --profile huggingface "Explain what this repository does."
```

Replace `openai/gpt-oss-120b` with any model available on [Inference Providers](https://huggingface.co/models?pipeline_tag=text-generation&inference_provider=all&sort=trending). You can append a provider suffix to pin a specific provider (e.g. `openai/gpt-oss-120b:groq`). Setting an explicit provider gives you deterministic routing, while omitting it lets the router fall back to alternative providers for better resilience. You can also append a `:cheapest` or `:fastest` suffix to prefer cheaper or faster providers.

To override the model for a single run without editing your config, pass `-m`:

```bash
codex exec --profile huggingface -m "zai-org/GLM-5.1" "Return OK."
```

> [!TIP]
> Codex custom providers require `wire_api = "responses"`, which routes requests through the OpenAI-compatible [Responses API](../guides/responses-api). Make sure the model you select is available for chat completion on Inference Providers.

### Billing to an Organization

To bill inference usage to a Hugging Face organization instead of your personal account, add the `X-HF-Bill-To` header to the provider definition in `~/.codex/config.toml`:

```toml
[model_providers.huggingface]
name = "Hugging Face"
base_url = "https://router.huggingface.co/v1"
env_key = "HF_TOKEN"
wire_api = "responses"
http_headers = { "X-HF-Bill-To" = "your-org-name" }
```

Replace `"your-org-name"` with the name of the organization you want to bill to. You must have Write privileges in the org.

## Resources

- [Codex Documentation](https://developers.openai.com/codex)
- [Codex Advanced Configuration](https://developers.openai.com/codex/config-advanced)
- [Available models on Inference Providers](https://huggingface.co/models?pipeline_tag=text-generation&inference_provider=all&sort=trending)
