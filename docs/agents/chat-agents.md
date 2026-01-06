# Chat with Hugging Face

Connect your AI assistant directly to the Hugging Face Hub using the Model Context Protocol (MCP). Once connected, you can search models, explore datasets, generate images, and use community tools—all from within your chat interface.

## Supported Assistants

The HF MCP Server works with any MCP-compatible client:
- **ChatGPT** (via plugins)
- **Claude Desktop**
- **Custom MCP clients**

## Setup

### 1. Open MCP Settings

![MCP Settings Example](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hf-mcp-settings.png)

Visit [huggingface.co/settings/mcp](https://huggingface.co/settings/mcp) while logged in.

### 2. Select Your Client

Choose your MCP-compatible client from the list. The page shows client-specific instructions and a ready-to-copy configuration snippet.

### 3. Configure and Restart

Copy the configuration snippet into your client's MCP settings, save, and restart your client.

> [!TIP]
> The settings page generates the exact configuration your client expects. Use it rather than writing config by hand.

## What You Can Do

Once connected, ask your assistant to use Hugging Face tools:

| Task | Example Prompt |
| ---- | -------------- |
| Search models | "Find Qwen 3 quantizations on Hugging Face" |
| Explore datasets | "Show datasets about weather time-series" |
| Find Spaces | "Find a Space that can transcribe audio files" |
| Generate images | "Create a 1024x1024 image of a cat in Ghibli style" |
| Search papers | "Find recent papers on vision-language models" |

Your assistant calls MCP tools exposed by the Hugging Face server and returns results with metadata, links, and context.

## Add Community Tools

Extend your setup with MCP-compatible Gradio Spaces:

1. Browse [Spaces with MCP support](https://huggingface.co/spaces?filter=mcp-server)
2. Add them in your [MCP settings](https://huggingface.co/settings/mcp)
3. Restart your client to pick up new tools

Gradio MCP apps expose their functions as tools with arguments and descriptions, so your assistant can call them directly.

## Learn More

- [MCP Server Guide](./guides/mcp) - Detailed setup and configuration
- [HF MCP Settings](https://huggingface.co/settings/mcp) - Configure your client
- [MCP-compatible Spaces](https://huggingface.co/spaces?filter=mcp-server) - Community tools
