# Billing

At Hugging Face, we build a collaboration platform for the ML community (i.e., the Hub) and monetize by providing advanced features and simple access to compute for AI.

Any feedback or support request related to billing is welcome at billing@huggingface.co

## Team and Enterprise subscriptions

We offer advanced security and compliance features for organizations through our Team or Enterprise plans, which include [Single Sign-On](./enterprise-sso), [Advanced Access Control](./enterprise-resource-groups) for repositories, control over your data location, higher [storage capacity](./storage-limits) for public and private repositories, and more.

Team and Enterprise plans are billed like a typical subscription. They renew automatically, but you can choose to cancel at any time in the organization's billing settings.

You can pay for a Team subscription with a credit card or your AWS account, or upgrade to Enterprise via an annual contract.

Upon renewal, the number of seats in your subscription will be updated to match the number of members of your organization.
Private repository storage above the [included storage](./storage-limits) will be billed along with your subscription renewal.


<div class="flex justify-center">
	<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/billing/enterprise-sub-light.png"/>
	<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/billing/enterprise-sub-dark.png"/>
</div>

## PRO subscription

The PRO subscription unlocks essential features for serious users, including:

- Higher [storage capacity](./storage-limits) for public and private repositories
- Higher bandwidth and API [rate limits](./rate-limits)
- Included credits for [Inference Providers](/docs/inference-providers/)
- Higher tier for ZeroGPU Spaces usage, and pay-as-you-go quota extension
- Ability to create ZeroGPU Spaces and use Dev Mode
- Ability to publish Social Posts and Community Blogs
- Leverage the [Data Studio](./data-studio) on private datasets

View the full list of benefits at https://huggingface.co/pro then subscribe over at https://huggingface.co/subscribe/pro

Similarly to the Team & Enterprise subscriptions, PRO subscriptions are billed like a typical subscription. The subscription renews automatically for you. You can choose to cancel the subscription at anytime in your billing settings: https://huggingface.co/settings/billing

You can only pay for the PRO subscription with a credit card. The subscription is billed separately from any pay-as-you-go compute usage.
Private repository storage above the [included storage](./storage-limits) will be billed along with your subscription renewal.

