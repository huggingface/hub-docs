# Network Security

<Tip warning={true}>
This feature is part of the <a href="https://huggingface.co/enterprise">Enterprise Hub __Plus__</a> plan.
</Tip>

## Define your organization IP Ranges

You can list the IP addresses of your organization's outbound traffic to apply for higher rate limits and/or to enforce authenticated access to Hugging Face from your corporate network.
The outbound IP address ranges are defined in <a href="https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing" target="_blank">CIDR</a> format. For example, `52.219.168.0/24` or `2600:1f69:7400::/40`.

You can set multiple ranges, one per line. 

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/enterprise/network-sec-ip-ranges.png" alt="Screenshot of the Organization IP Ranges field."/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/enterprise/dark-network-sec-ip-ranges.png" alt="Screenshot of the Organization IP Ranges field."/>
</div>


## Higher Rate Limits

Apply for higher rate-limits for your organization. 

Most of the actions on the Hub have limits, for example, users are limited to creating to a certain number of repositories per day. This option allows your organization to apply for higher limits for your organization members. 

To activate this option,

1. Toggle on the "Higher Hub rate-limits" option

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/enterprise/network-sec-rate-limit.png" alt="Screenshot of the toggle to enable High rate-limits."/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/enterprise/dark-network-sec-rate-limit.png" alt="Screenshot of the toggle to enable High rate-limits."/>
</div>

Please note, you're Enterprise Hub Plus subscription will be verified when activating this option.

2. Ensure the Organization IP Ranges is defined 

Once defined, higher rate limits will apply to the member of your organization with IPs matching the defined ranges. 


## Enforce authenticated access to the Hugging Face Hub

This option will ensure only authenticated users from your organization will be able to access the Hugging Face Hub. All public pages will show the following message if access unauthenticated:

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/enterprise/network-sec-restricted-url.png" alt="Screenshot of restricted pages on the Hub."/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/enterprise/dark-network-sec-restricted-url.png" alt="Screenshot of restricted pages on the Hub."/>
</div>

1. Toggle on the "Enforce authenticated access to the Hub" option

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/enterprise/network-sec-enforce-auth.png" alt="Screenshot of the toggle to enable Enforced authenticated access to the Hub."/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/enterprise/dark-network-sec-enforce-auth.png" alt="Screenshot of the toggle to enable Enforced authenticated access to the Hub."/>
</div>

Please note, you're Enterprise Hub Plus subscription will be verified when activating this option.

2. Ensure the Organization IP Ranges is defined 


### Content Access Policy 

You can also define a fine grained Content Access Policy by blocking some section of the Hugging Face Hub. 

For example, you can block your organization's members to access Spaces, by adding `/spaces/*` to the blocked URLs. When users of your organization will navigate to a page that matches the URL pattern they'll be presented the following page:

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/enterprise/network-sec-blocked-url.png" alt="Screenshot of blocked pages on the Hub."/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/enterprise/dark-network-sec-blocked-url.png" alt="Screenshot of blocked pages on the Hub."/>
</div>

To define Blocked URLs, enter URL patterns, without the domain name, one per line:

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/enterprise/network-sec-blocked-url.png" alt="Screenshot of blocked pages on the Hub."/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/enterprise/dark-network-sec-blocked-url.png" alt="Screenshot of blocked pages on the Hub."/>
</div>

The Allowed URLs field, enables you to define some exception to the blocking rules, especially. For example by allowing a specific URL within the Blocked URLs pattern, ie `/spaces/meta-llama/*`  
