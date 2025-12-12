# Pricing and Billing

Billing on Jobs is based on hardware usage and is computed by the minute: you get charged for every minute the Jobs runs on the requested hardware.

During a Job’s lifecycle, it is only billed when the Job is Starting or Running. This means that there is no cost during build.

If a running Job starts to fail, it will be automatically suspended and the billing will stop.

Jobs have a timeout of 30 minutes by default. You can change this behavior by setting a custom `timeout` when creating the Job. For example in the CLI:

```bash
hf jobs run --timeout 3h ...
```

You can look at your current billing information for Jobs in in your [Billing](https://huggingface.co/settings/billing) page, under the "Compute Usage" section:

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/jobs/billing.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/jobs/billing-dark.png"/>
</div>

To interrupt the billing on a Job, you can cancel it:

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/jobs/cancel-jobs.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/jobs/cancel-jobs-dark.png"/>
</div>

Additional information about billing can be found in the dedicated Hub-wide section.
