# Agents on the Hub

Hugging Face provides tools and protocols to connect AI agents to the Hub ecosystem.

## Get Started

| Tool | What it does |
| ---- | ------------ |
| [MCP Server](./agents-mcp) | Connect any MCP-compatible client (Claude, Cursor, VS Code, ChatGPT) to the Hub |
| [CLI](./agents-cli) | Give your coding agent the `hf` command-line interface |
| [Skills](./agents-skills) | Task-specific guidance for AI/ML workflows |
| [SDK](./agents-sdk) | Build agents programmatically with Python or JavaScript |
| [Local Agents](./agents-local) | Run fully local agents with llama.cpp and Pi |

See [Agents on the Hub](./agents-overview) for a complete setup walkthrough.

## tiny-agents

A lightweight toolkit for running MCP-powered agents on top of Hugging Face Inference. Available in [JavaScript](https://huggingface.co/docs/huggingface.js/en/tiny-agents/README) (`@huggingface/tiny-agents`) and [Python](https://huggingface.co/docs/huggingface_hub/main/en/package_reference/mcp) (`huggingface_hub`).

```bash
# JavaScript
npx @huggingface/tiny-agents run "agent/id"

# Python
pip install "huggingface_hub[mcp]"
tiny-agents run "agent/id"
```

Create your own agent with an `agent.json` config:

```json
{
	"model": "Qwen/Qwen2.5-72B-Instruct",
	"provider": "together",
	"servers": [
		{
			"type": "stdio",
			"command": "npx",
			"args": ["@playwright/mcp@latest"]
		}
	]
}
```

For local LLMs, add an `endpointUrl` pointing to your server (e.g. `http://localhost:1234/v1`). Learn more in the [SDK guide](./agents-sdk).

## Gradio MCP Server

Turn any Gradio app into an MCP server with a single-line change:

```python
demo.launch(mcp_server=True)
```

The server exposes each function as a tool, with descriptions auto-generated from docstrings. Connect it to any MCP client. Thousands of MCP-compatible Spaces are available on the [Hub](https://huggingface.co/spaces?filter=mcp-server). Learn more in the [Gradio MCP guide](https://www.gradio.app/guides/building-mcp-server-with-gradio).

## smolagents

[smolagents](https://github.com/huggingface/smolagents) is a lightweight Python library for building agents in a few lines of code. It supports `CodeAgent` (writes actions in Python) and `ToolCallingAgent` (uses JSON tool calls), works with any model via [Inference Providers](../inference-providers/index.md), and integrates with MCP servers.

```bash
smolagent "Plan a trip to Tokyo, Kyoto and Osaka between Mar 28 and Apr 7." \
--model-type "InferenceClientModel" \
--model-id "Qwen/Qwen2.5-Coder-32B-Instruct" \
--tools "web_search"
```

Agents can be pushed to the Hub as Spaces. Browse community agents [here](https://huggingface.co/spaces?filter=smolagents&sort=likes). Learn more in the [smolagents documentation](https://huggingface.co/docs/smolagents/tutorials/tools#use-mcp-tools-with-mcpclient-directly).
