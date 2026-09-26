# Hugging Face CLI for AI Agents

The `hf` CLI is a great way to connect your agents to the Hugging Face Hub and ecosystem. Search models, manage datasets and buckets, launch Spaces, and run jobs from any coding agent.

> [!TIP]
> This is a quick guide on agents that use the CLI. For more detailed information, see the [CLI Reference itself](https://huggingface.co/docs/huggingface_hub/guides/cli).

## Install the CLI

Make sure the `hf` CLI is installed and up to date. See the [CLI installation guide](https://huggingface.co/docs/huggingface_hub/guides/cli#getting-started) for setup instructions.

The recommended standalone installer also installs the CLI Skill globally, including the Claude Code location, so agents pick it up with no extra step. Pass `--exclude-skill` (or `-ExcludeSkill` on Windows) to skip it.

## Add the CLI Skill

Skills give your agent the context it needs to use tools effectively. The standalone installer adds the CLI Skill for you — install it by hand if you used pip or Homebrew, skipped it, or want it in a single project. Learn more about Skills at [agentskills.io](https://agentskills.io).

```bash
# install globally (available in all projects, works with Codex, Cursor, OpenCode,
# and any agent that loads skills from ~/.agents/skills)
hf skills add --global

# for Claude Code use the --claude flag
hf skills add --claude --global

# or install for the current project only (works with Codex, Cursor, OpenCode,
# and any agent that loads skills from .agents/skills)
hf skills add

# for Claude Code, use the --claude flag
hf skills add --claude
```

> [!TIP]
> The Skill is generated from your locally installed CLI version, so it goes stale when you upgrade. `hf update` refreshes a globally installed Skill — never re-adding one you removed — and `hf skills update -g` refreshes it on its own. `hf` reminds you once a day if the Skill is missing or outdated; silence that with `HF_HUB_DISABLE_UPDATE_CHECK=1`.

Alternatively, you can install via the Claude Code plugin system:

```bash
claude
/plugin marketplace add huggingface/skills
/plugin install hf-cli@huggingface-skills
```

## Resources

- [CLI Reference](https://huggingface.co/docs/huggingface_hub/guides/cli) - Complete command documentation
- [Token Settings](https://huggingface.co/settings/tokens) - Manage your tokens
- [Jobs Documentation](https://huggingface.co/docs/huggingface_hub/guides/cli#hf-jobs) - Compute jobs guide

