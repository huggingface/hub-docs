# Hugging Face CLI for AI Agents

The `hf` CLI is a great way to connect your agents to the Hugging Face ecosystem. Search models, manage datasets, launch Spaces, and run jobs from any coding agent.

> [!TIP]
> This is a quick guide on agents that use the CLI. For more detailed information, see the [CLI Reference itself](https://huggingface.co/docs/huggingface_hub/guides/cli).

## Install the CLI

Make sure the `hf` CLI is installed and up to date. See the [CLI installation guide](https://huggingface.co/docs/huggingface_hub/guides/cli#installation) for setup instructions.

## Add the CLI Skill

Skills give your agent the context it needs to use tools effectively. Install the CLI Skill so your agent knows every `hf` command and stays current with the latest updates. Learn more about Skills at [agentskills.io](https://agentskills.io).

```bash
# install globally (available in all projects)
hf skills add --claude --global

# or install for the current project only
hf skills add --claude
```

> [!TIP]
> The Skill is generated from your locally installed CLI version, so it's always up to date. For additional Skills (training, datasets, evaluation, etc.), see the [Skills Guide](./agents-skills).

This also works with other coding agents:

```bash
hf skills add --codex
hf skills add --cursor
hf skills add --opencode
```

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

