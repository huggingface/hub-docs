# How to be registered as an inference provider on the Hub?

<Tip>

Want to be listed as an Inference Provider on the Hugging Face Hub? Please reach out to us on social networks or [here on the Hub](https://huggingface.co/spaces/huggingface/HuggingDiscussions/discussions/49).

</Tip>

This guide details the steps for registering as an inference provider on the Hub and provides implementation guidance.

1. **Implement standard task APIs** - Follow our task API schemas for compatibility (see [Prerequisites](#1-prerequisites)).
2. **Submit a PR for JS client integration** - Add your provider to [huggingface.js](https://github.com/huggingface/huggingface.js/tree/main/packages/inference) (see [JS Client Integration](#2-js-client-integration)).
3. **Register model mappings** - Use our Model Mapping API to link your models to Hub models (see [Model Mapping API](#3-model-mapping-api)).
4. **Implement a billing endpoint** - Provide an API for billing (see [Billing](#4-billing)).
5. **Submit a PR for Python client integration** - Add your provider to [huggingface_hub](https://github.com/huggingface/huggingface_hub) (see [Python client integration](#5-python-client-integration)).
6. **Register your provider server-side and provide an icon** - Reach out to us to add your provider server-side and provide your SVG icon.
7. **Create documentation on your side** - Add documentation and do a lot of communication on your side.
8. **Add a documentation page** - Open a Pull Request in this repo (huggingface/hub-docs) to add a provider-specific page in the documentation.
9. **Share share share** do a lot of comms so that your integration is as successful as possible!


## 1. Prerequisites

<Tip>

If your implementation strictly follows the OpenAI API for LLMs and VLMs, you may be able to skip most of this section. In that case, simply open a PR on [huggingface.js](https://github.com/huggingface/huggingface.js/tree/main/packages/inference) to register.

</Tip>

The first step to understand the integration is to take a look at the JS inference client that lives
inside the [huggingface.js](https://github.com/huggingface/huggingface.js/tree/main/packages/inference) repo.

This is the client that powers our Inference widgets on model pages, and is the blueprint
implementation downstream (for Python SDK, to generate code snippets, etc.).


### What is a Task 

You will see that inference methods (`textToImage`, `chatCompletion`, etc.) have names that closely
mirror the task names. A task, also known as `pipeline_tag` in the HF ecosystem, is the type of
model (basically which types of inputs and outputs the model has), for instance "text-generation"
or "text-to-image". It is indicated prominently on model pages, here:

<div class="flex justify-center">
    <picture>
        <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/pipeline-tag-on-model-page-light.png">
        <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/pipeline-tag-on-model-page-dark.png">
    </picture>
</div>

The list of all possible tasks can be found at https://huggingface.co/tasks and the list of JS method names is documented in the README at https://github.com/huggingface/huggingface.js/tree/main/packages/inference.

<Tip>

Note that `chatCompletion` is an exception as it is not a pipeline_tag, per se. Instead, it
includes models with either `pipeline_tag="text-generation"` or `pipeline_tag="image-text-to-text"`
which are tagged as "conversational".

</Tip>


### Task API schema

For each task type, we enforce an API schema to make it easier for end users to use different
models interchangeably. To be compatible, your third-party API must adhere to a "standard" shape API we expect on HF model pages for each pipeline task type.

This is not an issue for LLMs as everyone converged on the OpenAI API anyways, but can be
more tricky for other tasks like "text-to-image" or "automatic-speech-recognition" where there
exists no standard API.

For example, you can find the expected schema for Text to Speech here: [https://github.com/huggingface/huggingface.js/packages/src/tasks/text-to-speech/spec/input.json#L4](https://github.com/huggingface/huggingface.js/blob/0a690a14d52041a872dc103846225603599f4a33/packages/tasks/src/tasks/text-to-speech/spec/input.json#L4), and similarly for other supported tasks. If your API for a given task is different from HF's, it is not an issue: you can tweak the code in `huggingface.js` to be able to call your models, i.e., provide some kind of "translation" of parameter names and output names. However, API specs should not be model-specific, only task-specific. Run the JS code and add some [tests](https://github.com/huggingface/huggingface.js/blob/main/packages/inference/test/HfInference.spec.ts) to make sure it works well. We can help with this step!

## 2. JS Client Integration

Before proceeding with the next steps, ensure you've implemented the necessary code to integrate with the JS client and thoroughly tested your implementation. Here are the steps to follow:

### Implement the provider helper (JS)

Create a new file under `packages/inference/src/providers/{provider_name}.ts` and copy-paste the following snippet.

```ts
import { TaskProviderHelper } from "./providerHelper";

export class MyNewProviderTask extends TaskProviderHelper {

	constructor() {
		super("your-provider-name", "your-api-base-url", "task-name");
	}

    override prepareHeaders(params: HeaderParams, binary: boolean): Record<string, string> {
        // Override the headers to use for the request.
        return super.prepareHeaders(params, binary);
    }

	makeRoute(params: UrlParams): string {
        // Return the route to use for the request. e.g. /v1/chat/completions route is commonly use for chat completion.
		throw new Error("Needs to be implemented");
	}

	preparePayload(params: BodyParams): Record<string, unknown> {
        // Return the payload to use for the request, as a dict.
		throw new Error("Needs to be implemented");
	}

	getResponse(response: unknown, outputType?: "url" | "blob"): string | Promise<Blob>{
		// Return the response in the expected format.
        throw new Error("Needs to be implemented");
    }
}
```

Implement the methods that require custom handling. Check out the base implementation to check default behavior. If you don't need to override a method, just remove it. You have to define at least `makeRoute`, `preparePayload` and `getResponse`.

If the provider supports multiple tasks that require different implementations, create dedicated subclasses for each task, following the pattern used in the existing providers implementation, e.g. [Together AI provider implementation](https://github.com/huggingface/huggingface.js/blob/main/packages/inference/src/providers/together.ts).

For text-generation and conversational tasks, you can just inherit from `BaseTextGenerationTask` and `BaseConversationalTask` respectively (defined in [providerHelper.ts]((https://github.com/huggingface/huggingface.js/blob/main/packages/inference/src/providers/providerHelper.ts))) and override the methods if needed. Examples can be found in [Cerebras](https://github.com/huggingface/huggingface.js/blob/main/packages/inference/src/providers/cerebras.ts) or [Fireworks](https://github.com/huggingface/huggingface.js/blob/main/packages/inference/src/providers/fireworks.ts) provider implementations.

### Register the provider

Go to [packages/inference/src/lib/getProviderHelper.ts](https://github.com/huggingface/huggingface.js//blob/main/packages/inference/src/lib/getProviderHelper.ts) and add your provider to `PROVIDERS`. You will need to add your provider to the `INFERENCE_PROVIDERS` list as well in [packages/inference/src/types.ts](https://github.com/huggingface/huggingface.js//blob/main/packages/inference/src/types.ts). Please try to respect alphabetical order. 

Update the [README.md](https://github.com/huggingface/huggingface.js/blob/main/packages/inference/README.md) in the `packages/inference` directory to include your provider in the list of supported providers and the list of supported models links. 

## 3. Model Mapping API

Congratulations! You now have a JS implementation to successfully make inference calls on your infra! Time to integrate with the Hub!

First step is to use the Model Mapping API to register which HF models are supported. 

<Tip>

To proceed with this step, we have to enable your account server-side. Make sure you have an organization on the Hub for your company, and upgrade it to a Team or Enterprise plan.

</Tip>

### Register a mapping item

```http
POST /api/partners/{provider}/models
```
Create a new mapping item, with the following body (JSON-encoded):

```json
{
    "task": "WidgetType", // required
    "hfModel": "string", // required: the name of the model on HF: namespace/model-name
    "providerModel": "string", // required: the partner's "model id" i.e. id on your side
    "status": "live" | "staging" // Optional: defaults to "staging". "staging" models are only available to members of the partner's org, then you switch them to "live" when they're ready to go live
}
```

- `task`, also known as `pipeline_tag` in the HF ecosystem, is the type of model / type of API
(examples: "text-to-image", "text-generation", but you should use "conversational" for chat models)
- `hfModel` is the model id on the Hub's side.
- `providerModel` is the model id on your side (can be the same or different).

The output of this route is a mapping ID that you can later use to update the mapping's status or delete it.

### Using a tag-filter to map several HF models to a single inference endpoint

We also support mapping HF models based on their `tags`. Using tag filters, you can automatically map multiple HF models to a single inference endpoint on your side.
For example, any model tagged with both `lora` and `base_model:adapter:black-forest-labs/FLUX.1-dev` can be mapped to your Flux-dev LoRA inference endpoint.


<Tip>

Important: Make sure that the JS client library can handle LoRA weights for your provider. Check out [fal's implementation](https://github.com/huggingface/huggingface.js/blob/904964c9f8cd10ed67114ccb88b9028e89fd6cad/packages/inference/src/providers/fal-ai.ts#L78-L124) for more details. 

</Tip>

The API is as follows:

```http
POST /api/partners/{provider}/models
```
Create a new mapping item, with the following body (JSON-encoded):

```json
{
    "type": "tag-filter", // required
    "task": "WidgetType", // required
    "tags": ["string"], // required: any HF model with all of those tags will be mapped to providerModel
    "providerModel": "string", // required: the partner's "model id" i.e. id on your side
    "adapterType": "lora", // required: only "lora" is supported at the moment
    "status": "live" | "staging" // Optional: defaults to "staging". "staging" models are only available to members of the partner's org, then you switch them to "live" when they're ready to go live
}
```

- `task`, also known as `pipeline_tag` in the HF ecosystem, is the type of model / type of API
(examples: "text-to-image", "text-generation", but you should use "conversational" for chat models)
- `tags` is the set of model tags to match. For example, to match all LoRAs of Flux, you can use: `["lora", "base_model:adapter:black-forest-labs/FLUX.1-dev"]` 
- `providerModel` is the model ID on your side (can be the same or different from the HF model ID).
- `adapterType` is a literal value that helps client libraries interpret how to call your API. The only supported value at the moment is `"lora"`.

The output of this route is a mapping ID that you can later use to update the mapping's status or delete it.

#### Authentication

You need to be in the _provider_ Hub organization (e.g. https://huggingface.co/togethercomputer
for TogetherAI) with **Write** permissions to be able to access this endpoint.

#### Validation

The endpoint validates that:
- `hfModel` is indeed of `pipeline_tag == task` OR `task` is "conversational" and the model is
compatible (i.e. the `pipeline_tag` is either "text-generation" or "image-text-to-text" AND the model is tagged as "conversational").
- (in the future) we auto-test that the Partner's API successfully responds to a
huggingface.js/inference call of the corresponding task i.e. the API specs are valid.

### Delete a mapping item

```http
DELETE /api/partners/{provider}/models/{mapping ID}
```

Where `mapping ID` is the mapping's id obtained upon creation.
You can also retrieve it from the [list API endpoint](#list-the-whole-mapping).

### Update a mapping item's status

Call this HTTP PUT endpoint:

```http
PUT /api/partners/{provider}/models/{mapping ID}/status
```

With the following body (JSON-encoded):

```json
{
    "status": "live" | "staging" // The new status, one of "staging" or "live"
}   
```

Where `mapping ID` is the mapping's id obtained upon creation.
You can also retrieve it from the [list API endpoint](#list-the-whole-mapping).

### List the whole mapping

```http
GET /api/partners/{provider}/models?status=staging|live
```
This gets all mapping items from the DB. For clarity, the output is grouped by task.

<Tip warning={true}>

This is publicly accessible. It's useful to be transparent by default and it helps debug client SDKs, etc.

</Tip>

Here is an example of response:

```json
{
    "text-to-image": {
        "black-forest-labs/FLUX.1-Canny-dev": {
            "_id": "xxxxxxxxxxxxxxxxxxxxxxxx",
            "providerId": "black-forest-labs/FLUX.1-canny",
            "status": "live"
        },
        "black-forest-labs/FLUX.1-Depth-dev": {
            "_id": "xxxxxxxxxxxxxxxxxxxxxxxx",
            "providerId": "black-forest-labs/FLUX.1-depth",
            "status": "live"
        },
        "tag-filter=base_model:adapter:stabilityai/stable-diffusion-xl-base-1.0,lora": {
            "_id": "xxxxxxxxxxxxxxxxxxxxxxxx",
            "status": "live",
            "providerId": "sdxl-lora-mutualized",
            "adapterType": "lora",
            "tags": [
                "base_model:adapter:stabilityai/stable-diffusion-xl-base-1.0",
                "lora"
            ]
        }
    },
    "conversational": {
        "deepseek-ai/DeepSeek-R1": {
            "_id": "xxxxxxxxxxxxxxxxxxxxxxxx",
            "providerId": "deepseek-ai/DeepSeek-R1",
            "status": "live"
        }
    },
    "text-generation": {
        "meta-llama/Llama-2-70b-hf": {
            "_id": "xxxxxxxxxxxxxxxxxxxxxxxx",
            "providerId": "meta-llama/Llama-2-70b-hf",
            "status": "live"
        },
        "mistralai/Mixtral-8x7B-v0.1": {
            "_id": "xxxxxxxxxxxxxxxxxxxxxxxx",
            "providerId": "mistralai/Mixtral-8x7B-v0.1",
            "status": "live"
        }
    }
}
```

### Automatic validation

Once a mapping is created through the API, Hugging Face performs periodic automated tests to ensure the mapped endpoint functions correctly.

Each model is tested every 6 hours by making API calls to your service. If the test is successful, the model remains active and continues to be tested periodically. However, if the test fails (e.g., your service returns an HTTP error status during an inference request), the provider will be temporarily removed from the list of active providers.

<div class="flex justify-center">
    <picture>
        <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/automatic-validation-light.png">
        <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/automatic-validation-dark.png">
    </picture>
</div>

A failed mapping undergoes retesting every hour. Additionally, updating the status of a model mapping triggers an immediate validation test.

The validation process checks the following:

- The Inference API is reachable, and the HTTP call succeeds.
- The output format is compatible with the Hugging Face JavaScript Inference Client.
- Latency requirements are met:
  - For conversational and text models: under 5 seconds (time to first token in streaming mode).
  - For other tasks: under 30 seconds.

For large language models (LLMs), additional behavioral tests are conducted:

- Tool calling support.
- Structured output support.

These tests involve sending specific inference requests to the model and verifying that the responses meet the expected format.

## 4. Billing

For routed requests (see figure below), i.e. when users authenticate via HF, our intent is that
our users only pay the standard provider API rates. There's no additional markup from us, we
just pass through the provider costs directly. 
More details about the pricing structure can be found on the [pricing page](./pricing).

<div class="flex justify-center">
    <img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/types_of_billing.png"/>
</div> 


We propose an easier way to figure out this cost and charge it to our users, by asking you to
provide the cost for each request via an HTTP API you host on your end. 

### HTTP API Specs

We ask that you expose an API that supports a HTTP POST request.
The body of the request is a JSON-encoded object containing a list of request IDs for which we
request the cost.
The authentication system should be the same as your Inference service; for example, a bearer token.

```http
POST {your URL here}
Authorization: {authentication info - eg "Bearer token"}
Content-Type: application/json

{
    "requestIds": [
        "deadbeef0",
        "deadbeef1",
        "deadbeef2",
        "deadbeef3"
    ]
}
```

The response is also JSON-encoded. The response contains an array of objects specifying the
request's ID and its cost in nano-USD (10^-9 USD).
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "requests": [
        { "requestId": "deadbeef0", "costNanoUsd": 100 },
        { "requestId": "deadbeef1", "costNanoUsd": 100 },
        { "requestId": "deadbeef2", "costNanoUsd": 100 },
        { "requestId": "deadbeef3", "costNanoUsd": 100 }
    ]
}
```

### Price Unit

We require the price to be a **non-negative integer** number of **nano-USDs** (10^-9 USD).

### How to define the request ID

For each request/generation you serve, you should define a unique request (or response) ID,
and provide it as a response Header. We will use this ID as the request ID for the billing API
above.

As part of those requirements, please let us know your Header name. If you don't already have one, we suggest the `Inference-Id` name for instance, and it should contain a UUID character string.

**Example**: Defining an `Inference-Id` header in your inference response.

```http
POST /v1/chat/completions
Content-Type: application/json
[request headers]
[request body]
------
HTTP/1.1 200 OK
Content-Type: application/json
[other request headers]
Inference-Id: unique-id-00131
[response body]
```

## 5. Python client integration

<Tip>

Before adding a new provider to the `huggingface_hub` Python library, make sure that all the previous steps have been completed and everything is working on the Hub. Support in the Python library comes as a second step. 

</Tip>

### Implement the provider helper (Python)

Create a new file under `src/huggingface_hub/inference/_providers/{provider_name}.py` and copy-paste the following snippet.

Implement the methods that require custom handling. Check out the base implementation to check default behavior. If you don't need to override a method, just remove it. At least one of `_prepare_payload_as_dict` or `_prepare_payload_as_bytes` must be overwritten.

If the provider supports multiple tasks that require different implementations, create dedicated subclasses for each task, following the pattern shown in fal_ai.py.

For text-generation and conversational tasks, one can just inherit from BaseTextGenerationTask and BaseConversationalTask respectively (defined in _common.py) and override the methods if needed. Examples can be found in fireworks_ai.py and together.py.

```python
from typing import Any, Dict, Optional, Union

from ._common import TaskProviderHelper


class MyNewProviderTaskProviderHelper(TaskProviderHelper):
    def __init__(self):
        """Define high-level parameters."""
        super().__init__(provider=..., base_url=..., task=...)

    def get_response(
        self,
        response: Union[bytes, Dict],
        request_params: Optional[RequestParameters] = None,
    ) -> Any:
        """
        Return the response in the expected format.

        Override this method in subclasses for customized response handling."""
        return super().get_response(response)

    def _prepare_headers(self, headers: Dict, api_key: str) -> Dict:
        """Return the headers to use for the request.

        Override this method in subclasses for customized headers.
        """
        return super()._prepare_headers(headers, api_key)

    def _prepare_route(self, mapped_model: str, api_key: str) -> str:
        """Return the route to use for the request.

        Override this method in subclasses for customized routes.
        """
        return super()._prepare_route(mapped_model)

    def _prepare_payload_as_dict(self, inputs: Any, parameters: Dict, mapped_model: str) -> Optional[Dict]:
        """Return the payload to use for the request, as a dict.

        Override this method in subclasses for customized payloads.
        Only one of `_prepare_payload_as_dict` and `_prepare_payload_as_bytes` should return a value.
        """
        return super()._prepare_payload_as_dict(inputs, parameters, mapped_model)

    def _prepare_payload_as_bytes(
        self, inputs: Any, parameters: Dict, mapped_model: str, extra_payload: Optional[Dict]
    ) -> Optional[bytes]:
        """Return the body to use for the request, as bytes.

        Override this method in subclasses for customized body data.
        Only one of `_prepare_payload_as_dict` and `_prepare_payload_as_bytes` should return a value.
        """
        return super()._prepare_payload_as_bytes(inputs, parameters, mapped_model, extra_payload)
```

### Register the Provider
- Go to [src/huggingface_hub/inference/_providers/__init__.py](https://github.com/huggingface/huggingface_hub/blob/main/src/huggingface_hub/inference/_providers/__init__.py) and add your provider to `PROVIDER_T` and `PROVIDERS`. Please try to respect alphabetical order. 
- Go to [src/huggingface_hub/inference/_client.py](https://github.com/huggingface/huggingface_hub/blob/main/src/huggingface_hub/inference/_client.py) and update docstring in `InferenceClient.__init__` to document your provider.

### Add tests
- Go to [tests/test_inference_providers.py](https://github.com/huggingface/huggingface_hub/blob/main/tests/test_inference_providers.py) and add static tests for overridden methods.


## 6. Add provider documentation

Create a dedicated documentation page for your provider within the Hugging Face documentation. This page should contain a concise description of your provider services, highlight the benefits for users, set expectations regarding performance or features, and include any relevant details such as pricing models or data retention policies. Essentially, provide any information that would be valuable to end users.

Here's how to add your documentation page:

-   Provide Your Logo: You can send your logo files (separate light and dark mode versions) directly to us. This is often the simplest way. Alternatively, if you prefer, you can open a PR in the [huggingface/documentation-images](https://huggingface.co/datasets/huggingface/documentation-images/tree/main/inference-providers/logos) repository. If you choose to open a PR:
    *   Logos must be in `.png` format.
    *   Name them `{provider-name}-light.png` and `{provider-name}-dark.png`.
    *   Please ping `@Wauplin` and `@celinah` on the PR.
-   Create the Documentation File:
    *   Use an existing provider page as a template. For example, check out the template for [Fal AI](https://github.com/huggingface/hub-docs/blob/main/scripts/inference-providers/templates/providers/fal-ai.handlebars).
    *   The file should be located under `scripts/inference-providers/templates/providers/{your-provider-name}.handlebars`.
-   Submit the Documentation PR:
    *   Add your new `{provider-name}.handlebars` file.
    *   Update the [partners table](./index#partners) to include your company or product.
    *   Update the `_toctree.yml` file in the `docs/inference-providers/` directory to include your new documentation page in the "Providers" section, maintaining alphabetical order.
    *   Update the `scripts/inference-providers/scripts/generate.ts` file to include your provider in the `PROVIDERS_HUB_ORGS` and `PROVIDERS_URLS` constants, maintaining alphabetical order.
    *   Run `pnpm install` (if you haven't already) and then `pnpm run generate` at the root of the `scripts/inference-providers` repository to generate the documentation. 
    *    Commit all your changes, including the manually edited files (provider page, `_toctree.yml`, partners table) and the files generated by the script.
    *   When you open the PR, please ping @Wauplin, @SBrandeis, @julien-c, and @hanouticelina for a review. If you need any assistance with these steps, please reach out – we're here to help you!

## FAQ

**Question:** By default, in which order do we list providers in the settings page?

**Answer:** The default sort is by total number of requests routed by HF over the last 7 days. This order defines which provider will be used in priority by the widget on the model page (but the user's order takes precedence).


