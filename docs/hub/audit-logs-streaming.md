# Audit Logs Streaming

> [!WARNING]
> This feature is part of the <a href="https://huggingface.co/contact/sales?from=enterprise" target="_blank">Enterprise Plus</a> plan.

Audit Logs Streaming continuously writes your organization's activity to a private [Storage Bucket](./storage-buckets) that you own. You can keep it there as long as your compliance policy requires, query it in place, or forward it to your SIEM (Splunk, Datadog, Elastic, Microsoft Sentinel, etc.).

The stream contains two kinds of records:

- Audit events: the same events you see in your organization's [Audit Logs](./audit-logs), such as membership changes, settings updates, or repository deletions.
- Repository access logs: requests to your organization's private repositories (models, datasets, Spaces, kernels and buckets), allowed or denied. For members managed with [Managed SSO](./enterprise-advanced-sso), requests to any repository on the Hub are logged too.

## Which repository requests are logged

Access logs cover file downloads, uploads, and Git operations (clone, fetch, push) on repositories. What is logged depends on whether the requester is a [managed user](./enterprise-advanced-sso) of your organization:

| Requester                                         | Your private repositories | Your public repositories | Repositories outside your organization |
| ------------------------------------------------- | :-----------------------: | :----------------------: | :------------------------------------: |
| Managed user (Managed SSO)                        |            ✅             |            ✅            |                   ✅                    |
| Non-managed user of your organization             |            ✅             |            ❌            |                   ❌                    |
| Anyone presenting an invalid or revoked token     |            ✅             |            ❌            |                   ❌                    |
| Any other user, or anonymous                      |            ❌             |            ❌            |                   ❌                    |

## Getting started

You can't turn on Audit Logs Streaming from your organization settings. To enable it, <a href="https://huggingface.co/contact/sales?from=enterprise" target="_blank">contact the Hugging Face team</a>.

Once it's on, logs go to a private bucket named `<your-org>/audit-logs`. The bucket is tied to the stream, so only Hugging Face can move or delete it. Any organization member with read access to the bucket can read the logs; use [Resource Groups](./security-resource-groups) to limit who can see it.

IP addresses are anonymized by default, as on the Audit Logs page. If you need full IP addresses, ask us and we'll include them.

## Delivery

Records usually reach your bucket within a few minutes.

Delivery is at-least-once, so a record is occasionally written twice. Duplicates share the same `id`, which you can use to deduplicate.

Files are never modified or overwritten after they're written. New records always go into new files.

## File layout

Records are written as gzip-compressed NDJSON files (one JSON object per line), grouped by the minute (UTC) of their `time`:

```
<your-org>/audit-logs/
└── YYYY/MM/DD/HH/MM/<file-id>.ndjson.gz
```

For example, `2026/11/25/14/03/6744a1f2c3b5e8d9f0a1b2c3.ndjson.gz` holds records from 14:03 UTC on November 25th, 2026. A given minute can have several files, and records are sorted by `time` within each file.

## Record format

Every record has the following fields:

