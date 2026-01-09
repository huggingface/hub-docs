# Agents

Hugging Face provides tools and protocols that connect AI agents directly to the Hub. Whether you're chatting with Claude, building with Codex, or developing custom agents, you can access models, datasets, Spaces, and community tools. There are four main components:

| Tool | Description |
| ---- | ----------- |
| [MCP Server](./guides/mcp) | Connect any MCP-compatible agent to the Hub |
| [Skills](./guides/skills) | Pre-built capabilities for agents in the [Agent Skills format](https://agentskills.io/home) |
| [CLI](./guides/cli) | Command-line interface for Hub operations |
| [SDK](./guides/sdk) | Python and JavaScript libraries for agent development |


> [!TIP]
> For Chat Agents, you can add Hugging Face to ChatGPT, Claude, or other assistants. This guide shows you how to: [Add Hugging Face to ChatGPT, Claude, or other assistants](./chat-agents)
> For Coding Agents, you can set up coding agents with Codex, Cursor, or VS Code. This guide shows you how to [Set up coding agents with Codex, Cursor, or VS Code](./coding-agents)

## Model Context Protocol (MCP)

The [MCP Server](./guides/mcp) enables any MCP-compatible AI assistant to:
- Search models, datasets, Spaces, and papers
- Run community tools via Gradio Spaces
- Access Hub metadata and resources

## Skills

[Skills](./guides/skills) are Agent Context Protocol definitions for AI/ML tasks. They work with major coding agents including OpenAI Codex, Claude Code, Gemini CLI, and Cursor.

## Command-line Interface (CLI)

Agents are great at using the CLI to interact with the Hub. The [Hugging Face CLI](./guides/cli) provides a command-line interface for interacting with the Hub.

## Building with the SDK

A lightweight toolkit for running MCP-powered agents, available in both [JavaScript](./guides/sdk#javascript) and [Python](./guides/sdk#python).

