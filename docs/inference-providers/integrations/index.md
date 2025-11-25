# Integrations Overview

Hugging Face Inference Providers works with a growing ecosystem of developer tools, frameworks, and platforms. These integrations let you use state-of-the-art models in your existing workflows and development environments.

If a tool doesn't have explicit support for Inference Providers, it is often still compatible via its OpenAI-compatible API support. Check the documentation for your tool to see if it can be configured to use custom endpoints.

## Why Use Integrations?

- **Keep your existing tools**: Use Inference Providers with tools you already know
- **Access dozens of providers**: Switch between providers without changing your code
- **Zero markup pricing**: Get the same rates as going direct to providers
- **Single API token**: One HF token for all providers and models

## Overview

This table lists _some_ tools, libraries, and applications that work with Hugging Face Inference Providers. For detailed setup instructions, follow the links in the Documentation column.

| Integration                                                                                                         | Description                                                    | Resources                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| [Continue](https://continue.dev/)                                                                                   | AI code assistant for VS Code and JetBrains                    | [Official docs](https://docs.continue.dev/customize/model-providers/more/huggingfaceinferenceapi#hugging-face)         |
| [Haystack](https://haystack.deepset.ai/)                                                                            | Open-source LLM framework for building production applications | [Official docs](https://docs.haystack.deepset.ai/docs/huggingfaceapichatgenerator)                                     |
| [Inspect](https://inspect.aisi.org.uk/)                                                                             | AI safety and evaluation framework                             | [Official docs](https://inspect.aisi.org.uk/providers.html#hugging-face)                                               |
| [LangChain](https://www.langchain.com/)                                                                             | LLM application framework                                      | [Official docs](https://docs.langchain.com/oss/python/integrations/providers/huggingface#huggingfaceendpoint)          |
| [LiteLLM](https://www.litellm.ai/)                                                       | Unified interface for 100+ LLMs                                | [Official docs](https://docs.litellm.ai/docs/providers/huggingface)                                                    |
| [LlamaIndex](https://www.llamaindex.ai/) | Data framework for LLM applications                            | [Official docs](https://developers.llamaindex.ai/python/examples/llm/huggingface/#use-a-model-via-inference-providers) |
| [MacWhisper](https://goodsnooze.gumroad.com/l/macwhisper)                                                           | Speech-to-text application for macOS                           | [HF docs](./macwhisper)                                                                                                     |
| [OpenCode](https://opencode.ai/)                                                                                             | AI coding agent built for the terminal                         | [Official docs](https://opencode.ai/docs/providers#hugging-face) / [HF docs](./open-code)                             |
| [Roo Code](https://roocode.com/)                                                                               | AI-powered code generation and refactoring                     | [Official docs](https://docs.roocode.com/providers/huggingface)                                                        |

## Integrations by Category

### API Clients

Client libraries and gateways for simplified LLM access.

- [LiteLLM](https://www.litellm.ai/) - Unified interface for calling 100+ LLMs with the same format ([Official docs](https://docs.litellm.ai/docs/providers/huggingface))

### Applications

End-user applications and interfaces powered by LLMs.

- [MacWhisper](https://goodsnooze.gumroad.com/l/macwhisper) - Speech-to-text application for macOS ([HF docs](./macwhisper))

### Developer Tools

AI-powered coding assistants and development environments.

- [Continue](https://continue.dev/) - AI code assistant for VS Code, JetBrains and the terminal ([Official docs](https://docs.continue.dev/customize/model-providers/more/huggingfaceinferenceapi#hugging-face))
- [OpenCode](https://opencode.ai/) - AI coding agent built for the terminal ([Official docs](https://opencode.ai/docs/providers#hugging-face) / [HF docs](./open-code))
- [Roo Code](https://roocode.com/) - AI-powered code generation and refactoring ([Official docs](https://docs.roocode.com/providers/huggingface))

### Evaluation Frameworks

Tools for assessing and ensuring AI safety and performance.

- [Inspect](https://inspect.aisi.org.uk/) - AI safety and evaluation framework ([Official docs](https://inspect.aisi.org.uk/providers.html#hugging-face))

### LLM Frameworks

LLM application frameworks and orchestration platforms.

- [Haystack](https://haystack.deepset.ai/) - Open-source framework for building production-ready LLM applications ([Official docs](https://docs.haystack.deepset.ai/docs/huggingfaceapichatgenerator))
- [LangChain](https://www.langchain.com/) - Popular framework for developing LLM applications ([Official docs](https://docs.langchain.com/oss/python/integrations/providers/huggingface#huggingfaceendpoint))
- [LlamaIndex](https://www.llamaindex.ai/) - Data framework for connecting custom data to LLMs ([Official docs](https://developers.llamaindex.ai/python/examples/llm/huggingface/#use-a-model-via-inference-providers))

<!-- ## Add Your Integration

Building something with Inference Providers? [Let us know](./adding-integration) and we'll add it to the list. -->
