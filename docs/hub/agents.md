# Agents on the Hub

This page compiles all the libraries and tools Hugging Face offers for agentic workflows.

## smolagents

[smolagents](https://github.com/huggingface/smolagents) is a lightweight library to cover all agentic use cases from code writing agents to computer use in few lines of code. It is model agnostic, supporting local models served with Hugging Face Transformers, as well as models offered with [Inference Providers](../inference-providers/index.md), and proprietary model providers. 

It offers three agent classes based on ReAct framework: `CodeAgent` for agents writing their own codes, `ToolCallingAgent` for tool calling agents and the `MultiStepAgent` which the former two agents are based on for multi-step ReAct workflows.

If you want to avoid defining agents yourself, easiest way to start an agent is through CLI, with `smolagent` command.

```python
smolagent "Plan a trip to Tokyo, Kyoto and Osaka between Mar 28 and Apr 7."  --model-type "InferenceClientModel" --model-id "Qwen/Qwen2.5-Coder-32B-Instruct" --imports "pandas numpy" --tools "web_search"
```

Agents can be pushed to Hugging Face Hub as Spaces. Check out all the cool agents people have built [here](https://huggingface.co/spaces?filter=smolagents&sort=likes).

smolagents also support MCP servers as tools, as follows:
```python
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

## huggingface.js mcp-client

Huggingface.js offers an MCP client served with Inference Providers. Getting started with them is as simple as running `pnpm agent`. You can plug and play different models and providers by setting `PROVIDER` and `MODEL_ID` environmental variables. 

```bash
export HF_TOKEN="hf_..."
export MODEL_ID="Qwen/Qwen2.5-72B-Instruct"
export PROVIDER="nebius"
pnpm agent
```

You can get more information about mcp-client [here](https://huggingface.co/docs/huggingface.js/en/mcp-client/README).



## Gradio MCP Server

Gradio MCP Server feature wraps Gradio applications to make them available for LLM to use. 

To make a Gradio application an MCP server, simply pass in `mcp_server=True` when launching your demo like follows.

```python

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

The MCP server will be available at `http://your-server:port/gradio_api/mcp/sse` where your application is served. It will have a tool corresponding to each function in your Gradio app, with the tool description automatically generated from the docstrings of your functions.

Lastly, add this to the settings of the MCP Client of your choice (e.g. Cursor).

```
{
  "mcpServers": {
    "gradio": {
      "url": "http://your-server:port/gradio_api/mcp/sse"
    }
  }
}
```


This is very powerful because it lets the LLM use any Gradio application as a tool. You can find thousands of them on [Spaces](https://huggingface.co/spaces). 
