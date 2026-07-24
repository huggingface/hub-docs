# Design: Trip-planning agent with reasoning + tool calling on Hugging Face vLLM (SageMaker)

- **Date:** 2026-07-24
- **Deliverable:** a new SageMaker SDK tutorial notebook
- **Path:** `docs/sagemaker/notebooks/sagemaker-sdk/trip-planner-agent-vllm/sagemaker-notebook.ipynb`
- **Title:** *Build a reasoning trip-planning agent on Amazon SageMaker AI with Hugging Face vLLM*
- **Author front-matter:** placeholder (`author`, `author_hf` to be filled before publishing)
- **Agent framework:** Strands Agents (`SageMakerAIModel`) — the house agent framework
  (already used by `neuron-agent-inf`)

## Goal

Deploy `Qwen/Qwen3-8B` on the **new Hugging Face vLLM DLC** and use it as a **trip-planning
concierge** that reasons through multi-constraint requests and calls tools to fill in facts.
The tutorial teaches the real-time, GPU, standard `huggingface-vllm` endpoint path with
vLLM's native **reasoning** and **tool-calling** serving flags, then wires the endpoint into a
**Strands agent** with custom tools, an optional MCP server, and a Gradio chat app.

Target image:
```
763104351884.dkr.ecr.<region>.amazonaws.com/huggingface-vllm:0.25.1-transformers5.10-gpu-py312-cu130-ubuntu22.04
```

## Why this topic

- Every recent vLLM tutorial in this repo uses **vLLM-Omni** (multimodal: Qwen3-TTS, FLUX.2).
  The plain `huggingface-vllm` image is only used for *batch* OCR via training jobs. There is
  **no real-time text-generation LLM deployment tutorial** on the standard endpoint path.
- `huggingface-vllm` (non-Omni) is exactly the container for text-generation LLMs. This tutorial
  fills the gap with a practical, demoable reasoning + tool-calling agent.

## Differentiation from `neuron-agent-inf`

Both use Strands Agents (the house framework) — that shared choice is intentional, not a new
convention. Everything else differs:

| Axis | neuron-agent-inf | trip-planner-agent-vllm (new) |
|---|---|---|
| Hardware | Inferentia2 (`inf2.24xlarge`) | GPU (`ml.g5.xlarge`) |
| Container | Optimum-Neuron vLLM DLC | `huggingface-vllm` DLC (GPU) |
| Prep | mandatory model compilation | none — pull + serve |
| Model | `ibm-granite/granite-3.3-8b-instruct` | `Qwen/Qwen3-8B` |
| Teaching focus | Neuron compile/cache workflow | vLLM reasoning + tool-call serving flags; native Strands SageMaker integration |

## Model and instance

- **Model:** `Qwen/Qwen3-8B` — hybrid thinking + tool calling; canonical vLLM parser example.
- **Instance:** `ml.g5.xlarge` (single A10 24 GB) — matches the house-default instance;
  `SM_VLLM_MAX_MODEL_LEN=16384` keeps KV cache within budget.

## Deployment configuration (teaching content #1)

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
| `SM_VLLM_REASONING_PARSER` | `qwen3` | Separates `<think>...</think>` into reasoning content |

Verified against vLLM docs: `--enable-auto-tool-choice` + `--tool-call-parser hermes` is the
standard Qwen3 tool-calling config; reasoning + tool-calling coexistence was fixed in vLLM 0.9.0
via the `qwen3` reasoning parser (image ships 0.25.1, well past that). In recent vLLM the
reasoning parser alone enables reasoning (no separate `--enable-reasoning` flag needed).

### cu130 AMI requirement (gotcha, called out in the notebook)

`inference_ami_version="al2-ami-sagemaker-inference-gpu-3-1"` on the `ProductionVariant`.
Required for cu130 images per the serving-image-selection guidance and corroborated by the
reference blog (which uses the same AMI for a cu130 vLLM image). A markdown note explains the
AMI/CUDA rule.

## Reused boilerplate (lifted near-verbatim from `flux-2-image-generation`)

- `%pip install` (extended, see below)
- `HF_TOKEN` via `get_token()` / `notebook_login()`
- Execution-role block (`Session`, `get_execution_role`, IAM fallback)
- Timestamped resource names (`strftime("%Y%m%d-%H%M%S")`)
- `image_uris.retrieve("huggingface-vllm", ...)` with hardcoded-tag fallback to the target URI
- SDK v3 resource APIs: `Model.create` / `EndpointConfig.create` / `Endpoint.create` +
  `endpoint.wait_for_status("InService")`
- Cleanup: `endpoint.delete()`, `endpoint_config.delete()`, `model.delete()`

Install cell:
```
%pip install -q "sagemaker>=3" huggingface_hub "strands-agents[sagemaker]>=1.48.0" strands-agents-tools "gradio>=5" mcp
```
`strands-agents` **1.48.0** (released 2026-07-17) parses vLLM 0.16.0+ reasoning (`reasoning`
key) in both streaming and non-streaming SageMaker paths — verified in `sagemaker.py`. **No
fork needed** (the reference blog predates the released fix and used a fork; we pin the release).

