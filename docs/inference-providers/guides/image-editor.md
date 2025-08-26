# Building an AI Image Editor with Gradio and Inference Providers

In this guide, we'll build an AI-powered image editor that lets users upload images and edit them using natural language prompts. This project demonstrates how to combine Inference Providers with image-to-image models like [Qwen's Image Edit](https://huggingface.co/Qwen/Qwen-Image-Edit) and [Black Forest Labs' Flux Kontext](https://huggingface.co/black-forest-labs/FLUX.1-Kontext-dev).

Our app will:

1. **Accept image uploads** through a web interface
2. **Process natural language prompts** editing instructions like "Turn the cat into a tiger"
3. **Transform images** using Qwen Image Edit or FLUX.1 Kontext
4. **Display results** in a Gradio interface

<Tip>

TLDR; this guide will show you how to build an AI image editor with Gradio and Inference Providers, just like [this one](https://huggingface.co/spaces/Qwen/Qwen-Image-Edit).

</Tip>

## Step 1: Set Up Authentication

Before we start coding, authenticate with Hugging Face using your token:

```bash
# Get your token from https://huggingface.co/settings/tokens
export HF_TOKEN="your_token_here"
```

<Tip>

This guide assumes you have a Hugging Face account. If you don't have one, you can create one for free at [huggingface.co](https://huggingface.co).

</Tip>

When you set this environment variable, it handles authentication automatically for all your inference calls. You can generate a token from [your settings page](https://huggingface.co/settings/tokens/new?ownUserPermissions=inference.serverless.write&tokenType=fineGrained).

## Step 2: Project Setup

Create a new project directory and initialize it with uv:

```bash
mkdir image-editor-app
cd image-editor-app
uv init
```

This creates a basic project structure with a `pyproject.toml` file. Now add the required dependencies:

```bash
uv add huggingface-hub>=0.34.4 gradio>=5.0.0 pillow>=11.3.0
```

The dependencies are now installed and ready to use! Also, `uv` will maintain the `pyproject.toml` file for you as you add dependencies.

<Tip>

We're using `uv` because it's a fast Python package manager that handles dependency resolution and virtual environment management automatically. It's much faster than pip and provides better dependency resolution. If you're not familiar with `uv`, check it out [here](https://docs.astral.sh/uv/).

</Tip>

## Step 3: Build the Core Image Editing Function

Now let's create the main logic for our application - the image editing function that transforms images using AI.

Create `main.py` then import the necessary libraries and instantiate the InferenceClient. We're using the `fal-ai` provider for fast image processing, but other providers like `replicate` are also available.

```python
import os
import gradio as gr
from huggingface_hub import InferenceClient
import io

# Initialize the client with fal-ai provider for fast image processing
client = InferenceClient(
    provider="fal-ai",
    api_key=os.environ["HF_TOKEN"],
)
```

Now let's create the image editing function. This function takes an input image and a prompt, and returns an edited image. We also want to handle errors gracefully and return the original image if there's an error, so our UI always shows something.

```python
def edit_image(input_image, prompt):
    """
    Edit an image using the given prompt.
    
    Args:
        input_image: PIL Image object from Gradio
        prompt: String prompt for image editing
    
    Returns:
        PIL Image object (edited image)
    """
    if input_image is None:
        return None
    
    if not prompt or prompt.strip() == "":
        return input_image
    
    try:
        # Convert PIL Image to bytes
        img_bytes = io.BytesIO()
        input_image.save(img_bytes, format="PNG")
        img_bytes = img_bytes.getvalue()
        
        # Use the image_to_image method with Qwen's image editing model
        edited_image = client.image_to_image(
            img_bytes,
            prompt=prompt.strip(),
            model="Qwen/Qwen-Image-Edit",
        )
        
        return edited_image
    
    except Exception as e:
        print(f"Error editing image: {e}")
        return input_image
```

<Tip>

We're using the `fal-ai` provider with the `Qwen/Qwen-Image-Edit` model. The fal-ai provider offers fast inference times, perfect for interactive applications.

However, you can experiment with different providers for various performance characteristics:

```python
client = InferenceClient(provider="replicate", api_key=os.environ["HF_TOKEN"])
client = InferenceClient(provider="auto", api_key=os.environ["HF_TOKEN"])  # Automatic selection
```

</Tip>

## Step 4: Create the Gradio Interface

Now let's build a simple user-friendly interface using Gradio. 

```python
# Create the Gradio interface
with gr.Blocks(title="Image Editor", theme=gr.themes.Soft()) as interface:
    gr.Markdown(
        """
        # 🎨 AI Image Editor
        Upload an image and describe how you want to edit it using natural language!
        """
    )

    with gr.Row():
        with gr.Column():
            input_image = gr.Image(label="Upload Image", type="pil", height=400)
            prompt = gr.Textbox(
                label="Edit Prompt",
                placeholder="Describe how you want to edit the image...",
                lines=2,
            )
            edit_btn = gr.Button("✨ Edit Image", variant="primary", size="lg")

        with gr.Column():
            output_image = gr.Image(label="Edited Image", type="pil", height=400)

    # Example images and prompts
    with gr.Row():
        gr.Examples(
            examples=[
                ["cat.png", "Turn the cat into a tiger"],
                ["cat.png", "Make it look like a watercolor painting"],
                ["cat.png", "Change the background to a forest"],
            ],
            inputs=[input_image, prompt],
            outputs=output_image,
            fn=edit_image,
            cache_examples=False,
        )

    # Event handlers
    edit_btn.click(fn=edit_image, inputs=[input_image, prompt], outputs=output_image)

    # Allow Enter key to trigger editing
    prompt.submit(fn=edit_image, inputs=[input_image, prompt], outputs=output_image)
```

In this app we'll use some practical Gradio features to make a user-friendly app

- We'll use blocks to create a two column layout with the image upload and the edited image.
- We'll drop some markdown into to explain what the app does.
- And, we'll use `gr.Examples` to show some example inputs to give the user some inspiration.

Finally, add the launch configuration at the end of `main.py`:

```python
if __name__ == "__main__":
    interface.launch(
        share=True,  # Creates a public link
        server_name="0.0.0.0",  # Allow external access
        server_port=7860,  # Default Gradio port
        show_error=True,  # Show errors in the interface
    )
```

Now run your application:

```bash
python main.py
```

Your app will launch locally at `http://localhost:7860` and Gradio will also provide a public shareable link!


## Complete Working Code

<details>
<summary><strong>📋 Click to view the complete main.py file</strong></summary>

```python
import os
import gradio as gr
from huggingface_hub import InferenceClient
from PIL import Image
import io

# Initialize the client
client = InferenceClient(
    provider="fal-ai",
    api_key=os.environ["HF_TOKEN"],
)

def edit_image(input_image, prompt):
    """
    Edit an image using the given prompt.
    
    Args:
        input_image: PIL Image object from Gradio
        prompt: String prompt for image editing
    
    Returns:
        PIL Image object (edited image)
    """
    if input_image is None:
        return None
    
    if not prompt or prompt.strip() == "":
        return input_image
    
    try:
        # Convert PIL Image to bytes
        img_bytes = io.BytesIO()
        input_image.save(img_bytes, format="PNG")
        img_bytes = img_bytes.getvalue()
        
        # Use the image_to_image method
        edited_image = client.image_to_image(
            img_bytes,
            prompt=prompt.strip(),
            model="Qwen/Qwen-Image-Edit",
        )
        
        return edited_image
    
    except Exception as e:
        print(f"Error editing image: {e}")
        return input_image

# Create Gradio interface
with gr.Blocks(title="Image Editor", theme=gr.themes.Soft()) as interface:
    gr.Markdown(
        """
        # 🎨 AI Image Editor
        Upload an image and describe how you want to edit it using natural language!
        """
    )

    with gr.Row():
        with gr.Column():
            input_image = gr.Image(label="Upload Image", type="pil", height=400)
            prompt = gr.Textbox(
                label="Edit Prompt",
                placeholder="Describe how you want to edit the image...",
                lines=2,
            )
            edit_btn = gr.Button("✨ Edit Image", variant="primary", size="lg")

        with gr.Column():
            output_image = gr.Image(label="Edited Image", type="pil", height=400)

    # Example images and prompts
    with gr.Row():
        gr.Examples(
            examples=[
                ["cat.png", "Turn the cat into a tiger"],
                ["cat.png", "Make it look like a watercolor painting"],
                ["cat.png", "Change the background to a forest"],
            ],
            inputs=[input_image, prompt],
            outputs=output_image,
            fn=edit_image,
            cache_examples=False,
        )

    # Event handlers
    edit_btn.click(fn=edit_image, inputs=[input_image, prompt], outputs=output_image)

    # Allow Enter key to trigger editing
    prompt.submit(fn=edit_image, inputs=[input_image, prompt], outputs=output_image)

if __name__ == "__main__":
    interface.launch(
        share=True,  # Creates a public link
        server_name="0.0.0.0",  # Allow external access
        server_port=7860,  # Default Gradio port
        show_error=True,  # Show errors in the interface
    )
```

</details>

## Deploy on Hugging Face Spaces

Let's deploy our app to Hugging Face Spaces.

First, we will export our dependencies to a requirements file. 

```bash
uv export --format requirements-txt --output-file requirements.txt
```

This creates a `requirements.txt` file with all your project dependencies and their exact versions from the lockfile.

<Tip>

The `uv export` command ensures that your Space will use the exact same dependency versions that you tested locally, preventing deployment issues caused by version mismatches.

</Tip>

Now you can deploy to Spaces:

1. **Create a new Space**: Go to [huggingface.co/new-space](https://huggingface.co/new-space)
2. **Choose Gradio SDK** and make it public
3. **Upload your files**: Upload `main.py`, `requirements.txt`, and any example images
4. **Add your token**: In Space settings, add `HF_TOKEN` as a secret
5. **Launch**: Your app will be live at `https://huggingface.co/spaces/your-username/your-space-name`


# Next Steps

Congratulations! You've created a production-ready AI image editor. Now that you have a working image editor, here are some ideas to extend it:

- **Batch processing**: Edit multiple images at once
- **Object removal**: Remove unwanted objects from images
- **Provider comparison**: Benchmark different providers for your use case

Happy building! And remember to share your app with the community on the Hub.
