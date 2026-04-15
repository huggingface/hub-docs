# Storage Buckets: Security & Compliance

Storage Buckets are built on the same infrastructure that powers the Hugging Face Hub, with enterprise-grade security and compliance built in.

<img class="block dark:hidden mt-0" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/storage-security-compliande-doc.png"/>
<img class="hidden dark:block mt-0" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/storage-security-compliande-doc-dark.png"/>

## Encryption

All data stored in buckets is encrypted at rest using **AES-256** encryption. Data in transit is protected via **TLS**.

## Access Control

Buckets use the Hub's standard access control mechanisms:

- **SSO**: Authenticate through your organization's identity provider via [Single Sign-On](./security-sso)
- **RBAC**: Fine-grained permissions through [Resource Groups](./security-resource-groups) let you control who can read, write, or admin each bucket
- **Tokens**: Programmatic access is managed through [User Access Tokens](./security-tokens) with scoped permissions

## Audit Logs

All bucket operations — uploads, downloads, deletions, and permission changes — are recorded in your organization's [Audit Logs](./audit-logs), giving you a full trail of who accessed what and when.

## Data Residency

Bucket data is stored in **US and EU regions**. You can choose where your data lives when creating a bucket, and [pre-warming](./storage-buckets#pre-warming-and-cdn) lets you cache data closer to your compute in specific cloud regions.

## Compliance

Hugging Face maintains the following certifications and compliance standards:


<div class="flex justify-start flex-wrap gap-5">
<img alt="SOC 2" src="https://cdn-media.huggingface.co/marketing/pmh-page/soc2.png" width="150" class="mb-0" />
<img alt="GDPR" src="https://cdn-media.huggingface.co/marketing/pmh-page/gdpr.png" width="150" class="mb-0" />
</div>


- **SOC 2 Type 2** certified — active monitoring and patching of security vulnerabilities
- **GDPR** compliant — data processing agreements available through [Enterprise Plans](https://huggingface.co/pricing)

For more details on Hugging Face's overall security posture, see the [Security](./security) page. For questions, contact [security@huggingface.co](mailto:security@huggingface.co).
