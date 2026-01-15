# Vision Agents

[Vision Agents](https://visionagents.ai/) is an SDK for building real-time AI applications with support for text and vision language models, streaming responses, and video understanding.

## Overview

Vision Agents natively supports Hugging Face Inference Providers, giving you access to thousands of models through a unified API. The integration supports multiple inference providers including Together AI, Groq, Cerebras, Replicate, and Fireworks.

The Hugging Face plugin offers two implementations:
- **HuggingFace LLM**: Text-only language model with streaming responses and function calling
- **HuggingFace VLM**: Vision language model with automatic video frame buffering for real-time video understanding

## Prerequisites

A Hugging Face account with an [API token](https://huggingface.co/settings/tokens/new?ownUserPermissions=inference.serverless.write&tokenType=fineGrained) (needs "Make calls to Inference Providers" permission)

Export your token as an environment variable:

```bash
export HF_TOKEN=your_huggingface_token
```

## Installation

Install Vision Agents with the Hugging Face plugin:

```bash
uv add vision-agents[huggingface]
```

## Usage

### LLM

When initializing the LLM, specify the model ID and optionally the provider:

```python
from vision_agents.huggingface import HuggingFaceLLM

llm = HuggingFaceLLM(
      model="meta-llama/Meta-Llama-3-8B-Instruct",
      provider="together"  # Optional: "fastest", "cheapest", "groq", "together", etc.
)
```

Once `llm` is instantiated, you can use it like this:

```py
response = await llm.simple_response("Hello, how are you?")
print(response.text)
```

You can also register Python functions as tools to be called by the LLM:

```py
from vision_agents.plugins import huggingface

llm = huggingface.LLM(model="meta-llama/Meta-Llama-3-8B-Instruct")

@llm.register_function()
def get_weather(city: str) -> str:
    """Get the current weather for a city."""
    return f"The weather in {city} is sunny."

response = await llm.simple_response("What's the weather in Paris?")
```

> [!TIP]
> Looking for a compatible model? Check out [this table](https://huggingface.co/inference/models) for a full list of supported models with providers, pricing, context length, latency, throughput, etc.

### VLM

LLMs are nice but now let's use Vision Agents to plug a VLM in a video stream to get real-time video understanding!

```py
from vision_agents.plugins import huggingface, getstream, deepgram
from vision_agents.core import Agent, User

agent = Agent(
    edge=getstream.Edge(),
    agent_user=User(name="AI Assistant", id="agent"),
    instructions="You are a helpful visual assistant.",
    llm=huggingface.VLM(
        model="Qwen/Qwen2-VL-7B-Instruct",
        fps=1,
        frame_buffer_seconds=10,
    ),
)
```

Once the Agent is defined, simply ask what's in the video:

```py
response = await vlm.simple_response("What do you see?")
print(response.text)
```

## Resources

- [Vision Agents Documentation](https://visionagents.ai/)
- [Vision Agents Guides](https://visionagents.ai/guides/video-processors)
- [GitHub repo](https://github.com/GetStream/Vision-Agents)
