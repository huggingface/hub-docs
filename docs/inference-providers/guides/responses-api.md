# Responses API (beta)

The Responses API (from OpenAI) provides a unified interface for model interactions with Hugging Face Inference Providers. Use your existing OpenAI SDKs to access features like multi-provider routing, event streaming, structured outputs, and Remote MCP tools.

> [!TIP]
> This guide assumes you have a Hugging Face account and access token. You can create a free account at [huggingface.co](https://huggingface.co) and get your token from your [settings page](https://huggingface.co/settings/tokens).

## Why build with the Responses API?

The Responses API provides a unified interface built for agentic apps. With it, you get:

- **Built-in tool orchestration.** Invoke functions, server-side MCP tools, and schema-validated outputs without changing endpoints.
- **Event-driven streaming.** Receive semantic events such as `response.created`, `output_text.delta`, and `response.completed` to power incremental UIs.
- **Reasoning controls and structured outputs.** Dial up or down reasoning effort and require models to return schema-compliant JSON every time.

## Prerequisites

- A Hugging Face account with remaining Inference Providers credits (free tier available).
- A fine-grained [Hugging Face token](https://huggingface.co/settings/tokens) with “Make calls to Inference Providers” permission stored in `HF_TOKEN`.

> [!TIP]
> All Inference Providers chat completion models should be compatible with the Responses API. You can browse available models on the [Inference Models page](https://huggingface.co/inference/models).

## Configure your Responses client

Install the OpenAI SDK for your language of choice before running the snippets below (`pip install openai` for Python or `npm install openai` for Node.js). If you prefer issuing raw HTTP calls, any standard tool such as `curl` will work as well.

<hfoptions id="responses-first-call">

<hfoption id="python">

```python
import os
from openai import OpenAI

client = OpenAI(
    base_url="https://router.huggingface.co/v1",
    api_key=os.getenv("HF_TOKEN"),
)

response = client.responses.create(
    model="openai/gpt-oss-120b:groq",
    instructions="You are a helpful assistant.",
    input="Tell me a three-sentence bedtime story about a unicorn.",
)

print(response.output_text)
```

</hfoption>

<hfoption id="typescript">

```ts
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HF_TOKEN,
});

const response = await client.responses.create({
  model: "openai/gpt-oss-120b:groq",
  instructions: "You are a helpful assistant.",
  input: "Tell me a three-sentence bedtime story about a unicorn.",
});

console.log(response.output_text);
```

</hfoption>

<hfoption id="curl">

```bash
curl https://router.huggingface.co/v1/responses \
  -H "Authorization: Bearer $HF_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/gpt-oss-120b:groq",
    "instructions": "You are a helpful assistant.",
    "input": "Tell me a three-sentence bedtime story about a unicorn."
  }'
```

</hfoption>

</hfoptions>


> [!TIP]
> If you plan to use a specific provider, append it to the model id as `<repo>:<provider>` (for example `moonshotai/Kimi-K2-Instruct-0905:groq`). Otherwise, omit the suffix and let routing fall back to the default provider.

## Core Response patterns

### Plain text output

For a single response message, pass a string as input. The Responses API returns both the full `response` object and a convenience `output_text` helper.

<hfoptions id="responses-text">

<hfoption id="python">

```python
from openai import OpenAI
import os

client = OpenAI(
    base_url="https://router.huggingface.co/v1",
    api_key=os.getenv("HF_TOKEN"),
)

response = client.responses.create(
    model="moonshotai/Kimi-K2-Instruct-0905:groq",
    instructions="You are a helpful assistant.",
    input="Tell me a three sentence bedtime story about a unicorn.",
)

print(response.output_text)
```

</hfoption>

<hfoption id="typescript">

```ts
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HF_TOKEN,
});

const response = await client.responses.create({
  model: "moonshotai/Kimi-K2-Instruct-0905:groq",
  instructions: "You are a helpful assistant.",
  input: "Tell me a three sentence bedtime story about a unicorn.",
});

console.log(response.output_text);
```

</hfoption>

<hfoption id="curl">

```bash
curl https://router.huggingface.co/v1/responses \
  -H "Authorization: Bearer $HF_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "moonshotai/Kimi-K2-Instruct-0905:groq",
    "instructions": "You are a helpful assistant.",
    "input": "Tell me a three sentence bedtime story about a unicorn."
  }'
```

</hfoption>

</hfoptions>

### Multimodal inputs

Mix text and vision content by passing a list of content parts. The Responses API unifies text and images into a single `input` array.

<hfoptions id="responses-multimodal">

<hfoption id="python">

```python
from openai import OpenAI
import os

client = OpenAI(
    base_url="https://router.huggingface.co/v1",
    api_key=os.getenv("HF_TOKEN"),
)

response = client.responses.create(
    model="Qwen/Qwen2.5-VL-7B-Instruct",
    input=[
        {
            "role": "user",
            "content": [
                {"type": "input_text", "text": "what is in this image?"},
                {
                    "type": "input_image",
                    "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
                },
            ],
        }
    ],
)

print(response.output_text)
```

</hfoption>

<hfoption id="typescript">

```ts
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HF_TOKEN,
});

const response = await client.responses.create({
  model: "Qwen/Qwen2.5-VL-7B-Instruct",
  input: [
    {
      role: "user",
      content: [
        { type: "input_text", text: "what is in this image?" },
        {
          type: "input_image",
          image_url:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
        },
      ],
    },
  ],
});

console.log(response.output_text);
```

</hfoption>

<hfoption id="curl">

```bash
curl https://router.huggingface.co/v1/responses \
  -H "Authorization: Bearer $HF_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "Qwen/Qwen2.5-VL-7B-Instruct",
    "input": [
      {
        "role": "user",
        "content": [
          {"type": "input_text", "text": "what is in this image?"},
          {
            "type": "input_image",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg"
          }
        ]
      }
    ]
  }'
```

</hfoption>

</hfoptions>

### Multi-turn conversations

Responses requests accept conversation history. Add `developer`, `system`, and `user` messages to control the assistant's behavior without managing chat state yourself.

<hfoptions id="responses-multiturn">

<hfoption id="python">

```python
from openai import OpenAI
import os

client = OpenAI(
    base_url="https://router.huggingface.co/v1",
    api_key=os.getenv("HF_TOKEN"),
)

response = client.responses.create(
    model="moonshotai/Kimi-K2-Instruct-0905:groq",
    input=[
        {"role": "developer", "content": "Talk like a pirate."},
        {"role": "user", "content": "Are semicolons optional in JavaScript?"},
    ],
)

print(response.output_text)
```

</hfoption>

<hfoption id="typescript">

```ts
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HF_TOKEN,
});

const response = await client.responses.create({
  model: "moonshotai/Kimi-K2-Instruct-0905:groq",
  input: [
    { role: "developer", content: "Talk like a pirate." },
    { role: "user", content: "Are semicolons optional in JavaScript?" },
  ],
});

console.log(response.output_text);
```

</hfoption>

<hfoption id="curl">

```bash
curl https://router.huggingface.co/v1/responses \
  -H "Authorization: Bearer $HF_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "moonshotai/Kimi-K2-Instruct-0905:groq",
    "input": [
      {"role": "developer", "content": "Talk like a pirate."},
      {"role": "user", "content": "Are semicolons optional in JavaScript?"}
    ]
  }'
```

</hfoption>

</hfoptions>

## Advanced features

Advanced features use the same request format.

### Event-based streaming

Set `stream=True` to receive incremental `response.*` events. Each event arrives as JSON, so you can render words as they stream in or monitor tool execution in real time.

<hfoptions id="responses-streaming">

<hfoption id="python">

```python
from openai import OpenAI
import os

client = OpenAI(
    base_url="https://router.huggingface.co/v1",
    api_key=os.getenv("HF_TOKEN"),
)

stream = client.responses.create(
    model="moonshotai/Kimi-K2-Instruct-0905:groq",
    input=[{"role": "user", "content": "Say 'double bubble bath' ten times fast."}],
    stream=True,
)

for event in stream:
    print(event)
```

</hfoption>

<hfoption id="typescript">

```ts
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HF_TOKEN,
});

const stream = await client.responses.create({
  model: "moonshotai/Kimi-K2-Instruct-0905:groq",
  input: [{ role: "user", content: "Say 'double bubble bath' ten times fast." }],
  stream: true,
});

for await (const event of stream) {
  console.log(event);
}
```

</hfoption>

<hfoption id="curl">

```bash
curl -N https://router.huggingface.co/v1/responses \
  -H "Authorization: Bearer $HF_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "moonshotai/Kimi-K2-Instruct-0905:groq",
    "input": [
      {"role": "user", "content": "Say \"double bubble bath\" ten times fast."}
    ],
    "stream": true
  }'
```

</hfoption>

</hfoptions>

### Tool calling and routing

Add a `tools` array to let the model call your functions. The router handles the function calls and returns tool events.

<hfoptions id="responses-tools">

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
                "location": {"type": "string", "description": "The city and state, e.g. San Francisco, CA"},
                "unit": {"type": "string", "enum": ["celsius", "fahrenheit"]},
            },
            "required": ["location", "unit"],
        },
    }
]

