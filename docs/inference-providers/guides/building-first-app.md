# Building Your First AI App with Inference Providers

You've learned the basics and understand the provider ecosystem. Now let's build something practical: an **AI Meeting Notes** app that transcribes audio files and generates summaries with action items.

This project demonstrates real-world AI orchestration using multiple specialized providers within a single application.

## Project Overview

Our app will:
1. **Accept audio** as a microphone input through a web interface
2. **Transcribe speech** using a fast speech-to-text model
3. **Generate summaries** using a powerful language model
4. **Deploy to the web** for easy sharing

<hfoptions id="tech-stack">
<hfoption id="python">

**Tech Stack**: Gradio (for the UI) + Inference Providers (for the AI)

</hfoption>
<hfoption id="javascript">

**Tech Stack**: HTML/JavaScript (for the UI) + Inference Providers (for the AI)

We'll use HTML and JavaScript for the UI just to keep things simple and agnostic, but if you want to see more mature examples, you can check out the [Hugging Face JS spaces](https://huggingface.co/huggingfacejs/spaces) page.

</hfoption>
</hfoptions>

## Step 1: Set Up Authentication

<hfoptions id="auth">
<hfoption id="python">

Before we start coding, authenticate with Hugging Face using the CLI:

```bash
pip install huggingface_hub
huggingface-cli login
```

When prompted, paste your Hugging Face token. This handles authentication automatically for all your inference calls. You can generate one from [your settings page](https://huggingface.co/settings/tokens/new?ownUserPermissions=inference.serverless.write&tokenType=fineGrained).

</hfoption>
<hfoption id="javascript">

You'll need your Hugging Face token. Get one from [your settings page](https://huggingface.co/settings/tokens/new?ownUserPermissions=inference.serverless.write&tokenType=fineGrained). We can set it as an environment variable in our app.

```bash
export HF_TOKEN="your_token_here"
```

```javascript
// Add your token at the top of your script
const HF_TOKEN = process.env.HF_TOKEN;
```

<Tip warning={true}>

When we deploy our app to Hugging Face Spaces, we'll need to add our token as a secret. This is a secure way to handle the token and avoid exposing it in the code.

</Tip>

</hfoption>
</hfoptions>

## Step 2: Build the User Interface

<hfoptions id="ui">
<hfoption id="python">

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

</hfoption>
<hfoption id="javascript">

For JavaScript, we'll create a clean HTML interface with native file upload and a simple loading state:

```html
<body>
    <h1>🎤 AI Meeting Notes</h1>
    
    <div class="upload" onclick="document.getElementById('file').click()">
        <input type="file" id="file" accept="audio/*">
        <p>Upload audio file</p>
        <button type="button">Choose File</button>
    </div>
    
    <div class="loading" id="loading">Processing...</div>
    
    <div class="results" id="results">
        <div class="result">
            <h3>📝 Transcript</h3>
            <div id="transcript"></div>
        </div>
        <div class="result">
            <h3>📋 Summary</h3>
            <div id="summary"></div>
        </div>
    </div>
</body>
```

This creates a clean drag-and-drop interface with styled results sections for the transcript and summary.

Our application can then use the `InferenceClient` from `huggingface.js` to call the transcription and summarization functions.

```javascript
import { InferenceClient } from 'https://esm.sh/@huggingface/inference';

// Access the token from Hugging Face Spaces secrets
const HF_TOKEN = window.huggingface?.variables?.HF_TOKEN;
// Or if you're running locally, you can set it as an environment variable
// const HF_TOKEN = process.env.HF_TOKEN;

document.getElementById('file').onchange = async (e) => {
    if (!e.target.files[0]) return;
    
    const file = e.target.files[0];
    
    show(document.getElementById('loading'));
    hide(document.getElementById('results'), document.getElementById('error'));
    
    try {
        console.log('🎤 Starting transcription...');
        const transcript = await transcribe(file);
        console.log('✅ Transcription completed:', transcript.substring(0, 100) + '...');
        
        console.log('🖊️ Starting summarization...');
        const summary = await summarize(transcript);
        console.log('✅ Summary completed:', summary.substring(0, 100) + '...');
        
        document.getElementById('transcript').textContent = transcript;
        document.getElementById('summary').textContent = summary;
        
        hide(document.getElementById('loading'));
        show(document.getElementById('results'));
    } catch (error) {
        hide(document.getElementById('loading'));
        showError(`Error: ${error.message}`);
    }
};
```

We'll also need to implement the `transcribe` and `summarize` functions.

</hfoption>
</hfoptions>

## Step 3: Add Speech Transcription

<hfoptions id="transcription">
<hfoption id="python">

Now let's implement the transcription using `fal.ai` and OpenAI's `whisper-large-v3` model for fast, reliable speech processing:

```python
def transcribe_audio(audio_file_path):
    """Transcribe audio using fal.ai for speed"""
    client = InferenceClient(provider="auto")
    
    # Pass the file path directly - the client handles file reading
    transcript = client.automatic_speech_recognition(
        audio=audio_file_path,
        model="openai/whisper-large-v3"
    )
    
    return transcript.text
```

Using the `auto` provider will automatically select the best provider for the model we're using.

</hfoption>
<hfoption id="javascript">

We'll use the Hugging Face Inference client with automatic provider selection:

```javascript
import { InferenceClient } from 'https://esm.sh/@huggingface/inference';

async function transcribe(file) {
    const client = new InferenceClient(HF_TOKEN);

    const output = await client.automaticSpeechRecognition({
        data: file,
        model: "openai/whisper-large-v3-turbo",
        provider: "auto"
    });
    
    return output.text || output || 'Transcription completed';
}
```

Using the `auto` provider will automatically select the best provider for the model we're using.

</hfoption>
</hfoptions>

## Step 4: Add AI Summarization

<hfoptions id="summarization">
<hfoption id="python">

Next, we'll use a powerful language model like `deepseek-ai/DeepSeek-R1-0528` from DeepSeek via an Inference Provider. 

<Tip>

We'll use the `auto` provider to automatically select the best provider for the model. You can define your own priority list of providers in the [Inference Providers](https://huggingface.co/settings/inference-providers) page.

</Tip>

```python
def generate_summary(transcript):
    """Generate summary using an Inference Provider"""
    client = InferenceClient(provider="auto")
    
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
        model="deepseek-ai/DeepSeek-R1-0528",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=1000
    )
    
    return response.choices[0].message.content
```

Note, we're also defining a custom summary prompt to ensure the output is formatted as a summary with action items and decisions made.

</hfoption>
<hfoption id="javascript">

We'll use the chat completion API with automatic provider selection again, and define a custom prompt to ensure the output is formatted as a summary with action items and decisions made:

```javascript
async function summarize(transcript) {
    const client = new InferenceClient(HF_TOKEN);

    const prompt = `Analyze this meeting transcript and provide:
    1. A concise summary of key points
    2. Action items with responsible parties
    3. Important decisions made

    Transcript: ${transcript}

    Format with clear sections:
    ## Summary
    ## Action Items  
    ## Decisions Made`;

    const response = await client.chatCompletion({
        model: "deepseek-ai/DeepSeek-R1-0528",
        messages: [
            {
                role: "user", 
                content: prompt
            }
        ],
        max_tokens: 1000
    }, {
        provider: "auto"
    });
    
    return response.choices?.[0]?.message?.content || response || 'No summary available';
}
```

We're using automatic provider selection which will choose the best available provider for the model.

</hfoption>
</hfoptions>

## Step 5: Deploy on Hugging Face Spaces

<hfoptions id="deployment">
<hfoption id="python">

To deploy, we'll need to create an `app.py` file and upload it to Hugging Face Spaces.

<details>
<summary><strong>📋 Click to view the complete app.py file</strong></summary>

```python
import gradio as gr
from huggingface_hub import InferenceClient


