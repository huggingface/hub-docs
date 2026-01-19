# Agents on the Hub

This page compiles all the libraries and tools Hugging Face offers for agentic workflows: 
- [HF MCP Server](./hf-mcp-server): Connect your MCP-compatible AI assistant directly to the Hugging Face Hub.
- `tiny-agents`: A lightweight toolkit for MCP-powered agents, available in both JS (`@huggingface/tiny-agents`) and Python (`huggingface_hub`).
- `Gradio MCP Server`: Easily create MCP servers from Gradio apps and Spaces.
- `smolagents`: a Python library that enables you to run powerful agents in a few lines of code.

## HF MCP Server

The official **Hugging Face MCP (Model Context Protocol) Server** enables seamless integration between the Hugging Face Hub and any MCP-compatible AI assistant—including VSCode, Cursor, and Claude Desktop.

With the HF MCP Server, you can enhance your AI assistant's capabilities by connecting directly to the Hub's ecosystem. It comes with:
- a curated set of **built-in tools** like Spaces and Papers Semantic Search, Model and Dataset exploration, etc
- **MCP-compatible Gradio apps**: Connect to any [MCP-compatible Gradio app](https://huggingface.co/spaces?filter=mcp-server) built by the Hugging Face community

#### Getting Started

Visit [huggingface.co/settings/mcp](https://huggingface.co/settings/mcp) to configure your MCP client and get started. Read the dedicated one‑page guide: [HF MCP Server](./hf-mcp-server).

> [!WARNING]
> This feature is experimental ⚗️ and will continue to evolve.

## tiny-agents (JS and Python)

NEW: tiny-agents now supports [AGENTS.md](https://agents.md/) standard. 🥳

`tiny-agents` is a lightweight toolkit for running and building MCP-powered agents on top of the Hugging Face Inference Client + Model Context Protocol (MCP). It is available as a JS package `@huggingface/tiny-agents` and in the `huggingface_hub` Python package.


### @huggingface/tiny-agents (JS)

The `@huggingface/tiny-agents` package offers a simple and straightforward CLI and a simple programmatic API for running and building MCP-powered agents in JS.


**Getting Started**

First, you need to install the package:

```bash
npm install @huggingface/tiny-agents
# or
pnpm add @huggingface/tiny-agents
```

Then, you can your agent:
```bash
npx @huggingface/tiny-agents [command] "agent/id"

Usage:
  tiny-agents [flags]
  tiny-agents run   "agent/id"
  tiny-agents serve "agent/id"

Available Commands:
  run         Run the Agent in command-line
  serve       Run the Agent as an OpenAI-compatible HTTP server
```

You can load agents directly from the [tiny-agents](https://huggingface.co/datasets/tiny-agents/tiny-agents) Dataset, or specify a path to your own local agent configuration.

**Advanced Usage**
In addition to the CLI, you can use the `Agent` class for more fine-grained control. For lower-level interactions, use the `MCPClient` from the `@huggingface/mcp-client` package to connect directly to MCP servers and manage tool calls.

Learn more about tiny-agents in the [huggingface.js documentation](https://huggingface.co/docs/huggingface.js/en/tiny-agents/README). 

### huggingface_hub (Python)

The `huggingface_hub` library is the easiest way to run MCP-powered agents in Python. It includes a high-level `tiny-agents` CLI as well as programmatic access via the `Agent` and `MCPClient` classes — all built to work with [Hugging Face Inference Providers](https://huggingface.co/docs/inference-providers/index), local LLMs, or any inference endpoint compatible with OpenAI's API specs.

**Getting started**

Install the latest version with MCP support:
```bash
pip install "huggingface_hub[mcp]>=0.32.2"
```
Then, you can run your agent:
```bash
> tiny-agents run --help
                                                                                                                                                                                     
 Usage: tiny-agents run [OPTIONS] [PATH] COMMAND [ARGS]...                                                                                                                           
                                                                                                                                                                                     
 Run the Agent in the CLI                                                                                                                                                            
                                                                                                                                                                                     
                                                                                                                                                                                     
╭─ Arguments ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
│   path      [PATH]  Path to a local folder containing an agent.json file or a built-in agent stored in the 'tiny-agents/tiny-agents' Hugging Face dataset                         │
│                     (https://huggingface.co/datasets/tiny-agents/tiny-agents)                                                                                                     │
╰───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
╭─ Options ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
│ --help          Show this message and exit.                                                                                                                                       │
╰───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯

```

The CLI pulls the config, connects to its MCP servers, prints the available tools, and waits for your prompt.

**Advanced Usage**

For more fine-grained control, use the `MCPClient` directly. This low-level interface extends `AsyncInferenceClient` and allows LLMs to call tools via the Model Context Protocol (MCP). It supports both local (`stdio`) and remote (`http`/`sse`) MCP servers, handles tool registration and execution, and streams results back to the model in real-time.

Learn more in the [`huggingface_hub` MCP documentation](https://huggingface.co/docs/huggingface_hub/main/en/package_reference/mcp).


### Custom Agents

To create your own agent, simply create a folder (e.g., `my-agent/`) and define your agent’s configuration in an `agent.json` file.
The following example shows a web-browsing agent configured to use the [Qwen/Qwen2.5-72B-Instruct](https://huggingface.co/Qwen/Qwen2.5-72B-Instruct) model via Together AI inference provider, and it comes equipped with a playwright MCP server, which lets it use a web browser

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

To use a local LLM (such as [llama.cpp](https://github.com/ggerganov/llama.cpp), or [LM Studio](https://lmstudio.ai/)), just provide an `endpointUrl`:

```json
{
	"model": "Qwen/Qwen3-32B",
	"endpointUrl": "http://localhost:1234/v1",
	"servers": [
		{
			"type": "stdio",
			"command": "npx",
			"args": ["@playwright/mcp@latest"]
		}
	]
}

```

Optionally, add a `PROMPT.md` to customize the system prompt.

> [!TIP]
> Don't hesitate to contribute your agent to the community by opening a Pull Request in the [tiny-agents](https://huggingface.co/datasets/tiny-agents/tiny-agents) Hugging Face dataset.

## Gradio MCP Server / Tools

You can build an MCP server in just a few lines of Python with Gradio. If you have an existing Gradio app or Space you'd like to use as an MCP server / tool, it's just a single-line change.

To make a Gradio application an MCP server, simply pass in `mcp_server=True` when launching your demo like follows.

```python
# pip install gradio

import gradio as gr

def generate_image(prompt: str):
   """
   Generate an image based on a text prompt
   
   Args:
       prompt: a text string describing the image to generate
   """
   pass

demo = gr.Interface(
    fn=generate_image,
    inputs="text",
    outputs="image",
    title="Image Generator"
)

demo.launch(mcp_server=True)
```

The MCP server will be available at `http://your-space-id.hf.space/gradio_api/mcp/sse` where your application is served. It will have a tool corresponding to each function in your Gradio app, with the tool description automatically generated from the docstrings of your functions.

Lastly, add this to the settings of the MCP Client of your choice (e.g. Cursor).

```json
{
  "mcpServers": {
    "gradio": {
      "url": "http://your-server:port/gradio_api/mcp/sse"
    }
  }
}
```

This is very powerful because it lets the LLM use any Gradio application as a tool. You can find thousands of them on [Spaces](https://huggingface.co/spaces). Learn more [here](https://www.gradio.app/guides/building-mcp-server-with-gradio).

## smolagents

[smolagents](https://github.com/huggingface/smolagents) is a lightweight library to cover all agentic use cases, from code-writing agents to computer use, in few lines of code. It is model agnostic, supporting local models served with Hugging Face Transformers, as well as models offered with [Inference Providers](../inference-providers/index.md), and proprietary model providers. 

It offers a unique kind of agent :`CodeAgent`, an agent that writes its actions in Python code.
It also supports the standard agent that writes actions in JSON blobs as most other agentic frameworks do, called `ToolCallingAgent`.
To learn more about write actions in code vs JSON, check out our [new short course on DeepLearning.AI](https://www.deeplearning.ai/short-courses/building-code-agents-with-hugging-face-smolagents/).

If you want to avoid defining agents yourself, the easiest way to start an agent is through the CLI, using the `smolagent` command.

```bash
smolagent "Plan a trip to Tokyo, Kyoto and Osaka between Mar 28 and Apr 7." \
--model-type "InferenceClientModel" \
--model-id "Qwen/Qwen2.5-Coder-32B-Instruct" \
--imports "pandas numpy" \
--tools "web_search"
```

Agents can be pushed to Hugging Face Hub as Spaces. Check out all the cool agents people have built [here](https://huggingface.co/spaces?filter=smolagents&sort=likes).

smolagents also supports MCP servers as tools, as follows:

```python
# pip install --upgrade smolagents mcp
from smolagents import MCPClient, CodeAgent
from mcp import StdioServerParameters
import os

server_parameters = StdioServerParameters(
    command="uvx",  # Using uvx ensures dependencies are available
    args=["--quiet", "pubmedmcp@0.1.3"],
    env={"UV_PYTHON": "3.12", **os.environ},
)

with MCPClient(server_parameters) as tools:
    agent = CodeAgent(tools=tools, model=model, add_base_tools=True)
    agent.run("Please find the latest research on COVID-19 treatment.")
```

Learn more [in the documentation](https://huggingface.co/docs/smolagents/tutorials/tools#use-mcp-tools-with-mcpclient-directly).
