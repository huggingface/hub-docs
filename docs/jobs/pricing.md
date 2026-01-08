# Pricing and Billing

Billing on Jobs is based on hardware usage and is computed by the minute: you get charged for every minute the Jobs runs on the requested hardware.

During a Job’s lifecycle, it is only billed when the Job is Starting or Running. This means that there is no cost during build.

If a running Job starts to fail, it will be automatically suspended and the billing will stop.

## Bill to your organization

Billing is done to the user's namespace by default, but you can bill to your organization instead by specifying the right `namespace`:

```bash
hf jobs run --namespace my-org-name ...
```

In this case the Job runs under the organization account, and you can see it in your organization Jobs page (organization page > settings > Jobs).

## Set timeout limits

Set a `timeout` when creating the Job to ensure it can't run beyond a certain duration.
A Job run that reaches the `timeout` duration is automatically stopped, and so is its billing.
Here is how to set a timeout with the CLI:

```bash
hf jobs run --timeout 3h ...
```

Note that the default timeout is set to **30 minutes**.
You must therefore specify a longer timeout if your Job requires more time to run.

## Cancel Jobs

If a running Job is no longer relevant, you can cancel it prematurely to stop its billing, either via the Job page or the CLI:

```bash
hf jobs cancel <job-id>
```

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/jobs/cancel-job.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/jobs/cancel-job-dark.png"/>
</div>

## View current compute usage and billing

You can look at your current billing information for Jobs in in your [Billing](https://huggingface.co/settings/billing) page, under the "Compute Usage" section:

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/jobs/billing.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/jobs/billing-dark.png"/>
</div>

Additional information about billing can be found in the [dedicated Hub documentation](https://huggingface.co/docs/hub/en/billing).
