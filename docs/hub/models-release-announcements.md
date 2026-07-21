# Pre-Release Model Pages

> [!WARNING]
> This feature is available to organizations on an <a href="https://huggingface.co/enterprise">Enterprise</a> plan or above — or <a href="https://huggingface.co/contact/sales?from=enterprise" target="_blank">contact us</a>.

Pre-release model pages let your organization announce an upcoming model before its weights are public. Instead of the regular model page, visitors see a dedicated announcement page with a live countdown to the release date and a **Like and Notify on release** button, so they can be notified by email the moment your model is out.

## Eligibility

- Your organization must be subscribed to an [Enterprise](https://huggingface.co/enterprise) plan or above.
- The model repository must live under the **organization namespace** (e.g. `my-org/my-upcoming-model`). User-owned repositories are not eligible.

## Announce your model

To turn a model page into a pre-release page, add a `release_date` field to the model card metadata (the YAML section at the top of the repo's `README.md`):

```yaml
---
release_date: 2026-07-27
description: "A short tagline shown on the pre-release page"
---
```

The `release_date` field accepts either a YAML date, or a quoted ISO 8601 timestamp if you want to target a specific time:

```yaml
release_date: "2026-07-27T15:00:00Z"
```

Invalid values are rejected by the metadata validator and ignored. A few more things to know:

- The optional `description` metadata field is used as the hero tagline of the pre-release page.
- The markdown body of your model card is rendered as the content of the page, so you can use it to describe what's coming.
- Metadata changes can take up to a minute to propagate.

## What visitors see

While `release_date` is set (and your organization is eligible), visitors see the pre-release page instead of the regular model page:

- A live **countdown** to the release date, along with your tagline and the model card content.
- A sidebar showing the number of users waiting for the release, the expected release date, and your organization's latest models.
- A **Like and Notify on release** button: clicking it likes the repo and subscribes the user to an email notification for the release. Unliking the model unsubscribes.
- The social-share thumbnail of the page also gets an "Upcoming release" treatment.

Members with **write access** to the repository always see the regular model page instead, so they can keep managing files and settings while the announcement is up.

When the countdown reaches zero, the page shows **"Coming very soon"** — the pre-release page stays up until you remove `release_date` from the model card.

## Notify your subscribers on release

When you're ready to release:

1. Push the model files to the repository.
2. Remove the `release_date` field from the model card metadata. The page becomes a regular model page again.
3. Repo members with write access will see a banner reading "N users are waiting to be notified about this release", with a **Send release notifications** button.
4. Click **Send release notifications** to email each subscriber that your model is now available on Hugging Face.

Notifications are sent to confirmed email addresses only, and respect each user's notification preferences.

## Things to keep in mind

- **The page stays up past the date**: reaching the release date does not automatically take the pre-release page down; remove `release_date` from the model card to switch back to the regular model page.
- **You must remove `release_date` first**: release notifications can only be sent once the model is out of pre-release.
