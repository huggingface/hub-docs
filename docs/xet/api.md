# CAS API Documentation

This document describes the HTTP API endpoints used by the Content Addressable Storage (CAS) client to interact with the remote CAS server.

## Authentication

To authenticate, authorize, and obtain the API base URL, follow the instructions in [Authentication](./auth).

## Converting Hashes to Strings

Sometimes hashes are used in API paths as hexadecimal strings (reconstruction, xorb upload, global dedupe API).

To convert a 32 hash to a 64 hexadecimal character string to be used as part of an API path there is a specific procedure, MUST NOT directly convert each byte.

### Procedure

For every 8 bytes in the hash (indices 0-7, 8-15, 16-23, 24-31) reverse the order of each byte in those regions then concatenate the regions back in order.

Otherwise stated, consider each 8 byte part of a hash as a little endian 64 bit unsigned integer, then concatenate the hexadecimal representation of the 4 numbers in order (each padded with 0's to 16 characters).

> [!NOTE]
> In all cases that a hash is represented as a string it is converted from a byte array to a string using this procedure.

### Example

Suppose a hash value is:
`[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]`

Then before converting to a string it will first have its bytes reordered to:
`[7, 6, 5, 4, 3, 2, 1, 0, 15, 14, 13, 12, 11, 10, 9, 8, 23, 22, 21, 20, 19, 18, 17, 16, 31, 30, 29, 28, 27, 26, 25, 24]`

So the string value of the provided hash [0..32] is **NOT** `000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f`.
It is: `07060504030201000f0e0d0c0b0a0908171615141312111f1e1d1c1b1a1918`.

## Endpoints

### 1. Get File Reconstruction

- **Description**: Retrieves reconstruction information for a specific file. Returns URLs optimized for multi-range fetching: multiple byte ranges for the same xorb are combined into a single URL. Supports byte range via the optional `Range` header.
- **Path**: `/v2/reconstructions/{file_id}`
- **Method**: `GET`
- **Parameters**:
  - `file_id`: File hash in hex format (64 lowercase hexadecimal characters).
See [file hashes](./hashing#file-hashes) for computing the file hash and [converting hashes to strings](./api#converting-hashes-to-strings).
- **Headers**:
  - `Range`: OPTIONAL. Format: `bytes={start}-{end}` (end is inclusive).
  - `Accept-Encoding`: OPTIONAL. The server supports `gzip` and `zstd` compression on the JSON response. Clients SHOULD send `Accept-Encoding: gzip` or `Accept-Encoding: zstd` to reduce reconstruction response size.
- **Minimum Token Scope**: `read`
- **Body**: None.
- **Response**: JSON (`QueryReconstructionResponse`)

  ```json
  {
    "offset_into_first_range": 0,
    "terms": [...],
    "xorbs": {...}
  }
  ```

- **Error Responses**: See [Error Cases](./api#error-cases)
  - `400 Bad Request`: Malformed `file_id` in the path. Fix the path before retrying.
  - `401 Unauthorized`: Refresh the token to continue making requests, or provide a token in the `Authorization` header.
  - `404 Not Found`: The file does not exist. Not retryable.
  - `416 Range Not Satisfiable`: The requested byte range start exceeds the end of the file. Not retryable.

```txt
GET /v2/reconstructions/0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef
-H "Authorization: Bearer <token>"
OPTIONAL: -H Range: "bytes=0-100000"
```

### Example File Reconstruction Response Body

See [QueryReconstructionResponse](./download-protocol#queryreconstructionresponse-structure) for more details in the download protocol specification.

### 2. Query Chunk Deduplication (Global Deduplication)

- **Description**: Checks if a chunk exists in the CAS for deduplication purposes.
- **Path**: `/v1/chunks/{prefix}/{hash}`
- **Method**: `GET`
- **Parameters**:
  - `prefix`: The only acceptable prefix for the Global Deduplication API is `default-merkledb`.
  - `hash`: Chunk hash in hex format (64 lowercase hexadecimal characters).
See [Chunk Hashes](./hashing#chunk-hashes) to compute the chunk hash and [converting hashes to strings](./api#converting-hashes-to-strings).
- **Minimum Token Scope**: `read`
- **Body**: None.
- **Response**: Shard format bytes (`application/octet-stream`), deserialize as a [shard](./shard#global-deduplication).
- **Error Responses**: See [Error Cases](./api#error-cases)
  - `400 Bad Request`: Malformed hash in the path. Fix the path before retrying.
  - `401 Unauthorized`: Refresh the token to continue making requests, or provide a token in the `Authorization` header.
  - `404 Not Found`: Chunk not already tracked by global deduplication. Not retryable.

```txt
GET /v1/chunks/default-merkledb/0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef
-H "Authorization: Bearer <token>"
```

#### Example Shard Response Body

An example shard response body can be found in [Xet reference files](https://huggingface.co/datasets/xet-team/xet-spec-reference-files/blob/main/Electric_Vehicle_Population_Data_20250917.csv.shard.dedupe).

### 3. Upload Xorb

- **Description**: Uploads a serialized Xorb to the server; uploading real data in serialized format.
- **Path**: `/v1/xorbs/{prefix}/{hash}`
- **Method**: `POST`
- **Parameters**:
  - `prefix`: The only acceptable prefix for the Xorb upload API is `default`.
  - `hash`: Xorb hash in hex format (64 lowercase hexadecimal characters).
See [Xorb Hashes](./hashing#xorb-hashes) to compute the hash, and [converting hashes to strings](./api#converting-hashes-to-strings).
- **Minimum Token Scope**: `write`
- **Body**: Serialized Xorb bytes (`application/octet-stream`).
See [xorb format serialization](./xorb).
- **Response**: JSON (`UploadXorbResponse`)

```json
{
  "was_inserted": true
}
```

- Note: `was_inserted` is `false` if the Xorb already exists; this is not an error.

- **Error Responses**: See [Error Cases](./api#error-cases)
  - `400 Bad Request`: Malformed hash in the path, Xorb hash does not match the body, or body is incorrectly serialized.
  - `401 Unauthorized`: Refresh the token to continue making requests, or provide a token in the `Authorization` header.
  - `403 Forbidden`: Token provided but does not have a wide enough scope (for example, a `read` token was provided). Clients MUST retry with a `write` scope token.

```txt
POST /v1/xorbs/default/0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef
-H "Authorization: Bearer <token>"
```

#### Example Xorb Request Body

An example xorb request body can be found in [Xet reference files](https://huggingface.co/datasets/xet-team/xet-spec-reference-files/blob/main/eea25d6ee393ccae385820daed127b96ef0ea034dfb7cf6da3a950ce334b7632.xorb).

### 4. Upload Shard

- **Description**: Uploads a Shard to the CAS.
Uploads file reconstructions and new xorb listing, serialized into the shard format; marks the files as uploaded.
- **Path**: `/v1/shards`
- **Method**: `POST`
- **Minimum Token Scope**: `write`
- **Body**: Serialized Shard data as bytes (`application/octet-stream`).
See [Shard format guide](./shard#shard-upload).
- **Response**: JSON (`UploadShardResponse`)

```json
{
  "result": 0
}
```

- Where `result` is:
  - `0`: The Shard already exists.
  - `1`: `SyncPerformed` — the Shard was registered.

The value of `result` does not carry any meaning, if the upload shard API returns a `200 OK` status code, the upload was successful and the files listed are considered uploaded.

- **Error Responses**: See [Error Cases](./api#error-cases)
  - `400 Bad Request`: Shard is incorrectly serialized or Shard contents failed verification.
    - Can mean that a referenced Xorb doesn't exist or the shard is too large
  - `401 Unauthorized`: Refresh the token to continue making requests, or provide a token in the `Authorization` header.
  - `403 Forbidden`: Token provided but does not have a wide enough scope (for example, a `read` token was provided).

```txt
POST /v1/shards
-H "Authorization: Bearer <token>"
```

#### Example Shard Request Body

An example shard request body can be found in [Xet reference files](https://huggingface.co/datasets/xet-team/xet-spec-reference-files/blob/main/Electric_Vehicle_Population_Data_20250917.csv.shard.verification-no-footer).

### 5. Batch File Reconstruction

- **Description**: Retrieves reconstruction information for multiple files in a single request, avoiding N separate calls.
- **Path**: `/v1/reconstructions`
- **Method**: `POST`
- **Headers**:
  - `Accept-Encoding`: OPTIONAL. The server supports `gzip` and `zstd` compression on the JSON response. Clients SHOULD send `Accept-Encoding: gzip` or `Accept-Encoding: zstd` to reduce response size.
- **Minimum Token Scope**: `read`
- **Body**: JSON array of file ids (hex strings, 64 lowercase hexadecimal characters). Duplicate ids are de-duplicated server-side.

  ```json
  ["0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef", "..."]
  ```

- **Response**: JSON (`BatchQueryReconstructionResponse`)

  ```json
  {
    "files": {
      "0123...": [/* CASReconstructionTerm, ... */]
    },
    "fetch_info": {
      "0123...": [/* CASReconstructionFetchInfo, ... */]
    }
  }
  ```

  `files` maps each file id to its reconstruction terms; `fetch_info` is shared across files and keyed by xorb hash. This endpoint returns the v1 response shape; for the multi-range optimized format, call `/v2/reconstructions/{file_id}` per file.

- **Error Responses**: See [Error Cases](./api#error-cases)
  - `400 Bad Request`: Malformed body or invalid file id in the request.
  - `401 Unauthorized`: Refresh the token to continue making requests, or provide a token in the `Authorization` header.
  - `404 Not Found`: One or more files do not exist. Not retryable.

```txt
POST /v1/reconstructions
-H "Authorization: Bearer <token>"
-H "Content-Type: application/json"
```

### 6. Head Xorb

- **Description**: Existence check for a Xorb. Returns no body; the `Content-Length` response header carries the stored Xorb size in bytes.
- **Path**: `/v1/xorbs/{prefix}/{hash}`
- **Method**: `HEAD`
- **Parameters**:
  - `prefix`: The only acceptable prefix for Xorbs is `default`.
  - `hash`: Xorb hash in hex format (64 lowercase hexadecimal characters).
See [Xorb Hashes](./hashing#xorb-hashes) and [converting hashes to strings](./api#converting-hashes-to-strings).
- **Minimum Token Scope**: `read`
- **Body**: None.
- **Response**: Empty body. Response headers:
  - `Content-Length`: size in bytes of the stored Xorb.
- **Error Responses**: See [Error Cases](./api#error-cases)
  - `400 Bad Request`: Malformed hash in the path.
  - `401 Unauthorized`: Refresh the token to continue making requests, or provide a token in the `Authorization` header.
  - `404 Not Found`: The Xorb does not exist. Not retryable.

```txt
HEAD /v1/xorbs/default/0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef
-H "Authorization: Bearer <token>"
```

### 7. Head File

- **Description**: Existence check for a file. Returns no body; the `Content-Length` response header carries the full file size in bytes.
- **Path**: `/v1/files/{file_id}`
- **Method**: `HEAD`
- **Parameters**:
  - `file_id`: File hash in hex format (64 lowercase hexadecimal characters).
See [file hashes](./hashing#file-hashes) and [converting hashes to strings](./api#converting-hashes-to-strings).
- **Minimum Token Scope**: `read`
- **Body**: None.
- **Response**: Empty body. Response headers:
  - `Content-Length`: size in bytes of the full file.
- **Error Responses**: See [Error Cases](./api#error-cases)
  - `400 Bad Request`: Malformed `file_id` in the path.
  - `401 Unauthorized`: Refresh the token to continue making requests, or provide a token in the `Authorization` header.
  - `404 Not Found`: The file does not exist. Not retryable.

```txt
HEAD /v1/files/0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef
-H "Authorization: Bearer <token>"
```

### 8. Get File Chunk Hashes

- **Description**: For a file and a set of "dirty" byte ranges (regions the client intends to re-chunk), returns the chunk windows the client must re-chunk plus opaque hash subtrees covering the unchanged gaps. Used by delta uploads to compose a new shard without re-uploading already-known chunks. The response covers the full file; see the field notes below for how windows, gaps, and verification hashes fit together.
- **Path**: `/v2/file-chunk-hashes/{file_id}`
- **Method**: `GET`
- **Parameters**:
  - `file_id`: File hash in hex format (64 lowercase hexadecimal characters).
See [file hashes](./hashing#file-hashes) and [converting hashes to strings](./api#converting-hashes-to-strings).
- **Headers**:
  - `X-Range-Dirty`: REQUIRED. One or more byte ranges using the standard `bytes=` syntax (inclusive ends, comma-separated), e.g. `bytes=0-1023,5000-9999`. Ranges are sorted and merged server-side. At least one range MUST be present.
  - `Accept-Encoding`: OPTIONAL. The server supports `gzip` and `zstd` compression on the JSON response.
- **Minimum Token Scope**: `read`
- **Body**: None.
- **Response**: JSON (`FileChunkHashesResponse`)

  ```json
  {
    "totalChunks": 1234,
    "fileSize": 9876543,
    "windows": [
      { "dirtyByteRange": [0, 65536] }
    ],
    "hashRanges": [
      null,
      "<opaque MerkleHashSubtree>"
    ],
    "gapVerification": [
      "<hex MerkleHash>"
    ]
  }
  ```

  - `windows`: one entry per dirty range (adjacent dirty ranges that share the same chunk are merged). Bounds are chunk-aligned, expanded outward to fully contain the requested dirty range; the client re-chunks this exact span.
  - `hashRanges`: `N + 1` entries for `N` windows — `[before_w0, between_w0_w1, ..., after_wN]`. Each entry is an opaque `MerkleHashSubtree`; pass as-is to the client merge routine. `null` when the gap is empty (for example, a window starts at chunk 0).
  - `gapVerification`: one hash per stable original segment (a segment lying entirely in a gap between dirty windows or before/after them, in segment order). The client wraps each into a `FileVerificationEntry` for the verification section of the composed shard. Empty when every segment overlaps a dirty range.

- **Error Responses**: See [Error Cases](./api#error-cases)
  - `400 Bad Request`: Missing or malformed `X-Range-Dirty` header, malformed `file_id`, or no range survives clamping to the file.
  - `401 Unauthorized`: Refresh the token to continue making requests, or provide a token in the `Authorization` header.
  - `404 Not Found`: The file does not exist. Not retryable.

```txt
GET /v2/file-chunk-hashes/0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef
-H "Authorization: Bearer <token>"
-H "X-Range-Dirty: bytes=0-65535,200000-299999"
```

## Error Cases

### Non-Retryable Errors

- **400 Bad Request**: Returned when the request parameters are invalid (for example, invalid Xorb/Shard on upload APIs).
- **401 Unauthorized**: Refresh the token to continue making requests, or provide a token in the `Authorization` header.
- **403 Forbidden**: Token provided but does not have a wide enough scope (for example, a `read` token was provided for an API requiring `write` scope).
- **404 Not Found**: Occurs on `GET` APIs where the resource (Xorb, file) does not exist.
- **416 Range Not Satisfiable**: Reconstruction API only; returned when byte range requests are invalid. Specifically, the requested start range is greater than or equal to the length of the file.

### Retryable Errors

- **Connection Errors**: Often caused by network issues. Retry if intermittent.
Clients SHOULD ensure no firewall blocks requests and SHOULD NOT use DNS overrides.
- **429 Rate Limiting**: Lower your request rate using a backoff strategy, then wait and retry.
Assume all APIs are rate limited.
- **500 Internal Server Error**: The server experienced an intermittent issue; clients SHOULD retry their requests.
- **503 Service Unavailable**: Service is temporarily unable to process requests; wait and retry.
- **504 Gateway Timeout**: Service took too long to respond; wait and retry.