## The Strands agent (teaching content #2)

### Model wrapper

```python
from strands import Agent
from strands.models.sagemaker import SageMakerAIModel

model = SageMakerAIModel(
    endpoint_config={"endpoint_name": ENDPOINT_NAME, "region_name": REGION},
    payload_config={
        "max_tokens": 8192,
        "temperature": 0.7,
        "top_p": 0.95,
        "stream": True,
        "additional_args": {"chat_template_kwargs": {"enable_thinking": True}},
    },
)
```

### Tools (custom `@tool` functions — key-free, deterministic mocks)

Defined with the `@tool` decorator so Strands derives the JSON schema from type hints +
docstrings:

- `get_weather(city, date)` -> canned forecast
- `convert_currency(amount, from_currency, to_currency)` -> fixed rate table
- `search_places(city, category)` -> canned list of places

Markdown notes that real APIs (or `strands_tools.http_request`) can be swapped in as an
extension. `Agent(model=model, tools=[get_weather, convert_currency, search_places],
callback_handler=None)`.

### First look (optional, before the agent)

One raw `sagemaker-runtime.invoke_endpoint(..., CustomAttributes="route=/v1/chat/completions")`
call with a `tools=[...]` payload and `tool_choice="auto"`, printing `reasoning_content` and
`tool_calls`, so the reader sees what Strands consumes under the hood. Kept short; Strands is the
main path.

### Demo run

`agent("Plan a 3-day trip to Lisbon in October, budget 800 EUR in USD, ...")` — a
multi-constraint request that triggers reasoning then several tool calls. Print the streamed
reasoning, tool uses, and final itinerary.

## Optional: connect an MCP server (teaching content #3)

Strands `MCPClient` -> the Hugging Face MCP server (`https://huggingface.co/mcp`, bearer
`get_token()`), exposing Hub tools to the agent. Mirrors the reference blog and
`neuron-agent-inf`. Gated behind an `ENABLE_MCP` flag so the core notebook runs without it.

## Gradio app

`gr.ChatInterface` whose handler consumes `agent.stream_async(prompt)` and renders, via
`gr.ChatMessage` with `metadata={"title": ...}`:
- reasoning blocks ("Thinking...")
- tool-use blocks ("Using tool `name`...")
- tool results ("Tool result [STATUS]")
- final assistant text

Adapted from the reference blog's event-stream renderer (`contentBlockStart/Delta/Stop`,
`toolResult`). No separate `mcp_server=` flag (MCP is covered via `MCPClient` instead).

## Notebook cell outline

1. (md) Front-matter + title + cover placeholder + step overview
2. (md) How reasoning + tool-calling LLMs work
3. (md) What's Hugging Face vLLM (vs vLLM-Omni); what's Strands Agents
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
15. (md) A first look: reasoning + tool calls under the hood
16. (code) Single raw `invoke_endpoint`, print `reasoning_content` + `tool_calls`
17. (md) Wrapping the endpoint in a Strands agent
18. (code) `SageMakerAIModel` + `payload_config`
19. (md) Defining the trip-planning tools
20. (code) `@tool` functions
21. (code) `Agent(...)` + demo run (multi-constraint trip request)
22. (md) Optional: connect the Hugging Face MCP server
23. (code) `MCPClient` -> HF MCP (behind `ENABLE_MCP`)
24. (md) Interactive trip-planning app
25. (code) Gradio `ChatInterface` over `agent.stream_async`
26. (md) Cleanup
27. (code) Delete endpoint / config / model

## Verification (no AWS credentials assumed in the authoring environment)

- Notebook JSON validity: `jq . <notebook>` and `python -m json.tool`.
- Offline execution of framework-independent cells: the `@tool` mock functions return expected
  values; inspect the Strands-derived `TOOL_SPEC` on each decorated tool (available without an
  endpoint) to confirm the schemas are well-formed.
- The Strands `SageMakerAIModel` transport requires a live endpoint, so the full agent run and
  Gradio app are documented as the runtime steps the author executes on AWS (deploy -> demo run
  -> Gradio), including the cu130 AMI verification.

## Risks / open points

- **Streaming + hermes tool parser** (vLLM issue #31871, Jan 2026): older builds returned raw
  text instead of parsed `tool_calls` when streaming with `--tool-call-parser hermes`. Verify on
  the 0.25.1 image; if it misbehaves, set `payload_config["stream"] = False` (the
  `SageMakerAIModel` non-streaming path also parses tool calls + reasoning) or adjust the parser.
  Documented as a deploy-time check.
- **`tool_choice`**: rely on Strands' default (auto); never force `"required"` (400s with
  reasoning enabled, vLLM issue #19051).
- **AMI version** confirmed as `al2-ami-sagemaker-inference-gpu-3-1` per guidance + reference
  blog; still validated on a real deploy.
- Mock tools keep the notebook deterministic and key-free; real integrations and the MCP server
  are explicit extensions, not part of the core deliverable.
