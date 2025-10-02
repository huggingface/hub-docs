# Network Security

> [!WARNING]
> This feature is part of the <a href="https://huggingface.co/contact/sales?from=enterprise" target="_blank">Enterprise Plus</a> plan.

## Define your organization IP Ranges

You can list the IP addresses of your organization's outbound traffic to apply for higher rate limits and/or to enforce authenticated access to Hugging Face from your corporate network.
The outbound IP address ranges are defined in <a href="https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing" target="_blank">CIDR</a> format. For example, `52.219.168.0/24` or `2600:1f69:7400::/40`.

You can set multiple ranges, one per line. 

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/enterprise/network-sec-ip-ranges.png" alt="Screenshot of the Organization IP Ranges field."/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/enterprise/dark-network-sec-ip-ranges.png" alt="Screenshot of the Organization IP Ranges field."/>
</div>


## Higher Hub rate limits

Apply for higher rate-limits for your organization. 

Most of the actions on the Hub have limits, for example, users are limited to creating a certain number of repositories per day. This option allows your organization to apply for higher limits for your organization members. This also enables higher HTTP rate limits on the Hub API, to unlock large volumes of model or dataset downloads.

To activate this option:

1. Toggle on the "Higher Hub rate limits" option

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/enterprise/network-sec-rate-limit.png" alt="Screenshot of the toggle to enable High rate-limits."/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/enterprise/dark-network-sec-rate-limit.png" alt="Screenshot of the toggle to enable High rate-limits."/>
</div>

You need to have a valid Enterprise Plus subscription for this option to take effect.

2. Ensure the Organization IP Ranges are defined 

Once defined, higher rate limits will apply to members of your organization whose IPs match the defined ranges. 


## Restrict organization access to your IP ranges only

This option restricts access to your organization's resources to only those coming from your defined IP ranges. No one can access your organization resources outside your IP ranges. The rules also apply to access tokens.

To activate this option:

1. Toggle on the "Restrict organization access to your IP ranges only" option

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/enterprise/network-sec-enforce-auth.png" alt="Screenshot of the toggle to restrict organization access to IP ranges."/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/enterprise/dark-network-sec-enforce-auth.png" alt="Screenshot of the toggle to restrict organization access to IP ranges."/>
</div>

You need to have a valid Enterprise Plus subscription for this option to take effect.

2. Ensure the Organization IP Ranges are defined 


### Require login for users in your IP ranges

When this nested option is enabled, anyone visiting Hugging Face from your corporate network must be logged in and belong to your organization (requires a manual verification when IP ranges have changed). If enabled, you can optionally define a content access policy.

All public pages will show the following message if access is unauthenticated:

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/enterprise/network-sec-restricted-url.png" alt="Screenshot of restricted pages on the Hub."/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/enterprise/dark-network-sec-restricted-url.png" alt="Screenshot of restricted pages on the Hub."/>
</div>

1. Toggle on the "Require login for users in your IP ranges" option (this option appears when "Restrict organization access to your IP ranges only" is enabled)


### Content Access Policy 

You can also define a fine-grained Content Access Policy by blocking certain sections of the Hugging Face Hub. 

For example, you can block your organization's members from accessing Spaces by adding `/spaces/*` to the blocked URLs. When users of your organization navigate to a page that matches the URL pattern, they'll be presented the following page:

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/enterprise/network-sec-blocked-url.png" alt="Screenshot of blocked pages on the Hub."/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/enterprise/dark-network-sec-blocked-url.png" alt="Screenshot of blocked pages on the Hub."/>
</div>

To define Blocked URLs, enter URL patterns, without the domain name, one per line:

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/enterprise/network-sec-cap.png" alt="Screenshot of blocked pages on the Hub."/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/enterprise/dark-network-sec-cap.png" alt="Screenshot of blocked pages on the Hub."/>
</div>

The Allowed URLs field, enables you to define some exception to the blocking rules, especially. For example by allowing a specific URL within the Blocked URLs pattern, ie `/spaces/meta-llama/*`  
