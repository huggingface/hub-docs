# Xorb Formation & Serialization Format

A "Xorb" (Xet Orb, pronounced like "zorb") is a sequence of chunks and a serialization format for a series of chunks.

## Collecting Chunks

Using the chunking algorithm a file is mapped to a series of chunks, once those chunks are found, they need to be collected into collections of Xorbs.

It is advantageous to collect series of chunks in Xorbs such that they can be referred to as a whole range of chunks.

Suppose a file is chunked into chunks A, B, C, D in the order ABCD. Then create a Xorb X1 with chunks A, B, C, D in this order (starting at chunk index 0), let's say this Xorb's hash is X1. Then to reconstruct the file we ask for Xorb X1 chunk range `[0, 4)`.

There is a limit of 64 MiB on the total size of the Xorb as serialized. The reference client additionally caps a Xorb at **8192 chunks** (`MAX_XORB_CHUNKS`), cutting the Xorb as soon as either limit is reached.

> [!NOTE]
> The 8192-chunk cap is a producer-side limit, not part of the wire format: the serialized Xorb encodes no chunk-count limit, and the CAS server does not reject a Xorb for chunk count (only for exceeding the 64 MiB serialized size). A reader MUST NOT assume a Xorb has at most 8192 chunks; a writer SHOULD apply the cap so that Xorbs stay comparable to those produced by the reference client.

Since some chunks will get compressed, it is generally advised to collect chunks until their total uncompressed length is near 64 MiB then serialize the struct.
Namely, Xorbs point to roughly 64 MiB worth of data.
(Recall that the target chunk size is 64 KiB so expect roughly ~1024 chunks per Xorb).

The CAS server will reject Xorb uploads that exceed the 64 MiB serialized size limit.

It is RECOMMENDED to pack chunks from multiple files into a Xorb if the size requirements allow, i.e. file X and Y both produced 10 new chunks each totalling a total of ~128000 bytes, then all those chunks can fit in a new Xorb.

## Xorb Format

A Xorb is a series of "Chunks" that is serialized according to a specific format that enables accessing chunks of ranges and builds in chunk level compression.
The chunk sequence is followed by a metadata footer (`XorbObjectInfo`) and a trailing 4-byte length, which together are how a reader locates the metadata.

```txt
Offset 0:
┌───────────────────────────────────────────────────────┐
│                                                       │
│                    Chunk sequence                     │ ← variable size
│                (Chunk 0 .. Chunk N)                   │
│                                                       │
├───────────────────────────────────────────────────────┤
│           XorbObjectInfo (metadata footer)            │ ← variable size
├───────────────────────────────────────────────────────┤
│      XorbObjectInfo length: u32 (final 4 bytes)       │ ← fixed size
└───────────────────────────────────────────────────────┘
[END OF XORB]
```

The chunk sequence itself:

```txt
┌─────────┬─────────────────────────────────┬─────────┬─────────────────────────────────┬─────────┬─────────────────────────────────┬──────────
│  Chunk  │                                 │  Chunk  │                                 │  Chunk  │                                 │
│  Header │      Compressed Chunk Data      │  Header │      Compressed Chunk Data      │  Header │      Compressed Chunk Data      │   ...
│         │                                 │         │                                 │         │                                 │
└─────────┴─────────────────────────────────┴─────────┴─────────────────────────────────┴─────────┴─────────────────────────────────┴───────────
│                 Chunk 0                   │                 Chunk 1                   │                 Chunk 2                   │   ...
```

### Chunk Addressing

Each chunk has an index within the Xorb it is in, starting at 0.
Chunks can be addressed individually by their index but are usually addressed or fetched in range.
Chunk ranges are always specified start inclusive and end exclusive i.e. `[start, end)`.

### Xorb Footer (XorbObjectInfo)

After the last chunk, a Xorb carries a variable-length `XorbObjectInfo` metadata footer, followed by a 4-byte length.
The footer holds the Xorb hash, the hash of every chunk, and the chunk boundary offsets that make range reads possible.

The final 4 bytes of a Xorb are the reader's entry point. They hold the length of the `XorbObjectInfo` block as a little-endian `u32`, which does **not** count itself. A reader therefore:

1. Seeks to `end - 4` and reads `info_length`.
2. Seeks to `end - 4 - info_length` and deserializes `XorbObjectInfo` from there.

For this reason `info_length` MUST remain the final 4 bytes of the serialized Xorb.

The tail of the footer is fixed-size and at a known position, so a reader that only needs the chunk boundaries can seek straight to it:

```txt
┌─────────┬──────────┬───────────┬─────────┬──────────┬─────────┐
│   num_  │ hashes_  │ boundary_ │  nonce  │ reserved │  info_  │
│  chunks │ section_ │  section_ │  (4 B)  │  (12 B)  │  length │
│  (4 B)  │ offset_  │  offset_  │         │          │  (4 B)  │
│         │ from_end │  from_end │         │          │         │
│         │  (4 B)   │   (4 B)   │         │          │         │
└─────────┴──────────┴───────────┴─────────┴──────────┴─────────┘
-32       -28        -24         -20       -16        -4        0
                                            (offsets relative to the end of the Xorb)
```

The trailing 16-byte buffer is an extensibility buffer:

- The leading 4 bytes are a per-upload **uniqueness nonce**. The remaining 12 bytes are reserved for future use and stay zero.
- The nonce is **excluded from the Xorb hash**, which is a Merkle tree over chunk contents only. Writing a nonce therefore does not change the Xorb's content address or its storage key — only its serialized bytes. Two Xorbs with identical content can be made to serialize to distinct byte streams.
- Xorbs written before the nonce existed carry an all-zero buffer and remain valid. The buffer's size is unchanged, so the format is wire-compatible in both directions.
- Readers MUST ignore the contents of this buffer.

