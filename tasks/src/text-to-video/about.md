## Use Cases

Text-to-video models can be used in any application that requires generating temporally and spatially consistent sequence of images from text.  



### Script-based Video Generation


Text-to-video models can be used to create short-form video content from a provided text script. These models can be used to create engaging and informative marketing videos. For example, a company could use a text-to-video model to create a video that explains how their product works or that shows how their product can solve a customer's problem.



### Content format conversion

Text-to-video models can be used to generate videos from long-form text, including blog posts, articles, and text files. Text-to-video models can be used to create educational videos that are more engaging and interactive. An example of this is creating a video that explains a complex concept from an article.


### Disaster Relief and Safety Protocols


Text-to-video models can be used to generate videos that show people how to stay safe during a hurricane or how to find food and water after a natural disaster.





### Voice-overs and Speech


Text-to-video models can be used to create an AI newscaster to deliver daily news, or for a film-maker to create a short film or a music video.



### Video Summarization


T2V models can be used to summarize long videos into shorter, more concise videos. This can be useful for people who want to quickly get the gist of a video without having to watch the entire thing.


### Visual Storytelling


Text-to-video models can be used to create visual stories to communicate ideas and emotions. For example, the model could be used to create a video that tells the story of a refugee family, or a natural landscape that might be difficult to capture under normal circumstances.



### Music Visualization

Creating music visualization is a complex, time-consuming, and resource-intensive process. Users define start and end prompts of music to parameterize the visualization and these prompts are warped between and generated according to the beat of the music for audioreactive video. Commonly used design patterns for improving generated videos are : "transitions", which express shifts in color, time, subject, or style, and "holds", which encourage visual emphasis and consistency. 


### Pose-Control

Generating text-editable and pose-controllable character videos have a rising demand in creating digital humans/avatars. By utilizing easily obtained datasets (i.e.,image pose pair and pose-free video) and the pre-trained text-to-image (T2I) model to obtain the pose-controllable character videos, this learn a zero-initialized convolutional encoder to encode the pose information and then finetune the motion of the network via a pose-free video dataset.



## Task Variants

There are different variants based on the inputs and outputs:

### Text to Video Retrieval

This is a task that involves finding videos that are relevant to a given text query. This task is challenging because it requires the model to understand the meaning of the text query and to match it to the visual content of the videos. The best approach to text-to-video retrieval depends on the specific application. For example, if the application is to find videos that are relevant to a given text query, then a text-based model may be the best approach. However, if the application is to find text queries that are relevant to a given video, then a video-based model may be the best approach.


### Text-to-video Editing


One T2V model variant is text-based video style and local attribute editing from the trained text-to-image model. Text to video editing models can make it easier to perform tasks like cropping, stabilization, color correction,resising and audio editing etc.,  and they can also help to ensure that the tasks are performed consistently


### Text to Video Search

Text-to-video search is the task of retrieving videos that are relevant to a given text query. This can be challenging, as videos are a complex medium that can contain a lot of information. By using semantic analysis to extract the meaning of the text query, visual analysis to extract features from the videos, such as the objects and actions that are present in the video, and temporal analysis to categorize relationships between the objects and actions in the video, we can determine which videos are most likely to be relevant to the text query.


### Text-driven Video Prediction

Text-driven video prediction is the task of generating a video sequence from a text description. Text description can be anything from a simple sentence to a detailed story. The goal of this task is to generate a video that is both visually realistic and semantically consistent with the text description.



### Video Translation


Text-to-video models can be used to translate videos from one language to another or allow to query the multilingual text-video model with non-English sentences. This can be useful for people who want to watch videos in a language that they don't understand, especailly when multi-lingual captions are available for training.


## Inference

This section should have useful information about how to pull a model from Hugging Face Hub that is a part of a library specialized in a task and use it.


## Useful Resources

In this area, you can insert useful resources about how to train or use a model for this task.


## Most commonly used Datasets 

Depending on the task, there are several datasets available to use that cater to specific niche video generation.

* **MSR-VTT** : MSR-VTT (Microsoft Research Video to Text) is a large-scale dataset for the open domain video captioning, which consists of 10,000 video clips from 20 categories, and each video clip is annotated with 20 English sentences.There are about 29,000 unique words in all captions. The standard splits uses 6,513 clips for training, 497 clips for validation, and 2,990 clips for testing.
* **UCF101** (UCF101 Human Actions dataset) : UCF101 dataset is an extension of UCF50 and consists of 13,320 video clips, which are classified into 101 categories. These 101 categories can be classified into 5 types (Body motion, Human-human interactions, Human-object interactions, Playing musical instruments and Sports). The total length of these video clips is over 27 hours. All the videos are collected from YouTube and have a fixed frame rate of 25 FPS with the resolution of 320 × 240.
* **Kinetics** : The Kinetics Human Action Video Dataset. is a large-scale, high-quality dataset for human action recognition in videos. The dataset consists of around 500,000 video clips covering 600 human action classes with at least 600 video clips for each action class. Each video clip lasts around 10 seconds and is labeled with a single action class. The videos are collected from YouTube.
* **Something-Something V2** : The 20BN-SOMETHING-SOMETHING V2 dataset is a large collection of labeled video clips that show humans performing pre-defined basic actions with everyday objects.  It contains 220,847 videos, with 168,913 in the training set, 24,777 in the validation set and 27,157 in the test set. There are 174 labels.
* **CelebV-Text** : CelebV-Text comprises 70,000 in-the-wild face video clips with diverse visual content, each paired with 20 texts generated using the proposed semi-automatic text generation strategy. The provided texts describes both static and dynamic attributes precisely.
* **WebVid** : This consists of 10.7 million pairs of text-video pairs (52K video hours) and contains a fair amount of noisy samples with irrelevant video descriptions
* **Howto100M** : This dataset consists of 136M video clips with captions that describe complex tasks with step-by-step information on how to perform 23k activities from domains such as cooking, hand crafting, personal care, gardening or fitness. It has 136M video clips with captions sourced from 1.2M Youtube videos (15 years of video)
* **QuerYD** : This dataset focuses on the event localization task such that the captions of videos describe the relative location of objects and actions in detail.
* **DiDeMo** : The Distinct Describable Moments (DiDeMo) dataset is one of the largest and most diverse datasets for the temporal localization of events in videos given natural language descriptions. The videos are collected from Flickr and each video is trimmed to a maximum of 30 seconds.


## Most commonly used Models 



* Make-A-Video 
* NUWA : Visual Synthesis Pre-training for Neural visUal World creAtion
* MAGVIT : Masked Generative Video Transformer
* Text2Video-Zero
* Runway Gen1 and Gen2
* NUWA-XL
* CogVideo
* GODIVA: Generating Open-DomaIn Videos from nAtural Descriptions
