# Programmatic User Access Control Management

This guide describes how to manage organization member roles and resource group membership via the Hub API: changing a member's organization role and resource group assignments, listing resource groups, adding users to groups, and batch workflows.

**Table of contents:**

- [Change member role via API](#change-member-role-via-api) — Set a member's org role and resource group assignments (one member per request).
- [Resource Groups API](#resource-groups-api) — List resource groups and add users to them.
- [Configure auto-join via API](#configure-auto-join-via-api) — Enable or disable auto-join on a Resource Group.

---

## Change member role via API

You can change a member's **organization role** (No Access / Read / Contributor / Write / Admin) and, optionally, their roles in **resource groups** using the Hub API. The API updates **one member per request**. To change roles for multiple members, call the API in a loop (examples below).

**OpenAPI reference:** <a href="https://huggingface.co/spaces/huggingface/openapi#tag/orgs/PUT/api/organizations/&#123;name&#125;/members/&#123;username&#125;/role" rel="nofollow">PUT /api/organizations/&#123;name&#125;/members/&#123;username&#125;/role</a>

### Prerequisites

- Your organization must have a **subscription plan** (e.g. Team or Enterprise). The endpoint returns 402 otherwise.
- You must be authenticated as an organization member with **Write** (or Admin) permission on the organization.
- The target user must already be a **member** of the organization.

### Base URL and authentication

- **Base URL:** `https://huggingface.co`
- **Authentication:** Send your token in the request header:
  ```http
  Authorization: Bearer <your_access_token>
  ```
  Create a fine-grained token with the "Write access to organizations settings / member management" permission scoped to your org at [https://huggingface.co/settings/tokens](https://huggingface.co/settings/tokens).

### Change member role endpoint

**Request**

```http
PUT /api/organizations/{org_name}/members/{username}/role
Authorization: Bearer <your_access_token>
Content-Type: application/json

{
  "role": "read",
  "resourceGroups": []
}
```

- **Path parameters**
  - `org_name`: Organization slug (e.g. `my-org`).
  - `username`: Hugging Face **username** of the member whose role you are changing.
- **Body**
  - `role` (required): The member's **organization-level** role. One of: `"no_access"`, `"read"`, `"contributor"`, `"write"`, or `"admin"`.
  - `resourceGroups` (optional): Array of resource group assignments for this user. Each item:
    - `id`: Resource group ID (24-character hex string; get IDs from the [resource groups list API](#list-resource-groups)).
    - `role`: Role in that resource group: `"read"`, `"contributor"`, `"write"`, or `"admin"`.
  - If you omit `resourceGroups` or pass `[]`, the user is removed from all resource groups. To only change org role and leave resource groups unchanged, pass their current resource group memberships (the body always sets both org role and resource group list).

**Example (curl) – set org role to "read", no resource groups (removes any the user was previously in)**

```bash
curl -s -X PUT \
  -H "Authorization: Bearer $HF_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"role":"read","resourceGroups":[]}' \
  "https://huggingface.co/api/organizations/my-org/members/member1/role"
```

**Example (curl) – set org role and resource group roles (overrides any current groups)**

```bash
curl -s -X PUT \
  -H "Authorization: Bearer $HF_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"role":"write","resourceGroups":[{"id":"507f1f77bcf86cd799439011","role":"read"}]}' \
  "https://huggingface.co/api/organizations/my-org/members/member2/role"
```

**Success response:** Status `200 OK`; body: `{ "success": true }`.

**Typical errors**

- `400` — Invalid body (e.g. invalid role or resource group `id`).
- `402` — Organization does not have a subscription plan.
- `403` — Not allowed (e.g. you lack Write on the org, or a resource group is not in the org).
- `404` — Organization or user not found.

### Updating multiple members

The API changes **one member per request**. There is no bulk endpoint. To update many members, call the endpoint once per username (e.g. from a list or CSV).

**Example: Bash – loop over usernames, same role for all**

```bash
ORG_NAME="my-org"
ROLE="read"
for username in member1 member2 member3 member4; do
  echo "Setting $username to $ROLE ..."
  curl -s -w "\n%{http_code}" -X PUT \
    -H "Authorization: Bearer $HF_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{\"role\":\"$ROLE\",\"resourceGroups\":[]}" \
    "https://huggingface.co/api/organizations/$ORG_NAME/members/$username/role"
  echo ""
done
```

**Example: Python – loop over usernames**

```python
import os
import requests

BASE_URL = "https://huggingface.co"
HF_TOKEN = os.environ.get("HF_TOKEN", "")

def change_member_role(org_name: str, username: str, role: str, resource_groups: list | None = None):
    payload = {"role": role, "resourceGroups": resource_groups or []}
    r = requests.put(
        f"{BASE_URL}/api/organizations/{org_name}/members/{username}/role",
        headers={"Authorization": f"Bearer {HF_TOKEN}", "Content-Type": "application/json"},
        json=payload,
    )
    if r.status_code != 200:
        raise RuntimeError(f"{r.status_code}: {r.text}")
    return r.json()

org_name = "my-org"
role = "read"
for username in ["member1", "member2", "member3", "member4"]:
    print(f"Setting {username} to {role} ... ", end="")
    try:
        change_member_role(org_name, username, role)
        print("OK")
    except Exception as e:
        print(f"Failed: {e}")
```

For different roles per user, loop over `(username, role)` pairs (e.g. from a CSV) and call `change_member_role` for each.

---

## Resource Groups API

The following endpoints let you **list** resource groups and **add** users to them. To **change** an existing member's organization-level role or their resource group assignments, see [Change member role via API](#change-member-role-via-api) above.

**OpenAPI reference:** [Resource groups](https://huggingface.co/spaces/huggingface/openapi#tag/resource-groups)

**Table of contents — API approaches:**

| Goal                                               | Section                                                                 |
| -------------------------------------------------- | ----------------------------------------------------------------------- |
| Add many users to **one** resource group           | [Add users to a resource group](#add-users-to-a-resource-group)         |
| Add the **same** users to **many** resource groups | [Batch-add by looping over the API](#batch-add-by-looping-over-the-api) |
| Add **different** users per group                  | [Batch-add by looping over the API](#batch-add-by-looping-over-the-api) |

### Base URL and authentication

- **Base URL:** `https://huggingface.co`
- **Authentication:** Use one of:
  - **Access token (recommended for scripts):** Create a fine-grained token with the "Write access to organizations settings / member management" permission scoped to your org at [https://huggingface.co/settings/tokens](https://huggingface.co/settings/tokens). Send it in the request header:
    ```http
    Authorization: Bearer <your_access_token>
    ```
  - **Session cookie:** If calling from a browser or tool that shares the same session as the Hub UI, the cookie is sent automatically.

### List resource groups

Get all resource groups you can manage for the organization. Use this to obtain each group's `id` for the add-users calls.

**Request**

```http
GET /api/organizations/{org_name}/resource-groups
Authorization: Bearer <your_access_token>
```

**Example (curl)**

```bash
curl -s -H "Authorization: Bearer $HF_TOKEN" \
  "https://huggingface.co/api/organizations/my-org/resource-groups"
```

**Example response (trimmed)**

```json
[
  {
    "id": "507f1f77bcf86cd799439011",
    "name": "Cohort 2024",
    "description": "Members in this group",
    "users": [...],
    "repos": [...]
  }
]
```

Use the `id` of each resource group when adding users.

### Add users to a resource group

Add one or more users to a single resource group in one request. You can send multiple users in the same request.

**Request**

```http
POST /api/organizations/{org_name}/resource-groups/{resource_group_id}/users
Authorization: Bearer <your_access_token>
Content-Type: application/json

{
  "users": [
    { "user": "member1", "role": "read" },
    { "user": "member2", "role": "read" },
    { "user": "member3", "role": "write" }
  ]
}
```

- **Path parameters**
  - `org_name`: Organization slug (e.g. `my-org`).
  - `resource_group_id`: The resource group's `id` (24-character hex string from the list endpoint).
- **Body**
  - `users`: Array of objects. Each object must have:
    - `user`: Hugging Face **username** (required).
    - `role`: One of `"read"`, `"contributor"`, `"write"`, `"admin"`.

**Example (curl)**

```bash
curl -s -X POST \
  -H "Authorization: Bearer $HF_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"users":[{"user":"member1","role":"read"},{"user":"member2","role":"read"}]}' \
  "https://huggingface.co/api/organizations/my-org/resource-groups/507f1f77bcf86cd799439011/users"
```

**Success:** Status `200 OK`; body is the updated resource group object (includes the new users in `users`).

**Typical errors:**

- `400` — e.g. user not found, duplicate usernames, or invalid body.
- `403` — Not allowed (e.g. not in org, or already in the resource group). The message will indicate whether users are not in the organization or already in the group.

### Adding members via email (workaround)

The add-users endpoint only accepts **Hugging Face usernames**, not emails. If you have a list of **emails** (e.g. member emails), you can resolve email → username first, then call the add-users API.

Note that email filtering **only** works when the email's domain matches one of the organization's allowed domains: the **Organization email domain** (Settings → Account → Organization email domain) and/or the org's **SSO allowed domains** (if SSO is configured).

**Step 1 – Resolve email to username**

```http
GET /api/organizations/{org_name}/members?email={email}&limit=1
Authorization: Bearer <your_access_token>
```

Response is an array of members; each member has `user` (username). Use `user` for the add-users call.

**Step 2 – Add to resource group**

Use the username from step 1 in a normal add-users request:

```http
POST /api/organizations/{org_name}/resource-groups/{resource_group_id}/users
Content-Type: application/json
Body: { "users": [{ "user": "<username from step 1>", "role": "read" }] }
```

**Example: one email (bash)**

```bash
ORG_NAME="my-org"
RG_ID="507f1f77bcf86cd799439011"
EMAIL="member@org.com"

# Step 1: look up member by email (domain must match org's Organization email domain or SSO allowed domains)
MEMBERS=$(curl -s -H "Authorization: Bearer $HF_TOKEN" \
  "https://huggingface.co/api/organizations/$ORG_NAME/members?email=$EMAIL&limit=1")
USERNAME=$(echo "$MEMBERS" | jq -r '(.[0] // {} | .user // "")')
if [ -z "$USERNAME" ]; then
  echo "No member found for $EMAIL"
  exit 1
fi
# Step 2: add to resource group
curl -s -X POST -H "Authorization: Bearer $HF_TOKEN" -H "Content-Type: application/json" \
  -d "{\"users\":[{\"user\":\"$USERNAME\",\"role\":\"read\"}]}" \
  "https://huggingface.co/api/organizations/$ORG_NAME/resource-groups/$RG_ID/users"
```

**Example: multiple emails in a loop (Python)**

```python
import os
import requests

BASE = "https://huggingface.co"
ORG = "my-org"
RG_ID = "507f1f77bcf86cd799439011"
ROLE = "read"
headers = {"Authorization": f"Bearer {os.environ['HF_TOKEN']}", "Content-Type": "application/json"}

emails = ["member1@org.com", "member2@org.com"]
for email in emails:
    # Step 1: resolve email → username (email domain must match org's Organization email domain or SSO allowed domains)
    r = requests.get(f"{BASE}/api/organizations/{ORG}/members", params={"email": email, "limit": 1}, headers=headers)
    r.raise_for_status()
    members = r.json()
    if not members:
        print(f"No member found for {email}")
        continue
    username = members[0]["user"]
    # Step 2: add that user to the resource group
    add_r = requests.post(
        f"{BASE}/api/organizations/{ORG}/resource-groups/{RG_ID}/users",
        headers=headers,
        json={"users": [{"user": username, "role": ROLE}]},
    )
    if add_r.status_code == 200:
        print(f"Added {username} ({email})")
    else:
        print(f"Failed {email}: {add_r.status_code} {add_r.text}")
```

If a user is already in the resource group, the add call returns `403`; the script reports it as a failure and you can skip or ignore that case if you prefer.

**Limitation:** The email filter only applies when the org has an **Organization email domain** and/or **SSO allowed domains** set, and the email's domain matches one of them. Otherwise you cannot look up by email via the members API; you'd need another source for email → username (e.g. your own directory).

### Batch-add by looping over the API

You can add many users to **one** resource group in one or a few requests (e.g. chunk your list of usernames), or add users to **several** resource groups by looping over groups and calling the add-users endpoint for each.

**Example: Bash – one group, multiple users in one request**

```bash
#!/bin/bash
# Add a list of users to a single resource group.
# Usage: ./add-users-to-rg.sh <org_name> <resource_group_id> <role>

ORG_NAME="${1:-my-org}"
RG_ID="${2:-507f1f77bcf86cd799439011}"
ROLE="${3:-read}"

USERS="member1 member2 member3 member4"
USERS_JSON=$(echo "$USERS" | tr ' ' '\n' | while read u; do
  [ -n "$u" ] && echo "{\"user\":\"$u\",\"role\":\"$ROLE\"}"
done | paste -sd ',' -)

curl -s -w "\nHTTP_STATUS:%{http_code}" -X POST \
  -H "Authorization: Bearer $HF_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"users\":[$USERS_JSON]}" \
  "https://huggingface.co/api/organizations/$ORG_NAME/resource-groups/$RG_ID/users"
```

**Example: Bash – loop over multiple groups**

```bash
# Get group IDs and add users to each
curl -s -H "Authorization: Bearer $HF_TOKEN" \
  "https://huggingface.co/api/organizations/my-org/resource-groups" \
  | jq -r '.[].id' \
  | while read -r RG_ID; do
      [ -z "$RG_ID" ] && continue
      echo "Adding users to resource group $RG_ID ..."
      curl -s -X POST -H "Authorization: Bearer $HF_TOKEN" -H "Content-Type: application/json" \
        -d "{\"users\":[$USERS_JSON]}" \
        "https://huggingface.co/api/organizations/my-org/resource-groups/$RG_ID/users"
    done
```

**Example: Python – batch-add to one or many groups**

```python
import os
import requests

BASE_URL = "https://huggingface.co"
HF_TOKEN = os.environ.get("HF_TOKEN", "")

def list_resource_groups(org_name: str):
    r = requests.get(
        f"{BASE_URL}/api/organizations/{org_name}/resource-groups",
        headers={"Authorization": f"Bearer {HF_TOKEN}"},
    )
    r.raise_for_status()
    return r.json()

def add_users_to_resource_group(org_name: str, resource_group_id: str, users_with_roles: list):
    """users_with_roles: list of {"user": "username", "role": "read"|"write"|"contributor"|"admin"}"""
    r = requests.post(
        f"{BASE_URL}/api/organizations/{org_name}/resource-groups/{resource_group_id}/users",
        headers={"Authorization": f"Bearer {HF_TOKEN}", "Content-Type": "application/json"},
        json={"users": users_with_roles},
    )
    if r.status_code != 200:
        raise RuntimeError(f"Add users failed {r.status_code}: {r.text}")
    return r.json()

# Example: same users added to every resource group
org_name = "my-org"
role = "read"
usernames = ["member1", "member2", "member3"]
users_with_roles = [{"user": u, "role": role} for u in usernames]

for rg in list_resource_groups(org_name):
    add_users_to_resource_group(org_name, rg["id"], users_with_roles)
```

For a long list of usernames, chunk them (e.g. 50 per request) and call the API once per chunk to avoid large request bodies or timeouts.

### Important notes

1. **Usernames only** — The API accepts Hugging Face **usernames**, not emails. You need a mapping from email → username (e.g. from your directory or the org members list) before calling the API.
2. **Users must be in the organization** — Every user in the request must already be a member of the organization. Otherwise the request returns `403` with a message that some users are not in the org.
3. **Idempotency** — If a user is already in the resource group, the backend may return `403` for that request. Your script can catch errors and continue, or skip users already in the group if you first fetch the group's `users` list.
4. **Rate limits** — For large batches, consider adding a short delay between requests (e.g. 0.5–1 second) to avoid hitting rate limits.
5. **Token scope** — The access token must have sufficient permissions for the organization (typically at least "Write access to organizations settings / member management"). Create and store the token securely; do not commit it to version control.

---

## Configure auto-join via API

[Auto-join](./security-resource-groups#auto-join) automatically adds every org member to a Resource Group at a specified role. You can enable or disable it via the API.

**Enable auto-join**

```http
POST /api/organizations/{org_name}/resource-groups/{resource_group_id}/settings
Authorization: Bearer <your_access_token>
Content-Type: application/json

{
  "autoJoin": {
    "enabled": true,
    "role": "read"
  }
}
```

- **Path parameters**
  - `org_name`: Organization slug (e.g. `my-org`).
  - `resource_group_id`: The Resource Group's ID (24-character hex string; get IDs from the [list resource groups endpoint](#list-resource-groups)).
- **Body**
  - `role`: The role to assign to all org members. One of `"read"`, `"contributor"`, `"write"`, or `"admin"`.

Enabling auto-join on an existing Resource Group immediately adds all current org members (backfill).

**Disable auto-join**

Send the same request with `"enabled": false`. The `role` field is not required when disabling:

```http
POST /api/organizations/{org_name}/resource-groups/{resource_group_id}/settings
Authorization: Bearer <your_access_token>
Content-Type: application/json

{
  "autoJoin": {
    "enabled": false
  }
}
```

> [!NOTE]
> Disabling auto-join does **not** remove members who were previously auto-joined. It only stops future org members from being added automatically. Existing members remain in the Resource Group.
