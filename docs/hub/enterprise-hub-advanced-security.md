# Advanced Security

<Tip warning={true}>
This feature is part of the <a href="https://huggingface.co/enterprise">Enterprise Hub</a>.
</Tip>

Enterprise Hub organizations can improve their security with advanced security controls for both members and repositories.

<div class="flex justify-center" style="max-width: 550px">
    <img class="block dark:hidden m-0!" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/enterprise/advanced-security.png" alt="screenshot of the Dataset Viewer on a private dataset owned by an Enterprise Hub organization."/>
    <img class="hidden dark:block m-0!" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/enterprise/advanced-security-dark.png" alt="screenshot of the Dataset Viewer on a private dataset owned by an Enterprise Hub organization."/>
</div>

## Members Security

Configure additional security settings to protect your organization:

- **Two-Factor Authentication (2FA)**: Require all organization members to enable 2FA for enhanced account security.
- **User Approval**: For organizations with a verified domain name, require admin approval for new users with matching email addresses. This adds a verified badge to your organization page.

## Repository Visibility Controls

Manage the default visibility of repositories in your organization:

- **Public by default**: New repositories are created with public visibility
- **Private by default**: New repositories are created with private visibility. Note that changing this setting will not affect existing repositories.
- **Private only**: Enforce private visibility for all new repositories, with only organization admins able to change visibility settings

These settings help organizations maintain control of their ownership while enabling collaboration when needed.
