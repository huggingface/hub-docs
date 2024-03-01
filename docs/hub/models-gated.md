# Gated models

To give more control over how models are used, the Hub allows model authors to enable **access requests** for their models. Users must agree to share their contact information (username and email address) with the model authors to access the model files when enabled. Model authors can configure this request with additional fields. A model with access requests enabled is called a **gated model**. Access requests are always granted to individual users rather than to entire organizations. A common use case of gated models is to provide access to early research models before the wider release.

## Manage gated models as a model author

<a id="manual-approval"></a> <!-- backward compatible anchor -->
<a id="notifications-settings"></a> <!-- backward compatible anchor -->


To enable access requests, go to the model settings page. By default, the model is not gated. Click on **Enable Access request** in the top-right corner.


<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/models-gated-disabled.png"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/models-gated-disabled-dark.png"/>
</div>

By default, access to the model is automatically granted to the user when requesting it. This is referred to as **automatic approval**. In this mode, any user can access your model once they've shared their personal information with you.

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/models-gated-enabled.png"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/models-gated-enabled-dark.png"/>
</div>

If you want to manually approve which users can access your model, you must set it to **manual approval**. When this is the case, you will notice more options:
- **Add access** allows you to search for a user and grant them access even if they did not request it.
- **Notification frequency** lets you configure when to get notified if new users request access. It can be set to once a day or real-time. By default, an email is sent to your primary email address. You can set a different email address in the **Notifications email** field. For models hosted under an organization, emails are sent to the first 5 admins of the organization.

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/models-gated-manual-approval.png"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/models-gated-manual-approval-dark.png"/>
</div>

### Review access requests

Once access requests are enabled, you have full control of who can access your model or not, whether the approval mode is manual or automatic. You can review and manage requests either from the UI or via the API.

#### From the UI

You can review who has access to your gated model from its settings page by clicking on the **Review access requests** button. This will open a modal with 3 lists of users:
- **pending**: the list of users waiting for approval to access your model. This list is empty unless you've selected **manual approval**. You can either **Accept** or **Reject** the demand. If the demand is rejected, the user cannot access your model and cannot request access again.
- **accepted**: the complete list of users with access to your model. You can choose to **Reject** access at any time for any user, whether the approval mode is manual or automatic. You can also **Cancel** the approval, which will move the user to the *pending* list.
- **rejected**: the list of users you've manually rejected. Those users cannot access your models. If they go to your model repository, they will see a message *Your request to access this repo has been rejected by the repo's authors*.

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/models-gated-enabled-pending-users.png"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/models-gated-enabled-pending-users-dark.png"/>
</div>

#### Via the API

