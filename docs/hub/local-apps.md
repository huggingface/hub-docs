# Use AI Models Locally

You can run AI models from the Hub locally on your machine. This means that you can benefit from these advantages:

- **Privacy**: You won't be sending your data to a remote server.
- **Speed**: Your hardware is the limiting factor, not the server or connection speed.
- **Control**: You can configure models to your liking.
- **Cost**: You can run models locally without paying for an API provider.

## How to Use Local Apps

Local apps are applications that can run Hugging Face models directly on your machine. To get started:

1. **Enable local apps** in your [Local Apps settings](https://huggingface.co/settings/local-apps).

![Local Apps](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/local-apps/settings.png)

1. **Choose a supported model** from the Hub by searching for it. You can filter by `app` in the `Other` section of the navigation bar: 

![Local Apps](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/local-apps/search_llamacpp.png)

3. **Select the local app** from the "Use this model" dropdown on the model page.

![Local Apps](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/local-apps/button.png)

4. **Copy and run** the provided command in your terminal.

![Local Apps](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/local-apps/command.png)

## Supported Local Apps

The best way to check if a local app is supported is to go to the Local Apps settings and see if the app is listed. Here is a quick overview of some of the most popular local apps:

> [!TIP]
> 👨‍💻 To use these local apps, copy the snippets from the model card as above.
>
> 👷 If you're building a local app, you can learn about integrating with the Hub in [this guide](https://huggingface.co/docs/hub/en/models-adding-libraries).

### Llama.cpp

Llama.cpp is a high-performance C/C++ library for running LLMs locally with optimized inference across lots of different hardware, including CPUs, CUDA and Metal.

**Advantages:**
- Extremely fast performance for CPU-based models on multiple CPU families
- Low resource usage
- Multiple interface options (CLI, server, Python library)
- Hardware-optimized for CPUs and GPUs

To use Llama.cpp, navigate to the model card and click "Use this model" and copy the command.

```sh
# Load and run the model:
./llama-server -hf unsloth/gpt-oss-20b-GGUF:Q4_K_M
```


### Ollama

Ollama is an application that lets you run large language models locally on your computer with a simple command-line interface.

**Advantages:**
- Easy installation and setup
- Direct integration with Hugging Face Hub

To use Ollama, navigate to the model card and click "Use this model" and copy the command.

```sh
ollama run hf.co/unsloth/gpt-oss-20b-GGUF:Q4_K_M
```

### Jan

Jan is an open-source ChatGPT alternative that runs entirely offline with a user-friendly interface.

**Advantages:**
- User-friendly GUI
- Chat with documents and files
- OpenAI-compatible API server, so you can run models and use them from other apps

To use Jan, navigate to the model card and click "Use this model". Jan will open and you can start chatting through the interface.

### LM Studio

LM Studio is a desktop application that provides an easy way to download, run, and experiment with local LLMs.

**Advantages:**
- Intuitive graphical interface
- Built-in model browser
- Developer tools and APIs
- Free for personal and commercial use

Navigate to the model card and click "Use this model". LM Studio will open and you can start chatting through the interface.
