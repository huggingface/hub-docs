## Use Cases

### Virtual Speech Assistants

Many edge devices have an embedded virtual assistant to interact with the end users better. These assistances rely on ASR models to recognize different voice commands to perform various tasks. For instance, you can ask your phone for dialing a phone number, ask a general question, or schedule a meeting.

### Caption Generation

A caption generation model takes audio as input from sources to generate automatic captions through transcription, for live-streamed or recorded videos. This can help with content accessibility. For example, an audience watching a video that includes a non-native language, can rely on captions to interpret the content. It can also help with information retention.

## Task Variants

### Multilingual ASR

Multilingual ASR models can convert audio inputs with multiple languages into transcripts. Some multilingual ASR models include [language identification](https://huggingface.co/tasks/audio-classification) blocks to improve the performance.

The use of Multilingual ASR has become popular, the idea of maintaining just a single model for all language can simplify the production pipeline. Take a look at this [model](https://huggingface.co/voidful/wav2vec2-xlsr-multilingual-56) to get an idea on how 56 languages can be processed by a single model. 

## Inference

The Hub contains over [500 ASR models](https://huggingface.co/models?pipeline_tag=automatic-speech-recognition&sort=downloads) that you can use right away by trying out the widgets directly in the browser or calling the models as a service using the Inference API. Here is a simple code snippet to do exactly this:

```python
import json
import requests

headers = {"Authorization": f"Bearer {API_TOKEN}"}
API_URL = "https://api-inference.huggingface.co/models/facebook/wav2vec2-base-960h"

def query(filename):
    with open(filename, "rb") as f:
        data = f.read()
    response = requests.request("POST", API_URL, headers=headers, data=data)
    return json.loads(response.content.decode("utf-8"))

data = query("sample1.flac")
```

You can also use libraries such as [transformers](https://huggingface.co/models?library=transformers&pipeline_tag=automatic-speech-recognition&sort=downloads), [speechbrain](https://huggingface.co/models?library=speechbrain&pipeline_tag=automatic-speech-recognition&sort=downloads) and [espnet](https://huggingface.co/models?library=espnet&pipeline_tag=automatic-speech-recognition&sort=downloads) if you want to handle the Inference directly.

```python
from transformers import pipeline

with open("sample.flac", "rb") as f:
  data = f.read()

pipe = pipeline("automatic-speech-recognition", "facebook/wav2vec2-base-960h")
pipe("sample.flac")
# {'text': "GOING ALONG SLUSHY COUNTRY ROADS AND SPEAKING TO DAMP AUDIENCES IN DRAUGHTY SCHOOL ROOMS DAY AFTER DAY FOR A FORTNIGHT HE'LL HAVE TO PUT IN AN APPEARANCE AT SOME PLACE OF WORSHIP ON SUNDAY MORNING AND HE CAN COME TO US IMMEDIATELY AFTERWARDS"}
```

## Solving ASR for your own data

We have some great news! You can do fine-tuning (transfer learning) to train a well-performing model without requiring as much data. Pretrained models such as Wav2Vec2 and HuBERT exist. [Facebook's Wav2Vec2 XLS-R model](https://ai.facebook.com/blog/wav2vec-20-learning-the-structure-of-speech-from-raw-audio/) is a large multilingual model trained on 128 languages and with 436K hours of speech.

The following detailed [blog post](https://huggingface.co/blog/fine-tune-xlsr-wav2vec2) shows how to fine-tune a pre-trained network on labeled data for ASR. This is easily done by adding a single layer on top of the pretrained network. We suggest to read the article for more info!

## Hugging Face XLSR-Wav2Vec2 Sprint

On March 2020, over 300 participants collaborated, trained and shared 236 ASR models in dozens of different languages. You can compare these models thanks to the [PapersWithCode](https://paperswithcode.com/dataset/common-voice) integration (see [Portuguese models](https://paperswithcode.com/sota/speech-recognition-on-common-voice-portuguese) for example).

![Leaderboard of ASR Models](/tasks/assets/automatic-speech-recognition/wav2vec2.png)

These events help democratize ASR for all languages, including low-resource languages. In addition to the trained models, the event helps to build practical collaborative knowledge.

## Useful Resources
- [Making automatic speech recognition work on large files with Wav2Vec2 in 🤗 Transformers](https://huggingface.co/blog/asr-chunking)
- [Boosting Wav2Vec2 with n-grams in 🤗 Transformers](https://huggingface.co/blog/wav2vec2-with-ngram)
- [ML for Audio Study Group - Intro to Audio and ASR Deep Dive](https://www.youtube.com/watch?v=D-MH6YjuIlE)
- [Massively Multilingual ASR: 50 Languages, 1 Model, 1 Billion Parameters](https://arxiv.org/pdf/2007.03001.pdf)
- [NeMo ToolKits](https://github.com/NVIDIA/NeMo)