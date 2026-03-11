# Skills

> [!TIP]
> Looking for the `hf` CLI Skill? It's the quickest way to connect your agent to the Hugging Face ecosystem. See the [Hugging Face CLI for AI Agents](./agents-cli) guide.

Hugging Face provides a curated set of Skills built for AI builders. Train models, create datasets, run evaluations, track experiments. Each Skill is a self-contained `SKILL.md` that your agent follows while working on the task.

Skills work with all major coding agents: Claude Code, OpenAI Codex, Google Gemini CLI, and Cursor. Learn more about the format at [agentskills.io](https://agentskills.io).

## Installation

<hfoptions id="install-skills">

<hfoption id="Claude Code">

```bash
# register the skills marketplace
/plugin marketplace add huggingface/skills

# install a specific Skill
/plugin install <skill-name>@huggingface/skills
```

</hfoption>

<hfoption id="OpenAI Codex">

Copy or symlink skills from the [repository](https://github.com/huggingface/skills) into one of Codex's standard `.agents/skills` locations (e.g. `$REPO_ROOT/.agents/skills` or `$HOME/.agents/skills`). Codex discovers them automatically via the Agent Skills standard.

Alternatively, use the bundled [`agents/AGENTS.md`](https://github.com/huggingface/skills/blob/main/agents/AGENTS.md) as a fallback.

</hfoption>

<hfoption id="Gemini CLI">

```bash
gemini extensions install https://github.com/huggingface/skills.git --consent
```

</hfoption>

<hfoption id="Cursor">

Install via the Cursor plugin flow using the [repository URL](https://github.com/huggingface/skills). The repo includes `.cursor-plugin/plugin.json` and `.mcp.json` manifests.

</hfoption>

</hfoptions>

## Available Skills

| Skill | What it does |
| ----- | ------------ |
| [`hf-cli`](https://github.com/huggingface/skills/tree/main/skills/hf-cli) | Hub operations via the `hf` CLI: download, upload, manage repos, run jobs |
| [`hugging-face-datasets`](https://github.com/huggingface/skills/tree/main/skills/hugging-face-datasets) | Create and manage datasets on the Hub |
| [`hugging-face-dataset-viewer`](https://github.com/huggingface/skills/tree/main/skills/hugging-face-dataset-viewer) | Explore and query any dataset via the Dataset Viewer API |
| [`hugging-face-model-trainer`](https://github.com/huggingface/skills/tree/main/skills/hugging-face-model-trainer) | Train or fine-tune LLMs with TRL (SFT, DPO, GRPO) on HF Jobs |
| [`hugging-face-vision-trainer`](https://github.com/huggingface/skills/tree/main/skills/hugging-face-vision-trainer) | Train object detection and image classification models |
| [`hugging-face-object-detection-trainer`](https://github.com/huggingface/skills/tree/main/skills/hugging-face-object-detection-trainer) | Fine-tune object detection models (RTDETRv2, YOLOS, DETR) |
| [`hugging-face-evaluation`](https://github.com/huggingface/skills/tree/main/skills/hugging-face-evaluation) | Add and manage evaluation results in model cards |
| [`hugging-face-jobs`](https://github.com/huggingface/skills/tree/main/skills/hugging-face-jobs) | Run compute jobs on Hugging Face infrastructure |
| [`hugging-face-trackio`](https://github.com/huggingface/skills/tree/main/skills/hugging-face-trackio) | Track and visualize ML training experiments |
| [`hugging-face-paper-publisher`](https://github.com/huggingface/skills/tree/main/skills/hugging-face-paper-publisher) | Publish and manage research papers on the Hub |
| [`hugging-face-tool-builder`](https://github.com/huggingface/skills/tree/main/skills/hugging-face-tool-builder) | Build reusable scripts for HF API operations |
| [`gradio`](https://github.com/huggingface/skills/tree/main/skills/huggingface-gradio) | Build Gradio web UIs and demos |
| [`transformers-js`](https://github.com/huggingface/skills/tree/main/skills/transformers.js) | Run ML models in JavaScript/TypeScript with WebGPU/WASM |

## Using Skills

Once installed, mention the Skill directly in your prompt:

- "Use the HF model trainer Skill to fine-tune Qwen3-0.6B with SFT on the Capybara dataset"
- "Use the HF evaluation Skill to add benchmark results to my model card"
- "Use the HF datasets Skill to create a new dataset from these examples"

Your agent loads the corresponding `SKILL.md` instructions and helper scripts automatically.

## Resources

- [Skills Repository](https://github.com/huggingface/skills) - Browse and contribute
- [Agent Skills format](https://agentskills.io/home) - Specification and docs
- [CLI Guide](./agents-cli) - Hugging Face CLI for AI Agents
- [MCP Guide](./agents-mcp) - Use alongside Skills
