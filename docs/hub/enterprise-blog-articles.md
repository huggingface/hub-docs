# Blog Articles for Organizations

> [!WARNING]
> This feature is part of the <a href="https://huggingface.co/enterprise">Team & Enterprise</a> plans.

Blog Articles allow Team and Enterprise organizations to publish long-form content directly under your organization profile, enabling you to share model releases, research updates, and announcements with the broader community.

## Publishing as an Organization

When creating a new article at [huggingface.co/new-blog](https://huggingface.co/new-blog), select your organization from the dropdown to publish as the organization rather than as an individual. Once published, the article will appear on your organization's profile page.

## Featuring on the main Blog page

Articles published by eligible organizations are automatically featured in the main section of [huggingface.co/blog](https://huggingface.co/blog); other articles appear in the Community section. An article is featured when:

- The organization is on a paid Team or Enterprise plan with **at least 30 seats**.
- The article has a **thumbnail**. Articles published without a thumbnail are not featured.

Eligibility is checked when the article is first published. Adding a thumbnail afterwards doesn't feature the article retroactively.

To keep the main section varied, each organization can have one featured article at a time per two-week window. Publishing a new featured article unfeatures the organization's other featured articles from that window.

## Permissions

To publish blog articles under an organization namespace, members need one of the following:

- The `contributor`, `write`, or `admin` role at the organization level. Contributors can only edit the articles they author.
- The `contributor` or `write` role in a [Resource Group](./security-resource-groups). When creating the article, the author selects that Resource Group in the editor's access control setting. This lets members whose organization role is `no_access` or `read` publish articles without getting read and/or write access to the organization's repositories.

See [Access Control in Organizations](./organizations-security) for more details on roles.

> [!NOTE]
> On Enterprise plans and above, org admins can instead restrict who is allowed to write and publish organization blog articles through Resource Groups [Granular feature access](./security-resource-groups#granular-feature-access) settings.

## Linking to Models and Datasets

Articles mentioning a model or dataset owned by the same organization will automatically surface on that repo's page. See [Linking to Models and Datasets](./blog-articles#linking-to-models-and-datasets) for details.

See [Blog Articles](./blog-articles) for general information about authoring blog articles on the Hub.
