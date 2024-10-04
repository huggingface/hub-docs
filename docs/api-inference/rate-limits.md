# Rate Limits

The Inference API has rate limits based on the number of requests. These rate limits are subject to change in the future to be compute-based or token-based. 

Serverless API is not meant to be used for heavy production applications. If you need higher rate limits, consider [Inference Endpoints](https://huggingface.co/docs/inference-endpoints) to have dedicated resources.

You need to be authenticated (passing a token or through your browser) to use the Inference API.


| User Tier           | Rate Limit                |
|---------------------|---------------------------|
| Signed-up Users     | 1,000 requests per day     |
| PRO and Enterprise Users           | 20,000 requests per day    |