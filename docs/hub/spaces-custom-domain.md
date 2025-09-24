# Spaces Custom Domain  


> [!WARNING]
> Spaces Custom Domain feature is part of PRO and Team or Enterprise subscriptions.

## Getting started with a Custom Domain

Spaces Custom Domain is a feature that allows you to host your space in a custom domain of your choosing: `yourdomain.example.com` 🚀 The custom domain must be a valid DNS name.

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/custom-domain-feature_light.png"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/custom-domain-feature_dark.png"/>
</div>

## Using a Custom Domain

You can submit a custom domain to host your space in the settings of your Space, under "Custom Domain". You'll need to add the CNAME Record Type: 

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/custom-domain-dns_light.png"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/custom-domain-dns_dark.png"/>
</div>

The request will move to 'pending' status after submission as seen below. 

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/custom-domain-pending_light.png"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/custom-domain-pending_dark.png"/>
</div>

Please make sure to point the domain to `hf.space`. Once set up, you'll see a 'ready' status to know the custom domain is active for your Space 🔥

## Removing a Custom Domain

Simply remove a custom domain by using the delete button to the right of “Custom Domain” in the settings of your Space. You can delete while the custom domain is pending or in ready state.
