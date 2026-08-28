<!---
WARNING

This markdown file has been generated from a script. Please do not edit it directly.

### Template

If you want to update the content related to scalattice's description, please edit the template file under `https://github.com/huggingface/hub-docs/tree/main/scripts/inference-providers/templates/providers/scalattice.handlebars`.

### Logos

If you want to update scalattice's logo, upload a file by opening a PR on https://huggingface.co/datasets/huggingface/documentation-images/tree/main/inference-providers/logos. Ping @wauplin and @celinah on the PR to let them know you uploaded a new logo.
Logos must be in .png format and be named `scalattice-light.png` and `scalattice-dark.png`. Visit https://huggingface.co/settings/theme to switch between light and dark mode and check that the logos are displayed correctly.

### Generation script

For more details, check out the `generate.ts` script: https://github.com/huggingface/hub-docs/blob/main/scripts/inference-providers/scripts/generate.ts.
--->

# Scalattice

> [!TIP]
> All supported Scalattice models can be found [here](https://huggingface.co/models?inference_provider=scalattice&sort=trending)

Scalattice is an OpenAI-compatible inference marketplace. Send chat completions with a catalog model ID and an `slt_` key; the network places the work and bills prepaid credits per token.

For latest pricing, visit the [pricing page](https://scalattice.com/pricing/).

## Resources
 - **Website**: https://scalattice.com/
 - **Documentation**: https://scalattice.cloud/docs/developers
 - **Cloud console**: https://scalattice.cloud/developers
 - **CLI**: https://scalattice.com/cli/

## Supported tasks


### Chat Completion (LLM)

Find out more about Chat Completion (LLM) [here](../tasks/chat-completion).

Scalattice serves an OpenAI-compatible `/v1/chat/completions` API at `https://api.scalattice.cloud/v1`. Catalog IDs match `GET https://api.scalattice.cloud/v1/models` (for example `qwen-3-14b`).
