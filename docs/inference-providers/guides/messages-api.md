# Messages API

The Messages API (from Anthropic) lets you call Inference Providers with the Anthropic SDKs. It works with every chat model, whatever the provider serving it, and it's the API [Claude Code](../integrations/claude-code) uses.

## Prerequisites

- A Hugging Face account with compute credits (purchased, or included with PRO, Team, or Enterprise).
- A fine-grained [Hugging Face token](https://huggingface.co/settings/tokens/new?ownUserPermissions=inference.serverless.write&tokenType=fineGrained) with the "Make calls to Inference Providers" permission, stored in `HF_TOKEN`.

## Configure your client

Install the Anthropic SDK (`pip install anthropic` for Python or `npm install @anthropic-ai/sdk` for Node.js), then point it at `https://router.huggingface.co`. Pass your token as `auth_token` (`authToken` in TypeScript): the router expects an `Authorization: Bearer` header and doesn't accept `x-api-key`.

<hfoptions id="messages-first-call">

<hfoption id="python">

```python
import os
from anthropic import Anthropic

client = Anthropic(
    base_url="https://router.huggingface.co",
    auth_token=os.environ["HF_TOKEN"],
)

message = client.messages.create(
    model="deepseek-ai/DeepSeek-V4.1-Flash",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Why is the sky blue? One sentence."}],
)

print(next(block.text for block in message.content if block.type == "text"))
```

</hfoption>

<hfoption id="typescript">

```ts
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  baseURL: "https://router.huggingface.co",
  authToken: process.env.HF_TOKEN,
});

const message = await client.messages.create({
  model: "deepseek-ai/DeepSeek-V4.1-Flash",
  max_tokens: 1024,
  messages: [{ role: "user", content: "Why is the sky blue? One sentence." }],
});

console.log(message.content.find(block => block.type === "text")?.text);
```

</hfoption>

<hfoption id="curl">

```bash
curl https://router.huggingface.co/v1/messages \
  -H "Authorization: Bearer $HF_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "deepseek-ai/DeepSeek-V4.1-Flash",
    "max_tokens": 1024,
    "messages": [{"role": "user", "content": "Why is the sky blue? One sentence."}]
  }'
```

</hfoption>

</hfoptions>

> [!TIP]
> `max_tokens` is required. Reasoning models return a `thinking` block before the text and spend part of `max_tokens` on it, so leave them enough room.

To pick a provider, append it to the model id (for example `deepseek-ai/DeepSeek-V4.1-Flash:novita`), or use `:fastest` or `:cheapest`. Without a suffix, the request uses the [default routing](../routing#default-routing).

## Streaming

<hfoptions id="messages-streaming">

<hfoption id="python">

```python
with client.messages.stream(
    model="deepseek-ai/DeepSeek-V4.1-Flash",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Count from 1 to 5."}],
) as stream:
    for text in stream.text_stream:
        print(text, end="", flush=True)
```

</hfoption>

<hfoption id="typescript">

```ts
const stream = client.messages.stream({
  model: "deepseek-ai/DeepSeek-V4.1-Flash",
  max_tokens: 1024,
  messages: [{ role: "user", content: "Count from 1 to 5." }],
});

stream.on("text", text => process.stdout.write(text));
await stream.finalMessage();
```

</hfoption>

</hfoptions>

With `"stream": true`, the HTTP API sends the standard Messages events: `message_start`, `content_block_start`, `content_block_delta`, `content_block_stop`, `message_delta` and `message_stop`.

## Tool use

Define tools with a JSON Schema. When the model calls one, the response stops with `stop_reason: "tool_use"`: run the tool, then send its result back in a `tool_result` block.

```python
tools = [
    {
        "name": "get_weather",
        "description": "Get the current weather in a city",
        "input_schema": {
            "type": "object",
            "properties": {"city": {"type": "string"}},
            "required": ["city"],
        },
    }
]
messages = [{"role": "user", "content": "What's the weather in Paris?"}]

response = client.messages.create(
    model="deepseek-ai/DeepSeek-V4.1-Flash",
    max_tokens=1024,
    tools=tools,
    messages=messages,
)
tool_use = next(block for block in response.content if block.type == "tool_use")
print(tool_use.name, tool_use.input)  # get_weather {'city': 'Paris'}

messages += [
    {"role": "assistant", "content": response.content},
    {"role": "user", "content": [{"type": "tool_result", "tool_use_id": tool_use.id, "content": "18°C and sunny"}]},
]
response = client.messages.create(
    model="deepseek-ai/DeepSeek-V4.1-Flash",
    max_tokens=1024,
    tools=tools,
    messages=messages,
)
print(next(block.text for block in response.content if block.type == "text"))
```

## Use it with Claude Code

Claude Code talks to the Messages API, so any chat model on Inference Providers can back it. See [Claude Code](../integrations/claude-code) for the setup.
