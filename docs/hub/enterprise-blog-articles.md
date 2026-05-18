# Blog Articles for Organizations

> [!WARNING]
> This feature is part of the <a href="https://huggingface.co/enterprise">Team & Enterprise</a> plans.

Blog Articles allow Team and Enterprise organizations to publish long-form content directly under your organization profile, enabling you to share model releases, research updates, and announcements with the broader community.

## Publishing as an Organization

When creating a new article at [huggingface.co/new-blog](https://huggingface.co/new-blog), select your organization from the dropdown to publish as the organization rather than as an individual. Once published, the article will appear on your organization's profile page.

## Permissions

To publish blog articles under an organization namespace, members need `write` or `admin` role at the organization level. See [Access Control in Organizations](./organizations-security) for more details on roles.

> [!NOTE]
> Blog article permissions are currently tied to organization-level roles and cannot be scoped using [Resource Groups](./security-resource-groups). Resource Groups only control access to repositories (models, datasets, and Spaces), not blog articles.

## Linking to Models and Datasets

When a blog article mentions a model or dataset owned by the same organization, the article will automatically appear in the sidebar of that model or dataset page under **"Article(s) mentioning [repo-id]"**. Up to three of the most recent matching articles are shown, making it easy for visitors to discover your organization's related content directly from the repository page.

This also works for any models or datasets that belong to a [Collection](./collections) mentioned in the article — each member repo of a linked collection will surface the article on its page.

See [Blog Articles](./blog-articles) for general information about authoring blog articles on the Hub.
