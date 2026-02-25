# Local Agents with llama.cpp and Pi

You can run AI agents entirely on your own hardware. By combining [Pi](https://pi.dev) with a local [llama.cpp](https://github.com/ggerganov/llama.cpp) server, you get a coding agent similar to Claude Code or Codex - but running locally on your machine.

> [!TIP]
> Pi is the agent behind [OpenClaw](https://github.com/openclaw) and is now integrated directly into Hugging Face, giving you access to thousands of compatible models.

## Getting Started

### 1. Set Your Local Hardware

Set your local hardware so it can show you which models are compatible with your setup.

Go to [huggingface.co/settings/local-apps](https://huggingface.co/settings/local-apps) and configure your local hardware profile.

### 2. Find a Compatible Model

Browse models for compatible models for Pi:

[huggingface.co/models?apps=pi&sort=trending](https://huggingface.co/models?apps=pi&sort=trending)

### 3. Launch the llama.cpp Server

On the model page, click the **"Use this model"** button. Pi will show you the exact commands for your setup. The first step is to start a llama.cpp server, e.g.

```bash
# Start a local OpenAI-compatible server:
llama-server -hf unsloth/Qwen3.5-122B-A10B-GGUF:Q4_K_M --jinja
```

This downloads the model and starts an OpenAI-compatible API server on your machine. See the [llama.cpp guide](./gguf-llamacpp) for installation instructions.

### 4. Install and Configure Pi

In a separate terminal, install Pi:

```bash
npm install -g @mariozechner/pi-coding-agent
```

Then add your local model to Pi's configuration file at `~/.pi/agent/models.json`:

```json
{
  "providers": {
    "llama-cpp": {
      "baseUrl": "http://localhost:8080/v1",
      "api": "openai-completions",
      "apiKey": "none",
      "models": [
        {
          "id": "Qwen3.5-122B-A10B-GGUF"
        }
      ]
    }
  }
}
```

Update the `id` field to match the model you launched in step 3.

### 5. Run Pi

Start Pi in your project directory:

```bash
pi
```

Pi connects to your local llama.cpp server and gives you an interactive agent session.

![Demo](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/pi-llama-cpp-demo.gif)

## How It Works

The setup has two components running locally:

1. **llama.cpp server** — Serves the model as an OpenAI-compatible API on `localhost`.
2. **Pi** — The agent process that sends prompts to the local server, reasons about tasks, and executes actions.

```
┌─────────┐     API calls     ┌──────────────────┐
│   Pi    │ ───────────────▶  │  llama.cpp server │
│ (agent) │ ◀───────────────  │  (local model)    │
└─────────┘    responses      └──────────────────┘
     │
     ▼
  Your files,
  terminal, etc.
```

## Next Steps

- [Use AI Models Locally](./local-apps) — Learn more about running models on your machine
- [llama.cpp Guide](./gguf-llamacpp) — Detailed llama.cpp installation and usage
- [Agents on the Hub](./agents-overview) — Connect agents to the Hugging Face ecosystem
