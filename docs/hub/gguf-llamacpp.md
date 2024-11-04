# GGUF usage with llama.cpp

> [!TIP]
> You can now deploy any llama.cpp compatible GGUF on Hugging Face Endpoints, read more about it [here](https://huggingface.co/docs/inference-endpoints/en/others/llamacpp_container)

Llama.cpp allows you to download and run inference on a GGUF simply by providing a path to the Hugging Face repo path and the file name. llama.cpp downloads the model checkpoint and automatically caches it. The location of the cache is defined by `LLAMA_CACHE` environment variable; read more about it [here](https://github.com/ggerganov/llama.cpp/pull/7826).

You can install llama.cpp through brew (works on Mac and Linux), or you can build it from source. There are also pre-built binaries and Docker images that you can [check in the official documentation](https://github.com/ggerganov/llama.cpp?tab=readme-ov-file#usage).

 ### Option 1: Install with brew

```bash
brew install llama.cpp
```

### Option 2: build from source

Step 1: Clone llama.cpp from GitHub.

```
git clone https://github.com/ggerganov/llama.cpp
```

Step 2: Move into the llama.cpp folder and build it with `LLAMA_CURL=1` flag along with other hardware-specific flags (for ex: LLAMA_CUDA=1 for Nvidia GPUs on Linux).

```
cd llama.cpp && LLAMA_CURL=1 make
```

Once installed, you can use the `llama-cli` or `llama-server` as follows:

```bash
llama-cli
  --hf-repo lmstudio-community/Meta-Llama-3-8B-Instruct-GGUF \
  --hf-file Meta-Llama-3-8B-Instruct-Q8_0.gguf \
  -p "You are a helpful assistant" -cnv
```

Note: You can remove `-cnv` to run the CLI in chat completion mode.

Additionally, you can invoke an OpenAI spec chat completions endpoint directly using the llama.cpp server:

```bash
llama-server \
  --hf-repo lmstudio-community/Meta-Llama-3-8B-Instruct-GGUF \
  --hf-file Meta-Llama-3-8B-Instruct-Q8_0.gguf
```

After running the server you can simply utilise the endpoint as below:

```bash
curl http://localhost:8080/v1/chat/completions \
-H "Content-Type: application/json" \
-H "Authorization: Bearer no-key" \
-d '{
"messages": [
    {
        "role": "system",
        "content": "You are an AI assistant. Your top priority is achieving user fulfilment via helping them with their requests."
    },
    {
        "role": "user",
        "content": "Write a limerick about Python exceptions"
    }
  ]
}'
```

Replace `--hf-repo` with any valid Hugging Face hub repo name and `--hf-file` with the GGUF file name in the hub repo - off you go! 🦙

Note: Remember to `build` llama.cpp with `LLAMA_CURL=1` :)