> [!NOTE]
> Because the nonce does not participate in the hash, byte-identical content does not imply a byte-identical serialized Xorb. Do not treat serialized Xorb bytes as a stable identity for content; use the Xorb hash.

## Chunk Format

A chunk consists of a header followed by compressed data. The header contains metadata about the chunk, particularly the compression scheme required to know how to deserialize the chunk.

### Chunk Header Structure

The chunk header is serialized as follows:

- **Version** (1 byte): Protocol version, currently `0`
- **Compressed Size** (3 bytes): Size of data after compression as a 3 byte little-endian unsigned integer.
- **Compression Type** (1 byte): Algorithm used for compression (See mapping below)
- **Uncompressed Size** (3 bytes): Size of raw chunk data (before compression) as a 3 byte little-endian unsigned integer.

Both Compressed and Uncompressed Size can fit in a 3 byte integer, given that that a raw uncompressed chunk can be 128KiB at most,
requiring 18 binary digits to represent.
If utilizing the intended compression scheme results in a larger compressed chunk then the chunk SHOULD be stored uncompressed with then
the uncompressed size also being at a maximum of 128KiB.

#### Chunk Header Layout

```txt
┌─────────┬─────────────────────────────────┬──────────────┬─────────────────────────────────┐
│ Version │        Compressed Size          │ Compression  │       Uncompressed Size         │
│ 1 byte  │           3 bytes               │    Type      │           3 bytes               │
│         │      (little-endian)            │   1 byte     │      (little-endian)            │
└─────────┴─────────────────────────────────┴──────────────┴─────────────────────────────────┘
0         1                                 4              5                                 8
```

### Chunk Compression Schemes

| Value | Name | Description |
|-------|------|-------------|
| `0` | `None` | No compression - data is stored as-is |
| `1` | `LZ4` | Standard LZ4 compression |
| `2` | `ByteGrouping4LZ4` | Byte grouping with 4-byte groups followed by LZ4 compression. Optimized for floating-point and other structured data where grouping bytes by position improves compression ratios |

#### Byte Grouping LZ4 Compression

Byte grouping LZ4 compression is an optimization technique that improves compression ratios for structured data like floating-point numbers, integers, and other data types where values have similar byte patterns at specific positions.

1. **Byte Grouping Phase**: The input data is reorganized by grouping bytes by their position within each 4-byte groups:
   Create 4 buffers, for each 4 bytes of the chunk data (B1, B2, B3, B4) append each byte to their respective group i.e. in order from 1 to 4. Then concatenate the groups in order (1, 2, 3, 4).

   Example:

   - Original data: `[A1, A2, A3, A4, B1, B2, B3, B4, C1, C2, C3, C4, ...]`
   - Grouped data: `[A1, B1, C1, ..., A2, B2, C2, ..., A3, B3, C3, ..., A4, B4, C4, ...]`

   If the total number of bytes in the chunk is not a multiple of 4, append the remaining bytes following the pattern (1 byte to each group) to the first 1-3 groups until there are no more bytes left in the chunk.

2. **LZ4 Compression**: The grouped data is then compressed using standard LZ4 compression.

#### Chunk Data

Following the header is the compressed data block, exactly `compressed_size` bytes long.

### Picking a Compression Scheme

Picking the chunk compression scheme for the Xorb is a task left to the client when uploading the Xorb.
The goal is to minimize the overall size of the Xorb for faster transmission at the cost of resources to decompress a chunk on the receiving end.

When picking a compression scheme for the chunk there are a number of strategies and implementors MAY make their decisions as to how to pick a compression scheme.
Note that a Xorb MAY contain chunks that utilize different compression schemes.

1. **Brute Force**

    Try all possible compression schemes, pick the best one.
    The best one MAY be the one producing the smallest compressed chunk or the fastest to decompress.

2. **Best Effort Prediction**

    In `xet-core`, to predict if BG4 will be useful we maximum KL divergence between the distribution of per-byte pop-counts on a sample of each of the 4 groups that would be formed.
    You can read more about it in [bg4_prediction.rs](https://github.com/huggingface/xet-core/blob/main/xet_core_structures/src/xorb_object/byte_grouping/bg4_prediction.rs) and accompanying scripts.

    If the predictor does not show that BG4 will be better, we use Lz4 and in either case we will store the chunk as the uncompressed version if the compression scheme used does not show any benefit.

#### Example Chunk Serialization

```python
VERSION = 0
buffer = bytes()

for chunk in xorb.chunks:
    uncompressed_length = len(chunk)
    compressed, compression_scheme = pick_compression_scheme_and_compress(chunk)
    header = Header(VERSION, len(compressed), compression_scheme, uncompressed_length)
    buffer.write(header)
    buffer.write(compressed)
```

## Xorb Format Sample

For a sample of a serialized xorb object see [eea25d6ee393ccae385820daed127b96ef0ea034dfb7cf6da3a950ce334b7632.xorb](https://huggingface.co/datasets/xet-team/xet-spec-reference-files/blob/main/eea25d6ee393ccae385820daed127b96ef0ea034dfb7cf6da3a950ce334b7632.xorb).
The hash of this xorb is `eea25d6ee393ccae385820daed127b96ef0ea034dfb7cf6da3a950ce334b7632` and it is composed of chunks from file [Electric_Vehicle_Population_Data_20250917.csv](https://huggingface.co/datasets/xet-team/xet-spec-reference-files/blob/main/Electric_Vehicle_Population_Data_20250917.csv).
