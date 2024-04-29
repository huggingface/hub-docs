# GGUF usage with llama.cpp

Llama.cpp directly allows you to download and run inference on a GGUF simply by providing a path to the Hugging Face repo path and the file name. llama.cpp would download the model checkpoint in the directory you invoke it from:

```bash
./main \
  --hf-repo lmstudio-community/Meta-Llama-3-8B-Instruct-GGUF \
  -m Meta-Llama-3-8B-Instruct-Q8_0.gguf \
  -p "I believe the meaning of life is " -n 128
```

Replace `--hf-repo` with any valid Hugging Face hub repo name and off you go! 🦙

Find more information [here](https://github.com/ggerganov/llama.cpp/pull/6234).

Note: Remember to `build` llama.cpp with `LLAMA_CURL=ON` :)