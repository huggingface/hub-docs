# Gated models

To give model creators more control over how their models are used, the Hub allows users to enable **User Access requests** through a model's **Settings** tab. Enabling this setting requires users to agree to share their contact information in order to access the model. The contact information is stored in a database, and model owners are able to download a copy of the user access report.

Note that to download a gated model you'll need to be authenticated. You can log in by installing the [`huggingface_hub` client library](https://huggingface.co/docs/huggingface_hub/index) and running the following in your terminal:

```bash
huggingface-cli login
```

If you're using a Jupyter or Colaboratory notebook, log in with the following Python command

```python
from huggingface_hub import notebook_login
notebook_login()
```

Then, ensure that your library uses the token. For example, if using 🤗 Transformers [you'll need to pass `use_auth_token=True`](https://huggingface.co/docs/transformers/main/en/main_classes/model#transformers.PreTrainedModel.from_pretrained) when calling `.from_pretrained()`.  

## Modifying the prompt 

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
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/models-gated.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/models-gated-dark.png"/>
</div>

The `README.md` file for a model is called a [model Card](./model-cards). Visit the documentation to learn more about how to use it and to see the properties that you can configure.

## Additional Customization

In some cases, you might also want to modify the text in the heading of the gate as well as the text in the button. For those use cases you can modify `extra_gated_heading` and `extra_gated_button_content`.

```
---
extra_gated_heading: "Acknowledge license to accept the repository"
extra_gated_button_content: "Acknowledge license"
---
```