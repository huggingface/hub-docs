# Rate Limits

The Inference API has temporary rate limits based on the number of requests. These rate limits are subject to change in the future to be compute-based or token-based. 

Serverless API is not meant to be used for heavy production applications. If you need higher rate limits, using [Inference Endpoints](https://huggingface.co/docs/inference/endpoints) to have dedicated resources.

| User Tier           | Rate Limit                |
|---------------------|---------------------------|
| Unregistered Users  | 1 request per hour        |
| Signed-up Users     | 300 requests per hour     |
| PRO and Enterprise Users           | 1000 requests per hour    |