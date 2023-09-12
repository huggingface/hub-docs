## Use Cases

Text-to-Speech (TTS) models can be used in any speech-enabled application that requires converting text to speech imitatting human voice.

### Voice Assistants

TTS models are used to create voice assistants on smart devices. These models are a better alternative compared to concatenative methods where the assistant is built by recording sounds and mapping them, since the outputs in TTS models contain elements in natural speech such as emphasis.

### Announcement Systems

TTS models are widely used in airport and public transportation announcement systems to convert the announcement of a given text into speech.

## Inference

The Hub contains over [100 TTS models](https://huggingface.co/models?pipeline_tag=text-to-speech&sort=downloads) that you can use right away by trying out the widgets directly in the browser or calling the models as a service using the Inference API. Here is a simple code snippet to do exactly this:

```python
import json
import requests

headers = {"Authorization": f"Bearer {API_TOKEN}"}
API_URL = "https://api-inference.huggingface.co/models/facebook/wav2vec2-base-960h"

def query(payload):
	response = requests.post(API_URL, headers=headers, json=payload)
	return response

output = query({"inputs": "This is a test"})
```

You can also use libraries such as [espnet](https://huggingface.co/models?library=espnet&pipeline_tag=automatic-speech-recognition&sort=downloads) if you want to handle the Inference directly.

```python
from espnet2.bin.tts_inference import Text2Speech

model = Text2Speech.from_pretrained("espnet/kan-bayashi_ljspeech_vits")

speech, *_ = model("text to generate speech from")
```


You can use [huggingface.js](https://github.com/huggingface/huggingface.js) to infer summarization models on Hugging Face Hub.

```javascript
import { HfInference } from "@huggingface/inference";

const inference = new HfInference(HF_ACCESS_TOKEN);
await inference.textToSpeech({
  model: 'facebook/mms-tts',
  inputs: "text to generate speech from"
})
```

## Useful Resources
- [ML for Audio Study Group - Text to Speech Deep Dive](https://www.youtube.com/watch?v=aLBedWj-5CQ)
- [An introduction to SpeechT5, a multi-purpose speech recognition and synthesis model](https://huggingface.co/blog/speecht5).
- [A guide on Fine-tuning Whisper For Multilingual ASR with 🤗Transformers](https://huggingface.co/blog/fine-tune-whisper)
- [Speech Synthesis, Recognition, and More With SpeechT5](https://huggingface.co/blog/speecht5)