response = client.responses.create(
    model="moonshotai/Kimi-K2-Instruct-0905:groq",
    tools=tools,
    input="What is the weather like in Boston today?",
    tool_choice="auto",
)

print(response)
```

</hfoption>

<hfoption id="typescript">

```ts
import OpenAI from "openai";

const client = new OpenAI({
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
        location: { type: "string", description: "The city and state, e.g. San Francisco, CA" },
        unit: { type: "string", enum: ["celsius", "fahrenheit"] },
      },
      required: ["location", "unit"],
    },
  },
];

const response = await client.responses.create({
  model: "moonshotai/Kimi-K2-Instruct-0905:groq",
  tools,
  input: "What is the weather like in Boston today?",
  tool_choice: "auto",
});

console.log(response);
```

</hfoption>

<hfoption id="curl">

```bash
curl https://router.huggingface.co/v1/responses \
  -H "Authorization: Bearer $HF_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "moonshotai/Kimi-K2-Instruct-0905:groq",
    "input": "What is the weather like in Boston today?",
    "tool_choice": "auto",
    "tools": [
      {
        "type": "function",
        "name": "get_current_weather",
        "description": "Get the current weather in a given location",
        "parameters": {
          "type": "object",
          "properties": {
            "location": {"type": "string", "description": "The city and state, e.g. San Francisco, CA"},
            "unit": {"type": "string", "enum": ["celsius", "fahrenheit"]}
          },
          "required": ["location", "unit"]
        }
      }
    ]
  }'
