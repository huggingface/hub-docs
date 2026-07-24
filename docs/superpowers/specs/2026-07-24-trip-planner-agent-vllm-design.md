# Design: Trip-planning agent with reasoning + tool calling on Hugging Face vLLM (SageMaker)

- **Date:** 2026-07-24
- **Deliverable:** a new SageMaker SDK tutorial notebook
- **Path:** `docs/sagemaker/notebooks/sagemaker-sdk/trip-planner-agent-vllm/sagemaker-notebook.ipynb`
- **Title:** *Build a reasoning trip-planning agent on Amazon SageMaker AI with Hugging Face vLLM*
- **Author front-matter:** placeholder (`author`, `author_hf` to be filled before publishing)

## Goal

Deploy `Qwen/Qwen3-8B` on the **new Hugging Face vLLM DLC** and use it as a **trip-planning
concierge** that reasons through multi-constraint requests and calls tools to fill in facts.
The tutorial teaches the real-time, GPU, standard `huggingface-vllm` endpoint path with
vLLM's native **reasoning** and **tool-calling** serving flags, plus a transparent
manual agent loop.

Target image:
```
763104351884.dkr.ecr.<region>.amazonaws.com/huggingface-vllm:0.25.1-transformers5.10-gpu-py312-cu130-ubuntu22.04
```

## Why this topic

- Every recent vLLM tutorial in this repo uses **vLLM-Omni** (multimodal: Qwen3-TTS, FLUX.2).
  The plain `huggingface-vllm` image is only used for *batch* OCR via training jobs. There is
  **no real-time text-generation LLM deployment tutorial** on the standard endpoint path.
- `huggingface-vllm` (non-Omni) is exactly the container for text-generation LLMs and
  generative rerankers. This tutorial fills the gap with a practical, demoable agent.

## Differentiation from `neuron-agent-inf`

`neuron-agent-inf` is Inferentia2-specific: ahead-of-time Neuron **compilation**,
`optimum-neuron`, `strands-agents`, `ibm-granite/granite-3.3-8b-instruct`. This new tutorial is:

| Axis | neuron-agent-inf | trip-planner-agent-vllm (new) |
|---|---|---|
| Hardware | Inferentia2 (`inf2.24xlarge`) | GPU (`ml.g5.xlarge`) |
| Container | Optimum-Neuron vLLM DLC | `huggingface-vllm` DLC (GPU) |
| Prep | mandatory model compilation | none — pull + serve |
| Agent framework | `strands-agents` | manual OpenAI-format loop (transparent) |
| Teaching focus | Neuron compile/cache workflow | vLLM reasoning + tool-call serving flags |

## Model and instance

- **Model:** `Qwen/Qwen3-8B` — hybrid thinking + tool calling; canonical vLLM parser example.
- **Instance:** `ml.g5.xlarge` (single A10 24 GB) — matches the house-default instance;
  `SM_VLLM_MAX_MODEL_LEN=16384` keeps KV cache within budget.

## Deployment configuration (the new teaching content)

Model environment variables on the `ContainerDefinition` (vLLM CLI flags mapped to
`SM_VLLM_*` — uppercase, dashes to underscores):

| Env var | Value | Purpose |
|---|---|---|
| `HF_TOKEN` | `<token>` | Model download from the Hub |
| `SM_VLLM_MODEL` | `Qwen/Qwen3-8B` | Model served by vLLM |
| `SM_VLLM_HOST` | `0.0.0.0` | **Mandatory** — else ping health check fails, container dies before logs |
| `SM_VLLM_TRUST_REMOTE_CODE` | `true` | Required for Qwen architectures |
| `SM_VLLM_MAX_MODEL_LEN` | `16384` | Bounds KV cache on a single 24 GB GPU |
| `SM_VLLM_GPU_MEMORY_UTILIZATION` | `0.9` | Headroom for KV cache |
| `SM_VLLM_ENABLE_AUTO_TOOL_CHOICE` | `true` | Enables model-driven tool calls |
| `SM_VLLM_TOOL_CALL_PARSER` | `hermes` | Parses Qwen3 tool calls into OpenAI format |
| `SM_VLLM_REASONING_PARSER` | `qwen3` | Separates `<think>...</think>` into `reasoning_content` |

Verified against vLLM docs: `--enable-auto-tool-choice` + `--tool-call-parser hermes` is the
standard Qwen3 tool-calling config; reasoning + tool-calling coexistence was fixed in vLLM 0.9.0
via the `qwen3` reasoning parser (image ships 0.25.1, well past that). In recent vLLM the
reasoning parser alone enables reasoning (no separate `--enable-reasoning` flag needed).

### cu130 AMI requirement (gotcha, called out in the notebook)

`inference_ami_version` on the `ProductionVariant`. The serving-image-selection guidance says
cu130 images require `al2-ami-sagemaker-inference-gpu-3-1`; the existing flux/tts cu130
notebooks in this repo used `al2-ami-sagemaker-inference-gpu-2-1`.
**Decision:** default to `al2-ami-sagemaker-inference-gpu-3-1` (per the guidance, newer/safer
for cu130) and add a markdown note pointing at the AMI/CUDA compatibility rule, flagged to
verify at deploy time.

