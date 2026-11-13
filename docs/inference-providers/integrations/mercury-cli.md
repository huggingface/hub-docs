# Mercury CLI

[Mercury CLI](https://github.com/Whq02/MercuryCLI) is an open-source terminal coding agent that reads and edits files, runs commands, and supports parallel sessions and crewmates in isolated Git worktrees.

## Overview

Mercury CLI connects to Hugging Face Inference Providers through the Hub router. Model IDs use the format `huggingface/<org>/<model>`, with an optional `:provider` or `:policy` suffix.

## Prerequisites

- Mercury CLI installed. See the [installation instructions](https://github.com/Whq02/MercuryCLI#install).
- A Hugging Face account. If using a [Hub token](https://huggingface.co/settings/tokens), grant it the **Make calls to Inference Providers** permission.

## Configuration

1. Start Mercury CLI in a repository:

   ```bash
   mercury
   ```

2. Run `/logins huggingface` and sign in with a device code or a Hub token. You can also provide a token through `HF_TOKEN`.

3. Run `/model` and choose a Hugging Face model available through Inference Providers. Its qualified ID uses `huggingface/<org>/<model>[:provider|:policy]`.

## Resources

- [Mercury CLI installation](https://github.com/Whq02/MercuryCLI#install)
- [Mercury CLI provider and sign-in documentation](https://github.com/Whq02/MercuryCLI/blob/main/docs/ENGINES.md)
- [Models on Inference Providers](https://huggingface.co/models?pipeline_tag=text-generation&inference_provider=all&sort=trending)
