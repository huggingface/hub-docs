# Spaces as MCP tools

You can **turn any public Space that has a visible `MCP` badge into a callable tool** that will be available in any MCP-compatible client, without writing a single line of code.

## Setup your MCP Client

From your [Hub MCP settings](https://huggingface.co/settings/mcp), select your MCP client (VSCode, Cursor, Claude Code, ...) then follow the setup instructions. 

![image/png](https://cdn-uploads.huggingface.co/production/uploads/5f17f0a0925b9863e28ad517/wWm_GeuWF17OrMyJT4tMx.png)

> **Important:** You need a valid Hugging Face token with **READ** permissions to use MCP tools. If you don't have one, [create a new READ token](https://huggingface.co/settings/tokens/new?tokenType=read) with the **read** scope.

## Add an existing Space to your MCP tools

![image/png](https://cdn-uploads.huggingface.co/production/uploads/5f17f0a0925b9863e28ad517/ex9KRpvamn84ZaOlSp_Bj.png)


1. Browse compatible [Spaces](https://huggingface.co/spaces?filter=mcp-server) to find Spaces that are usable via MCP. You can also look for the grey **MCP** badge on any Spaces overview.
2. Click the badge and choose **Add to MCP tools** then confirm when asked.
3. The Space should be listed in your MCP Server settings in the Spaces Tools section.

![image/png](https://cdn-uploads.huggingface.co/production/uploads/5f17f0a0925b9863e28ad517/uI4PsneUZoWn_TExhNJyt.png)

## Use Spaces from your MCP client 

If your MCP client is configured correctly the Spaces you added will be available instantly without changing anything. Most MCP clients will list what tools are currently loaded, if you did the setup correctly you should see the Space you just added.

> **Note:** For ZeroGPU Spaces, your quota will be used when the tool is called, so make sure you [subscribe to PRO](https://huggingface.co/subscribe/pro?from=ZeroGPU) to get 25 minutes of daily quota (on H200 hardware). For example, this lets you generate up to 600 images per day using FLUX.1-schnell.

## Build your own MCP-compatible Gradio Space

To create your own MCP-enabled Space, you need to [Create a new Gradio Space](https://huggingface.co/new-space?sdk=gradio) then to enable MCP support. See the [complete guide](https://www.gradio.app/guides/building-mcp-server-with-gradio) for more details.


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

> **Note:** It's also quite easy to convert an existing Gradio Space to MCP server. Duplicate it from the context menu then just add the `mcp_server=True` parameter to your `launch()` method, and ensure your functions have clear type hints and docstrings - you can use AI tools to automate this quite easily ([example](https://huggingface.co/spaces/Lightricks/ltx-video-distilled/discussions/22/files) of AI generated docstrings).

## Be creative by mixing Spaces!

As Hugging Face Spaces is the largest directory of AI apps, you can find many creative tools that can be used as MCP tools. Mixing and matching different Spaces can lead to powerful and creative workflows.


<figure>
  <video controls>
    <source src="https://cdn-uploads.huggingface.co/production/uploads/5f17f0a0925b9863e28ad517/jmYCdqYh32iwCgxM9p0Ig.mp4" type="video/mp4">
  </video>  
  <figcaption>
    This video demonstrates the use of
    <a href="https://huggingface.co/spaces/Lightricks/ltx-video-distilled">Lightricks/ltx-video-distilled</a> and
    <a href="https://huggingface.co/spaces/ResembleAI/Chatterbox">ResembleAI/Chatterbox</a> in Claude Code to generate a video with audio.
  </figcaption>
</figure>