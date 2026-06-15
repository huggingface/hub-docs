# Local Agents with llama.cpp

You can run a coding agent entirely on your own hardware. Several open-source agents can connect to a local [llama.cpp](https://github.com/ggerganov/llama.cpp) server to give you an experience similar to Claude Code or Codex — but everything runs on your machine.

## Getting Started

### 1. Set Your Local Hardware

Set your local hardware so it can show you which models are compatible with your setup.

Go to [huggingface.co/settings/local-apps](https://huggingface.co/settings/local-apps) and configure your local hardware profile. Select `llama.cpp` in the Local Apps section as this will be the engine you'll use.

### 2. Find a Compatible Model

Browse for [Llama.cpp-compatible models](https://huggingface.co/models?apps=llama.cpp&sort=trending).


### 3. Launch the llama.cpp Server

On the model page, click the **"Use this model"** button and select `llama.cpp`. It will show you the exact commands for your setup. The first step is to start a llama.cpp server, e.g.

```bash
llama-server -hf ggml-org/gemma-4-26b-a4b-it-GGUF:Q4_K_M --jinja
```

This downloads the model and starts an OpenAI-compatible API server on your machine. See the [llama.cpp guide](./gguf-llamacpp) for installation instructions.

### 4. Connect Your Agent

Pick one of the agents below and follow the setup instructions.

## Pi

[Pi](https://pi.dev) is the agent behind [OpenClaw](https://github.com/openclaw) and is now integrated directly into Hugging Face, giving you access to thousands of compatible models.

Install Pi:

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
          "id": "ggml-org-gemma-4-26b-4b-gguf"
        }
      ]
    }
  }
}
```

Start Pi in your project directory:

```bash
pi
```

Pi connects to your local llama.cpp server and gives you an interactive agent session.

![Demo](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/pi-llama-cpp-demo.gif)

### Enabling vision support

For vision-capable models, add `"input": ["text", "image"]` to the model entry in `~/.pi/agent/models.json`:

```json
"models": [
  {
    "id": "unsloth/Qwen3.6-35B-A3B-GGUF:Q4_K_XL",
    "input": ["text", "image"]
  }
]
```

Browse [vision-language models compatible with Pi](https://huggingface.co/models?pipeline_tag=image-text-to-text&apps=pi).

## OpenClaw

[OpenClaw](https://github.com/openclaw) works locally with llama.cpp. You can set your model via the onboard command:

```bash
openclaw onboard --non-interactive \
  --auth-choice custom-api-key \
  --custom-base-url "http://127.0.0.1:8080/v1" \
  --custom-model-id "ggml-org-gemma-4-26b-a4b-gguf" \
  --custom-api-key "llama.cpp" \
  --secret-input-mode plaintext \
  --custom-compatibility openai \
  --accept-risk
```

You can also run `openclaw onboard` interactively, select `custom-compatibility` with `openai`, and pass the same configuration.

### Local Memory Search for OpenClaw

You can run local embedding models with Llama.cpp for your agent's memory search. To do so, make sure to have node-llama-cpp. 

```bash
npm i node-llama-cpp 
```

Here's an example snippet to run [quantized EmbeddingGemma-300M](https://huggingface.co/ggml-org/embeddinggemma-300M-GGUF?show_file_info=embeddinggemma-300M-Q8_0.gguf) locally for memory search. OpenClaw automatically downloads and serves the model with the command below.

```bash
openclaw config set agents.defaults.memorySearch.provider local
openclaw config set agents.defaults.memorySearch.local.modelPath "hf:ggml-org/embeddinggemma-300m-qat-q8_0-GGUF/embeddinggemma-300m-qat-Q8_0.gguf"
```

Restart the gateway and validate.

```bash
openclaw gateway restart
openclaw memory status
# Memory Search (main)
# Provider: local (requested: local)
# Model: hf:ggml-org/embeddinggemma-300m-qat-q8_0-GGUF/embeddinggemma-300m-qat-Q8_0.gguf
```

## Hermes Agent

[Hermes Agent](https://hermes-agent.nousresearch.com/) works locally with llama.cpp. Define a default config as:

```yaml
model:
  provider: custom
  default: ggml-org/gemma-4-26B-A4B-it-GGUF:Q4_K_M
  base_url: http://127.0.0.1:8080/v1
  api_key: llama.cpp

custom_providers:
  - name: Local (127.0.0.1:8080)
    base_url: http://127.0.0.1:8080/v1
    api_key: llama.cpp
    model: ggml-org/gemma-4-26B-A4B-it-GGUF:Q4_K_M
```

### Local Memory Search for Hermes Agent

Hermes Agent consumes semantic search models through endpoints. Once you get your preferred embedding model up on endpoint 8080 with llama.cpp or the inference engine of your choice, add the following to `~/.hermes/config.yaml`.

```bash
auxiliary:
  session_search:
    base_url: "http://127.0.0.1:8080/v1"
    api_key: "no-key-required"
    model: "local-llama" # your model alias
    timeout: 90
    max_concurrency: 1
```

Check if this works, `none - built-in only` shows that no other memory plug-ins are used. The output below shows that local serving is active.

```bash
$ hermes memory status
# Memory status
#────────────────────────────────────────
#  Built-in:  always active
#  Provider:  (none — built-in only)
```

## OpenCode

[OpenCode](https://opencode.ai) works locally with llama.cpp. Define a `~/.config/opencode/opencode.json`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "llama.cpp": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "llama-server (local)",
      "options": {
        "baseURL": "http://127.0.0.1:8080/v1"
      },
      "models": {
        "gemma-4-26b-4b-it": {
          "name": "Gemma 4 (local)",
          "limit": {
            "context": 128000,
            "output": 8192
          }
        }
      }
    }
  }
}
```

## How It Works

The setup has two components running locally:

1. **llama.cpp server** — Serves the model as an OpenAI-compatible API on `localhost`.
2. **Your agent** — The agent process that sends prompts to the local server, reasons about tasks, and executes actions.

```
┌─────────┐     API calls     ┌──────────────────┐
│  Agent  │ ───────────────▶  │  llama.cpp server │
│         │ ◀───────────────  │  (local model)    │
└─────────┘    responses      └──────────────────┘
     │
     ▼
  Your files,
  terminal, etc.
```

## Alternative: llama-agent

[llama-agent](https://github.com/gary149/llama-agent) takes a different approach — it builds the agent loop directly into [llama.cpp](https://github.com/ggerganov/llama.cpp) as a single binary with zero external dependencies. No Node.js, no Python, just compile and run:

```bash
git clone https://github.com/gary149/llama-agent.git
cd llama-agent

# Build
cmake -B build
cmake --build build --target llama-agent

# Run (downloads the model automatically)
./build/bin/llama-agent -hf ggml-org/gemma-4-26b-a4b-it-GGUF:Q4_K_M
```

Because tool calls happen in-process rather than over HTTP, there is no network overhead between the model and the agent. It also supports subagents, MCP servers, and an HTTP API server mode.

## Next Steps

- [Use AI Models Locally](./local-apps) — Learn more about running models on your machine
- [llama.cpp Guide](./gguf-llamacpp) — Detailed llama.cpp installation and usage
- [Agents on the Hub](./agents-overview) — Connect agents to the Hugging Face ecosystem
