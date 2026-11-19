# Agent Traces

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/datasets/agent-traces-preview-light.webp" alt="Agent trace preview on a dataset page in light mode."/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/datasets/agent-traces-preview-dark.webp" alt="Agent trace preview on a dataset page in dark mode."/>
</div>

Agent traces from Claude Code, Codex, Pi, Hermes Agent, and Factory Droid are natively supported on the Hugging Face Hub. Upload the raw JSONL sessions to a [Dataset](https://huggingface.co/datasets?format=format%3Aagent-traces) or a [Storage Bucket](./storage-buckets) to open them in a dedicated trace viewer. Datasets show traces in Data Studio; buckets let you open individual `.jsonl` files directly.

Requests routed through OpenRouter can also be exported straight to a bucket and opened in the same viewer, see [OpenRouter Broadcast traces](#openrouter-broadcast-traces).

## Find your traces

Most supported agents write JSONL sessions to local directories:

| Agent         | Local session directory      |
| ------------- | ---------------------------- |
| Claude Code   | `~/.claude/projects`         |
| Codex         | `~/.codex/sessions`          |
| Codex archive | `~/.codex/archived_sessions` |
| Factory/Droid | `~/.factory/sessions`        |
| Pi            | `~/.pi/agent/sessions`       |

These trace files are supported out of the box, so you can upload them without modifying or converting them first.

Hermes Agent stores current sessions in its session database. Export the sessions you want to share as JSONL before uploading:

```bash
hermes sessions export session.jsonl --session-id <session_id>
```

<Tip>

Are you building your own harness? If your agent isn't listed above, you can make its sessions render in the trace viewer by emitting the [Session Traces Format](./session-traces-format).

</Tip>

Trace files can include prompts, tool inputs, command output, local paths, screenshots, secrets, private code, and personal data. Review and redact traces before publishing them publicly, or keep the dataset or bucket private if you are not sure what is inside.

For Pi Agent sessions, [`pi-share-hf`](https://github.com/badlogic/pi-share-hf) can help collect project sessions, redact known secrets, run TruffleHog and LLM review, and upload only sessions that pass checks.

<Tip>

The easiest way to upload is to ask your agent itself: point it at the directory or exported JSONL file above and tell it to upload the `.jsonl` files to a Hub dataset or bucket.

Buckets are especially useful if you want to keep syncing traces as new sessions land.

</Tip>

## Upload your traces

After creating a dataset or bucket, install the `hf` CLI with the [recommended standalone installer](/docs/huggingface_hub/guides/cli#getting-started) and log in. The installer also sets up the [Hugging Face CLI Skill](./agents-cli), so your coding agent can run `hf` commands for you.

```bash
curl -LsSf https://hf.co/cli/install.sh | bash
hf auth login

hf upload <username>/<dataset-name> ~/.codex/sessions . --repo-type dataset
hf buckets sync ~/.codex/sessions hf://buckets/<username>/<bucket-name>/codex
```

Replace `~/.codex/sessions` with the matching session directory for your agent, or with a directory containing JSONL files exported from Hermes Agent. Use `hf upload` for datasets and `hf buckets sync` for buckets you want to update as new traces are written. The shorter `hf sync` command is an alias for `hf buckets sync`.

## View your traces

Once you have traces in a dataset, open Data Studio and click a row. For traces in a Storage Bucket, navigate to the `.jsonl` file you want to inspect and open it. The trace viewer shows the session timeline, prompts, assistant messages, tool calls, shell output, reasoning blocks, and results.

<div class="flex justify-center">
<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/datasets/agent-traces-session.webp" alt="Agent trace session viewer showing user and assistant turns with expanded tool calls."/>
</div>

For a public example, open [`TeichAI/DeepSeek-v4-Pro-Agent`](https://huggingface.co/datasets/TeichAI/DeepSeek-v4-Pro-Agent). You can also browse more datasets tagged as [`traces`](https://huggingface.co/datasets?format=format%3Aagent-traces).

## OpenRouter Broadcast traces

[OpenRouter Broadcast](https://openrouter.ai/docs/guides/features/broadcast/overview) can send traces of the requests you route through OpenRouter to a [Storage Bucket](./storage-buckets), and the Hub opens those files in the trace viewer. Nothing changes in your app or agent, so it works for anything that goes through OpenRouter: Claude Code or Codex pointed at OpenRouter, OpenCode, or a plain chat-completions app.

To set it up, create a bucket, [generate S3 credentials](./storage-buckets-s3#generating-s3-credentials) from a token with write access to it, and add **Hugging Face Storage Buckets** as a destination under **Settings > Observability** in OpenRouter. OpenRouter's [Hugging Face Storage Buckets guide](https://openrouter.ai/docs/guides/features/broadcast/hugging-face) has the full steps.

Create the bucket as private:

```bash
hf buckets create <username>/openrouter-traces --private
```

The files hold full prompts, system prompts, and tool output such as file paths and shell output, along with your OpenRouter account and user IDs and the name of the API key. OpenRouter's guide doesn't cover bucket visibility, and anyone can read a public bucket.

Each trace is saved as a separate JSON file named `{traceId}-{timestamp}.json`. With the default path template, `openrouter-traces/{date}`, they land in a folder per day:

```text
openrouter-traces/<date>/gen-<unix>-<id>-<timestamp>.json
```

A trace is one model request, not a whole session. A single agent turn usually makes several model requests, so a three-turn session can produce around ten files. Each file contains the conversation up to that request, which means the last file of a session holds the whole session. Files from the same session share the same `trace.sessionId`.

Open any of these `.json` files in the bucket to see it as an **OpenRouter trace**, with a toggle between the trace view and the raw JSON. The viewer shows the messages, tool calls and results, the model, token counts (including cached tokens), and cost. The cost in the footer is for that one request, not for the session.

<!-- TODO(cfahlgren1): add a screenshot of an OpenRouter trace in the bucket viewer, taken from a bucket with no real identifiers. -->

Two things to know when reading these traces:

- Images are not stored. OpenRouter [strips multimodal content](https://openrouter.ai/docs/guides/features/broadcast/overview) from the messages before exporting, and the viewer shows `[image]` in its place.
- Some requests may be missing or have no content. OpenRouter's sampling rate and API key filters limit which requests are sent to a destination, and Privacy Mode removes the prompt and completion content.
