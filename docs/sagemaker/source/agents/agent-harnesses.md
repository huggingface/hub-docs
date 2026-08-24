# Use AWS-hosted models with agent harnesses

Agent harnesses such as [Pi](https://pi.dev/) and [Hermes Agent](https://hermes-agent.nousresearch.com/) can use models hosted on Amazon SageMaker AI, SageMaker JumpStart, or Amazon Bedrock. The harness runs locally and sends model requests to an OpenAI-compatible endpoint on AWS.

This guide covers client-side agent harnesses. [Amazon Bedrock Agents](https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html) is a separate managed AWS service for building and orchestrating agents.

The endpoint protocol and the model capability are separate requirements:

- The endpoint must support streaming OpenAI Chat Completions.
- The model must reliably support tool calling. A model that can chat but cannot produce valid tool calls will not complete an agent loop.

## Before you begin

For SageMaker AI and JumpStart, use a real-time endpoint backed by a container that implements `/v1/chat/completions`, such as the Hugging Face [vLLM or SGLang DLC](../get-started/dlcs). The IAM identity invoking the endpoint needs:

- `sagemaker:InvokeEndpoint` on the endpoint ARN.
- `sagemaker:CallWithBearerToken` on `"*"`.

For Amazon Bedrock, select a model that supports the [Chat Completions API](https://docs.aws.amazon.com/bedrock/latest/userguide/apis.html) and create an [Amazon Bedrock API key](https://docs.aws.amazon.com/bedrock/latest/userguide/api-keys.html). Prefer short-term keys for production; long-term keys are intended for exploration.

## Connect to SageMaker AI or JumpStart

SageMaker AI and JumpStart deployments use the same runtime URL. JumpStart deploys the selected model as a SageMaker AI endpoint, so the connection settings depend on the resulting endpoint, not how it was created.

The base URL for a single-model endpoint is:

```text
https://runtime.sagemaker.<REGION>.amazonaws.com/endpoints/<ENDPOINT_NAME>/openai/v1
```

SageMaker AI authenticates OpenAI-compatible clients with short-lived bearer tokens. Generate one with the SageMaker Python SDK:

```python
from datetime import timedelta
from sagemaker.core.token_generator import generate_token

token = generate_token(
    region="us-west-2",
    expiry=timedelta(hours=1),
)
```

Tokens are valid for up to 12 hours and cannot outlive the AWS credentials used to create them. Generate them at the point of use instead of saving them in a configuration file.

### Pi

Pi can resolve an API key by running a shell command. Save this script as `~/.pi/agent/sagemaker-token.py` so Pi can request a fresh token when it connects:

```python
from sagemaker.core.token_generator import generate_token

print(generate_token(region="us-west-2"))
```

Add the provider to `~/.pi/agent/models.json`:

```json
{
  "providers": {
    "sagemaker": {
      "baseUrl": "https://runtime.sagemaker.us-west-2.amazonaws.com/endpoints/my-endpoint/openai/v1",
      "api": "openai-completions",
      "apiKey": "!python ~/.pi/agent/sagemaker-token.py",
      "models": [
        {
          "id": "Qwen/Qwen3-8B",
          "name": "Qwen3 8B on SageMaker",
          "reasoning": false,
          "input": ["text"],
          "contextWindow": 32768,
          "maxTokens": 4096,
          "compat": {
            "supportsDeveloperRole": false,
            "supportsReasoningEffort": false
          }
        }
      ]
    }
  }
}
```

Replace the Region, endpoint name, model ID, and model limits with your deployment values. Open Pi's model picker and select the SageMaker model. See [Pi custom models](https://pi.dev/docs/latest/models) for the complete provider schema.

### Hermes Agent

Hermes supports OpenAI-compatible endpoints through its `openai-api` provider. Export a fresh token in the shell that starts Hermes:

```bash
export OPENAI_BASE_URL="https://runtime.sagemaker.us-west-2.amazonaws.com/endpoints/my-endpoint/openai/v1"
export OPENAI_API_KEY="$(python -c 'from sagemaker.core.token_generator import generate_token; print(generate_token(region=\"us-west-2\"))')"
```

Then configure the model in `~/.hermes/config.yaml`:

```yaml
model:
  default: Qwen/Qwen3-8B
  provider: openai-api
```

The environment variable keeps the short-lived token out of the configuration file. Generate a new token when it expires. See [Hermes AI providers](https://hermes-agent.nousresearch.com/docs/integrations/providers) for other configuration methods.

## Connect to Amazon Bedrock

Amazon Bedrock exposes an OpenAI-compatible endpoint at:

```text
https://bedrock-runtime.<REGION>.amazonaws.com/openai/v1
```

Set your Bedrock API key as an environment variable:

```bash
export AWS_BEARER_TOKEN_BEDROCK="<BEDROCK_API_KEY>"
```

### Pi

Add a Bedrock provider to `~/.pi/agent/models.json`:

```json
{
  "providers": {
    "bedrock": {
      "baseUrl": "https://bedrock-runtime.us-east-1.amazonaws.com/openai/v1",
      "api": "openai-completions",
      "apiKey": "$AWS_BEARER_TOKEN_BEDROCK",
      "models": [
        {
          "id": "openai.gpt-oss-120b",
          "name": "GPT OSS 120B on Bedrock",
          "reasoning": true,
          "input": ["text"],
          "contextWindow": 131072,
          "maxTokens": 8192
        }
      ]
    }
  }
}
```

Use a model ID and limits supported by Bedrock in your Region.

### Hermes Agent

Point the OpenAI-compatible provider at Bedrock:

```bash
export OPENAI_BASE_URL="https://bedrock-runtime.us-east-1.amazonaws.com/openai/v1"
export OPENAI_API_KEY="$AWS_BEARER_TOKEN_BEDROCK"
```

Configure the selected model in `~/.hermes/config.yaml`:

```yaml
model:
  default: openai.gpt-oss-120b
  provider: openai-api
```

## Use another agent harness

For any harness that supports OpenAI Chat Completions, provide the same three values:

1. The SageMaker AI or Bedrock base URL.
2. A SageMaker bearer token or Bedrock API key.
3. The deployed model ID.

Confirm that the client supports streaming responses and tool calls. OpenAI-compatible text generation alone is not sufficient for an agent workflow.

## Troubleshooting

- **401 or 403 response**: refresh an expired token, verify that the token and endpoint use the same Region, and check the invocation permissions.
- **404 response**: use the base URL ending in `/openai/v1`; do not append `/chat/completions` when the harness adds it automatically.
- **The model answers but never calls tools**: verify that the model supports tool calling and that the serving container has tool calling enabled. For vLLM, configure the appropriate tool-call parser for the model.
- **Malformed tool calls**: reduce the tool schema complexity, verify the model's expected chat template, and test a single tool before running a larger agent workflow.
- **Streaming errors**: confirm that the container returns Chat Completions streams as server-sent events.

## Examples

- [Build a reasoning trip-planning agent with vLLM](../examples/sagemaker-sdk-trip-planner-agent-vllm) demonstrates tool calling and MCP with Strands Agents on a SageMaker endpoint.
- [Deploy an AI agent on AWS Inferentia2](../examples/sagemaker-sdk-neuron-agent-inf) runs an agent with a model served on Inferentia2.
- [Improve tool calling with GRPO](../examples/sagemaker-sdk-grpo-llm-trl) fine-tunes a model to produce more reliable tool calls.
