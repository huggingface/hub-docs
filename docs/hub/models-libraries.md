# Libraries

The Hub has support for dozens of libraries in the Open Source ecosystem. Thanks to the `huggingface_hub` Python library, it's easy to enable sharing your models on the Hub. The Hub supports many libraries, and we're working on expanding this support. We're happy to welcome to the Hub a set of Open Source libraries that are pushing Machine Learning forward.

The table below summarizes the supported libraries and their level of integration. Find all our supported libraries in [the model-libraries.ts file](https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/model-libraries.ts).

| Library                                                                     | Description                                                                          | Inference API | Widgets | Download from Hub | Push to Hub |
|-----------------------------------------------------------------------------|--------------------------------------------------------------------------------------|---|---:|---|---|
| [Adapter Transformers](https://huggingface.co/docs/hub/adapter-transformers) | Extends 🤗Transformers with Adapters.                                                | ❌ | ❌ | ✅ | ✅ |
| [AllenNLP](https://huggingface.co/docs/hub/allennlp)                             | An open-source NLP research library, built on PyTorch.                               | ✅ | ✅ | ✅ | ❌ |
| [Asteroid](https://huggingface.co/docs/hub/asteroid)                       | Pytorch-based audio source separation toolkit                                        | ✅ | ✅ | ✅ | ❌ |
| [BERTopic](https://github.com/MaartenGr/BERTopic)                           | BERTopic is a topic modeling library for text and images                             | ✅ | ✅ | ✅ | ✅ | 
| [Diffusers](https://huggingface.co/docs/hub/diffusers)                       | A modular toolbox for inference and training of diffusion models                     | ✅ | ✅ | ✅ | ✅ |
| [docTR](https://github.com/mindee/doctr)                                    | Models and datasets for OCR-related tasks in PyTorch & TensorFlow                    | ✅ | ✅ | ✅ | ❌ |
| [ESPnet](https://huggingface.co/docs/hub/espnet)                                  | End-to-end speech processing toolkit (e.g. TTS)                                      | ✅ | ✅ | ✅ | ❌ |
| [fastai](https://huggingface.co/docs/hub/fastai)                                  | Library to train fast and accurate models with state-of-the-art outputs.             | ✅ | ✅ | ✅ | ✅ |
| [Keras](https://huggingface.co/docs/hub/keras)                              | Library that uses a consistent and simple API to build models leveraging TensorFlow and its ecosystem. | ❌ | ❌ | ✅ | ✅ |
| [Flair](https://huggingface.co/docs/hub/flair)                                  | Very simple framework for state-of-the-art NLP.                                      | ✅ | ✅ | ✅ | ✅ |
| [MBRL-Lib](https://github.com/facebookresearch/mbrl-lib)                    | PyTorch implementations of MBRL Algorithms.                                          | ❌ | ❌ | ✅ | ✅ |
| [MidiTok](https://github.com/Natooz/MidiTok)                                | Tokenizers for symbolic music / MIDI files.                                          | ❌ | ❌ | ✅ | ✅ |
| [ML-Agents](https://huggingface.co/docs/hub/ml-agents)                       | Enables games and simulations made with Unity to serve as environments for training intelligent agents. | ❌ | ❌ | ✅ | ✅ |
| [NeMo](https://github.com/NVIDIA/NeMo)                                      | Conversational AI toolkit built for researchers                                      | ✅ | ✅ | ✅ | ❌ |
| [OpenCLIP](https://huggingface.co/docs/hub/open_clip)                      | Library for open-source implementation of OpenAI's CLIP                              | ❌ | ❌ | ✅ | ✅ |  
| [PaddleNLP](https://huggingface.co/docs/hub/paddlenlp)                      | Easy-to-use and powerful NLP library built on PaddlePaddle                           | ✅ | ✅ | ✅ | ✅ |
| [PEFT](https://huggingface.co/docs/hub/peft)                      | Cutting-edge Parameter Efficient Fine-tuning Library                           | ✅ | ✅ | ✅ | ✅ |
| [Pyannote](https://github.com/pyannote/pyannote-audio)                      | Neural building blocks for speaker diarization.                                      | ❌ | ❌ | ✅ | ❌ |
| [PyCTCDecode](https://github.com/kensho-technologies/pyctcdecode)           | Language model supported CTC decoding for speech recognition                         | ❌ | ❌ | ✅ | ❌ |
| [Pythae](https://github.com/clementchadebec/benchmark_VAE)                  | Unified framework for Generative Autoencoders in Python                              | ❌ | ❌ | ✅ | ✅ |
| [RL-Baselines3-Zoo](https://huggingface.co/docs/hub/rl-baselines3-zoo)            | Training framework for Reinforcement Learning, using [Stable Baselines3](https://github.com/DLR-RM/stable-baselines3).| ❌ | ✅ | ✅ | ✅ |
| [Sample Factory](https://huggingface.co/docs/hub/sample-factory)           | Codebase for high throughput asynchronous reinforcement learning.                    | ❌ | ✅ | ✅ | ✅ |
| [Sentence Transformers](https://huggingface.co/docs/hub/sentence-transformers)    | Compute dense vector representations for sentences, paragraphs, and images.          | ✅ | ✅ | ✅ | ✅ |
| [SetFit](https://huggingface.co/docs/hub/setfit)                             | Efficient few-shot text classification with Sentence Transformers                    | ✅ | ✅ | ✅ | ✅ |
| [spaCy](https://huggingface.co/docs/hub/spacy)                                 | Advanced Natural Language Processing in Python and Cython.                           | ✅ | ✅ | ✅ | ✅ |
| [SpanMarker](https://huggingface.co/docs/hub/span_marker)                    | Familiar, simple and state-of-the-art Named Entity Recognition.                      | ✅ | ✅ | ✅ | ✅ |
| [Scikit Learn (using skops)](https://skops.readthedocs.io/en/stable/)       | Machine Learning in Python.                                                          | ✅ | ✅ | ✅ | ✅ |
| [Speechbrain](https://huggingface.co/docs/hub/speechbrain)                               | A PyTorch Powered Speech Toolkit.                                                    | ✅ | ✅ | ✅ | ❌ |
| [Stable-Baselines3](https://huggingface.co/docs/hub/stable-baselines3)            | Set of reliable implementations of deep reinforcement learning algorithms in PyTorch | ❌ | ✅ | ✅ | ✅ |
| [TensorFlowTTS](https://github.com/TensorSpeech/TensorFlowTTS)              | Real-time state-of-the-art speech synthesis architectures.                           | ❌ | ❌ | ✅ | ❌ |
| [Timm](https://huggingface.co/docs/hub/timm)                   | Collection of image models, scripts, pretrained weights, etc.                        | ✅ | ✅ | ✅ | ✅ |
| [Transformers](https://huggingface.co/docs/hub/transformers)                 | State-of-the-art Natural Language Processing for Pytorch, TensorFlow, and JAX        | ✅ | ✅ | ✅ | ✅ |
| [Transformers.js](https://huggingface.co/docs/hub/transformers-js)                | State-of-the-art Machine Learning for the web. Run 🤗 Transformers directly in your browser, with no need for a server! | ❌ | ❌ | ✅ | ❌ |
| [Unity Sentis](https://huggingface.co/docs/hub/unity-sentis)                | Inference engine for the Unity 3D game engine | ❌ | ❌ | ❌ | ❌ |

### How can I add a new library to the Inference API?

If you're interested in adding your library, please reach out to us! Read about it in [Adding a Library Guide](./models-adding-libraries).
