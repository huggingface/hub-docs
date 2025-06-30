# Spaces as MCP servers

You can **expose any public Space that has a visible `MCP` badge into a callable tool** that will be available in any MCP-compatible client, you can add as many Spaces as you want and without writing a single line of code.

## Setup your MCP Client

From your [Hub MCP settings](https://huggingface.co/settings/mcp), select your MCP client (VSCode, Cursor, Claude Code, etc.) then follow the setup instructions. 

![image/png](https://cdn-uploads.huggingface.co/production/uploads/5f17f0a0925b9863e28ad517/wWm_GeuWF17OrMyJT4tMx.png)


<Tip warning={true}>
You need a valid Hugging Face token with <strong>READ</strong> permissions to use MCP tools. If you don't have one, <a href="https://huggingface.co/settings/tokens/new?tokenType=read" target="_blank">create a new "Read" access token here</a>.
</Tip>

## Add an existing Space to your MCP tools

![image/png](https://cdn-uploads.huggingface.co/production/uploads/5f17f0a0925b9863e28ad517/ex9KRpvamn84ZaOlSp_Bj.png)


1. Browse compatible [Spaces](https://huggingface.co/spaces?filter=mcp-server) to find Spaces that are usable via MCP. You can also look for the grey **MCP** badge on any Spaces card.
2. Click the badge and choose **Add to MCP tools** then confirm when asked.
3. The Space should be listed in your MCP Server settings in the Spaces Tools section.

![image/png](https://cdn-uploads.huggingface.co/production/uploads/5f17f0a0925b9863e28ad517/uI4PsneUZoWn_TExhNJyt.png)

## Use Spaces from your MCP client 

If your MCP client is configured correctly, the Spaces you added will be available instantly without changing anything (if it doesn't restart your client and it should appear). Most MCP clients will list what tools are currently loaded so you can make sure the Space is available.

<Tip>
For ZeroGPU Spaces, your quota will be used when the tool is called, if you run out of quota you can <a href="https://huggingface.co/subscribe/pro?from=ZeroGPU" target="_blank">subscribe to PRO</a> to get 25 minutes of daily quota (x8 more quota than free users). For example your PRO account lets you generate up to 600 images per day using FLUX.1-schnell.
</Tip>

## Build your own MCP-compatible Gradio Space

To create your own MCP-enabled Space, you need to [Create a new Gradio Space](https://huggingface.co/new-space?sdk=gradio) then make sure to enable MCP support in the code. Get started with [Gradio Spaces](https://huggingface.co/docs/hub/en/spaces-sdks-gradio) and make sure to check the [detailed MCP guide](https://www.gradio.app/guides/building-mcp-server-with-gradio) for more details.


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

<Tip>
It's also quite easy to convert an existing Gradio Space to MCP server. Duplicate it from the context menu then just add the <code>mcp_server=True</code> parameter to your <code>launch()</code> method, and ensure your functions have clear type hints and docstrings - you can use AI tools to automate this quite easily (<a href="https://huggingface.co/spaces/Lightricks/ltx-video-distilled/discussions/22/files" target="_blank">example</a> of AI generated docstrings).
</Tip>

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