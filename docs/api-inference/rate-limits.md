# Rate Limits

The Inference API has rate limits based on the number of requests. These rate limits are subject to change in the future to be compute-based or token-based. 

Serverless API is not meant to be used for heavy production applications. If you need higher rate limits, consider [Inference Endpoints](https://huggingface.co/docs/inference-endpoints) to have dedicated resources.

| User Tier           | Rate Limit                |
|---------------------|---------------------------|
| Unregistered Users  | 1 request per hour        |
| Signed-up Users     | 50 requests per hour     |
| PRO and Enterprise Users           | 500 requests per hour    |