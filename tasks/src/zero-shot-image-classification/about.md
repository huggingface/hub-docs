## About the Task

Zero-shot image classification is a task in computer vision where the aim is to classify images into one of several pre-defined categories, without any prior training or knowledge of the categories.

Zero shot image classification works by transferring knowledge learnt during training of one model, to classify novel classes that was not present in the training data. So this is a variation of [transfer learning](https://www.youtube.com/watch?v=BqqfQnyjmgg). For instance, a model trained to differentiate cars from airplanes can be used to classify images of ships.

The data in this learning paradigm consists of

- Seen data - images and their corresponding labels
- Unseen data -  only labels and no images
- auxiliary information - additional information given to the model during training connecting the unseen and seen data. This can be in the form of textual description or word embeddings.