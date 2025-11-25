# MacWhisper

[MacWhisper](https://goodsnooze.gumroad.com/l/macwhisper) is a native macOS application that lets you transcribe audio using Whisper models locally on your Mac, with no technical setup required.

## Overview

MacWhisper includes AI services that can process your transcriptions—for example, to clean up dictation, summarize content, or translate to another language. You can configure these AI services to use Hugging Face Inference Providers, giving you access to a wide range of open models from multiple providers at zero markup pricing.

## Prerequisites

- MacWhisper installed.
- A Hugging Face account with an [API token](https://huggingface.co/settings/tokens/new?ownUserPermissions=inference.serverless.write&tokenType=fineGrained) (needs "Make calls to Inference Providers" permission).

## Configuration

1. **Get a Hugging Face token**
   Create a token at [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens/new?ownUserPermissions=inference.serverless.write&tokenType=fineGrained) with "Make calls to Inference Providers" permission.

2. **Open MacWhisper settings**
   Go to **Settings → AI → Service**

3. **Select Hugging Face Inference Providers**
   Choose "Hugging Face Inference Providers" from the service dropdown.

4. **Enter your API token**
   Paste your Hugging Face token in the API token field.

5. **Choose a model**
   Enter the model ID you want to use (e.g., `openai/gpt-oss-20b`).

That's it! MacWhisper will now use Hugging Face Inference Providers for AI processing of your transcriptions.

## Common Use Cases

- **Clean up dictation**: Remove filler words and improve grammar in voice-to-text
- **Summarization**: Generate summaries of meeting transcriptions or long audio files
- **Translation**: Translate transcriptions to other languages
- **Custom processing**: Apply custom prompts to transform transcriptions for your workflow

## Resources

- [MacWhisper product page](https://goodsnooze.gumroad.com/l/macwhisper)
- [Hugging Face Inference Providers documentation](https://huggingface.co/docs/inference-providers)
- [Available models](https://huggingface.co/models?pipeline_tag=text-generation&inference_provider=all&sort=trending)
