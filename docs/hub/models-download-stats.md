# Models Download Stats

## How are download stats generated for models?

Counting the number of downloads for models is not a trivial task as a single model repository might contain multiple files, including multiple model weight files (e.g., with sharded models), and different formats depending on the library. To avoid double counting downloads (e.g., counting a single download of a model as multiple downloads), the Hub uses a set of query files that are employed for download counting. 

Every HTTP request to these files, including `GET` and `HEAD` will be counted as a download. By default, when no library is specified, the Hub uses `config.json` as the default query file. Otherwise, the query file depends on each library, and the Hub might examine files such as `pytorch_model.bin` and `adapter_config.json`.

## Which are the query files for different libraries?

By default, the Hub looks at `config.json`, `config.yaml`, `hyperparams.yaml`, and `meta.yaml`. For the following set of libraries, there are specific query files

```json
{
    "adapter-transformers": {
        filter: [
            {
                term: { path: "adapter_config.json" },
            },
        ],
    },
    "asteroid": {
        filter: [
            {
                term: { path: "pytorch_model.bin" },
            },
        ],
    },
    "flair": {
        filter: [
            {
                term: { path: "pytorch_model.bin" },
            },
        ],
    },
    "keras": {
        filter: [
            {
                term: { path: "saved_model.pb" },
            },
        ],
    },
    "ml-agents": {
        filter: [
            {
                wildcard: { path: "*.onnx" },
            },
        ],
    },
    "nemo": {
        filter: [
            {
                wildcard: { path: "*.nemo" },
            },
        ],
    },
    "open_clip": {
        filter: [
            {
                wildcard: { path: "*pytorch_model.bin" },
            },
        ],
    },
    "sample-factory": {
        filter: [
            {
                term: { path: "cfg.json" },
            },
        ],
    },
    "paddlenlp": {
        filter: [
            {
                term: { path: "model_config.json" },
            },
        ],
    },
    "speechbrain": {
        filter: [
            {
                term: { path: "hyperparams.yaml" },
            },
        ],
    },
    "sklearn": {
        filter: [
            {
                term: { path: "sklearn_model.joblib" },
            },
        ],
    },
    "spacy": {
        filter: [
            {
                wildcard: { path: "*.whl" },
            },
        ],
    },
    "stanza": {
        filter: [
            {
                term: { path: "models/default.zip" },
            },
        ],
    },
    "stable-baselines3": {
        filter: [
            {
                wildcard: { path: "*.zip" },
            },
        ],
    },
    "timm": {
        filter: [
            {
                terms: { path: ["pytorch_model.bin", "model.safetensors"] },
            },
        ],
    },
    "diffusers": {
        /// Filter out nested safetensors and pickle weights to avoid double counting downloads from the diffusers lib
        must_not: [
            {
                wildcard: { path: "*/*.safetensors" },
            },
            {
                wildcard: { path: "*/*.bin" },
            },
        ],
        /// Include documents that match at least one of the following rules
        should: [
            /// Downloaded from diffusers lib
            {
                term: { path: "model_index.json" },
            },
            /// Direct downloads (LoRa, Auto1111 and others)
            {
                wildcard: { path: "*.safetensors" },
            },
            {
                wildcard: { path: "*.ckpt" },
            },
            {
                wildcard: { path: "*.bin" },
            },
        ],
        minimum_should_match: 1,
    },
    "peft": {
        filter: [
            {
                term: { path: "adapter_config.json" },
            },
        ],
    }
}
```