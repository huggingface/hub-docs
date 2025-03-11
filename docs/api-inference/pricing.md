# Pricing and Rate limits

As a HF user, you get monthly credits to run the HF Inference API. The amount of credits you get depends on your type of account (Free or PRO or Enterprise Hub), see table below.
You get charged for every inference request, based on the compute time x price of the underlying hardware.

For instance, a request to [black-forest-labs/FLUX.1-dev](https://huggingface.co/black-forest-labs/FLUX.1-dev) that takes 10 seconds to complete on a GPU machine that costs $0.00012 per second to run, will be billed $0.0012.

When your monthly included credits are depleted:
- if you're a Free user, you won't be able to query the Inference API anymore,
- if you're a PRO or Enterprise Hub user, you will get charged for the requests on top of your subscription. You can monitor your spending on your billing page.

Note that HF Inference API is not meant to be used for heavy production applications. If you need to handle large numbers of requests, consider [Inference Endpoints](https://huggingface.co/docs/inference-endpoints) to have dedicated resources or [Inference Providers](https://huggingface.co/blog/inference-providers) for serverless usage.

You need to be authenticated (passing a token or through your browser) to use the Inference API.


| User Tier                 | Included monthly credits           |
|---------------------------|------------------------------------|
| Free Users                | subject to change, less than $0.10 |
| PRO and Enterprise Users  | $2.00                              |

### Features using Inference Providers

Several Hugging Face features utilize the Inference API and count towards your monthly credits:

- Inference Widgets: Interactive chat widgets available on model pages.
- [Inference Playground](https://huggingface.co/playground): A comprehensive chat interface supporting various models and providers.
- Data Studio AI: Converts text to SQL queries for datasets.

The included monthly credits for PRO and Enterprise should cover moderate usage of these features for most users.
