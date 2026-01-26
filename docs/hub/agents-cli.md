# Agents and the `hf` CLI

Coding agents like Claude Code, OpenAI Codex, or Open Code are excellent at using the CLI to interact with the Hub through the `hf` command-line interface. Search for models, datasets, Spaces, and papers. Download models, upload files, manage repositories, and run compute jobs.

> [!TIP]
> This is a quick guide on agents that use the CLI. For more detailed information, see the [CLI Reference itself](https://huggingface.co/docs/huggingface_hub/guides/cli).

## Skills

Hugging Face Skills are available for the CLI to help your agents interact with the Hub. Skills give agents relevant instructions for how to use the CLI. See the [Skills Guide](./agents-skills) for available skills and usage. That said, most agents can get by using the CLI directly without Skills. Worst case scenario, they will rely on documentation and trial and error to get commands right. Skills will make your agents more efficient and productive.

## Installation

Make sure the `hf` CLI is installed on your system.

### Standalone Installer (Recommended)

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

### Alternative Methods

```bash
# Using pip
pip install -U huggingface_hub

# Using Homebrew (macOS)
brew install huggingface-cli

# Using uvx (no install needed)
uvx hf --help
```

### Verify Installation

```bash
hf --help
```

## Hugging Face Skills for the CLI

Hugging Face Skills are available for the CLI to help you interact with the Hub. Skills give agents relevant instructions for how to use the CLI. See the [Skills Guide](./skills) for available skills and usage. 

```bash
# start claude 
claude

# install the skills marketplace plugin
/plugin marketplace add huggingface/skills

# install the hugging face cli skill
/plugin install hugging-face-cli@huggingface/skills
```

With Skills installed, your agent can use the CLI to interact with the Hub.

For example, you could use Claude Code to search for datasets:

```
"What datasets are available for sentiment analysis?"
```

Or, you could use OpenAI Codex to create pull requests:

```
"Open a PR with evaluation results from the results.csv file to my/my-model repo on the Hub."
```

## Resources

- [CLI Reference](https://huggingface.co/docs/huggingface_hub/guides/cli) - Complete command documentation
- [Token Settings](https://huggingface.co/settings/tokens) - Manage your tokens
- [Jobs Documentation](https://huggingface.co/docs/huggingface_hub/guides/cli#hf-jobs) - Compute jobs guide

