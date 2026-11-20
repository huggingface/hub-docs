# Contributing

Thanks for helping improve the Hugging Face Hub docs.

## Docs workflow

1. Edit the relevant Markdown files.
2. Open a pull request.
3. Review the preview artifacts from the existing docs build workflows.
4. Make sure the docs quality checks pass for the Markdown files you changed.

## Preview docs locally

Install the doc builder first:

```bash
pip install hf-doc-builder
pip install black watchdog
```

Preview the main Hub docs locally:

```bash
doc-builder preview hub {YOUR_PATH}/hub-docs/docs/hub/ --not_python_module
```

This repository also contains dedicated docs trees for `docs/inference-providers/`, `docs/sagemaker/`, and `docs/xet/`, each with their own preview workflow in `.github/workflows/`.

## Run docs quality checks locally

The repo-wide docs quality workflow lints changed Markdown files and validates their external links.

Lint the Markdown files you changed with `markdownlint-cli2`:

```bash
npx markdownlint-cli2 --config .markdownlint-cli2.yaml README.md docs/hub/index.md
```

Install `lychee` using the method that matches your platform from the official docs, then check the same files for broken links:

```bash
lychee --config ./lychee.toml README.md docs/hub/index.md
```

Replace the example paths with the Markdown files from your branch.
