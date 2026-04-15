# 🟧 Label Studio on Spaces

[Label Studio](https://labelstud.io) is an [open-source data labeling
platform](https://github.com/heartexlabs/label-studio) for labeling,
annotating, and exploring many different data types. Additionally, Label Studio
includes a powerful [machine learning
interface](https://labelstud.io/guide/ml.html) that can be used for new model
training, active learning, supervised learning, and many other training
techniques.

This guide will teach you how to deploy Label Studio for data
labeling and annotation within the Hugging Face Hub. You can use the default
configuration of Label Studio as a self-contained application hosted completely
on the Hub using Docker for demonstration and evaluation purposes, or you can
attach your own database and cloud storage to host a fully-featured
production-ready application hosted on Spaces.

## ⚡️ Deploy Label Studio on Spaces

You can deploy Label Studio on Spaces with just a few clicks:

<a  href="https://huggingface.co/new-space?template=LabelStudio/LabelStudio">
  <img src="https://huggingface.co/datasets/huggingface/badges/resolve/main/deploy-to-spaces-lg.svg" />
</a>

Spaces requires you to define:

* An **Owner**: either your personal account or an organization you're a
  part of. 

* A **Space name**: the name of the Space within the account
  you're creating the Space.

* The **Visibility**: _private_ if you want the
  Space to be visible only to you or your organization, or _public_ if you want
  it to be visible to other users or applications using the Label Studio API
  (suggested).

## 🚀 Using the Default Configuration

By default, Label Studio is installed in Spaces with a configuration that uses
local storage for the application database to store configuration, account
credentials, and project information. Labeling tasks and data items are also held
in local storage. 

> [!WARNING]
> Storage in Hugging Face Spaces is ephemeral by default. To persist your data
> across restarts, attach a [Storage Bucket](./storage-buckets) — see the
> [persistence section](#enable-persistence-with-hf-storage-buckets) below.

After launching Label Studio, you will be presented with the standard login
screen. You can start by creating a new account using your email address and
logging in with your new credentials. Periodically after logging in, Label
Studio will warn you that the storage is ephemeral and data could be
lost if your Space is restarted. You will also be preset with a prompt from
Heidi, the helpful Label Studio mascot, to create a new project to start
labeling your data. To get started, check out the Label Studio ["Zero to One"
tutorial](https://labelstud.io/blog/introduction-to-label-studio-in-hugging-face-spaces/)
with a guide on how to build an annotation interface for sentiment analysis. 

## 🛠️ Configuring a Production-Ready Instance of Label Studio

To make your Space production-ready, you will need to make three configuration
changes:

* Disable the unrestricted creation of new accounts.

* Enable persistence by attaching a [Storage Bucket](./storage-buckets) or an external database.

* Optionally, attach cloud storage for labeling tasks.

### Disable Unrestricted Creation of New Accounts

The default configuration on Label Studio allows for the unrestricted creation
of new accounts for anyone who has the URL for your application. You can
[restrict signups](https://labelstud.io/guide/signup.html#Restrict-signup-for-local-deployments)
by adding the following configuration secrets to your Space **Settings**.

* `LABEL_STUDIO_DISABLE_SIGNUP_WITHOUT_LINK`: Setting this value to `true` will
  disable unrestricted account creation. 

* `LABEL_STUDIO_USERNAME`: This is the username of the account that you will
  use as the first user in your Label Studio Space. It should be a valid email
  address.

* `LABEL_STUDIO_PASSWORD`: The password that will be associated with the first
   user account.

Restart the Space to apply these settings. The ability to create new accounts
from the login screen will be disabled. To create new accounts, you will need
to invite new users in the `Organization` settings in the Label Studio
application.

### Enable Persistence with HF Storage Buckets

By default, this Space stores all project configuration and data annotations in
local storage with SQLite. If the Space is reset, all configuration and
annotation data in the Space will be lost.

The simplest way to enable persistence is to attach a [Storage Bucket](./storage-buckets),
which mounts persistent object storage directly into the Space. Label Studio
writes its SQLite database and media uploads into the mounted bucket, so
projects and annotations survive restarts.

1. **Create a bucket:**

   ```bash
   hf buckets create <your-namespace>/label-studio-data
   ```

2. **Attach it** in Space Settings → Storage Buckets, mount path `/data`.

3. **Set two Space Variables:**

   ```
   LABEL_STUDIO_BASE_DATA_DIR=/data
   STORAGE_PERSISTENCE=1
   ```

4. **Factory rebuild** the Space.

> [!TIP]
> Set a `SECRET_KEY` Space Secret to keep user sessions alive across restarts.
> Without it, Label Studio generates a random key on each boot and all users
> are logged out on restart.

#### Have a coding agent do it for you

If you'd rather not click through the Space settings, you can ask a coding agent with access to `huggingface_hub` to provision the Space for you. Tell it your Space ID and bucket name, and it can run the equivalent of:

```python
from huggingface_hub import HfApi, Volume

api = HfApi()
space_id = "<your-namespace>/<your-space>"

# Attach the bucket at /data
api.set_space_volumes(
    space_id,
    volumes=[
        Volume(type="bucket", source="<your-namespace>/label-studio-data", mount_path="/data"),
    ],
)

# Tell Label Studio to write its SQLite DB and media into the mounted bucket
api.add_space_variable(space_id, "LABEL_STUDIO_BASE_DATA_DIR", "/data")
api.add_space_variable(space_id, "STORAGE_PERSISTENCE", "1")

# Optional: set a stable SECRET_KEY so sessions survive restarts
api.add_space_secret(space_id, "SECRET_KEY", "<random-string>")

# Factory rebuild so the new mount and variables take effect
api.restart_space(space_id, factory_reboot=True)
```

See the [`manage-spaces` guide](/docs/huggingface_hub/guides/manage-spaces) for more on managing spaces and volume mounts via `huggingface_hub`.

### Enable Persistence with Postgres

For heavier multi-user deployments, you can instead enable persistence by
[connecting an external Postgres database to your
space](https://labelstud.io/guide/storedata.html#PostgreSQL-database),
guaranteeing that all project and annotation settings are preserved.

Set the following secret variables to match your own hosted instance of
Postgres. We strongly recommend setting these as secrets to prevent leaking
information about your database service to the public in your spaces
definition.

* `DJANGO_DB`: Set this to `default`.

* `POSTGRE_NAME`: Set this to the name of the Postgres database.

* `POSTGRE_USER`: Set this to the Postgres username.

* `POSTGRE_PASSWORD`: Set this to the password for your Postgres user.

* `POSTGRE_HOST`: Set this to the host that your Postgres database is running
   on.

* `POSTGRE_PORT`: Set this to the port that your Postgres database is running
  on.

* `STORAGE_PERSISTENCE`: Set this to `1` to remove the warning about ephemeral
  storage.

Restart the Space to apply these settings. Information about users, projects,
and annotations will be stored in the database, and will be reloaded by Label
Studio if the space is restarted or reset.

### Enable Cloud Storage

By default, the only data storage enabled for this Space is local. In the case
of a Space reset, all data will be lost. To enable permanent storage, you must
enable a [cloud storage connector](https://labelstud.io/guide/storage.html).
Choose the appropriate cloud connector and configure the secrets for it.

#### Amazon S3

* `STORAGE_TYPE`: Set this to `s3`.

* `STORAGE_AWS_ACCESS_KEY_ID`: `<YOUR_ACCESS_KEY_ID>`

* `STORAGE_AWS_SECRET_ACCESS_KEY`: `<YOUR_SECRET_ACCESS_KEY>`

* `STORAGE_AWS_BUCKET_NAME`: `<YOUR_BUCKET_NAME>`

* `STORAGE_AWS_REGION_NAME`: `<YOUR_BUCKET_REGION>`

* `STORAGE_AWS_FOLDER`: Set this to an empty string.


#### Google Cloud Storage

* `STORAGE_TYPE`: Set this to `gcs`.

* `STORAGE_GCS_BUCKET_NAME`: `<YOUR_BUCKET_NAME>`

* `STORAGE_GCS_PROJECT_ID`: `<YOUR_PROJECT_ID>`

* `STORAGE_GCS_FOLDER`: Set this to an empty string.

* `GOOGLE_APPLICATION_CREDENTIALS`: Set this to `/opt/heartex/secrets/key.json`.


#### Azure Blob Storage

* `STORAGE_TYPE`: Set this to `azure`.

* `STORAGE_AZURE_ACCOUNT_NAME`: `<YOUR_STORAGE_ACCOUNT>`

* `STORAGE_AZURE_ACCOUNT_KEY`: `<YOUR_STORAGE_KEY>`

* `STORAGE_AZURE_CONTAINER_NAME`: `<YOUR_CONTAINER_NAME>`

* `STORAGE_AZURE_FOLDER`: Set this to an empty string.

## 🤗 Next Steps, Feedback, and Support

To get started with Label Studio, check out the Label Studio ["Zero to One"
tutorial](https://labelstud.io/blog/introduction-to-label-studio-in-hugging-face-spaces/),
which walks you through an example sentiment analysis annotation project. You
can find a full set of resources about Label Studio and the Label Studio
community on at the [Label Studio Home Page](https://labelstud.io). This
includes [full documentation](https://labelstud.io/guide/), an [interactive
playground](https://labelstud.io/playground/) for trying out different
annotation interfaces, and links to join the [Label Studio Slack
Community](https://slack.labelstudio.heartex.com/?source=spaces).
