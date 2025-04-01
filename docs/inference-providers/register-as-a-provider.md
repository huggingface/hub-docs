# How to be registered as an inference provider on the Hub?

If you'd like to be an inference provider on the Hub, you must follow the steps outlined in this guide.

## 1. Requirements

<Tip>

If you provide inference only for LLMs and VLMs following the OpenAI API, you
can probably skip most of this section and just open a PR on
https://github.com/huggingface/huggingface.js/tree/main/packages/inference to add you as a provider.

</Tip>

The first step to understand the integration is to take a look at the JS inference client that lives
inside the huggingface.js repo:
https://github.com/huggingface/huggingface.js/tree/main/packages/inference

This is the client that powers our Inference widgets on model pages, and is the blueprint
implementation for other downstream SDKs like Python's `huggingface-hub` and other tools.

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

### 1. Implement the provider helper

Create a new file under packages/inference/src/providers/{provider_name}.ts and copy-paste the following snippet.

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

	getResponse(response: TogetherBase64ImageGeneration, outputType?: "url" | "blob"): string | Promise<Blob>{
		// Return the response in the expected format.
        throw new Error("Needs to be implemented");
    }
}
```

Implement the methods that require custom handling. Check out the base implementation to check default behavior. If you don't need to override a method, just remove it. You have to define at least `makeRoute`, `preparePayload` and `getResponse`.

If the provider supports multiple tasks that require different implementations, create dedicated subclasses for each task, following the pattern used in the existing providers implementation, e.g. [Together AI provider implementation](https://github.com/huggingface/huggingface.js/blob/main/packages/inference/src/providers/together.ts).

For text-generation and conversational tasks, one can just inherit from BaseTextGenerationTask and BaseConversationalTask respectively (defined in [providerHelper.ts]((https://github.com/huggingface/huggingface.js/blob/main/packages/inference/src/providers/providerHelper.ts))) and override the methods if needed. Examples can be found in [Cerebras](https://github.com/huggingface/huggingface.js/blob/main/packages/inference/src/providers/cerebras.ts) or [Fireworks](https://github.com/huggingface/huggingface.js/blob/main/packages/inference/src/providers/fireworks.ts) provider implementations.

### 2. Register the provider

Go to [packages/inference/src/lib/getProviderHelper.ts](https://github.com/huggingface/huggingface.js//blob/main/packages/inference/src/lib/getProviderHelper.ts) and add your provider to `PROVIDERS`. Please try to respect alphabetical order. 

### 3. Add tests

Go to [packages/inference/test/InferenceClient.spec.ts](https://github.com/huggingface/huggingface.js/blob/main/packages/inference/test/InferenceClient.spec.ts) and add new tests for each task supported by your provider. 


## 3. Model Mapping API

Once you've verified the huggingface.js/inference client can call your models successfully, you
can use our Model Mapping API.

This API lets a Partner "register" that they support model X, Y or Z on HF.

This enables:
- The inference widget on corresponding model pages
- Inference compatibility throughout the HF ecosystem (Python and JS client SDKs for instance), and any downstream tool or library

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

In the future, we will add support for a new parameter (ping us if it's important to you now):
```json
{
    "hfFilter": ["string"] // (both can't be defined at the same time)
    // ^Power user move: register a "tag" slice of HF in one go.
    // Example: tag == "base_model:adapter:black-forest-labs/FLUX.1-dev" for all Flux-dev LoRAs
}
```
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
DELETE /api/partners/{provider}/models?hfModel=namespace/model-name
```

### Update a mapping item's status

Call this HTTP PUT endpoint:

```http
PUT /api/partners/{provider}/models/status
```

With the following body (JSON-encoded):

```json
{
    "hfModel": "namespace/model-name", // The name of the model on HF
    "status": "live" | "staging" // The new status, one of "staging" or "live"
}   
```

### List the whole mapping

```http
GET /api/partners/{provider}/models?status=staging|live
```
This gets all mapping items from the DB. For clarity/DX, the output is grouped by task.

<Tip warning={true}>
This is publicly accessible. It's useful to be transparent by default and it helps debug client SDKs, etc.
</Tip>

Here is an example of response:

