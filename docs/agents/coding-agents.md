# Coding Agents

Integrate Hugging Face into your coding workflow with the MCP Server and Skills. Access models, datasets, and ML tools directly from your IDE or coding agent.

## Supported Environments

| Environment | Integration Method |
| ----------- | ------------------ |
| **Claude Code** | MCP Server + Skills |
| **OpenAI Codex** | MCP Server + Skills |
| **Cursor** | MCP Server |
| **VS Code** | MCP Server |
| **Gemini CLI** | Skills |
| **Zed** | MCP Server |

## Quick Setup

### MCP Server

The MCP Server gives your coding agent access to Hub search, Spaces, and community tools.

**Cursor / VS Code / Zed:**

1. Visit [huggingface.co/settings/mcp](https://huggingface.co/settings/mcp)
2. Select your IDE from the list
3. Copy the configuration snippet
4. Add it to your IDE's MCP settings
5. Restart the IDE

**Claude Code:**

```bash
claude mcp add hf-mcp https://huggingface.co/mcp
```

### Skills

Skills provide task-specific guidance for AI/ML workflows. They work alongside MCP or standalone.

```bash
claude skill add huggingface/hf-cli
```

See the [Skills Guide](./guides/skills) for available skills and usage.

## What You Can Do

Once configured, your coding agent can:

| Capability | Example |
| ---------- | ------- |
| Search the Hub | "Find a code generation model under 7B parameters" |
| Generate images | "Create a diagram of a transformer architecture" |
| Explore datasets | "What datasets are available for sentiment analysis?" |
| Run Spaces | "Use the Whisper Space to transcribe this audio file" |
| Get documentation | "How do I fine-tune a model with transformers?" |

## Environment Configuration

### Authentication

Set your Hugging Face token as an environment variable:

```bash
export HF_TOKEN="hf_..."
```

Or authenticate via the CLI:

```bash
hf auth login
```

### Adding Community Tools

Extend your setup with MCP-compatible Gradio Spaces:

1. Browse [Spaces with MCP support](https://huggingface.co/spaces?filter=mcp-server)
2. Add them in your [MCP settings](https://huggingface.co/settings/mcp)
3. Restart your IDE

## Example Workflow

```text
You: Find a text classification model that works well on short texts

Agent: [Searches Hugging Face Hub]
       Found several options:
       - distilbert-base-uncased-finetuned-sst-2-english (sentiment)
       - facebook/bart-large-mnli (zero-shot)
       ...

You: Show me how to use the first one

Agent: [Fetches documentation]
       Here's how to use it with transformers:
       
       from transformers import pipeline
       classifier = pipeline("sentiment-analysis", 
                            model="distilbert-base-uncased-finetuned-sst-2-english")
       result = classifier("I love this product!")
```

## Next Steps

- [MCP Server Guide](./guides/mcp) - Detailed configuration options
- [Skills Guide](./guides/skills) - Available skills and how to use them
- [CLI Guide](./guides/cli) - Command-line operations
- [SDK Guide](./guides/sdk) - Build custom integrations

