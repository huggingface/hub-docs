# Jobs API Endpoints

The Jobs HTTP API Endpoints are available under `https://huggingface.co/api/jobs`.

Authenticate using a Hugging face token with the permission to start and manage Jobs under your namespace (your account or organization).
Pass the token as a Bearer token with the header: `"Authorization: Bearer {token}"`.

Here is a list of available endpoints and arguments:

## Jobs

* POST `https://huggingface.co/api/jobs/{namespace}`
  Run a Job.
  Arguments:
  * image: string
  * command: string
  * env, *optional*: object key -> value
  * secrets, *optional*: object key -> value
  * flavor, *optional*: string
  * timeout, *optional*: number
* GET `https://huggingface.co/api/jobs/{namespace}`
  List Jobs.
* GET `https://huggingface.co/api/jobs/{namespace}/{job_id}`
  Inspect a Job.
* GET `https://huggingface.co/api/jobs/{namespace}/{job_id}/logs`
  Fetch the logs of a Job.
* GET `https://huggingface.co/api/jobs/{namespace}/{job_id}/cancel`
  Cancel a Job.

## Scheduled Jobs

* POST `https://huggingface.co/api/scheduled-jobs/{namespace}`
  Create a scheduled Job.
  Arguments:
  * jobSpec:
    * image: string
    * command: string
    * env: object key -> value
    * secrets: object key -> value
    * flavor: string
    * timeout: number
  * schedule: string
  * concurrency, *optional*: bool
  * suspend, *optional*: bool
* GET `https://huggingface.co/api/scheduled-jobs/{namespace}`
  List scheduled Jobs.
* GET `https://huggingface.co/api/scheduled-jobs/{namespace}/{job_id}`
  Inspect a scheduled Job.
* DELETE `https://huggingface.co/api/scheduled-jobs/{namespace}/{job_id}`
  Delete a scheduled Job.
* GET `https://huggingface.co/api/scheduled-jobs/{namespace}/{job_id}/suspend`
  Suspend a scheduled Job.
* GET `https://huggingface.co/api/scheduled-jobs/{namespace}/{job_id}/resume`
  Resume a scheduled Job.

## Webhooks

* POST `https://huggingface.co/api/settings/webhooks`
  Create a webhook that triggers this Job.
  Arguments:
  * watched: list of objects
    * type: one of "dataset", "model", "org", "space", "user"
    * name: string
  * jobSourceId: string
  * domains, *optional*: list of "repo", "discussion"
  * secret, *optional*: string
