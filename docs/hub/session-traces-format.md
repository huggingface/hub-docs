# Session Traces Format

Agent traces from Claude Code, Codex, and Pi are supported out of the box (see [Agent Traces](./agent-traces)). If you build your own harness, you can make its sessions render in the same viewer by writing them in the **Session Trace Simple Format (STS-Format)** described below.

The **Session Trace Simple Format (STS-Format)** is a [JSONL](https://jsonlines.org) file (one JSON object per line) that the Hugging Face Hub detects and renders in its trace viewer. It captures a single agent/chat session as a header line followed by message lines.

## 1. Session header (first line)

```json
{ "type": "session", "harness": "my-agent", "id": "b1a2c3", "name": "Implementing a new API" }
```

| field     | required | notes                                             |
| --------- | -------- | ------------------------------------------------- |
| `type`    | yes      | must be `"session"`                               |
| `harness` | yes      | **the id of the harness** that produced the trace |
| `id`      | yes      | unique session id                                 |
| `name`    | no       | human-readable title                              |
| …         | no       | any extra metadata is allowed and ignored         |

`harness` is the key field: it is **the id of the harness**, and it tells the Hub which renderer, icon, and label to use for the session. Currently recognized ids: `llama.app`. It is very easy to add a new harness identifier here.

> Building a harness of your own? Ping us and we'll add an icon and label for it so your sessions render with your branding.

## 2. Messages (every following line)

Each line is one message in an envelope:

```json
{ "type": "message", "message": { "role": "assistant", "content": "…" } }
```

The `message` object:

| field              | required | notes                                                                                                  |
| ------------------ | -------- | ------------------------------------------------------------------------------------------------------ |
| `role`             | yes      | `"user"` · `"assistant"` · `"system"` · `"tool"`                                                       |
| `content`          | yes      | text (may be empty)                                                                                    |
| `reasoningContent` | no       | model reasoning, shown as a separate thinking block                                                    |
| `toolCalls`        | no       | assistant tool calls: `[{ "id", "function": { "name", "arguments" } }]` (`arguments` is a JSON string) |
| `toolCallId`       | no       | on a `role: "tool"` message, links the result to the `toolCalls[].id` it answers                       |
| `timestamp`        | no       | epoch milliseconds                                                                                     |
| `model`            | no       | model name                                                                                             |

Tool results are messages with `role: "tool"` carrying a `toolCallId`; the viewer stitches each result next to the call that produced it.

### Example

```jsonl
{"type":"session","harness":"my-agent","id":"abc123","name":"what time is it"}
{"type":"message","message":{"role":"user","content":"what time is it?"}}
{"type":"message","message":{"role":"assistant","content":"","toolCalls":[{"id":"t1","function":{"name":"get_time","arguments":"{}"}}]}}
{"type":"message","message":{"role":"tool","toolCallId":"t1","content":"2026-07-01T15:00:00Z"}}
{"type":"message","message":{"role":"assistant","content":"it is 15:00 UTC"}}
```

Upload the resulting `.jsonl` to a [Dataset](https://huggingface.co/datasets) or a [Storage Bucket](./storage-buckets) to open it in the trace viewer.

## Alternative: Pi's session format

If you'd rather not adopt the shape above, you can emit **Pi's session format** ([session-format.md](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/session-format.md)), which the Hub already supports. In that case, add a `harness: "..."` field to Pi's session-header line as well, so the Hub can attribute the trace to your harness.
