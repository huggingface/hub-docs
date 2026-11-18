# Pre-Release Model Pages

> [!WARNING]
> This feature is available to organizations on an <a href="https://huggingface.co/enterprise">Enterprise</a> plan or above — or <a href="https://huggingface.co/contact/sales?from=enterprise" target="_blank">contact us</a>.

Pre-release model pages let your organization announce an upcoming model while it is still private. Instead of a 404 page, visitors see a dedicated announcement page with a live countdown to the release date and a **Like and Notify on release** button, so they can be notified by email the moment your model is out. When you make the model public, it is considered released and the announcement page is replaced with the model card.

## Eligibility

- Your organization must be subscribed to an [Enterprise](https://huggingface.co/enterprise) plan or above.
- The model repository must live under the **organization namespace** (e.g. `my-org/my-upcoming-model`). User-owned repositories are not eligible.
- The model repository must be **private**. Making the model public releases it (see [below](#notify-your-subscribers-on-release)).

## Announce your model

To turn a **private** model's page into a pre-release page, add a `release_date` field to the model card metadata (the YAML section at the top of the repo's `README.md`):

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

Invalid values are rejected by the metadata validator and ignored. The date does not have to be in the future: with a past date, the page shows "Coming very soon" instead of a countdown. Dates are displayed in UTC.

A few optional metadata fields let you customize the pre-release page:

| Field | Effect |
| --- | --- |
| `description` | Hero tagline of the pre-release page, also used as the page's meta description. |
| `pretty_name` | Human-readable name shown instead of the repository name in the hero title. |
| `approximate_eta` | Set to `true` if `release_date` is only an estimate: the date is then flagged with a **Current ETA** badge. |
| `thumbnail` | URL of a custom social-share image, replacing the generated one. |

```yaml
---
release_date: 2026-07-27
approximate_eta: true
pretty_name: "My Upcoming Model"
description: "A short tagline shown on the pre-release page"
---
```

A few more things to know:

- The markdown body of your model card (everything below the YAML metadata) is what visitors read on the pre-release page — use it to describe what's coming, show teasers, link to a paper, etc.
- You don't need to upload any weights yet: the repository only needs the `README.md` for the whole announcement period. Upload the model files whenever you're ready.
- After you edit the model card metadata, the pre-release page can take a few moments to turn on or off.

## What visitors see

While the model is private and `release_date` is set (and your organization is eligible), visitors see the pre-release page instead of a 404 page:

- A hero with an **Upcoming release** label, the model name, your tagline, and a live **countdown** to the release date. The hero's colors are derived from your organization's avatar.
- A **Like and Notify on release** button: clicking it likes the repo and subscribes the user to an email notification for the release. Users need to be logged in, and unliking the model unsubscribes.
- The model card content.
- A sidebar showing the number of likes (as users **waiting for the release**) with the most recent likers, the expected release date, and your organization's latest models.
- A dedicated social-share thumbnail, using the same colors as the hero.

> [!TIP]
> The pre-release page renders your model card content — everything you write in the `README.md` body is publicly visible while the announcement is up, including the images and videos it references. The rest of the repository stays private: files, discussions, and API access remain restricted to members, and the model is not listed publicly.

When the countdown reaches zero, the page shows **"Coming very soon"** — the pre-release page stays up until you make the model public.

## What members see

Everyone with **read access** to the repository keeps seeing the regular model page, so your team can keep managing files and settings while the announcement is up:

- A banner on the model page indicates that the model is in pre-release. Click **Preview the page** — or append `?preview` to the model URL — to check what visitors see.
- In model listings, the model is shown with a **Pre-release** badge.

## Notify your subscribers on release

When you're ready to release:

1. Push the model files to the repository.
2. Make the model **public**. This releases the model: the pre-release page becomes a regular model page — no need to remove the `release_date` field.
3. Repo members with write access will see a banner reading "N users are waiting to be notified about this release", with a **Send release notifications** button.
4. Click **Send release notifications** to email each subscriber that your model is now available on Hugging Face.

Notifications are not sent automatically when the model becomes public: you choose when to send them. A few things to know:

- Subscribers are the users who liked the model while it was in pre-release, so the number in the banner can be lower than the total number of likes.
- Each subscriber is emailed at most once, and the banner disappears once the notifications are sent.
- Notifications respect each user's [notification preferences](https://huggingface.co/settings/notifications) ("A release you subscribed to is available").

## Things to keep in mind

- **The page stays up past the date**: reaching the release date does not automatically take the pre-release page down; make the model public to release it and switch back to the regular model page.
- **Making the model public is the release**: release notifications can only be sent once the model is public.
- **Removing `release_date`** while the model is still private takes the pre-release page down: visitors get a 404 page again, like for any private model.
- **Making the model private again** (while `release_date` is still set) turns the pre-release page back on.
