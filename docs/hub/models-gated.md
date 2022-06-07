# Gated models

To give model creators more control over how their models are used, the Hub allows users to enable **User Access requests** through a model's **Settings** tab. Enabling this setting requires users to agree to share their contact information in order to access the model. The contact information is stored in a database, and model owners are able to download a copy of the user access report.

The User Access request dialog can be modified to include additional text and checkbox fields in the prompt. To do this, add a YAML section to the model's `README.md` file (create one if it does not already exist) and add an `extra_gated_fields` property. Within this property, you'll be able to add as many custom fields as you like and whether they are a `text` or `checkbox` field. An `extra_gated_prompt` property can also be included to add a customized text message.

```
---
extra_gated_prompt: "You agree to not use the model to conduct experiments that cause harm to human subjects."
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

The `README.md` file for a model is called a [model Card](./models-cards). Visit the documentation to learn more about how to use it and to see the properties that you can configure.