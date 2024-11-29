# Storage Regions on the Hub

<Tip warning={true}>
This feature is part of the <a href="https://huggingface.co/enterprise">Enterprise Hub</a>.
</Tip>

Regions allow you to specify where your organization's models and datasets are stored.

This offers two key benefits:

- Regulatory and legal compliance
- Performance (faster download/upload speeds and lower latency)

Currently available regions:

- US 🇺🇸
- EU 🇪🇺
- Coming soon: Asia-Pacific 🌏

## Getting started with Storage Regions

Organizations subscribed to Enterprise Hub can access the Regions settings page to manage their repositories storage locations.

<div class="flex justify-center" style="max-width: 550px">
  <img
    class="block dark:hidden !m-0"
    src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/enterprise/regions.png"
    alt="screenshot of Hugging Face Storage Regions feature"
  />
  <img
    class="hidden dark:block !m-0"
    src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/enterprise/dark-regions.png"
    alt="screenshot of Hugging Face Storage Regions feature"
  />
</div>

This page displays:

- An audit of your organization's repository locations
- Options to select where new repositories will be stored

## Repository Tag

Any repository (model or dataset) stored in a non-default location displays its Region as a tag, allowing organization members to quickly identify repository locations.

<div class="flex justify-center" style="max-width: 550px">
  <img
    class="block dark:hidden !m-0"
    src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/enterprise/region-tag.png"
    alt="screenshot of Hugging Face Storage Regions tag feature"
  />
  <img
    class="hidden dark:block !m-0"
    src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/enterprise/dark-region-tag.png"
    alt="screenshot of Hugging Face Storage Regions tag feature"
  />
</div>

## Regulatory and legal compliance

Regulated industries often require data storage in specific regions.

For EU companies, you can use the Hub for ML development in a GDPR-compliant manner, with datasets, models and inference endpoints stored in EU data centers.

## Performance

Storing models and datasets closer to your team and infrastructure significantly improves performance for both uploads and downloads.

This impact is substantial given the typically large size of model weights and dataset files.

<div class="flex justify-center" style="max-width: 750px;">
  <img
    class="block dark:hidden !m-0"
    src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/enterprise/region-git-code.png"
    alt="example of Hugging Face Storage Regions feature"
  />
  <img
    class="hidden dark:block !m-0"
    src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/enterprise/dark-region-git-code.png"
    alt="example of Hugging Face Storage Regions feature"
  />
</div>

For example, European users storing repositories in the EU region can expect approximately 4-5x faster upload and download speeds compared to US storage.
