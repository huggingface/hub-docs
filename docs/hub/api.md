# Hub API Endpoints

We have open endpoints that you can use to retrieve information from the Hub as well as perform certain actions such as creating model, dataset or Space repos. We offer a wrapper Python client, [`huggingface_hub`](https://github.com/huggingface/huggingface_hub), and a JS client, [`huggingface.js`](https://github.com/huggingface/huggingface.js), that allow easy access to these endpoints. We also provide [webhooks](./webhooks) to receive real-time incremental info about repos. Enjoy!

> [!NOTE]
> We've moved the Hub API Endpoints documentation to our [OpenAPI Playground](https://huggingface.co/spaces/huggingface/openapi), which provides a comprehensive reference that's always up-to-date. You can also access the OpenAPI specification directly at [https://huggingface.co/.well-known/openapi.json](https://huggingface.co/.well-known/openapi.json).

> [!NOTE]
> All API calls are subject to the HF-wide [Rate limits](./rate-limits). Upgrade your account if you need elevated, large-scale access.

<div class="flex justify-center">
<a href="https://huggingface.co/spaces/huggingface/openapi" target="_blank">
<img class="w-full object-contain" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/hub-api-playground.png"/>
</a>
</div>
