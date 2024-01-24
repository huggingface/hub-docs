# Libraries

The Hub has support for dozens of libraries in the Open Source ecosystem. Thanks to the `huggingface_hub` Python library, it's easy to enable sharing your models on the Hub. The Hub supports many libraries, and we're working on expanding this support. We're happy to welcome to the Hub a set of Open Source libraries that are pushing Machine Learning forward.

The table below summarizes the supported libraries and their level of integration. Find all our supported libraries in [the model-libraries.ts file](https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/model-libraries.ts).

| Library                                                                     | Description                                                                          | Inference API | Widgets | Download from Hub | Push to Hub |
|-----------------------------------------------------------------------------|--------------------------------------------------------------------------------------|---|---:|---|---|
| [Adapter Transformers](https://github.com/Adapter-Hub/adapter-transformers) | Extends 🤗Transformers with Adapters.                                                | ❌ | ❌ | ✅ | ✅ |
| [AllenNLP](https://github.com/allenai/allennlp)                             | An open-source NLP research library, built on PyTorch.                               | ✅ | ✅ | ✅ | ❌ |
| [Asteroid](https://github.com/asteroid-team/asteroid)                       | Pytorch-based audio source separation toolkit                                        | ✅ | ✅ | ✅ | ❌ |
| [BERTopic](https://github.com/MaartenGr/BERTopic)                           | BERTopic is a topic modeling library for text and images                             | ✅ | ✅ | ✅ | ✅ | 
| [Diffusers](https://github.com/huggingface/diffusers)                       | A modular toolbox for inference and training of diffusion models                     | ✅ | ✅ | ✅ | ✅ |
| [docTR](https://github.com/mindee/doctr)                                    | Models and datasets for OCR-related tasks in PyTorch & TensorFlow                    | ✅ | ✅ | ✅ | ❌ |
| [ESPnet](https://github.com/espnet/espnet)                                  | End-to-end speech processing toolkit (e.g. TTS)                                      | ✅ | ✅ | ✅ | ❌ |
| [fastai](https://github.com/fastai/fastai)                                  | Library to train fast and accurate models with state-of-the-art outputs.             | ✅ | ✅ | ✅ | ✅ |
| [Keras](https://huggingface.co/docs/hub/keras)                              | Library that uses a consistent and simple API to build models leveraging TensorFlow and its ecosystem. | ❌ | ❌ | ✅ | ✅ |
| [Flair](https://github.com/flairNLP/flair)                                  | Very simple framework for state-of-the-art NLP.                                      | ✅ | ✅ | ✅ | ✅ |
| [MBRL-Lib](https://github.com/facebookresearch/mbrl-lib)                    | PyTorch implementations of MBRL Algorithms.                                          | ❌ | ❌ | ✅ | ✅ |
| [MidiTok](https://github.com/Natooz/MidiTok)                                | Tokenizers for symbolic music / MIDI files.                                          | ❌ | ❌ | ✅ | ✅ |
| [ML-Agents](https://github.com/huggingface/ml-agents)                       | Enables games and simulations made with Unity to serve as environments for training intelligent agents. | ❌ | ❌ | ✅ | ✅ |
| [NeMo](https://github.com/NVIDIA/NeMo)                                      | Conversational AI toolkit built for researchers                                      | ✅ | ✅ | ✅ | ❌ |
| [OpenCLIP](https://github.com/mlfoundations/open_clip)                      | Library for open-source implementation of OpenAI's CLIP                              | ❌ | ❌ | ✅ | ✅ |  
| [PaddleNLP](https://github.com/PaddlePaddle/PaddleNLP)                      | Easy-to-use and powerful NLP library built on PaddlePaddle                           | ✅ | ✅ | ✅ | ✅ |
| [PEFT](https://github.com/huggingface/peft)                      | Cutting-edge Parameter Efficient Fine-tuning Library                           | ✅ | ✅ | ✅ | ✅ |
| [Pyannote](https://github.com/pyannote/pyannote-audio)                      | Neural building blocks for speaker diarization.                                      | ❌ | ❌ | ✅ | ❌ |
| [PyCTCDecode](https://github.com/kensho-technologies/pyctcdecode)           | Language model supported CTC decoding for speech recognition                         | ❌ | ❌ | ✅ | ❌ |
| [Pythae](https://github.com/clementchadebec/benchmark_VAE)                  | Unified framework for Generative Autoencoders in Python                              | ❌ | ❌ | ✅ | ✅ |
| [RL-Baselines3-Zoo](https://github.com/DLR-RM/rl-baselines3-zoo)            | Training framework for Reinforcement Learning, using [Stable Baselines3](https://github.com/DLR-RM/stable-baselines3).| ❌ | ✅ | ✅ | ✅ |
| [Sample Factory](https://github.com/alex-petrenko/sample-factory)           | Codebase for high throughput asynchronous reinforcement learning.                    | ❌ | ✅ | ✅ | ✅ |
| [Sentence Transformers](https://github.com/UKPLab/sentence-transformers)    | Compute dense vector representations for sentences, paragraphs, and images.          | ✅ | ✅ | ✅ | ✅ |
| [SetFit](https://github.com/huggingface/setfit)                             | Efficient few-shot text classification with Sentence Transformers                    | ✅ | ✅ | ✅ | ✅ |
| [spaCy](https://github.com/explosion/spaCy)                                 | Advanced Natural Language Processing in Python and Cython.                           | ✅ | ✅ | ✅ | ✅ |
| [SpanMarker](https://github.com/tomaarsen/SpanMarkerNER)                    | Familiar, simple and state-of-the-art Named Entity Recognition.                      | ✅ | ✅ | ✅ | ✅ |
| [Scikit Learn (using skops)](https://skops.readthedocs.io/en/stable/)       | Machine Learning in Python.                                                          | ✅ | ✅ | ✅ | ✅ |
| [Speechbrain](https://speechbrain.github.io/)                               | A PyTorch Powered Speech Toolkit.                                                    | ✅ | ✅ | ✅ | ❌ |
| [Stable-Baselines3](https://github.com/DLR-RM/stable-baselines3)            | Set of reliable implementations of deep reinforcement learning algorithms in PyTorch | ❌ | ✅ | ✅ | ✅ |
| [TensorFlowTTS](https://github.com/TensorSpeech/TensorFlowTTS)              | Real-time state-of-the-art speech synthesis architectures.                           | ❌ | ❌ | ✅ | ❌ |
| [Timm](https://github.com/rwightman/pytorch-image-models)                   | Collection of image models, scripts, pretrained weights, etc.                        | ✅ | ✅ | ✅ | ✅ |
| [Transformers](https://github.com/huggingface/transformers)                 | State-of-the-art Natural Language Processing for Pytorch, TensorFlow, and JAX        | ✅ | ✅ | ✅ | ✅ |
| [Transformers.js](https://github.com/xenova/transformers.js)                | State-of-the-art Machine Learning for the web. Run 🤗 Transformers directly in your browser, with no need for a server! | ❌ | ❌ | ✅ | ❌ |
| [Unity Sentis](https://unity.com/products/sentis)                | Inference engine for the Unity 3D game engine | ✅ | ❌ | ✅ | ✅ |

### How can I add a new library to the Inference API?

If you're interested in adding your library, please reach out to us! Read about it in [Adding a Library Guide](./models-adding-libraries).
