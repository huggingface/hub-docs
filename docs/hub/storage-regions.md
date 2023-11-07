<h1 class="flex items-center gap-3">
	<svg xmlns="http://www.w3.org/2000/svg" fill="none" aria-hidden="true" focusable="false" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 33 27"><path fill="currentColor" fill-rule="evenodd" d="M13.5.7a8.7 8.7 0 0 0-7.7 5.7L1 20.6c-1 3.1.9 5.7 4.1 5.7h15c3.3 0 6.8-2.6 7.8-5.7l4.6-14.2c1-3.1-.8-5.7-4-5.7h-15Zm1.1 5.7L9.8 20.3h9.8l1-3.1h-5.8l.8-2.5h4.8l1.1-3h-4.8l.8-2.3H23l1-3h-9.5Z" clip-rule="evenodd"></path></svg>
	Storage Regions on the Hub
</h1>

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

If your organization is subscribed to Enterprise Hub, you will be able to see the Regions settings page:

![](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/storage-regions/feature-annotated.png)

On that page you can see:

- an audit of where your organization repos are currently located
- dropdowns to select where your repos will be created

## Repository Tag

Any repo (model or dataset) stored in a non-default location will display its Region directly as a tag. That way your organization's members can see at a glance where repos are located.

<div class="flex justify-center">
<img class="block" width="400" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/storage-regions/tag-on-repo.png"/>
</div>

## Regulatory and legal compliance

In regulated industries, companies may be required to store data in a specific region.

For companies in the EU, that means you can use the Hub to build ML in a GDPR compliant way: with datasets, models and inference endpoints all stored within EU data centers.

## Performance

Storing your models or your datasets closer to your team and infrastructure also means significantly improved performance, for both uploads and downloads.

This makes a big difference considering model weights and dataset files are usually very large.

![](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/storage-regions/upload-speed.png)

As an example, if you are located in Europe and store your repositories in the EU region, you can expect to see ~4-5x faster upload and download speeds vs. if they were stored in the US.
