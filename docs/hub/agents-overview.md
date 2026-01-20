# Agents on the Hub

Hugging Face provides tools and protocols that connect AI agents directly to the Hub. Whether you're chatting with Claude, building with Codex, or developing custom agents, you can access models, datasets, Spaces, and community tools. This page covers connecting your [chat agents](#chat-with-hugging-face) and [coding agents](#coding-agents) to the Hub. 

> [!TIP]
> To build with agents on the Hub, check out the pages on [MCP Server](./agents-mcp), [Skills](./agents-skills), [CLI](./agents-cli), and [SDK](./agents-sdk).

## Chat with Hugging Face

Connect your AI assistant directly to the Hugging Face Hub using the Model Context Protocol (MCP). Once connected, you can search models, explore datasets, generate images, and use community tools—all from within your chat interface.

### Supported Assistants

The HF MCP Server works with any MCP-compatible client:
- **ChatGPT** (via plugins)
- **Claude Desktop**
- **Custom MCP clients**

### Setup

#### 1. Open MCP Settings

![MCP Settings Example](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hf-mcp-settings.png)

Visit [huggingface.co/settings/mcp](https://huggingface.co/settings/mcp) while logged in.

#### 2. Select Your Client

Choose your MCP-compatible client from the list. The page shows client-specific instructions and a ready-to-copy configuration snippet.

#### 3. Configure and Restart

Copy the configuration snippet into your client's MCP settings, save, and restart your client.

> [!TIP]
> The settings page generates the exact configuration your client expects. Use it rather than writing config by hand.

### What You Can Do

Once connected, ask your assistant to use Hugging Face tools among the ones you selected in your configuration:

| Task | Example Prompt |
| ---- | -------------- |
| Search models | "Find Qwen 3 quantizations on Hugging Face" |
| Explore datasets | "Show datasets about weather time-series" |
| Find Spaces | "Find a Space that can transcribe audio files" |
| Generate images | "Create a 1024x1024 image of a cat in Ghibli style" |
| Search papers | "Find recent papers on vision-language models" |

Your assistant calls MCP tools exposed by the Hugging Face server and returns results with metadata, links, and context.

### Add Community Tools

Extend your setup with MCP-compatible Gradio Spaces:

1. Browse [Spaces with MCP support](https://huggingface.co/spaces?filter=mcp-server)
2. Add them in your [MCP settings](https://huggingface.co/settings/mcp)
3. Restart your client to pick up new tools

Gradio MCP apps expose their functions as tools with arguments and descriptions, so your assistant can call them directly.

### Learn More

- [MCP Server Guide](./agents-mcp) - Detailed setup and configuration
- [HF MCP Settings](https://huggingface.co/settings/mcp) - Configure your client
- [MCP-compatible Spaces](https://huggingface.co/spaces?filter=mcp-server) - Community tools

## Coding Agents

Integrate Hugging Face into your coding workflow with the MCP Server and Skills. Access models, datasets, and ML tools directly from your IDE or coding agent. For example, we cover these coding agents and more with MCP and/or Skills:

| Coding Agent | Integration Method |
| ------------ | ------------------ |
| [Claude Code](https://code.claude.com/docs) | MCP Server + Skills |
| [OpenAI Codex](https://openai.com/codex/) | MCP Server + Skills |
| [Open Code](https://opencode.ai/) | MCP Server + Skills |
| [Cursor](https://www.cursor.com/) | MCP Server |
| [VS Code](https://code.visualstudio.com/) | MCP Server |
| [Gemini CLI](https://geminicli.com/) | MCP Server |
| [Zed](https://zed.dev/) | MCP Server |

### Quick Setup

#### MCP Server

The MCP Server gives your coding agent access to Hub search, Spaces, and community tools.

**Cursor / VS Code / Zed:**

1. Visit [huggingface.co/settings/mcp](https://huggingface.co/settings/mcp)
2. Select your IDE from the list
3. Copy the configuration snippet
4. Add it to your IDE's MCP settings
5. Restart the IDE

**Claude Code:**

```bash
claude mcp add hf-mcp-server -t http "https://huggingface.co/mcp?login"
```

#### Skills

Skills provide task-specific guidance for AI/ML workflows. They work alongside MCP or standalone.

```bash
# start claude 
claude

# install the skills marketplace plugin
/plugin marketplace add huggingface/skills
```

Then, to install a Skill specification:
```bash
/plugin install hugging-face-cli@huggingface/skills
```

See the [Skills Guide](./agents-skills) for available skills and usage.

### What You Can Do

Once configured, your coding agent can:

| Capability | Example |
| ---------- | ------- |
| Search the Hub | "Find a code generation model under 7B parameters" |
| Generate images | "Create a diagram of a transformer architecture" |
| Explore datasets | "What datasets are available for sentiment analysis?" |
| Run Spaces | "Use the Whisper Space to transcribe this audio file" |
| Get documentation | "How do I fine-tune a model with transformers?" |

### Environment Configuration

#### Authentication

Set your Hugging Face token as an environment variable:

```bash
export HF_TOKEN="hf_..."
```

Or authenticate via the [CLI](./agents-cli):

```bash
hf auth login
```

#### Adding Community Tools

Extend your setup with MCP-compatible Gradio Spaces:

1. Browse [Spaces with MCP support](https://huggingface.co/spaces?filter=mcp-server)
2. Add them in your [MCP settings](https://huggingface.co/settings/mcp)
3. Restart your IDE

### Example Workflow

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

- [MCP Server](./agens-mcp) - Connect any MCP-compatible AI assistant to the Hub
- [Skills](./agens-skills) - Pre-built capabilities for coding agents
- [CLI](./agens-cli) - Command-line interface for Hub operations  
- [SDK](./agens-sdk) - Python and JavaScript libraries for building agents