You can automate the approval of access requests by using the API. You must pass a `token` with `write` access to the gated repository. To generate a token, go to [your user settings](https://huggingface.co/settings/tokens).

| Method | URI | Description | Headers | Payload
| ------ | --- | ----------- | -------  | -------  |
| `GET` | `/api/models/{repo_id}/user-access-request/pending` | Retrieve the list of pending requests. | `{"authorization": "Bearer $token"}` | |
| `GET` | `/api/models/{repo_id}/user-access-request/accepted` | Retrieve the list of accepted requests. | `{"authorization": "Bearer $token"}` | |
| `GET` | `/api/models/{repo_id}/user-access-request/rejected` | Retrieve the list of rejected requests. | `{"authorization": "Bearer $token"}` | |
| `POST` | `/api/models/{repo_id}/user-access-request/handle` | Change the status of a given access request to `status`. | `{"authorization": "Bearer $token"}` | `{"status": "accepted"/"rejected"/"pending", "user": "username"}` |
| `POST` | `/api/models/{repo_id}/user-access-request/grant` | Allow a specific user to access your repo. | `{"authorization":  "Bearer $token"}` | `{"user": "username"} ` |

The base URL for the HTTP endpoints above is `https://huggingface.co`.

**NEW!** Those endpoints are now officially supported in our Python client `huggingface_hub`. List the access requests to your model with [`list_pending_access_requests`](https://huggingface.co/docs/huggingface_hub/main/en/package_reference/hf_api#huggingface_hub.HfApi.list_pending_access_requests), [`list_accepted_access_requests`](https://huggingface.co/docs/huggingface_hub/main/en/package_reference/hf_api#huggingface_hub.HfApi.list_accepted_access_requests) and [`list_rejected_access_requests`](https://huggingface.co/docs/huggingface_hub/main/en/package_reference/hf_api#huggingface_hub.HfApi.list_rejected_access_requests). You can also accept, cancel and reject access requests with [`accept_access_request`](https://huggingface.co/docs/huggingface_hub/main/en/package_reference/hf_api#huggingface_hub.HfApi.accept_access_request), [`cancel_access_request`](https://huggingface.co/docs/huggingface_hub/main/en/package_reference/hf_api#huggingface_hub.HfApi.cancel_access_request), [`reject_access_request`](https://huggingface.co/docs/huggingface_hub/main/en/package_reference/hf_api#huggingface_hub.HfApi.reject_access_request). Finally, you can grant access to a user with [`grant_access`](https://huggingface.co/docs/huggingface_hub/main/en/package_reference/hf_api#huggingface_hub.HfApi.grant_access).


### Download access report

You can download a report of all access requests for a gated model with the **download user access report** button. Click on it to download a json file with a list of users. For each entry, you have:
- **user**: the user id. Example: *julien-c*.
- **fullname**: name of the user on the Hub. Example: *Julien Chaumond*.
- **status**: status of the request. Either `"pending"`, `"accepted"` or `"rejected"`.
- **email**: email of the user.
- **time**: datetime when the user initially made the request.

<a id="modifying-the-prompt"></a> <!-- backward compatible anchor -->

### Customize requested information

By default, users landing on your gated model will be asked to share their contact information (email and username) by clicking the **Agree and send request to access repo** button.

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/models-gated-user-side.png"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/models-gated-user-side-dark.png"/>
</div>

If you want to collect more user information, you can configure additional fields. This information will be accessible from the **Settings** tab. To do so, add an `extra_gated_fields` property to your [model card metadata](./model-cards#model-card-metadata) containing a list of key/value pairs. The *key* is the name of the field and *value* its type or an object with a `type` field. The list of field types is:

- `text`: a single-line text field.
- `checkbox`: a checkbox field.
- `date_picker`: a date picker field.
- `country`: a country dropdown. The list of countries is based on the [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) standard.
- `select`: a dropdown with a list of options. The list of options is defined in the `options` field. Example: `options: ["option 1", "option 2", {label: "option3", value: "opt3"}]`.

Finally, you can also personalize the message displayed to the user with the `extra_gated_prompt` extra field.

Here is an example of customized request form where the user is asked to provide their company name and country and acknowledge that the model is for non-commercial use only.

```yaml
---
extra_gated_prompt: "You agree to not use the model to conduct experiments that cause harm to human subjects."
extra_gated_fields:
  Company: text
  Country: country
  Specific date: date_picker
  I want to use this model for:
    type: select
    options: 
      - Research
      - Education
      - label: Other
        value: other
  I agree to use this model for non-commercial use ONLY: checkbox
---
```


In some cases, you might also want to modify the default text in the gate heading, description and the text in the button. For those use cases, you can modify `extra_gated_heading`, `extra_gated_description` and `extra_gated_button_content` like this:

```yaml
---
extra_gated_heading: "Acknowledge license to accept the repository"
extra_gated_description: "Our team may take 2-3 days to process your request"
extra_gated_button_content: "Acknowledge license"
---
```

### Example use cases of programmatically managing access requests

Here are a few interesting use cases of programmatically managing access requests for gated repos we've seen organically emerge in the community.
As a reminder, the model repo needs to be set to manual approval, otherwise users get access to it automatically.

Possible use cases of programmatic management include:
- If you have advanced user request screening requirements (for advanced compliance requirements, etc) or you wish to handle the user requests outside the Hub.
    - An example for this was Meta's [Llama 2](https://huggingface.co/meta-llama/Llama-2-7b-chat-hf) initial release where users had to request access on a Meta website.
    - You can ask users for their HF username in your access flow, and then use a script to programmatically accept user requests on the Hub based on your set of conditions.
- If you want to condition access to a model based on completing a payment flow (note that the actual payment flow happens outside of the Hub).
    - Here's an [example repo](https://huggingface.co/Trelis/openchat_3.5-function-calling-v3) from TrelisResearch that uses this use case.
   - [@RonanMcGovern](https://huggingface.co/RonanMcGovern) has posted a [video about the flow](https://www.youtube.com/watch?v=2OT2SI5auQU) and tips on how to implement it.

## Access gated models as a user


As a user, if you want to use a gated model, you will need to request access to it. This means that you must be logged in to a Hugging Face user account.

Requesting access can only be done from your browser. Go to the model on the Hub and you will be prompted to share your information:

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/models-gated-user-side.png"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/models-gated-user-side-dark.png"/>
</div>

By clicking on **Agree**, you agree to share your username and email address with the model authors. In some cases, additional fields might be requested. To help the model authors decide whether to grant you access, try to fill out the form as completely as possible.

Once the access request is sent, there are two possibilities. If the approval mechanism is automatic, you immediately get access to the model files. Otherwise, the requests have to be approved manually by the authors, which can take more time. 

<Tip warning={true}>

The model authors have complete control over model access. In particular, they can decide at any time to block your access to the model without prior notice, regardless of approval mechanism or if your request has already been approved.

</Tip>

### Download files

To download files from a gated model you'll need to be authenticated. In the browser, this is automatic as long as you are logged in with your account. If you are using a script, you will need to provide a [user token](./security-tokens). In the Hugging Face Python ecosystem (`transformers`, `diffusers`, `datasets`, etc.), you can login your machine using the [`huggingface_hub`](https://huggingface.co/docs/huggingface_hub/index) library and running in your terminal:

```bash
huggingface-cli login
```

Alternatively, you can programmatically login using `login()` in a notebook or a script:

```python
>>> from huggingface_hub import login
>>> login()
```

You can also provide the `token` parameter to most loading methods in the libraries (`from_pretrained`, `hf_hub_download`, `load_dataset`, etc.), directly from your scripts.

For more details about how to login, check out the [login guide](https://huggingface.co/docs/huggingface_hub/quick-start#login).
