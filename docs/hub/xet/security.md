# Security Model

Xet storage provides data deduplication over all chunks stored in Hugging Face. This is done via cryptographic hashing in a privacy sensitive way. The contents of chunks are protected and are associated with repository permissions, i.e. you can only read chunks which are required to reproduce files you have access to, and no more.

More information and details on how deduplication is done in a privacy-preserving way are described in the [Xet Protocol Specification](https://huggingface.co/docs/xet/deduplication).
