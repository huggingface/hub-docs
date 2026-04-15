# How to use OpenAI gpt-oss

<div class="flex justify-center">
<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers-guides/gpt-oss-thumbnail-light.png"/>
</div>

This guide walks you through using OpenAI's latest gpt-oss models with Hugging Face Inference Providers, which is the same infra that powers the official OpenAI playground ([gpt-oss.com](https://gpt-oss.com)). OpenAI gpt-oss is an open-weights family built for strong reasoning, agentic workflows and versatile developer use cases, and it comes in two sizes: a version with 120B parameters [gpt-oss-120b](https://hf.co/openai/gpt-oss-120b), and a smaller one with 20B parameters ([gpt-oss-20b](https://hf.co/openai/gpt-oss-20b)).

Both models are supported on Inference Providers and can be accessed through either the OpenAI-compatible [Chat Completions API](https://platform.openai.com/docs/api-reference/chat/completions), or the more advanced [Responses API](https://platform.openai.com/docs/api-reference/responses).

## Quickstart

1. You'll need your Hugging Face token. Get one from your [settings page](https://huggingface.co/settings/tokens/new?ownUserPermissions=inference.serverless.write&tokenType=fineGrained). Then, set it as an environment variable.

```bash
export HF_TOKEN="your_token_here"
```

> [!TIP]
> 💡 Pro tip: The free tier gives you monthly inference credits to start building and experimenting. All users can purchase additional credits for pay‑as‑you‑go access. Upgrade to [Hugging Face PRO](https://huggingface.co/pro) for $2 in monthly credits!

2. Install the official OpenAI SDK.

<hfoptions id="install">
<hfoption id="python">
```bash
pip install openai
```
</hfoption>

<hfoption id="javascript">
```bash
npm install openai
```
</hfoption>
</hfoptions>

## Chat Completion
Getting started with gpt-oss models on Inference Providers is simple and straightforward. The OpenAI-compatible Chat Completions API supports features like tool calling, structured outputs, streaming, and reasoning effort controls.

Here's a basic example using [gpt-oss-120b](https://hf.co/openai/gpt-oss-120b) through the fast Cerebras provider:

<hfoptions id="simple">
<hfoption id="python">

```python
import os
from openai import OpenAI

client = OpenAI(
    base_url="https://router.huggingface.co/v1",
    api_key=os.getenv("HF_TOKEN"),
)

response = client.chat.completions.create(
    model="openai/gpt-oss-120b:cerebras",
    messages=[{"role": "user", "content": "Tell me a fun fact about the Eiffel Tower."}],
)

print(response.choices[0].message.content)
```

</hfoption>

<hfoption id="javascript">

```ts
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HF_TOKEN,
});

const response = await openai.chat.completions.create({
  model: "openai/gpt-oss-120b:cerebras",
  messages: [{ role: "user", content: "Tell me a fun fact about the Eiffel Tower." }],
});

console.log(response.choices[0].message.content);
```
</hfoption>
</hfoptions>

You can also give the model access to tools. Below, we define a `get_current_weather` function and let the model decide whether to call it:

<hfoptions id="tool-call">
<hfoption id="python">

```python
import os
from openai import OpenAI

client = OpenAI(
    base_url="https://router.huggingface.co/v1",
    api_key=os.getenv("HF_TOKEN"),
)

tools = [
    {
        "type": "function",
        "function": {
            "name": "get_current_weather",
            "description": "Get the current weather in a given location",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {
                        "type": "string",
                        "description": "The city and state, e.g. San Francisco, CA",
                    },
                    "unit": {"type": "string", "enum": ["celsius", "fahrenheit"]},
                },
                "required": ["location"],
            },
        },
    }
]

response = client.chat.completions.create(
    model="openai/gpt-oss-120b:cerebras",
    messages=[{"role": "user", "content": "What is the weather in Paris in Celsius?"}],
    tools=tools,
    tool_choice="auto",
)

# The response will contain the tool_calls object if the model decides to use the tool
print(response.choices[0].message)
```

</hfoption>

<hfoption id="javascript">

```ts
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HF_TOKEN,
});

const tools = [
  {
    type: "function",
    function: {
      name: "get_current_weather",
      description: "Get the current weather in a given location",
      parameters: {
        type: "object",
        properties: {
          location: {
            type: "string",
            description: "The city and state, e.g. San Francisco, CA",
          },
          unit: { type: "string", enum: ["celsius", "fahrenheit"] },
        },
        required: ["location"],
      },
    },
  },
];

const response = await openai.chat.completions.create({
  model: "openai/gpt-oss-120b:cerebras",
  messages: [{ role: "user", content: "What is the weather in Paris in Celsius?" }],
  tools,
  tool_choice: "auto",
});

// The response will contain the tool_calls object if the model decides to use the tool
console.log(response.choices[0].message);
```

</hfoption>
</hfoptions>

For structured tasks like data extraction, you can force the model to return a valid JSON object using the `response_format` parameter. We use the Fireworks AI provider.

<hfoptions id="structured">
<hfoption id="python">

```python
import json
import os

from openai import OpenAI


client = OpenAI(
    base_url="https://router.huggingface.co/v1",
    api_key=os.getenv("HF_TOKEN"),
)

# Force the model to output a JSON object
response = client.chat.completions.create(
    model="openai/gpt-oss-120b:fireworks-ai",
    messages=[
        {
            "role": "system",
            "content": "You are a helpful assistant designed to output JSON.",
        },
        {
            "role": "user",
            "content": "Extract the name, city, and profession from the following sentence: 'Amélie is a chef who lives in Paris.'",
        },
    ],
    response_format={
        "type": "json_schema",
        "json_schema": {
            "name": "person",
            "schema": {
                "type": "object",
                "properties": {
                    "name": {"type": "string"},
                    "city": {"type": "string"},
                    "profession": {"type": "string"},
                },
                "required": ["name", "city", "profession"],
            },
        },
    },
)

# The output is a valid JSON string that can be easily parsed
output_json_string = response.choices[0].message.content
parsed_output = json.loads(output_json_string)

print(parsed_output)
```

</hfoption>
<hfoption id="javascript">

```ts
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HF_TOKEN,
});

// Force the model to output a JSON object
const response = await openai.chat.completions.create({
  model: "openai/gpt-oss-120b:fireworks-ai",
  messages: [
    {
      role: "system",
      content: "You are a helpful assistant designed to output JSON.",
    },
    {
      role: "user",
      content:
        "Extract the name, city, and profession from the following sentence: 'Amélie is a chef who lives in Paris.'",
    },
  ],
  response_format: {
    type: "json_schema",
    json_schema: {
      name: "person",
      schema: {
        type: "object",
        properties: {
          name: { type: "string" },
          city: { type: "string" },
          profession: { type: "string" },
        },
        required: ["name", "city", "profession"],
      },
    },
  },
});

// The output is a valid JSON string that can be easily parsed
const parsedOutput = JSON.parse(response.choices[0].message.content);
console.log(parsedOutput);
```

</hfoption>
</hfoptions>

With just a few lines of code, you can start using gpt-oss models with Hugging Face Inference Providers, fully OpenAI API-compatible, easy to integrate, and ready out of the box!

## Responses API 

Inference Providers implements the **OpenAI-compatible Responses API**, the most advanced interface for chat-based models. It supports streaming, structured outputs, tool calling, reasoning effort controls (low, medium, hard), and Remote MCP calls to delegate tasks to external services.

Key Advantages:
- Agent-Oriented Design: The API is specifically built to simplify workflows for agentic tasks. It has a native framework for integrating complex tool use, such as Remote MCP calls.
- Stateful, Event-Driven Architecture: Features a stateful, event-driven architecture. Instead of resending the entire text on every update, it streams semantic events that describe only the precise change (the "delta"). This eliminates the need for manual state tracking.
- Simplified Development for Complex Logic: The event-driven model makes it easier to build reliable applications with multi-step logic. Your code simply listens for specific events, leading to cleaner and more robust integrations.

> [!TIP]
> The implementation is based on the open-source [huggingface/responses.js](https://github.com/huggingface/responses.js) project.

### Stream responses

Unlike traditional text streaming, the Responses API uses a system of semantic events for streaming. This means the stream is not just raw text, but a series of structured event objects. Each event has a type, so you can listen for the specific events you care about, such as content being added (`output_text.delta`) or the message being completed (`completed`). The example below shows how to iterate through these events and print the content as it arrives.

<hfoptions id="stream">
<hfoption id="python">

```python
import os
from openai import OpenAI


client = OpenAI(
    base_url="https://router.huggingface.co/v1",
    api_key=os.getenv("HF_TOKEN"),
)

# Set stream=True to receive a stream of semantic events
stream = client.responses.create(
    model="openai/gpt-oss-120b:fireworks-ai",
    input="Tell me a short story about a robot who discovers music.",
    stream=True,
)

# Iterate over the events in the stream
for event in stream:
    print(event)
```

</hfoption>

<hfoption id="javascript">

```ts
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HF_TOKEN,
});

// Set stream=true to receive a stream of semantic events
const stream = await openai.responses.create({
  model: "openai/gpt-oss-120b:fireworks-ai",
  input: "Tell me a short story about a robot who discovers music.",
  stream: true,
});

// Iterate over the events in the stream
for await (const event of stream) {
  console.log(event);
}
```

</hfoption>
</hfoptions>

### Tool Calling

You can extend the model with tools to access external data. The example below defines a get_current_weather function that the model can choose to call.

<hfoptions id="tool-call-resp">
<hfoption id="python">

```python
from openai import OpenAI
import os

client = OpenAI(
    base_url="https://router.huggingface.co/v1",
    api_key=os.getenv("HF_TOKEN"),
)

tools = [
    {
        "type": "function",
        "name": "get_current_weather",
        "description": "Get the current weather in a given location",
        "parameters": {
            "type": "object",
            "properties": {
                "location": {
                    "type": "string",
                    "description": "The city and state, e.g. San Francisco, CA",
                },
                "unit": {"type": "string", "enum": ["celsius", "fahrenheit"]},
            },
            "required": ["location", "unit"],
        },
    }
]

response = client.responses.create(
    model="openai/gpt-oss-120b:fireworks-ai", 
    tools=tools,
    input="What is the weather like in Boston today?",
    tool_choice="auto",
)

print(response)
```

</hfoption>

<hfoption id="javascript">

```ts
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HF_TOKEN,
});

const tools = [
  {
    type: "function",
    name: "get_current_weather",
    description: "Get the current weather in a given location",
    parameters: {
      type: "object",
      properties: {
        location: {
          type: "string",
          description: "The city and state, e.g. San Francisco, CA",
        },
        unit: { type: "string", enum: ["celsius", "fahrenheit"] },
      },
      required: ["location", "unit"],
    },
  },
];

const response = await openai.responses.create({
  model: "openai/gpt-oss-120b:fireworks-ai",
  tools,
  input: "What is the weather like in Boston today?",
  tool_choice: "auto",
});

console.log(response);
```

</hfoption>
</hfoptions>

### Remote MCP Calls

The API's most advanced feature is Remote MCP calls, which allow the model to delegate tasks to external services. Calling a remote MCP server with the Responses API is straightforward. For example, here's how you can use the DeepWiki MCP server to ask questions about nearly any public GitHub repository.

<hfoptions id="mcp">
<hfoption id="python">

```python
import os
from openai import OpenAI

client = OpenAI(
    base_url="https://router.huggingface.co/v1",
    api_key=os.getenv("HF_TOKEN"),
)

response = client.responses.create(
    model="openai/gpt-oss-120b:fireworks-ai",
    input="What transport protocols are supported in the 2025-03-26 version of the MCP spec?",
    tools=[
        {
            "type": "mcp",
            "server_label": "deepwiki",
            "server_url": "https://mcp.deepwiki.com/mcp",
            "require_approval": "never",
        },
    ],
)

print(response)
```

</hfoption>

<hfoption id="javascript">

```ts
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HF_TOKEN,
});

const response = await openai.responses.create({
  model: "openai/gpt-oss-120b:fireworks-ai",
  input:
    "What transport protocols are supported in the 2025-03-26 version of the MCP spec?",
  tools: [
    {
      type: "mcp",
      server_label: "deepwiki",
      server_url: "https://mcp.deepwiki.com/mcp",
      require_approval: "never",
    },
  ],
});

console.log(response);
```

</hfoption>
</hfoptions>

### Reasoning Effort

You can also control the model's "thinking" time with the `reasoning` parameter. The following example nudges the model to spend a medium amount of effort on the answer.

<hfoptions id="reasoning">
<hfoption id="python">

```python
from openai import OpenAI
import os

client = OpenAI(
    base_url="https://router.huggingface.co/v1",
    api_key=os.getenv("HF_TOKEN"),
)

response = client.responses.create(
    model="openai/gpt-oss-120b:fireworks-ai",
    instructions="You are a helpful assistant.",
    input="Say hello to the world.",
    reasoning={
        "effort": "low",
    },
)

for index, item in enumerate(response.output):
    print(f"Output #{index}: {item.type}", item.content)
```

</hfoption>
<hfoption id="javascript">

```ts
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HF_TOKEN,
});

const response = await openai.responses.create({
  model: "openai/gpt-oss-120b:fireworks-ai",
  instructions: "You are a helpful assistant.",
  input: "Say hello to the world.",
  reasoning: {
    effort: "low",
  },
});

response.output.forEach((item, index) => {
  console.log(`Output #${index}: ${item.type}`, item.content);
});
```

</hfoption>
</hfoptions>

That's it! With the Responses API on Inference Providers, you get fine-grained control over powerful open-weight models like gpt-oss, including streaming, tool calling, and remote MCP, making it ideal for building reliable, agent-driven applications.

