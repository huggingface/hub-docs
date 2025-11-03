# MacWhisper

[MacWhisper](https://goodsnooze.gumroad.com/l/macwhisper) lets you run Whisper locally on your Mac without having to install anything else.

## Overview

You can use MacWhisper with Hugging Face Inference Providers to access a wider range of models and take advantage of zero-markup pricing.

### How can I use MacWhisper with Hugging Face Inference Providers?

MacWhisper allows you to set up AI services which can be used to work with the outputs of the MacWhisper transcriptions. For example, you can set up a prompt to clean up dictations or translate transcriptions into another language.

It's possible to use Hugging Face Inference Providers as the backend for these AI services, allowing you to leverage open models from various providers.

## Prerequisites

- MacWhisper installed ([installation guide](https://goodsnooze.gumroad.com/l/macwhisper))
- A Hugging Face account with [API token](https://huggingface.co/settings/t
  okens/new?ownUserPermissions=inference.serverless.write&tokenType=fineGrained) (needs "Make calls to Inference Providers" permission)

## Configuration

1. Create a Hugging Face token with Inference Providers permissions at [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens/new?ownUserPermissions=inference.serverless.write&tokenType=fineGrained)
2. Open MacWhisper and go to **Settings > AI** > **Service**.
3. Select **Hugging Face Inference Providers** as the service.
4. Enter your Hugging Face API token in the provided field.
5. Add the model ID for the model you want to use.

Tip
