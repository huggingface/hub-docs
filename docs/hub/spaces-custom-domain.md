# Spaces Custom Domain


> [!WARNING]
> This feature is part of <a href="https://huggingface.co/pro">PRO</a> or <a href="https://huggingface.co/enterprise">Team & Enterprise</a> plans.

## Getting started with a Custom Domain

Spaces Custom Domain allows you to host your Space on a custom domain of your choosing: `yourdomain.example.com`. The custom domain must be a valid DNS name.

> [!NOTE]
> Custom domains require your Space to have **public** or **protected** visibility. They are not supported on private Spaces.

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/custom-domain-feature_light.png"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/custom-domain-feature_dark.png"/>
</div>

### Setting up your domain

You can submit a custom domain in the settings of your Space, under "Custom Domain". You'll need to add a CNAME record pointing your domain to `hf.space`:

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/custom-domain-dns_light.png"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/custom-domain-dns_dark.png"/>
</div>

### Verifying your domain

After submission, the request will move to "pending" status:

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/custom-domain-pending_light.png"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/custom-domain-pending_dark.png"/>
</div>

Once the DNS is properly configured, you'll see a "ready" status confirming the custom domain is active for your Space.

If you've completed all the steps but aren't seeing a "ready" status, you can enter your domain [here](https://toolbox.googleapps.com/apps/dig/#CNAME/) to verify it points to `hf.space`. If it doesn't, please check your domain host to ensure the CNAME record was added correctly.

## Removing a Custom Domain

Simply remove a custom domain by using the delete button to the right of "Custom Domain" in the settings of your Space. You can delete while the custom domain is pending or in ready state.
