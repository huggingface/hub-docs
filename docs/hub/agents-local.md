# Local Agents with llama.cpp

You can run a coding agent locally, entirely on your own hardware. Several open-source agents can connect to a local [llama.cpp](https://llama.app/) server to give you an experience similar to Claude Code or Codex — but everything runs on your machine.

## How It Works

The setup has two components running locally:

1. **llama.cpp server** — Serves the model as an OpenAI-compatible API on `localhost`.
2. **Your agent** — Sends prompts to the local server, reasons about tasks, and executes actions.

```shell
┌─────────┐     API calls     ┌───────────────────┐
│  Agent  │ ───────────────▶  │  llama.cpp server │
│         │ ◀───────────────  │  (local model)    │
└─────────┘    responses      └───────────────────┘
     │
     ▼
  Your files,
  terminal, etc.
```

## Set up llama.cpp server

### 1. Set Your Local Hardware

Set your local hardware so it can show you which models are compatible with your setup.

Go to [huggingface.co/settings/hardware](https://huggingface.co/settings/hardware) and configure your local hardware profile. Then select `llama.cpp` in your [Local Apps settings](https://huggingface.co/settings/local-apps), as this will be the engine you'll use.

### 2. Find a Compatible Model

Browse for [GGUF models compatible with Llama](https://huggingface.co/models?apps=llama-app&sort=trending). Once selected, download the model on your hardware.

If you need inspiration, the Llama app will suggest a few models adapted to your hardware device (see Step 3).

### 3. Install the Llama App

You can easily install llama.cpp on your machine:

- **Mac and Windows**: install the [Llama app](https://llama.app), a minimalist desktop app that sits on your system tray
     After the application is installed follow the steps to start using your favourite model, recommended for your system.
     ![llama app](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/blog/decision/llama-app.png)
- **Linux (or if you only want the command line)**: one-line install command:
     ```bash
     curl -LsSf https://llama.app/install.sh | sh
     ```

Verify the installation:

```bash
llama --version
```

### 4. Start the router

If you installed the desktop app, `llama serve` is already running. You can check by browsing the model list on [localhost:9931](http://localhost:9931/#/models).

If not, start `llama serve`. Passing a model starts single-model mode instead of router mode. See the [llama.cpp server guide](https://llama.app/docs/serve#serving-multiple-models-router-mode) for router configuration.

You have two options:
- Automatic loading: by default, models load on demand.
- Manual loading: add `--no-models-autoload`, then use `/llama` to load models before selecting them.

For automatic loading, just launch:

```bash
llama serve
```

In most cases you do not need any extra flags as the defaults should be reasonable. For advanced usage, here are a sample of possible flags you might be interested in:

- `-ngl all` offloads all layers to the GPU. Omit it to use automatic GPU offloading.
- `-c 32768` sets the context size in tokens. Use `-c 0` for the model's full context window, which may require substantially more memory. Context is shared across parallel server slots.
- `--models-dir ~/models` discovers local GGUF files from a custom local directory.

While the above command should be all that you need, but here are some common flags to use with `llama serve`:

| Flag | What it does |
| :--: | :--: |
| `-ngl all` | offloads all layers to the GPU |
| `-c 32768` | sets the context size in tokens |
| `--models-dir ~/models` | discovers local GGUF files from a custom local directory |

### 5. Connect Your Agent

Pick one of the agents below and follow the setup instructions.

## Pi

[Pi](https://pi.dev) is the agent behind [OpenClaw](https://github.com/openclaw) and is now integrated directly into Hugging Face, giving you access to thousands of compatible models.

Install Pi:

```bash
npm install -g --ignore-scripts @earendil-works/pi-coding-agent
```

Start Pi in your project directory:

```bash
pi
```

Configure llama.cpp:

```bash
/login llama.cpp
```

Run `/llama` to load a model, then `/model` to select the loaded model for the current session.

## OpenClaw

[OpenClaw](https://github.com/openclaw) works locally with llama.cpp. You can set your model via the onboard command:

```bash
openclaw plugins install @openclaw/llama-cpp-provider
openclaw onboard
```

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

[Hermes Agent](https://hermes-agent.nousresearch.com/) works locally with llama.cpp. In `~/.hermes/config.yaml` add the following.

```yaml
custom_providers:
  - name: llama cpp (127.0.0.1:8080)
    base_url: http://127.0.0.1:8080/v1
```

### Local Memory Search for Hermes Agent

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
