# Hugging Face MCP Server

The Hugging Face MCP (Model Context Protocol) Server connects your MCP‑compatible AI assistant (for example Codex, Cursor, VS Code extensions, Zed, or Claude Desktop) directly to the Hugging Face Hub. Once connected, your assistant can search and explore Hub resources and use community tools, all from within your editor.

## What you can do

- Search and explore Hub resources: models, datasets, Spaces, and papers
- Run community tools via MCP‑compatible Gradio apps hosted on [Spaces](https://hf.co/spaces)
- Bring results back into your assistant with metadata, links, and context

## Get started

1. Open your MCP settings: visit https://huggingface.co/settings/mcp while logged in.

2. Pick your client: select your MCP‑compatible client (for example Cursor, VS Code, Zed, Claude Desktop). The page shows client‑specific instructions and a ready‑to‑copy configuration snippet.

3. Paste and restart: copy the snippet into your client’s MCP configuration, save, and restart/reload the client. You should see “Hugging Face” (or similar) listed as a connected MCP server in your client.

<Tip>
The settings page generates the exact configuration your client expects. Use it rather than writing config by hand.
</Tip>

## Using the server

After connecting, ask your assistant to use the Hugging Face tools. Example prompts:

- “Search Hugging Face models for Qwen 3 Quantizatizations.”
- “Find a Space that can transcribe audio files.”
- “Show datasets about weather time‑series.”
- “Create a 1024 x 1024 image of a dof anime style.”

Your assistant will call MCP tools exposed by the HF MCP Server (including HF spaces) and return results (titles, owners, downloads, links, and so on). You can then open the resource on the Hub or continue iterating in the same chat.

## Add community tools (Gradio MCP)

You can extend your setup with MCP‑compatible Gradio apps built by the community:

- Explore Spaces with MCP support [here](https://huggingface.co/spaces?filter=mcp-server).
- Add the relevant space in your MCP settings on Hugging Face [here](https://huggingface.co/settings/mcp).

Gradio MCP apps expose their functions as tools (with arguments and descriptions) so your assistant can call them directly.

## Security and permissions

- Scoped access: the server uses your authenticated Hugging Face account to access Hub resources. You can review or revoke access anytime from your Hugging Face settings.
- Least surprise: tools only perform actions you prompt them to do in your assistant; browsing and lookups are read‑only.
- Privacy: results returned to your client are based on your account’s visibility and permissions (for example, private org content remains private).

## Learn more

- Settings and client setup: https://huggingface.co/settings/mcp
- Changelog announcement: https://huggingface.co/changelog/hf-mcp-server
- Agents on the Hub overview: 

