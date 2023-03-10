# Gated datasets

To give dataset creators more control over how their datasets are used, the Hub allows users to enable **User Access requests** through a dataset's **Settings** tab.
Enabling this setting requires users to agree to share their contact information and accept the dataset authors' terms and conditions in order to access the dataset.
The contact information is stored in a database, and dataset owners are able to download a copy of the user access report.

## Modifying the prompt 

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

## Manual approval

By default, requests to access the dataset are automatically accepted.
Dataset authors can set the approval mode to "Manual reviews" from the dataset's **Settings** tab.
Doing so enforces that each access request will be manually reviewed and approved by the dataset authors.
Only users whose access requests have been approved will be able to access the dataset's content.


<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-gated-manual-approval.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/datasets-gated-manual-approval-dark.png"/>
</div>

## Additional Customization

In some cases, you might also want to modify the text in the heading of the gate as well as the text in the button. For those use cases you can modify `extra_gated_heading` and `extra_gated_button_content`.

```
---
extra_gated_heading: "Acknowledge license to accept the repository"
extra_gated_button_content: "Acknowledge license"
---
```