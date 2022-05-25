# Access control in organizations

Members of organizations can have three different roles: `read`, `write` or `admin`:

- `read`: read-only access to the Organization's repos and metadata/settings (eg, the Organization's profile, members list, API token, etc).

- `write`: additional write rights to the Organization's repos. Users can create, delete or rename any repo in the Organization namespace. A user can also edit and delete files from the browser editor and push content with `git`.

- `admin`*: in addition to write rights on repos, admin members can update the Organization's profile, refresh the Organization's API token, and manage Organization members.

As an organization `admin`, go to the **Members** section of the org settings to manage roles for users.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/org-members-page.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/org-members-page-dark.png"/>
</div>
