# How to configure SCIM with Okta

This guide explains how to set up SCIM user and group provisioning between Okta and your Hugging Face organization using SCIM.

<Tip warning={true}>
This feature is part of the <a href="https://huggingface.co/contact/sales?from=enterprise" target="_blank">Enterprise Plus</a> plan.
</Tip>

### Step 1: Get SCIM configuration from Hugging Face

1.  Navigate to your organization's settings page on Hugging Face.
2.  Go to the **SSO** tab, then click on the **SCIM** sub-tab.
3.  Copy the **SCIM Tenant URL**. You will need this for the Okta configuration.
4.  Click **Generate an access token**. A new SCIM token will be generated. Copy this token immediately and store it securely, as you will not be able to see it again.

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/scim-settings.png"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/scim-settings-dark.png"/>
</div>

### Step 2: Enter Admin Credentials

1. In Okta, go to **Applications** and select your Hugging Face app.
2. Go to the **Provisioning** tab and click **Integration** from the side nav.
3. Check **Enable API Integration**.
4. Enter the **SCIM Tenant URL** as the Base URL.
5. Enter the **access token** you generated as the OAuth Bearer Token.
6. Click **Test API Credentials** to verify the connection.
7. Save your changes.

### Step 3: Configure Provisioning

1. In the **Provisioning** tab, click **To App** from the side nav.
2. Click **Edit** and check to Enable all the features you need, i.e. Create, Update, Delete Users.
3. Click **Save** at the bottom.

### Step 4: Configure Attribute Mappings
1.  While still in the **Provisioning** tab scroll down to Attribute Mappings section
2.  The default attribute mappings often require adjustments for robust provisioning. We recommend using the following configuration. You can delete attributes that are not here:

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/blob/main/hub/sso/scim-okta-mappings.png" alt="Okta SCIM mappings"/>
</div>

### Step 5: Test Assigning Users

1. Visit the **Assignments** tab, click **Assign**
2. Click **Assign to People** or **Assign to Groups** 
3. After finding the User or Group that needs to be assigned, click **Assign** next to their name
4. In the mapping modal the Username needs to be edited. 

> **Note:**  
> - Only regular characters and `-` are accepted in the Username.  
> - `--` (double dash) is forbidden.  
> - `-` cannot start or end the name.  
> - Digit-only names are not accepted.  
> - Minimum length is 2 and maximum length is 42.
> - Username has to be unique

5. Scroll down and click **Save and Go Back** 
6. Click **Done**
7. Confirm that users or groups are created, updated, or deactivated in your Hugging Face organization as expected.
