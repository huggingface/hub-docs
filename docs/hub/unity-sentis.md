# Using Sentis Models from Hugging Face

[Unity Sentis](https://unity.com/products/sentis) is the inference engine which runs on Unity 2023 or above. 

## Exploring Sentis Models in the Hub
You will find `unity-sentis` models by filtering at the left of the [models page](https://huggingface.co/models?library=unity-sentis).

All the Sentis models in the hub come with code and instructions to easily get you started using the model in Unity. All Sentis models have been validated to work so you can be sure they will run in Unity.

To get more details about using Sentis you can read our [documentation](https://docs.unity3d.com/Packages/com.unity.sentis@latest). To get help from others using Sentis you can ask in our [discussion forum](https://discussions.unity.com/c/ai-beta/sentis)


## Types of files
Each repository will contain several types of files:

* ``sentis`` files: These are the main model files which contain the neural networks which run on Unity.
* ``ONNX`` files: This is an alternative format which you can include as well as, or instead of, the Sentis files.
* ``cs`` file: These are C# files which contain the code to run the model on Unity.
* ``info.json``: This file contains information about the files in the repository.
* Data files. These are other files which are needed to run the model. They could include vocabulary files, lists of class names etc. Some typical files will have extensions ``json`` or ``txt``.
* ``Readme.md``. This file contains instructions on how to use the model.

## Running the model
Always refer to the instructions on the model card. It is expected that you have some knowledge of Unity and some basic knowledge of C#.

First open Unity 2023 or above and create a new scene.

In general you will want to download your model files (``*.sentis``) and data files and put them in the StreamingAssets folder which is a subfolder inside the Assets folder. (If this folder does not exist you can create it).

Next place your C# file on an object in the scene such as the Main Camera. 

Refer to the model card to see if there are any other objects you need to create in the scene.

In most cases we only provide the very basic implementation to get you up and running. It is up to you to find creative uses. For example, you may like to combine two or more models to do interesting things.

## Sharing your own Sentis models
We encourage you to share your own Sentis models on Hugging Face. These may be models you trained yourself or models you have converted to the [Sentis format](https://docs.unity3d.com/Packages/com.unity.sentis@1.3/manual/serialize-a-model.html) and have tested them to run in Unity. 

For each repository that you upload please provide the models in the Sentis format. (This provides an extra check that they will run in Unity and is also the preferred format for large models). You can also include the original ONNX versions of the model files.

Provide a C# file with a minimal implementation. (For example, if it is an image processing model it should have code that shows how to prepare the image for the input and construct the image from the output). Alternatively, you can link to external sample code. This is so people can download the model and use it in Unity easily.

Provide any data files needed to run the model. For example vocabulary files.

Finally, please provide an ``info.json`` file which just lists the files in your project. This helps in counting the downloads. Some example for the contents of ``info.json`` are:

```
{
   code: [ “mycode.cs”], 
   models: [ “model1.sentis”, “model2.sentis”],
   data: [ “vocab.txt” ]
}
```

Or if your code sample is external:

```
{
   sampleURL: [ “http://sampleunityproject”], 
   models: [ “model1.sentis”, “model2.sentis”]
}
```

## Additional Information
We also have some full [sample projects](https://github.com/Unity-Technologies/sentis-samples) to help you get started using Sentis.