## Reused boilerplate (lifted near-verbatim from `flux-2-image-generation`)

- `%pip install -q "sagemaker>=3" huggingface_hub "gradio[mcp]"`
- `HF_TOKEN` via `get_token()` / `notebook_login()`
- Execution-role block (`Session`, `get_execution_role`, IAM fallback)
- Timestamped resource names (`strftime("%Y%m%d-%H%M%S")`)
- `image_uris.retrieve("huggingface-vllm", ...)` with hardcoded-tag fallback to the target URI
- SDK v3 resource APIs: `Model.create` / `EndpointConfig.create` / `Endpoint.create` +
  `endpoint.wait_for_status("InService")`
- Invocation via `boto_sess.client("sagemaker-runtime").invoke_endpoint(...,
  CustomAttributes="route=/v1/chat/completions")`
- Gradio app + `demo.launch(..., mcp_server=ENABLE_MCP_SERVER)`
- Cleanup: `endpoint.delete()`, `endpoint_config.delete()`, `model.delete()`

## The agent (new)

### Tools (deterministic local mocks — key-free, reproducible)

- `get_weather(city, date)` -> canned forecast
- `convert_currency(amount, from_currency, to_currency)` -> fixed rate table
- `search_places(city, category)` -> canned list of places

Each tool is a Python function plus an OpenAI `tools=[{...}]` JSON schema. A `TOOL_REGISTRY`
dict maps tool name -> callable. Markdown notes that real APIs can be swapped in as an extension.

### Invocation payload

```json
{
  "model": "Qwen/Qwen3-8B",
  "messages": [...],
  "tools": [...],
  "tool_choice": "auto"
}
```

- **`tool_choice: "auto"`**, never `"required"` (the latter 400s with reasoning enabled,
  vLLM issue #19051).
- **Non-streaming** invocation. SageMaker `invoke_endpoint` is non-streaming anyway, which also
  sidesteps the hermes streaming raw-text bug (vLLM issue #31871).

### Agent loop

1. Send `messages` + `tools`.
2. Read `choices[0].message`: display `reasoning_content` (the thinking) if present.
3. If `tool_calls` present: dispatch each to `TOOL_REGISTRY`, append an assistant message with
   the tool calls, then one `{"role": "tool", "tool_call_id": ..., "content": ...}` per result,
   and re-invoke.
4. Repeat until the message has no `tool_calls` — that is the final answer.
5. A max-iterations guard prevents infinite loops.

## Gradio app

`gr.ChatInterface` (or `gr.Blocks` with a `Chatbot`) that runs the agent loop per user turn and
shows the final answer plus a collapsible reasoning / tool-trace panel. Optional MCP server via
`ENABLE_MCP_SERVER` flag, matching flux/tts.

## Notebook cell outline

1. (md) Front-matter + title + cover placeholder + step overview
2. (md) How reasoning + tool-calling LLMs work
3. (md) What's Hugging Face vLLM (vs vLLM-Omni)
4. (md) Setup
5. (code) `%pip install`
6. (code) HF token
7. (code) Execution role
8. (md) Choosing a model and a DLC
9. (code) Model/instance constants (`MODEL_ID`, `DLC="huggingface-vllm"`, `INSTANCE_TYPE`)
10. (code) `image_uris.retrieve` + fallback URI
11. (md) Configuring vLLM for reasoning + tool calling (env-var table explained)
12. (code) `env_vars`
13. (md) cu130 AMI note
14. (code) Deploy (Model / EndpointConfig / Endpoint / wait)
15. (md) A first look: reasoning + tool calls separated
16. (code) Single invocation, print `reasoning_content` + `tool_calls`
17. (md) Defining the tools
18. (code) Tool functions + JSON schemas + `TOOL_REGISTRY`
19. (md) The agent loop
20. (code) `run_agent(messages)` manual loop
21. (code) Demo run: a multi-constraint trip request end to end
22. (md) Interactive trip-planning app
23. (code) Gradio app + `demo.launch(..., mcp_server=ENABLE_MCP_SERVER)`
24. (md) Cleanup
25. (code) Delete endpoint / config / model

## Verification (no AWS credentials assumed in the authoring environment)

- Notebook JSON validity: `jq . <notebook>` and `python -m json.tool`.
- Execute the pure-Python cells offline: tool mocks return expected values; the agent loop's
  parse/dispatch/re-invoke logic runs against a canned two-turn response fixture (first response
  with `tool_calls`, second with a final answer) to prove the loop terminates and threads tool
  results correctly.
- Full endpoint smoke test (deploy -> invoke -> Gradio) documented as the runtime step the
  author runs on AWS, including the cu130 AMI verification.

## Risks / open points

- **AMI version** for this specific cu130 + ubuntu22.04 image: defaulting to `gpu-3-1` per
  guidance; must be confirmed on a real deploy against the repo precedent of `gpu-2-1`.
- **Reasoning + tools coexistence**: verified supported since vLLM 0.9.0; the shipped 0.25.1 is
  well past. Use non-streaming + `tool_choice: "auto"` to avoid known parser bugs.
- Mock tools keep the notebook deterministic and key-free; real integrations are an explicit
  extension, not part of the deliverable.
