# Billing

At Hugging Face, we build a collaboration platform for the ML community (i.e., the Hub) and monetize by providing advanced features and simple access to compute for AI.

Any feedback or support request related to billing is welcome at billing@huggingface.co

## Enterprise Hub subscriptions

We offer advanced security and compliance features for organizations through our Enterprise Hub subscription, including [Single Sign-On](./enterprise-sso), [Advanced Access Control](./enterprise-hub-resource-groups) for repositories, control over your data location, higher [storage capacity](./storage-limits) for private repositories, and more.

The Enterprise Hub is billed like a typical subscription. It renews automatically, but you can choose to cancel it at any time in the organization's billing settings.

You can pay for the Enterprise Hub subscription with a credit card or your AWS account.

Upon renewal, the number of seats in your Enterprise Hub subscription will be updated to match the number of members of your organization.
Private repository storage above the [included storage](./storage-limits) will be billed along with your subscription renewal.


<div class="flex justify-center">
	<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/billing/enterprise-sub-light.png"/>
	<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/billing/enterprise-sub-dark.png"/>
</div>

## PRO subscription

The PRO subscription unlocks additional features for users, including:

- Higher free tier for the Serverless Inference API and when consuming ZeroGPU Spaces
- Higher [storage capacity](./storage-limits) for private repositories
- Ability to create ZeroGPU Spaces and use Dev Mode
- Ability to write Social Posts and Community Blogs
- Leverage the Dataset Viewer on private datasets

View the full list of benefits at https://huggingface.co/subscribe/pro

Similarly to the Enterprise Hub subscription, PRO subscriptions are billed like a typical subscription. The subscription renews automatically for you. You can choose to cancel the subscription at anytime in your billing settings: https://huggingface.co/settings/billing

You can only pay for the PRO subscription with a credit card. The subscription is billed separately from any pay-as-you-go compute usage.
Private repository storage above the [included storage](./storage-limits) will be billed along with your subscription renewal.

Note: PRO benefits are also included in the Enterprise Hub subscription.

## Pay-as-you-go private storage 

Above the included 1TB (or 1TB per seat) of private storage in PRO and Enterprise Hub, private storage is invoiced at **$25/TB/month**, in 1TB increments.
It is billed with the renewal invoices of your PRO or Enterprise Hub subscription.


## Compute Services on the Hub

We also directly provide compute services with [Spaces](./spaces), [Inference Endpoints](https://huggingface.co/docs/inference-endpoints/index) and the [Serverless Inference API](https://huggingface.co/docs/inference-providers/index).

While most of our compute services have a comprehensive free tier, users and organizations can pay to access more powerful hardware accelerators.

The billing for our compute services is usage-based, meaning you only pay for what you use. You can monitor your usage at any time from your billing dashboard, located in your user's or organization's settings menu.

<div class="flex justify-center">
	<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/billing/billing-dashboard-light.png"/>
	<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/billing/billing-dashboard-dark.png"/>
</div>

Compute services usage is billed separately from PRO and Enterprise Hub subscriptions (and potential private storage).
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

**Q. Why did I get charged $10 when I added my credit card? When will I get this back?**

A. This amount is not charged and the hold should clear within a few business days. If you have more questions about the status of the clear, you can contact your bank for more information. 

**Q. My card was declined after adding to my account. What’s up?**

A. Please ensure the card supports 3D-secure authentication and is properly configured for recurring online payments. We do not yet support credit cards issued in India as we’re working on adding system compliance with the latest RBI directives. Until we add support for Indian credit cards, you can:
* Link an organization account to an AWS account in order to access pay-as-you-go features (Endpoints, Spaces, AutoTrain): [Hugging Face Platform on the AWS Marketplace: Pay with your AWS Account](https://huggingface.co/blog/aws-marketplace)
* Use a credit card issued in another country

**Q. When am I going to get my invoice for pay as you go services?**

A. We bill in arrears and issue invoices for the prior month’s usage - typically the first of the month. So if you incurred billing usage in January, you’ll see the final payment process and invoiced February 1st.

**Q. Why did you charge me multiple times during the month?**

A. If you’re a new HF account using our premium pay as you go services, we’ll process a few billing threshold payments. Don’t worry, you’ll get an invoice for the total usage incurred for the month at the end of the billing period that will include these processed thresholds payments. For more information see https://huggingface.co/docs/hub/billing#billing-thresholds--invoicing.

**Q. I need copies of my past invoices, where can I find these?**

A. You can access up to the previous 3 months from the current month in your billing settings: https://huggingface.co/settings/billing. Click on the “End-of-period Invoice” link under that month’s “Payments & Invoices” and you’ll be able to download the invoice and the receipt. As an example:, if it’s currently January, you’ll be able to access the previous months’ invoices: December, November, and October. You can also check your email as we’ll send a copy of the invoice / receipt to the email address on the account. 

**Q. I need to update my credit card in my account. What to do?**

A. Head to https://huggingface.co/settings/billing/payment and update your payment method at anytime. 

**Q. Oh no! My payment failed, what do I do to avoid a service interruption?**

A. You can pay your bill with another payment method by clicking on the “pay online” link in the unpaid invoice. Click on the “End-of-period Invoice” link under that month’s “Payments & Invoices” and you’ll be able to pay online. You can also update your credit card at https://huggingface.co/settings/billing/payment.

**Subscriptions**

**Q. I need to pause my PRO subscription for a bit, where can I do this?**

A. You can cancel your subscription at anytime here: https://huggingface.co/settings/billing/subscription. 
Drop us a line at billing@huggingface.co with your feedback.

**Q. My org has an Enterprise Hub subscription and I need to update the number of seats. How can I do this?**

A. The number of seats will automatically be adjusted at the time of the subscription renewal to reflect any increases in the number of members in the organization during the previous period. There’s no need to update the subscribed number of seats during the month or year as it’s a flat fee subscription.

