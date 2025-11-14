# Integrations Overview

Hugging Face Inference Providers works with a growing ecosystem of developer tools, frameworks, and platforms. These integrations let you use state-of-the-art models in your existing workflows and development environments.

## Why Use Integrations?

- **Keep your existing tools**: Use Inference Providers with tools you already know
- **Access 17+ providers**: Switch between providers without changing your code
- **Zero markup pricing**: Get the same rates as going direct to providers
- **Single API token**: One HF token for all providers and models

## Overview

This table lists _some_ tools, libraries, and applications that work with Hugging Face Inference Providers. For detailed setup instructions, follow the links in the Documentation column.

| Integration                                                                                                         | Description                                                    | Documentation                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| [Continue](https://continue.dev/)                                                                                   | AI code assistant for VS Code and JetBrains                    | [Integration docs](https://docs.continue.dev/customize/model-providers/more/huggingfaceinferenceapi#hugging-face)         |
| [Haystack](https://haystack.deepset.ai/)                                                                            | Open-source LLM framework for building production applications | [Integration docs](https://docs.haystack.deepset.ai/docs/huggingfaceapichatgenerator)                                     |
| [Inspect](https://inspect.aisi.org.uk/)                                                                             | AI safety and evaluation framework                             | [Integration docs](https://inspect.aisi.org.uk/providers.html#hugging-face)                                               |
| [LangChain](https://www.langchain.com/)                                                                             | LLM application framework                                      | [Integration docs](https://docs.langchain.com/oss/python/integrations/providers/huggingface#huggingfaceendpoint)          |
| [LiteLLM](https://docs.litellm.ai/docs/providers/huggingface)                                                       | Unified interface for 100+ LLMs                                | [Integration docs](https://docs.litellm.ai/docs/providers/huggingface)                                                    |
| [LlamaIndex](https://developers.llamaindex.ai/python/examples/llm/huggingface/#use-a-model-via-inference-providers) | Data framework for LLM applications                            | [Integration docs](https://developers.llamaindex.ai/python/examples/llm/huggingface/#use-a-model-via-inference-providers) |
| [MacWhisper](https://goodsnooze.gumroad.com/l/macwhisper)                                                           | Speech-to-text application for macOS                           | [Guide](./macwhisper)                                                                                                     |
| [OpenCode](./open-code)                                                                                             | AI coding agent built for the terminal                         | [Integration docs](https://opencode.ai/docs/providers#hugging-face) / [HF Guide](./open-code)                             |
| [Roo Code](https://docs.roocode.com/)                                                                               | AI-powered code generation and refactoring                     | [Integration docs](https://docs.roocode.com/providers/huggingface)                                                        |

## Integrations by Category

### API Clients

Client libraries and gateways for simplified LLM access.

- [LiteLLM](https://docs.litellm.ai/docs/providers/huggingface) - Unified interface for calling 100+ LLMs with the same format

### Applications

End-user applications and interfaces powered by LLMs.

- [MacWhisper](https://goodsnooze.gumroad.com/l/macwhisper) - Speech-to-text application for macOS ([HF setup Guide](./macwhisper))

### Developer Tools

AI-powered coding assistants and development environments.

- [Continue](https://docs.continue.dev/customize/model-providers/more/huggingfaceinferenceapi#hugging-face) - AI code assistant for VS Code, JetBrains and the terminal.
- [OpenCode](https://opencode.ai/docs/providers#hugging-face) - AI coding agent built for the terminal.
- [Roo Code](https://docs.roocode.com/providers/huggingface) - AI-powered code generation and refactoring.

### Evaluation Frameworks

Tools for assessing and ensuring AI safety and performance.

- [Inspect](https://inspect.aisi.org.uk/providers.html#hugging-face) - AI safety and evaluation framework.

### LLM Frameworks

LLM application frameworks and orchestration platforms.

- [Haystack](https://docs.haystack.deepset.ai/docs/huggingfaceapichatgenerator) - Open-source framework for building production-ready LLM applications
- [LangChain](https://docs.langchain.com/oss/python/integrations/providers/huggingface#huggingfaceendpoint) - Popular framework for developing LLM applications
- [LlamaIndex](https://developers.llamaindex.ai/python/examples/llm/huggingface/#use-a-model-via-inference-providers) - Data framework for connecting custom data to LLMs

<!-- ## Add Your Integration

Building something with Inference Providers? [Let us know](./adding-integration) and we'll add it to the list. -->
