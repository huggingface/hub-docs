# Add Your Integration

Building a tool that works with Hugging Face Inference Providers? We'd love to feature it in our integrations directory!

## Requirements

To be listed, your integration should:

- ✅ **Work with HF Inference Providers** via our API or OpenAI-compatible endpoints
- ✅ **Be actively maintained** with recent commits or releases
- ✅ **Have clear documentation** showing how to connect to HF

## How to Submit

1. **Test your integration** with Hugging Face Inference Providers
2. **Fork the repository** at [github.com/huggingface/hub-docs](https://github.com/huggingface/hub-docs)
3. **Add your integration page** in `docs/inference-providers/integrations/`
4. **Update the index** in `docs/inference-providers/integrations/index.md`
5. **Submit a Pull Request** with your changes

## Integration Page Template

Create a file named `your-tool-name.md` with this structure:

```markdown
# Your Tool Name

Brief description of what your tool does.

## Overview

How your tool integrates with Hugging Face Inference Providers.

## Prerequisites

- Your tool installed
- HF account with [API token](https://huggingface.co/settings/tokens)

## Configuration

Step-by-step setup instructions with code examples.

## Resources

- [Your Tool Documentation](https://yourtool.com/docs)
- [HF Integration Guide](link-to-your-guide)
```

## Updating the Index

Add your tool to the table in `integrations/index.md`:

```markdown
| [Your Tool](./your-tool) | Brief description | [Docs](https://yourtool.com/docs) | [Guide](../guides/your-guide) |
```

## Questions?

Need help with your integration? Visit the [Hugging Face Forums](https://discuss.huggingface.co/) or open an issue in the [hub-docs repository](https://github.com/huggingface/hub-docs/issues).
