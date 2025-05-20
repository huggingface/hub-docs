# Spaces Custom Domain  

<Tip warning={true}>
This feature is still in Beta stage.
</Tip> 

<Tip warning={true}>
Spaces Custom Domain feature is part of PRO and Enterprise Hub subscriptions.
</Tip>

## Getting started with a Custom Domain

Spaces Custom Domain is a feature that allows you to host your space in a custom domain of your choosing: yourdomain.example.com. The custom domain must be a valid DNS name.

<div class="flex justify-center" style="max-width: 550px">
<img class="block dark:hidden m-0!" src="https://huggingface.co/datasets/huggingface/documentation-images/blob/main/custom-domain-feature_light.png" alt="screenshot of custom domain feature"/>
<img class="hidden dark:block m-0!" src="https://huggingface.co/datasets/huggingface/documentation-images/blob/main/custom-domain-feature_dark.png" alt="screenshot of custom domain feature"/>
</div>

## Using a Custom Domain

You can submit a custom domain to host your space in the settings of your Space, under "Custom Domain". You'll need to add the CNAME Record Type: 

<div class="flex justify-center" style="max-width: 550px">
<img class="block dark:hidden m-0!" src="https://huggingface.co/datasets/huggingface/documentation-images/blob/main/custom-domain-dns_light.png" alt="screenshot of using custom domain"/>
<img class="hidden dark:block m-0!" src="https://huggingface.co/datasets/huggingface/documentation-images/blob/main/custom-domain-dns_dark.png" alt="screenshot of using custom domain"/>
</div>

The request will move to 'PENDING' status after submission as seen below. 

<div class="flex justify-center" style="max-width: 550px">
<img class="block dark:hidden m-0!" src="https://huggingface.co/datasets/huggingface/documentation-images/blob/main/custom-domain-pending_light.png" alt="screenshot of custom domain pending”/>
<img class="hidden dark:block m-0!" src="https://huggingface.co/datasets/huggingface/documentation-images/blob/main/custom-domain-pending_dark.png" alt="screenshot of custom domain pending"/>
</div>

Please make sure to point the domain to Hugging Face Spaces. Once set up, you'll see a 'READY' status to know the custom domain is active for your Space 🔥

## Removing a Custom Domain

Simply remove a custom domain by using the delete button to the right of “Custom Domain” in the settings of your Space. You can delete while the custom domain is pending or in ready state.
