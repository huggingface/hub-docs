# GGUF usage with llama.cpp

Llama.cpp has a helper script, [`scripts/hf.sh`](https://github.com/ggerganov/llama.cpp/blob/master/scripts/hf.sh), that makes it easy to download GGUF files from Hugging Face Hub. You can use it with a repo and file name, or with a URL to the GGUF file entry on the Hub:

```bash
./main \
  -m $(./scripts/hf.sh --repo TheBloke/Mixtral-8x7B-v0.1-GGUF --file mixtral-8x7b-v0.1.Q4_K_M.gguf) \
  -p "I believe the meaning of life is" -n 64

./main \
  -m $(./scripts/hf.sh https://huggingface.co/TheBloke/Mixtral-8x7B-v0.1-GGUF/blob/main/mixtral-8x7b-v0.1.Q4_K_M.gguf) \
  -p "I believe the meaning of life is" -n 64

./main \
  -m $(./scripts/hf.sh --url https://huggingface.co/TheBloke/Mixtral-8x7B-v0.1-GGUF/blob/main/mixtral-8x7b-v0.1.Q4_K_M.gguf) \
  -p "I believe the meaning of life is" -n 64
```

Find more information [here](https://github.com/ggerganov/llama.cpp/pull/5501).