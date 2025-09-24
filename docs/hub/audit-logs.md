# Audit Logs

> [!WARNING]
> This feature is part of the <a href="https://huggingface.co/enterprise">Team & Enterprise</a> plans.

Audit Logs enable organization admins to easily review actions taken by members, including organization membership, repository settings and billing changes.

<div class="flex justify-center" style="max-width: 550px">
  <img
    class="block dark:hidden m-0!"
    src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/enterprise/audit-logs.png"
    alt="screenshot of Hugging Face Audit Logs feature"
  />
  <img
    class="hidden dark:block m-0!"
    src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/enterprise/dark-audit-logs.png"
    alt="screenshot of Hugging Face Audit Logs feature"
  />
</div>

## Accessing Audit Logs

Audit Logs are accessible through your organization settings. Each log entry includes:

- Who performed the action
- What type of action was taken
- A description of the change
- Location and anonymized IP address
- Date and time of the action

You can also download the complete audit log as a JSON file for further analysis.

## What Events Are Tracked?

### Organization Management & Security

- Core organization changes
  - Creation, deletion, and restoration
  - Name changes and settings updates
- Security management
  - Security token rotation
  - Token approval system (enabling/disabling, authorization requests, approvals, denials, revocations)
  - SSO events (logins and joins)

### Membership and Access Control

- Member lifecycle
  - Invitations (sending, accepting) and automatic joins
  - Adding and removing members
  - Role changes and departures
- Join settings
  - Domain-based access
  - Automatic join configurations

### Content and Resource Management

- Repository administration
  - Core actions (creation, deletion, moving, duplication)
  - Settings and configuration changes
  - Enabling/disabling repositories
  - DOI management
  - Resource group assignments
- Collections
  - Creation and deletion events
- Repository security
  - Secrets management (individual and bulk)
  - Variables handling (individual and bulk)
- Spaces configuration
  - Storage modifications
  - Hardware settings
  - Sleep time adjustments

### Billing and AWS Integration

- Payment management
  - Payment methods (adding/removing)
  - Customer account creation
  - AWS integration setup and removal
- Subscription lifecycle
  - Starting and renewing
  - Updates and cancellations
  - Cancellation reversals

### Resource Groups

- Administrative actions
  - Creation and deletion
  - Settings modifications
- Member management
  - Adding and removing users
  - Role assignments and changes