```

</hfoption>

</hfoptions>

### Structured outputs

Force the model to return JSON matching a schema by supplying a `response_format`. The Python SDK exposes a `.parse` helper that converts the response directly into your target type.

> [!NOTE]
> When calling `openai/gpt-oss-120b:groq` from JavaScript or raw HTTP, include a brief instruction to return JSON. Without it the model may emit markdown even when a schema is provided.

<hfoptions id="responses-structured">

<hfoption id="python">

```python
from openai import OpenAI
from pydantic import BaseModel
import os

client = OpenAI(
    base_url="https://router.huggingface.co/v1",
    api_key=os.getenv("HF_TOKEN"),
)

class CalendarEvent(BaseModel):
    name: str
    date: str
    participants: list[str]

response = client.responses.parse(
    model="openai/gpt-oss-120b:groq",
    input=[
        {"role": "system", "content": "Extract the event information."},
        {"role": "user", "content": "Alice and Bob are going to a science fair on Friday."},
    ],
    text_format=CalendarEvent,
)

print(response.output_parsed)
```

</hfoption>

<hfoption id="typescript">

```ts
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HF_TOKEN,
});

const response = await client.responses.create({
  model: "openai/gpt-oss-120b:groq",
  instructions: "Return JSON that matches the CalendarEvent schema (fields name, date, participants).",
  input: [
    { role: "system", content: "Extract the event information." },
    { role: "user", content: "Alice and Bob are going to a science fair on Friday." },
  ],
  response_format: {
    type: "json_schema",
    json_schema: {
      name: "CalendarEvent",
      schema: {
        type: "object",
        properties: {
          name: { type: "string" },
          date: { type: "string" },
          participants: {
            type: "array",
            items: { type: "string" },
          },
        },
        required: ["name", "date", "participants"],
        additionalProperties: false,
      },
      strict: true,
    },
  },
});

