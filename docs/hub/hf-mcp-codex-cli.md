# Connect the Hugging Face MCP Server to Codex CLI

Configure the Codex CLI to launch the Hugging Face MCP Server via `mcp-remote`.

## Steps

1. Follow the [Codex CLI setup guide](https://github.com/openai/codex) to install the tool and create your `~/.codex/config.toml`.
2. Add the Hugging Face MCP server block to the config:

   ```toml
   [mcp_servers.huggingface]
   command = "npx"
   args = ["-y", "mcp-remote@latest", "https://huggingface.co/mcp?login"]
   ```

3. Save the file and restart the Codex CLI (or run `codex mcp list`) to confirm that the **huggingface** server is available.
4. Invoke Hugging Face tools from Codex by asking it to use the `huggingface` MCP server in your next command or chat.

> [!NOTE]
> The `mcp-remote` helper opens a browser window the first time to complete the Hugging Face sign-in and authorization flow.
