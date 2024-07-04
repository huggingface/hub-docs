# GGUF usage with llama.cpp

Llama.cpp allows you to download and run inference on a GGUF simply by providing a path to the Hugging Face repo path and the file name. llama.cpp download the model checkpoint and automatically caches it. The location of the cache is defined by `LLAMA_CACHE` environment variable, read more about it [here](https://github.com/ggerganov/llama.cpp/pull/7826):

```bash
./llama-cli
  --hf-repo lmstudio-community/Meta-Llama-3-8B-Instruct-GGUF \
  --hf-file Meta-Llama-3-8B-Instruct-Q8_0.gguf \
  -p "You are a helpful assistant" -cnv
```

Note: You can remove `-cnv` to run the CLI in chat completion mode.

Additionally, you can invoke an OpenAI spec chat completions endpoint directly using the llama.cpp server:

```bash
./llama-server \
  --hf-repo lmstudio-community/Meta-Llama-3-8B-Instruct-GGUF \
  --hf-file Meta-Llama-3-8B-Instruct-Q8_0.gguf
```

After running the server you can simply utilise the endpoint as below:

```
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
