# GGUF usage with llama.cpp

Llama.cpp allows you to download and run inference on a GGUF simply by providing a path to the Hugging Face repo path and the file name. llama.cpp would download the model checkpoint in the directory you invoke it from:

```bash
./llama-cli \
  --hf-repo lmstudio-community/Meta-Llama-3-8B-Instruct-GGUF \
  -m Meta-Llama-3-8B-Instruct-Q8_0.gguf \
  -p "I believe the meaning of life is " -n 128
```

Additionally, you can invoke an OpenAI spec chat completions endpoint directly using the llama.cpp server

```bash
./llama-server \
  --hf-repo lmstudio-community/Meta-Llama-3-8B-Instruct-GGUF \
  -m Meta-Llama-3-8B-Instruct-Q8_0.gguf \
  -p "I believe the meaning of life is " -n 128
```

After running the server you can simply utilise the endpoint as below:

```
curl http://localhost:8080/v1/chat/completions \
-H "Content-Type: application/json" \
-H "Authorization: Bearer no-key" \
-d '{
"model": "llama-3-8b",
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

Replace `--hf-repo` with any valid Hugging Face hub repo name and `-m` with the GGUF file name in the hub repo - off you go! 🦙

Find more information [here](https://github.com/ggerganov/llama.cpp/pull/6234).

Note: Remember to `build` llama.cpp with `LLAMA_CURL=ON` :)
