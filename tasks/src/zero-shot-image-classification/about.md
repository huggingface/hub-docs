## About the Task

Zero-shot image classification is a computer vision task to classify images into one of several classes, without any prior training or knowledge of the classes. 

Zero shot image classification works by transferring knowledge learnt during training of one model, to classify novel classes that was not present in the training data. So this is a variation of [transfer learning](https://www.youtube.com/watch?v=BqqfQnyjmgg). For instance, a model trained to differentiate cars from airplanes can be used to classify images of ships.

The data in this learning paradigm consists of

- Seen data - images and their corresponding labels
- Unseen data -  only labels and no images
- auxiliary information - additional information given to the model during training connecting the unseen and seen data. This can be in the form of textual description or word embeddings.


## Use Cases

### Autonomous Vehicles
Autonomous Vehicles are a perfect use case for Zero-shot image classification. Occasionally in real-life situations, even we humans encounter new objects on the road that we are not sure how to react to instantly. Detecting + Classifying novel objects and deciding the correct actions to take are crucial for Robust Autonomous Vehicle Systems.

### Image Retrieval
Zero-shot learning resolves several challenges in existing Image retrieval systems. For example, with the rapid growth of unseen categories on the web, it is challenging to index images based on known categories.

Zero-shot learning also has applicability in Image Instance Retrieval, where against an input image, images representing the same features are retrieved from a database. Conventional systems can only search for  semantically-related images, not always the exact instances.

### Disease Classification
Zero-shot learning can be helpful in disease classification, where we have a scarcity of labeled images for a specific disease. Here we can use a zero-shot image classifier that has learned from the dataset of other similar diseases along with the auxiliary information provided.


### Action Recognition
For any given use case of action/gesture recognition, if all the possible classes of actions are not known beforehand, Zero-shot learning can be a solution.

