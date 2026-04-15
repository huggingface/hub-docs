# Building with the SDK

Build MCP-powered agents with the Hugging Face agentic SDKs. The `huggingface_hub` (Python) and `@huggingface/tiny-agents` (JavaScript) libraries provide everything you need to connect LLMs to MCP tools.

## Installation

<hfoptions id="install">

<hfoption id="Python">

```bash
pip install "huggingface_hub[mcp]"
```

</hfoption>

<hfoption id="JavaScript">

```bash
npm install @huggingface/tiny-agents
# or
pnpm add @huggingface/tiny-agents
```

</hfoption>

</hfoptions>

## Quick Start: Run an Agent

The fastest way to get started is with the `tiny-agents` CLI:

<hfoptions id="quickstart">

<hfoption id="Python">

```bash
tiny-agents run julien-c/flux-schnell-generator
```

</hfoption>

<hfoption id="JavaScript">

```bash
npx @huggingface/tiny-agents run "julien-c/flux-schnell-generator"
```

</hfoption>

</hfoptions>

This loads an agent from the [tiny-agents collection](https://huggingface.co/datasets/tiny-agents/tiny-agents), connects to its MCP servers, and starts an interactive chat.

## Using the Agent Class

The `Agent` class manages the chat loop and MCP tool execution. It uses [Inference Providers](https://huggingface.co/docs/inference-providers) to run the LLM.

<hfoptions id="agent-class">

<hfoption id="Python">

```python
from huggingface_hub import Agent
import asyncio

agent = Agent(
    model="Qwen/Qwen2.5-72B-Instruct",
    provider="novita",
    servers=[
        {
            "type": "sse",
            "url": "https://evalstate-flux1-schnell.hf.space/gradio_api/mcp/sse"
        }
    ]
)

async def main():
    async for chunk in agent.run("Generate an image of a sunset"):
        if hasattr(chunk, 'choices'):
            delta = chunk.choices[0].delta
            if delta.content:
                print(delta.content, end="")

asyncio.run(main())
```

See the [Agent reference](https://huggingface.co/docs/huggingface_hub/package_reference/mcp#huggingface_hub.Agent) for all options.

</hfoption>

<hfoption id="JavaScript">

```typescript
import { Agent } from "@huggingface/tiny-agents";

const agent = new Agent({
    model: "Qwen/Qwen2.5-72B-Instruct",
    provider: "novita",
    apiKey: process.env.HF_TOKEN,
    servers: [
        {
            type: "sse",
            url: "https://evalstate-flux1-schnell.hf.space/gradio_api/mcp/sse"
        }
    ]
});

await agent.loadTools();

for await (const chunk of agent.run("Generate an image of a sunset")) {
    if ("choices" in chunk) {
        const delta = chunk.choices[0]?.delta;
        if (delta.content) {
            console.log(delta.content);
        }
    }
}
```

See the [tiny-agents documentation](https://huggingface.co/docs/huggingface.js/tiny-agents/README) for all options.

</hfoption>

</hfoptions>

## Using MCPClient Directly

For more control, use `MCPClient` to manage MCP servers and tool calls directly.

<hfoptions id="mcp-client">

<hfoption id="Python">

```python
import asyncio
from huggingface_hub import MCPClient

async def main():
    async with MCPClient(
        model="Qwen/Qwen2.5-72B-Instruct",
        provider="novita",
    ) as client:
        # Connect to an MCP server
        await client.add_mcp_server(
            type="sse", 
            url="https://evalstate-flux1-schnell.hf.space/gradio_api/mcp/sse"
        )
        
        # Process a request with tools
        messages = [{"role": "user", "content": "Generate an image of a sunset"}]
        
        async for chunk in client.process_single_turn_with_tools(messages):
            if hasattr(chunk, 'choices'):
                delta = chunk.choices[0].delta
                if delta.content:
                    print(delta.content, end="")

asyncio.run(main())
```

See the [MCPClient reference](https://huggingface.co/docs/huggingface_hub/package_reference/mcp#huggingface_hub.MCPClient) for all options.

</hfoption>

<hfoption id="JavaScript">

The JavaScript SDK uses the `Agent` class for MCP interactions. For lower-level control, see the [@huggingface/mcp-client](https://huggingface.co/docs/huggingface.js/mcp-client/README) package.

</hfoption>

</hfoptions>

## Share Your Agent

Contribute agents to the [tiny-agents collection](https://huggingface.co/datasets/tiny-agents/tiny-agents) on the Hub. Include:

- `agent.json` - Agent configuration (required)
- `PROMPT.md` or `AGENTS.md` - System prompt (optional)
- `EXAMPLES.md` - Sample prompts and use cases (optional)

## Learn More

- [huggingface_hub MCP Reference](https://huggingface.co/docs/huggingface_hub/package_reference/mcp) - Python API reference
- [tiny-agents Documentation](https://huggingface.co/docs/huggingface.js/tiny-agents/README) - JavaScript API reference
- [Inference Providers](https://huggingface.co/docs/inference-providers) - Available LLM providers
- [tiny-agents Collection](https://huggingface.co/datasets/tiny-agents/tiny-agents) - Browse community agents
- [MCP Server Guide](./agents-mcp) - Connect to the Hugging Face MCP Server
