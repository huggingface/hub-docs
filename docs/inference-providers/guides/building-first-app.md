# Building Your First AI App with Inference Providers

You've learned the basics and understand the provider ecosystem. Now let's build something practical: an **AI Meeting Notes** app that transcribes audio files and generates summaries with action items.

This project demonstrates real-world AI orchestration using multiple specialized providers within a single application.

## Project Overview

Our app will:
1. **Accept audio** as a microphone input through a web interface
2. **Transcribe speech** using a fast speech-to-text model
3. **Generate summaries** using a powerful language model
4. **Deploy to the web** for easy sharing

**Tech Stack**: Gradio (for the UI) + Inference Providers (for the AI)

## Step 1: Set Up Authentication

Before we start coding, authenticate with Hugging Face using the CLI:

```bash
pip install huggingface_hub
huggingface-cli login
```

When prompted, paste your Hugging Face token. This handles authentication automatically for all your inference calls. You can generate one from [your settings page](https://huggingface.co/settings/tokens/new?ownUserPermissions=inference.serverless.write&tokenType=fineGrained).

## Step 2: Build the User Interface

Now let's create a simple web interface using Gradio:

```python
import gradio as gr
from huggingface_hub import InferenceClient

def process_meeting_audio(audio_file):
    """Process uploaded audio file and return transcript + summary"""
    if audio_file is None:
        return "Please upload an audio file.", ""
    
    # We'll implement the AI logic next
    return "Transcript will appear here...", "Summary will appear here..."

# Create the Gradio interface
app = gr.Interface(
    fn=process_meeting_audio,
    inputs=gr.Audio(label="Upload Meeting Audio", type="filepath"),
    outputs=[
        gr.Textbox(label="Transcript", lines=10),
        gr.Textbox(label="Summary & Action Items", lines=8)
    ],
    title="🎤 AI Meeting Notes",
    description="Upload an audio file to get an instant transcript and summary with action items."
)

if __name__ == "__main__":
    app.launch()
```

Here we're using Gradio's `gr.Audio` component to either upload an audio file or use the microphone input. We're keeping things simple with two outputs: a transcript and a summary with action items.

## Step 3: Add Speech Transcription

Now let's implement the transcription using `fal.ai` and OpenAI's `whisper-large-v3` model for fast, reliable speech processing:

```python
def transcribe_audio(audio_file_path):
    """Transcribe audio using fal.ai for speed"""
    client = InferenceClient(provider="fal-ai")
    
    # Pass the file path directly - the client handles file reading
    transcript = client.automatic_speech_recognition(
        audio=audio_file_path,
        model="openai/whisper-large-v3"
    )
    
    return transcript.text
```

## Step 4: Add AI Summarization

Next, we'll use a powerful language model like `Qwen/Qwen3-235B-A22B-FP8` from Qwen via Together AI for summarization:

```python
def generate_summary(transcript):
    """Generate summary using Together AI"""
    client = InferenceClient(provider="together")
    
    prompt = f"""
    Analyze this meeting transcript and provide:
    1. A concise summary of key points
    2. Action items with responsible parties
    3. Important decisions made
    
    Transcript: {transcript}
    
    Format with clear sections:
    ## Summary
    ## Action Items  
    ## Decisions Made
    """
    
    response = client.chat.completions.create(
        model="Qwen/Qwen3-235B-A22B-FP8",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=1000
    )
    
    return response.choices[0].message.content
```

Note, we're also defining a custom summary prompt to ensure the output is formatted as a summary with action items and decisions made.

## Step 5: Deploy on Hugging Face Spaces

To deploy, we'll need to create a `requirements.txt` file and a `app.py` file.

`requirements.txt`:

```txt
gradio
huggingface_hub
```

`app.py`:

<details>
<summary><strong>📋 Click to view the complete app.py file</strong></summary>

```python
import gradio as gr
from huggingface_hub import InferenceClient


def transcribe_audio(audio_file_path):
    """Transcribe audio using fal.ai for speed"""
    client = InferenceClient(provider="fal-ai")

    # Pass the file path directly - the client handles file reading
    transcript = client.automatic_speech_recognition(
        audio=audio_file_path, model="openai/whisper-large-v3"
    )

    return transcript.text


def generate_summary(transcript):
    """Generate summary using Together AI"""
    client = InferenceClient(provider="together")

    prompt = f"""
    Analyze this meeting transcript and provide:
    1. A concise summary of key points
    2. Action items with responsible parties
    3. Important decisions made
    
    Transcript: {transcript}
    
    Format with clear sections:
    ## Summary
    ## Action Items  
    ## Decisions Made
    """

    response = client.chat.completions.create(
        model="Qwen/Qwen3-235B-A22B-FP8",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=1000,
    )

    return response.choices[0].message.content


def process_meeting_audio(audio_file):
    """Main processing function"""
    if audio_file is None:
        return "Please upload an audio file.", ""

    try:
        # Step 1: Transcribe
        transcript = transcribe_audio(audio_file)

        # Step 2: Summarize
        summary = generate_summary(transcript)

        return transcript, summary

    except Exception as e:
        return f"Error processing audio: {str(e)}", ""


# Create Gradio interface
app = gr.Interface(
    fn=process_meeting_audio,
    inputs=gr.Audio(label="Upload Meeting Audio", type="filepath"),
    outputs=[
        gr.Textbox(label="Transcript", lines=10),
        gr.Textbox(label="Summary & Action Items", lines=8),
    ],
    title="🎤 AI Meeting Notes",
    description="Upload audio to get instant transcripts and summaries.",
)

if __name__ == "__main__":
    app.launch()
```

</details>

To deploy, we'll need to create a new Space and upload our files.

1. **Create a new Space**: Go to [huggingface.co/new-space](https://huggingface.co/new-space)
2. **Choose Gradio SDK** and make it public
3. **Upload your files**: Upload `app.py` and `requirements.txt`
4. **Add your token**: In Space settings, add `HF_TOKEN` as a secret (get it from [your settings](https://huggingface.co/settings/tokens))
5. **Launch**: Your app will be live at `https://huggingface.co/spaces/your-username/your-space-name`

> **Note**: While we used CLI authentication locally, Spaces requires the token as a secret for the deployment environment.

## Next Steps

Congratulations! You've created a production-ready AI application that: handles real-world tasks, provides a professional interface, scales automatically, and costs efficiently. If you want to explore more providers, you can check out the [Inference Providers](https://huggingface.co/inference-providers) page. Or here are some ideas for next steps:

- **Improve your prompt**: Try different prompts to improve the quality for your use case
- **Try different models**: Experiment with various speech and text models
- **Compare performance**: Benchmark speed vs. accuracy across providers
