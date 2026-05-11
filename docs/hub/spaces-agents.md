# Spaces as Agent Tools

Every Gradio Space exposes a plain-text `agents.md` that coding agents (Claude Code, Codex, OpenCode, Pi, etc.) can call directly. Find one via semantic search on [huggingface.co/spaces](https://huggingface.co/spaces) (e.g. "audio transcription"), optionally try it in the UI first, then point your agent at its `agents.md`. The response is four lines: schema URL, call template, poll template, auth hint.

This gets even more powerful when **chaining Spaces**. An agent can turn a prompt into a 3D asset by calling [`black-forest-labs/flux-klein-9b-kv`](https://huggingface.co/spaces/black-forest-labs/flux-klein-9b-kv) for an image, then passing the generated image into [`microsoft/TRELLIS.2`](https://huggingface.co/spaces/microsoft/TRELLIS.2) for the 3D model. No client library, no hardcoded integration.

All you need is an [HF_TOKEN](https://huggingface.co/settings/tokens) set in your environment to get started.

## From the UI

Every compatible Space page has an **Agents** button in the header. Click it to copy the `curl` command for that Space's `agents.md`, then paste it into your agent.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-agents-popover.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-agents-popover-dark.png"/>
</div>

## The agents.md endpoint

```
https://huggingface.co/spaces/<namespace>/<repo>/agents.md
```

Example:

```bash
curl https://huggingface.co/spaces/microsoft/TRELLIS.2/agents.md
```

Returns:

```
To use this application (microsoft/TRELLIS.2: Create 3D model from a single image):
API schema: GET https://microsoft-trellis-2.hf.space/gradio_api/info
Call endpoint: POST https://microsoft-trellis-2.hf.space/gradio_api/call/{endpoint} {"data": [...]}
Poll result: GET https://microsoft-trellis-2.hf.space/gradio_api/call/{endpoint}/{event_id}
Auth: Bearer $HF_TOKEN
```

## Authentication and ZeroGPU

Most popular Spaces run on [ZeroGPU](./spaces-zerogpu), which uses the caller's daily quota. Agents should always pass an `$HF_TOKEN` so calls are billed to your account rather than a throttled anonymous pool. The same token is also required for private Spaces.

```bash
curl -H "Authorization: Bearer $HF_TOKEN" \
  https://microsoft-trellis-2.hf.space/gradio_api/call/predict \
  -d '{"data": [{"path": "https://example.com/chair.png"}]}'
```

## How agents will use this

1. The agent `curl`s `/agents.md` for the Space.
2. It fetches `/gradio_api/info` to learn endpoint names and inputs.
3. It POSTs to `/gradio_api/call/<endpoint>`, then GETs the poll URL to stream the result.
