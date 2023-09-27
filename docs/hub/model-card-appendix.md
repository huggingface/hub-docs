# Appendix

## Appendix A: User Study
_Full text responses to key questions_

### How would you define model cards?

***Insight: Respondents had generally similar views of what model cards are: documentation focused on issues like training, use cases, and bias/limitations***

* Model cards are model descriptions, both of how they were trained, their use cases, and potential biases and limitations
* Documents describing the essential features of a model in order for the reader/user to understand the artifact he/she has in front, the background/training, how it can be used, and its technical/ethical limitations.
* They serve as a living artifact of models to document them. Model cards contain information that goes from a high-level description of what the specific model can be used to, to limitations, biases, metrics, and much more. They are used primarily to understand what the model does.
* Model cards are to model what GitHub READMEs are to GitHub projects. It tells people all the information they need to know about the model. If you don't write one, nobody will use your model.
* From what I understand, a model card uses certain benchmarks (geography, culture, sex, etc.) to define both a model's usability and limitations. It's essentially a model's 'nutrition facts label' that can show how a model was created and educates others on its reusability.
* Model cards are the metadata and documentation about the model, everything I need to know to use the model properly: info about the model, what paper introduced it, what dataset was it trained on or fine-tuned on, whom it belongs to, are there known risks and limitations with this model, any useful technical info.
* IMO model cards are a brief presentation of a model which includes:
  *  short summary of the architectural particularities of the model
  *  describing the data it was trained on
  *  What is the performance on reference datasets (accuracy and speed metrics if possible)
  *  Limitations
  *  how to use it in the context of the Transformers library
  *  source (original article, GitHub repo,...)
*  Easily accessible documentation that any background can read and learn about critical model components and social impact


### What do you like about model cards?

* They are interesting to teach people about new models
* As a non-technical guy, the possibility of getting to know the model, to understand the basics of it, it's an opportunity for the author to disclose its innovation in a transparent & explainable (i.e. trustworthy) way.
* I like interactive model cards with visuals and widgets that allow me to try the model without running any code.
* What I like about good model cards is that you can find all the information you need about that particular model.
* Model cards are revolutionary to the world of AI ethics. It's one of the first tangible steps in mitigating/educating on biases in machine learning. They foster greater awareness and accountability!
* Structured, exhaustive, the more info the better.
* It helps to get an understanding of what the model is good (or bad) at.
* Conciseness and accessibility


### What do you dislike about model cards?

* Might get to technical and/or dense
* <mark >They contain lots of information for different audiences (researchers, engineers, non engineers), so it's difficult to explore model cards with an intended use cases.</mark> 
  * [NOTE: this comment could be addressed with toggle views for different audiences]
* <mark >Good ones are time consuming to create. They are hard to test to make sure the information is up to date. Often times, model cards are formatted completely differently - so you have to sort of figure out how that certain individual has structured theirs.</mark> 
  * [NOTE: this comment helps demonstrate the value of a standardized format and automation tools to make it easier to create model cards]
* Without the help of the community to pitch in supplemental evals, model cards might be subject to inherent biases that the developer might not be aware of. It's early days for them, but without more thorough evaluations, a model card's information might be too limited.
* <mark > Empty model cards. No license information - customers need that info and generally don't have it.</mark> 
* They are usually either too concise or too verbose.
* writing them lol bless you

### Other key new insights

* Model cards are best filled out when done by people with different roles: Technical specifications can generally only be filled out by the developers; ethical considerations throughout are generally best informed by people who tend to work on ethical issues.
* Model users care a lot about licences -- specifically, whether a model can legally be used for a specific task.


## Appendix B: Landscape Analysis
_Overview of the state of model documentation in Machine Learning_

### MODEL CARD EXAMPLES
Examples of model cards and closely-related variants include: 

