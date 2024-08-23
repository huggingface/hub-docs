# Billing

At Hugging Face, we build a collaboration platform for the ML community (i.e., the Hub), and we **monetize by providing simple access to compute for AI**.


## Cloud providers partnerships

We partner with cloud providers, like [AWS](https://huggingface.co/blog/aws-partnership), [Azure](https://huggingface.co/blog/hugging-face-endpoints-on-azure) and [Google Cloud](https://huggingface.co/blog/llama31-on-vertex-ai) to make it easy for customers to use Hugging Face directly in their cloud of choice. These solutions and usage are billed directly by the cloud provider. Ultimately we want people to be able to have great options to use Hugging Face wherever they build Machine Learning.

## Compute Services on the Hub

We also directly provide compute services with [Spaces](./spaces), [Inference Endpoints](https://huggingface.co/docs/inference-endpoints/index) and the [Serverless Inference API](https://huggingface.co/docs/api-inference/index).

While most of our compute services have a comprehensive free-tier, users and organizations can pay to access more powerful hardware accelerators.

The billing for our compute services is usage-based, meaning you only pay for what you use. You can monitor your usage at any time from your billing dashboard, located in the settings menu of your user or organization.

<div class="flex justify-center">
	<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/refs%2Fpr%2F357/hub/billing/billing-dashboard-light.png"/>
	<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/refs%2Fpr%2F357/hub/billing/billing-dashboard-dark.png"/>
</div>

### Available payment methods

Hugging Face uses [Stripe](https://stripe.com) to securely process your payment information.

The only payment method supported for Hugging Face compute services is credit cards.
You can add a credit card to your account from your billing settings.

<div class="flex justify-center">
	<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/refs%2Fpr%2F357/hub/billing/payment-method-light.png"/>
	<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/refs%2Fpr%2F357/hub/billing/payment-method-dark.png"/>
</div>

You also have an option to link your Hugging Face organization to your AWS account via [AWS Marketplace](https://aws.amazon.com/marketplace/pp/prodview-n6vsyhdjkfng2). Hugging Face compute service usage will then be included in your AWS bill.

Read more in our [blog post](https://huggingface.co/blog/aws-marketplace).

### Billing thresholds & Invoicing

When using credit cards as a payment method, you'll be billed for the Hugging Face compute usage each time the accrued usage goes above a billing threshold for your user or organization.

On the 1st of every month, Hugging Face edits an invoice for usage accrued during the prior month. Any usage that has not yet been charged yet will be charged at that time.

For example, if your billing threshold is set at $100.00, and you incur $254.00 of usage during a given month, your credit card will be charged a total of three times during the month:
- Once for usage between $0 and $100: $100
- Once for usage between $100 and $200: $100
- Once at the end of the month for the remaining $54: $54  

Note: this will be detailed in your monthly invoice.

<div class="flex justify-center">
	<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/refs%2Fpr%2F357/hub/billing/explain-threshold.png "/>
</div>

You can view receipts and invoices from your billing dashboard.

<div class="flex justify-center">
	<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/refs%2Fpr%2F357/hub/billing/threshold-payments-light.png "/>
	<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/refs%2Fpr%2F357/hub/billing/threshold-payments-dark.png"/>
</div>

## Enterprise Hub subscriptions

We offer advanced security and compliance features for organizations through our Enterprise Hub subscription, including [Single Sign-On](./enterprise-sso.md), [Advanced Access Control](./enterprise-hub-resource-groups.md) for repositories, control over your data location, and more.

The Enterprise Hub is billed like a typical subscription. The subscription renews automatically for you. You can choose to cancel the subscription at anytime in the organization's billing settings.

Upon renewal, the number of seats in your Enterprise Hub subscription will be updated to match the number of members of your organization.


<div class="flex justify-center">
	<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/refs%2Fpr%2F357/hub/billing/enterprise-sub-light.png"/>
	<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/refs%2Fpr%2F357/hub/billing/enterprise-sub-dark.png"/>
</div>
