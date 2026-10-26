# Use AI Models Locally

You can run AI models from the Hub locally on your machine. This means that you can benefit from these advantages:

- **Privacy**: You won't be sending your data to a remote server.
- **Speed**: Your hardware is the limiting factor, not the server or connection speed.
- **Control**: You can configure models to your liking.
- **Cost**: You can run models locally without paying for an API provider.

## How to Use Local Apps

Local apps are applications that can run Hugging Face models directly on your machine. To get started:

1. **Enable local apps** in your [Local Apps settings](https://huggingface.co/settings/local-apps).

![Local Apps](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/local-apps/settings.png)

2. **Choose a supported model** from the Hub by searching for it. You can filter by app in the `Apps` group of the `Other` section of the filters sidebar, for example [models compatible with llama.cpp](https://huggingface.co/models?apps=llama.cpp):

![Local Apps](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/local-apps/search_llamacpp.png)

3. **Select the local app** from the "Use this model" dropdown on the model page.

![Local Apps](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/local-apps/button.png)

4. **Copy and run** the provided command in your terminal.

![Local Apps](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/local-apps/command.png)

## Supported Local Apps

The best way to check if a local app is supported is to go to the [Local Apps settings](https://huggingface.co/settings/local-apps) and see if the app is listed. The "Use this model" dropdown only shows an app when the model is compatible with it (for example, a GGUF model for llama.cpp or Ollama).

The following apps are currently available on the Hub:

| App | Website | Compatible models |
| --- | --- | --- |
| [llama.cpp](#llamacpp) | [github.com/ggml-org/llama.cpp](https://github.com/ggml-org/llama.cpp) | GGUF |
| [Llama](#llama) | [llama.app](https://llama.app) | GGUF |
| [LM Studio](#lm-studio) | [lmstudio.ai](https://lmstudio.ai) | GGUF, MLX |
| [Jan](#jan) | [jan.ai](https://jan.ai) | GGUF |
| [Atomic Chat](#atomic-chat) | [atomic.chat](https://atomic.chat) | GGUF, MLX |
| [Unsloth Desktop](#unsloth-desktop) | [unsloth.ai/docs](https://unsloth.ai/docs) | GGUF, Unsloth models |
| [Ollama](#ollama) | [ollama.com](https://ollama.com) | GGUF |
| [vLLM](#vllm) | [docs.vllm.ai](https://docs.vllm.ai) | Transformers, GGUF, AWQ, GPTQ text-generation and image-text-to-text models |
| [SGLang](#sglang) | [docs.sglang.io](https://docs.sglang.io) | Transformers, AWQ, GPTQ text-generation and image-text-to-text models |
| [MLX LM](#mlx-lm) | [github.com/ml-explore/mlx-lm](https://github.com/ml-explore/mlx-lm) | MLX text-generation models |
| [Docker Model Runner](#docker-model-runner) | [docs.docker.com/ai/model-runner](https://docs.docker.com/ai/model-runner/) | GGUF, vLLM-compatible models |
| [Lemonade](#lemonade) | [lemonade-server.ai](https://lemonade-server.ai) | GGUF, AMD Ryzen AI models |
| [Pi](#pi) | [github.com/earendil-works/pi](https://github.com/earendil-works/pi) | GGUF and MLX chat models with tool calling |
| [Hermes Agent](#hermes-agent) | [hermes-agent.nousresearch.com](https://hermes-agent.nousresearch.com/) | GGUF and MLX chat models with tool calling |
| [OpenClaw](#openclaw) | [github.com/openclaw/openclaw](https://github.com/openclaw/openclaw) | GGUF and MLX chat models with tool calling |
| [Draw Things](#draw-things) | [drawthings.ai](https://drawthings.ai) | Diffusers text-to-image models and LoRAs |
| [DiffusionBee](#diffusionbee) | [diffusionbee.com](https://diffusionbee.com) | Diffusers text-to-image models |
| [JoyFusion](#joyfusion) | [joyfusion.app](https://joyfusion.app) | Core ML text-to-image models tagged `joyfusion` |


> [!TIP]
> 👨‍💻 To use these local apps, copy the snippets from the model card as above.
>
> 👷 If you're building a local app, you can learn about integrating with the Hub in [this guide](https://huggingface.co/docs/hub/en/models-adding-libraries).

### Llama.cpp[[llamacpp]]

Llama.cpp is a high-performance C/C++ library for running LLMs locally with optimized inference across lots of different hardware, including CPUs, CUDA and Metal.

**Advantages:**
- Extremely fast performance for CPU-based models on multiple CPU families
- Low resource usage
- Multiple interface options (CLI, OpenAI-compatible server with a web UI)
- Hardware-optimized for CPUs and GPUs

To use Llama.cpp, navigate to the model card and click "Use this model" and copy the command. The snippet covers installing llama.cpp (install script on macOS and Linux, WinGet on Windows, or building from source) and running the model:

```sh
# Install llama.cpp (macOS, Linux):
curl -LsSf https://llama.app/install.sh | sh

# Start a local OpenAI-compatible server with a web UI:
llama serve -hf unsloth/gpt-oss-20b-GGUF:Q4_K_M

# Or run inference directly in the terminal:
llama cli -hf unsloth/gpt-oss-20b-GGUF:Q4_K_M
```

Read our dedicated [llama.cpp + HF doc page](./gguf-llamacpp).

### Llama

[Llama](https://llama.app) is a macOS desktop application for running GGUF models from the Hub locally.

**Advantages:**
- Native macOS app with a graphical interface
- One-click install of GGUF models from the Hub

To use Llama, navigate to the model card of a GGUF model and click "Use this model". Llama will open and guide you through installing the model.

> [!NOTE]
> Llama is currently available on macOS only.

### LM Studio

> [!NOTE]
> Read our dedicated [LM Studio doc page](./lmstudio)

LM Studio is a desktop application that provides an easy way to download, run, and experiment with local LLMs.

**Advantages:**
- Intuitive graphical interface
- Built-in model browser
- Developer tools and APIs
- Free for personal and commercial use

Navigate to the model card of a GGUF or MLX model and click "Use this model". LM Studio will open and you can start chatting through the interface.

### Jan

Jan is an open-source ChatGPT alternative that runs entirely offline with a user-friendly interface.

**Advantages:**
- User-friendly GUI
- Chat with documents and files
- OpenAI-compatible API server, so you can run models and use them from other apps

To use Jan, navigate to the model card of a GGUF model and click "Use this model". Jan will open and you can start chatting through the interface.

### Atomic Chat

[Atomic Chat](https://atomic.chat) is a desktop chat application for running local models.

**Advantages:**
- Graphical chat interface
- Supports both GGUF and MLX models

To use Atomic Chat, navigate to the model card of a GGUF or MLX model and click "Use this model". Atomic Chat will open with the model ready to download.

### Unsloth Desktop

[Unsloth Desktop](https://unsloth.ai/docs) is a desktop application from Unsloth for running local models.

**Advantages:**
- Graphical interface
- Works with GGUF models and models from the Unsloth ecosystem

To use Unsloth Desktop, navigate to the model card of a GGUF or Unsloth model and click "Use this model". Unsloth Desktop will open the model, including the GGUF file you selected if you picked one from the model's files.

### Ollama

Ollama is an application that lets you run large language models locally on your computer with a simple command-line interface. It is available for GGUF models.

**Advantages:**
- Easy installation and setup
- Direct integration with Hugging Face Hub

To use Ollama, navigate to the model card and click "Use this model" and copy the command.

```sh
ollama run hf.co/unsloth/gpt-oss-20b-GGUF:Q4_K_M
```

### vLLM

[vLLM](https://docs.vllm.ai) is a high-throughput inference and serving engine for LLMs, with an OpenAI-compatible API server.

**Advantages:**
- High throughput, optimized for GPUs
- Supports Transformers, GGUF and quantized (AWQ, GPTQ) models
- OpenAI-compatible API server

vLLM is available for text-generation and image-text-to-text models. Navigate to the model card, click "Use this model" and copy the commands:

```sh
# Install vLLM from pip:
pip install vllm

# Start the vLLM server:
vllm serve "openai/gpt-oss-20b"

# Call the server using curl (OpenAI-compatible API):
curl -X POST "http://localhost:8000/v1/chat/completions" \
	-H "Content-Type: application/json" \
	--data '{
		"model": "openai/gpt-oss-20b",
		"messages": [{"role": "user", "content": "What is the capital of France?"}]
	}'
```

The snippet also shows how to run the model with Docker Model Runner.

### SGLang

[SGLang](https://docs.sglang.io) is a fast serving framework for LLMs and vision language models.

**Advantages:**
- High-performance serving on GPUs
- Supports Transformers and quantized (AWQ, GPTQ) models
- OpenAI-compatible API server

SGLang is available for text-generation and image-text-to-text models. Navigate to the model card, click "Use this model" and copy the commands:

```sh
# Install SGLang from pip:
pip install sglang

# Start the SGLang server:
python3 -m sglang.launch_server \
    --model-path "openai/gpt-oss-20b" \
    --host 0.0.0.0 \
    --port 30000
```

The server exposes an OpenAI-compatible API on port 30000. The snippet also includes a Docker command using the `lmsysorg/sglang` image.

### MLX LM

[MLX LM](https://github.com/ml-explore/mlx-lm) runs LLMs on Apple silicon using Apple's MLX framework.

**Advantages:**
- Optimized for Apple silicon
- Interactive chat and text generation from the command line
- OpenAI-compatible server

MLX LM is available for MLX text-generation models. Navigate to the model card, click "Use this model" and copy the commands:

```sh
# Install MLX LM
uv tool install mlx-lm

# Interactive chat REPL
mlx_lm.chat --model "mlx-community/Qwen3-4B-4bit"

# Or start an OpenAI-compatible server
mlx_lm.server --model "mlx-community/Qwen3-4B-4bit"
```

### Docker Model Runner

[Docker Model Runner](https://docs.docker.com/ai/model-runner/) lets you pull and run models with the Docker CLI.

**Advantages:**
- Uses the familiar Docker tooling
- Supports GGUF models and models compatible with vLLM

Navigate to the model card, click "Use this model" and copy the command:

```sh
docker model run hf.co/unsloth/gpt-oss-20b-GGUF:Q4_K_M
```

### Lemonade

[Lemonade](https://lemonade-server.ai) is a local LLM server, optimized for AMD hardware.

**Advantages:**
- Supports GGUF models
- Runs models built for AMD Ryzen AI NPUs (models tagged `ryzenai-npu` or `ryzenai-hybrid`)

After [downloading Lemonade](https://lemonade-server.ai), navigate to the model card, click "Use this model" and copy the commands:

```sh
# Pull the model
lemonade pull unsloth/gpt-oss-20b-GGUF:Q4_K_M

# Run and chat with the model
lemonade run user.gpt-oss-20b-GGUF-Q4_K_M

# List all available models
lemonade list
```

### Pi

[Pi](https://github.com/earendil-works/pi) is a coding agent that runs in your terminal.

Pi is available for GGUF and MLX chat models whose chat template supports tool calling. The snippet first starts a local OpenAI-compatible server (`llama serve` for GGUF models, `mlx_lm.server` for MLX models), then configures Pi to use it:

```sh
# Start a local OpenAI-compatible server:
llama serve -hf unsloth/gpt-oss-20b-GGUF:Q4_K_M

# Install Pi:
npm install -g @earendil-works/pi-coding-agent

# Add the model to ~/.pi/agent/models.json (see the snippet on the model page), then
# start Pi in your project directory:
pi
```

### Hermes Agent

[Hermes Agent](https://hermes-agent.nousresearch.com/) is an AI agent by Nous Research that can run with local models.

Hermes Agent is available for GGUF and MLX chat models whose chat template supports tool calling. The snippet first starts a local OpenAI-compatible server (`llama serve` for GGUF models, `mlx_lm.server` for MLX models), then configures Hermes Agent to use it:

```sh
# Start a local OpenAI-compatible server:
llama serve -hf unsloth/gpt-oss-20b-GGUF:Q4_K_M

# Install Hermes:
curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash
hermes setup

# Point Hermes at the local server:
hermes config set model.provider custom
hermes config set model.base_url http://127.0.0.1:8080/v1
hermes config set model.default unsloth/gpt-oss-20b-GGUF:Q4_K_M

# Run Hermes
hermes
```

### OpenClaw

[OpenClaw](https://github.com/openclaw/openclaw) is an open-source personal AI agent that can run with local models.

OpenClaw is available for GGUF and MLX chat models whose chat template supports tool calling. The snippet first starts a local OpenAI-compatible server (`llama serve` for GGUF models, `mlx_lm.server` for MLX models), then configures OpenClaw to use it:

```sh
# Start a local OpenAI-compatible server:
llama serve -hf unsloth/gpt-oss-20b-GGUF:Q4_K_M

# Install OpenClaw:
npm install -g openclaw@latest

# Register the local server and set it as the default model:
openclaw onboard --non-interactive --mode local \
  --auth-choice custom-api-key \
  --custom-base-url http://127.0.0.1:8080/v1 \
  --custom-model-id "unsloth/gpt-oss-20b-GGUF:Q4_K_M" \
  --custom-provider-id llama-cpp \
  --custom-compatibility openai \
  --custom-text-input \
  --accept-risk \
  --skip-health

# Run OpenClaw
openclaw agent --local --agent main --message "Hello from Hugging Face"
```

### Draw Things

[Draw Things](https://drawthings.ai) is an app for generating images locally on Apple devices.

**Advantages:**
- Runs text-to-image models fully on-device
- Can import both base models and LoRAs

To use Draw Things, navigate to the model card of a Diffusers text-to-image model or LoRA and click "Use this model". Draw Things will open and import the model.

> [!NOTE]
> Draw Things is available on macOS only.

### DiffusionBee

[DiffusionBee](https://diffusionbee.com) is a desktop app for generating images locally with Stable Diffusion models.

**Advantages:**
- Simple graphical interface
- No setup or command line required

To use DiffusionBee, navigate to the model card of a Diffusers text-to-image model and click "Use this model". DiffusionBee will open and import the model.

> [!NOTE]
> DiffusionBee is available on macOS only.

### JoyFusion

[JoyFusion](https://joyfusion.app) is an app for generating images locally with Core ML models on Apple devices.

To use JoyFusion, navigate to the model card of a Core ML text-to-image model tagged `joyfusion` and click "Use this model". JoyFusion will open and import the model.

> [!NOTE]
> JoyFusion is available on macOS only.
