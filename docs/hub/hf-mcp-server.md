# Hugging Face MCP Server

The Hugging Face MCP (Model Context Protocol) Server connects your MCP‑compatible AI assistant (for example Codex, Cursor, VS Code extensions, Zed, ChatGPT or Claude Desktop) directly to the Hugging Face Hub. Once connected, your assistant can search and explore Hub resources and use community tools, all from within your editor, chat or CLI.

## What you can do

- Search and explore Hub resources: models, datasets, Spaces, and papers.
- Run community tools via MCP‑compatible Gradio apps hosted on [Spaces](https://hf.co/spaces).
- Bring results back into your assistant with metadata, links, and context.

## Get started

1. Open your MCP settings: visit https://huggingface.co/settings/mcp while logged in.

2. Pick your client: select your MCP‑compatible client (for example Cursor, VS Code, Zed, Claude Desktop). The page shows client‑specific instructions and a ready‑to‑copy configuration snippet.

3. Paste and restart: copy the snippet into your client’s MCP configuration, save, and restart/reload the client. You should see “Hugging Face” (or similar) listed as a connected MCP server in your client.

> [!TIP]
> The settings page generates the exact configuration your client expects. Use it rather than writing config by hand.

![MCP Settings Example](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hf-mcp-settings.png)

## Using the server

After connecting, ask your assistant to use the Hugging Face tools. Example prompts:

- “Search Hugging Face models for Qwen 3 Quantizations.”
- “Find a Space that can transcribe audio files.”
- “Show datasets about weather time‑series.”
- “Create a 1024 x 1024 image of a cat ghibli style.”

Your assistant will call MCP tools exposed by the Hugging Face MCP Server (including Spaces) and return results (titles, owners, downloads, links, and so on). You can then open the resource on the Hub or continue iterating in the same chat.

![HF MCP with Spaces in VS Code](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hf-mcp-vscode.png)

## Add community tools (Spaces)

You can extend your setup with MCP‑compatible Gradio spaces built by the community:

- Explore Spaces with MCP support [here](https://huggingface.co/spaces?filter=mcp-server).
- Add the relevant space in your MCP settings on Hugging Face [here](https://huggingface.co/settings/mcp).

Gradio MCP apps expose their functions as tools (with arguments and descriptions) so your assistant can call them directly. Please, restart or refresh your client so it picks up new tools you add.

![image/png](https://cdn-uploads.huggingface.co/production/uploads/5f17f0a0925b9863e28ad517/ex9KRpvamn84ZaOlSp_Bj.png)

Check out our dedicated guide for Spaces as MCP server [here](https://huggingface.co/docs/hub/spaces-mcp-servers#add-an-existing-space-to-your-mcp-tools).

## Learn more

- Settings and client setup: https://huggingface.co/settings/mcp
- Changelog announcement: https://huggingface.co/changelog/hf-mcp-server
- Hugging Face MCP Server: https://huggingface.co/mcp
- Build your own MCP Server with Gradio Spaces: https://www.gradio.app/guides/building-mcp-server-with-gradio

