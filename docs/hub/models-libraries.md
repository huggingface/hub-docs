# Libraries

The Hub has support for dozens of libraries in the Open Source ecosystem. Thanks to the `huggingface_hub` Python library, it's easy to enable sharing your models on the Hub. The Hub supports many libraries, and we're working on expanding this support. We're happy to welcome to the Hub a set of Open Source libraries that are pushing Machine Learning forward.

The table below summarizes the supported libraries and their level of integration. Find all our supported libraries in [the model-libraries.ts file](https://github.com/huggingface/huggingface.js/blob/main/packages/tasks/src/model-libraries.ts).

| Library                                                                     | Description                                                                          | Inference API | Widgets | Download from Hub | Push to Hub |
|-----------------------------------------------------------------------------|--------------------------------------------------------------------------------------|---|---:|---|---|
| [Adapters](https://github.com/adapter-hub/adapters) | A unified Transformers add-on for parameter-efficient and modular fine-tuning.                                                | ❌ | ❌ | ✅ | ✅ |
| [AllenNLP](./allennlp)                             | An open-source NLP research library, built on PyTorch.                               | ✅ | ✅ | ✅ | ❌ |
| [Asteroid](./asteroid)                       | PyTorch-based audio source separation toolkit                                        | ✅ | ✅ | ✅ | ❌ |
| [BERTopic](./bertopic)                           | BERTopic is a topic modeling library for text and images                             | ✅ | ✅ | ✅ | ✅ | 
| [Diffusers](./diffusers)                       | A modular toolbox for inference and training of diffusion models                     | ✅ | ✅ | ✅ | ✅ |
| [docTR](https://github.com/mindee/doctr)                                    | Models and datasets for OCR-related tasks in PyTorch & TensorFlow                    | ✅ | ✅ | ✅ | ❌ |
| [ESPnet](./espnet)                                  | End-to-end speech processing toolkit (e.g. TTS)                                      | ✅ | ✅ | ✅ | ❌ |
| [fastai](./fastai)                                  | Library to train fast and accurate models with state-of-the-art outputs.             | ✅ | ✅ | ✅ | ✅ |
| [Keras](https://huggingface.co/docs/hub/keras)                              | Library that uses a consistent and simple API to build models leveraging TensorFlow and its ecosystem. | ❌ | ❌ | ✅ | ✅ |
| [Flair](./flair)                                  | Very simple framework for state-of-the-art NLP.                                      | ✅ | ✅ | ✅ | ✅ |
| [MBRL-Lib](https://github.com/facebookresearch/mbrl-lib)                    | PyTorch implementations of MBRL Algorithms.                                          | ❌ | ❌ | ✅ | ✅ |
| [MidiTok](https://github.com/Natooz/MidiTok)                                | Tokenizers for symbolic music / MIDI files.                                          | ❌ | ❌ | ✅ | ✅ |
| [ML-Agents](./ml-agents)                       | Enables games and simulations made with Unity to serve as environments for training intelligent agents. | ❌ | ❌ | ✅ | ✅ |
| [MLX](./mlx)                       | Model training and serving framework on Apple silicon made by Apple. | ❌ | ❌ | ✅ | ✅ |
| [NeMo](https://github.com/NVIDIA/NeMo)                                      | Conversational AI toolkit built for researchers                                      | ✅ | ✅ | ✅ | ❌ |
| [OpenCLIP](./open_clip)                      | Library for open-source implementation of OpenAI's CLIP                              | ❌ | ❌ | ✅ | ✅ |  
| [PaddleNLP](./paddlenlp)                      | Easy-to-use and powerful NLP library built on PaddlePaddle                           | ✅ | ✅ | ✅ | ✅ |
| [PEFT](./peft)                      | Cutting-edge Parameter Efficient Fine-tuning Library                           | ✅ | ✅ | ✅ | ✅ |
| [Pyannote](https://github.com/pyannote/pyannote-audio)                      | Neural building blocks for speaker diarization.                                      | ❌ | ❌ | ✅ | ❌ |
| [PyCTCDecode](https://github.com/kensho-technologies/pyctcdecode)           | Language model supported CTC decoding for speech recognition                         | ❌ | ❌ | ✅ | ❌ |
| [Pythae](https://github.com/clementchadebec/benchmark_VAE)                  | Unified framework for Generative Autoencoders in Python                              | ❌ | ❌ | ✅ | ✅ |
| [RL-Baselines3-Zoo](./rl-baselines3-zoo)            | Training framework for Reinforcement Learning, using [Stable Baselines3](https://github.com/DLR-RM/stable-baselines3).| ❌ | ✅ | ✅ | ✅ |
| [Sample Factory](./sample-factory)           | Codebase for high throughput asynchronous reinforcement learning.                    | ❌ | ✅ | ✅ | ✅ |
| [Sentence Transformers](./sentence-transformers)    | Compute dense vector representations for sentences, paragraphs, and images.          | ✅ | ✅ | ✅ | ✅ |
| [SetFit](./setfit)                             | Efficient few-shot text classification with Sentence Transformers                    | ✅ | ✅ | ✅ | ✅ |
| [spaCy](./spacy)                                 | Advanced Natural Language Processing in Python and Cython.                           | ✅ | ✅ | ✅ | ✅ |
| [SpanMarker](./span_marker)                    | Familiar, simple and state-of-the-art Named Entity Recognition.                      | ✅ | ✅ | ✅ | ✅ |
| [Scikit Learn (using skops)](https://skops.readthedocs.io/en/stable/)       | Machine Learning in Python.                                                          | ✅ | ✅ | ✅ | ✅ |
| [Speechbrain](./speechbrain)                               | A PyTorch Powered Speech Toolkit.                                                    | ✅ | ✅ | ✅ | ❌ |
| [Stable-Baselines3](./stable-baselines3)            | Set of reliable implementations of deep reinforcement learning algorithms in PyTorch | ❌ | ✅ | ✅ | ✅ |
| [TensorFlowTTS](https://github.com/TensorSpeech/TensorFlowTTS)              | Real-time state-of-the-art speech synthesis architectures.                           | ❌ | ❌ | ✅ | ❌ |
| [Timm](./timm)                   | Collection of image models, scripts, pretrained weights, etc.                        | ✅ | ✅ | ✅ | ✅ |
| [Transformers](./transformers)                 | State-of-the-art Natural Language Processing for PyTorch, TensorFlow, and JAX        | ✅ | ✅ | ✅ | ✅ |
| [Transformers.js](./transformers-js)                | State-of-the-art Machine Learning for the web. Run 🤗 Transformers directly in your browser, with no need for a server! | ❌ | ❌ | ✅ | ❌ |
| [Unity Sentis](./unity-sentis)                | Inference engine for the Unity 3D game engine | ❌ | ❌ | ❌ | ❌ |

### How can I add a new library to the Inference API?

If you're interested in adding your library, please reach out to us! Read about it in [Adding a Library Guide](./models-adding-libraries).