def transcribe_audio(audio_file_path):
    """Transcribe audio using an Inference Provider"""
    client = InferenceClient(provider="auto")

    # Pass the file path directly - the client handles file reading
    transcript = client.automatic_speech_recognition(
        audio=audio_file_path, model="openai/whisper-large-v3"
    )

    return transcript.text


def generate_summary(transcript):
    """Generate summary using an Inference Provider"""
    client = InferenceClient(provider="auto")

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
        model="deepseek-ai/DeepSeek-R1-0528",
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

Our app will run on port 7860 and look like this:

![Gradio app](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers-guides/gradio-app.png)

</details>

To deploy, we'll need to create a new Space and upload our files.

1. **Create a new Space**: Go to [huggingface.co/new-space](https://huggingface.co/new-space)
2. **Choose Gradio SDK** and make it public
3. **Upload your files**: Upload `app.py` and `requirements.txt`
4. **Add your token**: In Space settings, add `HF_TOKEN` as a secret (get it from [your settings](https://huggingface.co/settings/tokens))
5. **Launch**: Your app will be live at `https://huggingface.co/spaces/your-username/your-space-name`

> **Note**: While we used CLI authentication locally, Spaces requires the token as a secret for the deployment environment.

</hfoption>
<hfoption id="javascript">

For JavaScript deployment, create a simple static HTML file:

<details>
<summary><strong>📋 Click to view the complete index.html file</strong></summary>

```html
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🎤 AI Meeting Notes</title>
    <style>
        body { font-family: system-ui; max-width: 600px; margin: 50px auto; padding: 20px; }
        .upload { border: 2px dashed #ccc; padding: 40px; text-align: center; margin: 20px 0; cursor: pointer; }
        .upload:hover { border-color: #007bff; }
        button { background: #007bff; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; }
        .loading { display: none; text-align: center; margin: 20px 0; }
        .results { display: none; margin-top: 20px; }
        .result { background: #f5f5f5; padding: 15px; margin: 10px 0; border-radius: 4px; }
        .error { color: red; background: #ffe6e6; padding: 15px; border-radius: 4px; display: none; }
        input[type="file"] { display: none; }
    </style>
</head>
<body>
    <h1>🎤 AI Meeting Notes</h1>
       
    <div class="upload" onclick="document.getElementById('file').click()">
        <input type="file" id="file" accept="audio/*">
        <p>Upload audio file</p>
        <button type="button">Choose File</button>
    </div>
    
    <div class="loading" id="loading">Processing...</div>
    <div class="error" id="error"></div>
    
    <div class="results" id="results">
        <div class="result">
            <h3>📝 Transcript</h3>
            <div id="transcript"></div>
        </div>
        <div class="result">
            <h3>📋 Summary</h3>
            <div id="summary"></div>
        </div>
    </div>

    <script type="module">
        import { InferenceClient } from 'https://esm.sh/@huggingface/inference';
        
        // Access the token from Hugging Face Spaces secrets
        const HF_TOKEN = window.huggingface?.variables?.HF_TOKEN;
        
        // Add error handling for missing token
        if (!HF_TOKEN) {
            showError('HF_TOKEN not configured. Please add it in Space settings.');
            return;
        }
        
        document.getElementById('file').onchange = async (e) => {
            if (!e.target.files[0]) return;
            
            const file = e.target.files[0];
            
            show(document.getElementById('loading'));
            hide(document.getElementById('results'), document.getElementById('error'));
            
            try {
                console.log('🎤 Starting transcription...');
                const transcript = await transcribe(file);
                console.log('✅ Transcription completed:', transcript.substring(0, 100) + '...');
                
                console.log('🖊️ Starting summarization...');
                const summary = await summarize(transcript);
                console.log('✅ Summary completed:', summary.substring(0, 100) + '...');
                
                document.getElementById('transcript').textContent = transcript;
                document.getElementById('summary').textContent = summary;
                
                hide(document.getElementById('loading'));
                show(document.getElementById('results'));
            } catch (error) {
                hide(document.getElementById('loading'));
                showError(`Error: ${error.message}`);
            }
        };
        
        async function transcribe(file) {
            const client = new InferenceClient(HF_TOKEN);

            const output = await client.automaticSpeechRecognition({
                data: file,
                model: "openai/whisper-large-v3-turbo",
                provider: "auto"
            });
            
            return output.text || output || 'Transcription completed';
        }
        
        async function summarize(transcript) {
            const client = new InferenceClient(HF_TOKEN);

            const prompt = `Analyze this meeting transcript and provide:
            1. A concise summary of key points
            2. Action items with responsible parties
            3. Important decisions made

            Transcript: ${transcript}

            Format with clear sections:
            ## Summary
            ## Action Items  
            ## Decisions Made`;

            const response = await client.chatCompletion({
                model: "deepseek-ai/DeepSeek-R1-0528",
                messages: [
                    {
                        role: "user", 
                        content: prompt
                    }
                ],
                max_tokens: 1000
            }, {
                provider: "auto"
            });
            
            return response.choices?.[0]?.message?.content || response || 'No summary available';
        }
        
        const show = el => el.style.display = 'block';
        const hide = (...els) => els.forEach(el => el.style.display = 'none');
        const showError = msg => {
            const error = document.getElementById('error');
            error.innerHTML = msg;
            show(error);
        };
    </script>
</body>
</html>
```

We can run our app locally by going to the file from our browser.

![Local app](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers-guides/js-app.png)

</details>

To deploy:

1. **Create a new Space**: Go to [huggingface.co/new-space](https://huggingface.co/new-space)
2. **Choose Static SDK** and make it public
3. **Upload your file**: Upload `index.html`
4. **Add your token as a secret**: In Space settings, add `HF_TOKEN` as a **Secret**
5. **Launch**: Your app will be live at `https://huggingface.co/spaces/your-username/your-space-name`

> **Note**: The token is securely managed by Hugging Face Spaces and accessed via `window.huggingface.variables.HF_TOKEN`.

</hfoption>
</hfoptions>

## Next Steps

Congratulations! You've created a production-ready AI application that: handles real-world tasks, provides a professional interface, scales automatically, and costs efficiently. If you want to explore more providers, you can check out the [Inference Providers](https://huggingface.co/inference-providers) page. Or here are some ideas for next steps:

- **Improve your prompt**: Try different prompts to improve the quality for your use case
- **Try different models**: Experiment with various speech and text models
- **Compare performance**: Benchmark speed vs. accuracy across providers
