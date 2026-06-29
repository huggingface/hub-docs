# Integrations Overview

Hugging Face Inference Providers plugs into the tools you already use, from coding agents like Claude Code, Codex, and OpenCode to LLM frameworks, evaluation suites, and IDEs. Bring your own HF token and run state-of-the-art open models across dozens of providers, without changing your workflow.

## Why Use Integrations?

- **Keep your existing tools**: Use Inference Providers with tools you already know
- **Access dozens of providers**: Switch between providers without changing your code
- **Zero markup pricing**: Get the same rates as going direct to providers
- **Single API token**: One HF token for all providers and models

## Overview

This table lists _some_ tools, libraries, and applications that work with Hugging Face Inference Providers. For detailed setup instructions, follow the links in the Resources column.

| Integration                                                        | Description                                                              | Resources                                                                                                                                          |
| ------------------------------------------------------------------ | ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Pi](https://github.com/badlogic/pi-mono)                          | Minimalist terminal-based coding assistant                              | [Getting started](./pi)                                                                     |
| [OpenCode](https://opencode.ai/)                                   | AI coding agent built for the terminal                                  | [Getting started](./opencode)                                                   |
| [Codex](https://developers.openai.com/codex)                       | OpenAI's agentic coding CLI for the terminal                            | [Getting started](./codex)                                                                                                                         |
| [Claude Code](https://docs.anthropic.com/en/docs/claude-code)      | Agentic coding tool for the terminal                                    | [Getting started](./claude-code)                                                                                                                   |
| [Hermes Agent](https://github.com/NousResearch/hermes-agent)       | Open-source AI agent CLI for coding and development                     | [Getting started](./hermes-agent) |
| [CrewAI](https://www.crewai.com/)                                  | Framework for orchestrating AI agent teams                              | [Official docs](https://docs.crewai.com/en/concepts/llms#hugging-face)                                                                             |
| [NeMo Data Designer](https://github.com/NVIDIA-NeMo/DataDesigner)  | Synthetic dataset generation framework                                  | [Getting started](./datadesigner)                                                                                                                  |
| [GitHub Copilot Chat](https://docs.github.com/en/copilot)          | AI pair programmer in VS Code                                           | [Getting started](./vscode)                                                                                                                        |
| [fast-agent](https://fast-agent.ai/)                               | Flexible framework building MCP/ACP powered Agents, Workflows and evals | [Official docs](https://fast-agent.ai/models/llm_providers/#hugging-face)                                                                          |
| [Haystack](https://haystack.deepset.ai/)                           | Open-source LLM framework for building production applications          | [Official docs](https://docs.haystack.deepset.ai/docs/huggingfaceapichatgenerator)                                                                |
| [Inspect](https://inspect.aisi.org.uk/)                            | AI safety and evaluation framework                                      | [Official docs](https://inspect.aisi.org.uk/providers.html#hugging-face)                                                                           |
| [LangChain](https://www.langchain.com/)                            | LLM application framework                                               | [Official docs](https://docs.langchain.com/oss/python/integrations/providers/huggingface#huggingfaceendpoint)                                      |
| [LiteLLM](https://www.litellm.ai/)                                 | Unified interface for 100+ LLMs                                         | [Official docs](https://docs.litellm.ai/docs/providers/huggingface)                                                                               |
| [LlamaIndex](https://www.llamaindex.ai/)                           | Data framework for LLM applications                                     | [Official docs](https://developers.llamaindex.ai/python/examples/llm/huggingface/#use-a-model-via-inference-providers)                            |
| [MacWhisper](https://goodsnooze.gumroad.com/l/macwhisper)          | Speech-to-text application for macOS                                    | [Getting started](./macwhisper)                                                                                                                    |
| [PydanticAI](https://ai.pydantic.dev/)                             | Framework for building AI agents with Python                            | [Official docs](https://ai.pydantic.dev/models/huggingface/)                                                                                       |
| [Roo Code](https://roocode.com/)                                   | AI-powered code generation and refactoring                              | [Official docs](https://docs.roocode.com/providers/huggingface)                                                                                    |
| [smolagents](https://huggingface.co/docs/smolagents)               | Framework for building LLM agents with tool integration                 | [Official docs](https://huggingface.co/docs/smolagents/reference/models#smolagents.InferenceClientModel)                                          |
| [Vision Agents](https://visionagents.ai/)                          | SDK for real-time AI with text and vision language models               | [Getting started](./visionagents)                                              |

## Integrations by Category

### API Clients

Client libraries and gateways for simplified LLM access.

- [LiteLLM](https://www.litellm.ai/) - Unified interface for calling 100+ LLMs with the same format ([Official docs](https://docs.litellm.ai/docs/providers/huggingface))

### Applications

End-user applications and interfaces powered by LLMs.

- [MacWhisper](https://goodsnooze.gumroad.com/l/macwhisper) - Speech-to-text application for macOS ([Getting started](./macwhisper))

### Developer Tools

AI-powered coding assistants and development environments.

- [Pi](https://github.com/badlogic/pi-mono) - Minimalist terminal-based coding assistant ([Getting started](./pi))
- [OpenCode](https://opencode.ai/) - AI coding agent built for the terminal ([Getting started](./opencode))
- [Codex](https://developers.openai.com/codex) - OpenAI's agentic coding CLI for the terminal ([Getting started](./codex))
- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) - Agentic coding tool for the terminal ([Getting started](./claude-code))
- [Hermes Agent](https://github.com/NousResearch/hermes-agent) - Open-source AI agent CLI for coding and development ([Getting started](./hermes-agent))
- [GitHub Copilot Chat](https://docs.github.com/en/copilot) - AI pair programmer in VS Code ([Getting started](./vscode))
- [Roo Code](https://roocode.com/) - AI-powered code generation and refactoring ([Official docs](https://docs.roocode.com/providers/huggingface))

### Evaluation Frameworks

Tools for assessing and ensuring AI safety and performance.

- [Inspect](https://inspect.aisi.org.uk/) - AI safety and evaluation framework ([Official docs](https://inspect.aisi.org.uk/providers.html#hugging-face))

### LLM Frameworks

LLM application frameworks and orchestration platforms.

- [CrewAI](https://www.crewai.com/) - Framework for orchestrating AI agent teams ([Official docs](https://docs.crewai.com/en/concepts/llms#hugging-face))
- [fast-agent](https://fast-agent.ai/) - Flexible framework building MCP/ACP powered Agents, Workflows and evals ([Official docs](https://fast-agent.ai/models/llm_providers/#hugging-face))
- [Haystack](https://haystack.deepset.ai/) - Open-source framework for building production-ready LLM applications ([Official docs](https://docs.haystack.deepset.ai/docs/huggingfaceapichatgenerator))
- [LangChain](https://www.langchain.com/) - Popular framework for developing LLM applications ([Official docs](https://docs.langchain.com/oss/python/integrations/providers/huggingface#huggingfaceendpoint))
- [LlamaIndex](https://www.llamaindex.ai/) - Data framework for connecting custom data to LLMs ([Official docs](https://developers.llamaindex.ai/python/examples/llm/huggingface/#use-a-model-via-inference-providers))
- [PydanticAI](https://ai.pydantic.dev/) - Framework for building AI agents with Python ([Official docs](https://ai.pydantic.dev/models/huggingface/))
- [smolagents](https://huggingface.co/docs/smolagents) - Framework for building LLM agents with tool integration ([Official docs](https://huggingface.co/docs/smolagents/reference/models#smolagents.InferenceClientModel))
- [Vision Agents](https://visionagents.ai/) - SDK for real-time AI with text and vision language models ([Getting started](./visionagents))

### Synthetic Data

Tools for creating synthetic datasets.

- [NeMo Data Designer](https://github.com/NVIDIA-NeMo/DataDesigner) - NVIDIA NeMo framework for synthetic data generation ([Getting started](./datadesigner))

## Don't See Your Tool?

If a tool doesn't have explicit support for Inference Providers, it's often still compatible via its OpenAI-compatible API. Check your tool's documentation to see if it can be pointed at a custom endpoint.

<!-- ## Add Your Integration

Building something with Inference Providers? [Let us know](./adding-integration) and we'll add it to the list. -->