* Google Cloud: [Face Detection](https://modelcards.withgoogle.com/face-detection), [Object Detection](https://modelcards.withgoogle.com/object-detection)
* Google Research: [ML Kit Vision Models](https://developers.google.com/s/results/ml-kit?q=%22Model%20Card%22), [Face Detection](https://sites.google.com/view/perception-cv4arvr/blazeface), [Conversation AI](https://github.com/conversationai/perspectiveapi/tree/main/model-cards)
* OpenAI: [GPT-3](https://github.com/openai/gpt-3/blob/master/model-card.md), [GPT-2](https://github.com/openai/gpt-2/blob/master/model_card.md), [DALL-E dVAE](https://github.com/openai/DALL-E/blob/master/model_card.md), [CLIP](https://github.com/openai/CLIP-featurevis/blob/master/model-card.md)
* [NVIDIA Model Cards](https://catalog.ngc.nvidia.com/models?filters=&orderBy=weightPopularASC&query=)
* [Salesforce Model Cards](https://blog.salesforceairesearch.com/model-cards-for-ai-model-transparency/)
* [Allen AI Model Cards](https://github.com/allenai/allennlp-models/tree/main/allennlp_models/modelcards)
* [Co:here AI Model Cards](https://docs.cohere.ai/responsible-use/)
* [Duke PULSE Model Card](https://arxiv.org/pdf/2003.03808.pdf)
* [Stanford Dynasent](https://github.com/cgpotts/dynasent/blob/main/dynasent_modelcard.md)
* [GEM Model Cards](https://gem-benchmark.com/model_cards)
* Parl.AI: [Parl.AI sample model cards](https://github.com/facebookresearch/ParlAI/tree/main/docs/sample_model_cards), [BlenderBot 2.0 2.7B](https://github.com/facebookresearch/ParlAI/blob/main/parlai/zoo/blenderbot2/model_card.md)
* [Perspective API Model Cards](https://github.com/conversationai/perspectiveapi/tree/main/model-cards)
* See https://github.com/ivylee/model-cards-and-datasheets for more examples!

### MODEL CARDS FOR LARGE LANGUAGE MODELS
Large language models are often released with associated documentation. Large language models that have an associated model card (or related documentation tool) include: 


* [Big Science BLOOM model card](https://huggingface.co/bigscience/bloom)
* [GPT-2 Model Card](https://github.com/openai/gpt-2/blob/master/model_card.md) 
* [GPT-3 Model Card](https://github.com/openai/gpt-3/blob/master/model-card.md)
* [DALL-E 2 Preview System Card](https://github.com/openai/dalle-2-preview/blob/main/system-card.md)
* [OPT-175B model card](https://arxiv.org/pdf/2205.01068.pdf)

### MODEL CARD GENERATION TOOLS
Tools for programmatically or interactively generating model cards include: 

* [Salesforce Model Card Creation](https://help.salesforce.com/s/articleView?id=release-notes.rn_bi_edd_model_card.htm&type=5&release=232)
* [TensorFlow Model Card Toolkit](https://ai.googleblog.com/2020/07/introducing-model-card-toolkit-for.html)
  * [Python library](https://pypi.org/project/model-card-toolkit/)
* [GSA / US Census Bureau Collaboration on Model Card Generator](https://bias.xd.gov/resources/model-card-generator/)
* [Parl.AI Auto Generation Tool](https://parl.ai/docs/tutorial_model_cards.html)
* [VerifyML Model Card Generation Web Tool](https://www.verifyml.com)
* [RMarkdown Template for Model Card as part of vetiver package](https://cran.r-project.org/web/packages/vetiver/vignettes/model-card.html)
* [Databaseline ML Cards toolkit](https://databaseline.tech/ml-cards/)

### MODEL CARD EDUCATIONAL TOOLS
Tools for understanding model cards and understanding how to create model cards include: 

* [Hugging Face Hub docs](https://huggingface.co/course/chapter4/4?fw=pt)
* [Perspective API](https://developers.perspectiveapi.com/s/about-the-api-model-cards)
* [Kaggle](https://www.kaggle.com/code/var0101/model-cards/tutorial)
* [Code.org](https://studio.code.org/s/aiml-2021/lessons/8)
* [UNICEF](https://unicef.github.io/inventory/data/model-card/)
