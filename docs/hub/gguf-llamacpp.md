# GGUF usage with llama.cpp

> [!TIP]
> You can now deploy any llama.cpp compatible GGUF on Hugging Face Endpoints, read more about it [here](https://huggingface.co/docs/inference-endpoints/en/others/llamacpp_container)

Llama.cpp allows you to download and run inference on a GGUF simply by providing a path to the Hugging Face repo path and the file name. llama.cpp downloads the model checkpoint and automatically caches it. The location of the cache is defined by `LLAMA_CACHE` environment variable; read more about it [here](https://github.com/ggerganov/llama.cpp/pull/7826).

You can install llama.cpp using the installer on macOS and Linux, via WinGet on Windows, or build it from source. See the [official documentation](https://github.com/ggml-org/llama.cpp#quick-start) for other installation options, including Docker.

### Option 1: Install llama.cpp

On macOS and Linux:

```bash
curl -LsSf https://llama.app/install.sh | sh
```

Alternatively, install with Homebrew:

```bash
brew install llama.cpp
```

On Windows, use WinGet:

```powershell
winget install llama.cpp
```

### Option 2: build from source

Step 1: Clone llama.cpp from GitHub.

```
git clone https://github.com/ggml-org/llama.cpp.git
```

Step 2: Move into the llama.cpp folder and build it. You can also add hardware-specific flags (for ex: `-DGGML_CUDA=1` for Nvidia GPUs).

```
cd llama.cpp
cmake -B build   # optionally, add -DGGML_CUDA=ON to activate CUDA
cmake --build build --config Release -j --target llama-app
```

Note: for other hardware support (for ex: AMD ROCm, Intel SYCL), please refer to [llama.cpp's build guide](https://github.com/ggml-org/llama.cpp/blob/master/docs/build.md)

If you built from source, use `./build/bin/llama` in place of `llama` in the commands below.

Once installed, you can use `llama cli` or `llama serve` as follows:

```bash
llama cli -hf bartowski/Llama-3.2-3B-Instruct-GGUF:Q8_0
```

Note: For raw completion mode (non-chat mode), use `llama completion` with `-no-cnv` instead of `llama cli`.

Additionally, you can invoke an OpenAI spec chat completions endpoint directly using the llama.cpp server:

```bash
llama serve -hf bartowski/Llama-3.2-3B-Instruct-GGUF:Q8_0 --port 8080
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
        "content": "You are an AI assistant. Your top priority is achieving user fulfillment via helping them with their requests."
    },
    {
        "role": "user",
        "content": "Write a limerick about Python exceptions"
    }
  ]
}'
```

Replace `-hf` with any valid Hugging Face hub repo name - off you go! 🦙
