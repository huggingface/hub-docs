# Contributing

Thanks for your interest in contributing to `hub-docs`! We welcome improvements to documentation, examples, scripts, and small fixes — perfect for Hacktoberfest.

## Getting Started

- **Fork** this repository and create a new branch for your changes.
- **Make focused edits** (typos, clarifications, examples, links, structure) and keep PRs small and scoped.
- Follow the existing style and structure of the docs. Keep headings concise and code samples runnable.

## Local Preview (Hub docs)

You can preview the Hub docs locally with `hf-doc-builder`.

```bash
pip install hf-doc-builder
pip install black watchdog

# Preview the Hub docs subtree
doc-builder preview hub PATH/TO/hub-docs/docs/hub/ --not_python_module
```

Note: This repository contains several doc sections (Hub, Inference Providers, SageMaker, Xet). Most contributions only require editing Markdown, opening a PR, and letting CI build a preview for review.

## Inference Providers docs generator (optional)

If you are updating the Inference Providers docs generated content under `docs/inference-providers`, you can use the generator in `scripts/inference-providers/`.

```bash
cd scripts/inference-providers
pnpm install
pnpm run generate
```

This will regenerate provider/task pages from the Handlebars templates in `scripts/inference-providers/templates/`.

## Docs quality checks

We run Markdown linting and link checking in CI for all PRs.

- Markdown rules are configured in `.markdownlint.jsonc` and executed by a GitHub Action.
- External links are validated by Lychee with `.lychee.toml`.

You can run similar checks locally:

```bash
# Markdown lint (via npx)
npx markdownlint-cli2 "**/*.md" --config .markdownlint.jsonc --ignore "**/node_modules/**" --ignore "**/.git/**"

# Link check (install lychee locally)
cargo install lychee
lychee --config .lychee.toml **/*.md
```

## Commit and PR guidelines

- Use **descriptive commit messages**.
- Link to relevant issues if applicable.
- For documentation changes, include before/after context when helpful.
- Ensure external links are valid and examples run (when feasible).

## Hacktoberfest

Small improvements are highly valued:

- Fix typos/grammar and clarify ambiguous wording
- Add missing examples or fix broken snippets
- Improve instructions for local preview and tooling
- Keep each PR limited to a single topic

Thank you for helping improve the docs!