| Field           | Description                                                                                           |
| --------------- | ----------------------------------------------------------------------------------------------------- |
| `schemaVersion` | Version of the record format, currently `1`.                                                          |
| `id`            | Unique identifier of the record. Use it to deduplicate.                                               |
| `time`          | Date and time of the action, in ISO 8601 format (UTC).                                                |
| `type`          | `repo_request` for access logs, or the [event name](./audit-logs#what-events-are-tracked) for audit events. |
| `ip`            | IP address of the actor, anonymized unless full IP addresses are enabled. Requests from Hugging Face's own services are labeled instead, e.g. `Internal Dataset Viewer IP address`. |
| `location`      | Country and city of the actor, when known. Access logs may only have the `country`, as an ISO code (e.g. `US`). |
| `userAgent`     | User agent of the client.                                                                             |
| `author`        | User who performed the action. For managed users, `externalId` is their ID in your Identity Provider. Absent for anonymous requests. |
| `token`         | [Access token](./security-tokens) used, if any: its `id`, `role`, and last 4 characters. Audit events also include its `type` and whether it has since been `deleted`. |
| `oauth`         | [OAuth app](./oauth) used, if any, identified by its `clientId`.                                      |
| `data`          | Details of the action (see below).                                                                    |

### Audit events

Audit events have the same `type`, `message` and `data` as the entries of the [Audit Logs](./audit-logs) page and export:

```json
{
  "schemaVersion": 1,
  "id": "6744a1f2c3b5e8d9f0a1b2c3",
  "time": "2026-11-25T14:03:12.000Z",
  "type": "repo.update_settings",
  "message": "Updated settings of model my-org/my-model",
  "ip": "203.0.113.0",
  "location": { "formatted": "France, Paris", "country": "France", "city": "Paris" },
  "userAgent": "Mozilla/5.0 ...",
  "author": { "type": "user", "_id": "60f1a2b3c4d5e6f7a8b9c0d1", "user": "alice" },
  "data": { "private": true }
}
```

### Repository access logs

Access logs have the `repo_request` type. Their `data` field contains:

| Field        | Description                                                                                                          |
| ------------ | -------------------------------------------------------------------------------------------------------------------- |
| `requestId`  | ID of the request, to match it with the `X-Request-Id` header returned to the client.                                |
| `outcome`    | `allowed`, or `denied` when the request was refused for lack of authentication or permissions.                       |
| `statusCode` | HTTP status code of the response.                                                                                    |
| `repo`       | The repository: its `id`, `name`, `type` (`model`, `dataset`, `space`, `kernel`, or `bucket`), and whether it is `private`. Omitted when the request was denied on a repository outside your organization. |
| `authType`   | How the user authenticated, e.g. `cookie` (browser), `access_token`, `oauth`, `s3`, or `ssh_signature`.              |
| `authKind`   | Kind of identity that authenticated, e.g. `user`.                                                                    |
| `sessionId`  | ID of the browser or OAuth session, when available.                                                                  |
| `authTokenSha` | SHA-256 hash of the token presented, when it was invalid or revoked.                                               |

Requests over HTTP also contain the `method`, and the `path` and `rev` of the file accessed (or the `url` when the request is not a file access):

```json
{
  "schemaVersion": 1,
  "id": "6744a1f20000000a1b2c3d4e",
  "time": "2026-11-25T14:03:12.415Z",
  "type": "repo_request",
  "ip": "203.0.113.0",
  "location": { "formatted": "France, Paris", "country": "France", "city": "Paris" },
  "userAgent": "huggingface_hub/1.2.0; python/3.12",
  "data": {
    "outcome": "allowed",
    "statusCode": 200,
    "repo": { "id": "6744a0e1b2c3d4e5f6a7b8c9", "name": "my-org/my-model", "type": "model", "private": true },
    "method": "GET",
    "rev": "main",
    "path": "model.safetensors",
    "authType": "access_token"
  },
  "author": { "type": "user", "_id": "60f1a2b3c4d5e6f7a8b9c0d1", "user": "alice" },
  "token": { "id": "6744a0f0a1b2c3d4e5f6a7b8", "last4": "x9Yz", "role": "fineGrained" }
}
```

Git operations instead contain the `protocol` (`http` or `ssh`, only present on Git operations), the `method` over HTTP, the `gitService` (e.g. `git-upload-pack` for a clone or fetch, `git-receive-pack` for a push), and, over SSH, the `sshKeyFingerprint` of the [SSH key](./security-git-ssh) used.

<details>
<summary><strong>JSON Schema of repository access log records</strong></summary>

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "schemaVersion": {
      "type": "number"
    },
    "id": {
      "type": "string"
    },
    "time": {
      "type": "string",
      "format": "date-time",
      "pattern": "^(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))T(?:(?:[01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d(?:\\.\\d+)?(?:Z))$"
    },
    "type": {
      "type": "string",
      "const": "repo_request"
    },
    "ip": {
      "type": "string"
    },
    "location": {
      "type": "object",
      "properties": {
        "formatted": {
          "type": "string"
        },
        "country": {
          "type": "string"
        },
        "city": {
          "type": "string"
        }
      },
      "additionalProperties": false
    },
    "userAgent": {
      "type": "string"
    },
    "data": {
      "oneOf": [
        {
          "type": "object",
          "properties": {
            "requestId": {
              "type": "string"
            },
            "outcome": {
              "type": "string",
              "enum": [
                "allowed",
                "denied"
              ]
            },
            "statusCode": {
              "type": "number"
            },
            "repo": {
              "type": "object",
              "properties": {
                "id": {
                  "type": "string"
                },
                "name": {
                  "type": "string"
                },
                "type": {
                  "type": "string"
                },
                "private": {
                  "type": "boolean"
                }
              },
              "required": [
                "id",
                "name",
                "type",
                "private"
              ],
              "additionalProperties": false
            },
            "authKind": {
              "type": "string"
            },
            "authType": {
              "type": "string"
            },
            "sessionId": {
              "type": "string"
            },
            "authTokenSha": {
              "type": "string"
            },
            "method": {
              "type": "string"
            },
            "rev": {
              "type": "string"
            },
            "path": {
              "type": "string"
            },
            "url": {
              "type": "string"
            }
          },
          "required": [
            "outcome",
            "method"
          ],
          "additionalProperties": false
        },
        {
          "type": "object",
          "properties": {
            "requestId": {
              "type": "string"
            },
            "outcome": {
              "type": "string",
              "enum": [
                "allowed",
                "denied"
              ]
            },
            "statusCode": {
              "type": "number"
            },
            "repo": {
              "type": "object",
              "properties": {
                "id": {
                  "type": "string"
                },
                "name": {
                  "type": "string"
                },
                "type": {
                  "type": "string"
                },
                "private": {
                  "type": "boolean"
                }
              },
              "required": [
                "id",
                "name",
                "type",
                "private"
              ],
              "additionalProperties": false
            },
            "authKind": {
              "type": "string"
            },
            "authType": {
              "type": "string"
            },
            "sessionId": {
              "type": "string"
            },
            "authTokenSha": {
              "type": "string"
            },
            "protocol": {
              "type": "string",
              "const": "http"
            },
            "method": {
              "type": "string"
            },
            "gitService": {
              "type": "string"
            }
          },
          "required": [
            "outcome",
            "protocol"
          ],
          "additionalProperties": false
        },
        {
          "type": "object",
          "properties": {
            "requestId": {
              "type": "string"
            },
            "outcome": {
              "type": "string",
              "enum": [
                "allowed",
                "denied"
              ]
            },
            "statusCode": {
              "type": "number"
            },
            "repo": {
              "type": "object",
              "properties": {
                "id": {
                  "type": "string"
                },
                "name": {
                  "type": "string"
                },
                "type": {
                  "type": "string"
                },
                "private": {
                  "type": "boolean"
                }
              },
              "required": [
                "id",
                "name",
                "type",
                "private"
              ],
              "additionalProperties": false
            },
            "authKind": {
              "type": "string"
            },
            "authType": {
              "type": "string"
            },
            "sessionId": {
              "type": "string"
            },
            "authTokenSha": {
              "type": "string"
            },
            "protocol": {
              "type": "string",
              "const": "ssh"
            },
            "gitService": {
              "type": "string"
            },
            "sshKeyFingerprint": {
              "type": "string"
            }
          },
          "required": [
            "outcome",
            "protocol"
          ],
          "additionalProperties": false
        }
      ]
    },
    "author": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string",
          "const": "user"
        },
        "_id": {
          "type": "string"
        },
        "user": {
          "type": "string"
        },
        "externalId": {
          "type": "string"
        }
      },
      "required": [
        "type",
        "_id"
      ],
      "additionalProperties": false
    },
    "token": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "last4": {
          "type": "string"
        },
        "role": {
          "type": "string"
        }
      },
      "required": [
        "id"
      ],
      "additionalProperties": false
    },
    "oauth": {
      "type": "object",
      "properties": {
        "clientId": {
          "type": "string"
        }
      },
      "required": [
        "clientId"
      ],
      "additionalProperties": false
    }
  },
  "required": [
    "schemaVersion",
    "id",
    "time",
    "type",
    "data"
  ],
  "additionalProperties": false
}
```

</details>

## Reading the logs

The logs are regular bucket files, so every [bucket access method](./storage-buckets-access) works.

Download them with the `hf` CLI, e.g. to sync a day of logs locally:

```bash
hf buckets sync hf://buckets/my-org/audit-logs/2026/11/25 ./audit-logs/2026/11/25
```

Query them in place with [DuckDB](./storage-buckets-access#query-with-duckdb), e.g. to list the denied requests of the day:

```sql
CREATE SECRET hf (TYPE huggingface, PROVIDER credential_chain);

SELECT time, author.user, ip, data.statusCode, data.repo.name
FROM read_ndjson('hf://buckets/my-org/audit-logs/2026/11/25/**/*.ndjson.gz')
WHERE type = 'repo_request' AND data.outcome = 'denied'
ORDER BY time;
```

To forward them to a SIEM, use the [S3-compatible API](./storage-buckets-s3): most SIEMs and log shippers (Splunk, Datadog, Elastic, Vector, Fluent Bit, etc.) can collect logs from an S3 bucket. Use a [service account](./enterprise-service-accounts) token with read access to the bucket to [generate S3 credentials](./storage-buckets-s3#generating-s3-credentials).

## Disabling the stream

To stop streaming, <a href="https://huggingface.co/contact/sales?from=enterprise" target="_blank">contact the Hugging Face team</a>. Logs already written stay in your bucket.
