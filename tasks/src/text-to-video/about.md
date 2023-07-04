Text-to-video models can generate videos from a given text prompt. They can be used in any application that requires generating temporally and spatially consistent sequence of images from text.  


## Use Cases

### Script-based Video Generation

Text-to-video models can be used to create short-form video content from a provided text script. These models can be used to create engaging and informative marketing videos. For example, a company could use a text-to-video model to create a video that explains how their product works or that shows how their product can solve a customer's problem.


### Content format conversion

Text-to-video models can be used to generate videos from long-form text, including blog posts, articles, and text files. Text-to-video models can be used to create educational videos that are more engaging and interactive. An example of this is creating a video that explains a complex concept from an article.


### Disaster Relief and Safety Protocols

Text-to-video models can be used to generate videos that show people how to stay safe during a hurricane or how to find food and water after a natural disaster.


### Voice-overs and Speech

Text-to-video models can be used to create an AI newscaster to deliver daily news, or for a film-maker to create a short film or a music video.




## Task Variants

Text-to-video models have different variants based on inputs and outputs.


### Text-to-video Retrieval


This is a task that involves finding videos that are relevant to a given text query. This task is challenging because it requires the model to understand the meaning of the text query and to match it to the visual content of the videos. The best approach to text-to-video retrieval depends on the specific application. For example, if the application is to find videos that are relevant to a given text query, then a text-based model may be the best approach. However, if the application is to find text queries that are relevant to a given video, then a video-based model may be the best approach.


### Text-to-video Editing


One text-to-video task is generating text-based video style and local attribute editing. Text-to-video editing models can make it easier to perform tasks like cropping, stabilization, color correction, resizing and audio editing consistently.



### Text-to-video Search


Text-to-video search is the task of retrieving videos that are relevant to a given text query. This can be challenging, as videos are a complex medium that can contain a lot of information. By using semantic analysis to extract the meaning of the text query, visual analysis to extract features from the videos, such as the objects and actions that are present in the video, and temporal analysis to categorize relationships between the objects and actions in the video, we can determine which videos are most likely to be relevant to the text query.


### Text-driven Video Prediction

Text-driven video prediction is the task of generating a video sequence from a text description. Text description can be anything from a simple sentence to a detailed story. The goal of this task is to generate a video that is both visually realistic and semantically consistent with the text description.



### Video Translation


Text-to-video translation models can translate videos from one language to another or allow to query the multilingual text-video model with non-English sentences. This can be useful for people who want to watch videos in a language that they don't understand, especially when multi-lingual captions are available for training.

## Metrics    

Both automatic and manual metrics are used to evaluate performance of text-to-video models. Below are some widely used automatic metrics that are calculated on benchmark datasets.

### Inception Score (IS) 

One of early metrics to automatically assess the quality of generated images. Uses a separate image classification model (Inception-V3, C3D) to predict class labels and evaluates how distinct (entropy of distribution of predicted labels is minimized) and diverse (predictions are evenly distributed across labels) they are. Based on KL Divergence; the score is non-negative and higher scores are better.
https://en.wikipedia.org/wiki/Inception_score


### Frechet Inception Distance (FID)    
 
A development over IS, it compares the distribution of generated images with the distribution of a set of real images. I also uses a separate model, but as an embedder, rather than a classifier, using the last activation vectors before classifier layers as image representations. The metric compares the mean and standard deviation of the embeddings of real and generated images. Based on 2-Wasserstein distance; smaller scores are better.
https://en.wikipedia.org/wiki/Fr%C3%A9chet_inception_distance

### Frechet Video Distance (FVD)    
Adaptation of FID score for video data, taking into account temporal coherence as well. Differently to FID, it requires a model, such as I3D, that captures temporal coherence of a sequence of frames, as well as the quality of each frame. Smaller scores are better.
https://openreview.net/pdf?id=rylgEULtdN

### CLIPSIM    
Average similarity between video frames and text based on CLIP.
https://arxiv.org/pdf/2104.14806.pdf 

Additionally, model evaluation can be done with human annotations. It is done by curating a set of prompts, generating videos from them and having annotators rate the generated videos on a set of qualities, such as video quality (only video shown), video realism and text-video faithfulness (video and prompt shown).


## Inference

This section should have useful information about how to pull a model from Hugging Face Hub that is a part of a library specialized in a task and use it.


## Useful Resources

In this area, you can insert useful resources about how to train or use a model for this task.
