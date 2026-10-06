# Telemetry

Starting with version 1.7.0, the `hf_xet` Python package and `hf-xet` Rust crate sends a short report to the Hub after each upload and download. We use these reports to see how often transfers fail and how fast they are across `hf_xet` versions, operating systems, and networks, so we can find and fix problems.

Git Xet 0.2.1 and earlier do not send telemetry.

## What is collected

Each report describes one transfer. An upload of several files in one commit is one transfer, and so is a download of several files at once.

| Data | Details |
|---|---|
| Transfer type and result | Upload or download, and whether it succeeded, failed, or was cancelled. For failures, a general error category such as `network`, `timeout`, or `server_error`. |
| Timing | How long the transfer took. For uploads, also the time spent chunking and uploading the data and the time spent finalizing the commit. |
| Size | Number of files, total size of the files, and the number of bytes sent over the network. |
| Deduplication | For uploads, how much data was already stored on the Hub and skipped, how much was new, and how well the new data compressed. |
| Speed | Average throughput and the highest number of parallel requests used. |
| Client | `hf_xet` version, operating system, CPU architecture, number of CPUs, and the user agent string. This is the same user agent `huggingface_hub` sends with every request to the Hub, with the name and version of the calling library (such as `transformers`) and the versions of `huggingface_hub`, Python, and PyTorch. |
| IDs | A random ID for the transfer, a random ID for the `hf_xet` session, and the host name of the Xet storage server that handled the transfer. |

Reports don't include file names, file paths, file contents, file hashes, repository names, or your username.

Reports are sent to the Xet storage server with the same access token as the transfer. When the server stores a report, it adds your IP address, the Hub account the token belongs to (or "anonymous" if you aren't logged in), the repository the token was issued for, and whether the token allows read or write access.

## When reports are sent

`hf_xet` sends one report when an upload or download finishes, whether it succeeded or not. A transfer that runs for more than 5 minutes also sends a progress report every 5 minutes until it finishes.

Reports are about 1 KB. They are sent alongside the transfer and don't slow it down. If a report can't be sent, it is dropped and not retried. Once a transfer is done, `hf_xet` waits up to 2 seconds for the last report to go out, so the report isn't lost if your program exits right away.

## Opting out

Telemetry is on by default. To turn it off, set `HF_HUB_DISABLE_TELEMETRY=1`:

```bash
export HF_HUB_DISABLE_TELEMETRY=1
```

This is the same variable that turns off telemetry in `huggingface_hub` and the other Hugging Face Python libraries. See [`HF_HUB_DISABLE_TELEMETRY`](https://huggingface.co/docs/huggingface_hub/package_reference/environment_variables#hfhubdisabletelemetry) in the `huggingface_hub` docs.

`hf_xet` also turns telemetry off when `DO_NOT_TRACK`, `DISABLE_TELEMETRY`, `HF_HUB_OFFLINE`, or `TRANSFORMERS_OFFLINE` is set to `1`, `true`, `yes`, or `on`.

To turn off telemetry for `hf_xet` only, set `HF_XET_TELEMETRY_ENABLED=0`.

| Environment Variable | Default | Description |
|---|---|---|
| `HF_HUB_DISABLE_TELEMETRY` | unset | Set to `1` to turn off telemetry in `hf_xet` and the other Hugging Face Python libraries. |
| `HF_XET_TELEMETRY_ENABLED` | `true` | Set to `0` to turn off `hf_xet` telemetry only. Setting it to `1` doesn't override the opt-out variables above. |
| `HF_XET_TELEMETRY_HEARTBEAT_AFTER` | `300s` | How long a transfer runs before it starts sending progress reports. `0` turns progress reports off. |
| `HF_XET_TELEMETRY_HEARTBEAT_INTERVAL` | `300s` | Time between progress reports. |
| `HF_XET_TELEMETRY_FINAL_FLUSH_TIMEOUT` | `2s` | How long `hf_xet` waits for the last report after a transfer finishes. `0` means it doesn't wait. |
