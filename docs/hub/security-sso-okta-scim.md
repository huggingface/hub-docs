# How to configure SCIM with Okta

This guide explains how to set up SCIM user and group provisioning between Okta and your Hugging Face organization using SCIM.

> [!WARNING]
> This feature is part of the <a href="https://huggingface.co/enterprise">Enterprise</a> and <a href="https://huggingface.co/contact/sales?from=enterprise" target="_blank">Enterprise Plus</a> plans.

## Step 1: Get SCIM configuration from Hugging Face

1.  Log in to a Hugging Face account that is an owner of the organization.
2.  Navigate to your organization's settings page on Hugging Face.
3.  Go to the **SSO** tab, then click on the **SCIM** sub-tab.
4.  Copy the **SCIM Tenant URL**. You will need this for the Okta configuration.
5.  Click **Generate an access token**. A new SCIM token will be generated. Copy this token immediately and store it securely, as you will not be able to see it again.

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/scim-settings.png"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/scim-settings-dark.png"/>
</div>

## Step 2: Enter Admin Credentials

1. In Okta, go to **Applications** and select your Hugging Face app.
2. Go to the **General** tab and click **Edit** on App Settings
3. For the Provisioning option select **SCIM**, click **Save**
4. Go to the **Provisioning** tab, and under **Settings**, click **Integration**.
5. Enter the **SCIM Tenant URL** as the SCIM connector base URL.
6. Enter **userName** for Unique identifier field for users.
7. Select all necessary actions for Supported provisioning actions.
8. Select **HTTP Header** for Authentication Mode.
9. Enter the **Access Token** you generated as the Authorization Bearer Token.
10. Click **Test Connector Configuration** to verify the connection.
11. Save your changes.

## Step 3: Check your SAML settings

In the **General** tab, under **SAML Settings**, check that:

- Name ID format is `Unspecified`
- Application username is `Custom`, with the expression `user.getInternalProperty("id")`
- Under **Attribute Statements**, `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress` is set to `user.email`

If you changed any of these settings, disable then re-enable SSO in your organization's SSO settings on Hugging Face.

## Step 4: Configure Provisioning

1. In the **Provisioning** tab, click **To App** from the side nav.
2. Click **Edit** and check to Enable all the features you need, i.e. Create, Update, Delete Users.
3. Click **Save** at the bottom.

## Step 5: Configure Attribute Mappings

1.  While still in the **Provisioning** tab scroll down to Attribute Mappings section
2.  The default attribute mappings often require adjustments for robust provisioning. We recommend using the following configuration. You can delete attributes that are not here:

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/scim-okta-mappings.png" alt="Okta SCIM mappings"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/scim-okta-mappings-dark.png" alt="Okta SCIM mappings"/>
</div>

## Step 6: Assign Users or Groups

1. Visit the **Assignments** tab, click **Assign**
2. Click **Assign to People** or **Assign to Groups**
3. After finding the User or Group that needs to be assigned, click **Assign** next to their name. Leave the Username as is.
4. Scroll down and click **Save and Go Back**
5. Click **Done**
6. Confirm that users or groups are created, updated, or deactivated in your Hugging Face organization as expected.

## Step 7: Push Okta Groups to Hugging Face via SCIM

Before you can link groups to Hugging Face Resource Groups, you need to push your Okta groups to Hugging Face using the **Push Groups** tab. This is separate from assigning users to the app in Step 6.

> [!WARNING]
> Okta does not support using the same group for app assignment (Step 6) and Group Push. Use a dedicated group for pushing — keep your push groups separate from your assignment groups.

1.  In the Okta Admin Console, go to **Applications** and select your Hugging Face app.
2.  Click the **Push Groups** tab.
3.  Click **+ Push Groups** and select **Find groups by name**.
4.  Search for the Okta group you want to push and select it from the results.
5.  Choose how to handle the group in Hugging Face:
    - **Create Group**: Creates a new SCIM group in your Hugging Face organization.
    - **Link Group**: Links to an existing group already in your Hugging Face organization.
6.  Click **Save**. To push additional groups, click **Save & Add Another** and repeat.

Once pushed, the group will appear under **SCIM Groups** in your Hugging Face organization settings (SSO → SCIM tab). Any membership changes you make to the group in Okta will automatically sync to Hugging Face.

## Step 8: Link SCIM Groups to Hugging Face Resource Groups

Once your groups are provisioned from Okta, you can link them to Hugging Face Resource Groups to manage permissions at scale. This allows all members of a SCIM group to automatically receive specific roles (like read or write) for a collection of resources.

> [!NOTE]
> Before linking, make sure the Resource Group you want to link is **empty** (has no existing members) and does **not** have auto-join enabled. Both conditions are required — linking will fail otherwise.

1.  In your Hugging Face organization settings, navigate to the **SSO** -> **SCIM** tab. You will see a list of your provisioned groups under **SCIM Groups**.
2.  Locate the group you wish to configure and click **Link resource groups** in its row.
3.  A dialog will appear. Click **Link a Resource Group**.
4.  From the dropdown menus, select the **Resource Group** you want to link and the **Role Assignment** you want to grant to the members of the SCIM group.
5.  Click **Link to SCIM group** and save the mapping.

Once linked, the Resource Group becomes **SCIM-managed**: any members already in the SCIM group are immediately added to the Resource Group (backfill), and all future membership changes in Okta are automatically reflected. Manual membership edits on the Resource Group via the Hub UI or API will be blocked.

