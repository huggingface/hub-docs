# Agent traces

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/datasets/agent-traces-preview-light.webp" alt="Agent trace preview on a dataset page in light mode."/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/datasets/agent-traces-preview-dark.webp" alt="Agent trace preview on a dataset page in dark mode."/>
</div>

Agent traces from Claude Code, Codex, and Pi Agent are natively supported on the Hugging Face Hub. Upload the raw JSONL sessions to a dataset or a [Storage Bucket](./storage-buckets) and Data Studio opens them in a dedicated trace viewer.

## Find your traces

Each supported agent writes JSONL sessions to a known directory:

| Agent       | Local session directory |
| ----------- | ----------------------- |
| Claude Code | `~/.claude/projects`    |
| Codex       | `~/.codex/sessions`     |
| Pi          | `~/.pi/agent/sessions`  |

These trace files are supported out of the box, so you can upload them without modifying or converting them first.

Trace files can include prompts, tool inputs, command output, local paths, screenshots, secrets, private code, and personal data. Review and redact traces before publishing them publicly, or keep the dataset or bucket private if you are not sure what is inside.

For Pi Agent sessions, [`pi-share-hf`](https://github.com/badlogic/pi-share-hf) can help collect project sessions, redact known secrets, run TruffleHog and LLM review, and upload only sessions that pass checks.

<Tip>

The easiest way to upload is to ask your agent itself: point it at the directory above and tell it to upload the `.jsonl` files to a Hub dataset or bucket.

Buckets are especially useful if you want to keep syncing traces as new sessions land.

</Tip>

## View your traces

Once you have traces in a dataset or bucket, open them in Data Studio and click a row. The trace viewer shows the session timeline, prompts, assistant messages, tool calls, and results.

<div class="flex justify-center">
<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/datasets/agent-traces-session.webp" alt="Agent trace session viewer showing user and assistant turns with expanded tool calls."/>
</div>

For a public example, open [`TeichAI/DeepSeek-v4-Pro-Agent`](https://huggingface.co/datasets/TeichAI/DeepSeek-v4-Pro-Agent). You can also browse more datasets tagged as [`traces`](https://huggingface.co/datasets?format=format%3Aagent-traces).
