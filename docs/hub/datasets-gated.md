# Gated datasets

To give dataset creators more control over how their datasets are used, the Hub allows users to enable **User Access requests** through a dataset's **Settings** tab. Enabling this setting requires users to agree to share their contact information in order to access the dataset. The contact information is stored in a database, and dataset owners are able to download a copy of the user access report.

The User Access request dialog can be modified to include additional text and checkbox fields in the prompt. To do this, add a YAML section to the dataset's `README.md` file (create one if it does not already exist) and add an `extra_gated_fields` property. Within this property, you'll be able to add as many custom fields as you like and whether they are a `text` or `checkbox` field. An `extra_gated_prompt` property can also be included to add a customized text message.

```
---
extra_gated_prompt: "You agree to not attempt to determine the identity of individuals in this dataset"
extra_gated_fields:
 Company: text
 Country: text
 I agree to use this model for non-commerical use ONLY: checkbox
---
```

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-gated.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-gated-dark.png"/>
</div>

The `README.md` file for a dataset is called a [Dataset Card](./datasets-cards). Visit the documentation to learn more about how to use it and to see the properties that you can configure.