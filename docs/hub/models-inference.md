# Serverless Inference API

Please refer to [Serverless Inference API Documentation](https://huggingface.co/docs/api-inference) for detailed information.


## What technology do you use to power the Serverless Inference API?

For 🤗 Transformers models, [Pipelines](https://huggingface.co/docs/transformers/main_classes/pipelines) power the API.

On top of `Pipelines` and depending on the model type, there are several production optimizations like:
- compiling models to optimized intermediary representations (e.g. [ONNX](https://medium.com/microsoftazure/accelerate-your-nlp-pipelines-using-hugging-face-transformers-and-onnx-runtime-2443578f4333)),
- maintaining a Least Recently Used cache, ensuring that the most popular models are always loaded,
- scaling the underlying compute infrastructure on the fly depending on the load constraints.

For models from [other libraries](./models-libraries), the API uses [Starlette](https://www.starlette.io) and runs in [Docker containers](https://github.com/huggingface/api-inference-community/tree/main/docker_images). Each library defines the implementation of [different pipelines](https://github.com/huggingface/api-inference-community/tree/main/docker_images/sentence_transformers/app/pipelines).

## How can I turn off the Serverless Inference API for my model?

Specify `inference: false` in your model card's metadata.

## Why don't I see an inference widget, or why can't I use the API?

For some tasks, there might not be support in the Serverless Inference API, and, hence, there is no widget.
For all libraries (except 🤗 Transformers), there is a [library-to-tasks.ts file](https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/library-to-tasks.ts) of supported tasks in the API. When a model repository has a task that is not supported by the repository library, the repository has `inference: false` by default.

## Can I send large volumes of requests? Can I get accelerated APIs?

If you are interested in accelerated inference, higher volumes of requests, or an SLA, please contact us at `api-enterprise at huggingface.co`.

## How can I see my usage?

You can check your usage in the [Inference Dashboard](https://ui.endpoints.huggingface.co/endpoints). The dashboard shows both your serverless and dedicated endpoints usage.

## Is there programmatic access to the Serverless Inference API?

Yes, the `huggingface_hub` library has a client wrapper documented [here](https://huggingface.co/docs/huggingface_hub/how-to-inference).
