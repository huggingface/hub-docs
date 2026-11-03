# Cross-Agent Memory with funes

[funes](https://github.com/huggingface/funes) gives your coding agents a durable memory of your past sessions. It indexes the transcripts that Claude Code, Codex, Pi, and Hermes Agent already write on your machine, and lets any of them recall earlier decisions, rationale, and findings while they work. Your memory is a dataset: publish it to the Hugging Face Hub and any machine, teammate, or agent can recall from it.

## Getting Started

### 1. Install funes

funes is a single binary. The installer detects your platform, downloads the matching prebuilt binary, verifies its checksum, and puts it on your `PATH`:

```bash
curl -fsSL "https://huggingface.co/buckets/huggingface/funes/resolve/install.sh?src=hub-docs" | sh
```

Later, `funes update` replaces the binary with the latest release. To build from source instead, see the [funes README](https://github.com/huggingface/funes#building-from-source).

### 2. Add funes to Your Agent

```bash
funes add claude    # or codex, pi, hermes
```

One command does the rest: it builds a first index from the sessions your agent has already written, gives the agent the `recall` and `get` tools, and installs the automation that indexes each completed turn. Indexing is incremental, so later runs only embed new turns. The first run asks before indexing anything and, if a Hugging Face token is available, offers to set up a memory on the Hub (see [below](#your-memory-on-the-hub)).

Other agents? Integrations maintained by their authors are listed in [funes-integrations](https://github.com/huggingface/funes-integrations/blob/main/COMMUNITY.md), and [writing one](https://github.com/huggingface/funes/blob/main/CONTRIBUTING.md#writing-an-integration) needs no change to funes.

### 3. Just Work

When a task touches a past decision, its rationale, or an earlier finding, the agent reaches for `recall` on its own. You don't need to remember which session it was or paste its context into the new one.

![A coding agent reaches for funes on its own, recalls an earlier decision, and grounds its answer in the retrieved session](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/blog/funes/recall.gif)

`recall` returns the original passages, not a summary, and says where each one came from: the agent, timestamp, session, and turn. Every hit comes with a `get` command that reads the full turn and its surrounding context.

## Your Memory on the Hub

To make a memory follow your work, bind one when you add funes to an agent:

```bash
funes add codex <user|org>/funes-memory
```

funes publishes your local memory to that dataset repository, keeps it current by publishing at session boundaries, and recalls from it. Run the same command on another machine and the memory follows you there. A teammate's agent bound to the same memory recalls your sessions too, including the dead ends and rationale that never made it into a pull request.

The shared memory is a regular Hugging Face dataset you own: access is controlled by your token, and repositories funes creates are **private by default**. Published memories carry a dataset card and the `funes` tag, so they are [discoverable on the Hub](https://huggingface.co/datasets?other=funes).

> [!TIP]
> Agent transcripts commonly capture credentials. funes redacts the ones it detects at index time, and publishing scans every chunk again and withholds anything that still looks like a secret. Publishing needs [TruffleHog](https://github.com/trufflesecurity/trufflehog) installed: funes refuses to push content it cannot scan. See [Publishing and sharing](https://github.com/huggingface/funes/blob/main/docs/push.md) for what the scanner covers and how to fix held-back rows.

### Read a Shared Memory

Any memory you have access to can be read for one call, without touching your own setup. We published the [memory of funes's own development](https://huggingface.co/datasets/huggingface/funes-memory), so you can try recall before indexing anything of your own:

```bash
funes recall "why is funes append-only" --memory huggingface/funes-memory
```

`recall` prints ranked passages shaped for agents. To get an answer instead, borrow a coding agent for one question:

```bash
funes ask claude "why is funes append-only" --memory huggingface/funes-memory   # or: funes ask codex
```

## Next Steps

- [funes on GitHub](https://github.com/huggingface/funes) - Source code and the complete [documentation](https://github.com/huggingface/funes/blob/main/docs/README.md), from indexing to publishing and automation
- [Give Your Coding Agents a Memory You Own](https://huggingface.co/blog/funes) - The blog post introducing funes, with a benchmark of recall against compaction and handoffs
