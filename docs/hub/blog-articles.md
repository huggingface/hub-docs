# Blog Articles

Blog Articles let you publish long-form content directly on the Hub — model releases, research updates, tutorials, and announcements — and share them with the broader community. Articles can be published under your personal namespace or under an [organization](./organizations) you belong to.

## Who Can Publish Blog Articles

To publish under **your personal namespace**, you need a confirmed email and must satisfy at least one of the following:

- You have an active [PRO](./pro) subscription.
- You are a member of a [Team or Enterprise](https://huggingface.co/enterprise) organization (with `write` or `admin` role in that organization).

Managed users (users provisioned through Enterprise IdP) cannot publish under their personal namespace.

To publish under an **organization namespace**, both must hold:

- The organization is on the [Team or Enterprise](https://huggingface.co/enterprise) plan.
- You have the `write` or `admin` role in that organization. See [Access Control in Organizations](./organizations-security) for more on roles.

See [Blog Articles for Organizations](./enterprise-blog-articles) for organization-specific details.

## Creating a Blog Article

Go to [huggingface.co/new-blog](https://huggingface.co/new-blog) to start a new article. You can write in Markdown, embed media, and reference models, datasets, and Spaces hosted on the Hub.

When creating the article, pick the namespace it should be published under from the dropdown:

- **Your username** — the article appears on your user profile.
- **An organization** — the article appears on that organization's profile page.

## Editing an Article

- Articles published under a user namespace can be edited by the original author and any coauthors listed on the article.
- Articles published under an organization namespace can be edited by any organization member with `write` or `admin` role.

## Linking to Models and Datasets

When a blog article mentions a model or dataset, and the article's author (user or organization) is the same as the repo's owner, the article will automatically appear in the sidebar of that model or dataset page under **"Article(s) mentioning [repo-id]"**. Up to three of the most recent matching articles are shown.

This makes it easy for visitors to discover related write-ups, release announcements, and research notes alongside the repository itself.

If the article references a [Collection](./collections), every model and dataset in that collection is treated as linked — the article will surface on each member repo's page (subject to the same ownership rule).