```json
{
    "text-to-image": {
        "black-forest-labs/FLUX.1-Canny-dev": {
            "providerId": "black-forest-labs/FLUX.1-canny",
            "status": "live"
        },
        "black-forest-labs/FLUX.1-Depth-dev": {
            "providerId": "black-forest-labs/FLUX.1-depth",
            "status": "live"
        }
    },
    "conversational": {
        "deepseek-ai/DeepSeek-R1": {
            "providerId": "deepseek-ai/DeepSeek-R1",
            "status": "live"
        }
    },
    "text-generation": {
        "meta-llama/Llama-2-70b-hf": {
            "providerId": "meta-llama/Llama-2-70b-hf",
            "status": "live"
        },
        "mistralai/Mixtral-8x7B-v0.1": {
            "providerId": "mistralai/Mixtral-8x7B-v0.1",
            "status": "live"
        }
    }
}
```

## 4. Billing

For routed requests (see figure below), i.e. when users authenticate via HF, our intent is that
our users only pay the standard provider API rates. There's no additional markup from us, we
just pass through the provider costs directly.

<div class="flex justify-center">
    <img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/types_of_billing.png"/>
</div> 

For LLM providers, a workaround some people use is to extract numbers of input and output
tokens in the responses and multiply by a hardcoded pricing table – this is quite brittle, so we
are reluctant to do this.
We propose an easier way to figure out this cost and charge it to our users, by asking you to
provide the cost for each request via an HTTP API you host on your end.

### HTTP API Specs

We ask that you expose an API that supports a HTTP POST request.
The body of the request is a JSON-encoded object containing a list of request IDs for which we
request the cost.

```http
POST {your URL here}
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

We require the price to be an **integer** number of **nano-USDs** (10^-9 USD).

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

### 1. Implement the provider helper
Create a new file under src/huggingface_hub/inference/_providers/{provider_name}.py and copy-paste the following snippet.

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

### 2. Register the Provider
- Go to [src/huggingface_hub/inference/_providers/__init__.py](https://github.com/huggingface/huggingface_hub/blob/main/src/huggingface_hub/inference/_providers/__init__.py) and add your provider to `PROVIDER_T` and `PROVIDERS`. Please try to respect alphabetical order. 
- Go to [src/huggingface_hub/inference/_client.py](https://github.com/huggingface/huggingface_hub/blob/main/src/huggingface_hub/inference/_client.py) and update docstring in `InferenceClient.__init__` to document your provider.

### 3. Add tests
- Go to [tests/test_inference_providers.py](https://github.com/huggingface/huggingface_hub/blob/main/tests/test_inference_providers.py) and add static tests for overridden methods.
- Go to [tests/test_inference_client.py](https://github.com/huggingface/huggingface_hub/blob/main/tests/test_inference_client.py) and add VCR tests:


    a. Add an entry to `_RECOMMENDED_MODELS_FOR_VCR` at the top of the test module. This contains a mapping task <> test model. model-id must be the HF model id.
    ```python
    _RECOMMENDED_MODELS_FOR_VCR = {
        "your-provider": {
            "task": "model-id",
            ...
        },
        ...
    }
    ```

    b. Set up authentication: To record VCR cassettes, you'll need authentication:
    If you are a member of the provider organization (e.g., Replicate organization: https://huggingface.co/replicate), you can set the HF_INFERENCE_TEST_TOKEN environment variable with your HF token:

    ```bash
    export HF_INFERENCE_TEST_TOKEN="your-hf-token"
    ```
    
    If you're not a member but the provider is officially released on the Hub, you can set the HF_INFERENCE_TEST_TOKEN environment variable as above. If you don't have enough inference credits, we can help you record the VCR cassettes.

    c. Record and commit tests
    Run the tests for your provider:
    ```bash
    pytest tests/test_inference_client.py -k <provider>
    ```

    d. Commit the generated VCR cassettes with your PR.


## FAQ

**Question:** By default, in which order do we list providers in the settings page?

**Answer:** The default sort is by total number of requests routed by HF over the last 7 days. This order defines which provider will be used in priority by the widget on the model page (but the user's order takes precedence).

## Get in touch!
