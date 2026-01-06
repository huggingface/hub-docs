# Hugging Face CLI for Agents

The `hf` command-line interface lets you interact with the Hugging Face Hub from your terminal. Search for models, datasets, Spaces, and papers. Download models, upload files, manage repositories, and run compute jobs.

> [!TIP]
> This is a quick guide on agents using the CLI. For more detailed information, see the [CLI Reference](https://huggingface.co/docs/huggingface_hub/guides/cli).

## Installation

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

Hugging Face Skills are available for the CLI to help you interact with the Hub.

```bash
hf skill add huggingface/hf-cli
```

> [!TIP]
> Skills give agents relevant instructions for how to use the CLI. See the [Skills Guide](./skills) for available skills and usage. 
>
> If you can't use skills, you can use the MCP Server for the CLI. The Hugging Face MCP Server gives your CLI access to the Hub's documentation, including the CLI reference.

## Resources

- [CLI Reference](https://huggingface.co/docs/huggingface_hub/guides/cli) - Complete command documentation
- [Token Settings](https://huggingface.co/settings/tokens) - Manage your tokens
- [Jobs Documentation](https://huggingface.co/docs/huggingface_hub/guides/cli#hf-jobs) - Compute jobs guide

