# CLI for AI Agents

Coding agents like Claude Code, OpenAI Codex, or Open Code are excellent at using the CLI to interact with the Hub through the `hf` command-line interface. Search for models, datasets, Spaces, and papers. Download models, upload files, manage repositories, and run compute jobs.

> [!TIP]
> This is a quick guide on agents that use the CLI. For more detailed information, see the [CLI Reference itself](https://huggingface.co/docs/huggingface_hub/guides/cli).

## Install the CLI

Make sure the `hf` CLI is installed and up to date. See the [CLI installation guide](https://huggingface.co/docs/huggingface_hub/guides/cli#installation) for setup instructions.

## Add the CLI Skill

Install the CLI skill so your agent knows how to use `hf`:

```bash
# install globally (available in all projects)
hf skills add --claude --global

# or install for the current project only
hf skills add --claude
```

This also works with other coding agents:

```bash
hf skills add --codex
hf skills add --cursor
hf skills add --opencode
```

> [!TIP]
> The skill is generated from your locally installed CLI version, so it's always up to date. For additional skills (training, datasets, evaluation, etc.), see the [Skills Guide](./agents-skills).

Alternatively, you can install via the Claude Code plugin system:

```bash
claude
/plugin marketplace add huggingface/skills
/plugin install hugging-face-cli@huggingface/skills
```

## Resources

- [CLI Reference](https://huggingface.co/docs/huggingface_hub/guides/cli) - Complete command documentation
- [Token Settings](https://huggingface.co/settings/tokens) - Manage your tokens
- [Jobs Documentation](https://huggingface.co/docs/huggingface_hub/guides/cli#hf-jobs) - Compute jobs guide

