# How to configure OIDC SSO with Google Workspace

In this guide, we will use Google Workspace as the SSO provider with the OpenID Connect (OIDC) protocol as our preferred identity protocol.

We currently support SP-initiated authentication. User provisioning is part of Enterprise Plus's [Advanced SSO](./enterprise-hub-advanced-sso).

<Tip warning={true}>
    This feature is part of the <a href="https://huggingface.co/enterprise">Team & Enterprise</a> plans.
</Tip>

### Step 1: Create OIDC App in Google Workspace

- In your Google Cloud console, search and navigate to `Google Auth Platform` > `Clients`.
- Click `Create Client`.
- For Application Type select `Web Application`.
- Provide a name for your application.
- Retrieve the `Redirection URI` from your Hugging Face organization settings, go to the `SSO` tab and select the `OIDC` protocol.
- Click `Create`.
- A pop-up will appear with the `Client ID` and `Client Secret`, copy those and paste them into your Hugging Face organization settings. In the `SSO` tab (make sure `OIDC` is selected) paste the corresponding values for `Client Identifier` and `Client Secret`.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-google-oidc-create.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-google-oidc-create-dark.png"/>
</div>

### Step 2: Configure Hugging Face with Google's OIDC Details

- At this point the **Client ID** and **Client Secret** should be set in your Hugging Face organization settings `SSO` tab.
- Set the **Issuer URL** to `https://accounts.google.com`.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-google-oidc-hf-details.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/sso-google-oidc-hf-details-dark.png"/>
</div>

### Step 3: Test and Enable SSO

<Tip warning={true}>
Before testing, ensure you have granted access to the application for the appropriate users. The admin performing the test must have access.
</Tip>

- Now, in your Hugging Face SSO settings, click on **"Update and Test OIDC configuration"**.
- You should be redirected to your Google login prompt. Once logged in, you'll be redirected to your organization's settings page.
- A green check mark near the OIDC selector will confirm that the test was successful.
- Once the test is successful, you can enable SSO for your organization by clicking the "Enable" button.
- Once enabled, members of your organization must complete the SSO authentication flow described in