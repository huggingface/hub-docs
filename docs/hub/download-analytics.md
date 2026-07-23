# Download Analytics

Download Analytics gives organizations a bandwidth-level view of their Hugging Face usage: how much data is being downloaded and by whom.

## Accessing Download Analytics

Organization admins can find Download Analytics on the organization's Downloads settings page, at `https://huggingface.co/organizations/[organizationIdentifier]/settings/downloads`. Individual users can see their own usage at `https://huggingface.co/settings/downloads`.

## Egress overview

The page shows a daily egress (download bandwidth) graph, along with your month-to-date total compared against your plan's included egress allowance. Only traffic that passes through the Hugging Face CDN is counted, and figures may increase over time as data settles.

## Per-member breakdown

For each member of the organization, the breakdown shows:

- Total data downloaded, in bytes
- Date of their last download

This gives admins a quick way to see who is driving bandwidth usage across the organization, at a glance.

## Scope of the data

Download Analytics reports total bandwidth per member; it does not record which specific repositories, revisions, or files were downloaded.

If you publish your own models or datasets and want per-repository download counts for those repos, see [Publisher Analytics](./publisher-analytics).

## Data availability and retention

CDN usage metering is retained for 90 days.