const parsed = JSON.parse(response.output_text);
console.log(parsed);
```

</hfoption>

<hfoption id="curl">

```bash
curl https://router.huggingface.co/v1/responses \
  -H "Authorization: Bearer $HF_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/gpt-oss-120b:groq",
    "instructions": "Return JSON that matches the CalendarEvent schema (fields name, date, participants).",
    "input": [
      {"role": "system", "content": "Extract the event information."},
      {"role": "user", "content": "Alice and Bob are going to a science fair on Friday."}
    ],
    "response_format": {
      "type": "json_schema",
      "json_schema": {
        "name": "CalendarEvent",
        "schema": {
          "type": "object",
          "properties": {
            "name": {"type": "string"},
            "date": {"type": "string"},
            "participants": {
              "type": "array",
              "items": {"type": "string"}
            }
          },
          "required": ["name", "date", "participants"],
          "additionalProperties": false
        },
        "strict": true
      }
    }
  }'
```

</hfoption>

</hfoptions>

### Remote MCP execution

Remote MCP lets you call server-hosted tools that implement the Model Context Protocol. Provide the MCP server URL and allowed tools, and the Responses API handles the calls for you.

<hfoptions id="responses-mcp">

<hfoption id="python">

```python
from openai import OpenAI
import os

client = OpenAI(
    base_url="https://router.huggingface.co/v1",
    api_key=os.getenv("HF_TOKEN"),
)

response = client.responses.create(
    model="moonshotai/Kimi-K2-Instruct-0905:groq",
    input="how does tiktoken work?",
    tools=[
        {
            "type": "mcp",
            "server_label": "gitmcp",
            "server_url": "https://gitmcp.io/openai/tiktoken",
            "allowed_tools": ["search_tiktoken_documentation", "fetch_tiktoken_documentation"],
            "require_approval": "never",
        },
    ],
)

for output in response.output:
    print(output)
```

</hfoption>

<hfoption id="typescript">

```ts
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HF_TOKEN,
});

const response = await client.responses.create({
  model: "moonshotai/Kimi-K2-Instruct-0905:groq",
  input: "how does tiktoken work?",
  tools: [
    {
      type: "mcp",
      server_label: "gitmcp",
      server_url: "https://gitmcp.io/openai/tiktoken",
      allowed_tools: ["search_tiktoken_documentation", "fetch_tiktoken_documentation"],
      require_approval: "never",
    },
  ],
});

for (const output of response.output) {
  console.log(output);
}
```

</hfoption>

<hfoption id="curl">

```bash
curl https://router.huggingface.co/v1/responses \
  -H "Authorization: Bearer $HF_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "moonshotai/Kimi-K2-Instruct-0905:groq",
    "input": "how does tiktoken work?",
    "tools": [
      {
        "type": "mcp",
        "server_label": "gitmcp",
        "server_url": "https://gitmcp.io/openai/tiktoken",
        "allowed_tools": ["search_tiktoken_documentation", "fetch_tiktoken_documentation"],
        "require_approval": "never"
      }
    ]
  }'
```

</hfoption>

</hfoptions>

### Reasoning effort controls

Some open-source reasoning models expose effort tiers. Pass `reasoning={"effort": "low" | "medium" | "high"}` to trade off latency and depth.

<hfoptions id="responses-reasoning">

<hfoption id="python">

```python
from openai import OpenAI
import os

client = OpenAI(
    base_url="https://router.huggingface.co/v1",
    api_key=os.getenv("HF_TOKEN"),
)

response = client.responses.create(
    model="deepseek-ai/DeepSeek-R1",
    instructions="You are a helpful assistant.",
    input="Say hello to the world.",
    reasoning={"effort": "low"},
)

for i, item in enumerate(response.output):
    print(f"Output #{i}: {item.type}", item.content)
```

</hfoption>

<hfoption id="typescript">

```ts
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HF_TOKEN,
});

const response = await client.responses.create({
  model: "deepseek-ai/DeepSeek-R1",
  instructions: "You are a helpful assistant.",
  input: "Say hello to the world.",
  reasoning: { effort: "low" },
});

response.output.forEach((item, index) => {
  console.log(`Output #${index}: ${item.type}`, item.content);
});
```

</hfoption>

<hfoption id="curl">

```bash
curl https://router.huggingface.co/v1/responses \
  -H "Authorization: Bearer $HF_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "deepseek-ai/DeepSeek-R1",
    "instructions": "You are a helpful assistant.",
    "input": "Say hello to the world.",
    "reasoning": {"effort": "low"}
  }'
```

</hfoption>

</hfoptions>

## API reference

Read the official [OpenAI Responses reference](https://platform.openai.com/docs/api-reference/responses).
