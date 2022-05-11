---
title: Inference API docs
---

<h1>Inference API</h1>

Please refer to [Accelerated Inference API Documentation](https://api-inference.huggingface.co/docs/python/html/index.html) for detailed information.


## What technology do you use to power the inference API?

For 🤗 Transformers models, we power the API through our [Pipelines](https://huggingface.co/transformers/main_classes/pipelines.html) feature.

On top of `Pipelines` and depending on the model type, we make several production optimizations like:
- compiling models to optimized intermediary representations (e.g. [ONNX](https://medium.com/microsoftazure/accelerate-your-nlp-pipelines-using-hugging-face-transformers-and-onnx-runtime-2443578f4333)),
- maintaining a Least Recently Used cache, ensuring that the most popular models are always loaded,
- scaling the underlying compute infrastructure on the fly depending on the load constraints.

For models from [other libraries](/docs/hub/libraries), the API uses [Starlette](https://www.starlette.io) and runs in [Docker containers](https://github.com/huggingface/api-inference-community/tree/main/docker_images). Each library defines the implementation of [different pipelines](https://github.com/huggingface/api-inference-community/tree/main/docker_images/sentence_transformers/app/pipelines).


## How can I turn off the inference API for my model?

Specify `inference: false` in your model card's metadata.


## Can I send large volumes of requests? Can I get accelerated APIs?

If you are interested in accelerated inference, higher volumes of requests, or an SLA, please contact us at `api-enterprise at huggingface.co`.

## How can I see my usage?

You can head to the [Inference API dashboard](https://api-inference.huggingface.co/dashboard/). Learn more about it in the [Inference API documentation](https://api-inference.huggingface.co/docs/python/html/usage.html#api-usage-dashboard).

## Is there programmatic access to the Inference API?

Yes, the `huggingface_hub` library has a client wrapper documented [here](/docs/hub/how-to-inference).
