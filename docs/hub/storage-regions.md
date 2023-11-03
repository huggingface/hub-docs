# Storage Regions on the Hub

Regions let you decide where your org's models and datasets will be stored.

<Tip warning={true}>
This feature is part of the <a href="https://huggingface.co/enterprise" target="_blank">Enterprise Hub</a>.
</Tip>

This has two main benefits:

- Regulatory and legal compliance
- Performance (improved download and upload speeds and latency)

Currently we support the following regions:

- US 🇺🇸
- EU 🇪🇺
- coming soon: Asia-Pacific 🌏

## How to set up

If your organization is an Enterprise Hub org, you will be able to see the Regions settings page:

![](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/storage-regions/feature-annotated.png)

On that page you can see:

- an audit of where your orgs' repos are currently located
- dropdowns to select where your repos will be created

## Repository Tag

Any repo (model or dataset) stored in a non-default location will display its Region directly as a tag. That way your organization's members can see at a glance where repos are located.

![](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/storage-regions/tag-on-repo.png)

## Regulatory and legal compliance

In many regulated industries, you may have a requirement to store your data in a specific area.

For companies in the EU, that means you can use the Hub to build ML in a GDPR compliant way: with datasets, models and inference endpoints all stored within EU data centers.

## Performance

Storing your models or your datasets closer to your team and infrastructure also means significantly improved performance, for both uploads and downloads.

This makes a big difference considering model weights and dataset files are usually very large.

![](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/storage-regions/upload-speed.png)

As an example, if you are located in Europe and store your repositories in the EU region, you can expect to see ~4-5x faster upload and download speeds vs. if they were stored in the US.
