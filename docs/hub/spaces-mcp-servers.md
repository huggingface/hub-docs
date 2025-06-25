# Spaces as MCP tools

You can **turn any public Space that has a visible `MCP` badge into a callable tool** that will be callable from any MCP client, without writing a single line of code.

## Setup your MCP Client

From your [MCP settings](https://huggingface.co/settings/mcp), select your MCP client (VSCode, Cursor, Claude Code, ...) then follow the setup instructions. 

> **Note:** You need a valid Hugging Face token with **READ** permissions to use MCP tools. If you don't have one, [create a new token](https://huggingface.co/settings/tokens) with the **read** scope.

## Add an existing Space

1. Browse compatible [Spaces](https://huggingface.co/spaces?filter=mcp-server) to find Spaces that are usable via MCP. You can also look for the grey **MCP** badge on any Spaces overview.
2. Click the badge and choose **Add to MCP tools**.
3. The Space immediately appears in **Settings → MCP → Added tools**.

## Use tools from your MCP client 

If your MCP client  is configured correctly with a valid Hugging Face token, the tools you added will appear automatically. Most MCP clients will show you what tools are currently loaded, if you did the setup correctly you should see the Space you just added.

> **Note:** For ZeroGPU Spaces, your quota will be used when the tool is called, so make sure you [subscribe to PRO](https://huggingface.co/subscribe/pro?from=ZeroGPU) to get 25 minutes of daily quota (on H200 hardware). Letting your for example generate up to 600 images per day using FLUX Schnell.

## Build your own Gradio Space

To create your own MCP-enabled Space, you'll need to use **Gradio** (other frameworks like Streamlit don't support MCP). See the [complete guide](https://www.gradio.app/guides/building-mcp-server-with-gradio) for more details.

First, install Gradio with MCP support:
```bash
pip install "gradio[mcp]"
```

Then create your app with clear type hints and docstrings:

```python
import gradio as gr

def letter_counter(word: str, letter: str) -> int:
    """Count occurrences of a letter in a word.
    
    Args:
        word: The word to search in
        letter: The letter to count
        
    Returns:
        Number of times the letter appears in the word
    """
    return word.lower().count(letter.lower())

demo = gr.Interface(fn=letter_counter,
                    inputs=["text", "text"],
                    outputs="number")
demo.launch(mcp_server=True)   # exposes an MCP schema automatically
```

Push the app to a **Gradio Space** and it will automatically receive the **MCP** badge. Anyone can then add it as a tool with a single click.

> **Note:** Only Gradio Spaces support MCP functionality. The `mcp_server=True` parameter automatically exposes your functions as callable tools through the Model Control Protocol.

> **Note:** It's also quite easy to convert an existing Gradio Space to MCP server. Duplicate it from the context menu then just add the `mcp_server=True` parameter to your `launch()` method, and ensure your functions have clear type hints and docstrings - you can use AI tools to automate this quite easily ([example](https://huggingface.co/spaces/Lightricks/ltx-video-distilled/discussions/22/files) of AI generated docstrings).