Note: PRO benefits are also included in the [Enterprise subscription](https://huggingface.co/enterprise).

## Pay-as-you-go private storage 

Above the included 1TB (or 1TB per seat) of private storage in PRO, Team, and Enterprise, additional private storage is billed in 1TB increments, at a base price of **$18/TB/month**. 

Overage is charged to your payment method in Pay-as-you-go mode.

Additional discounts are available for large-scale volumes through our account executives.
See the full pricing tiers at [huggingface.co/pricing](https://huggingface.co/pricing#storage).


## Compute Services on the Hub

We also directly provide compute services with [Spaces](./spaces), [Inference Endpoints](https://huggingface.co/docs/inference-endpoints/index) and [Inference Providers](https://huggingface.co/docs/inference-providers/index).

While most of our compute services have a comprehensive free tier, users and organizations can pay to access more powerful hardware accelerators.

The billing for our compute services is usage-based, meaning you only pay for what you use. You can monitor your usage at any time from your billing dashboard, located in your user's or organization's settings menu.

<div class="flex justify-center">
	<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/billing/billing-dashboard-light.png"/>
	<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/billing/billing-dashboard-dark.png"/>
</div>

Compute services usage is billed separately from PRO and Team / Enterprise subscriptions (and potential private storage).
Invoices for compute services are edited at the beginning of each month.

## Available payment methods

Hugging Face uses [Stripe](https://stripe.com) to securely process your payment information.

The only payment method supported for Hugging Face compute services is credit cards.
You can add a credit card to your account from your billing settings.

<div class="flex justify-center">
	<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/billing/payment-method-light.png"/>
	<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/billing/payment-method-dark.png"/>
</div>


### Billing thresholds & Invoicing

When using credit cards as a payment method, you'll be billed for the Hugging Face compute usage each time the accrued usage goes above a billing threshold for your user or organization.

On the 1st of every month, Hugging Face edits an invoice for usage accrued during the prior month. Any usage that has yet to be charged will be charged at that time.

For example, if your billing threshold is set at $100.00, and you incur $254.00 of usage during a given month, your credit card will be charged a total of three times during the month:
- Once for usage between $0 and $100: $100
- Once for usage between $100 and $200: $100
- Once at the end of the month for the remaining $54: $54  

Note: this will be detailed in your monthly invoice.

<div class="flex justify-center">
	<img class="block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/billing/explain-threshold.png "/>
</div>

You can view invoices and receipts for the last 3 months in your billing dashboard.

<div class="flex justify-center">
	<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/billing/threshold-payments-light.png "/>
	<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/billing/threshold-payments-dark.png"/>
</div>

## Cloud providers partnerships

We partner with cloud providers like [AWS](https://huggingface.co/blog/aws-partnership), [Azure](https://huggingface.co/blog/hugging-face-endpoints-on-azure),
and [Google Cloud](https://huggingface.co/blog/llama31-on-vertex-ai) to make it easy for customers to use Hugging Face directly in their cloud of choice.
These solutions and usage are billed directly by the cloud provider. Ultimately, we want people to have great options for using Hugging Face wherever they
build ML-powered products.

You also have the option to link your Hugging Face organization to your AWS account via [AWS Marketplace](https://aws.amazon.com/marketplace/pp/prodview-n6vsyhdjkfng2).
Hugging Face compute service usage will then be included in your AWS bill. Read more in our [blog post](https://huggingface.co/blog/aws-marketplace).

## Support FAQ 

**Q. Why do I need to add credits? What can I use them for?**

A. Credits let you use HF pay-as-you-go services:

- Jobs: run any workload on GPUs
- Inference Providers: call 250k+ models via API
- Inference Endpoints: dedicated deployments
- GPU Spaces: host on custom hardware
- ZeroGPU: extra quota beyond daily allowance
- Private Storage: extra storage for private repos

**Q. What happens if I run out of credits?**

A. We recommend enabling automatic recharge to avoid service disruptions after credits are exhausted.

**Q. I'm having issues adding my card. What’s up?**

A. Please ensure the card supports 3D-secure authentication and is properly configured for recurring online payments. We do not yet support credit cards issued in India as we’re working on adding system compliance with the latest RBI directives. Until we add support for Indian credit cards, you can:
* Link an organization account to an AWS account in order to access pay-as-you-go features (Endpoints, Spaces, AutoTrain): [Hugging Face Platform on the AWS Marketplace: Pay with your AWS Account](https://huggingface.co/blog/aws-marketplace)
* Use a credit card issued in another country

**Q. How can I add my tax ID or update the billing details?**

A. Email billing@huggingface.co and we can help!

**Q. I was just billed for the PRO/Team subscription a few days ago. Why did you charge me again?**

A. All subscriptions renew on the 1st of each month. We prorate the subscription charge if you sign up mid-month for your first month of Team or PRO.

**Q. I need copies of my past invoices, where can I find these?**

A. View and download all invoices here: https://huggingface.co/settings/billing/invoices. Invoices are also emailed.

**Q. I need to update my credit card in my account. What to do?**

A. Head to https://huggingface.co/settings/billing/payment and update your payment method at anytime. 


**Subscriptions**

**Q. I need to pause my PRO subscription for a bit, where can I do this?**

A. You can cancel your subscription at anytime here: https://huggingface.co/settings/billing/subscription. 
Drop us a line at billing@huggingface.co with your feedback.

**Q. My org has a Team or Enterprise subscription and I need to update the number of seats. How can I do this?**

A. The number of seats will automatically be adjusted at the time of the subscription renewal to reflect any increases in the number of members in the organization during the previous period. There’s no need to update the subscribed number of seats during the month or year as it’s a flat fee subscription.
