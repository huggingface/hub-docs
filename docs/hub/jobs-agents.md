# Jobs for Agents

Coding agents can use Jobs to run work that needs more than the machine they run on: training, batch inference, evaluations and data processing. The agent writes a script, launches it on a CPU or GPU, follows the logs and collects the results.

This page covers how to connect an agent, a workflow that works well for agents, common pitfalls, and links to public records of agents using Jobs.

> "Mounting a 980-terabyte public bucket on a $1/hr cpu-xl job and […] rendering 7,861 real 2026 PDFs in 7 minutes for $0.12. Normally that's an entire infrastructure project; here it was one PEP 723 single-file script and one -v flag."
>
> — Pi with Gemini 4 Neon, asked at the end of a working session what it liked most about using Jobs, November 2026

> "Hardware: 1× T4 GPU (HF Jobs, ~12 min, ~$0.08) + local CPU"
>
> — a coding agent's [reproduction logbook](https://huggingface.co/spaces/sanjaymalladi/repro-normuon) in the ICML 2026 agent reproduction challenge, July 2026

<!-- TODO(davanstrien): add more quotes. -->

## Connect your agent

- **Coding agents** (Claude Code, Codex, Cursor, Pi, Hermes Agent and others) use the `hf` CLI with its Skill (and `hf jobs <command> --help` for exact flags). See [Hugging Face CLI for AI Agents](./agents-cli).
- **Agents on open models.** [Pi](https://pi.dev) has Hugging Face as a built-in model provider, and both Pi and [Hermes Agent](https://hermes-agent.nousresearch.com/) can run on a local model with llama.cpp. See [Local Agents](./agents-local). With Jobs for the compute, the whole loop can run on open models.
- **Chat assistants** use the [Hugging Face MCP Server](./agents-mcp) with its Jobs tools enabled.
- **Agents you build** use the [`huggingface_hub` Python client](https://huggingface.co/docs/huggingface_hub/guides/jobs) or the [HTTP API](./jobs-overview#run-jobs-from-anywhere).

The account or organization needs a positive [credit balance](./jobs-pricing), and the agent needs a token with permission to start Jobs (see [Authentication](./jobs-configuration#authentication)). Consider a [fine-grained token](./security-tokens) for the agent: `-s HF_TOKEN` passes the token into the Job, so the Job can do anything the token allows.

When the CLI detects that a coding agent runs it, it switches to plain output for agents. Pass `--format agent` if your agent is not detected. In this mode, `hf auth login` does not prompt: it prints a code for you to approve in your browser, then waits until you approve it.

## A workflow that works

1. **Choose hardware from the live list.** `hf jobs hardware` lists the flavors and their prices. Do not rely on flavor names or prices from memory.
2. **Check the configuration.** `--dry-run` prints the resolved configuration and submits nothing. It does not validate anything: a wrong flavor name, a secret that is not set (shown as `<not set>`), credits and token permissions are only checked on a real launch.
3. **Run small first.** Run on a small slice of the data, with a short timeout, before the full run.
4. **Launch detached, with a timeout.** `--detach` returns the Job ID straight away, so the agent is not blocked.
5. **Check progress and get the final status.** `hf jobs logs -f` stops when the log stream ends, whether the Job succeeded or failed. Use `hf jobs wait` or `hf jobs inspect` for the status. `hf jobs wait` blocks, so give it a `--timeout` shorter than your agent's tool-call limit — if the wait times out, the Job is still running, so call `wait` again or `inspect` it.
6. **Check the outputs.** `COMPLETED` means the command exited successfully, not that the files were saved where you expected.

```bash
# 1-2. Check the hardware options and the resolved configuration
>>> hf jobs hardware
>>> hf jobs uv run --dry-run --flavor <flavor> --timeout 20m -s HF_TOKEN -- train.py --max-samples 100

# 3-4. Smoke test, detached
>>> hf jobs uv run -d --flavor <flavor> --timeout 20m -s HF_TOKEN -- train.py --max-samples 100

# 5. Check logs and utilization, then wait for the final status (non-zero if it failed or the wait timed out)
>>> hf jobs logs <job_id>
>>> hf jobs stats <job_id>
>>> hf jobs wait --timeout 10m <job_id>

# Then the full run, with a timeout that fits it
>>> hf jobs uv run -d --flavor <flavor> --timeout 2h -s HF_TOKEN -- train.py
```

> [!TIP]
> Options before `--` configure the Job; everything after it goes to your script. See [Passing arguments](./jobs-configuration#passing-arguments).

## Avoid common problems

These problems came up repeatedly in public logbooks of agents that ran Jobs:

| Problem                                                                    | What to do                                                                                                                                                                       |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The account has no credits, found only when the Job is submitted           | Check the [credit balance](https://huggingface.co/settings/billing) before the agent starts.                                                                                     |
| The run finished, then the upload failed because the token could not write | Pass a token with write access with `-s HF_TOKEN`. See [Persist your results](./jobs-manage#persist-your-results).                                                               |
| The Job completed but output files were lost                               | Write to a mounted bucket or push to a repo, print key results to the logs, and check the outputs after the Job. See [Persist your results](./jobs-manage#persist-your-results). |
| Missing dependencies found one paid run at a time                          | Declare them in the [UV script](./jobs-configuration#uv-jobs) header and run the script locally with `uv run` on a tiny input first.                                             |
| Several files encoded into one script                                      | Mount the folder with `-v ./src:/code`. See [Local directories](./jobs-configuration#local-directories).                                                                         |

To keep the flavor, image, timeout and secrets with the script, so the next run uses the same settings, see [Define the launch config in the script](./jobs-configuration#define-the-launch-config-in-the-script).

## Start from tested scripts

Agents can find it helpful to start from a tested script instead of writing one from scratch. The [uv-scripts](https://huggingface.co/uv-scripts) organization has single-file scripts for tasks such as OCR, classification, transcription and batch inference, which run from their URL with `hf jobs uv run`. For training, the [Agent Skills](./agents-skills) include a skill that fine-tunes models with TRL on Jobs. For tasks with several steps, each recipe in [jobs-recipes](https://github.com/davanstrien/jobs-recipes) has an `AGENTS.md` with the procedure, the checks and the stop rules for an agent, plus the cost of a tested run.

## Logbooks, traces and write-ups

- [ICML 2026 agent reproduction challenge](https://huggingface.co/spaces/ICML-2026-agent-repro/challenge): public logbooks from coding agents that tried to reproduce ICML papers, many with Jobs. The challenge gave participants GPU credits.
- [Two agents, one prompt](https://danielvanstrien.xyz/posts/2026/agent-race/): Claude Code and Pi with Kimi each fine-tune a classifier from a one-line prompt and train it on Jobs. The [session traces](https://huggingface.co/datasets/davanstrien/agent-race-traces) are public.
- [OCR-ing papers with Codex and Jobs](https://huggingface.co/blog/nielsr/ocr-papers-jobs): Codex launches and monitors 16 parallel GPU Jobs.
- [Hyperparameter search with Claude Code and Jobs](https://huggingface.co/blog/chrisvoncsefalvay/claude-hf-jobs-optuna): Claude Code runs Optuna trials as Jobs.
- [Autoresearch optimizer findings](https://huggingface.co/datasets/mishig/autoresearch-optimizer-findings): Claude Code designs, launches and evaluates 27 experiments on Jobs.

Has your agent used Jobs and kept a public logbook, [trace](./agent-traces) or write-up? [Open a PR](https://github.com/huggingface/hub-docs/edit/main/docs/hub/jobs-agents.md) to add it to this list.
