# Prompt Caching

Agents resend the same long prompt on every turn: the system prompt, the tools and the conversation so far. Many providers cache that repeated prefix, so cached input tokens are faster and usually cheaper.

## How it works

Caching is automatic: there is nothing to turn on. The response tells you how many input tokens came from the cache:

```json
"usage": {
  "prompt_tokens": 12000,
  "completion_tokens": 300,
  "prompt_tokens_details": { "cached_tokens": 11500 }
}
```

## Keep a conversation on one provider

A provider's cache only helps if the next turn goes to the same provider. Send a stable UUID per conversation in the `X-HF-Session-Id` header, and the router keeps it on the same provider. Other values are ignored.

```bash
curl https://router.huggingface.co/v1/chat/completions \
    -H "Authorization: Bearer $HF_TOKEN" \
    -H "X-HF-Session-Id: 3f8c2a1e-6b4d-4e2a-9c1f-7d5b0e8a4c21" \
    -H "Content-Type: application/json" \
    -d '{ "model": "deepseek-ai/DeepSeek-V4.1-Flash", "messages": [...] }'
```

The Hugging Face [Python](https://huggingface.co/docs/huggingface_hub/guides/inference) and [JS](https://huggingface.co/docs/huggingface.js/inference/README) clients handle caching for you automatically, no action or configuration needed.

## Tips

- Put what doesn't change first (system prompt, tools), and what changes last.
- Avoid timestamps or random ids at the top of the system prompt: they break the cache on every turn.
