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
2. Go to the **General** tab and click **Edit** on App Settings
3. For the Provisioning option select **SCIM**, click **Save**
4. Go to the **Provisioning** tab and click **Edit**.
5. Enter the **SCIM Tenant URL** as the SCIM connector base URL.
6. Enter "userName" for Unique identifier field for users.
7. Select all necessary actions for Supported provisioning actions.
8. Select "HTTP Header" for Authentication Mode.
9. Enter the **Access Token** you generated as the Authorization Bearer Token.
10. Click **Test Connector Configuration** to verify the connection.
11. Save your changes.

### Step 3: Configure Provisioning

1. In the **Provisioning** tab, click **To App** from the side nav.
2. Click **Edit** and check to Enable all the features you need, i.e. Create, Update, Delete Users.
3. Click **Save** at the bottom.

### Step 4: Configure Attribute Mappings
1.  While still in the **Provisioning** tab scroll down to Attribute Mappings section
2.  The default attribute mappings often require adjustments for robust provisioning. We recommend using the following configuration. You can delete attributes that are not here:

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/scim-okta-mappings.png" alt="Okta SCIM mappings"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/scim-okta-mappings-dark.png" alt="Okta SCIM mappings"/>
</div>

### Step 5: Assign Users or Groups

1. Visit the **Assignments** tab, click **Assign**
2. Click **Assign to People** or **Assign to Groups** 
3. After finding the User or Group that needs to be assigned, click **Assign** next to their name
4. In the mapping modal the Username needs to be edited to comply with the following rules.

<Tip warning={true}>
<ul>
<li>Only regular characters and `-` are accepted in the Username.</li>
<li>`--` (double dash) is forbidden.</li>
<li>`-` cannot start or end the name.</li>
<li>Digit-only names are not accepted.</li>
<li>Minimum length is 2 and maximum length is 42.</li>
<li>Username has to be unique within your org.</li>
</ul>
</Tip>

5. Scroll down and click **Save and Go Back** 
6. Click **Done**
7. Confirm that users or groups are created, updated, or deactivated in your Hugging Face organization as expected.
