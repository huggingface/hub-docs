# How to configure SCIM with Microsoft Entra ID (Azure AD)

This guide explains how to set up automatic user and group provisioning between Microsoft Entra ID and your Hugging Face organization using SCIM.

<Tip warning={true}>
This feature is part of the <a href="https://huggingface.co/contact/sales?from=enterprise" target="_blank">Enterprise Plus</a> plan.
</Tip>

### Step 1: Get SCIM configuration from Hugging Face

1.  Navigate to your organization's settings page on Hugging Face.
2.  Go to the **SSO** tab, then click on the **SCIM** sub-tab.
3.  Copy the **SCIM Tenant URL**. You will need this for the Entra ID configuration.
4.  Click **Generate an access token**. A new SCIM token will be generated. Copy this token immediately and store it securely, as you will not be able to see it again.

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/scim-settings.png"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/scim-settings-dark.png"/>
</div>

### Step 2: Configure Provisioning in Microsoft Entra ID

1.  In the Microsoft Entra admin center, navigate to your Hugging Face Enterprise Application.
2.  In the left-hand menu, select **Provisioning**.
3.  Click **Get started**.
4.  Change the **Provisioning Mode** from "Manual" to **Automatic**.

### Step 3: Enter Admin Credentials

1.  In the **Admin Credentials** section, paste the **SCIM Tenant URL** from Hugging Face into the **Tenant URL** field.
2.  Paste the **SCIM token** from Hugging Face into the **Secret Token** field.
3.  Click **Test Connection**. You should see a success notification.
4.  Click **Save**.

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/scim-entra-creds.png" alt="Entra ID SCIM Admin Credentials"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/scim-entra-creds-dark.png" alt="Entra ID SCIM Admin Credentials"/>
</div>

### Step 4: Configure Attribute Mappings

1.  Under the **Mappings** section, click on **Provision Microsoft Entra ID Users**.
2.  The default attribute mappings often require adjustments for robust provisioning. We recommend using the following configuration. You can delete attributes that are not listed here:

    | `customappsso` Attribute | Microsoft Entra ID Attribute | Matching precedence | Actions |
    |---|---|---|---|
    | `userName` | `Replace([mailNickname], ".", "", "", "", "", "")` | | |
    | `active` | `Switch([IsSoftDeleted], , "False", "True", "True", "False")` | | `Delete` |
    | `emails[type eq "work"].value` | `userPrincipalName` | | |
    | `name.givenName` | `givenName` | | `Edit`, `Delete` |
    | `name.familyName` | `surname` | | `Edit`, `Delete` |
    | `name.formatted` | `Join(" ", [givenName], [surname])` | | |
    | `externalId` | `objectId` | `1` | |

3.  After configuring the user mappings, go back to the Provisioning screen and click on **Provision Microsoft Entra ID Groups** to review group mappings. The default settings for groups are usually sufficient.

### Step 5: Start Provisioning

1.  On the main Provisioning screen, set the **Provisioning Status** to **On**.
2.  Under **Settings**, you can configure the **Scope** to either "Sync only assigned users and groups" or "Sync all users and groups". We recommend starting with "Sync only assigned users and groups".
3.  Save your changes.

The initial synchronization can take up to 40 minutes to start. You can monitor the progress in the **Provisioning logs** tab.

#### Assigning Users and Groups for Provisioning

To control which users and groups are provisioned to your Hugging Face organization, you need to assign them to the Hugging Face Enterprise Application in Microsoft Entra ID. This is done in the **Users and groups** tab of your application.

1.  Navigate to your Hugging Face Enterprise Application in the Microsoft Entra admin center.
2.  Go to the **Users and groups** tab.
3.  Click **Add user/group**.
4.  Select the users and groups you want to provision and click **Assign**.

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/scim-entra-users-groups.png" alt="Entra ID SCIM User and Group Assignment"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/scim-entra-users-groups-dark.png" alt="Entra ID SCIM User and Group Assignment"/>
</div>

Only the users and groups you assign here will be provisioned to Hugging Face if you have set the **Scope** to "Sync only assigned users and groups".

<Tip>
<p><strong>Active Directory Plan Considerations</strong></p>
<ul>
<li>With <strong>Free, Office 365, and Premium P1/P2 plans</strong>, you can assign individual users to the application for provisioning.</li>
<li>With <strong>Premium P1/P2 plans</strong>, you can also assign groups. This is the recommended approach for managing access at scale, as you can manage group membership in AD, and the changes will automatically be reflected in Hugging Face.</li>
</ul>
</Tip>

### Step 6: Verify Provisioning in Hugging Face

Once the synchronization is complete, navigate back to your Hugging Face organization settings:
-   Provisioned users will appear in the **Users Management** tab.
-   Provisioned groups will appear in the **SCIM** tab under **SCIM Groups**. These groups can then be assigned to [Resource Groups](./security-resource-groups) for fine-grained access control.

### Step 7: Link SCIM Groups to Hugging Face Resource Groups

Once your groups are provisioned from Entra ID, you can link them to Hugging Face Resource Groups to manage permissions at scale. This allows all members of a SCIM group to automatically receive specific roles (like read or write) for a collection of resources.

1.  In your Hugging Face organization settings, navigate to the **SSO** -> **SCIM** tab, You will see a list of your provisioned groups under **SCIM Groups**.

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/scim-provisioned-group.png" alt="Link SCIM group to a resource group"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/sso/scim-provisioned-group-dark.png" alt="Link SCIM group to a resource group"/>
</div>

3.  Locate the group you wish to configure and click **Link resource groups** in its row.
4.  A dialog will appear. Click **Link a Resource Group**.
5.  From the dropdown menus, select the **Resource Group** you want to link and the **Role Assignment** you want to grant to the members of the SCIM group.
6.  Click **Link to SCIM group** and save the mapping.


