# Skills

Skills are Agent Context definitions that provide coding agents with structured guidance for AI/ML tasks. They help agents understand best practices for a give domain or task. Hugging Face Skills is a repository of skills that are available to all coding agents, specifically designed for AI/ML tasks.

Hugging Face Skills work with major coding agents:
- OpenAI Codex
- Anthropic Claude Code
- Google Gemini CLI
- Cursor

Each skill includes:
- Task definitions and workflows
- Best practices and guidelines
- Helper scripts and templates
- Integration with Hugging Face tools

> [!TIP]
> In practice, coding agents are excellent at writing and defining their own skills using the [Agent Skills format](https://agentskills.io/home) to define your own skills. Therefore, it is best to use Hugging Face Skills as building blocks for your domain-specific skills.

## Installation

To install the Hugging Face CLI skill, use the following command with Claude Code:

Skills provide task-specific guidance for AI/ML workflows. They work alongside MCP or standalone.

<hfoptions id="install-skills">

<hfoption id="Claude Code">

```bash
# start claude 
claude

# install the skills marketplace plugin
/plugin marketplace add huggingface/skills
```

Then, to install a specific skill, use the following command:

```bash
# skill name + marketplace 
/plugin install <skill-name>@huggingface/skills

# for example, to install the hugging face cli skill
/plugin install hugging-face-cli@huggingface/skills
```

</hfoption>

<hfoption id="OpenAI Codex">

```bash
# start codex
codex

# install all Hugging Face Skills
$skill-installer install https://github.com/huggingface/skills
```

Or, to install a specific skill, use the following command:

```bash
# skill name + marketplace 
$skill-installer install <skill-name> from https://github.com/huggingface/skills
```

For some GPT models, `skill-installer` works better with models on a local directory of skills, so do:

```bash
git clone https://github.com/huggingface/skills

# start codex
codex

# install the skills from the local directory
$skill-installer install the hugging face cli skill from the skills/skills/hugging-face-cli/ folder
```
</hfoption>

</hfoptions>

### What You Can Do

Once configured, your coding agent can:

| Capability | Example |
| ---------- | ------- |
| Search the Hub | "Find a code generation model under 7B parameters" |
| Generate images | "Create a diagram of a transformer architecture" |
| Explore datasets | "What datasets are available for sentiment analysis?" |
| Run Spaces | "Use the Whisper Space to transcribe this audio file" |
| Get documentation | "How do I fine-tune a model with transformers?" |

## Available Skills

Hugging Face Skills are available in the [Hugging Face Skills repository](https://github.com/huggingface/skills) and include two types of skills:

- Domain-specific skills are ideal for instructing agents on specific AI tasks like dataset creation, model training, evaluation, and more.
- Tool skills are ideal for instructing agents on how to use the Hugging Face tools like the CLI, Hugging Face Spaces, or Hugging Face Jobs.

For example, currently available skills include:

- [hf-cli](https://github.com/huggingface/skills/tree/main/skills/hf-cli) - The Hugging Face CLI skill
- [hf-datasets](https://github.com/huggingface/skills/tree/main/skills/hf-dataset-creator) - The Hugging Face Dataset Creator skill
- [hf-trainer](https://github.com/huggingface/skills/tree/main/skills/hf-trainer) - The Hugging Face Model Trainer skill
- [hf-evaluation](https://github.com/huggingface/skills/tree/main/skills/hf-evaluation) - The Hugging Face Model Evaluator skill
- [hf-jobs](https://github.com/huggingface/skills/tree/main/skills/hf-jobs) - The Hugging Face Jobs skill
- [hf-mcp](https://github.com/huggingface/skills/tree/main/skills/hf-mcp) - The Hugging Face MCP skill


## Resources

- [Skills Repository](https://github.com/huggingface/skills) - Browse and contribute
- [Agent Context Protocol](https://agents.md) - ACP specification
- [Agent Skills format](https://agentskills.io/home) - Agent Skills format
- [MCP Guide](./mcp) - Use alongside skills

