# Agent Traces

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/datasets/agent-traces-preview-light.webp" alt="Agent trace preview on a dataset page in light mode."/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/datasets/agent-traces-preview-dark.webp" alt="Agent trace preview on a dataset page in dark mode."/>
</div>

Agent traces from Claude Code, Codex, and Pi Agent are natively supported on the Hugging Face Hub. Upload the raw JSONL sessions to a [Dataset](https://huggingface.co/datasets?format=format%3Aagent-traces) or a [Storage Bucket](./storage-buckets) to open them in a dedicated trace viewer. Datasets show traces in Data Studio; buckets let you open individual `.jsonl` files directly.

## Find your traces

Each supported agent writes JSONL sessions to the following directories:

| Agent       | Local session directory |
| ----------- | ----------------------- |
| Claude Code | `~/.claude/projects`    |
| Codex       | `~/.codex/sessions`     |
| Pi          | `~/.pi/agent/sessions`  |

These trace files are supported out of the box, so you can upload them without modifying or converting them first.

<Tip>

Are you building your own harness? If your agent isn't listed above, you can make its sessions render in the trace viewer by emitting the [Session Traces Format](./session-traces-format).

</Tip>

Trace files can include prompts, tool inputs, command output, local paths, screenshots, secrets, private code, and personal data. Review and redact traces before publishing them publicly, or keep the dataset or bucket private if you are not sure what is inside.

For Pi Agent sessions, [`pi-share-hf`](https://github.com/badlogic/pi-share-hf) can help collect project sessions, redact known secrets, run TruffleHog and LLM review, and upload only sessions that pass checks.

<Tip>

The easiest way to upload is to ask your agent itself: point it at the directory above and tell it to upload the `.jsonl` files to a Hub dataset or bucket.

Buckets are especially useful if you want to keep syncing traces as new sessions land.

</Tip>

## Upload your traces

After creating a dataset or bucket, install the `hf` CLI with the [recommended standalone installer](/docs/huggingface_hub/guides/cli#getting-started) and log in. If you want your coding agent to run `hf` commands for you, install the Hugging Face CLI skill with `hf skills add`.

```bash
curl -LsSf https://hf.co/cli/install.sh | bash
hf auth login
hf skills add

hf upload <username>/<dataset-name> ~/.codex/sessions . --repo-type dataset
hf buckets sync ~/.codex/sessions hf://buckets/<username>/<bucket-name>/codex
```

Replace `~/.codex/sessions` with the matching session directory for your agent. Use `hf upload` for datasets and `hf buckets sync` for buckets you want to update as new traces are written. The shorter `hf sync` command is an alias for `hf buckets sync`.

## View your traces

Once you have traces in a dataset, open Data Studio and click a row. For traces in a Storage Bucket, navigate to the `.jsonl` file you want to inspect and open it. The trace viewer shows the session timeline, prompts, assistant messages, tool calls, and results.

<div class="flex justify-center">
<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/datasets/agent-traces-session.webp" alt="Agent trace session viewer showing user and assistant turns with expanded tool calls."/>
</div>

For a public example, open [`TeichAI/DeepSeek-v4-Pro-Agent`](https://huggingface.co/datasets/TeichAI/DeepSeek-v4-Pro-Agent). You can also browse more datasets tagged as [`traces`](https://huggingface.co/datasets?format=format%3Aagent-traces).
