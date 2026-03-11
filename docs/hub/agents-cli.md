# The `hf` CLI Skill

The `hf` CLI is the fastest way to plug your coding agent into the Hugging Face ecosystem. It works with Claude Code, OpenAI Codex, Cursor, and more.

## Install the CLI

<hfoptions id="cli-install">

<hfoption id="macOS / Linux">

```bash
curl -LsSf https://hf.co/cli/install.sh | bash
```

</hfoption>

<hfoption id="Windows">

```powershell
powershell -ExecutionPolicy ByPass -c "irm https://hf.co/cli/install.ps1 | iex"
```

</hfoption>

</hfoptions>

Alternative methods: `pip install -U huggingface_hub`, `brew install huggingface-cli`, or `uvx hf --help`.

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

## What You Can Do

Once set up, your agent can use the CLI to interact with the Hub:

```
"Find a code generation model under 7B parameters"
"Upload my model to the Hub"
"Open a PR with evaluation results from results.csv to my/my-model"
```

See the [CLI Reference](https://huggingface.co/docs/huggingface_hub/guides/cli) for all available commands.

## Resources

- [CLI Reference](https://huggingface.co/docs/huggingface_hub/guides/cli) - Complete command documentation
- [Token Settings](https://huggingface.co/settings/tokens) - Manage your tokens
- [Jobs Documentation](https://huggingface.co/docs/huggingface_hub/guides/cli#hf-jobs) - Compute jobs guide
