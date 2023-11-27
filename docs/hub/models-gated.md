# Gated models

To give more control over how models are used, the Hub allows model authors to enable **access requests** for their models. When enabled, users have to agree to share their contact information (username and email address) with the model authors to access the model files. Model authors can configure this request with additional fields. A model with access requests enabled is called a **Gated model**. Access requests are always granted to individual users and not to entire organizations. A common use case of gated models is to provide access to early research models before the wider release.

## Manage gated models as a model author

<a id="manual-approval"></a> <!-- backward compatible anchor -->
<a id="notifications-settings"></a> <!-- backward compatible anchor -->

### Configure access control

To enable access requests, go to the model settings page. By default the model is not gated. Click on "Enable Access request" on the top-right corner.


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

Once access requests are enabled, you have full control of who can have access to your model or not, no matter if the approval mode is set to manual or automatic. You can review and manage requests either from the UI or via the API.

### From the UI

You can review who has access to your gated model from its settings page by clicking on the **Review access requests** button. This will open a modal with 3 lists of users:
- **pending**: the list of users that are waiting for an approval to access your model. This list is empty unless you've selected **manual approval**. You can either "Accept" or "Reject" the demand. If the demand is rejected, the user cannot access your model and cannot request access again.
- **accepted**: the complete list of users that have access to your model. You can choose to "Reject" the access at any time for any user, no matter if the approval mode is manual or automatic. You can also "Cancel" the approval, which will move the user to the *pending* list.
- **rejected**: the list of users that you've manually rejected. Those users cannot access your models. If they go to your model repository, they will see a message *Your request to access this repo has been rejected by the repo's authors.*.

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

Those endpoints are not officially supported in `huggingface_hub` or `huggingface.js` yet but [this code snippet](https://github.com/huggingface/huggingface_hub/issues/1535#issuecomment-1614693412) (in Python) might help you getting started.

### Download access report

You can download a report of all access requests for a gated model with the **download user access report** button. Click on it to download a json file with a list of users. For each entry, you have:
- **user**: the user id. Example: *julien-c*.
- **fullname**: name of the user on the Hub. Example: *Julien Chaumond*.
- **status**: status of the request. Either `"pending"`, `"accepted"` or `"rejected"`.
- **email**: email of the user.
- **time**: datetime when the user initially made the request.

<a id="modifying-the-prompt"></a> <!-- backward compatible anchor -->

### Customize requested information

By default, users landing on your gated model will be asked to share their contact information (email and username) by clicking on the `Agree and send request to access repo` button.

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/models-gated-user-side.png"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/models-gated-user-side-dark.png"/>
</div>

If you want users to provide more information, you can configure additional fields for the user to fill. This information will be accessible from the settings tab to make the decision on whether or not to grant access. To do so, you should add an `extra_gated_fields` property to your [model card metadata](./model-cards#model-card-metadata) containing a list of key/value pairs. The *key* is the name of the field and *value* its type. A field can be either `text` (free text area) or `checkbox`. Finally, you can also personalize the message displayed to the user with the `extra_gated_prompt` extra field.

Here is an example of customized request form where the user is asked to provide their company name and country and acknowledge that the model is for non-commercial use only.

```yaml
---
extra_gated_prompt: "You agree to not use the model to conduct experiments that cause harm to human subjects."
extra_gated_fields:
 Company: text
 Country: text
 I agree to use this model for non-commercial use ONLY: checkbox
---
```

#### Additional Customization

In some cases, you might also want to modify the text in the heading of the gate as well as the text in the button. For those use cases you can modify `extra_gated_heading` and `extra_gated_button_content` like this:

```yaml
---
extra_gated_heading: "Acknowledge license to accept the repository"
extra_gated_button_content: "Acknowledge license"
---
```

## Access gated models as a user

### Request access

As a user, if you want to use a gated model, you will need to request access to it. This means that you must be logged in to a Hugging Face user account to access gated models.

Requesting access can only be done from your browser. Go to the model on the Hub and you will be prompted to share your information:

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/models-gated-user-side.png"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/models-gated-user-side-dark.png"/>
</div>

By clicking on `Agree`, you agree to share your username and email address with the model authors. In some cases, additional fields might be requested. Try to fill the form as accurately as possible to help the model authors decide whether they grant you access or not.

Once the access request is sent, there are two possibilities. If the approval mechanism is automatic, you immediately get access to the model files. Otherwise, the requests have to be approved manually by the authors, which can take more time. 

**Note:** the model authors have full control on their model. In particular, they can decide at any time to block your access to the model without prior notice, no matter the approval mechanism or if your request has already being approved.

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