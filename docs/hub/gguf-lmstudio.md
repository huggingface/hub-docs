# GGUF usage with LM Studio


[LM Studio](https://lmstudio.ai) is a desktop application for experimenting & developing with local AI models directly on your computer. LM Studio is built on llama.cpp and works on Mac (Apple Silicon), Windows, and Linux! 

## Getting models from Hugging Face into LM Studio

First, enable LM Studio under your [Local Apps Settings](https://huggingface.co/settings/local-apps) in Hugging Face.  
![][image2]

### Option 1: Use the 'Use this model' button right from Hugging Face

For any GGUF or MLX LLM, click the "Use this model" dropdown and select LM Studio. This will run the model directly in LM Studio if you already have it, or show you a download option if you don't.  
![][image3]

To try LM Studio with a trending model, find them here: [https://huggingface.co/models?library=gguf\&sort=trending](https://huggingface.co/models?library=gguf&sort=trending)

### Option 2: Use LM Studio's In-App Downloader

Open the LM Studio app and search for any model by presssing ⌘ + Shift + M on Mac, or Ctrl + Shift + M on PC (M stands for Models). You can even paste entire Hugging Face URLs into the search bar!

![][image4]

For each model, you can expand the dropdown to view multiple quantization options. LM Studio highlights the recommended choice for your hardware and indicates which options are supported.

![][image5]

### Option 3: Use lms, LM Studio's CLI:

If you prefer a terminal based workflow, use lms, LM Studio's CLI.
 

#### **Search for models from the terminal:**

Search with keyword  
```bash
lms get qwen
```

Filter search by MLX or GGUF results
```bash
lms get qwen \--mlx  # or \--gguf
```

#### **Download any model from Hugging Face:**

Use a full Hugging Face URL
```bash  
lms get https://huggingface.co/lmstudio-community/Ministral-3-8B-Reasoning-2512-GGUF
```

#### **Choose a model quantization**

You can choose a model quantization level that balances performance, memory usage, and accuracy. 

This is done with the @ qualifier, for example:
```bash  
lms get https://huggingface.co/lmstudio-community/Ministral-3-8B-Reasoning-2512-GGUF@Q6\_K
```

## You downloaded the model – Now what?

You've downloaded a model following one of the above options, now let's get started in LM Studio!

### Getting started with the LM Studio Application

In the LM Studio application, head to the model loader to view a list of downloaded models and select one to load. You may customize the model load parameters, though LM Studio will by default select the load parameters that optimizes model performance on your hardware.

**![][image6]**

Once the model has completed loading (as indicated by the progress bar), you may start chatting away using our app's chat interface!

### Or, use LM Studio's CLI to interact with your models

See a list of commands [here](https://lmstudio.ai/docs/cli). Note that you need to run LM Studio ***at least once*** before you can use lms

## **Keeping up with the latest models**

Follow the [LM Studio Community](https://huggingface.co/lmstudio-community) page on Hugging Face to stay updated on the latest & greatest local LLMs as soon as they come out.  