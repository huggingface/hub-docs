# How to configure SCIM with Okta

This guide explains how to set up SCIM user and group provisioning between Okta and your Hugging Face organization using SCIM.

> [!WARNING]
> This feature is part of the <a href="https://huggingface.co/enterprise">Enterprise</a> and <a href="https://huggingface.co/contact/sales?from=enterprise" target="_blank">Enterprise Plus</a> plans.

## Step 1: Get SCIM configuration from Hugging Face

1.  Navigate to your organization's settings page on Hugging Face.
2.  Go to the **SSO** tab, then click on the **SCIM** sub-tab.
3.  Copy the **SCIM Tenant URL**. You will need this for the Okta configuration.
4.  Click **Generate an access token**. A new SCIM token will be generated. Copy this token immediately and store it securely, as you will not be able to see it again.

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/scim-settings.png"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/scim-settings-dark.png"/>
</div>

## Step 2: Enter Admin Credentials

1. In Okta, go to **Applications** and select your Hugging Face app.
2. Go to the **General** tab and click **Edit** on App Settings
3. For the Provisioning option select **SCIM**, click **Save**
4. Go to the **Provisioning** tab and click **Edit**.
5. Enter the **SCIM Tenant URL** as the SCIM connector base URL.
6. Enter **userName** for Unique identifier field for users.
7. Select all necessary actions for Supported provisioning actions.
8. Select **HTTP Header** for Authentication Mode.
9. Enter the **Access Token** you generated as the Authorization Bearer Token.
10. Click **Test Connector Configuration** to verify the connection.
11. Save your changes.

## Step 3: Configure Provisioning

1. In the **Provisioning** tab, click **To App** from the side nav.
2. Click **Edit** and check to Enable all the features you need, i.e. Create, Update, Delete Users.
3. Click **Save** at the bottom.

## Step 4: Configure Attribute Mappings
1.  While still in the **Provisioning** tab scroll down to Attribute Mappings section
2.  The default attribute mappings often require adjustments for robust provisioning. We recommend using the following configuration. You can delete attributes that are not here:

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/scim-okta-mappings.png" alt="Okta SCIM mappings"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/scim-okta-mappings-dark.png" alt="Okta SCIM mappings"/>
</div>

## Step 5: Assign Users or Groups

1. Visit the **Assignments** tab, click **Assign**
2. Click **Assign to People** or **Assign to Groups** 
3. After finding the User or Group that needs to be assigned, click **Assign** next to their name
4. In the mapping modal the Username needs to be edited to comply with the following rules.

> [!WARNING]
> <ul>
> <li>Only regular characters and `-` are accepted in the Username.</li>
> <li>`--` (double dash) is forbidden.</li>
> <li>`-` cannot start or end the name.</li>
> <li>Digit-only names are not accepted.</li>
> <li>Minimum length is 2 and maximum length is 42.</li>
> <li>Username has to be unique within your org.</li>
> </ul>

5. Scroll down and click **Save and Go Back** 
6. Click **Done**
7. Confirm that users or groups are created, updated, or deactivated in your Hugging Face organization as expected.

## Step 6: Push Okta Groups to Hugging Face via SCIM

Before you can link groups to Hugging Face Resource Groups, you need to push your Okta groups to Hugging Face using the **Push Groups** tab. This is separate from assigning users to the app in Step 5.

> [!WARNING]
> Okta does not support using the same group for app assignment (Step 5) and Group Push. Use a dedicated group for pushing — keep your push groups separate from your assignment groups.

1.  In the Okta Admin Console, go to **Applications** and select your Hugging Face app.
2.  Click the **Push Groups** tab.
3.  Click **+ Push Groups** and select **Find groups by name**.
4.  Search for the Okta group you want to push and select it from the results.
5.  Choose how to handle the group in Hugging Face:
    - **Create Group**: Creates a new SCIM group in your Hugging Face organization.
    - **Link Group**: Links to an existing group already in your Hugging Face organization.
6.  Click **Save**. To push additional groups, click **Save & Add Another** and repeat.

Once pushed, the group will appear under **SCIM Groups** in your Hugging Face organization settings (SSO → SCIM tab). Any membership changes you make to the group in Okta will automatically sync to Hugging Face.

## Step 7: Link SCIM Groups to Hugging Face Resource Groups

Once your groups are provisioned from Okta, you can link them to Hugging Face Resource Groups to manage permissions at scale. This allows all members of a SCIM group to automatically receive specific roles (like read or write) for a collection of resources.

> [!NOTE]
> Before linking, make sure the Resource Group you want to link is **empty** (has no existing members) and does **not** have auto-join enabled. Both conditions are required — linking will fail otherwise.

1.  In your Hugging Face organization settings, navigate to the **SSO** -> **SCIM** tab. You will see a list of your provisioned groups under **SCIM Groups**.
2.  Locate the group you wish to configure and click **Link resource groups** in its row.
3.  A dialog will appear. Click **Link a Resource Group**.
4.  From the dropdown menus, select the **Resource Group** you want to link and the **Role Assignment** you want to grant to the members of the SCIM group.
5.  Click **Link to SCIM group** and save the mapping.

Once linked, the Resource Group becomes **SCIM-managed**: any members already in the SCIM group are immediately added to the Resource Group (backfill), and all future membership changes in Okta are automatically reflected. Manual membership edits on the Resource Group via the Hub UI or API will be blocked.
